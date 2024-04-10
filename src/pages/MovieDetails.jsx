import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_KEY from "../API_KEY";

import "../styles/MovieDetails.css";
import Navbar from "../components/Navbar";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    getMovieDetails();
    getCast();
  }, []);

  const getMovieDetails = async () => {
    const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(api);
    try {
      if (res.ok) {
        const data = await res.json();
        setMovieDetails(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCast = async () => {
    const api = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(api);
    try {
      if (res.ok) {
        const data = await res.json();
        const formatedData = data.cast.map((eachCast) => ({
          profilePath: eachCast.profile_path,
          name: eachCast.name,
          id: eachCast.id,
        }));
        setCast(formatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   const genre = movieDetails.genres;

  //   const genreName = genre.map((genre) => genre.name).join(", ");

  return (
    <div>
      <Navbar />
      <div className="movidetail-container">
        <div
          className="background-image-container"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "contain",
            backgroundColor: "rgab(0,0,0,0.8)",
          }}
        >
          <div className="image-heading-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="img"
            />
            <div className="details-info">
              <h1>{movieDetails.title}</h1>
              <p>Rating: {Math.round(movieDetails.vote_average * 10) / 10}</p>
              <div className="time-genres">
                <p className="run-time">{movieDetails.runtime} min</p>
                {/* <p>{genreName}</p> */}
              </div>
              <p>Release Data: {movieDetails.release_date}</p>
            </div>
          </div>
          <div className="over">
            <h1>Overview</h1>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
        {/* cast */}
        <div className="cast-container">
          <h1>Cast</h1>
          <ul className="li">
            {cast.map((eachCast) => {
              return (
                <li key={eachCast.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${eachCast?.profilePath}`}
                    alt={eachCast.name}
                    className="profile-pics"
                  />
                  <p>{eachCast.name}hii</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
