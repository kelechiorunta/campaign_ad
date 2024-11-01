// components/CampaignList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.NODE_ENV === 'production' ? 
  'https://add-campaign.vercel.app' : 'http://localhost:5000'
  // Fetch campaigns from the backend
  const fetchCampaigns = async () => {
    const cachedCampaigns = localStorage.getItem('cachedCampaigns');

    if (cachedCampaigns) {
      // Use cached data if available
      setCampaigns(JSON.parse(cachedCampaigns));
      setLoading(false);
    }else{

      try {
        const response = await axios(`${apiUrl}/api/campaigns`, {withCredentials: true});
        const data = response.data;
        setCampaigns(data.campaigns);
        localStorage.setItem('cachedCampaigns', JSON.stringify(data.campaigns) )
        setLoading(false);
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }

    }
    
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container max-w-full flex flex-col items-center justify-start mx-auto px-4 py-6">
  <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Campaigns</h1>
  <ul className="space-y-4 w-full flex flex-wrap justify-start items-center">
    {campaigns.map((campaign) => (
      <li
        key={campaign._id}
        className="border border-gray-200 rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow duration-300"
      >
        <h2 className="text-lg md:text-xl font-semibold text-gray-700">
          {campaign.name}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          From: <span className="font-medium">{new Date(campaign.from).toLocaleDateString()}</span>
        </p>
        <p className="text-sm md:text-base text-gray-600">
          To: <span className="font-medium">{new Date(campaign.to).toLocaleDateString()}</span>
        </p>
        <p className="text-sm md:text-base text-gray-600">
          Total Budget: <span className="font-medium">${campaign.totalBudget.toFixed(2)}</span>
        </p>
        <p className="text-sm md:text-base text-gray-600">
          Daily Budget: <span className="font-medium">${campaign.dailyBudget.toFixed(2)}</span>
        </p>
        {campaign.imageBase64 && (
              <img
                src={campaign.imageBase64}
                alt={`${campaign.name} creative`}
                style={{ width: '200px', height: 'auto', marginTop: '10px' }}
              />
            )}
      </li>
    ))}
  </ul>
</div>

  );
}

export default CampaignList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CACHE_KEY = 'cachedCampaigns';
// const CACHE_DURATION = 3600000; // 1 hour in milliseconds

// function fetchCampaignsFromLocalStorage() {
//   const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
//   if (cachedData) {
//     const { data, timestamp } = cachedData;
//     const isCacheValid = Date.now() - timestamp < CACHE_DURATION;
//     if (isCacheValid) {
//       return data; // Return cached campaigns if still valid
//     }
//     localStorage.removeItem(CACHE_KEY); // Clear outdated cache
//   }
//   return null; // No valid cached data
// }

// function CampaignList() {
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiUrl = process.env.NODE_ENV === 'production' 
//     ? 'https://add-campaign.vercel.app' 
//     : 'http://localhost:5000';

//   const fetchCampaigns = async () => {
//     try {
//       const cachedCampaigns = fetchCampaignsFromLocalStorage();
//       if (cachedCampaigns) {
//         setCampaigns(cachedCampaigns);
//         setLoading(false);
//       } else {
//         const response = await axios(`${apiUrl}/api/campaigns`, { withCredentials: true });
//         const data = response.data.campaigns;

//         // Cache the response with a timestamp
//         localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));

//         setCampaigns(data);
//         setLoading(false);
//       }
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container max-w-full mx-auto px-4 py-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Campaigns</h1>
//       <ul className="space-y-4">
//         {campaigns.map((campaign) => (
//           <li
//             key={campaign._id}
//             className="border border-gray-200 rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow duration-300"
//           >
//             <h2 className="text-lg md:text-xl font-semibold text-gray-700">
//               {campaign.name}
//             </h2>
//             <p className="text-sm md:text-base text-gray-600">
//               From: <span className="font-medium">{new Date(campaign.from).toLocaleDateString()}</span>
//             </p>
//             <p className="text-sm md:text-base text-gray-600">
//               To: <span className="font-medium">{new Date(campaign.to).toLocaleDateString()}</span>
//             </p>
//             <p className="text-sm md:text-base text-gray-600">
//               Total Budget: <span className="font-medium">${campaign.totalBudget.toFixed(2)}</span>
//             </p>
//             <p className="text-sm md:text-base text-gray-600">
//               Daily Budget: <span className="font-medium">${campaign.dailyBudget.toFixed(2)}</span>
//             </p>
//             {campaign.imageBase64 && (
//               <img
//                 src={campaign.imageBase64}
//                 alt={`${campaign.name} creative`}
//                 style={{ width: '200px', height: 'auto', marginTop: '10px' }}
//               />
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CampaignList;
