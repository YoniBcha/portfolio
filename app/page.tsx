"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const textControls = useAnimation();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textBlowUpControls = useAnimation();
  const [isFixed, setIsFixed] = useState(false);

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
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="mx-20">
      <header className={`flex items-center h-20 ${isFixed ? "fixed top-0 left-0 right-0 bg-white z-50 shadow-md" : ""}`}>
        <nav className="flex justify-end w-full items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-500"></div>
        </nav>
      </header>
      <section className="flex flex-1 h-screen">
        <div className="flex-1 flex flex-col items-start justify-start relative overflow-visible">
          <div className={`absolute right-0 top-[28%] transform -translate-y-1/4 ${isFixed ? "hidden" : ""}`}>
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
                className="absolute w-28 pb-7"
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
            className="mt-28 ml-40 text-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={textBlowUpControls}
          >
            I am software engineer and graphics designer
          </motion.div>{" "}
          <div
            className="flex h-80 items whitespace-nowrap ml-20 mt-3"
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
          <div className="h-40 w-full -mt-60"></div>
        </div>
        <div className="flex-1"></div>
      </section>

      <section className="flex flex-col gap-10 mx-16 -mt-20">
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
    </main>
  );
}