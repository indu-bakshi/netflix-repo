import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../SingleContent/SingleContent.css'
import axios from 'axios';
import ReactPlayer from 'react-player';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#000000",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({children, media_type, id}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent]= useState([])
  const [video,setVideo] = useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    axios
    .get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(response=>{
        
        setVideo(response.data.results[0]?.key)
        
    })
    // eslint-disable-next-line
  },[])
  useEffect(()=>{
    axios
    .get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(response=>{
        setContent(response.data)
    })
    // eslint-disable-next-line
  },[])

  

console.log("Video", video)
console.log("content", content)
  return (
    <>
      <div type="button" onClick={handleOpen} className="media">
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{maxHeight:"90vh"}}
      >
        <Fade in={open}>
          <div className={classes.paper} style={{position:"relative"}} >
           
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video}`}
            width='100%' 
            height={"100%"}
          />
            
          </div>
        </Fade>
      </Modal>
    </>
  );
}
