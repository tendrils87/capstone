import React, { useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { port } from "./App";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const checkLength = (inputString) => {
    if(inputString.length > 100){
        return inputString.slice(0,99)+'...';
    }else{
        return inputString;
    }
}

const Post = (props) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.post.title);
    const [content, setContent] = useState(props.post.content);
    const [isEditable, setIsEditable] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const postChange = async () => {
        let data = {title:title,
            content: content,
            post_id: props.post.post_id
            }
        console.log(data);
        await fetch(`http://localhost:${port}/posts/editpost`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        setEditing(false);
    }

    const deletePost = async () => {
        let data = {
            post_id: props.post.post_id
            }
        console.log(data);
        await fetch(`http://localhost:${port}/deletepost`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        props.fetchData();
    }

    useEffect(()=>{
        if(props.userid === props.post.user_id){
            setIsEditable(true);
        }
    },[props.userid,props.post.user_id])
    return(
        <div>
            <div onClick={()=>handleOpen()} style={{cursor:'pointer'}}>
                <div>
                    <p>{title}</p>
                </div>
                <div>
                    <p>{checkLength(content)}</p> 
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div>
                <div>
                    {editing ? 
                    <input type="text"
                            value={title}
                            onChange= {(e)=>setTitle(e.target.value)}></input>
                    :
                    <p>{title}</p>
                    }   
                </div>
                <div>
                    {editing ? 
                    <input type="text"
                            value={content}
                            onChange= {(e)=>setContent(e.target.value)}></input>
                    :
                    <p>{content}</p>
                    } 
                </div>
                {isEditable ?
                    <div>
                        {editing ?
                        <button onClick={()=> postChange()}>Save</button>
                        :
                        <div>
                        <button onClick={()=> setEditing(true) }>Edit</button>
                        <button onClick={()=> deletePost()}>Delete</button>
                        </div>
                        }
                    </div>
                    :
                    <div/>
                }
            </div>
                </Box>
            </Modal>
        </div>
    )
}
export default Post;