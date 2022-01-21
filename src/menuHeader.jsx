import React from "react";
import AddNewPost from "./addNewPost";
import { useState, useCallback, useEffect } from "react";
import Body from "./posts";
const MenuHeader = (props) => {
    const [addNewPost, setAddNewPost] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const fetchData = useCallback(async () => {
        console.log('fetching')
        const posts = await fetch(`http://localhost:3001/posts/${props.postFilter}/${props.userid}`)
        const jsonPosts = await posts.json();
        setBlogPosts(jsonPosts);

    },[props.userid,props.postFilter])
    useEffect(()=>{
        fetchData();        
    },[fetchData,props.postFilter])

    return(
        <div>
            {props.loggedIn ?
            <div>
                <button onClick={()=> props.setPostFilter(1)}>View All Posts</button>
                <button onClick={()=> props.setPostFilter(2)}>View My Posts</button>
                <button onClick={()=>setAddNewPost(true)}>Add New Post</button>
                {addNewPost ? 
                    <AddNewPost setAddNewPost={setAddNewPost} userid={props.userid} fetchData={()=>fetchData()}/>
                :<div/>}
            </div>
            :
            <div/>
            }
            <div>
                <Body {...props} blogPosts={blogPosts} fetchData={()=>fetchData()} />
            </div>
        </div>
    )
}
export default MenuHeader;