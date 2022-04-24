import { useState, useRef, useEffect } from 'react';
import { Link as Weblink } from "@mui/material"
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Editor } from '@tinymce/tinymce-react';

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
  const date = Date();
  const [newPost, setNewPost] = useState({
    "PostName": "",
    "PostDate": date,
    "PostUpdateDate": date,
    "PostContent": "",
    "PosterId": null
  });

  const postPost = async () => {
      try {
          const resp = await axios.post("http://127.0.0.1:8000/posts", newPost);
          console.log(resp.data);
      } catch (err) {
          console.log(err);
      }
  }

  const editorRef = useRef(null);
   const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
     }
   };

  return (
    <>
    <Container>
        <div style={{marginTop:"10%"}}>
            <TextField sx={{ input: {color: "white"}}} style={{marginBottom: "5px"}} fullWidth label="Title"></TextField>
            <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
       </div>
    </Container>
   <div className={styles.background}></div>
   </>
  );
}

export default App;
