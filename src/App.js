// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import './App.css';

function App() {
  return (
    <div className="App w-full border border-gray-200 min-h-screen container max-w-full">
      <Router>
        {/* Navigation bar */}
        <nav className="Appheader  container max-w-full bg-gray-800 text-white py-4 px-6 flex justify-center md:justify-start space-x-6">
          <Link
            className="links text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors duration-200"
            to="/create"
          >
            Create Campaign
          </Link>
          <Link
            className="links text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors duration-200"
            to="/"
          >
            View Campaigns
          </Link>
        </nav>
        
        {/* Main content area with routing */}
        <div className="campaignContainer shadow-md rounded-md container max-w-[60%] mt-16 mx-auto p-8">
          <Routes>
            <Route path="/" element={<CampaignList />} />
            <Route path="/create" element={<div className='bg-white shadow-lg rounded-md flex flex-col'><CampaignForm /></div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;


