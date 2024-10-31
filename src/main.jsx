import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { AuthUserProvider } from './auth/AuthContext.jsx';
import {ShowAvatarProvider} from './showAvatar/ShowAvatarContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthUserProvider>
     <ShowAvatarProvider> 
         <App /> 
     </ShowAvatarProvider>
    </AuthUserProvider>    
  </StrictMode>,
)
