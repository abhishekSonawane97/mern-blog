import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';



const DashSidebar = () => {

    const location = useLocation();
    const [tab, setTab ] = useState("");
    const dispatch = useDispatch();

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
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={"User"} labelColor="dark" as='div'>
                    profile
                </Sidebar.Item>
                </Link>
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
