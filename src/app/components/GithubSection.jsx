"use client";
import React, { useState, useEffect, useRef } from "react";
import GithubProjectCard from "./GithubProjectCard";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import GitHubCalendar from 'react-github-calendar';

const GithubSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [projects, setProjects] = useState([]);
  
  
  useEffect(() => {
    const fetchAllRepos = async () => {
      const repos = [];
      let page = 1;
      const perPage = 100; // Maximum allowed by GitHub API

      try {
        while (true) {
          const response = await fetch(
            `https://api.github.com/users/udaysk3/repos?per_page=${perPage}&page=${page}&type=public`,
            {
              headers: {
                'Authorization': 'token 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',
              },
            }
          );

          const data = await response.json();

          if (data.length === 0) break; // Exit loop if no more repos

          repos.push(...data);
          page += 1; // Move to the next page
        }

        // Log all fetched repositories
        console.log("Fetched All Repositories:", repos);

        // Fetch commits count for each repository
        const reposWithCommits = await Promise.all(
          repos.map(async (repo) => {
            const commitResponse = await fetch(
              repo.commits_url.replace("{/sha}", ""),
              {
                headers: {
                  'User-Agent': 'YourRepoName',
                  'Authorization': 'token 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',
                },
              }
            );
            const commits = await commitResponse.json();
            return { ...repo, commitsCount: commits.length };
          })
        );

        // Sort by commits (descending) and then by last updated
        const sortedRepos = reposWithCommits
          .sort((a, b) => b.commitsCount - a.commitsCount)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6); // Get top 6 repos

        // Log sorted repositories to check the result
        console.log("Sorted Repositories:", sortedRepos);

        // Map sorted data to the required format

        const projectData = sortedRepos.map((repo, index) => ({
          id: repo.id,
          title: repo.name,
          description: repo.description,
          image: `/images/project${index+1}.png`, // Replace with actual images if available
          gitUrl: repo.html_url,
          previewUrl: repo.homepage || repo.html_url,
        }));

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchAllRepos();
  }, []);

  const handleViewMoreClick = () => {
    window.open('https://github.com/udaysk3', '_blank');
  };

  return (
    <section className="mt-5 pt-7" id="github">
      {/* Heading with GitHub logo */}
      <Link
          href="https://github.com/udaysk3"
          target="_blank">
              <div className="flex flex-col items-center gap-2 mt-6">
        <div className="p-2 mb-5 bg-gray-200 rounded-full">
          <img src="/images/github_logo.png" alt="GitHub Logo" className="h-10 w-10" />
        </div>
        <h2 className="text-center text-3xl font-bold text-white mt-2 md:mb-12">
          GitHub Activity
        </h2>
      </div>
      
      {/* <img
          src="https://ghchart.rshah.org/udaysk3?theme=dark"
          alt="GitHub Profile Contributions"
          className="w-full"
        /> */}
         <div className="flex justify-center pb-5">
        <GitHubCalendar username="udaysk3" />
        </div>
      </Link>
      

      {/* GitHub Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <img
          src="https://github-readme-stats.vercel.app/api?username=udaysk3&theme=dark&hide_border=false&include_all_commits=true&count_private=true"
          alt="GitHub Stats"
          className="w-full"
        />
        <img
          src="https://github-readme-streak-stats.herokuapp.com/?user=udaysk3&theme=dark&hide_border=false"
          alt="GitHub Streak"
          className="w-full"
        />
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=udaysk3&theme=dark&hide_border=false&include_all_commits=true&count_private=true&layout=compact"
          alt="Top Languages"
          className="w-full"
        />
      </div>

      {/* GitHub Trophies */}
      <h3 className="text-center text-2xl font-bold text-white mb-4">🏆 GitHub Trophies</h3>
      <div className="flex justify-center mb-8">
        <img
          src="https://github-profile-trophy.vercel.app/?username=udaysk3&theme=radical&no-frame=false&no-bg=true&margin-w=4"
          alt="GitHub Trophies"
          className="w-full"
        />
      </div>

      {/* Recent Projects */}
      <h3 className="text-center text-2xl font-bold text-white mb-4">🏆 Top Github Repostories</h3>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <motion.li
            key={index}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 }
            }}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <GithubProjectCard
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
      <div className="flex justify-center mt-8">
        <Link
          href="https://github.com/udaysk3?tab=repositories"
          target="_blank"
          className="px-6 inline-block py-3 text-center w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
        >
          View more
        </Link>
      </div>
    </section>
  );
};

export default GithubSection;
