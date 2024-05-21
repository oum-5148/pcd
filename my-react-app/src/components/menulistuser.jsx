import React, { useState } from "react";
import { Menu, Modal } from 'antd'; // Import Modal from antd
import { WechatOutlined, InfoCircleOutlined, SettingOutlined, ScheduleOutlined, LinkOutlined, MailOutlined } from '@ant-design/icons';
import '../css/menubar.css';
import { Link } from 'react-router-dom';
import { RiLogoutBoxLine } from 'react-icons/ri'; // Import logout icon

const MenuListUser = ({ darkTheme }) => {
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
        }, 1000); // Adjust this timing if necessary
    };

    const handleCancelLogout = () => {
        setLogoutModalVisible(false);
    };

    return (
        <div>
            <Menu mode="inline" className="menu-bar" theme={darkTheme ? 'dark' : 'light'}>
                <Menu.Item key="home" icon={<WechatOutlined />}>
                    <Link to="/chat">Chat</Link>
                </Menu.Item>
                <Menu.Item key="home" icon={<InfoCircleOutlined />}>
                    <Link to="/latestthreat">Lastest updates</Link>
                </Menu.Item>
                <Menu.SubMenu key="subtasks" icon={<ScheduleOutlined />} title="Checker">
                    <Menu.Item key="tadarkThemesk-1" icon={<MailOutlined />}><Link to="/email">Email</Link></Menu.Item>
                    <Menu.Item key="task-2" icon={<LinkOutlined />}><Link to="/url">URL</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="home" icon={<SettingOutlined />}>
                    <Link to="/user_settings">Profile</Link>
                </Menu.Item>
                {/* Logout button */}
                <hr />
                <Menu.Item key="logout" icon={<RiLogoutBoxLine />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
            {/* Logout confirmation modal */}
            <Modal
                title="Are you sure you want to logout?"
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

export default MenuListUser;
