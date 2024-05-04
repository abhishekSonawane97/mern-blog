import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
<<<<<<< HEAD
import DashboardComp from '../components/DashboardComp';
=======
>>>>>>> 86ee6d1f0413c1787e51ff5ba39e74d0daebd5cd

const Dashboard = () => {

  const location = useLocation();
  const [ tab, setTab ] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl)
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search])

  return (
    <div  className='min-h-screen flex flex-col md:flex-row' >
      <div className="md:w-56">
        {/* sidebar  */}
        <DashSidebar />
      </div>
      {/* profile ...  */}
      {
        tab ==='profile' && <DashProfile />
      }
      {/* posts  */}
      {
        tab ==='posts' && <DashPosts />
      }
      {/* users   */}
      {
        tab === 'users' && <DashUsers />
      }
      {
        tab === 'comments' && <DashComments />
      }
<<<<<<< HEAD
      {
        tab === 'dash' && <DashboardComp />
      }
=======
>>>>>>> 86ee6d1f0413c1787e51ff5ba39e74d0daebd5cd
    </div>
  )
}

export default Dashboard;
