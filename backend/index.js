const jwt = require('jsonwebtoken');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const companyModel = require('./models/companies');
const employeeModel = require('./models/employees');
const emailModel = require('./models/Emails');
const urlModel = require('./models/URLs');
const bcrypt = require('bcrypt');
const saltRounds = 15; // Number of salt rounds for hashing


const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin: 'http://localhost:5173', // Specify the origin of the client making requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies to be sent with requests
}));

mongoose.connect("mongodb://0.0.0.0:27017/database", { useNewUrlParser: true, useUnifiedTopology: true });

// sign in route
app.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    try {
        // Check if the email exists in the companyModel
        const companyUser = await companyModel.findOne({ Email });
        if (companyUser) {
            bcrypt.compare(Password, companyUser.Password, (err, response) => {
                if (response) {
                    // Determine the role dynamically based on user properties
                    const token = jwt.sign({ role: "admin" }, "2cf24dba5fb0a30e26", { expiresIn: '1d' });
                    res.cookie('token', token, {
                        httpOnly: true,
                        sameSite: 'strict',
                        maxAge: 86400000 // 1 day in milliseconds
                    });

                    res.json({ message: "Login successful! Redirecting to home page.", role: "admin" });
                } else {
                    res.json("The password is incorrect!");
                }
            });
        } else {
            // Check if the email exists in the employeeModel
            const employeeUser = await employeeModel.findOne({ email: Email });
            if (employeeUser) {
                // Hash the provided password before comparing
                bcrypt.compare(Password, employeeUser.password, (err, response) => {
                    if (response) {
                        // Role is 'user' for employeeModel
                        const token = jwt.sign({ role: "user" }, "2cf2s6dba5fb0a30e26", { expiresIn: '1d' });
                        res.cookie('token', token, {
                            httpOnly: true,
                            sameSite: 'strict',
                            maxAge: 86400000 // 1 day in milliseconds
                        });
                        res.json({ message: "Login successful! Redirecting to home page.", role: "user" });
                    } else {
                        res.json("The password is incorrect!");
                    }
                });
            } else {
                res.json("No record found for the provided email.");
            }
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json("Internal Server Error");
    }
});


// Register Route
app.post('/register', (req, res) => {
    const { AdminName, CompanyName, Email, Password } = req.body;
    bcrypt.hash(Password, 15)
        .then(hash => {
            companyModel.create({ AdminName, CompanyName, Email, Password: hash, role: "admin" })
                .then(companies => res.json(companies))
                .catch(err => res.json(err));
        })
        .catch(err => {
            console.error("Error:", err);
            res.status(500).json("Internal Server Error");
        });
});
// Add an endpoint to fetch admin data
app.get('/admin_settings', async (req, res) => {
    try {
        // Fetch admin data from the database
        const admin = await companyModel.findOne({ role: "admin" }); // Assuming role "admin" is used for admin users

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Send the admin data in the response
        res.status(200).json(admin);
    } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Add an endpoint to update admin data
app.put('/admin_settings', async (req, res) => {
    try {
        // Extract admin ID from the JWT token in the request
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, '2cf24dba5fb0a30e26');
        const adminId = decodedToken.adminId;

        // Update admin data in the database based on the admin ID
        await companyModel.findByIdAndUpdate(adminId, req.body);

        // Send success response
        res.status(200).json({ message: "Admin data updated successfully" });
    } catch (error) {
        console.error("Error updating admin data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Import Route

app.post('/import', async (req, res) => {
    try {
        const employees = req.body.employees;

        if (!employees || employees.length === 0) {
            return res.status(400).json({ success: false, message: "No employees data provided" });
        }

        console.log("Received employees data:", employees);

        const promises = employees.map(async (item) => {
            try {
                const existingEmployee = await employeeModel.findOne({ CIN: item.CIN });
                if (existingEmployee) {
                    // Update existing employee
                    const hashedPassword = await bcrypt.hash(item.password, saltRounds);
                    await employeeModel.findByIdAndUpdate(existingEmployee._id, {
                        $set: {
                            CIN: item.CIN,
                            email: item.email,
                            role: item.role,
                            phonenumber: item.phonenumber,
                            password: hashedPassword, // Use hashed password
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt,
                            __v: item.__v,
                            firstName: item.firstName,
                            lastName: item.lastName
                        }
                    });
                    console.log("Updated employee:", item);
                } else {
                    // Create new employee
                    const hashedPassword = await bcrypt.hash(item.password, saltRounds);
                    await employeeModel.create({
                        role: "user", // Set role to "user" for imported users
                        ...item,
                        password: hashedPassword // Use hashed password
                    });
                    console.log("Created new employee:", item);
                }
            } catch (error) {
                console.error("Error processing employee:", error);
            }
        });

        await Promise.all(promises);

        res.status(200).json({ success: true, message: "Employees imported/updated successfully" });
    } catch (err) {
        console.error("Error importing employees:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Create employee
app.post('/employees', async (req, res) => {
    try {
        const { CIN, firstName, lastName, email, role, phonenumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const employee = await employeeModel.create({
            CIN,
            firstName,
            lastName,
            email,
            role,
            phonenumber,
            password: hashedPassword
        });
        res.status(201).json(employee);
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Read all employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await employeeModel.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Update employee
app.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { CIN, firstName, lastName, email, role, phonenumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await employeeModel.findByIdAndUpdate(id, {
            CIN,
            firstName,
            lastName,
            email,
            role,
            phonenumber,
            password: hashedPassword
        });
        res.status(200).json({ success: true, message: "Employee updated successfully" });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Delete employee
app.delete('/employees/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await employeeModel.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
// Employees dashboarrd info
app.get('/totalEmployees', async (req, res) => {
    try {
        const employees = await employeeModel.find();

        // Count the number of employees per role
        const roleCounts = {};
        employees.forEach(employee => {
            const role = employee.role;
            roleCounts[role] = (roleCounts[role] || 0) + 1;
        });

        // Prepare data to send to frontend
        const responseData = {
            totalEmployees: employees.length,
            employeesPerRole: roleCounts
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error fetching employees count:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


//urls
app.get('/totalURLs', async (req, res) => {
    try {
        const urls = await urlModel.find().select('creationDate'); // Selecting only the 'createdAt' field

        // Extracting only the day from creation dates and putting them in a list
        const creationDays = urls.map(url => {
            const day = new Date(url.creationDate).getDate(); // Extracting the day from the creation date
            return day;
        });

        const responseData = {
            totalURLs: urls.length,
            creationDays: creationDays
        };
        console.log("total URLs :", urls.length)
        console.log("creation days :", creationDays)
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error fetching total URLs count:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


// Define a route to handle the POST request to add URL to the database
app.post('/add-to-database', async (req, res) => {
    try {
        // Extract the URL from the request body
        const { url } = req.body;

        // Create a new document using the URL model
        const newURL = new urlModel({
            link: url,
            creationDate: Date.now()
                });

        // Save the new document to the database
        await newURL.save();

        // Send a success response
        res.status(200).json({ success: true, message: 'URL added to the database' });
    } catch (error) {
        // Send an error response if an error occurs
        console.error('Error adding URL to database:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


// Emails
app.get('/totalEmails', async (req, res) => {
    try {
        const emails = await emailModel.find().select('creationDate'); // Selecting only the 'createdAt' field

        // Extracting only the day from creation dates and putting them in a list
        const creationDays = emails.map(email => {
            const day = new Date(email.creationDate).getDate(); // Extracting the day from the creation date
            return day;
        });

        const responseData = {
            totalEmails: emails.length,
            creationDays: creationDays
        };
        
        // Log the result to the console
        console.log("Total Emails:", emails.length);
        console.log("Creation Days:", creationDays);

        // Send success response
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error fetching total Emails count:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post('/add-database', async (req, res) => {
    try {
        // Extract the URL from the request body
        const { email } = req.body;

        // Create a new document using the URL model
        const newEmail = new emailModel({
            body: email,
            creationDate: Date.now()
                });

        // Save the new document to the database
        await newEmail.save();

        // Send a success response
        res.status(200).json({ success: true, message: 'Email added to the database' });
    } catch (error) {
        // Send an error response if an error occurs
        console.error('Error adding Email to database:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
