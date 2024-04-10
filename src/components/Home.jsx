import React, { useEffect, useState } from "react";
import API_KEY from "../API_KEY";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    getMovieData();
  }, []);

  const getMovieData = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const res = await fetch(url);
    try {
      if (res.ok) {
        const data = await res.json();
        const formatedData = data?.results.map((eachData) => ({
          id: eachData.id,
          posterPath: eachData.poster_path,
          originalTitle: eachData.original_title,
          voteAverage: eachData.vote_average,
        }));
        setMovieData(formatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <ul className="main-container">
        {movieData.map((eachMovie) => (
          <li key={eachMovie.id}>
            <Link to={`/movies/${eachMovie.id}`} className="li-container link">
              <img
                src={`https://image.tmdb.org/t/p/w500${eachMovie.posterPath}`}
                alt={eachMovie.originalTitle}
                className="poster-img"
              />
              <h1 className="title">{eachMovie.originalTitle}</h1>
              <p className="voting">
                Rating: {"  "}
                {Math.round(eachMovie.voteAverage * 10) / 10}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
