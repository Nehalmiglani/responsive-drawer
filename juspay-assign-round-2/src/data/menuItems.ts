export interface MenuItem {
    id: string
    label: string
    icon: string
    description: string
    children?: MenuItem[] //handles all level deep nested items
  }
  
  export interface MenuData {
    menuItems: MenuItem[]
  }
  
  export const menuData: MenuData = {
    menuItems: [
      {
        id: "home",
        label: "Home",
        icon: "HomeIcon",
        description: "Return to main dashboard",
      },
      {
        id: "profile",
        label: "Profile",
        icon: "PersonIcon",
        description: "Manage your account",
        children: [
          {
            id: "account",
            label: "Account Settings",
            icon: "AccountCircleIcon",
            description: "Personal information and preferences",
          },
          {
            id: "security",
            label: "Security",
            icon: "SecurityIcon",
            description: "Password and security settings",
          },
        ],
      },
      {
        id: "settings",
        label: "Settings",
        icon: "SettingsIcon",
        description: "App preferences",
        children: [
          {
            id: "language",
            label: "Language",
            icon: "LanguageIcon",
            description: "Change app language",
          },
          {
            id: "theme",
            label: "Appearance",
            icon: "PaletteIcon",
            description: "Dark mode and themes",
          },
          {
            id: "sound",
            label: "Sound & Haptics",
            icon: "VolumeUpIcon",
            description: "Audio and vibration settings",
          },
        ],
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: "NotificationsIcon",
        description: "Manage your alerts",
      },
      {
        id: "help",
        label: "Help & Support",
        icon: "HelpIcon",
        description: "Get assistance",
        children: [
          {
            id: "faq",
            label: "FAQ",
            icon: "InfoIcon",
            description: "Frequently asked questions",
          },
          {
            id: "contact",
            label: "Contact Support",
            icon: "ContactSupportIcon",
            description: "Get help from our team",
          },
        ],
      },
    ],
  }
  