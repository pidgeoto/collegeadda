"use client"
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import Link from "next/link";

const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky w-full top-0 z-50 bg-white shadow-lg lg:hidden">
      <div className="flex items-center justify-between p-4">
        <Logo />
        <div className="cursor-pointer" onClick={toggleNavbar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-800 text-white p-4">
          <Link href="/" className="block py-2">Home</Link>
          <Link href="/university" className="block py-2">University</Link>
          <Link href="/exams" className="block py-2">Exams</Link>
        </div>
      )}
    </div>
  );
};

export default ResponsiveNav;
