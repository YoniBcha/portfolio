"use client";

import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Earth from "@/components/skills";
import Image from "next/image";
import { cardData } from "@/data/cardData";

import HomeIcon from "@/components/icons/HomeIcon";
import ProjectIcon from "@/components/icons/ProjectIcon";
import SkillsIcon from "@/components/icons/SkillsIcon";
import AboutIcon from "@/components/icons/AboutIcon";
import ContactIcon from "@/components/icons/ContactIcon";

interface MasonryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  height: string;
  controls: string;
  isInView: boolean;
}

const MasonryCard = ({
  title,
  description,
  imageUrl,
  height,
  controls,
  isInView,
}: MasonryCardProps) => {
  return (
    <motion.div
      className={`relative rounded-lg shadow-md overflow-hidden ${height}`}
      initial={{ opacity: 0, x: controls === "left" ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="h-[90%] p-2">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[40%]">
        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ y: 0 }}
          whileHover={{ y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 50 }}
          whileHover={{ y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-white">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const textControls = useAnimation();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textBlowUpControls = useAnimation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const homeSectionRef = useRef<HTMLDivElement>(null);
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isProjectInView = useInView(projectSectionRef, {
    once: true,
    margin: "-100px",
  });

  const [currentSection, setCurrentSection] = useState("home");

  const text = "My Name Is Yonas Million";
  const characters = text.split("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Determine which section is currently in view
      const homeSection = homeSectionRef.current;
      const projectSection = projectSectionRef.current;
      const skillsSection = skillsSectionRef.current;
      const aboutSection = aboutSectionRef.current;
      const contactSection = contactSectionRef.current;
      
      if (homeSection && scrollPosition < homeSection.offsetHeight) {
        setCurrentSection("home");
      } else if (projectSection && scrollPosition < projectSection.offsetTop + projectSection.offsetHeight) {
        setCurrentSection("project");
      } else if (skillsSection && scrollPosition < skillsSection.offsetTop + skillsSection.offsetHeight) {
        setCurrentSection("skills");
      } else if (aboutSection && scrollPosition < aboutSection.offsetTop + aboutSection.offsetHeight) {
        setCurrentSection("about");
      } else if (contactSection) {
        setCurrentSection("contact");
      }

      // Header visibility logic
      if (homeSection && scrollPosition > homeSection.offsetHeight) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sequence = async () => {
      await textControls.start((i) => ({
        y: 0,
        x: 0,
        opacity: 1,
        transition: { delay: i * 0.1, duration: 0.5 },
      }));

      if (textContainerRef.current) {
        await textControls.start((i) => ({
          x: 0,
          rotate: 360,
          transition: { delay: i * 0.1, duration: 1, ease: "easeInOut" },
        }));
      }
      await textBlowUpControls.start({
        scale: [1, 1.2, 1],
        opacity: [0, 1],
        transition: { duration: 1, ease: "easeInOut" },
      });
    };

    sequence();
  }, [textControls, textBlowUpControls]);

  const [isNavExtended, setIsNavExtended] = useState(true);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const sidebarLinks = [
    { name: "Home", icon: <HomeIcon />, section: homeSectionRef, id: "home" },
    { name: "Project", icon: <ProjectIcon />, section: projectSectionRef, id: "project" },
    { name: "Skills", icon: <SkillsIcon />, section: skillsSectionRef, id: "skills" },
    { name: "About", icon: <AboutIcon />, section: aboutSectionRef, id: "about" },
    { name: "Contact", icon: <ContactIcon />, section: contactSectionRef, id: "contact" },
  ];

  const socialMediaLinks = [
    { icon: "i.png", url: "https://instagram.com" },
    { icon: "te.svg", url: "https://telegram.org" },
    { icon: "y.png", url: "https://youtube.com" },
    { icon: "l.svg", url: "https://linkedin.com" },
    { icon: "f.png", url: "https://facebook.com" },
    { icon: "t.svg", url: "https://twitter.com" },
    { icon: "tiktok.svg", url: "https://tiktok.com" },
  ];

  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement | null>
  ) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const getCirclePosition = (index: number, total: number, radius = 80) => {
    const angle = index * (360 / total) - 90;
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  return (
    <main className="overflow-hidden">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-[#f46921] text-white"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Circular Mobile Menu with Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-48 w-48">
              {sidebarLinks.map((link, index) => {
                const position = getCirclePosition(index, sidebarLinks.length);
                return (
                  <motion.a
                    key={index}
                    href="#"
                    className="absolute text-white text-lg hover:text-[#f46921] transition-colors"
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.section);
                    }}
                    initial={{
                      y: 100,
                      x: 0,
                      opacity: 0,
                    }}
                    animate={{
                      y: position.y,
                      x: position.x,
                      opacity: 1,
                    }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={
            isHeaderVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="border-t border-gray-200 shadow-xl py-1 rounded-xl w-[80%] ml-40 z-10 bg-white hidden md:block"
        >
          <nav className="flex justify-end items-center gap-7">
            {sidebarLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center gap-2 text-black relative 
                     hover:border-[#f46921] border-transparent border-b-2 
                     transition-all duration-300 ease-in-out pb-1"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.section);
                }}
              >
                <span className="hover:text-[#f46921] tetx-xl font-semibold">
                  {link.name}
                </span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f46921] 
                       transition-all duration-300 ease-in-out group-hover:w-full"
                ></span>
              </a>
            ))}
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white"></div>
          </nav>
        </motion.header>
      </nav>

      {/* Updated Hero Section */}
      <section
        ref={homeSectionRef}
        className="relative flex flex-col h-screen w-full overflow-hidden bg-white"
      >
        {/* Sidebar - Visible only in home section */}
        {currentSection === "home" && (
          <motion.div
            className={`hidden md:flex h-[90%] rounded-xl shadow-2xl p-2 bg-white ${
              isNavExtended ? "w-14" : "w-48"
            } fixed left-4 top-[5%] z-20`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-end">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsNavExtended(!isNavExtended)}
                >
                  {isNavExtended ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12"
                      viewBox="0 0 128 128"
                    >
                      <path
                        fill="#ffca28"
                        d="M58.7 41.1c10.8.1 53.3.4 54.9.4c12.8.3 12.7 16.7.7 16.9c-1.5 0-25 1.1-32.2 1.3c5.2 2 7.5 11.9-3.1 14.9c5 2.6 6.4 12.9-4.2 14.7c3.8 2.5 4.3 10.9-6 14.2c-8.4 2.7-28.2 2-40.3-2.3c-9.1-3.3-8.4-5.8-16.7-5.6c-1.4 0-2.1-1.1-2.4-2.4c-1.3-5.9-1.9-26.3-.3-33.8c.4-1.6 1.7-1.8 2.2-1.9c2.1-.4 4.2-2.5 5-4.3c3.2-6.4 12.8-12.8 23.4-18.2c5.5-2.8 9.2-8.8 10.4-18.3c.8-6.3 8.6-7.7 11.8-2.5c2.2 3.6 2.9 7 2.9 10.4c.2 6.2-1.6 10.1-6.1 16.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12"
                      viewBox="0 0 128 128"
                    >
                      <path
                        fill="#ffca28"
                        d="M72.8 41.1c-10.8.1-53.3.4-54.9.4c-12.9.3-12.8 16.7-.8 17c1.5 0 25 1.1 32.2 1.3c-5.2 2-7.5 11.9 3.1 14.9c-5 2.6-6.4 12.9 4.2 14.7c-3.8 2.5-4.3 10.9 6 14.2c8.4 2.7 28.2 2 40.3-2.3c9.1-3.3 8.4-5.8 16.7-5.6c1.4 0 2.1-1.1 2.4-2.4c1.3-5.9 1.9-26.3.3-33.8c-.4-1.6-1.7-1.8-2.2-1.9c-2.1-.4-4.2-2.5-5-4.3c-3.2-6.4-12.8-12.8-23.4-18.2c-5.5-2.8-9.2-8.8-10.4-18.3c-.8-6.3-8.6-7.7-11.8-2.5c-2.2 3.6-2.9 7-2.9 10.4c-.1 6.1 1.7 10 6.2 16.4"
                      />
                    </svg>
                  )}
                </motion.div>
              </div>
              <div className="flex flex-col justify-evenly items-start -mt-5 flex-grow">
                {sidebarLinks.map((link, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredIcon(link.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <a
                      href="#"
                      className="flex items-center gap-5 text-black hover:text-[#f46921] w-full rounded-md p-1 transition-colors duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.section);
                      }}
                    >
                      {link.icon}
                      {isNavExtended ? "" : <span>{link.name}</span>}
                    </a>
                    {isNavExtended && hoveredIcon === link.name && (
                      <motion.div
                        className="absolute left-full ml-2 bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {link.name}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Section with Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
          <div className="flex flex-col justify-center p-8 md:pl-28 z-10">
            <motion.div
              className="text-3xl mb-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={textBlowUpControls}
            >
              I am a software engineer and graphics designer
            </motion.div>

            <div
              className="flex mt-5 h-80 whitespace-nowrap"
              ref={textContainerRef}
            >
              {characters.map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial={{ x: 0, y: "-100vh", opacity: 0, rotate: -360 }}
                  animate={textControls}
                  className="text-5xl text-[#f46921] font-bold"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="text-sm -mt-40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
              consequatur sequi id enim distinctio ad maxime fuga voluptas
              eligendi? Beatae quasi at molestias vitae ipsum dolorem corrupti,
              rerum vel quo.
            </motion.div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-70 z-10"></div>
            <Image
              src="/yo.jpg"
              alt="Yonas Million"
              layout="fill"
              objectFit="cover"
              className="opacity-90"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row justify-between items-center border py-1 px-2 mx-3 md:mx-20 rounded-xl bg-white/80 backdrop-blur-sm mt-10">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="text-xl font-bold text-[#f46921]">
            Social media links
          </div>
          <div className="text-sm text-gray-600">
            for more about me and information
          </div>
        </div>
        <div className="flex items-center gap-5 flex-wrap justify-center">
          {socialMediaLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-8 w-8 overflow-hidden hover:scale-110 transition-transform"
            >
              <Image
                src={`/socialmedia/${social.icon}`}
                alt={`Social media icon ${index}`}
                layout="fill"
                objectFit="cover"
              />
            </a>
          ))}
        </div>
      </section>

      <section
        ref={projectSectionRef}
        className="flex flex-col gap-10 px-5 md:px-20 mt-16 py-10"
      >
        <div className="text-3xl text-[#f46921] font-bold text-center">
          Projects
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((col) => (
            <div key={col} className="grid gap-4">
              {cardData
                .filter((_, index) => index % 4 === col)
                .map((card, index) => (
                  <MasonryCard
                    key={index}
                    {...card}
                    controls={col % 2 === 0 ? "left" : "right"}
                    isInView={isProjectInView}
                  />
                ))}
            </div>
          ))}
        </div>
      </section>

      <section
        ref={skillsSectionRef}
        className="flex flex-col md:flex-row items-center justify-center py-20 px-5 md:px-20 bg-white/80 backdrop-blur-sm"
      >
        <div className="text-3xl text-[#f46921] font-bold text-center mb-10 md:mb-0 md:mr-20">
          Skills
        </div>
        <div className="w-full md:w-auto">
          <Earth />
        </div>
      </section>

      {/* About Section with Horizontal Scroll - No Scrollbar */}
      <section
        ref={aboutSectionRef}
        className="py-20 px-5 md:px-20 bg-gray-50 overflow-x-auto scrollbar-hide"
      >
        <div className="text-3xl text-[#f46921] font-bold text-center mb-10">
          About Me
        </div>
        <div className="flex pb-6 gap-6 w-max">
          {[
            {
              title: "Background",
              content:
                "I'm Yonas Million, a passionate software engineer and graphics designer with over 5 years of experience in creating beautiful, functional digital experiences.",
            },
            {
              title: "Expertise",
              content:
                "My expertise spans across frontend development, UI/UX design, and creating interactive web applications that delight users.",
            },
            {
              title: "Passion",
              content:
                "When I'm not coding or designing, you can find me exploring new technologies, contributing to open source projects, or mentoring aspiring developers.",
            },
            {
              title: "Education",
              content:
                "I hold a degree in Computer Science and have completed numerous certifications in both software development and graphic design.",
            },
            {
              title: "Approach",
              content:
                "I believe in creating solutions that are not only functional but also aesthetically pleasing and user-friendly.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold text-[#f46921] mb-4">
                {card.title}
              </h3>
              <p className="text-gray-700">{card.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactSectionRef}
        className="py-20 px-5 md:px-20 bg-white relative"
      >
        <div className="text-3xl text-[#f46921] font-bold text-center mb-10">
          Contact Me
        </div>
        <div className="flex justify-center gap-4 mb-10 text-6xl">
          {["👨‍💻", "👋", "😊", "🙌", "👍"].map((emoji, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
        <div className="max-w-md mx-auto">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f46921] focus:border-[#f46921]"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f46921] focus:border-[#f46921]"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f46921] focus:border-[#f46921]"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#f46921] hover:bg-[#e05e1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f46921]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 py-8 px-5 md:px-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800">Yonas Million</h3>
              <p className="text-gray-600">Software Engineer & Designer</p>
            </div>
            <div className="flex space-x-6">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#f46921] transition-colors"
                >
                  <div className="relative h-6 w-6">
                    <Image
                      src={`/socialmedia/${social.icon}`}
                      alt={`Social media icon ${index}`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Yonas Million. All rights
              reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}