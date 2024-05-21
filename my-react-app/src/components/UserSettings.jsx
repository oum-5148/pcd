import React, { useEffect, useState } from 'react';
import '../css/usersettings.css';
import Phish from '../assets/phishing.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserSettings() {
    const [employee, setEmployee] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3002/employees/${id}`)
            .then(result => {
                setEmployee(result.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="container-fluid mt-5">
            <div className="row h-50 justify-content-center">
                <div className="col-lg-5 pb-5">
                    <div className="author-card pb-3">
                        <div className="author-card-cover" style={{ backgroundImage: "url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg)" }}>
                        </div>
                        <div className="author-card-profile">
                            <div className="author-card-avatar">
                                <img src="https://www.actuia.com/wp-content/uploads/2023/02/Rasha-Friji.jpeg" alt="Daniel Adams" />
                            </div>
                            <div className="author-card-details">
                                <h5 className="author-card-name text-lg">{employee.firstName || 'Racha'} {employee.lastName || 'Friji'}</h5>
                                <span className="author-card-position">Joined February 06, 2017</span>
                            </div>
                        </div>
                        <div className='did-you-know'>
                            <h1>Did you know that ?</h1>
                            <p>Some phishing emails include malicious attachments that, when opened, can install malware on the recipient's device. Users should avoid opening attachments from unknown or suspicious sources.</p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={Phish} alt="Logo" style={{ width: '30%', animation: 'swing 2s infinite' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 pb-5">
                    <form>
                        <div className="form-group">
                            <label htmlFor="account-fn" className="font-size-lg">First Name</label>
                            <input className="form-control form-control-lg" type="text" id="account-fn" value={employee.firstName || 'Racha'} disabled  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="account-ln" className="font-size-lg">Last Name</label>
                            <input className="form-control form-control-lg" type="text" id="account-ln" value={employee.lastName || 'Friji'} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="account-email" className="font-size-lg">E-mail Address</label>
                            <input className="form-control form-control-lg" type="email" id="account-email" value={employee.email || 'racha.friji@talan.com'} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="account-phone" className="font-size-lg">Phone Number</label>
                            <input className="form-control form-control-lg" type="text" id="account-phone" value={employee.phoneNumber || '6851060030'} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="account-pass" className="font-size-lg">New Password</label>
                            <input className="form-control form-control-lg" type="password" id="account-pass" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="account-confirm-pass" className="font-size-lg">Confirm Password</label>
                            <input className="form-control form-control-lg" type="password" id="account-confirm-pass" />
                        </div>
                        <div>
                            <button className="btn btn-style-1 btn-primary" type="button" data-toast="" data-toast-position="topRight" data-toast-type="success" data-toast-icon="fe-icon-check-circle" data-toast-title="Success!" data-toast-message="Your profile updated successfully.">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserSettings;
