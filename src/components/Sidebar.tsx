import { cn } from "@/lib/utils";
import {
  Banknote,
  Bell,
  Cloud,
  LockKeyhole,
  LogOut,
  Tag,
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const sidebarLinks = [
  {
    name: "Accounts",
    href: "#",
    icon: <UserRound />,
  },
  {
    name: "Security",
    href: "#",
    icon: <LockKeyhole />,
  },
  {
    name: "Notifications",
    href: "#",
    icon: <Bell />,
  },
  {
    name: "Pricing",
    href: "#",
    icon: <Banknote />,
  },
  {
    name: "Sales",
    href: "#",
    icon: <Tag />,
  },
  {
    name: "Users and Roles",
    href: "#",
    icon: <Users />,
  },
  {
    name: "Backup",
    href: "#",
    icon: <Cloud />,
  },
];

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 w-64 p-4 text-gray-500 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="border flex flex-col rounded-md h-[calc(100%-100px)] bg-white">
        <div className="p-4">
          <p className="font-semibold text-black">Settings</p>
        </div>
        <ul className="flex-1 p-2">
          {sidebarLinks.map(({ href, icon, name }) => (
            <li key={name}>
              <Link href={href} legacyBehavior>
                <a className="p-4 flex items-center text-sm gap-4 rounded-md hover:text-blue-500 hover:bg-blue-100">
                  {icon} {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-4">
          <Button variant={"outline"} className="text-black">
            <LogOut className="mr-4" /> Back to dashboard
          </Button>
        </div>
      </nav>
    </aside>
  );
}
