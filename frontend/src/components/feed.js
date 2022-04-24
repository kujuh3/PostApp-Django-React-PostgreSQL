import { useState, useRef, useEffect } from 'react';
import { Link as Weblink } from "@mui/material"
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';

const useStyles = makeStyles({
    card: {
        backgroundColor: "black",
        marginTop: "5px",
        marginBottom: "20px",
        color: "white !important",
        boxShadow: "2px 2px 4px #2f2f2f !important"
    },
    content: {
        padding: "20px",
        backgroundColor: "#20152f"
    },
    contentheader: {
        padding: "10px",
        backgroundColor: "#3e265b",
        borderBottom: "1px solid #e18a2e"
    },
    background : {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: "#0F0A15",
        zIndex: -1,
    },
    addbutton: {
        position: "fixed !important",
        right: "0 !important",
        bottom: "0 !important",
        margin: "20px !important"
    }
});

function App() {
  const styles = useStyles();
  const [posts, setPosts] = useState(null);
  const getPosts = async () => {
      try {
          const resp = await axios.get("http://127.0.0.1:8000/posts");
          setPosts(resp.data);
          console.log(resp.data);
      } catch (err) {
          console.log(err);
      }
  }
    
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
    <Weblink href="/new">
        <Fab title="Add new post" className={styles.addbutton} color="primary" aria-label="add">
            <AddIcon />
        </Fab>
    </Weblink>
   <Container maxWidth="sm">
   {(posts)
   ?<>{posts.map((apost, index) => {
       let postdate = new Date(apost.PostDate);
       let updatedate = new Date(apost.PostUpdateDate);
        return(
        <Paper className={styles.card}>
            <div className={styles.contentheader}>
                <div style={{borderBottom: "1px solid white"}}><Typography variant="h4">{apost.PostName}</Typography></div>
                <div style={{margin: "10px", color:"rgb(255, 175, 90)"}}>    
                    <div><Typography>Posted: {postdate.getDate() + "-" + (postdate.getMonth()+1) + "-" + postdate.getFullYear() + " " + postdate.getHours() + ":" + postdate.getMinutes()}</Typography></div>
                    <div><Typography>Updated: {updatedate.getDate() + "-" + (updatedate.getMonth()+1) + "-" + updatedate.getFullYear() + " " + updatedate.getHours() + ":" + updatedate.getMinutes()}</Typography></div>
                </div>
            </div>
            <div className={styles.content}>
                <div dangerouslySetInnerHTML={{__html:apost.PostContent}}></div>
            </div>
        </Paper>
        );
    })}</>
   :<>Not found</>
   }
   </Container>
   <div className={styles.background}></div>
   </>
  );
}

export default App;
