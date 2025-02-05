"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Earth from "@/components/skills";

const skills = [
  { name: "Flutter", icon: "@/assets/images/chess.jpg" },
  { name: "React", icon: "@/assets/images/chess.jpg" },
  { name: "Vue", icon: "@/assets/images/chess.jpg" },
  { name: "Next.js", icon: "@/assets/images/chess.jpg" },
];

export default function Home() {
  const textControls = useAnimation();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textBlowUpControls = useAnimation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false); // Track header visibility
  const homeSectionRef = useRef<HTMLDivElement>(null); // Ref for the home section

  const text = "My Name Is Yonas Million";
  const characters = text.split("");

  useEffect(() => {
    const sequence = async () => {
      await textControls.start((i) => ({
        y: 0,
        x: 0,
        opacity: 1,
        transition: { delay: i * 0.1, duration: 0.5 },
      }));

      if (textContainerRef.current) {
        const redSectionWidth =
          textContainerRef.current.parentElement?.offsetWidth || 0;
        const textWidth = textContainerRef.current.offsetWidth;
        const distanceToMove = redSectionWidth - textWidth;

        await textControls.start((i) => ({
          x: distanceToMove,
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

  useEffect(() => {
    const handleScroll = () => {
      if (homeSectionRef.current) {
        const homeSectionHeight = homeSectionRef.current.offsetHeight; // Height of the home section
        const scrollY = window.scrollY; // Current scroll position

        // Show header only if the user has scrolled past the home section
        if (scrollY > homeSectionHeight) {
          setIsHeaderVisible(true);
        } else {
          setIsHeaderVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="mx-2 md:mx-24">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={
          isHeaderVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-[160px] right-[160px] z-50 shadow-md h-20 flex items-center"
        style={{
          background:
            "linear-gradient(to bottom, rgba(102, 126, 234, 1), rgba(118, 75, 162, 0))",
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6))",
        }}
      >
        <nav className="flex justify-end w-full items-center gap-6 pr-6">
          {["Home", "Project", "Skills", "About", "Contact Me"].map(
            (link, index) => (
              <a
                key={index}
                href="#"
                className="text-white hover:text-gray-200"
              >
                {link}
              </a>
            )
          )}
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white"></div>
        </nav>
      </motion.header>

      <section ref={homeSectionRef} className="h-screen ">
        <div className="flex justify-end mt-10">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-500"></div>
        </div>
        <div className="flex relative overflow-visible mt-20">
          <div className="">
            <div className="absolute left-1/2 top-[28%] transform -translate-y-1/4">
              {[
                "Home",
                "Project",
                "Skills",
                "About",
                "Contact me",
                "Social media accounts",
              ].map((link, index) => (
                <div
                  key={index}
                  className="absolute w-28 pb-7 text-center"
                  style={{
                    transform: `rotate(${
                      (180 / 6) * index - 90
                    }deg) translateX(160px) rotate(${-(
                      (180 / 6) * index -
                      90
                    )}deg)`,
                  }}
                >
                  {link}
                </div>
              ))}
            </div>
            <motion.div
              className="mt-14  ml-20 text-3xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={textBlowUpControls}
            >
              I am software engineer and graphics designer
            </motion.div>{" "}
            <div
              className="flex ml-10  mt-5 h-80 items whitespace-nowrap"
              ref={textContainerRef}
            >
              {characters.map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial={{ x: 0, y: "-100vh", opacity: 0, rotate: -360 }}
                  animate={textControls}
                  className="text-5xl font-bold"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="h-40 w-full -mt-60"></div>
        </div>
        <div className="flex-1"></div>
      </section>

      {/* Project Section */}
      <section className="flex flex-col gap-10 mx-16 -mt-5">
        <div className="text-2xl font-bold text-center">Projects</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={homeSectionRef} className="h-screen ">
        <div className="text-2xl font-bold text-center">Skills</div>
        <div className="">
          <Earth />
        </div>
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            // backgroundColor: "#f0f0f0",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            My Skills
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              flexWrap: "wrap",
            }}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  style={{ width: "80px", height: "80px" }}
                />
                <p style={{ marginTop: "10px", fontSize: "1.2rem" }}>
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
