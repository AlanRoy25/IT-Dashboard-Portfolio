import { useState } from "react";

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



export default function TechNewsCard({ news = [] }) {
  const [hover, setHover] = useState(false);
  const visibleNews = news.slice(0, 3);

  return (
    <div
      style={{
        ...glowCard("#38BDF8"),
        ...(hover ? glowHover("#38BDF8") : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3 style={{ marginBottom: 12 }}>📰 Latest Tech News</h3>

      {visibleNews.length === 0 && (
        <p style={styles.muted}>Loading latest tech news...</p>
      )}

      {visibleNews.map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          style={styles.item}
        >
          <img
            src={item.image || item.urlToImage || "/news-fallback.png"}
            alt=""
            style={styles.image}
            onError={e => {
              e.currentTarget.src = "/news-fallback.png";
            }}
          />

          <div>
            <p style={styles.title}>{item.title}</p>
            <span style={styles.source}>
              {item.source?.name || item.source || "Tech News"}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}


const styles = {
  item: {
    display: "flex",
    gap: 12,
    textDecoration: "none",
    color: "#E5E7EB",
    marginBottom: 14,
    alignItems: "flex-start",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    objectFit: "cover",
    background: "#1E293B",
    flexShrink: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.3,
    marginBottom: 4,
  },
  source: {
    fontSize: 12,
    color: "#94A3B8",
  },
  muted: {
    color: "#94A3B8",
    fontSize: 14,
  },
};
