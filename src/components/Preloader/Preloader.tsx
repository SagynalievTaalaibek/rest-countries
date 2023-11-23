import './Preloader.css';

const Preloader = () => {
  return (
    <>
      <div id="preloader">
        <div className="inner">
          <div className="clock">
            <div className="minute"></div>
            <div className="house"></div>
          </div>
          <span>Loading</span>
        </div>
      </div>
    </>
  );
};

export default Preloader;
