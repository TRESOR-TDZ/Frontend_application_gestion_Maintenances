import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Footer from './Footer';


function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavBar  user={user} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
          <div className="py-6">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet/> 
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;