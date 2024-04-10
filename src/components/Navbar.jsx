import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import "../styles/Navbar.css";

const Navbar = () => {
  const [showInput, setShowInput] = useState(false);
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

  const onClickSearch = () => {
    navigate("/search");
  };

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
          <div className="non-mobile">
            <input
              type="text"
              className="input"
              placeholder="Search"
              onChange={onClickInput}
              value={inputSearch}
              onClick={onClickSearch}
            />
            <button className="serch-btn" type="button" onClick={onClickSearch}>
              Search
            </button>
          </div>
          <CiSearch className="search-icon" onClick={onClickshowIcon} />
        </div>
      </div>

      {/* mobile */}
      {showInput ? (
        <div className="mobile-viwe-container">
          <input
            type="text"
            className="input"
            placeholder="Search"
            onChange={onClickInput}
            value={inputSearch}
          />
          <button className="serch-btn" type="button" onClick={onClickSearch}>
            Search
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
