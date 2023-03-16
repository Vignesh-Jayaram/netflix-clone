import axios from "../axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ id, title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerPath, setTrailerPath] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1,
      controls: 0,
    },
  };

  const handleClick = (movie) => {
    if (trailerPath === "") {
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.original_name ||
          movie?.original_title
      )
        .then((response) => {
          const path = response.split("?v=")[1];
          setTrailerPath(path);
          document.querySelector("body").style.overflow = "hidden";
          setMovieDescription(movie?.overview);
          setMovieTitle(movie?.name || movie?.title);
          setOriginalTitle(movie?.original_name);
        })
        .catch((error) => {
          handleError();
          console.log(error);
        });
    } else {
      setTrailerPath("");
      setMovieDescription("");
      setMovieTitle("");
      setOriginalTitle("");
      document.querySelector("body").style.overflow = "auto";
    }
  };

  const handlePagination = (e) => {
    const element = e.target.parentElement.className.split(" ");
    const postersContainer = document.querySelector(`.${element[1]}`);

    if (e.target.className === "pagination pagination--right") {
      postersContainer.scrollLeft += postersContainer.offsetWidth;
    } else {
      postersContainer.scrollLeft -= postersContainer.offsetWidth;
    }
  };

  return (
    <div className="row__container">
      <h3>{title}</h3>
      <div className="row__postersContainer">
        <div className={`row__posters row__posters--${id}`}>
          <span
            className="pagination pagination--left"
            onClick={(e) => handlePagination(e)}
          >
            <i className="fas fa-chevron-left fa-2x"></i>
          </span>
          <span
            className="pagination pagination--right"
            onClick={(e) => handlePagination(e)}
          >
            <i className="fas fa-chevron-right fa-2x"></i>
          </span>
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                  className={`movie__poster ${
                    isLargeRow && "movie__posterLarge"
                  }`}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
          )}
        </div>
        {trailerPath && (
          <div className="info__overlay" onClick={() => handleClick(null)}>
            <div
              className="info__overlay--contentBox"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                onClick={() => handleClick(null)}
                className="info__overlay--btnClose fa-stack fa-2x"
              >
                <i className="fas fa-circle fa-stack-2x icon-black"></i>
                <i className="fas fa-times fa-stack-1x icon-white"></i>
              </span>
              <div className="info__overlay--videoBox">
                <YouTube
                  className="info__overlay--youtube"
                  videoId={trailerPath}
                  opts={opts}
                />
                <div className="info__overlay--iconBox">
                  <button className="info__button info__button--play">
                    <i className="fas fa-play"></i>
                    <span>Play</span>
                  </button>
                  <span className="fa-stack fa-2x info__icon">
                    <i className="fas fa-circle fa-stack-2x icon-black-opacity"></i>
                    <i className="fas fa-plus fa-stack-1x icon-white"></i>
                  </span>
                  <span className="fa-stack fa-2x info__icon">
                    <i className="fas fa-circle fa-stack-2x icon-black-opacity"></i>
                    <i className="far fa-thumbs-up fa-stack-1x icon-white"></i>
                  </span>
                  <span className="fa-stack fa-2x info__icon">
                    <i className="fas fa-circle fa-stack-2x icon-black-opacity"></i>
                    <i className="far fa-thumbs-down fa-stack-1x icon-white"></i>
                  </span>
                </div>
              </div>
              <div className="info__overlay--text">
                <h1>{movieTitle}</h1>
                <h2>{originalTitle ? `(${originalTitle})` : ""}</h2>
                <p>{movieDescription}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const handleError = function () {
  const html = `
<div class="error">
    <div class="error__text">
        <p class="error__heading">Error:</p>
        <p class="error__description">Can't find trailer, please try another title!</p>
    </div>
</div>
`;
  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", html);
  const error = body.querySelector(".error");
  error.classList.add("fade-in");

  setTimeout(function () {
    // error.classList.remove('fade-in');
    error.classList.add("fade-out");
    setTimeout(function () {
      error.remove();
    }, 500);
  }, 2500);
};

export default Row;
