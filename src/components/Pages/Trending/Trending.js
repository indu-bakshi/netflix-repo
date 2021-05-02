import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../SingleContent/SingleContent'
import './Trending.css'
import CustomPagination from '../../CustomPagination/CustomPagination'
 
const Trending = () => {
   const[trendData, setTrendData]= useState([])
   const [page,setPage] = useState(1)
    useEffect(() => {
       axios
       .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
       .then(response=>{
           setTrendData(response.data.results)
       })
        
    }, [page])
    console.log("Trend Data",trendData)
     return (
         <div>
          <span className="pageTitle">Trending</span>
          <div className='trending'>
              {trendData && trendData.map(i=>(
                  <SingleContent key={i.id} id={i.id} poster={i.poster_path} title={i.title || i.name} date={i.first_air_date || i.release_date} media_type={i.media_type} vote_average={i.vote_average}  />
              ))} 
        </div>
        <CustomPagination setPage={setPage} num={10}/>  
         </div>
     )
 }
 
 export default Trending
 