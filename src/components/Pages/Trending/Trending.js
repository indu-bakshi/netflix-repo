import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../SingleContent/SingleContent'
import './Trending.css'
 
const Trending = () => {
   const[trendData, setTrendData]=useState([])
    useEffect(() => {
       axios
       .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`)
       .then(response=>{
           setTrendData(response.data.results)
       })
        
    }, [])
    console.log("Trend Data",trendData)
     return (
         <div>
          <span className="pageTitle">Trending</span>
          <div className='trending'>
              {trendData && trendData.map(i=>(
                  <SingleContent key={i.id} id={i.id} poster={i.poster_path} title={i.title || i.name} date={i.first_air_date || i.release_date} media_type={i.media_type} vote_average={i.vote_average}  />
              ))} 
        </div>  
         </div>
     )
 }
 
 export default Trending
 