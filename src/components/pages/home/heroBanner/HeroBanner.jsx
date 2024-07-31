import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./style.scss";
import useFetch from "../../../hooks/UseFetch";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("movie/upcoming");

  useEffect(() => {
    if (data?.results) {
      const bg = url.backdrop + data.results[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBackground(bg);
    }
  }, [data, url]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner" style={{ backgroundImage: `url(${background})` }}>
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subtitle">
            Millions of movies, TV shows, and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a Movie or TV show..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button type="button" onClick={handleSearchClick}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
