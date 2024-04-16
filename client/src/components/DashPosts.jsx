import React, { useState } from 'react'

const DashPosts = () => {

    const [ posts, setPosts ] = useState(null);

    const getPosts = async()=>{
        try{
            // const res = await fetch('/api/post/');
            // const data =  await res.json();
            // if(!res.ok){
            //     console.log(data.message);
            //     return;
            // }
            // if(res.ok){
            //     console.log(data);
            //     setPosts(data);
            //     return;
            // }

        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div>
      DashPosts
    </div>
  )
}

export default DashPosts
