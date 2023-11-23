import CountryList from '../../components/Country/CountryList';
import CountryAbout from '../../components/Country/CountryAbout';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ApiListCountry, CountryListInterface } from '../../types';
import Preloader from '../../components/Preloader/Preloader';

const BASE_COUNTRY_URL = 'https://restcountries.com/v2/';
const COUNTRY_LIST_URL = BASE_COUNTRY_URL + 'all?fields=alpha3Code,name';
// const COUNTRY_URL = 'alpha/';

const CountryBlock = () => {
  const [countryList, setCountryList] = useState<CountryListInterface[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const fetchCountry = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCountry();
  }, [fetchCountry]);

  console.log(countryList);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4 pe-3">
          <CountryList countryList={countryList} />
          {loading && <Preloader />}
        </div>
        <div className="col-8">
          <CountryAbout />
        </div>
      </div>
    </div>
  );
};

export default CountryBlock;
