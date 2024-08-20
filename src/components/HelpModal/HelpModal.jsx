import "./HelpModal.scss";
import dischargeExampleImage from "../../assest/images/discharge-csv-example.png";
import weatherExampleImage from "../../assest/images/weather-csv-example.png";

const HelpModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="help-modal">
      <div className="help-modal__content">
        <button className="help-modal__close" onClick={onClose}>
          X
        </button>
        <h2 className="help-modal__title">Help guidine:</h2>
        <div className="help-modal__text">
          <div className="help-modal__text-step">
            <p className="help-modal__text-main">
              <span className="help-modal__text-bold">Discharge File:</span>{" "}
              Upload a CSV file that has the same column title for each. Ensure
              it adheres to the required format.
            </p>
            <div className="help-modal__image-container">
              <img
                src={dischargeExampleImage}
                alt="discharge csv file example"
              />
            </div>
            <p className="help-modal__text-notes">
              * Date has to be format as YYYY-MM-DD *
            </p>
            <p className="help-modal__text-notes">
              * Data value can leave as empty space if not have. *
            </p>
          </div>
          <div className="help-modal__text-step">
            <p className="help-modal__text-main">
              <span className="help-modal__text-bold">Weather File: </span>{" "}
              Upload a CSV file that has the same column title for each. Ensure
              it adheres to the required format.
            </p>
            <div className="help-modal__image-container">
              <img src={weatherExampleImage} alt="weather csv file example" />
            </div>
            <p className="help-modal__text-notes">
              * Date has to be format as YYYY-MM-DD *
            </p>
            <p className="help-modal__text-notes">
              * Data value can leave as empty space if not have. *
            </p>
          </div>

          <div className="help-modal__text-step">
            <p className="help-modal__text-main">
              <span className="help-modal__text-bold">Site Information:</span>{" "}
              site id is the station_id in dicharge csv file, or station number
              can be find on
              <a
                className="help-modal__link"
                href="https://wateroffice.ec.gc.ca/search/historical_e.html"
              >
                here
              </a>
            </p>
            <p className="help-modal__text-notes">
              * Create your own site name and station id based on your database
              if it is not on on the website. *
            </p>
          </div>
          <div className="help-modal__text-step">
            <p className="help-modal__text-main">
              <span className="help-modal__text-bold">River Information:</span>{" "}
              Provide the river name. This helps categorize the data correctly.
            </p>
          </div>
          <div className="help-modal__text-step">
            <p className="help-modal__text-main">
              <span className="help-modal__text-bold">City Information:</span>{" "}
              city name and city id are the city_name and climate_id in weather
              csv file, and can be find on
              <a
                className="help-modal__link"
                href=" https://climate.weather.gc.ca/historical_data/search_historic_data_e.html"
              >
                here
              </a>
            </p>
            <p className="help-modal__text-notes">
              * Find cloest weather station to your gauge site on the website. *
            </p>
          </div>
          <p className="help-modal__text-notes">
            All data and test data here are getting from{" "}
            <a
              className="help-modal__link"
              href="https://wateroffice.ec.gc.ca/search/historical_e.html"
            >
              Environemtnal and natural resources gc for water level and flow
            </a>{" "}
            and{" "}
            <a
              className="help-modal__link"
              href=" https://climate.weather.gc.ca/historical_data/search_historic_data_e.html"
            >
              Environemtnal and natural resources gc forweather
            </a>
          </p>
          <p className="help-modal__text-notes">
            If you have any questions or need further assistance, please contact
            xingzizhou@hotmail.com for support.
          </p>
        </div>
      </div>
      <div className="help-modal__overlay" onClick={onClose}></div>
    </div>
  );
};

export default HelpModal;
