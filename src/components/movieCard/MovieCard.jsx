import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  // Provide a default value for url when destructuring
  const { url = { poster: 'https://image.tmdb.org/t/p/' } } = useSelector((state) => state.home || {});
  const navigate = useNavigate();
  
  const getFullImageUrl = (path, size = 'original') => {
    // Ensure url.poster is defined and ends with a slash
    const baseUrl = url?.poster ? (url.poster.endsWith('/') ? url.poster : `${url.poster}/`) : 'https://image.tmdb.org/t/p/';
    return path ? `${baseUrl}${size}${path}` : PosterFallback;
  };

  const posterUrl = getFullImageUrl(data.poster_path);
  console.log("Poster URL:", posterUrl);

  return (
    <div
      className="movieCard"
      onClick={() =>
        navigate(`/${data.media_type || mediaType}/${data?.id}`)
      }
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
