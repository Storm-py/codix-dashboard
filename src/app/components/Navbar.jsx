"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  Menu,
  Search,
  ShoppingCart,
  MessageCircle,
  Bell,
  Home,
  ShoppingBag,
  FileText,
  Mail,
  Calendar,
  Users,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/"); 
  const { data: session } = useSession();

  
  // if (!session) {
  //   return null; 
  // }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsSidebarOpen(false); 
  };

  return (
    <div className="relative">
      <nav className="flex items-center justify-between p-4 bg-gray-100 border-b-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none focus:text-gray-800"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </button>

        <div className="flex items-center flex-grow justify-start px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="search"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={signOut} className="text-black px-4 py-1 focus:outline-none focus:text-gray-800 bg-gray-300 rounded-lg font-medium">
            Sign Out
          </button>
          <button className="text-gray-600 focus:outline-none focus:text-gray-800">
            <ShoppingCart className="h-6 w-6" />
          </button>
          <button className="text-gray-600 focus:outline-none focus:text-gray-800">
            <MessageCircle className="h-6 w-6" />
          </button>
          <button className="text-gray-600 focus:outline-none focus:text-gray-800">
            <Bell className="h-6 w-6" />
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </nav>

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold">
              <Image src="/logo.png" width={60} height={30} alt="Logo" />
            </h1>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <div className="px-4 py-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Dashboards
              </h2>
              <div className="mt-2 space-y-1">
                <Link
                  href="/"
                  onClick={() => handleLinkClick("/")}
                  className={`flex items-center px-6 py-3 text-lg font-medium rounded-lg ${
                    activeLink === "/" ? "bg-[#0028ff] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Home className="h-5 w-5 mr-3" />
                  Modern
                </Link>
                <Link
                  href="/create-portfolio"
                  onClick={() => handleLinkClick("/create-portfolio")}
                  className={`flex items-center px-6 py-3 text-lg font-medium rounded-lg ${
                    activeLink === "/create-portfolio" ? "bg-[#0028ff] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <MessageCircle className="h-5 w-5 mr-3" />
                  Add Portfolio
                </Link>
                <Link
                  href="/create-blog"
                  onClick={() => handleLinkClick("/create-blog")}
                  className={`flex items-center px-6 py-3 text-lg font-medium rounded-lg ${
                    activeLink === "/create-blog" ? "bg-[#0028ff] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ShoppingBag className="h-5 w-5 mr-3" />
                  Add Blog
                </Link>
                <Link
                  href="/create-service"
                  onClick={() => handleLinkClick("/create-service")}
                  className={`flex items-center px-6 py-3 text-lg font-medium rounded-lg ${
                    activeLink === "/create-service" ? "bg-[#0028ff] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ShoppingBag className="h-5 w-5 mr-3" />
                  Add Service
                </Link>
              </div>
            </div>
            <div className="px-4 py-2 mt-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Apps
              </h2>
              <div className="mt-2 space-y-1">
                <Link
                  href="/notes"
                  onClick={() => handleLinkClick("/notes")}
                  className={`flex items-center px-6 py-3 text-lg font-medium rounded-lg ${
                    activeLink === "/notes" ? "bg-[#0028ff] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Notes
                </Link>
                <Link
                  href="/mail"
                  onClick={() => handleLinkClick("/mail")}
                  className={`flex items-center px-6 py-3 text-lg font-medium rounded-lg ${
                    activeLink === "/mail" ? "bg-[#0028ff] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Mail className="h-5 w-5 mr-3" />
                  Mail
                </Link>
                <Link
                  href="/calendar"
                  onClick={() => handleLinkClick("/calendar")}
                  className={`flex items-center px-6 py-3 text-lg font-medium rounded-lg ${
                    activeLink === "/calendar" ? "bg-[#0028ff] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  Calendar
                </Link>
                <Link
                  href="/customers"
                  onClick={() => handleLinkClick("/customers")}
                  className={`flex items-center px-6 py-3 text-lg font-medium rounded-lg ${
                    activeLink === "/customers" ? "bg-[#0028ff] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Users className="h-5 w-5 mr-3" />
                  Customers
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
