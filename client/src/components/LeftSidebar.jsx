import {
  Home,
  Search,
  PlusCircle,
  MessageCircle,
  User,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SidebarMenuPopup from "./SidebarMenuPopup";

export default function LeftSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Search, label: "Search", to: "/search" },
    { icon: PlusCircle, label: "Create", to: "#" },
    { icon: MessageCircle, label: "Forum", to: "/forum" },
    { icon: User, label: "Profile", to: "/profile" },
  ];

  return (
    <div className="flex flex-col h-full justify-between py-4 px-3">
      {/* Logo */}
      <div className="flex mb-4">
        <img src="/logo2.jpg" alt="Logo" className="w-12 h-12 rounded-full" />
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-1">
        {navigation.map((item, idx) =>
          item.to === "#" ? (
            <button
              key={idx}
              className="flex items-center gap-3 px-4 py-2 w-full
                         rounded-lg transition
                         hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <item.icon size={24} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 w-full rounded-lg transition
                 ${
                   isActive
                     ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                     : "hover:bg-gray-200 dark:hover:bg-gray-700"
                 }`
              }
            >
              <item.icon size={24} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          )
        )}
      </div>

      {/* Bottom Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-3 px-4 py-2 w-full
                     rounded-lg transition
                     hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Menu size={22} />
          <span className="text-sm font-medium">More</span>
        </button>

        {menuOpen && <SidebarMenuPopup />}
      </div>
    </div>
  );
}
