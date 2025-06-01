"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactPopup from "./contact-popup";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (pathname === '/') {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Check if the element's center is in the middle half of the viewport
              const rect = entry.boundingClientRect;
              const viewportHeight = window.innerHeight;
              const elementCenter = rect.top + rect.height / 2;
              const viewportCenter = viewportHeight / 2;
              
              // If element center is within middle 50% of viewport
              if (elementCenter >= viewportHeight * 0.25 && elementCenter <= viewportHeight * 0.75) {
                const section = entry.target.tagName.toLowerCase();
                setActiveSection(section);
              }
            }
          });
        },
        {
          threshold: [0.1, 0.5, 0.9],
          rootMargin: '-25% 0px -25% 0px'
        }
      );

      // Observe hero and section elements
      const hero = document.querySelector('section:first-of-type');
      const portfolioSection = document.querySelector('section:last-of-type');
      
      if (hero) observerRef.current.observe(hero);
      if (portfolioSection) observerRef.current.observe(portfolioSection);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]);

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