import React, { useState, useEffect } from 'react';
import '../css/adminsettings.css';
import usePasswordMatch from '../hooks/pwd';
import axios from 'axios'; // Import Axios for making API requests

const MyAccountAdmin = () => {
  const [formData, setFormData] = useState({
    adminName: 'Admin',
    company: 'Talan',
    number: '+216 70 015 010',
    email: 'IT@talan.com',
    state: 'Tunisia',
    address: '10 énergie solaire Street, Dead End No.1 Charguia 1, Tunis 2035, Tunisia',
  });

  useEffect(() => {
    fetchCompany(); // Call fetchCompany function when the component mounts
  }, []);

  const fetchCompany = () => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    console.log("Token from cookie:", tokenCookie); // Log token value to debug
    if (!tokenCookie) {
      console.error('JWT token not found.');
      return;
    }
    
    // Extract token value
    const tokenValue = tokenCookie.split('=')[1];
  
    // Decode JWT token to get admin ID
    const decodedToken = decodeToken(tokenValue);
    if (!decodedToken || !decodedToken.adminId) {
      console.error('Error decoding JWT token or adminId not found.');
      return;
    }
    
    const adminId = decodedToken.adminId;
  
    // Fetch admin data from backend based on admin ID
    axios.get(`http://localhost:3002/companies/${adminId}`) // Update endpoint URL if necessary
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching admin data:', error);
      });
  };
  
  const decodeToken = (token) => {
    // Decode JWT token
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };
  
  const {
    password,
    confirmPassword,
    isMatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = usePasswordMatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMatch) {
      axios.put('/admin_profile', formData, {
        headers: {
          Authorization: `Bearer ${tokenValue}`
        }
      })
              .then(response => {
          console.log('Admin data updated successfully');
        })
        .catch(error => {
          console.error('Error updating admin data:', error);
        });
    } else {
      console.log("Passwords don't match!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8 mx-auto">
            <div className="my-4">
              <form onSubmit={handleSubmit}>
                <div className="row mt-5 align-items-center">
                  <div className="col-md-3 text-center mb-5">
                    <div className="avatar avatar-xl">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="..." className="avatar-img rounded-circle" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="row align-items-center">
                      <div className="col-md-7">
                        <h4 className="mb-1" style={{ fontSize: '1.5rem' }}>Admin</h4>
                        <p className="small mb-3" style={{ fontSize: '1.1rem', backgroundColor: 'black', display: 'inline-block', minWidth: 'fit-content', minHeight: 'fit-content', borderRadius:'20px'}}>
                          <span className="badge badge-dark">{formData.state}</span>
                        </p>
                      </div>
                    </div>
                      <div className="col-md-7">
                      <div className="col">
                        <p className="small mb-0 text-muted" style={{ fontSize: '1.1rem' }}>{formData.company}</p>
                        <p className="small mb-0 text-muted" style={{ fontSize: '1.1rem' }}>{formData.address}</p>
                        <p className="small mb-0 text-muted" style={{ fontSize: '1.1rem' }}>{formData.number}</p>
                      </div>  
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="form-row">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="adminName" style={{ fontSize: '1.1rem' }}>Admin Name</label>
                      <input
                        type="text"
                        id="adminName"
                        name="adminName"
                        className="form-control form-control-lg"
                        value={formData.adminName}
                        onChange={handleChange}
                        style={{ fontSize: '1.2rem' }}
                        disabled
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="company" style={{ fontSize: '1.2rem' }}>Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="form-control form-control-lg"
                        value={formData.company}
                        onChange={handleChange}
                        style={{ fontSize: '1.2rem' }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="number" style={{ fontSize: '1.2rem' }}>Number</label>
                      <input
                        type="text"
                        id="number"
                        name="number"
                        className="form-control form-control-lg"
                        value={formData.number}
                        onChange={handleChange}
                        style={{ fontSize: '1.2rem' }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="state" style={{ fontSize: '1.2rem' }}>State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control form-control-lg"
                        value={formData.state}
                        onChange={handleChange}
                        style={{ fontSize: '1.2rem' }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="email" style={{ fontSize: '1.1rem' }}>Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ fontSize: '1.2rem' }}
                        disabled
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="address" style={{ fontSize: '1.1rem' }}>Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control form-control-lg"
                        value={formData.address}
                        onChange={handleChange}
                        style={{ fontSize: '1.2rem' }}
                      />
                    </div>
                  </div>
                
                </div>
                <hr className="my-4" />
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputPassword5" style={{ fontSize: '1.1rem' }}>New Password</label>
                      <input
                        type="password"
                        id="inputPassword5"
                        className="form-control form-control-lg"
                        style={{ fontSize: '1.6rem' }}
                        value={password}
                        onChange={handlePasswordChange} // Call handlePasswordChange on input change
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputPassword6" style={{ fontSize: '1.1rem' }}>Confirm Password</label>
                      <input
                        type="password"
                        id="inputPassword6"
                        className="form-control form-control-lg"
                        style={{ fontSize: '1.6rem' }}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange} // Call handleConfirmPasswordChange on input change
                      />
                    </div>
                    {!isMatch && <p style={{ color: 'red' }}>Passwords do not match</p>} {/* Show error message if passwords don't match */}
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2 text-muted" style={{ fontSize: '1.1rem' }}>Password requirements</p>
                    <p className="small text-muted mb-2" style={{ fontSize: '1.1rem' }}>To create a new password, you have to meet all of the following requirements:</p>
                    <ul className="small text-muted pl-4 mb-0" style={{ fontSize: '1.1rem'}}>
                      <li>- Minimum 8 character</li>
                      <li>- At least one special character</li>
                      <li>- At least one number</li>
                      <li>- Can’t be the same as a previous password</li>
                    </ul>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ fontSize: '1.1rem' }} disabled={!isMatch}>Save Change</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccountAdmin;
