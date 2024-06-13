import logo from './logo.svg';
import './App.css';
import MainLayoutLayout from './components/layout/Layout';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageTest from './pages/pagetest';
import LeavePage from './pages/leavePage/leavePage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayoutLayout />}>
            <Route path="/tasks" element={<PageTest />} />
            <Route path="/leave" element={<LeavePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
