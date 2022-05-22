import { useState } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';

// views component
import { ExcelUploader } from './views/ExcelUploader';
import { FileUploader } from './views/FileUploader';
import { Preview } from './views/ExcelPreview';
import { ImageUpload } from './views/ImageUpload';
import Logout from './views/Logout';
// import Login from './views/Login';


import './App.css';
import Button from "bootstrap/dist/css/bootstrap.min.css";

function App() {
  
    var [excel, setExcel] = useState([]);
    const [files, setFiles] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };

    const signout = () => {
      console.log("signout button clicked");
      // refresh the page
      //google.accounts.id.disableAutoSelect();
      sessionStorage.setItem('email',null);
      window.location.reload();
      
    };
    
    return (
      <div className="App">
  {console.log("[App] "+sessionStorage.getItem("email"))}
        <BrowserRouter>


          <h1>BIM Sign Bank Administrative Page </h1>
          <Link to="/Excel">
            <div class="excelButton">
              {/* <button type="buttonExcel"> */}
                Upload Excel
              {/* </button> */}
            </div>
          </Link> <br></br>

          <Link to="/ImageUploader">
            <div class="imageButton">
              {/* <button type="button"> */}
                Upload Image
              {/* </button> */}
            </div>
          </Link><br></br>

          <Link to="/Logout" onClick={() => signout()}>
            <div class="signoutButton">
              {/* <button type="button"> */}
              Sign Out
              {/* </button> */}
            </div>
          </Link>
          {/* <div id="buttonLogout" onClick={() => signout()}>
            <p>Sign Out</p>
          </div> */}
          
          <br></br>
       
        
        <Routes>
          {/* <Route exact path="/" element    = {<Login/>} /> */}
          <Route path="/preview" element = {<Preview files={files}/>} />
          <Route path="/Excel" element   = {<ExcelUploader onSuccess={onSuccess}/>} />
          {/* <Route path="/ImageUploader" element = {<FileUploader onSuccess={excel} />} /> */}
          <Route path="/ImageUploader" element = {<ImageUpload onSuccess={excel} />} />
          <Route exact path="/Logout" element  = {<Logout/>} />
         
        </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </div>
    );
}

export default App;
