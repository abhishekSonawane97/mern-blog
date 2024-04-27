import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comments from './Comments';


const CommentSection = ({postId}) => {


    const { currentUser } = useSelector(state => state.user);
    const [ comment, setComment ] = useState('');
    const [ commentError, setCommentError ] = useState(null);
    const [ comments, setComments ] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
      e.preventDefault();
      if(comment.length > 200){
        return;
      }
      try{
          // console.log('handle submit');
          setCommentError(null);
          const res = await fetch(`/api/comment/create`, {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({ content : comment, postId, userId : currentUser._id})
          });

          const data = await res.json();
          if(!res.ok){
            setCommentError(data.message)
          }
          if(res.ok){
            setComment("");
            // console.log(data);
            setCommentError(null);
            setComments([data, ...comments]);
          }
        }
        catch(err){
          setCommentError(err.message);
        }
    };


    const getComments = async()=>{
      try{

        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const  data = await res.json();
        if(!res.ok){
          console.log(err.message);
        }
        if(res.ok){
          setComments(data);
          console.log(data);
        }

      }
      catch(err){
        console.log(err.message);
      }
    }

    useEffect(()=>{
      getComments();
      
    },[postId]);

    const handleLike = async(commentId)=>{

      try{
        if(!currentUser){
          navigate('/sign-in');
          return;
        }
        const res = await fetch(`/api/comment/likeComment/${commentId}`,{
          method : 'PUT',
        });
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
          return;
        }
        if(res.ok){
          setComments( comments.map(comment => (
            comment._id === commentId ? {
              ...comment, likes: data.likes,
              numberOfLikes : data.likes.length,
            } : comment
          )))
        }

      }
      catch(err){
        console.log(err.message);
      }
    };


  return (
    <div className='mx-2xl mx-auto w-full p-3'>
      {
        currentUser ? (
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                <p>Signed in as : </p>
                <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline' >@{currentUser.username}</Link>
            </div>
        ) : (
            <div className="text-sm text-teal-500 my-5 flex gap-1">
                You must be signed in to comment.
                <Link className='text-blue-500 hover:underline' to={'/sign-in'} >Sign In</Link>
            </div>
        )
      }
      {
        currentUser && (
            <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3' >
                <Textarea placeholder='Add a comment...' rows={'3'} maxLength={'200'} value={comment} onChange={(e)=> setComment(e.target.value)} />
                    <div className="flex justify-between items-center mt-5">
                        <p className='text-gray-500 text-xs' >{200 - comment.length} characters remaining</p>
                        <Button outline gradientDuoTone={'purpleToBlue'} type='submit'  >Submit</Button>
                    </div>
                    {
                      commentError && <Alert color={'failure'} className='mt-5' >{commentError}</Alert>
                    }
            </form>
        )
      }
      {
              comments.length === 0 ? (
                <p className="text-sm my-5">No comments yet!</p>
              ): (
                <>
                <div className="text-sm my-5 flex items-center gap-1">
                  <p>Comments</p>
                  <div className="border border-gray-400 py-1 px-2 rounded-sm">
                    <p>{comments.length}</p>
                  </div>
                </div>
                {
                  comments.map(comment => (
                    <Comments key={comment._id} comment={comment} onLike={ handleLike } />
                  ))
                }
                </>
              )
            }
    </div>
  )
}

export default CommentSection;
