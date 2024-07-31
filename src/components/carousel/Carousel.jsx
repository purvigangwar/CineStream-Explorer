import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    // console.log("home.url",url);
    const navigate = useNavigate();

    const navigation = (dir) => {   //? Carousel Right-Left Functionality
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const getFullImageUrl = (path, size = 'original') => {
        const baseUrl = 'https://image.tmdb.org/t/p/';
        return `${baseUrl}${size}${path}`;
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
<div className="carousel">
    <ContentWrapper>
    {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={() => navigation("left")}/>
            <BsFillArrowRightCircleFill
                className="carouselRightNav arrow"
                onClick={() => navigation("right")} />
            {!loading ? (
            <div className="carouselItems" ref={carouselContainer}>
                    {data?.map((item) => {
                    const posterPath = item.poster_path;
                    //const posterUrl = item.poster_path? (url.poster || '') + item.poster_path : PosterFallback;
                    const posterUrl = posterPath ? getFullImageUrl(posterPath, 'original'): PosterFallback;
                    // console.log("---url---",posterUrl)
                    return (
            <div
            key={item.id}
                className="carouselItem"
                onClick={() =>
                //-------may be error    
                navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                <div className="posterBlock">


                <Img src={posterUrl} />
                <CircleRating rating={item.vote_average.toFixed(1)}/>


                <Genres data={item.genre_ids.slice(0, 2)}/>
                </div>
                <div className="textBlock">
                <span className="title">
                {item.title || item.name}
                </span>
                <span className="date">
                    {dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}
                    </span></div></div>);})}</div>) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
}; 
 export default Carousel;