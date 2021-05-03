import React, { useEffect, useState } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import TextField from '@material-ui/core/TextField';
import {Tab, Tabs, ThemeProvider } from '@material-ui/core';
import { Button, createMuiTheme } from '@material-ui/core';
import './Search.css'
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../CustomPagination/CustomPagination';


const darkTheme = createMuiTheme({
    palette: {
        type:"dark",
        primary:{
        main: "#E50914",
    },
},
});

const Search=()=> {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [numOfPage, setNumOfPage]= useState(0);
    const [searchText, setSearchText]= useState("");
    const [content,setContent] =useState([]);
   
    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
          setContent(data.results);
          setNumOfPage(data.total_pages);
          // console.log(data);
        } catch (error) {
          console.error("");
        }
      };

useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page, searchText]);
  return (
    <div>
      <ThemeProvider theme={darkTheme} >
          <div className="search">
      <TextField id="filled-basic" label="Search" variant="filled" style={{ flex: 1 }}  className="searchBox"  onChange={(e)=>setSearchText(e.target.value)} />
      <Button variant="outlined" style={{ marginLeft: 10 }}  onClick={fetchSearch}>
            <SearchIcon fontSize="large" color="primary"/>
      </Button>
      </div>
      <Paper square>
      <Tabs
      value={type}
        variant="fullWidth"
        indicatorColor="primary"
          textColor="secondary"
        aria-label="disabled tabs example"
        onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
      >
        <Tab  style={{ width: "50%", color:"#ffffff" }} icon={<MovieIcon/>} label="Movies" />
        <Tab  style={{ width: "50%", color:"#ffffff" }} icon={<TvIcon />} label="Series" />
      </Tabs>
      </Paper>
      </ThemeProvider>
      <div className='trending'>
      
              {content && content.map(i=>(
                  <SingleContent key={i.id} id={i.id} poster={i.poster_path} title={i.title || i.name} date={i.first_air_date || i.release_date} media_type={type ? "tv" : "movie"} vote_average={i.vote_average}  />
              ))}
               
               
        </div>
       
        <CustomPagination setPage={setPage} num={numOfPage}/>
        
         </div>
  );
}

export default Search
 