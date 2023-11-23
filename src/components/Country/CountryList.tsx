import React, { useState } from 'react';
import { CountryListInterface } from '../../types';

interface Props {
  countryList: CountryListInterface[] | null;
}

const CountryList: React.FC<Props> = ({ countryList }) => {
  const [activeListIndex, setActiveListIndex] = useState<number | null>(null);

  return (
    <>
      <h3>Country List</h3>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <ul className="list-group">
          {countryList &&
            countryList.map((country) => (
              <li
                className={`list-group-item ${
                  activeListIndex === country.id ? 'active' : ''
                }`}
                key={country.id}
                onClick={() => setActiveListIndex(country.id)}
              >
                {country.nameCountry}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default CountryList;
