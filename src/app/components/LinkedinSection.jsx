"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { staticFollowers, staticPosts } from "../data/staticData"; // Adjust the path as needed

const CACHE_EXPIRY_TIME = 2592000000; // 1 hour in milliseconds

const LinkedInPostCard = ({ title, description, imgUrl, postUrl, reactions, comments }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col w-full max-w-xs mx-auto">
    {imgUrl && <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />}
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-white mb-2 truncate">{title}</h3>
      <p className="text-gray-400 text-sm flex-grow overflow-hidden truncate">{description}</p>
      <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm mt-4">
        <a href={postUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white text-blue-500">
          Read more
        </a>
        <div className="flex gap-4 items-center mt-2 sm:mt-0">
          <span className="flex items-center">
            💓 {reactions}
          </span>
          <span className="flex items-center">
            <img src="/images/comments.png" alt="Comment" className="w-5 h-5 mr-1" />
            {comments}
          </span>
        </div>
      </div>
    </div>
  </div>
);


const fetchLinkedInFollowers = async (username) => {
  try {
    const response = await fetch(`https://linkedin-data-api.p.rapidapi.com/data-connection-count?username=${username}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
        'x-rapidapi-key': '6fa9a1ae6cmsh6f4837e536a9e69p1f030bjsn40aa0bc42a90',
      },
    });

    if (response.status === 429) {
      console.warn('API rate limit exceeded');
      return staticFollowers;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn followers');
    }

    const data = await response.json();
    return data.follower || staticFollowers; // Adjust based on actual response structure
  } catch (error) {
    console.error('Error fetching LinkedIn followers:', error);
    return staticFollowers;
  }
};

const fetchLinkedInPosts = async (username) => {
  try {
    const response = await fetch(`https://linkedin-data-api.p.rapidapi.com/get-profile-posts?username=${username}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
        'x-rapidapi-key': '6fa9a1ae6cmsh6f4837e536a9e69p1f030bjsn40aa0bc42a90',
      },
    });
    console.log("response", response);
    if (response.status === 429) {
      console.warn('API rate limit exceeded');
      return staticPosts;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn posts');
    }

    const data = await response.json();
    return data.data || staticPosts; // Return posts data
  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    return staticPosts;
  }
};

const getCachedData = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { expiry, data } = JSON.parse(cached);
  if (Date.now() > expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

const cacheData = (key, data) => {
  const expiry = Date.now() + CACHE_EXPIRY_TIME;
  localStorage.setItem(key, JSON.stringify({ expiry, data }));
};

const LinkedInSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [followersCount, setFollowersCount] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const username = 'udaysk3'; // Replace with the LinkedIn username you want to query
      
      // Fetch followers count
      const cachedFollowers = getCachedData('linkedin-followers');
      if (cachedFollowers !== null) {
        setFollowersCount(cachedFollowers);
        console.log("cachedFollowers", cachedFollowers);
      } else {
        const followersData = await fetchLinkedInFollowers(username);
        setFollowersCount(followersData);
        cacheData('linkedin-followers', followersData);
      }

      // Fetch posts
      const cachedPosts = getCachedData('linkedin-posts');
      if (cachedPosts !== null) {
        console.log("cachedPosts", cachedPosts);
        setPosts(cachedPosts);
      } else {
        const postsData = await fetchLinkedInPosts(username);
        setPosts(postsData);
        cacheData('linkedin-posts', postsData);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mt-5 pt-7" id="linkedin">
      {/* Heading with LinkedIn logo */}
      <Link href="https://linkedin.com/in/udaysk3" target="_blank">
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 mb-5 bg-gray-200 rounded-full">
            <img src="/images/linkedin_logo2.png" alt="LinkedIn Logo" className="h-10 w-10" />
          </div>
          <h2 className="text-center text-3xl font-bold text-white mt-2 md:mb-12">
            LinkedIn Activity
          </h2>
        </div>
      </Link>

      {/* LinkedIn Followers Count */}
      <div className="text-center text-2xl font-bold text-white mb-4">
        <p>Followers: {followersCount !== null ? followersCount : 'Loading...'}</p>
      </div>

      {/* Recent LinkedIn Posts */}
      <h3 className="text-center text-2xl font-bold text-white mb-4">🏆 Top LinkedIn Posts</h3>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {posts &&
        posts
        .filter((post) => post.image && post.image.length > 0 && post.text)
        .slice(0, 6)
        .map((post, index) => (
          <motion.li
            key={post.urn}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <LinkedInPostCard
              title={post.text}
              description={post.text}
              postUrl={post.postUrl}
              reactions={post.totalReactionCount}
              comments={post.commentsCount}
              imgUrl={post.image[0]?.url || null}
            />
          </motion.li>
        ))}
      </ul>
      <div className="flex justify-center mt-8">
        <Link
          href="https://linkedin.com/in/udaysk3"
          target="_blank"
          className="px-6 inline-block py-3 text-center w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
        >
          View more
        </Link>
      </div>
    </section>
  );
};

export default LinkedInSection;
