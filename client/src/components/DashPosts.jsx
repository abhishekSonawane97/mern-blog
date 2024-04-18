import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const DashPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [ showModal, setShowModal ] = useState(false);
  const [ postIdToDelete, setPostIdToDelete ] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts(prev=>[...prev, ...data.posts]);
      }
      if (data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteUser = async()=>{
    setShowModal(false);
    try{
        const res = await fetch(`/api/post/deletePost/${postIdToDelete}/${currentUser._id}`,{
            method : 'DELETE',
        });
        const data = await res.json();

        if(!res.ok){
            console.log(data.message);
        }
        if(res.ok){
            setUserPosts(prev => prev.filter(post => post._id !== postIdToDelete ) )
        }
    }
    catch(err){
        console.log(err);
    }
  };


  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {currentUser.isAdmin && userPosts?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y" key={post.title}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell key={post.title}>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id)
                    }}>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <>
              <button
                onClick={handleShowMore}
                className="w-full text-teal-500 self-center text-sm py-7"
              >
                Show More
              </button>
            </>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size={"md"}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button onClick={handleDeleteUser} color={"failure"}>
                  Yes, I'm sure
                </Button>
                <Button onClick={() => setShowModal(false)} color={"gray"}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default DashPosts;
