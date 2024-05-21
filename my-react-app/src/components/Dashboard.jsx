import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import '../css/dashboard.css';
import axios from 'axios';

function Dashboard() {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [employeeData, setEmployeeData] = useState([]);
    const [totalEmails, setTotalEmails] = useState(0);
    const [emailCreationDays, setEmailCreationDays] = useState([]);
    const [totalURLs, setTotalURLs] = useState(0);
    const [urlCreationDays, setUrlCreationDays] = useState([]);

    useEffect(() => {
        fetchEmployees();
        fetchEmails();
        fetchURLs();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3002/totalEmployees');
            setTotalEmployees(response.data.totalEmployees);
            setEmployeeData(response.data.employeesPerRole);// Update the URL
        } catch (error) {
            console.error('Error fetching employees count:', error); // Update the error message
        }
    };
    const fetchEmails = async () => {
        try {
            const response = await axios.get('http://localhost:3002/totalEmails');
            setTotalEmails(response.data.totalEmails);
            setEmailCreationDays(response.data.creationDays);
        } catch (error) {
            console.error('Error fetching total emails count:', error);
        }
    };
    

    const fetchURLs = async () => {
        try {
            const response = await axios.get('http://localhost:3002/totalURLs'); 
            setTotalURLs(response.data.totalURLs);
            setUrlCreationDays(response.data.creationDays);
        } catch (error) {
            console.error('Error fetching total URLs count:', error); 
        }
    };


    const dataa = [
        { name: 'Manager', role: employeeData['Manager'] || 0 },
        { name: 'Analyst', role: employeeData['Analyst'] || 0 },
        { name: 'Engineer', role: employeeData['Engineer'] || 0 },
        { name: 'Sales', role: employeeData['Sales'] || 0 },
        { name: 'Marketing', role: employeeData['Marketing'] || 0 },
    ];

// Initialize an object to store the counts
const emailcounts = {};
const urlcounts = {};


// Count the occurrences of each date
emailCreationDays.forEach(day => {
    emailcounts[day] = (emailcounts[day] || 0) + 1;
});

urlCreationDays.forEach(day => {
    urlcounts[day] = (urlcounts[day] || 0) + 1;
});

    const data = [];
for (let day = 1; day <= 30; day++) {
    const phishingEmails = emailcounts[day] || 0; // If the day does not exist in the counts, set to 0
    const suspiciousURLs = urlcounts[day] || 0; // If the day does not exist in the counts, set to 0
    data.push({ day, phishingEmails, suspiciousURLs });
}

    return (
        <main className='main_container'>
            <div className='main_title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className="overview">
                <div className="boxes">
                    <div className="box box1">
                        <FontAwesomeIcon icon={faUser} className="fa-sharp" style={{ fontSize: '40px' }} />
                        <span className="text">Total Employees</span>
                        <span className="number">{totalEmployees}</span>
                    </div>
                    <div className="box box2">
                        <FontAwesomeIcon icon={faEnvelope} className="fa-sharp" style={{ fontSize: '40px' }} />
                        <span className="text">Phishing Emails detected</span>
                        <span className="number">{totalEmails}</span>
                    </div>
                    <div className="box box3">
                        <FontAwesomeIcon icon={faArrowAltCircleUp} className="fa-sharp" style={{ fontSize: '40px' }} />
                        <span className="text">Total Suspect URLs</span>
                        <span className="number">{totalURLs}</span>
                    </div>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={dataa}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 12]} interval={2} tickCount={13} />                      <Tooltip />
                        <Legend />
                        <Bar dataKey="role" barSize={15} fill="#4784c5" />
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" interval={2} label={{ value: 'Day of the month', position: 'insideRight', dy: 10, dx: 1 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="phishingEmails" stroke="#d79d15" activeDot={{ r: 8 }} name="Phishing Emails" />
                        <Line type="monotone" dataKey="suspiciousURLs" stroke="#8814f5" activeDot={{ r: 8 }} name="Suspicious URLs" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Dashboard;
