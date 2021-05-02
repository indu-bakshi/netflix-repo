import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../SingleContent/SingleContent'
import '../Trending/Trending.css'
import CustomPagination from '../../CustomPagination/CustomPagination'
 
const Movies = () => {
    const[movieData, setMovieData]= useState([])
    const [page,setPage] = useState(1)
    const [num, setNum] =useState(10)
     useEffect(() => {
        axios
        .get(` https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
       
        .then(response=>{
            setMovieData(response.data.results)
            setNum(response.data.total_pages)
        })
         
     }, [page])
     console.log("Movie Data",movieData)
      return (
          <div>
           <span className="pageTitle">Movies</span>
           <div className='trending'>
               {movieData && movieData.map(i=>(
                   <SingleContent key={i.id} id={i.id} poster={i.poster_path} title={i.title || i.name} date={i.first_air_date || i.release_date} media_type="movie" vote_average={i.vote_average}  />
               ))} 
         </div>
         <CustomPagination setPage={setPage} num={num}/>  
          </div>
      )
 }
 
 export default Movies
 