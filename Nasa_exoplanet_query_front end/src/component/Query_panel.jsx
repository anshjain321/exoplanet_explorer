import React, { useState } from 'react';

function QueryPanel({ onSearch, exoplanetData, onClear }) {
  const [query, setQuery] = useState({
    pl_name: '',
    hostname: '',
    discoverymethod: '',
    disc_year: '',
    disc_facility: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSearch = () => {
    if (Object.values(query).some(value => value !== '')) {
      setError('');
      onSearch(query);
    } else {
      setError('Please enter at least one query value.');
    }
  };

  const handleClear = () => {
    setQuery({
      pl_name: '',
      hostname: '',
      discoverymethod: '',
      disc_year: '',
      disc_facility: '',
    });
    setError(''); 
    onClear(); 
  };

  const uniquePlanetNames = Array.from(new Set(exoplanetData.map(item => item.pl_name)));
  const uniqueHostNames = Array.from(new Set(exoplanetData.map(item => item.hostname)));
  const uniqueDiscoveryMethods = Array.from(new Set(exoplanetData.map(item => item.discoverymethod)));
  const uniqueDiscoveryYears = Array.from(new Set(exoplanetData.map(item => item.disc_year)));
  const uniqueDiscoveryFacilities = Array.from(new Set(exoplanetData.map(item => item.disc_facility)));

  return (
    <div className="p-4 bg-white rounded shadow-md text-sm"> 
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <select
        name="pl_name"
        value={query.pl_name}
        onChange={handleInputChange}
        className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">Select Planet name</option>
        {uniquePlanetNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      <select
        name="hostname"
        value={query.hostname}
        onChange={handleInputChange}
        className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mt-2"
      >
        <option value="">Select Host name</option>
        {uniqueHostNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>

      <select
        name="discoverymethod"
        value={query.discoverymethod}
        onChange={handleInputChange}
        className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mt-2"
      >
        <option value="">Select Discovery Method</option>
        {uniqueDiscoveryMethods.map((method, index) => (
          <option key={index} value={method}>
            {method}
          </option>
        ))}
      </select>
      <select
        name="disc_year"
        value={query.disc_year}
        onChange={handleInputChange}
        className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mt-2"
      >
        <option value="">Select Discovery Year</option>
        {uniqueDiscoveryYears.map((method, index) => (
          <option key={index} value={method}>
            {method}
          </option>
        ))}
      </select>
      <select
        name="disc_facility"
        value={query.disc_facility}
        onChange={handleInputChange}
        className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mt-2"
      >
        <option value="">Select Discovery Facility</option>
        {uniqueDiscoveryFacilities.map((method, index) => (
          <option key={index} value={method}>
            {method}
          </option>
        ))}
      </select>

      <div className="flex mt-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default QueryPanel;
