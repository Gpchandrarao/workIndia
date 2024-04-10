import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import API_KEY from "../API_KEY";
import "../styles/Search.css";

const Search = () => {
  const [showInput, setShowInput] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const onClickInput = (e) => {
    setInputSearch(e.target.value);
  };
  const onClickshowIcon = () => {
    setShowInput(!showInput);
  };

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  const onClickSearch = async (e) => {
    e.preventDefault();
    const api = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputSearch}&page=1`;
    const res = await fetch(api);
    try {
      if (res.ok) {
        const data = await res.json();
        const formatedData = data?.results.map((eachData) => ({
          id: eachData.id,
          posterPath: eachData.poster_path,
          originalTitle: eachData.original_title,
          voteAverage: eachData.vote_average,
        }));
        setSearchData(formatedData);
      }
      setShowInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const SearchNab = () => {
    return (
      <div className={`nav-contaainer ${show && "nav-tran"}`}>
        <div className="nav-items">
          <Link to="/" className="link">
            <h1>MovieDB</h1>
          </Link>
          <div className="nav-contents">
            <Link to="/popular" className="link">
              <p>Popular</p>
            </Link>
            <Link to="/top-rated" className="link">
              <p>Top Rated</p>
            </Link>
            <Link to="/upcoming" className="link">
              <p>Upcoming</p>
            </Link>
            <form className="non-mobile" onSubmit={onClickSearch}>
              <input
                type="text"
                className="input"
                placeholder="Search"
                onChange={onClickInput}
                value={inputSearch}
              />
              <button className="serch-btn" type="submit">
                Search
              </button>
            </form>
            <CiSearch className="search-icon" onClick={onClickshowIcon} />
          </div>
        </div>

        {/* mobile */}
        {showInput ? (
          <form className="mobile-viwe-container" onSubmit={onClickSearch}>
            <input
              type="text"
              className="input"
              placeholder="Search"
              onChange={onClickInput}
              value={inputSearch}
            />
            <button className="serch-btn" type="submit">
              Search
            </button>
          </form>
        ) : (
          ""
        )}
      </div>
    );
  };
  return (
    <div>
      {SearchNab()}
      <ul className="search-container">
        {searchData.map((eachMovie) => (
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

export default Search;
