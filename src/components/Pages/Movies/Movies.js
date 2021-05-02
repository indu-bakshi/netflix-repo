import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";
import "../Trending/Trending.css";
import CustomPagination from "../../CustomPagination/CustomPagination";
import Genre from "../../Genre/Genre";
import useGenre from "../../Hooks/useGenre";

const Movies = () => {
  const [genre, setGenre] = useState([])
  const [selectedGenre, setSelectedGenre]= useState([])
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [num, setNum] = useState(10);
    const genreforURL =useGenre(selectedGenre)

  useEffect(() => {
    axios
      .get(` https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      )

      .then((response) => {
        setMovieData(response.data.results);
        setNum(response.data.total_pages);
      });
  }, [genreforURL,page]);
//   console.log("Movie Data", movieData);
  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genre
            genre={genre}
            setGenre={setGenre}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            setPage={setPage}
            type="movie"
      />
      <div className="trending">
        {movieData &&
          movieData.map((i) => (
            <SingleContent
              key={i.id}
              id={i.id}
              poster={i.poster_path}
              title={i.title || i.name}
              date={i.first_air_date || i.release_date}
              media_type="movie"
              vote_average={i.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} num={num} />
    </div>
  );
};

export default Movies;
