import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { AuthContexProvider,HerdsContextProvider} from "./asset/service/index.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
     <AuthContexProvider>
      <HerdsContextProvider>
      <App />
      </HerdsContextProvider>
     </AuthContexProvider>
  </React.StrictMode>

);


