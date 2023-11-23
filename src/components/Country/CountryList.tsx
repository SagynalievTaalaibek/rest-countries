import React, { useState } from 'react';
import { CountryListInterface } from '../../types';

interface Props {
  countryList: CountryListInterface[] | null;
  onClickCountry: (alpha3Code: string) => void;
}

const CountryList: React.FC<Props> = ({ countryList, onClickCountry }) => {
  const [activeListIndex, setActiveListIndex] = useState<number | null>(null);

  const onClick = (id: number, alpha3Code: string) => {
    setActiveListIndex(id);
    onClickCountry(alpha3Code);
  };

  return (
    <>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <ul className="list-group">
          {countryList &&
            countryList.map((country) => (
              <li
                className={`list-group-item ${
                  activeListIndex === country.id ? 'active' : ''
                }`}
                key={country.id}
                onClick={() => onClick(country.id, country.alpha3Code)}
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
