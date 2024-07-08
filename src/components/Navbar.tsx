import { Bell, CircleHelp, Settings, Wallet } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import Logo from "../../public/logo.svg";

interface NavbarProps {
  toggleSidebar: () => void;
}

const navbarLinks = [
  {
    name: "Notifications",
    href: "#",
    icon: <Bell />,
  },
  {
    name: "Wallet",
    href: "#",
    icon: <Wallet />,
  },
  {
    name: "Enquiries",
    href: "#",
    icon: <CircleHelp />,
  },
  {
    name: "Settings",
    href: "#",
    icon: <Settings />,
  },
];

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button className="text-gray-800 md:hidden" onClick={toggleSidebar}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <a href="#" className="mr-2">
          <img src={Logo.src} className="w-12 h-12" />
        </a>
        <Input
          placeholder="Search...."
          className="w-full h-10 hidden md:block"
        />
      </div>
      <ul className="flex justify-between gap-8">
        {navbarLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href} legacyBehavior>
              <a className="flex flex-col items-center space-x-2 text-xs  text-gray-500 hover:text-blue-500">
                {link.icon}
                <span className="mt-2">{link.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
