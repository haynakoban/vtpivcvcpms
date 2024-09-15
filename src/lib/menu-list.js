import {
  Dog,
  Calendar,
  LayoutGrid,
  MessageCircle,
  Settings,
  SquareChartGantt,
  User,
  Video,
} from "lucide-react";

export function getMenuList(pathname) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/auth/dashboard",
          label: "Dashboard",
          active: pathname.includes("auth/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/auth/pets",
          label: "My Pets",
          active: pathname.includes("auth/pets"),
          icon: Dog,
          submenus: [],
        },
        {
          href: "/auth/appointment",
          label: "Appointment",
          active: pathname.includes("auth/appointment"),
          icon: Calendar,
          submenus: [],
        },
        {
          href: "/auth/careplan",
          label: "Careplan",
          active: pathname.includes("auth/careplan"),
          icon: SquareChartGantt,
          submenus: [],
        },
        {
          href: "/auth/messages",
          label: "Messages",
          active: pathname.includes("auth/messages"),
          icon: MessageCircle,
          submenus: [],
        },
        {
          href: "/auth/meetings",
          label: "Meetings",
          active: pathname.includes("auth/meetings"),
          icon: Video,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings and Privacy",
      menus: [
        {
          href: "/auth/account",
          label: "Account",
          active: pathname.includes("auth/account"),
          icon: User,
          submenus: [],
        },
        {
          href: "/auth/settings",
          label: "Settings",
          active: pathname.includes("auth/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
