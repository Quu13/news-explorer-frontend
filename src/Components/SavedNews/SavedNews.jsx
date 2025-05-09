import React from "react";
// import NewsCard from "../NewsCard/NewsCard";
import { useContext } from "react";
// import cardImage from "../../assets/card-image.jpeg";
import "./SavedNews.css";
import { useOutletContext } from "react-router-dom";

const SavedNews = () => {
  const { savedArticles } = useOutletContext();
  //   {
  //     title: "Breaking News: Tech Innovation in 2024",
  //     urlToImage: cardImage, // Using the variable
  //     keyword: "Technology",
  //     content:
  //       "The latest advancements in AI and robotics are reshaping the industry...",
  //     pubDate: "2024-02-10",
  //     author: "John Doe",
  //   },
  //   {
  //     title: "Breaking News: Tech Innovation in 2024",
  //     urlToImage: cardImage, // Using the variable
  //     keyword: "Technology",
  //     content:
  //       "The latest advancements in AI and robotics are reshaping the industry...",
  //     pubDate: "2024-02-10",
  //     author: "John Doe",
  //   },
  //   {
  //     title: "Breaking News: Tech Innovation in 2024",
  //     urlToImage: cardImage, // Using the variable
  //     keyword: "Technology",
  //     content:
  //       "The latest advancements in AI and robotics are reshaping the industry...",
  //     pubDate: "2024-02-10",
  //     author: "John Doe",
  //   },
  //   {
  //     title: "Breaking News: Tech Innovation in 2024",
  //     urlToImage: cardImage, // Using the variable
  //     keyword: "Technology",
  //     content:
  //       "The latest advancements in AI and robotics are reshaping the industry...",
  //     pubDate: "2024-02-10",
  //     author: "John Doe",
  //   },
  // ];

  return (
    <ul className="saved-news">
      {savedArticles.map((article, index) => (
        <NewsCard key={index} {...article} />
      ))}
    </ul>
  );
};

export default SavedNews;