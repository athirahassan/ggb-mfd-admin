import { useState } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';

// views component
import { ExcelUploader } from './views/ExcelUploader';
import { FileUploader } from './views/FileUploader';
import { Preview } from './views/ExcelPreview';
import Logout from './views/Logout';


import './App.css';

function Dashboard() {
  
    var [excel, setExcel] = useState([]);
    const [files, setFiles] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };

    const signout = () => {
      console.log("signout button clicked");
      // refresh the page
      sessionStorage.setItem('email',null);
      window.location.reload();
      
    };
    
    return (
      <div className="App">
        {console.log("[Dashboard] sessionStorage: "+sessionStorage.getItem("email"))}
        <BrowserRouter>
        <h1>BIM Sign Bank Administrative Page </h1>
        <div className="#"> 
          <Link to="/Excel">
              <button type="button">
                Upload Excel
              </button>
          </Link>
          <Link to="/ImageUploader">
              <button type="button">
                Upload Image
              </button>
          </Link>
          <Link to="/Logout" onClick={() => signout()}>
            <button type="button">
              Sign Out
              </button>
          </Link>
          
          <br></br>
        </div>
        
        <Routes>
          <Route path="/preview" element = {<Preview files={files}/>} />
          <Route path="/Excel" element   = {<ExcelUploader onSuccess={onSuccess}/>} />
          <Route path="/ImageUploader" element = {<FileUploader onSuccess={excel} />} />
          <Route exact path="/Logout" element  = {<Logout/>} />
        </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </div>
    );
}

export default Dashboard;
