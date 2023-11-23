import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ApiCountry, borderCountry } from '../../types';

interface Props {
  countryInfo: ApiCountry | null;
}

const CountryAbout: React.FC<Props> = ({ countryInfo }) => {
  const [codeCountry, setCodeCountry] = useState<string[] | null>(null);
  const [borders, setBorders] = useState<borderCountry[] | null>(null);

  const fetchBorders = useCallback(async (code: string[]) => {
    try {
      const promises = code.map(async (border, index) => {
        const borderUrl = 'https://restcountries.com/v2/alpha/' + border;
        const userResponse = await axios.get<ApiCountry>(borderUrl);

        return {
          id: index,
          name: userResponse.data.name,
        };
      });

      const newBorders = await Promise.all(promises);
      setBorders(newBorders);
    } catch (e) {
      alert('Country error' + e);
    }
  }, []);

  useEffect(() => {
    if (countryInfo) {
      setCodeCountry(countryInfo.borders);
    }

    if (codeCountry) {
      void fetchBorders(codeCountry);
    }
  }, [fetchBorders, codeCountry, countryInfo]);

  return (
    <>
      {countryInfo ? (
        <div className="row">
          <div className="col-8">
            <h3>{countryInfo.name}</h3>
            <p className="fw-semibold mt-3">
              Capital: <span className="fw-normal">{countryInfo.capital}</span>
            </p>
            <p className="fw-semibold mt-3">
              Region: <span className="fw-normal">{countryInfo.region}</span>
            </p>
            <p className="fw-semibold">
              Population:{' '}
              <span className="fw-normal">{countryInfo.population}</span>
            </p>
            Language:
            <ul className="fw-semibold">
              {countryInfo.languages.length > 0 ? (
                countryInfo.languages.map((language, index) => (
                  <li key={index} className="fw-normal">
                    {language.name}
                  </li>
                ))
              ) : (
                <li className="fw-normal">No languages found</li>
              )}
            </ul>
          </div>
          <div className="col-4">
            <img
              src={countryInfo.flag}
              alt={countryInfo.name}
              style={{ height: '100px', maxWidth: '200px' }}
            />
          </div>
          <div>
            <h4>Borders with: </h4>
            <ul>
              {borders &&
                borders.map((border) => <li key={border.id}>{border.name}</li>)}
            </ul>
          </div>
        </div>
      ) : (
        <h3>Choose country</h3>
      )}
    </>
  );
};

export default CountryAbout;
