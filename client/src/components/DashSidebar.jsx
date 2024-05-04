import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
<<<<<<< HEAD
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
=======
import { HiAnnotation, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
>>>>>>> 86ee6d1f0413c1787e51ff5ba39e74d0daebd5cd
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';



const DashSidebar = () => {

    const location = useLocation();
    const [tab, setTab ] = useState("");
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user)

    useEffect(()=>{

        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    },[]);

    const handleSignout = async()=>{
        try{
          const res = await fetch(`/api/user/signout`,{
            method : 'POST',
          });
          const data = await res.json();
          if(!res.ok){
            console.log(data.message);
          }
          else{
            dispatch(signoutSuccess());
          }
        }
        catch(err){
          console.log(err.messge)
        }
      }


  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              {
                currentUser && currentUser.isAdmin && (
                  <Link to={'/dashboard?tab=dash'}>
                  <Sidebar.Item active={tab=='dash' || !tab } as="div" icon={HiChartPie} >
                  Dashboard
                  </Sidebar.Item>
                  </Link>
                )
              }
                <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={ currentUser.isAdmin ? "Admin" : "User" } labelColor="dark" as='div'>
                    profile
                </Sidebar.Item>
                </Link>
                {
                  currentUser.isAdmin && <Link to={'/dashboard?tab=posts'} >
                  <Sidebar.Item active={tab==='posts'} icon={ HiDocumentText } as='div'>
                    Posts
                  </Sidebar.Item>
                </Link>
                }
                {
                  currentUser.isAdmin && (
                    <>
                      <Link to={'/dashboard?tab=users'} >
                        <Sidebar.Item active={tab==='users'} icon={ HiOutlineUserGroup } as='div'>
                          Users
                        </Sidebar.Item>
                      </Link>
                      <Link to={'/dashboard?tab=comments'} >
                        <Sidebar.Item active={tab==='comments'} icon={ HiAnnotation } as='div'>
                          Comments
                        </Sidebar.Item>
                      </Link>
                    </>
                  )
                }
                
                <Link to={'/sign-in'} onClick={handleSignout}>
                <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" as='div'>
                    Sign Out
                </Sidebar.Item>
                </Link>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
