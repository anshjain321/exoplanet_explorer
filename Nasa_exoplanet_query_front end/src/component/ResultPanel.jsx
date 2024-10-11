
import React, { useState } from 'react';

function ResultsPanel({ data }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState('');
  const [sortedColumn, setSortedColumn] = useState('');

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sorted = [...sortedData].sort((a, b) => {
      if (newSortOrder === 'asc') {
        if(typeof a[column] === 'number' ){
          return a[column] - b[column];
        }
        else{
          return a[column].localeCompare(b[column]);
        }
      }
       else {  
        if(typeof b[column] === 'number'){
          return b[column] - a[column];
        }
        else{
          return b[column].localeCompare(a[column]);
        }
      }
    });

    setSortedData(sorted);
    setSortedColumn(column);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th
              onClick={() => handleSort('pl_name')}
              className="cursor-pointer py-2 px-4"
            >
              Planet Name {sortedColumn === 'pl_name' && sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th
              onClick={() => handleSort('hostname')}
              className="cursor-pointer py-2 px-4"
            >
              Host Name {sortedColumn === 'hostname' && sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th
              onClick={() => handleSort('discoverymethod')}
              className="cursor-pointer py-2 px-4"
            >
              Discovery Method {sortedColumn === 'discoverymethod' && sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th
              onClick={() => handleSort('disc_year')}
              className="cursor-pointer py-2 px-4"
            >
              Discovery Year {sortedColumn === 'disc_year' && sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th
              onClick={() => handleSort('disc_facility')}
              className="cursor-pointer py-2 px-4"
            >
              Discovery Facility {sortedColumn === 'disc_facility' && sortOrder === 'asc' ? '↑' : '↓'}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="py-2 px-4">{item.pl_name}</td>
              <td className="py-2 px-4">
                <a
                  href={`https://exoplanetarchive.ipac.caltech.edu/overview/${item.hostname}`} // Replace with the actual URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {item.hostname}
                </a>
              </td>
              <td className="py-2 px-4">{item.discoverymethod}</td>
              <td className="py-2 px-4">{item.disc_year}</td>
              <td className="py-2 px-4">{item.disc_facility}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsPanel;
