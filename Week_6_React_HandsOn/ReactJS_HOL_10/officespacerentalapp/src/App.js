import React from 'react';

const officeList = [
  { name: 'Downtown Office', rent: 75000, address: '12 Park Street, Mumbai' },
  { name: 'Suburb Office', rent: 45000, address: '45 Green Avenue, Pune' },
  { name: 'Tech Park Office', rent: 90000, address: '3 IT Hub, Bengaluru' },
  { name: 'Budget Office', rent: 30000, address: '9 Market Road, Nagpur' }
];

function App() {
  const heading = <h1>Office Space Rental Listings</h1>;
  const officeImage = (
    <img
      src="https://via.placeholder.com/300x150?text=Office+Space"
      alt="Office Space"
    />
  );

  const office = { name: 'Premium Office', rent: 65000, address: '1 Main Street, Delhi' };

  return (
    <div>
      {heading}
      {officeImage}

      <h2>Featured Office</h2>
      <p>Name: {office.name}</p>
      <p>Rent: <span style={{ color: office.rent < 60000 ? 'red' : 'green' }}>{office.rent}</span></p>
      <p>Address: {office.address}</p>

      <h2>All Office Listings</h2>
      <ul>
        {officeList.map((item, index) => (
          <li key={index}>
            {item.name} - Rent:{' '}
            <span style={{ color: item.rent < 60000 ? 'red' : 'green' }}>
              {item.rent}
            </span>{' '}
            - {item.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
