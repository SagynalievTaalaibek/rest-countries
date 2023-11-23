import CountryList from '../../components/Country/CountryList';
import CountryAbout from '../../components/Country/CountryAbout';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ApiListCountry, CountryListInterface } from '../../types';

const BASE_COUNTRY_URL = 'https://restcoutries.com/v2/';
const COUNTRY_LIST_URL = BASE_COUNTRY_URL + 'all?fields=alpha3Code,name';
// const COUNTRY_URL = 'alpha/';

const CountryBlock = () => {
  const [countryList, setCountryList] = useState<CountryListInterface[] | null>(
    null,
  );

  const fetchCountry = useCallback(async () => {
    try {
      const countryResponse =
        await axios.get<ApiListCountry[]>(COUNTRY_LIST_URL);
      const countryList = countryResponse.data.map((country, index) => {
        return {
          id: index,
          nameCountry: country.name,
        };
      });

      setCountryList(countryList);
    } catch (e) {
      alert('Network error => ' + e);
    }
  }, []);

  useEffect(() => {
    void fetchCountry();
  }, [fetchCountry]);

  console.log(countryList);

  return (
    <div className="container mt-5">
      <div className="row">
        <CountryList />
        <CountryAbout />
      </div>
    </div>
  );
};

export default CountryBlock;
