// components/CampaignForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        from: '',
        to: '',
        totalBudget: '',
        dailyBudget: ''
    });
    const [creatives, setCreatives] = useState([]);
    const [imageBase64, setImageBase64] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            setImageBase64(base64String);
            console.log("Base64 String:", base64String); // Log to verify
          };
          reader.readAsDataURL(file);
        }
      };
      

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setCreatives(e.target.files);
    };

    const apiUrl = process.env.NODE_ENV === 'production' ? 
  'https://add-campaign.vercel.app' : 'http://localhost:5000'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaignData = {
      ...formData,
      imageBase64, // Include the base64 image data
    };
  
    try {
      await axios.post(`${apiUrl}/api/campaigns`, campaignData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      alert('Campaign created successfully');
      // Clear cached campaigns
      localStorage.removeItem('cachedCampaigns');
    } catch (error) {
      console.error("Error in campaign creation:", error);
      if (error.response?.status === 413) {
        alert('Image too large to save. Choose a smaller one');
      } else {
        alert('Something went wrong');
      }
    }
  };
  

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const form = new FormData();
    //     Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    //     // Array.from(creatives).forEach(file => form.append('creatives', file));

    //     try {
    //         console.log(form)
    //         await axios.post(`${apiUrl}/api/campaigns`, form, {
    //             // headers: { 'Content-Type': 'multipart/form-data' },
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true
    //         });
    //         alert('Campaign created successfully');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <div className='flex flex-col gap-4 container max-w-full py-8'>
            <h1 className='text-3xl text-center'>Campaign Details</h1>
            <form
            className="mx-auto flex flex-col gap-2 container max-w-[50%] md:max-w-lg lg:max-w-xl w-[70%] h-full p-6 border rounded-lg shadow-md bg-white"
            onSubmit={handleSubmit}
            >
  {/* <div className="w-full mb-4 px-4 block py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"> */}
    <input
        className="w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="name"
        placeholder="Campaign Name"
        onChange={handleInputChange}
        required
    />
  {/* </div> */}
  {/* <div className="w-full px-4 block py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"> */}
    <input
        className="w-full px-4 block py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="date"
        name="from"
        onChange={handleInputChange}
        required
    />
  {/* </div> */}
  
  {/* <div className="w-full px-4 block py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"> */}
    <input
        className="w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="date"
        name="to"
        onChange={handleInputChange}
        required
    />
  {/* </div> */}
 
 {/* <div className="w-full px-4 block py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"> */}
    <input
        className="w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="number"
        name="totalBudget"
        step="0.01"
        placeholder="Total Budget"
        onChange={handleInputChange}
        required
    />
 {/* </div> */} 
  <input
    className="w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="number"
    name="dailyBudget"
    step="0.01"
    placeholder="Daily Budget"
    onChange={handleInputChange}
    required
  />
  <input
    className="w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="file"
    multiple
    onChange={handleImageChange}
  />
  <button
    className="w-full block px-4 py-2 bg-[#f9ac3b] text-black font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="submit"
  >
    Create Campaign
  </button>
</form>
</div>
        

    );
};

export default CampaignForm;
