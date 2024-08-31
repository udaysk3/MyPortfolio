"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "ProActive Athlete - Profile Builder",
    description: "Django + Bootstrap",
    image: "/images/projects/3.png",
    tag: ["All", "Client's"],
    gitUrl: "https://github.com/udaysk3/ProfilleBuilder",
    previewUrl: "false",
  },{
    id: 3,
    title: "AlignAV - Asset Management System",
    description: "Next.js + Django",
    image: "/images/projects/1.png",
    tag: ["All", "Client's"],
    gitUrl: "https://github.com/udaysk3",
    previewUrl: "https://app.alignav.com/",
  },
  {
    id: 2,
    title: "Reform CRM Website",
    description: "Django + Google Cloud",
    image: "/images/projects/2.png",
    tag: ["All", "Client's"],
    gitUrl: "https://github.com/udaysk3/ReformCRM",
    previewUrl: "false",
  },
 
  
  {
    id: 5,
    title: "Healthcare AI Chatbot",
    description: "Django + Google Dialogflow",
    image: "/images/projects/5.png",
    tag: ["All", "Personal"],
    gitUrl: "https://github.com/udaysk3/HealthCare-AI-ChatBot",
    previewUrl: "false",
  },
  {
    id: 4,
    title: "CMS Platform",
    description: "Django + Jquery",
    image: "/images/projects/4.png",
    tag: ["All", "Personal"],
    gitUrl: "https://github.com/udaysk3",
    previewUrl: "false",
  },
  {
    id: 6,
    title: "Other Projects",
    description: "Django/React/Next.js/Angular/Firebase/Google Cloud/MetaData Pipeline",
    image: "/images/projects/6.png",
    tag: ["All", "Personal"],
    gitUrl: "https://github.com/udaysk3",
    previewUrl: "false",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Client's"
          isSelected={tag === "Client's"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Personal"
          isSelected={tag === "Personal"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
