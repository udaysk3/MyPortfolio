"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Python</li>
        <li>Django</li>
        <li>SQL</li>
        <li>React/Next.js(basic)</li>
        <li>Git & Github</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <>
      <ul className="list-disc pl-2">
        <li>B.Tech</li>
        
      </ul>
      <ul className="pl-2">
      <li>Computer Science and Engineering - 8.9</li>
      <li>Lendi Institute of Engineering and Technology</li>
      </ul>
      </>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className="list-disc pl-2">
        <li>Django + Next.js Developer - AlignAV</li>
        <li>Django Intern - Sarva Suvidhaen Pvt. Ltd.</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about2.png" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
          I am a full stack web developer from Andhra Pradesh with strong expertise in Python, Django, JavaScript, React, Next.js, SQL, HTML, CSS, and Git. 
          I have successfully delivered interactive and responsive web applications for clients in the US, UK and Australia. 
          My passion lies in creating scalable, efficient solutions, and I am a quick learner, always eager to expand my knowledge. 
          I am currently seeking a full-time opportunity to collaborate with a dynamic team and contribute to impactful projects.. 
          I am a team player and
            I am excited to work with others to create amazing applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              {" "}
              Experience{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
