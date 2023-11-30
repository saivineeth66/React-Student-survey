import './App.css';
import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import SurveyFormPage from './Pages/Survey-form-Page';
import SurveyListPage from './Pages/Survey-List-Page';
import SurveyEditPage from './Pages/Survey-Edit-Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} />
        <Route path="/fill-survey" element={<SurveyFormPage />} />
        <Route path="/view-surveys" element={<SurveyListPage/>} />
        <Route path="/edit-survey/:id" element={<SurveyEditPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
