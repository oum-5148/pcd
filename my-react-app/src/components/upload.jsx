import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../css/upload.css'
import axios from "axios";

function Upload() {
  const [step, setStep] = useState(0);
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [excelData, setExcelData] = useState(null);

  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        setExcelFile(null);
        setUploadSuccess(false);
        setExcelData(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
          setStep(1);
        }
      } else {
        setUploadSuccess(false);
        setExcelData(null);
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  }

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      try {
        await axios.post('http://localhost:3002/import', { employees: data });
        setExcelData(data);
        setUploadSuccess(true);
        setStep(2);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }

  return (
    <div className="wrapper1">
      <div className="stepper-wrapper">
        <div className={`stepper-item ${step >= 0 ? 'completed' : ''}`}>
          <div className="step-counter">1</div>
          <div className="step-name">Choose a file</div>
        </div>
        <div className={`stepper-item ${step >= 1 ? 'completed' : ''}`}>
          <div className="step-counter">2</div>
          <div className="step-name">Upload</div>
        </div>
        <div className={`stepper-item ${step === 2 && uploadSuccess ? 'completed' : ''}`}>
          <div className="step-counter">3</div>
          <div className="step-name">Done</div>
        </div>
      </div>
      <h1>Excel file</h1>
      <p className='note'>Keep in mind the maximum size of the file (max 10MB and 10,000 users)</p>
      <h3>Upload & View Excel Sheets</h3><br/>
      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input type="file" className="form-control" required onChange={handleFile} />
        <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
        {uploadSuccess && (
          <div className="alert alert-success" role="alert">
            Upload successful!
          </div>
        )}
        {typeError && (
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>
      {excelData && (
        <div>
          <h4>Excel Data</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                {Object.keys(excelData[0]).map((key, index) => (
                  key !== 'password' && key !== 'CIN' && (
                    <th key={index}>{key}</th>
                  )
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([key, value], colIndex) => (
                    key !== 'password' && key !== 'CIN' && (
                      <td key={colIndex}>{value}</td>
                    )
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Upload;
