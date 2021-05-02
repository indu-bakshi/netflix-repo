import { Chip, createMuiTheme, ThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'

const Genre = ({
    genre,setGenre, selectedGenre, setSelectedGenre, type,setPage
}) => {
    const darkTheme = createMuiTheme({
        palette: {
            type:"dark",
        },
    });

    const handleAdd =(value)=>{
        setSelectedGenre([...selectedGenre, value])
        setGenre(genre.filter((g) => g.id !== value.id));
        // setGenre(genre.filter(g=> g.id !==genre.id))
        setPage(1)
    }

    const handleDelete=(deleteGenre)=>{
        setSelectedGenre(selectedGenre.filter((g)=> g.id !==deleteGenre.id))
        setGenre([...genre,deleteGenre])
        
        setPage(1)
    }
    
    useEffect(() => {
      axios
      .get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(response=>{
          setGenre(response.data.genres)
      })
      return () => {
        setGenre({}); // unmounting
       
      };
       // eslint-disable-next-line
    },[])

    console.log("Genre",genre) 
    
    return (
        <div style={{marginTop:20}}>
            {selectedGenre && selectedGenre.map(item=>(
               <ThemeProvider theme={darkTheme}> 
               <Chip label={item.name} key={item.id}   variant="outlined" color="primary" style={{margin:4}} onDelete={()=>handleDelete(item)}/>
               </ThemeProvider>
            ))}
        
            {genre && genre.map(item=>(
               <ThemeProvider theme={darkTheme}> 
               <Chip label={item.name} key={item.id}   variant="outlined" style={{margin:4}} clickable onClick={()=>handleAdd(item)}/>
               </ThemeProvider>
            ))}
        </div>
    )
}

export default Genre
