import {createBrowserRouter,createRoutesFromElements,
   RouterProvider,Route} from 'react-router-dom';

import './App.css';
import AppSharedLayout from './pagelayout/AppSharedLayout';
import Landing,{loader as landingLoader} from './pages/Landing';
import NotFound404 from './pages/NotFound404';
import Home from './pages/Home';

const router= createBrowserRouter( createRoutesFromElements(
  <>
  <Route path="/" element={<AppSharedLayout/>} errorElement={<h2>There was an error!</h2>} >
    <Route index element={<Home />} />
    <Route path='landing' element={<Landing/>} loader={landingLoader} />
  </Route>
  <Route path='*' element={<NotFound404 />}   />
 </>
));

function App() {  
  return (
 <RouterProvider router={router}/>
  )
}

export default App
