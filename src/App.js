import { useState } from 'react';
import { ExcelUploader } from './views/ExcelUploader';
import { FileUploader } from './views/FileUploader';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';

// views component
import { ExcelUploader } from './views/ExcelUploader';
import { Preview } from './views/ExcelPreview';

import Login from './views/Login.js';
import './App.css';
import ProtectedRoute from './ProtectedRoute';

function App() {
    var [excel, setExcel] = useState([]);
    const [files, setFiles] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };
    
  return (
    <div className="App">
      <BrowserRouter>
      <Link to="/">Login</Link><br></br>
      <Link to="/Excel">Excel</Link>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/Excel" element={<ExcelUploader onSuccess={onSuccess}/>} />
          <Route path="/preview" element={<Preview files={files}/>}/>
        </Route>       
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
