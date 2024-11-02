import {createBrowserRouter,createRoutesFromElements,
   RouterProvider,Route} from 'react-router-dom';

import './App.css';
import AppSharedLayout from './pagelayout/AppSharedLayout';
import Landing,{loader as landingLoader} from './pages/Landing';
import NotFound404 from './pages/NotFound404';
import Home from './pages/Home';
import BookRead, {loader as bookreadLodear} from './pages/BookRead';
import VideoWatch, {loader as videowatchLoader} from './pages/VideoWatch';

const router= createBrowserRouter( createRoutesFromElements(
  <>
  <Route path="/" element={<AppSharedLayout />} errorElement={<h2>There was an error!</h2>} >
    <Route index element={<Home />} />
    <Route path='landing' element={<Landing />} loader={landingLoader}
     errorElement={<h2>There was an error!</h2>} />
    <Route path='bookread' element={<BookRead />} loader={bookreadLodear}   
    errorElement={<h2>There was an error!</h2>}/>
     <Route path='videowatch' element={<VideoWatch />} loader={videowatchLoader} 
      errorElement={<h2>There was an error!</h2>}/>
  </Route>
  <Route path='*' element={<NotFound404 />} errorElement={<h2>There was an error!</h2>}   />
 </>
));

function App() {  
  return (
 <RouterProvider router={router}/>
  )
}

export default App
