import { useState } from 'react';
import { ExcelUploader } from './views/ExcelUploader';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Preview } from './views/ExcelPreview';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';

import Home from './views/Login.js';
import './App.css';

function App() {
    const [files, setFiles] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };

    

  return (
    <div className="App">
      <BrowserRouter>
      <Link to="/">Home</Link><br></br>
      <Link to="/Excel">Excel</Link>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/Excel" element={<ExcelUploader onSuccess={onSuccess}/>} />
          
          <Route path="/preview" element={<Preview files={files}/>}/>
          
          
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
