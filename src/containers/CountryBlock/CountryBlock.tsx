import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import CountryList from '../../components/Country/CountryList';
import CountryAbout from '../../components/Country/CountryAbout';
import Preloader from '../../components/Preloader/Preloader';
import { ApiCountry, ApiListCountry, CountryListInterface } from '../../types';

const BASE_COUNTRY_URL = 'https://restcountries.com/v2/';
const COUNTRY_LIST_URL = BASE_COUNTRY_URL + 'all?fields=alpha3Code,name';
const COUNTRY_URL = BASE_COUNTRY_URL + 'alpha/';

const CountryBlock = () => {
  const [countryList, setCountryList] = useState<CountryListInterface[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [countryInfo, setCountryInfo] = useState<ApiCountry | null>(null);

  const fetchCountryLists = useCallback(async () => {
    setLoading(true);
    try {
      const countryResponse =
        await axios.get<ApiListCountry[]>(COUNTRY_LIST_URL);
      const countryList = countryResponse.data.map((country, index) => {
        return {
          id: index,
          nameCountry: country.name,
          alpha3Code: country.alpha3Code,
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
    void fetchCountryLists();
  }, [fetchCountryLists]);

  const fetchCountryByCode = useCallback(async (countryCode: string) => {
    try {
      const countryCodeResponse = await axios.get<ApiCountry>(
        COUNTRY_URL + countryCode,
      );

      setCountryInfo(countryCodeResponse.data);
    } catch (e) {
      alert('Network error' + e);
    }
  }, []);

  useEffect(() => {
    if (countryCode) {
      void fetchCountryByCode(countryCode);
    }
  }, [fetchCountryByCode, countryCode]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4 pe-3">
          <CountryList
            countryList={countryList}
            onClickCountry={(alfaCode: string) => setCountryCode(alfaCode)}
          />
          {loading && <Preloader />}
        </div>
        <div className="col-8">
          <CountryAbout countryInfo={countryInfo} />
        </div>
      </div>
    </div>
  );
};

export default CountryBlock;
