import React from "react";
import Banner from "../Components/Banner";
import Nav from "../Components/Nav";
import "./HomeScreen.css";
import Row from "../Components/Row";
import requests from "../Requests";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row
        id="1"
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row id="2" title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row id="3" title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row id="4" title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row id="5" title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row id="6" title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row
        id="7"
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        id="8"
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default HomeScreen;
