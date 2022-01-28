import './App.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AuthMainPage from './features/Auth/pages/Main';
import Chat from './features/Realtime/pages/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Navigate to='/authen' replace />} />
          <Route path='/authen' element={<AuthMainPage />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
