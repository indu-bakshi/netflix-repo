import React from 'react';
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
const darkTheme = createMuiTheme({
    palette: {
        type:"dark",
    },
});


const CustomPagination=({setPage,num})=> {
  
    const handleChange=(value)=>{
        setPage(value);
        window.scroll(0,0);

    }
  return (
      
    <div style={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        marginTop:20
    
    }}>
      <ThemeProvider theme={darkTheme}>
      <Pagination count={num} variant="outlined" onChange={e=> handleChange(e.target.textContent)} hideNextButton hidePrevButton />
      </ThemeProvider>
    </div>
  );
}

export default CustomPagination