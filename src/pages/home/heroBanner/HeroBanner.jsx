import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./style.scss";
// import { getFullImageUrl } from 'App.jsx';  Adjust the path if needed
import useFetch from '../../../hooks/UseFetch';
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';


const HeroBanner = () => {
  const [background,setBackground] = useState("");  
  const [query,setQuery] = useState("");
  const navigate = useNavigate();
  const {url} =useSelector((state)=>state.home);

  const {data,loading}= useFetch("movie/upcoming");

  // useEffect(()=>{
  //   const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path ;
  //   setBackground(bg);
  //   },[data])
  const getFullImageUrl = (path, size = 'original') => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    return `${baseUrl}${size}${path}`;
  };
   
  useEffect(() => {
    if (data?.results?.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const backdropPath = data.results[randomIndex]?.backdrop_path;
      if (backdropPath) {
        const fullImageUrl = getFullImageUrl(backdropPath, 'original'); // You can choose a different size if needed
        setBackground(fullImageUrl);
      }
    }
  }, [data]);

  const searchQueryHandler = (event)=>{            
    if(event.key==="Enter" && query.length>0){
        navigate(`/search/${query}`)              
    }
  }

  return (
    <div className="heroBanner">
      {!loading && <div className='backdrop-img'>
        <Img src={background}/>
      </div>}
       
       <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className='title'>Welcome.</span>
          <span className='subtitle'>
            Millions of movies, TV shows and people to   discover. Explore now.
          </span>
          <div className='searchInput'>
          <input type="text" 
          placeholder='Search for a Movie or TV show...'
          onChange={(event)=>setQuery(event.target.value)}
          onKeyUp={searchQueryHandler}
          />
          <button >Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>    
  )
}

export default HeroBanner