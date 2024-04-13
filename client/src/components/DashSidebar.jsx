import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';



const DashSidebar = () => {

    const location = useLocation();
    const [tab, setTab ] = useState("");

    useEffect(()=>{

        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    },[]);


  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={"User"} labelColor="dark" as='div'>
                    profile
                </Sidebar.Item>
                </Link>
                <Link to={'/sign-in'}>
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
