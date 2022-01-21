import React from 'react';
import Post from './post';

const Body = (props) => {


    return(
        <div>
            {props.blogPosts.map(post=>
                <Post key={post.post_id} post={post} userid={props.userid} fetchData={()=>props.fetchData()}/>
            )}
        </div>
    )
}
export default Body;