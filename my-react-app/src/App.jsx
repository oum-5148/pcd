import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import WelcomePage from './WelcomePage'; 
import ImportPage from './ImportPage'; 
import DatabasePage from './DatabasePage'
import AlertPage from './AlertPage'
import UserSettingsPage from './UserSettingsPage';
import AdminSettingsPage from './AdminSettingsPage';
import DashboardPage from './DashboardPage';
import LatestThreatPage from './LatestThreatPage';
import ChatPage from './ChatPage';
import EmailCheckerPage from './EmailCheckerPage';
import URLCheckerPage from './URLCheckerPage';


function App() {
  return(
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<WelcomePage/>}></Route>
<Route path='/register' element={<SignUpPage/>}></Route>
<Route path='/login' element={<SignInPage/>}></Route>
<Route path='/database' element={<DatabasePage/>}></Route>
<Route path='/alert' element={<AlertPage/>}></Route>
<Route path='/import' element={<ImportPage/>}></Route>
<Route path='/user_settings' element={<UserSettingsPage/>}></Route>
<Route path='/admin_settings' element={<AdminSettingsPage/>}></Route>
<Route path='/dashboard' element={<DashboardPage/>}></Route>
<Route path='/latestthreat' element={<LatestThreatPage/>}></Route>
<Route path='/chat' element={<ChatPage/>}></Route>
<Route path='/email' element={<EmailCheckerPage/>}></Route>
<Route path='/url' element={<URLCheckerPage/>}></Route>

  </Routes>
  </BrowserRouter>
  );
}

export default App;
