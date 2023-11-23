import CountryList from '../../components/Country/CountryList';
import CountryAbout from '../../components/Country/CountryAbout';
import { useEffect } from 'react';

const CountryBlock = () => {
  useEffect(() => {
    console.log('API TO LIST COUNTRY');
  }, []);

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
