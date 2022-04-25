import {useState} from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import {ProgressBar} from 'react-bootstrap';
import { IsEqual } from 'react-lodash'



import './style.css';
var t;

export const ExcelUploader = ({onSuccess}) => {
    const [files, setFiles] = useState([]);
    var [excel, setExcel] = useState([]);
    
    var bim = "BIM.xlsx";
    
    const onInputChange = (e) => {
        setFiles(e.target.files)

        const fileexcel=e.target.files[0];
        excel=fileexcel;

        console.log("file excel from luqman")
        console.log(excel);


        console.log(typeof e.target.files[0].name)
        
        if((e.target.files[0].name == "BIM.xlsx")||(e.target.files[0].name == "BIM.xls")){
            t = "BIM.xlsx"
        }
    };

    const onSubmit = (e) => {
        
        e.preventDefault();

        if(t === bim){

        const data = new FormData();

        for(let i = 0; i < files.length; i++) {
            
            data.append('file', files[i]);
            
        }

        axios.post('//localhost:8000/upload', data,{headers:
        {
            'Content-Disposition': "attachment;",
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },responseType: 'arraybuffer',
            onUploadProgress: progressEvent => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(`upload process: ${percentCompleted}%`);
              
            }
            
          })
            .then((response) => {
                toast.success('Upload Success');
                window.alert("Upload BIM.xlsx successfully")
                
                onSuccess(response.data)
            })
            .catch((e) => {
                toast.error('Upload Error')
                
                window.alert("Cannot connect to server.\nPlease make sure you are connected to the Internet and try again");
                
            })
        }
        else{
            window.alert("Unsuccessful upload BIM.xlsx\n-Please Select the Correct File (BIM.xlsx only)")
            e.preventDefault();
        }
    };

    
    
    return (
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="form-group files">
                <h1>Upload Your BIM.xlsx File </h1>
                <input directory="BIM.xlsx" type="file"
                id="BIM"
                name="BIM"
                
                      
                       accept='.xlsx'
                       onChange={onInputChange}
                       className="form-control"
                       />
                       <ul id="listing"></ul>
            </div>
            
            
            <h3>Only .xlsx file will be accepted</h3>
            <button>Submit</button>
            
        </form>
    )
};
