import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";


const glowCard = (color = "#38BDF8") => ({
  background: "#020617",
  border: "1px solid #1E293B",
  borderRadius: 16,
  padding: 16,
  transition: "all 0.25s ease",
  boxShadow: `0 0 18px ${color}22`,
});

const glowHover = color => ({
  boxShadow: `0 0 40px ${color}55`,
  borderColor: color,
  transform: "translateY(-3px)",
});


export default function TechNews() {
  const [hnNews, setHnNews] = useState([]);
  const [devNews, setDevNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    async function fetchAllNews() {
      try {
        // Hacker News
        const hnIdsRes = await fetch(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        );
        const hnIds = await hnIdsRes.json();

        const hnStories = await Promise.all(
          hnIds.slice(0, 6).map(async (id) => {
            const res = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            );
            return res.json();
          })
        );

        // Dev.to
        const devRes = await fetch(
          "https://dev.to/api/articles?top=6"
        );
        const devArticles = await devRes.json();

        setHnNews(hnStories);
        setDevNews(devArticles);
      } catch (err) {
        console.error("Failed to load IT news", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllNews();
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading IT news…</p>;
  }

  return (
    
    <div style={{ padding: 24 }}>
      <h1>Live IT News</h1>

     
      <h3 style={{ marginTop: 30, color: "#22D3EE" }}>
        Engineering & Startup News
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginTop: 16,
        }}
      >
        {hnNews.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            url={item.url}
            score={item.score}
          />
        ))}
      </div>

      {/* Dev.to Section */}
      <h3 style={{ marginTop: 40, color: "#22D3EE" }}>
        Developer Articles
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginTop: 16,
        }}
      >
        {devNews.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            url={item.url}
            score={`❤️ ${item.public_reactions_count}`}
          />
        ))}
        
      </div>
    </div>
  );
}
