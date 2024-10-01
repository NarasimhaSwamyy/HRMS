// AddProfileContent.js
import React, { useState } from 'react';
import './AddProfileContent.css';
import AddProfileForm from './AddProfileForm'; // Make sure to provide the correct path

const UpdateProfileContent = () => {
  // Content of the "Update Profile" tab
  return (
    <div className="tab-content">
      <h2>Update Profile</h2>
      {/* Add your content for the "Update Profile" tab */}
    </div>
  );
};

const SearchProfileContent = () => {
  // Content of the "Search Profile" tab
  return (
    <div className="tab-content">
      <h2>Search Profile</h2>
      {/* Add your content for the "Search Profile" tab */}
    </div>
  );
};

const AddProfileContent = () => {
  const [activeTab, setActiveTab] = useState('addprofile');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-container">
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'addprofile' ? 'active' : ''}`}
          onClick={() => handleTabClick('addprofile')}
        >
          Add Profile
        </button>
        <button
          className={`tab ${activeTab === 'updateprofile' ? 'active' : ''}`}
          onClick={() => handleTabClick('updateprofile')}
        >
          Update
        </button>
        <button
          className={`tab ${activeTab === 'searchprofile' ? 'active' : ''}`}
          onClick={() => handleTabClick('searchprofile')}
        >
          Search
        </button>
      </div>

      {/* Conditionally render content based on the active tab */}
      {activeTab === 'addprofile' && <AddProfileForm />}
      {activeTab === 'updateprofile' && <UpdateProfileContent />}
      {activeTab === 'searchprofile' && <SearchProfileContent />}
    </div>
  );
};

export default AddProfileContent;
