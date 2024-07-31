
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import "./style.scss";

const SearchResult = () => {
  const [data, setData] = useState({ results: [] });
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const { query } = useParams();

  // Fetch initial data for the search
  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`);
      setData(res);
      setPageNum(prev => prev + 1);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch next page data for infinite scrolling
  const fetchNextPageData = async () => {
    try {
      const res = await fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`);
      setData(prevData => ({
        ...prevData,
        results: [...prevData.results, ...res.results]
      }));
      setPageNum(prev => prev + 1);
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    }
  };

  // Fetch data when query changes
  useEffect(() => {
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data.total_results > 1 ? "results" : "result"} of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data.results.length}
                next={fetchNextPageData}
                hasMore={pageNum <= data.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item, index) => (
                  item.media_type !== "person" && (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <div className="noResults">
              <img src={noResults} alt="No results" />
              <span className="resultNotFound">Sorry, results not found!</span>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
