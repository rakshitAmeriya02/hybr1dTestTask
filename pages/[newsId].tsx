import { Story } from "../interfaces";
import { fetchData } from "../utils/api";
import { API_ENDPOINT } from "../utils/constant";
import styles from "../styles/News.module.css";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Loader from "components/Loader";
import SearchBar from "components/SearchBar";
import { BackIcon } from "icons";

const exractComments = (story: Story, comments: string[] = []) => {
  if (story.type === "comment" && story.text && story.text.trim()) {
    comments.push(story.text);
  }
  if (story.children.length) {
    story.children.forEach((child) => exractComments(child, comments));
  }
  return comments;
};

const News = () => {
  const router = useRouter();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const newsId = router.query.newsId;

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const url = API_ENDPOINT.ITEMS + "/" + newsId;
        const data = await fetchData(url);
        setStory(data);
      } catch (error) {
        console.log("ERROR:", { error });
      }
      setLoading(false);
    };
    if (newsId) {
      fetchStoryData();
    }
  }, [newsId]);

  const comments: string[] = useMemo(() => {
    return story ? exractComments(story) : [];
  }, [story]);

  if (loading) {
    return <Loader />;
  }

  const handleGoBack = () => {
    router.back();
  };

  return (
    <React.Fragment>
      <div className={styles.headerBar}>
        <div onClick={handleGoBack}>
          <BackIcon />
        </div>
        <div className={styles.searchBarWrapper}>
          <SearchBar />
        </div>
      </div>
      {story ? (
        <div className={styles.container}>
          <h2 dangerouslySetInnerHTML={{ __html: story.title || story.text }} />
          <h3>Points {story.points || 0}</h3>
          {comments.length ? (
            <ul>
              {comments.map((comment, index) => (
                <li
                  key={`comment-${index + 1}`}
                  dangerouslySetInnerHTML={{ __html: comment }}
                />
              ))}
            </ul>
          ) : (
            <h5>No comments available</h5>
          )}
        </div>
      ) : (
        <div className={styles.noDataContainer}>
          <h2>Data not found</h2>
        </div>
      )}
    </React.Fragment>
  );
};

export default News;
