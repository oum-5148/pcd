import React, { useState } from 'react';
import './css/temp.css';
import { Button, Layout, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import MenuListUser from './components/menulistuser';
import ToggleThemeButton from './components/ToggleThemeButton';
import Logo from './assets/logo.png'
const { Header, Sider } = Layout;
import UserSettings from './components/UserSettings';


const UserSettingsPage = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          theme={darkTheme ? 'dark' : 'light'}
          className="sidebar"
        >
        <img src={Logo} className='logo'/>
          <MenuListUser darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              className='toggle'
              onClick={() => setCollapsed(!collapsed)}
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Header>
<UserSettings/>       
            </Layout>
      </Layout>
    </div>
  );
}

export default UserSettingsPage;
