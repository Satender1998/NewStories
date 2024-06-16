
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { LiaCommentSolid } from "react-icons/lia";
import { FaHotjar } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";
import background from "../../public/images/pexels-gabby-k-7794435.jpg"

export default function Home() {
  const [topStories, setTopStories] = useState([]);
  const [bestStories, setBestStories] = useState([]);
  const [newStories, setNewStories] = useState([]);
  const [activeTab, setActiveTab] = useState("top");
  const [error, setError] = useState(null);

  console.log(newStories);
  // console.log(topStories);

  // useEffect(() => {
  //   const fetchStories = async () => {
  //     try {
  //       const topStoriesRes = await axios.get(
  //         "http://localhost:3001/topstories"
  //       );
  //       setTopStories(topStoriesRes.data.stories);

  //       const bestStoriesRes = await axios.get(
  //         "http://localhost:3001/beststories"
  //       );
  //       setBestStories(bestStoriesRes.data.stories);

  //       const newStoriesRes = await axios.get(
  //         "http://localhost:3001/newstories"
  //       );
  //       setNewStories(newStoriesRes.data.stories);
  //     } catch (error) {
  //       setError("Error fetching stories. Please try again later.");
  //       console.error(error);
  //     }
  //   };

  //   fetchStories();
  // }, []);
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const topStoriesRes = await axios.get(
          // "http://localhost:3001/topstories"
          `https://newstories.onrender.com/topStories}`
        );
        setTopStories(topStoriesRes.data.stories);

        const bestStoriesRes = await axios.get(
          // "http://localhost:3001/beststories"
          `https://newstories.onrender.com/bestStories`
        );
        setBestStories(bestStoriesRes.data.stories);

        const newStoriesRes = await axios.get(
          // "http://localhost:3001/newstories"
          `https://newstories.onrender.com/newStories`
        );
        setNewStories(newStoriesRes.data.stories);
      } catch (error) {
        setError("Error fetching stories. Please try again later.");
        console.error(error);
      }
    };

    fetchStories();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const formatTime = (timestamp) => {
    const now = new Date();
    const storyTime = new Date(timestamp * 1000);
    const diffInSeconds = Math.floor((now - storyTime) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else {
      return `${diffInHours} hours ago`;
    }
  };

  const getDomain = (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace("www.", "");
    } catch (error) {
      console.error("Invalid URL:", url);
      return "Invalid URL";
    }
  };

  const renderStories = (stories) => (
    <ul>
      {stories.map((story) => (
        <li
          key={story.id}
          className="mb-4 bg-white p-4 border border-gray-200 rounded flex w-9/12"
        >
          <div className="w-16 text-center text-gray-700">
            <div className="ml-6">
              <IoMdArrowDropup />
            </div>
            <div className="text-l font-bold">{story.score || 0}</div>
          </div>
          <div className="flex-1 ml-4">
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:underline"
            >
              {story.title}
            </a>
            <div className="text-sm text-gray-600 flex items-center mt-3">
              <span className="mr-1">by</span>
              <span className="text-red-500 mr-4">{story.by}</span>
              <span>|</span>
              <span className="ml-2 mr-4">{formatTime(story.time)}</span>
              <span>{getDomain(story.url)}</span>
              <span className="ml-2 mr-2">|</span>
              <span className="mr-2">{story.descendants}</span>
              <span>{<LiaCommentSolid />} </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex min-h-screen" 
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    >
      
      <div className="w-1/4 sm:w-1/5 border-r border-gray-200 flex flex-col justify-center items-center mb-52 h-auto" >
      
        <div>
          <FaHotjar />
        </div>
        <a
          href="#"
          className="mb-8 text-gray-700 hover:underline"
          onClick={() => setActiveTab("top")}
        >
          Top
        </a>

        <div>
          <FaRegNewspaper />
        </div>
        <a
          href="#"
          className="block mb-8 text-gray-700 hover:underline"
          onClick={() => setActiveTab("new")}
        >
          New
        </a>
        <div>
          <IoLogoFirebase />
        </div>
        <a
          href="#"
          className="block mb-8 text-gray-700 hover:underline"
          onClick={() => setActiveTab("best")}
        >
          Best
        </a>
      </div>
      <div className="flex-1 p-4">
        {activeTab === "top" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-red-500 pb-2 mb-4 inline-block">
              Top stories
            </h1>
            {renderStories(topStories)}
          </>
        )}
        {activeTab === "new" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4 inline-block">
              New stories
            </h1>
            {renderStories(newStories)}
          </>
        )}
        {activeTab === "best" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-green-500 pb-2 mb-4 inline-block">
              Best stories
            </h1>
            {renderStories(bestStories)}
          </>
        )}
      </div>
    </div>
  );
}

     
