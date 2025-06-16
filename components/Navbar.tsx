"use client";

import Link from "next/link";
import { Menu, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type NavLink = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const navLinks: NavLink[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about-us",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ];

  return (
    <nav className="sticky top-0 w-full z-50 max-w-8xl transition-colors duration-500 bg-black">
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h2 className="text-white font-bold text-lg">
                Property Visualizer
              </h2>
            </Link>
          </div>

          {/* Desktop Links with Hover Dropdowns */}
          <div className="hidden md:flex space-x-20 text-lg relative">
            {navLinks.map((link, index) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`flex items-center cursor-pointer font-semibold ${
                    scrolled ? "text-gray-800" : "text-white"
                  } hover:text-red-600 transition duration-300 space-x-1`}
                >
                  <Link href={link.href}>{link.label}</Link>
                </div>
                <AnimatePresence>
                  {hoveredIndex === index &&
                    !["Home", "Blog", "About"].includes(link.label) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 bg-white rounded-md shadow-md w-56 p-2 z-50"
                      >
                        <ul className="space-y-2">
                          {link.subItems &&
                            link.subItems.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={() => setHoveredIndex(null)}
                                  className="flex items-center justify-between px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition"
                                >
                                  {sub.label}
                                  <ChevronRight className="w-4 h-4" />
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Toggler & Login */}
          <div className="hidden md:flex space-x-6 text-lg">
            <Button asChild className="bg-red-600 hover:bg-red-800">
              <Link
                href="/sign-up"
                className={`transition duration-300 font-semibold ${
                  scrolled ? "text-white" : "text-white"
                }`}
              >
                Sign Up
              </Link>
            </Button>
            <Button
              asChild
              className="hover:bg-red-600 bg-transparent hover:text-white hover:border-none"
              variant="outline"
            >
              <Link
                href="/login"
                className={`transition duration-300 font-semibold ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="p-2 cursor-pointer">
                <Menu className="h-6 w-6 text-white" />
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-6">
                  <h1 className="-mt-10">Property World</h1>
                  <Separator className="border border-gray-200" />
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <p className="font-semibold text-gray-800 flex items-center">
                        {link.label}
                      </p>
                      <ul className="ml-2 space-y-1">
                        {link.subItems?.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-700 hover:text-blue-600 transition"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <Button asChild variant={"outline"}>
                      <Link
                        href="/login"
                        className="transition duration-300 font-semibold text-gray-800 border border-gray-950"
                      >
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="bg-red-700 hover:bg-red-800">
                      <Link
                        href="/sign-up"
                        className={`transition duration-300 font-semibold ${
                          scrolled ? "text-white" : "text-white"
                        }`}
                      >
                        Register
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
