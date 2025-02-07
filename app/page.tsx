"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Earth from "@/components/skills";
import Image from "next/image";

const cardData = [
  {
    title: "Card Title 1",
    description: "This is a description for card 1.",
    height: "h-80",
  },
  {
    title: "Card Title 2",
    description: "This is a description for card 2.",
    height: "h-60",
  },
  {
    title: "Card Title 3",
    description: "This is a description for card 3.",
    height: "h-40",
  },
  {
    title: "Card Title 4",
    description: "This is a description for card 4.",
    height: "h-72",
  },
  {
    title: "Card Title 5",
    description: "This is a description for card 5.",
    height: "h-64",
  },
  {
    title: "Card Title 6",
    description: "This is a description for card 6.",
    height: "h-56",
  },
  {
    title: "Card Title 7",
    description: "This is a description for card 7.",
    height: "h-48",
  },
  {
    title: "Card Title 8",
    description: "This is a description for card 8.",
    height: "h-80",
  },
  {
    title: "Card Title 9",
    description: "This is a description for card 9.",
    height: "h-60",
  },
  {
    title: "Card Title 10",
    description: "This is a description for card 10.",
    height: "h-72",
  },
  {
    title: "Card Title 11",
    description: "This is a description for card 11.",
    height: "h-64",
  },
  {
    title: "Card Title 12",
    description: "This is a description for card 12.",
    height: "h-56",
  },
];


const MasonryCard = ({ title, description, imageUrl, height, controls, isInView }) => {
  return (
    <motion.div
      className={`relative rounded-lg shadow-md overflow-hidden ${height}`}
      initial={{ opacity: 0, x: controls === "left" ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Image Section (90% of the card) */}
      <div className="h-[90%] p-2">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Bottom Section (10% of the card) */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%]">
        {/* Gradient Background (visible only on hover) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
        />

        {/* Title (always visible at the bottom) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ y: 0 }}
          whileHover={{ y: -50 }} // Move title upward on hover
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </motion.div>

        {/* Description (hidden by default, visible on hover) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 50 }}
          whileHover={{ y: -20 }} // Move description upward on hover
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
  const isProjectInView = useInView(projectSectionRef, {
    once: true,
    margin: "-100px",
  }); // Adjust margin as needed

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
        const homeSectionHeight = homeSectionRef.current.offsetHeight;
        const scrollY = window.scrollY;

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

  const [isNavExtended, setIsNavExtended] = useState(true);

  const HomeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 16 16"
    >
      <g fill="none">
        <path fill="url(#fluentColorHome160)" d="M6 9h4v5H6z" />
        <path
          fill="url(#fluentColorHome161)"
          d="M8.687 2.273a1 1 0 0 0-1.374 0l-4.844 4.58A1.5 1.5 0 0 0 2 7.943v4.569a1.5 1.5 0 0 0 1.5 1.5h3v-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v4h3a1.5 1.5 0 0 0 1.5-1.5v-4.57a1.5 1.5 0 0 0-.47-1.09z"
        />
        <path
          fill="url(#fluentColorHome162)"
          fillRule="evenodd"
          d="m8.004 2.636l5.731 5.41a.75.75 0 1 0 1.03-1.091L8.86 1.382a1.25 1.25 0 0 0-1.724.007L1.23 7.059a.75.75 0 0 0 1.038 1.082z"
          clipRule="evenodd"
        />
        <defs>
          <linearGradient
            id="fluentColorHome160"
            x1="8"
            x2="4.796"
            y1="9"
            y2="14.698"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#944600" />
            <stop offset="1" stopColor="#cd8e02" />
          </linearGradient>
          <linearGradient
            id="fluentColorHome161"
            x1="3.145"
            x2="14.93"
            y1="1.413"
            y2="10.981"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffd394" />
            <stop offset="1" stopColor="#ffb357" />
          </linearGradient>
          <linearGradient
            id="fluentColorHome162"
            x1="10.262"
            x2="6.945"
            y1="-.696"
            y2="7.895"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff921f" />
            <stop offset="1" stopColor="#eb4824" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
  const ProjectIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 128 128"
    >
      <path fill="#f46921" d="m112.37 78.44l-26.91 9.22v11.67l26.91 10.76z" />
      <path
        fill="#ffc57a"
        d="M28.34 116.64c-3.41 0-6.18-2.77-6.18-6.18V60.09c0-3.41 2.77-6.18 6.18-6.18h60.6c3.41 0 6.18 2.77 6.18 6.18v50.37c0 3.41-2.77 6.18-6.18 6.18z"
      />
      <path
        fill="#f46921"
        d="M86.09 152.71c1.73 0 3.14 1.41 3.14 3.14v46.89c0 1.73-1.41 3.14-3.14 3.14H29.67c-1.73 0-3.14-1.41-3.14-3.14v-46.89c0-1.73 1.41-3.14 3.14-3.14zm0-5.23H29.67c-4.62 0-8.37 3.75-8.37 8.37v46.89c0 4.62 3.75 8.37 8.37 8.37h56.41c4.62 0 8.37-3.75 8.37-8.37v-46.89c.01-4.62-3.74-8.37-8.36-8.37m30.19-71.9c2.24 0 4.06 1.82 4.06 4.06v29.25c0 2.24-1.82 4.06-4.06 4.06s-4.06-1.82-4.06-4.06V79.64c0-2.24 1.82-4.06 4.06-4.06M80.93 121H36.35a3.74 3.74 0 0 1 0-7.48h44.59a3.74 3.74 0 0 1 3.74 3.74a3.75 3.75 0 0 1-3.75 3.74M21.48 67.53h37.27c4.14 0 7.49 3.35 7.49 7.49v19.64c0 4.14-3.35 7.49-7.49 7.49H21.48c-4.14 0-7.49-3.35-7.49-7.49V75.02c0-4.14 3.35-7.49 7.49-7.49"
      />
      <path
        fill="#f46921"
        d="M79.74 74.61h8.96c3.54 0 6.42 2.63 6.42 5.88v30.28c0 3.25-2.87 5.88-6.42 5.88h-8.96c-3.54 0-6.42-2.63-6.42-5.88V80.49c0-3.25 2.87-5.88 6.42-5.88"
      />
      <circle cx="84.06" cy="105.02" r="3.16" fill="#ed6c30" />
      <circle cx="84.06" cy="94.54" r="3.16" fill="#ffc57a" />
      <path
        fill="#f46921"
        d="M94.5 8.12c-17.67 0-32 14.33-32 32s14.33 32 32 32s32-14.33 32-32s-14.33-32-32-32m0 56.41c-13.49 0-24.42-10.93-24.42-24.42S81.02 15.7 94.5 15.7s24.42 10.93 24.42 24.42s-10.93 24.41-24.42 24.41"
      />
      <circle cx="94.5" cy="40.11" r="24.42" fill="#fff" />
      <path
        fill="#f46921"
        d="M94.5 29.07c-6.1 0-11.05 4.95-11.05 11.05S88.4 51.16 94.5 51.16s11.05-4.95 11.05-11.05s-4.95-11.04-11.05-11.04m0 15.98c-2.72 0-4.93-2.21-4.93-4.93s2.21-4.93 4.93-4.93s4.93 2.21 4.93 4.93s-2.2 4.93-4.93 4.93"
      />
      <circle cx="94.5" cy="40.11" r="4.93" fill="#fff" />
      <path
        fill="#f46921"
        d="m89.57 12.35l3.1 19.73h3.95l2.82-19.73zm29.76 14.43l-17.76 9.15l1.24 3.74l19.62-3.52zm-4.49 32.93l-14.17-14.09l-3.18 2.34l9.39 17.58zM82.1 65.55l9.06-17.8l-3.19-2.31l-13.86 14.32zm-15.61-29.3l19.73 3.12l1.21-3.75l-17.9-8.76zM27.15 25.3c-14.28 0-25.86 11.58-25.86 25.86s11.58 25.86 25.86 25.86s25.86-11.58 25.86-25.86S41.44 25.3 27.15 25.3m0 45.6c-10.9 0-19.74-8.84-19.74-19.74s8.84-19.74 19.74-19.74s19.74 8.84 19.74 19.74S38.05 70.9 27.15 70.9"
      />
      <circle cx="27.15" cy="51.16" r="19.74" fill="#fff" />
      <path
        fill="#f46921"
        d="M27.15 42.23c-4.93 0-8.93 4-8.93 8.93s4 8.93 8.93 8.93s8.93-4 8.93-8.93s-3.99-8.93-8.93-8.93m0 12.92c-2.2 0-3.99-1.79-3.99-3.99s1.79-3.99 3.99-3.99s3.99 1.79 3.99 3.99s-1.78 3.99-3.99 3.99"
      />
      <circle cx="27.15" cy="51.16" r="3.99" fill="#fff" />
      <path
        fill="#f46921"
        d="m23.17 28.72l2.5 15.95h3.19l2.28-15.95zm24.05 11.66l-14.36 7.4l1.01 3.02l15.85-2.84zM43.59 67L32.14 55.61l-2.57 1.89l7.59 14.21zm-26.46 4.72l7.32-14.39l-2.58-1.87l-11.2 11.58zM4.51 48.04l15.95 2.52l.98-3.03l-14.47-7.08z"
      />
    </svg>
  );
  const SkillsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 32 32"
    >
      <g fill="none">
        <path
          fill="#f46921"
          d="M15.783 27.048c7.125 0 12.902-5.777 12.902-12.903S22.908 1.242 15.783 1.242C8.657 1.242 2.88 7.02 2.88 14.145s5.777 12.903 12.903 12.903"
        />
        <path
          fill="#ffc57a"
          d="M13.335 9.228c-.03 0-.062-.008-.093-.01c-.527-.03-.667-.63-.58-.96c.54-2.068.273-3.905-.612-6.253c-.183-.48.545-.605.862-.477c.305.122.588.562.71.895c.733 1.982.938 4.065.333 6.292c-.08.3-.32.52-.62.513"
        />
        <path
          fill="#ffc57a"
          d="M14.95 11.145a.617.617 0 0 1-.577-.797c.694-2.3 1.202-6.06-.408-8.886c-.17-.297.262-.492.603-.46c.78.07 1.235 1.238 1.385 1.758c.704 2.427.474 5.672-.398 7.945c-.1.268-.335.447-.605.44"
        />
        <path
          fill="#ffc57a"
          d="M16.615 12.958c-.425-.123-.505-.683-.407-1.01c1.935-6.485-.013-10.47-.028-10.513c-.12-.32.93-.757 1.448.54c.075.188 1.802 4.525-.145 10.5c-.093.275-.423.613-.868.482m-11.01 9.667c-.18-.212-.405-.55-.12-.74c.472-.318 2.095-.833 3.392-2.593c.203-.275.545-.402.843-.232c.297.168.43.565.232.843c-1.575 2.22-3.492 2.82-3.57 2.864c-.095.056-.597.07-.777-.142m1.042.922c-.13-.325.7-.467.7-.467c.368-.14 1.875-.422 3.078-2.315c.182-.288.547-.4.842-.23c.298.17.4.547.23.843c-.807 1.415-2.385 2.474-3.465 2.732c-.577.137-1.257-.245-1.385-.562m2.02 1.853c-.382-.202-.495-.572-.252-.652c1.432-.463 2.998-1.658 3.758-2.783a.618.618 0 0 1 1.023.692c-.893 1.346-1.803 2.026-3.289 2.67c-.282.123-.882.263-1.24.073m1.83.553c.938-.43 2.5-1.32 3.406-2.838a.619.619 0 0 1 1.062.633c-.73 1.224-1.745 2.192-3.293 2.737c-.752.268-1.485-.387-1.174-.532M4.74 20.84c-2.083-2.455-2.45-5.66-1.915-8.835c.122-.73.39-1.185.655-1.183c.342.006.672 1.18.572 1.818c-.45 2.867.38 5.68 2.175 7.868c.108.132-.045.58-.427.747c-.383.165-.81-.12-1.06-.415"
        />
        <path
          fill="#ffc57a"
          d="M6.327 19.458c-.942-.885-1.722-3.655-1.725-4.973c0-.342.003-.835.345-.835c0 0 .765.117.893.832c.182 1.03.752 3.396 1.702 4.593c.213.268-.572.985-1.215.383"
        />
        <path
          fill="#ffc57a"
          d="M16.608 27.525c-1.088.055-2.758-.172-3.306-.922c-.202-.276.16-.536.49-.448c1.99.537 3.368.85 5.91-.385c.515-.25 1.085.012.83.372c-.357.508-1.97 1.296-3.924 1.383"
        />
        <path
          fill="#ffc57a"
          d="M14.568 25.283c-.193-.283.38-.756.72-.7c.537.085.91.18 1.285.195c.384.015.857-.125 1.002-.125c.343 0 1.163.337.953.607c-.65.835-3.353.91-3.96.022"
        />
        <path
          fill="#ffc57a"
          d="M21.62 11.143a.617.617 0 0 1-.203-1.218c1.473-.32 3.393-1.418 4.513-3.18c.268-.423 1.1.37.652 1.04c-1.344 2.022-3.107 2.96-4.902 3.348z"
        />
        <path
          fill="#ffc57a"
          d="M21.193 13.38a.62.62 0 0 1-.686-.528a.62.62 0 0 1 .525-.7c2.423-.347 5.07-2.195 5.96-4.045c.148-.307 1.17.6.44 1.613c-1.302 1.803-3.857 3.317-6.222 3.655q-.01.006-.018.005"
        />
        <path
          fill="#ffc57a"
          d="M21.415 15.345q-.297.035-.58.047a.62.62 0 0 1-.645-.592a.613.613 0 0 1 .592-.643c2.478-.104 6.08-1.77 7.198-3.842c.162-.3 1.197.55.317 1.665c-.66.838-1.7 1.522-2.89 2.12c-1.29.65-2.74 1.098-3.992 1.245m1.957 1.69a3 3 0 0 1-.482.025a.617.617 0 1 1 .03-1.235c1.142.025 4.227-1.175 5.537-3.232c.185-.288.868.787.13 1.627c-1.594 1.818-3.707 2.638-5.215 2.815m-4.767-2.457a.6.6 0 0 1-.225-.043a.63.63 0 0 1-.352-.8c1.272-3.732 1.717-8.132.117-12.185c-.125-.318 1.095-.36 1.418.588c1.52 4.485 1.062 8.115-.383 12.045a.61.61 0 0 1-.575.395"
        />
        <path
          fill="#ffc57a"
          d="M23.27 7.453c-.317-.398-1.532-1.358-2.003-1.523c-.322-.115-.434-1.225-.092-1.225c1.125-.002 2.668 1.11 3.127 2.175c.34.788-.382 1.385-1.032.573m1.57-1C23.733 4.973 22.843 4 20.793 3.28c-.473-.167-.92-.747-.633-.932c.532-.345 1.525.075 1.802.207c1.085.518 2.09 1.073 2.936 2.055c.477.555 1.037 1.713.81 1.965c-.345.383-.745.04-.868-.122m.31 12.285c-.18-.29.823-.708.913-1.768c.03-.34 1.065-.74 1.087-.4c.085 1.325-.383 1.808-.902 2.185c-.568.408-.983.172-1.098-.017m2.06.904c-.463-.104-.277-.602-.062-.867c.82-1.005.895-1.542.81-2.637c-.043-.54.4-1.023.61-.756c.272.35.477 1.373.282 2.213c-.46 1.998-1.495 2.08-1.64 2.047M22.523 8.035a.9.9 0 0 1 .177.32c.033.12.018.258-.062.35a.6.6 0 0 1-.206.135a1.7 1.7 0 0 1-.44.163a.6.6 0 0 1-.45-.08c-.16-.115-.225-.32-.267-.51a6 6 0 0 1-.14-.943a.43.43 0 0 1 .027-.225c.213-.4 1.216.608 1.36.79"
        />
        <path
          fill="#ffc57a"
          d="M23.27 24.53c-1.47-.258-2.945-.832-4.387-1.488c-.333-.16-.653-.327-.973-.497c-.53.3-1.1.542-1.695.722a18.7 18.7 0 0 0 3.848 1.646c1.642.49 2.315.4 2.454.38c.54-.083 1.088-.695.753-.763"
        />
        <path
          fill="#f46921"
          d="M4.813 9.073c-.163-.3-.405-1.045-.405-1.045c-.43-.053-.783.502-.625 1.445c.092.542 2.54 6.71 9.775 12.072a25 25 0 0 0 2.654 1.725s.576.38 1.36-.025c.666-.343.335-.7.335-.7C12.07 19.47 8.073 15.06 4.813 9.073"
        />
        <path
          fill="#ffc57a"
          d="M24.913 23.173a37 37 0 0 1-5.123-2.053q-.5.525-1.09.953q.521.291 1.035.564c1.078.575 5.387 2.45 5.178.535"
        />
        <path
          fill="#f46921"
          d="M19.788 21.12c-5.85-2.898-10.886-7.438-14.066-15.102c-.837.185-.75 1.167-.63 1.487c2.843 7.563 8.6 11.76 13.606 14.568c0 0 .79.434 1.312-.233c.313-.402-.223-.72-.223-.72"
        />
        <path
          fill="#ffc57a"
          d="M26.17 21.56a25.8 25.8 0 0 1-5.183-2.125a7.4 7.4 0 0 1-.714 1.125c1.28.65 2.632 1.2 4.052 1.613c1.795.517 2.183-.555 1.845-.613"
        />
        <path
          fill="#f46921"
          d="M7.26 4.458c-.205-.433-1.07.225-.92.907C7.273 8.76 11.58 16.4 20.273 20.56c0 0 .695.305.96-.275c.264-.582-.243-.85-.243-.85C11.858 14.578 8.39 7.62 7.26 4.458"
        />
        <path
          fill="#ffc57a"
          d="M27.408 19.998c-2.09-.77-3.958-1.603-5.653-2.54a3 3 0 0 1-.05.285a7.4 7.4 0 0 1-.345 1.087a30.3 30.3 0 0 0 4.782 1.943c1.37.382 1.585-.653 1.265-.776"
        />
        <path
          fill="#f46921"
          d="M21.755 17.458c-6.18-3.398-9.302-7.28-12.745-13.983c-.42-.675-1.443-.057-1.045.66C11 10.718 14.24 14.803 21.36 18.833c0 0 .545.212.755-.423c.133-.4.008-.753-.36-.953"
        />
        <path
          fill="ffc57a"
          d="M17.63 31c-.692 0-1.395-.017-2.097-.058c-4.333-.24-9.743-1.73-11.378-4.442c-.513-.848-2.07-3.43 1.108-8.655c1.782-2.93 6.065-9.19 4.892-15.17c0 0-.162-.575.35-.792c.757-.32.88.33.88.33c1.498 6.977-2.977 13.327-4.85 16.405c-2.427 3.992-1.793 5.97-1.105 7.11c.795 1.314 4.163 3.392 10.185 3.724c7.57.418 12.202-1.475 12.678-2.152c.017-.255-.148-.555-2.988-.615c-.788-.017-.715-1.168-.32-1.212c1.155-.136 3.328-.136 4.323.585c.502.364.712.902.515 1.527C29.23 29.457 23.957 31 17.63 31"
        />
      </g>
    </svg>
  );
  const AboutIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 128 128"
    >
      <path
        fill="#b36d01"
        d="M109.4 102.62c-1.62-2.96.45-5.96 3.98-9.68c5.6-5.91 11.7-19.6 6.04-33.51c.03-.08-1.12-2.42-1.08-2.5l-2.34-.12c-.75-.11-26.36-.16-52-.16s-51.25.05-52 .16c0 0-3.45 2.54-3.42 2.61c-5.66 13.91.44 27.6 6.04 33.51c3.53 3.72 5.6 6.73 3.98 9.68c-1.57 2.87-6.26 3.29-6.26 3.29s1.08 2.94 3.69 4.52c2.41 1.46 5.37 1.81 7.42 1.86c0 0 8 11.07 28.92 11.07h23.28c20.92 0 28.92-11.07 28.92-11.07c2.05-.05 5.01-.39 7.42-1.86c2.61-1.58 3.69-4.52 3.69-4.52s-4.7-.41-6.28-3.28"
      />
      <radialGradient
        id="notoPerson0"
        cx="95.248"
        cy="22.384"
        r="30.469"
        gradientTransform="matrix(1 0 0 .4912 -12.275 94.62)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".728" stopColor="#795548" stopOpacity="0" />
        <stop offset="1" stopColor="#795548" />
      </radialGradient>
      <path
        fill="url(#notoPerson0)"
        d="M63.99 123.36v-12.29l37.18-2.94l3.38 4.16s-8 11.07-28.92 11.07z"
      />
      <radialGradient
        id="notoPerson1"
        cx="65.24"
        cy="26.915"
        r="9.004"
        gradientTransform="matrix(-.9057 .4238 -.3144 -.6719 180.533 91.517)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".663" stopColor="#795548" />
        <stop offset="1" stopColor="#795548" stopOpacity="0" />
      </radialGradient>
      <path
        fill="url(#notoPerson1)"
        d="M104.46 106.93c-5.57-8.46 6.78-11.61 6.78-11.61l.01.01c-2.15 2.67-3.12 5-1.86 7.29c1.57 2.87 6.26 3.29 6.26 3.29s-6.38 5.68-11.19 1.02"
      />
      <radialGradient
        id="notoPerson2"
        cx="88.575"
        cy="52.387"
        r="39.55"
        gradientTransform="matrix(-.0746 -.9972 .8311 -.0622 52.718 167.2)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".725" stopColor="#795548" stopOpacity="0" />
        <stop offset="1" stopColor="#795548" />
      </radialGradient>
      <path
        fill="url(#notoPerson2)"
        d="M119.45 59.42c5.53 13.47-.29 27.34-5.74 33.19c-.75.8-3.92 3.92-4.64 6.4c0 0-12.42-17.31-16.12-27.49c-.75-2.05-1.43-4.17-1.52-6.35c-.07-1.64.19-3.59 1.13-4.98c1.16-1.71 26.23-2.21 26.23-2.21c0 .02.66 1.44.66 1.44"
      />
      <radialGradient
        id="notoPerson3"
        cx="38.383"
        cy="52.387"
        r="39.55"
        gradientTransform="matrix(.0746 -.9972 -.8311 -.0622 79.056 117.148)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".725" stopColor="#795548" stopOpacity="0" />
        <stop offset="1" stopColor="#795548" />
      </radialGradient>
      <path
        fill="url(#notoPerson3)"
        d="M8.58 59.42c-5.52 13.47.29 27.34 5.74 33.19c.75.8 3.92 3.92 4.64 6.4c0 0 12.42-17.31 16.12-27.49c.75-2.05 1.43-4.17 1.52-6.35c.07-1.64-.19-3.59-1.13-4.98c-1.16-1.71-2.51-1.25-4.47-1.25c-3.75 0-20.15-.96-21.42-.96c0 .02-1 1.44-1 1.44"
      />
      <radialGradient
        id="notoPerson4"
        cx="45.056"
        cy="22.384"
        r="30.469"
        gradientTransform="matrix(-1 0 0 .4912 90.112 94.62)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".728" stopColor="#795548" stopOpacity="0" />
        <stop offset="1" stopColor="#795548" />
      </radialGradient>
      <path
        fill="url(#notoPerson4)"
        d="M64.04 123.36v-12.29l-37.18-2.94l-3.38 4.16s8 11.07 28.92 11.07z"
      />
      <radialGradient
        id="notoPerson5"
        cx="15.047"
        cy="26.915"
        r="9.004"
        gradientTransform="matrix(.9057 .4238 .3144 -.6719 -7.043 112.79)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".663" stopColor="#795548" />
        <stop offset="1" stopColor="#795548" stopOpacity="0" />
      </radialGradient>
      <path
        fill="url(#notoPerson5)"
        d="M23.57 106.93c5.57-8.46-6.78-11.61-6.78-11.61l-.01.01c2.15 2.67 3.12 5 1.86 7.29c-1.57 2.87-6.26 3.29-6.26 3.29s6.38 5.68 11.19 1.02"
      />
      <path
        fill="#e59600"
        d="M99.55 64.37h-71.1c-7.67 0-13.94 6.68-13.94 14.85s6.27 14.85 13.94 14.85h71.11c7.67 0 13.94-6.68 13.94-14.85s-6.28-14.85-13.95-14.85"
      />
      <path
        fill="#f46921"
        d="M64 13.15c-22.64 0-43.61 24.21-43.61 59.06C20.39 106.87 42 124 64 124s43.61-17.13 43.61-51.79c0-34.84-20.97-59.06-43.61-59.06"
      />
      <path
        fill="#e59600"
        d="M69.02 87.29a1.6 1.6 0 0 0-.42-.11h-9.2c-.14.02-.28.05-.42.11c-.83.34-1.29 1.2-.9 2.12c.4.92 2.23 3.5 5.92 3.5s5.52-2.58 5.92-3.5s-.06-1.78-.9-2.12"
      />
      <path
        fill="#795548"
        d="M74.95 97.71c-4.14 2.46-17.73 2.46-21.87 0c-2.38-1.42-4.81.75-3.82 2.91c.97 2.12 8.38 7.06 14.79 7.06s13.72-4.93 14.7-7.06c.98-2.16-1.42-4.32-3.8-2.91"
      />
      <g fill="#404040">
        <ellipse cx="42.9" cy="75.23" rx="6.32" ry="6.55" />
        <ellipse cx="85.1" cy="75.23" rx="6.32" ry="6.55" />
      </g>
      <path
        fill="#795548"
        d="M52.29 63.47c-1.2-1.59-3.99-3.91-9.39-3.91s-8.19 2.32-9.39 3.91c-.53.71-.4 1.52-.03 2.01c.34.46 1.35.88 2.47.5s3.3-1.51 6.95-1.53c3.65.03 5.84 1.15 6.95 1.53s2.13-.04 2.47-.5c.37-.49.5-1.3-.03-2.01m42.21 0c-1.2-1.59-3.99-3.91-9.39-3.91s-8.19 2.32-9.39 3.91c-.53.71-.4 1.52-.03 2.01c.34.46 1.35.88 2.47.5s3.3-1.51 6.95-1.53c3.65.03 5.84 1.15 6.95 1.53c1.12.38 2.13-.04 2.47-.5c.36-.49.5-1.3-.03-2.01"
      />
      <path
        fill="#b36d01"
        d="M116.14 31.41c-3.18-4.81-10.29-11.25-16.68-11.67C98.44 13.6 91.86 8.4 85.5 6.38c-17.21-5.45-28.42.66-34.43 3.94c-1.25.68-9.33 5.16-14.98 1.95c-3.54-2.01-3.47-7.46-3.47-7.46s-11.09 4.22-7.3 16c-3.81.16-8.81 1.76-11.45 7.11c-3.15 6.37-2.03 11.7-1.12 14.25c-3.28 2.78-7.4 8.71-4.57 16.4c2.13 5.79 10.63 8.45 10.63 8.45c-.6 10.42 1.34 16.84 2.37 19.43c.18.45.83.41.94-.06c1.28-5.16 5.68-23.15 5.24-26.29c0 0 14.76-2.93 28.84-13.29c2.87-2.11 5.97-3.91 9.27-5.22c17.68-7.04 21.38 4.97 21.38 4.97s12.25-2.35 15.95 14.67c1.39 6.38 2.33 16.59 3.12 23.73c.06.5.74.61.94.14c1.24-2.83 3.71-8.46 4.3-14.19c.21-2.02 5.65-4.69 7.98-13.35c3.14-11.57-.71-22.68-3-26.15"
      />
      <radialGradient
        id="notoPerson6"
        cx="87.443"
        cy="73.25"
        r="46.359"
        gradientTransform="matrix(.3076 .9515 .706 -.2282 8.83 -11.739)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".699" stopColor="#795548" stopOpacity="0" />
        <stop offset="1" stopColor="#795548" />
      </radialGradient>
      <path
        fill="url(#notoPerson6)"
        d="M111.12 70.95c.21-2.02 5.65-4.69 7.98-13.35c.25-.92.46-1.86.65-2.8c1.9-10.53-1.51-20.19-3.63-23.39c-2.94-4.44-9.24-10.27-15.22-11.46c-.52-.07-1.03-.13-1.51-.16c0 0 .43 2.79-.7 5.02c-1.46 2.89-4.43 3.57-4.43 3.57c15.59 15.59 14.48 28.63 16.86 42.57"
      />
      <radialGradient
        id="notoPerson7"
        cx="42.247"
        cy="123.799"
        r="12.155"
        gradientTransform="matrix(.8813 .4726 .5603 -1.045 -64.35 113.606)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".58" stopColor="#795548" />
        <stop offset="1" stopColor="#795548" stopOpacity="0" />
      </radialGradient>
      <path
        fill="url(#notoPerson7)"
        d="M54.83 8.35c-1.42.69-2.68 1.38-3.77 1.97c-1.25.68-9.33 5.16-14.98 1.95c-3.48-1.98-3.48-7.26-3.47-7.45c-1.6 2.04-6.44 16.63 7.71 17.6c6.1.42 9.87-4.9 12.09-9.41c.81-1.63 2.08-4.02 2.42-4.66"
      />
      <radialGradient
        id="notoPerson8"
        cx="163.601"
        cy="66.051"
        r="37.367"
        gradientTransform="matrix(-.9378 -.3944 -.2182 .5285 237.25 55.895)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".699" stopColor="#795548" stopOpacity="0" />
        <stop offset="1" stopColor="#795548" />
      </radialGradient>
      <path
        fill="url(#notoPerson8)"
        d="M83.72 5.85c9.52 2.58 14.17 7.42 15.72 13.9c.46 1.9 1 19.62-32.83-.52c-12.58-7.49-9.15-12.18-7.67-12.71c5.75-2.09 14.11-3.56 24.78-.67"
      />
      <radialGradient
        id="notoPerson9"
        cx="37.367"
        cy="112.71"
        r="11.157"
        gradientTransform="matrix(1 0 0 -1.2233 0 153.168)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".702" stopColor="#795548" stopOpacity="0" />
        <stop offset="1" stopColor="#795548" />
      </radialGradient>
      <path
        fill="url(#notoPerson9)"
        d="M32.57 4.82c-.02.01-.04.02-.08.03h-.01c-1.21.51-10.73 4.91-7.17 15.94l10.13 1.63C26.48 13.35 32.61 4.8 32.61 4.8z"
      />
      <radialGradient
        id="notoPersona"
        cx="35.831"
        cy="93.016"
        r="20.925"
        gradientTransform="matrix(-.9657 -.2598 -.2432 .9037 93.055 -39.766)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".66" stopColor="#795548" stopOpacity="0" />
        <stop offset="1" stopColor="#795548" />
      </radialGradient>
      <path
        fill="url(#notoPersona)"
        d="m31.57 21.81l-6.26-1.01c-.24 0-1.08.08-1.53.14c-3.52.49-7.68 2.31-9.92 6.98c-2.42 5.02-2.35 9.33-1.7 12.21c.19.97.58 2.05.58 2.05s3.1-2.94 10.47-3.13z"
      />
      <radialGradient
        id="notoPersonb"
        cx="30.867"
        cy="72.811"
        r="21.969"
        gradientTransform="matrix(.9907 .1363 .1915 -1.3921 -13.653 152.342)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".598" stopColor="#795548" stopOpacity="0" />
        <stop offset="1" stopColor="#795548" />
      </radialGradient>
      <path
        fill="url(#notoPersonb)"
        d="M12.44 42.42c-3.08 2.74-7.24 8.84-4.17 16.4c2.31 5.71 10.53 8.19 10.53 8.19c0 .03 1.64.51 2.49.51l1.92-28.49c-3.94 0-7.72 1.18-10.17 2.88c.02.06-.61.47-.6.51"
      />
    </svg>
  );
  const ContactIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 48 48"
    >
      <path
        fill="#f46921"
        d="M38 44H12V4h26c2.2 0 4 1.8 4 4v32c0 2.2-1.8 4-4 4"
      />
      <path
        fill="#ffc57a"
        d="M10 4h2v40h-2c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4"
      />
      <g fill="#ab300b">
        <circle cx="26" cy="20" r="4" />
        <path d="M33 30s-1.9-4-7-4s-7 4-7 4v2h14z" />
      </g>
    </svg>
  );

  const sidebarLinks = [
    { name: "Home", icon: <HomeIcon /> },
    { name: "Project", icon: <ProjectIcon /> },
    { name: "Skills", icon: <SkillsIcon /> },
    { name: "About", icon: <AboutIcon /> },
    { name: "Contact Me", icon: <ContactIcon /> },
  ];

  return (
    <main className="">
      <nav>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={
            isHeaderVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-3 border-t border-gray-200 shadow-xl py-1 rounded-xl w-[80%] ml-40 z-10 bg-white"
        >
          <nav className="flex justify-end items-center gap-7">
            {sidebarLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center gap-2 text-black relative 
                     hover:border-[#f46921] border-transparent border-b-2 
                     transition-all duration-300 ease-in-out pb-1"
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

      <section
        ref={homeSectionRef}
        className="flex h-screen my-5 mx-3 md:mx-20 py-20"
      >
        <div
          className={`sm:hidden md:block h-[90%] rounded-xl shadow-2xl p-2 ${
            isNavExtended ? "w-14 " : "w-48"
          }`}
        >
          <div className="flex justify-end">
            {isNavExtended ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                viewBox="0 0 128 128"
                onClick={() => setIsNavExtended(!isNavExtended)}
              >
                <path
                  fill="#ffca28"
                  d="M58.7 41.1c10.8.1 53.3.4 54.9.4c12.8.3 12.7 16.7.7 16.9c-1.5 0-25 1.1-32.2 1.3c5.2 2 7.5 11.9-3.1 14.9c5 2.6 6.4 12.9-4.2 14.7c3.8 2.5 4.3 10.9-6 14.2c-8.4 2.7-28.2 2-40.3-2.3c-9.1-3.3-8.4-5.8-16.7-5.6c-1.4 0-2.1-1.1-2.4-2.4c-1.3-5.9-1.9-26.3-.3-33.8c.4-1.6 1.7-1.8 2.2-1.9c2.1-.4 4.2-2.5 5-4.3c3.2-6.4 12.8-12.8 23.4-18.2c5.5-2.8 9.2-8.8 10.4-18.3c.8-6.3 8.6-7.7 11.8-2.5c2.2 3.6 2.9 7 2.9 10.4c.2 6.2-1.6 10.1-6.1 16.5"
                />
                <defs>
                  <path
                    id="notoBackhandIndexPointingRight0"
                    d="M58.7 41.1c10.8.1 53.3.4 54.9.4c12.8.3 12.7 16.7.7 16.9c-1.5 0-25 1.1-32.2 1.3c5.2 2 7.5 11.9-3.1 14.9c5 2.6 6.4 12.9-4.2 14.7c3.8 2.5 4.3 10.9-6 14.2c-8.4 2.7-28.2 2-40.3-2.3c-9.1-3.3-8.4-5.8-16.7-5.6c-1.4 0-2.1-1.1-2.4-2.4c-1.3-5.9-1.9-26.3-.3-33.8c.4-1.6 1.7-1.8 2.2-1.9c2.1-.4 4.2-2.5 5-4.3c3.2-6.4 12.8-12.8 23.4-18.2c5.5-2.8 9.2-8.8 10.4-18.3c.8-6.3 8.6-7.7 11.8-2.5c2.2 3.6 2.9 7 2.9 10.4c.2 6.2-1.6 10.1-6.1 16.5"
                  />
                </defs>
                <clipPath id="notoBackhandIndexPointingRight1">
                  <use href="#notoBackhandIndexPointingRight0" />
                </clipPath>
                <g
                  fill="#faa700"
                  clipPath="url(#notoBackhandIndexPointingRight1)"
                >
                  <path d="M73.3 59.5c.1 1.6 2.8 2.9 2.8 6.4c0 3.7-3 4.7-3.1 7.5c-.1 2.7 2 3.8 1.5 7.7c-.6 4.5-4.1 4-4.2 7.1c0 2.7 1.8 3.2 1.8 6.6c0 3.1-3 5.8-5.5 7s-1.2 3.4 0 3.4s11.9-1.3 14.5-8.2c3-8 11-29.6 8.8-36.9c-7.1-1-11.5-1.6-13.7-1.8c-.7-.1-2.9-.6-2.9 1.2M60.1 40.7c0 .9.1 1.5 1 1.5c1 0 43.6 2.1 51.6 2.3c9.2.2 8.7 7.6 5.9 10.1c-1.9 1.7.6 4 2.2 2.6s4.4-3.4 4.3-8.4s-4.4-8.6-8.4-8.9c-3.8-.3-56.6.8-56.6.8m-51.9 21c15.9 0 14.1-11.7 25.2-18.9c15.4-10.1 16.3-11.1 19.7-25.2c1.2-4.9 5.7-4.4 7.7-2.1s4.9-1.3 3.6-2.7s-7.8-7.7-14.8-1.1s-42 46.2-42 46.2z" />
                </g>
                <defs>
                  <use
                    href="#notoBackhandIndexPointingRight0"
                    id="notoBackhandIndexPointingRight2"
                  />
                </defs>
                <clipPath id="notoBackhandIndexPointingRight3">
                  <use href="#notoBackhandIndexPointingRight2" />
                </clipPath>
                <g
                  fill="#b55e19"
                  clipPath="url(#notoBackhandIndexPointingRight3)"
                >
                  <path d="M58.7 41.1h-1.9c-.4 0-.8-.4-.2-1.3s5.8-8 5.8-15c0-3.2-.5-7.7-3.4-12.4c-.6-.9.2-1.4.9-1c.7.5 6.4 3.2 6.5 13.4s-7.7 16.3-7.7 16.3m65.1 8.8c-.5 0-1.1-.2-1.7 1c-.7 1.5-3.1 4.4-8.4 4.7s-38.1 2.5-38.9 2.5c-1.1 0-1.2 1.9.1 1.8c1.7-.1 7.2-.2 7.2-.2s30.9 1.8 36.9-.6c6.1-2.4 4.8-9.2 4.8-9.2M86.6 68.5c-.3-.1-.7-.1-1 .3c-1.5 2-4.6 3.5-10.6 3.3c-1.4 0-1.6 2.7.1 2.7c.7 0 4-.1 4-.1l6.6-.2zm-3.6 15c-.3-.1-.7-.1-1.1.4c-1.5 2-3.5 2.8-9.7 3c-1.5.1-1.4 2.6.2 2.6c1.1 0 2.4-.1 2.4-.1l7-.6zm-5.4 12.7c-.3-.1-.8-.2-1.2.4c-.8 1.1-2.9 3-7.5 4.4c-3.7 1.1-21.3 1.9-32.5-.7c-2.3-.5-9.9-3-13.6-5.3s-7.3-1.6-8.3-1.4s-6.3.7-6.3.7l2.5 3.7l27 8.6l38.5-.6z" />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                viewBox="0 0 128 128"
                onClick={() => setIsNavExtended(!isNavExtended)}
              >
                <path
                  fill="#ffca28"
                  d="M72.8 41.1c-10.8.1-53.3.4-54.9.4c-12.9.3-12.8 16.7-.8 17c1.5 0 25 1.1 32.2 1.3c-5.2 2-7.5 11.9 3.1 14.9c-5 2.6-6.4 12.9 4.2 14.7c-3.8 2.5-4.3 10.9 6 14.2c8.4 2.7 28.2 2 40.3-2.3c9.1-3.3 8.4-5.8 16.7-5.6c1.4 0 2.1-1.1 2.4-2.4c1.3-5.9 1.9-26.3.3-33.8c-.4-1.6-1.7-1.8-2.2-1.9c-2.1-.4-4.2-2.5-5-4.3c-3.2-6.4-12.8-12.8-23.4-18.2c-5.5-2.8-9.2-8.8-10.4-18.3c-.8-6.3-8.6-7.7-11.8-2.5c-2.2 3.6-2.9 7-2.9 10.4c-.1 6.1 1.7 10 6.2 16.4"
                />
                <defs>
                  <path
                    id="notoBackhandIndexPointingLeft0"
                    d="M72.8 41.1c-10.8.1-53.3.4-54.9.4c-12.9.3-12.8 16.7-.8 17c1.5 0 25 1.1 32.2 1.3c-5.2 2-7.5 11.9 3.1 14.9c-5 2.6-6.4 12.9 4.2 14.7c-3.8 2.5-4.3 10.9 6 14.2c8.4 2.7 28.2 2 40.3-2.3c9.1-3.3 8.4-5.8 16.7-5.6c1.4 0 2.1-1.1 2.4-2.4c1.3-5.9 1.9-26.3.3-33.8c-.4-1.6-1.7-1.8-2.2-1.9c-2.1-.4-4.2-2.5-5-4.3c-3.2-6.4-12.8-12.8-23.4-18.2c-5.5-2.8-9.2-8.8-10.4-18.3c-.8-6.3-8.6-7.7-11.8-2.5c-2.2 3.6-2.9 7-2.9 10.4c-.1 6.1 1.7 10 6.2 16.4"
                  />
                </defs>
                <clipPath id="notoBackhandIndexPointingLeft1">
                  <use href="#notoBackhandIndexPointingLeft0" />
                </clipPath>
                <g
                  fill="#faa700"
                  clipPath="url(#notoBackhandIndexPointingLeft1)"
                >
                  <path d="M58.1 59.5c-.1 1.6-2.8 2.9-2.8 6.4c0 3.7 3 4.7 3.1 7.5c.1 2.7-2 3.8-1.5 7.7c.6 4.5 4.1 4 4.2 7.1c0 2.7-1.8 3.2-1.8 6.6c0 3.1 3 5.8 5.5 7s1.2 3.4 0 3.4s-11.9-1.3-14.5-8.2c-3-8-11-29.6-8.8-36.9c7.1-1 11.5-1.6 13.7-1.8c.8-.1 3-.6 2.9 1.2m13.3-18.8c0 .9-.1 1.5-1 1.5s-43.6 2.1-51.6 2.3c-9.2.2-8.7 7.6-5.9 10.1c1.9 1.7-.6 4-2.2 2.6s-4.4-3.4-4.3-8.4s4.4-8.6 8.4-8.9c3.8-.3 56.6.8 56.6.8m51.9 21c-15.9 0-14.1-11.7-25.2-18.9c-15.3-10.1-16.2-11.1-19.7-25.3c-1.2-4.9-5.7-4.4-7.7-2.1s-4.9-1.3-3.6-2.7s7.8-7.7 14.8-1.1s42 46.2 42 46.2z" />
                </g>
                <defs>
                  <use
                    href="#notoBackhandIndexPointingLeft0"
                    id="notoBackhandIndexPointingLeft2"
                  />
                </defs>
                <clipPath id="notoBackhandIndexPointingLeft3">
                  <use href="#notoBackhandIndexPointingLeft2" />
                </clipPath>
                <g
                  fill="#b55e19"
                  clipPath="url(#notoBackhandIndexPointingLeft3)"
                >
                  <path d="M72.8 41.1h1.9c.4 0 .8-.4.2-1.3s-5.8-8-5.8-15c0-3.2.5-7.7 3.4-12.4c.6-.9-.2-1.4-.9-1c-.7.5-6.4 3.2-6.5 13.4s7.7 16.3 7.7 16.3M7.6 49.9c.5 0 1.1-.2 1.7 1c.7 1.5 3.1 4.4 8.4 4.7s38.1 2.5 38.9 2.5c1.1 0 1.2 1.9-.1 1.8c-1.7-.1-7.2-.2-7.2-.2s-30.9 1.8-36.9-.6s-4.8-9.2-4.8-9.2m37.3 18.6c.3-.1.7-.1 1 .3c1.5 2 4.6 3.5 10.6 3.3c1.4 0 1.6 2.7-.1 2.7c-.7 0-4-.1-4-.1l-6.6-.2zm3.5 15c.3-.1.7-.1 1.1.4c1.5 2 3.5 2.8 9.7 3c1.5.1 1.4 2.6-.2 2.6c-1.1 0-2.4-.1-2.4-.1l-7-.6zm5.5 12.7c.3-.1.8-.2 1.2.4c.8 1.1 2.9 3 7.5 4.4c3.7 1.1 21.3 1.9 32.5-.7c2.3-.5 9.9-3 13.6-5.3s7.3-1.6 8.3-1.4s6.3.7 6.3.7l-2.5 3.7l-27 8.6l-38.5-.6z" />
                </g>
              </svg>
            )}
          </div>
          <div className="h-full flex flex-col justify-evenly items-start -mt-5">
            {sidebarLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center gap-5 text-black hover:border border-[#f46921] w-full rounded-md p-1"
              >
                {link.icon}
                {isNavExtended ? "" : <span>{link.name}</span>}
              </a>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center mt-24">
          <motion.div
            className="mt-14 pl-28 text-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={textBlowUpControls}
          >
            I am a software engineer and graphics designer
          </motion.div>
          <div
            className="flex pl-28 mt-5 h-80 whitespace-nowrap"
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
          <div className="pl-28 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
            consequatur sequi id enim distinctio ad maxime fuga voluptas
            eligendi? Beatae quasi at molestias vitae ipsum dolorem corrupti,
            rerum vel quo.
          </div>
        </div>
        <div className="relative flex-1 h-[400px] w-[400px] rounded-full overflow-hidden ml-40">
          <Image
            src="/yo.jpg"
            alt="profile image"
            layout="fill"
            objectFit="cover"
            // className="rounded-full"
          />
        </div>
      </section>

      <section className="flex justify-between items-center border py-1 px-2 mx-3 md:mx-20 rounded-xl">
        <div className="">
          <div className="text-xl font-bold text-[#f46921]">
            Social media links{" "}
          </div>
          <div className="text-sm text-gray-400">
            for more about me and information
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="relative h-8 w-8 overflow-hidden">
            <Image
              src="/socialmedia/i.png"
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative h-8 w-8 overflow-hidden">
            <Image
              src="/socialmedia/te.svg"
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative h-8 w-8 overflow-hidden">
            <Image
              src="/socialmedia/y.png"
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative h-8 w-8 overflow-hidden">
            <Image
              src="/socialmedia/l.svg"
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative h-8 w-8 overflow-hidden">
            <Image
              src="/socialmedia/f.png"
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative h-8 w-8 overflow-hidden">
            <Image
              src="/socialmedia/t.svg"
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      <section
        ref={projectSectionRef}
        className="flex flex-col gap-10 px-20 mt-16 py-10"
      >
        <div className="text-3xl text-[#f46921] font-bold text-center">
          Projects
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        ref={homeSectionRef}
        className="flex items-center h-screen mx-16 mt-10"
      >
        <div className="text-2xl font-bold text-center">Skills</div>
        <div className="flex ">{/* <Earth /> */}</div>
      </section>
    </main>
  );
}
