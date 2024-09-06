// This file is used to configure which paths appear in the AppBar/DrawerForSmallScreens

const menuItems = [
  {
    label: 'Home',
    path: '/',
    showInAppBar: false,
    showInDrawer: false,
    showSettingsIcon: true,
  },
  {
    label: 'Contact',
    path: '/contact',
    showInAppBar: true,
    showInDrawer: true,
    showSettingsIcon: false,
  },
]

export default menuItems
