export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title:
      "I believe in strong client collaboration built on open communication.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm available across different time zones.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a NextJS Application",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "GlowSimcha",
    des: "Business to Consumer E-commerce Website built with MERN Stack",
    img: "/GlowSimcha.webp",
    iconLists: [
      "/nextjs.webp",
      "/expressjs.jpeg",
      "/postgress.webp",
      "/socketio.webp",
      "/ts.webp",
      "/tailwind.webp",
      "/shadcn.webp",
    ],
    link: "https://glow-simcha.vercel.app/",
  },
  {
    id: 2,
    title: "Chat Prototype",
    des: "Real-time chat application prototype using Next.js and Socket.io",
    img: "/Chat prototype.webp",
    iconLists: [
      "/nextjs.webp",
      "/expressjs.jpeg",
      "/socketio.webp",
      "/ts.webp",
      "/tailwind.webp",
    ],
    link: "https://chat-prototype-client.onrender.com/",
  },
  {
    id: 3,
    title: "MERN Chat Application",
    des: "A simple chat application with real-time messaging capabilities.",
    img: "/project-mern chat app.webp",
    iconLists: ["/re.svg", "/expressjs.jpeg", "/nodejs.png", "/mongodb.png"],
    link: "https://github.com/Michaelcarduce/Chat-App",
  },
  {
    id: 4,
    title: "AudioScribe",
    des: "Text-to-Speech, Speech-to-Text, Replace Audio MERN Stack Application",
    img: "/project-AusioScribe.webp",
    iconLists: ["/re.svg", "/expressjs.jpeg", "/nodejs.png", "/mongodb.png"],
    link: "https://github.com/Michaelcarduce/AudioScribe4",
  },
  {
    id: 5,
    title: "My Web Audit",
    des: "Using the provided Figma design, I built this website as part of my application to demonstrate my front-end development skills, meet the project requirements on time, and able to land a job at HIREAWIZ Web Design & Digital Marketing.",
    img: "/my-web-audit.webp",
    iconLists: ["/tailwind.webp", "/html.webp", "/css.webp"],
    link: "https://web-impact-software-solutions-trial.vercel.app/",
  },
];

export const testimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    name: "Lorem Ipsum",
    title: "Lorem ipsum dolor sit amet",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    name: "Lorem Ipsum",
    title: "Lorem ipsum dolor sit amet",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Front-End Developer",
    desc: "Developed and maintained responsive web applications using HTML, CSS, JavaScript/TypeScript, React.js, Next.js, and Vue.js, with Tailwind CSS for styling and Sanity/WordPress for CMS integration. Optimized performance through code splitting, lazy loading, image compression (WebP), and mobile-responsive design. Implemented technical SEO elements like meta tags, structured data, XML sitemaps, and robots.txt; integrated Google Search Console, GA4 for analytics, and GTM for event tracking, resulting in improved site visibility and user engagement.",
    company: "Central One Bataan Inc.",
    duration: "April 2024 – August 2024",
    className: "",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Freelance Front-End Developer",
    desc: "Led frontend development for dynamic web platforms using HTML, CSS, JavaScript/TypeScript, React.js, Next.js, and Vue.js, incorporating advanced UI libraries like shadcn/ui, Framer Motion for animations, and Aceternity UI for modern components. Managed CMS with Sanity and WordPress for custom themes/plugins. Enhanced site performance via optimization techniques including lazy loading, code splitting, and WebP image delivery; ensured cross-device compatibility. Applied SEO best practices with meta tags, schema markup, and Google tools (Search Console, GA4, GTM) to boost search rankings and track user behavior effectively.",
    company:
      "Freelance Front-End Developer Absorbed by Previous Company's Client",
    duration: "August 2024 - Present",
    className: "",
    thumbnail: "/exp4.svg",
  },
  {
    id: 3,
    title: "Freelance Wordpress Developer",
    desc: "Delivered WordPress development by setting up WP Local environment, redesigned navigation with dropdowns for desktop/mobile/tablet screensizes, built and enhanced blog posts, optimized logo, added hero gradients and CTA hover effects, fixed mobile responsiveness, optimized meta titles/descriptions, configured sitemap/robots.txt, integrated Google Tag Manager/Analytics/Bing Webmaster, worked on speed optimization with preload/defer attributes.",
    company: "Randall J. Borden Law Firm",
    duration: "August 25 – September 14 2025",
    className: "",
    thumbnail: "/exp1.svg",
  },
  {
    id: 4,
    title: "Freelance Wordpress Developer",
    desc: "Built and maintained WordPress pages using Beaver Builder, ensuring clean layout hierarchy, proper spacing, and modern UI design. Customized modules, row/column structures, and global styling to match brand guidelines. Enhanced responsiveness across devices, fixing layout shifts, spacing inconsistencies, and mobile-specific issues. Integrated custom CSS for advanced styling when Beaver Builder modules had limitations. Collaborated on template adjustments and theme edits to achieve exact client specifications.",
    company: "HIREAWIZ Web Design & Digital Marketing",
    duration: "October 1 - November 1 2025",
    className: "",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/Michaelcarduce",
  },
  {
    id: 2,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/michael-cardose-47294325b/",
  },
];
