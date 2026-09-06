"use client";

import { useState } from "react";
import Link from "next/link";
import ContactPopup from "./contact-popup";

export default function Navbar() {
  const isVisible = true;
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactOpen(true);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact", onClick: handleContactClick },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 right-0 z-40 p-6 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.href}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="relative text-white font-bold text-lg hover-underline"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="relative text-white font-bold text-lg hover-underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <ContactPopup 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  );
} 