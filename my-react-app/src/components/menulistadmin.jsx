import React, { useState } from "react";
import { Menu, Modal } from 'antd';
import { DatabaseOutlined, ImportOutlined, AreaChartOutlined, SettingOutlined } from '@ant-design/icons';
import '../css/menubar.css';
import { Link } from 'react-router-dom';
import { RiLogoutBoxLine } from 'react-icons/ri'; // Import logout icon

const MenuListAdmin = ({ darkTheme }) => {
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const handleLogout = () => {
        setLogoutModalVisible(true);
    };

    const handleConfirmLogout = () => {
        // Displaying "Logging out" pop-up for 1 second
        setLogoutModalVisible(true);
        setTimeout(() => {
            // Implement your logout logic here
            console.log("Logging out...");
            
            // Redirect to the specified page after 1 second
            window.location.href = "/"; // Replace with your desired URL
        }, 100); // Adjust this timing if necessary
    };

    const handleCancelLogout = () => {
        setLogoutModalVisible(false);
    };

    return (
        <div>
            <Menu mode="inline" className="menu-bar" theme={darkTheme ? 'dark' : 'light'}>
                <Menu.Item key="import" icon={<ImportOutlined />}>
                    <Link to="/import">Import users</Link>
                </Menu.Item>
                <Menu.Item key="database" icon={<DatabaseOutlined />}>
                    <Link to="/database">Database</Link>
                </Menu.Item>
                <Menu.Item key="dashboard" icon={<AreaChartOutlined />}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    <Link to="/admin_settings">Settings</Link>
                </Menu.Item>
                {/* Logout button */}
                <hr/>
                <Menu.Item key="logout" icon={<RiLogoutBoxLine />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
            {/* Logout confirmation modal */}
            <Modal
                title="Are yous sure you want to logout?"
                visible={logoutModalVisible}
                onOk={handleConfirmLogout}
                onCancel={handleCancelLogout}
                okText="Yes" // Change Ok button label to "Yes"
                cancelText="Cancel"
            >
            </Modal>
        </div>
    );
};

export default MenuListAdmin;
