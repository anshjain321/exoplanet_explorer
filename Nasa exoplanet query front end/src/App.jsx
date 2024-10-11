import { useEffect, useState } from 'react'
import QueryPanel from './component/Query_panel';
import ResultsPanel from './component/ResultPanel';
function App() {
  const [data, setdata] = useState([]);
  const [isloading, setisloading] = useState(null);
  const [error, seterror] = useState(null);

  const [filteredData, setfilteredData] = useState([]);
  const [resultvisible, setresultvisible] = useState(false);
  useEffect(() => { 
    const fetchData = async ()=>{
      try{
    const response  = await fetch('http://localhost:3002/api/data');
    if(!response.ok){
      throw new Error('failed to fetch data');
    }  
    const jsonData = await response.json();
    setdata(jsonData);
    setfilteredData(jsonData);
  }
  catch(error) {
   seterror(error.message);
  }
  finally{
    setisloading(false);
  }
    };
   fetchData();
  }, []);

  if (isloading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 
  const handleSearch = (query) => {
    const filtered = data.filter((entry) => {
      const nameMatch = entry.pl_name && entry.pl_name.toLowerCase().includes(query.pl_name.toLowerCase());
      const hostMatch = entry.hostname && entry.hostname.toLowerCase().includes(query.hostname.toLowerCase());
      const methodMatch = entry.discoverymethod && entry.discoverymethod.toLowerCase().includes(query.discoverymethod.toLowerCase());
      const yearMatch = entry.disc_year && entry.disc_year.toString().includes(query.disc_year.toString());
      const facilityMatch = entry.disc_facility && entry.disc_facility.toLowerCase().includes(query.disc_facility.toLowerCase());

      return nameMatch && hostMatch && methodMatch && yearMatch && facilityMatch;
    });

    setfilteredData(filtered);
    setresultvisible(true);
  };

  const handleClear = () => {
    setfilteredData([]); 
    setresultvisible(false); 
  };

  return (
    <div>
      <QueryPanel onSearch={handleSearch} exoplanetData={data} onClear={handleClear} />
      {resultvisible && <ResultsPanel data={filteredData} />}
    </div>
  );
}

export default App
