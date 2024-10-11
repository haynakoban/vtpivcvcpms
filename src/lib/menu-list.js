import {
  Dog,
  Calendar,
  LayoutGrid,
  MessageCircle,
  Settings,
  SquareChartGantt,
  Video,
  Logs
} from "lucide-react";

export function getMenuList(pathname, userType = 2) {
  const menu = [
    {
      href: "/auth/pets",
      label: userType == 1 ? "Pet Management" : "My Pets",
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
  ];

  if(userType == 1){
    menu.unshift({
      href: "/auth/audit",
      label: "Audit Trails",
      active: pathname.includes("auth/audit"),
      icon: Logs,
      submenus: [],
    });
  }

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
      menus: menu
    },
    {
      groupLabel: "Settings and Privacy",
      menus: [
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
