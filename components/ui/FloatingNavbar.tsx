// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent,
// } from "framer-motion";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { usePathname, useRouter } from "next/navigation";

// export const FloatingNav = ({
//   navItems,
//   className,
// }: {
//   navItems: {
//     name: string;
//     link: string;
//     icon?: JSX.Element;
//   }[];
//   className?: string;
// }) => {
//   const { scrollYProgress } = useScroll();
//   const [visible, setVisible] = useState(true);
//   const [activeSection, setActiveSection] = useState<string | null>(null);
//   const router = useRouter();
//   const pathname = usePathname();

//   // Handle smooth scrolling to sections
//   const handleScrollTo = (e: React.MouseEvent, id: string) => {
//     e.preventDefault();

//     if (typeof window === "undefined" || typeof document === "undefined")
//       return;
//     // For home link or when clicking the same section
//     if (id === "home" || activeSection === id) {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//       router.push(pathname); // Reset the URL
//       setActiveSection("home");
//       return;
//     }

//     const element = document.getElementById(id);
//     if (element) {
//       // Calculate position with offset for navbar
//       const offset = 80; // Adjust based on your navbar height
//       const bodyRect = document.body.getBoundingClientRect().top;
//       const elementRect = element.getBoundingClientRect().top;
//       const elementPosition = elementRect - bodyRect;
//       const offsetPosition = elementPosition - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });

//       // Update URL without page reload
//       window.history.pushState({}, "", `#${id}`);
//       setActiveSection(id);
//     }
//   };

//   // Update active section based on scroll position
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;

//       // Special case for top of page
//       if (scrollPosition < 100) {
//         setActiveSection("home");
//         return;
//       }

//       navItems.forEach((item) => {
//         const sectionId = item.link.replace("#", "");
//         const section = document.getElementById(sectionId);
//         if (section) {
//           const sectionTop = section.offsetTop;
//           const sectionHeight = section.offsetHeight;
//           const offset = 100; // Same as in handleScrollTo

//           if (
//             scrollPosition >= sectionTop - offset &&
//             scrollPosition < sectionTop + sectionHeight - offset
//           ) {
//             setActiveSection(sectionId);
//           }
//         }
//       });
//     };

//     // Initialize active section
//     handleScroll();
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [navItems]);

//   useMotionValueEvent(scrollYProgress, "change", (current) => {
//     if (typeof current === "number") {
//       let direction = current - (scrollYProgress.getPrevious() || 0);

//       if (current < 0.05) {
//         setVisible(true);
//       } else {
//         setVisible(direction < 0);
//       }
//     }
//   });

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         initial={{
//           opacity: 1,
//           y: -100,
//         }}
//         animate={{
//           y: visible ? 0 : -100,
//           opacity: visible ? 1 : 0,
//         }}
//         transition={{
//           duration: 0.2,
//         }}
//         className={cn(
//           "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
//           className
//         )}
//         style={{
//           backdropFilter: "blur(16px) saturate(180%)",
//           backgroundColor: "rgba(17, 25, 40, 0.75)",
//           borderRadius: "12px",
//           border: "1px solid rgba(255, 255, 255, 0.125)",
//         }}>
//         {navItems.map((navItem: any, idx: number) => {
//           const sectionId = navItem.link.replace("#", "");
//           return (
//             <Link
//               key={`link=${idx}`}
//               href={navItem.link}
//               onClick={(e) => handleScrollTo(e, sectionId)}
//               className={cn(
//                 "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
//                 activeSection === sectionId
//                   ? "text-neutral-100 font-medium"
//                   : ""
//               )}>
//               <span className="block sm:hidden">{navItem.icon}</span>
//               <span className="text-sm cursor-pointer">{navItem.name}</span>
//             </Link>
//           );
//         })}
//       </motion.div>
//     </AnimatePresence>
//   );
// };

"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize component
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle smooth scrolling to sections
  const handleScrollTo = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();

      if (!isMounted) return;

      // For home link or when clicking the same section
      if (id === "home" || activeSection === id) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        router.push(pathname); // Reset the URL
        setActiveSection("home");
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        // Calculate position with offset for navbar
        const offset = 80; // Adjust based on your navbar height
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL without page reload
        window.history.pushState({}, "", `#${id}`);
        setActiveSection(id);
      }
    },
    [isMounted, activeSection, router, pathname]
  );

  // Update active section based on scroll position
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Special case for top of page
      if (scrollPosition < 100) {
        setActiveSection("home");
        return;
      }

      let newActiveSection: string | null = null;

      navItems.forEach((item) => {
        const sectionId = item.link.replace("#", "");
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const offset = 100; // Same as in handleScrollTo

          if (
            scrollPosition >= sectionTop - offset &&
            scrollPosition < sectionTop + sectionHeight - offset
          ) {
            newActiveSection = sectionId;
          }
        }
      });

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    // Initialize active section
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted, navItems, activeSection]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (!isMounted) return;

    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() || 0);
      setVisible(current < 0.05 || direction < 0);
    }
  });

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}>
        {navItems.map((navItem, idx) => {
          const sectionId = navItem.link.replace("#", "");
          return (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              onClick={(e) => handleScrollTo(e, sectionId)}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
                activeSection === sectionId
                  ? "text-neutral-100 font-medium"
                  : ""
              )}>
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-sm cursor-pointer">{navItem.name}</span>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
