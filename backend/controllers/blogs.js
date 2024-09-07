const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const UserAction = require('../models/userAction')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Like a blog
blogsRouter.post('/:id/like', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const existingAction = await UserAction.findOne({ user: decodedToken.id, targetId: blog._id, targetType: 'Blog' })
  if (existingAction) {
    return response.status(400).json({ error: 'already voted' })
  }

  await UserAction.create({ user: decodedToken.id, targetId: blog._id, targetType: 'Blog', actionType: 'like' })
  blog.likeCount += 1
  await blog.save()

  response.status(200).json(blog)
})

// Dislike a blog
blogsRouter.post('/:id/dislike', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const existingAction = await UserAction.findOne({ user: decodedToken.id, targetId: blog._id, targetType: 'Blog' })
  if (existingAction) {
    return response.status(400).json({ error: 'already voted' })
  }

  await UserAction.create({ user: decodedToken.id, targetId: blog._id, targetType: 'Blog', actionType: 'dislike' })
  blog.dislikeCount += 1
  await blog.save()

  response.status(200).json(blog)
})

// Aggregated blog posts count by year and month
blogsRouter.get('/stats', async (request, response) => {
  const result = await Blog.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1 } // Sort by year and month descending
    }
  ])

  // Transform the result into the format expected by the frontend
  const transformedResult = result.reduce((acc, item) => {
    const year = item._id.year
    const month = item._id.month

    if (!acc[year]) {
      acc[year] = { total: 0, months: {} }
    }

    acc[year].total += item.count
    acc[year].months[month] = item.count

    return acc
  }, {})

  response.json(transformedResult)
})


// Paginated blogs endpoint
// Fetch blogs, optionally filtered by year and month
blogsRouter.get('/', async (request, response) => {
  const { page = 1, limit = 10, year, month } = request.query
  const skip = (page - 1) * limit

  const query = {}
  if (year) {
    query.date = {
      ...query.date,
      $gte: new Date(year, month ? month - 1 : 0, 1),
      $lt: new Date(year, month ? month : 12, 1)
    }
  }

  const totalBlogs = await Blog.countDocuments(query)
  const blogs = await Blog.find(query)
    .populate('user', { email: 1 })
    .skip(skip)
    .limit(Number(limit))
    .sort({ date: -1 })

  response.json({
    totalPages: Math.ceil(totalBlogs / limit),
    currentPage: Number(page),
    blogs,
  })
})



// Get a specific blog post by ID
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { email: 1 })

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).json({ error: 'blog not found' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'admin') {
    return response.status(403).json({ error: 'only admins can create blogs' })
  }

  const blog = new Blog({
    title: body.title,
    content: body.content,
    author: body.author,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

/// Update an existing blog (only for admins)
blogsRouter.put('/:id', async (request, response) => {
  const { title, content, author } = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'admin') {
    return response.status(403).json({ error: 'only admins can update blogs' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, content, author },
    { new: true, runValidators: true, context: 'query' })
    .populate('user', { email: 1 })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

// Delete a blog (only for admins)
blogsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'admin') {
    return response.status(403).json({ error: 'only admins can delete blogs' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }

  await Blog.deleteOne({ _id: blogToDelete._id })
  response.status(204).end()
})


module.exports = blogsRouter
