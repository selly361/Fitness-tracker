"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Dumbbell,
  ChartLineIcon,
  TargetIcon,
  Users,
  ArrowLeftIcon,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", icon: <LayoutDashboard />, href: "/" },
  { name: "Log Workout", icon: <Dumbbell />, href: "/log-workout" },
  { name: "Progress", icon: <ChartLineIcon />, href: "/progress" },
  { name: "Goals", icon: <TargetIcon />, href: "/goals" },
  { name: "Community", icon: <Users />, href: "/community" },
];

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      className="h-screen bg-[#3A2559] text-gray-300 pt-10 flex flex-col w-64 space-y-6 overflow-hidden pb-20 rounded-r-[12px]"
      animate={{ width: isMinimized ? 80 : 256 }}
    >
      <div className="flex items-center pl-8 text-lg font-bold">
        {isMinimized ? (
          <>
            <span className="text-white text-lg">L</span>
            <span className="text-[#842C7E] text-lg">A</span>
          </>
        ) : (
          <span className="text-white whitespace-nowrap">
            LSBU <span className="text-[#842C7E]">Active</span>
          </span>
        )}
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          {NAV_ITEMS.map(({ name, icon, href }) => (
            <Link className="hover:bg-[#842C7E]" key={name} href={href}>
              <motion.li
                className={cn(
                  "flex items-center space-x-4 p-2 rounded-r-[12px] cursor-pointer pl-8 w-[90%] h-14 max-h-14 border-l-4 border-transparent box-border",
                  pathname === href ? "border-[#842C7E] bg-[#842C7E]/20" : ""
                )}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {icon && (
                  <motion.div
                    initial={false}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {icon}
                  </motion.div>
                )}
                <motion.span
                  className="text-sm whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isMinimized ? 0 : 1 }}
                  transition={{ duration: 0.2, delay: isMinimized ? 0 : 0.1 }}
                >
                  {name}
                </motion.span>
              </motion.li>
            </Link>
          ))}
        </ul>
      </nav>

      <button
        className="flex items-center space-x-4 p-2 pl-8 cursor-pointer h-14 max-h-14"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <motion.div
          initial={false}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowLeftIcon
            className={cn(
              "transition-transform ease-in-out duration-500",
              isMinimized ? "transform rotate-180" : ""
            )}
          />
        </motion.div>
        <motion.span
          className="text-sm whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMinimized ? 0 : 1 }}
          transition={{ duration: 0.2, delay: isMinimized ? 0 : 0.1 }}
        >
          Minimize Menu
        </motion.span>
      </button>
    </motion.aside>
  );
}
