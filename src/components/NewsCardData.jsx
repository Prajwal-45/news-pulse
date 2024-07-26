import React from "react";
import { useState, useEffect } from "react";

export default function NewsCardData() {
  function getPreviousDay() {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const previousDay = getPreviousDay();
  const apiKey = "44d465b6c0184d818ffc110b23d4c387";

  const apiUrl = `https://newsapi.org/v2/everything?q=Apple&from=${previousDay}&sortBy=popularity&apiKey=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setNews(data.articles))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const [news, setNews] = useState([]);
  console.log(news);

  return (
    <>
      <ul>
        {news?.map((newsData, index) => (
          <>
            <li key={index}>
                <a href={newsData.url} target="_blank">
              <div width="20%" height="20%">
                <img
                  src={
                    newsData.urlToImage == null || newsData.urlToImage == ""
                      ? "bigBreaking.jpg"
                      : newsData.urlToImage
                  }
                  alt={index}
                />
                <h2>Name of Author: {newsData.author}</h2>
                <h3>Title : {newsData.content}</h3>
                <p>Full Description : {newsData.description}</p>
              </div>
              </a>
              <br />
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
