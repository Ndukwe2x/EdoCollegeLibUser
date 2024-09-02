import React from 'react'
import './App.css'
import Home from './pages/Home';
import {  createBrowserRouter, RouterProvider,
      createRoutesFromElements, Route} from 'react-router-dom';
/* import DashboardSharedLayout,{loader as dashboardLayoutLoader} from './pagelayout/DashboardSharedLayout'; */

/* import ErrorSharedLayout from './pagelayout/ErrorSharedLayout'; */
import NotFound404 from './pages/NotFound404';
/* import DashboardMain,{loader as dashboardLoader} from './pages/DashboardMain'; */
import { AuthProvider } from './auth/AuthContext';



const router=createBrowserRouter(createRoutesFromElements(
            <>    
              <Route path="/" element={<Home />} /> 
              {/* <Route path="/dashboard" element={<DashboardSharedLayout/>} loader={dashboardLayoutLoader} > 
                  <Route index element={<DashboardMain/>} loader={dashboardLoader}/>                 
              </Route>  */}     
              <Route path='*' element={<NotFound404/>} /> 
            </>        
));

function App() {
  return ( 
           <AuthProvider>  
            <RouterProvider router={router} />  
          </AuthProvider>
      ) 
   
}

export default App
