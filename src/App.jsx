import { useEffect } from 'react';
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import PageNotFound from './pages/404/PageNotFound';
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchInitialData();
    genresCall();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [configData, popularData] = await Promise.all([
        fetchDataFromApi("configuration"),
        fetchDataFromApi("movie/popular")
      ]);

      const urls = {
        backdrop: configData.images.secure_base_url,
        poster: configData.images.secure_base_url,
        profile: configData.images.secure_base_url,
      }

      dispatch(getApiConfiguration({ urls }));

    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`genre/${url}/list`));
    });
      const data = await Promise.all(promises);
      console.log(data);
      
      // data.forEach(({ genres }) => {
      //   genres.forEach((item) => {
      //     allGenres[item.id] = item;
      //   });
      // });
      data.map(({ genres }) => {
        // console.log(genres)
          return genres.map((item) => (allGenres[item.id] = item));
      });
    
      dispatch(getGenres(allGenres));    
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
