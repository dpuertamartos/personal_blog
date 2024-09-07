// src/services/blogs.js
import axiosInstance from './api'

const getAll = async () => {
  const response = await axiosInstance.get('/blogs')
  return response.data
}

const getStats = async () => {
  const response = await axiosInstance.get('/blogs/stats')
  return response.data
}

const getFiltered = async (page, year, month) => {
  const response = await axiosInstance.get(`/blogs?page=${page}&year=${year}&month=${month}`)
  return response.data
}

const getPaginated = async (page = 1) => {
  const response = await axiosInstance.get(`/blogs?page=${page}`)
  return response.data
}

const get = async (id) => {
  const response = await axiosInstance.get(`/blogs/${id}`)
  return response.data
}

const create = async (newObject) => {
  const response = await axiosInstance.post('/blogs', newObject)
  return response.data
}

const remove = async (id) => {
  const response = await axiosInstance.delete(`/blogs/${id}`)
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axiosInstance.put(`/blogs/${id}`, updatedObject)
  return response.data
}

const vote = async (blogId, type) => {
  const response = await axiosInstance.post(`/blogs/${blogId}/${type}`)
  return response
}

export default { getAll, getStats, getPaginated, getFiltered, get, create, remove, update, vote }
