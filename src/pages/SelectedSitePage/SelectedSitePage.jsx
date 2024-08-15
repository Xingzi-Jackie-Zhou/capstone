import "./SelectedSitePage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function SelectedSitePage() {
  const { siteId } = useParams();
  const location = useLocation();
  const { state } = location;
  const siteNameFromSitePage = state?.site_name; //take from find a site page
  const siteIdFromRiverPage = state?.site_id;
  const siteNameFromRiverPage = state?.site_name; //take from find by river page

  const idInUse = siteId || siteIdFromRiverPage;
  const siteNameInUse = siteNameFromSitePage || siteNameFromRiverPage;

  const baseApiUrl = import.meta.env.VITE_API_URL;
  //   const [dischargeList, setDischargeList] = useState([]);
  //   const [allDataList, setAllDataList] = useState([]);
  // const [datePeriod, setDatePeriod] = useState([]);

  const [minDateString, setMinDateString] = useState("");
  const [maxDateString, setMaxDateString] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();
  async function fetchDischargeList() {
    try {
      const response = await axios.get(
        `${baseApiUrl}/sites/${idInUse}/flowRates`
      );

      const resultsDischarge = response.data;
      //   setDischargeList(resultsDischarge);
      //   console.log(resultsDischarge);

      const allDate = [...new Set(resultsDischarge.map((site) => site.date))];
      //   setDatePeriod(allDate);
      //   console.log(allDate);

      // Convert date strings to Date objects and find min and max dates
      const validDates = allDate
        .map((date) => new Date(date))
        .filter((date) => !isNaN(date.getTime()));

      if (validDates.length > 0) {
        const minDate = new Date(Math.min(...validDates));
        const maxDate = new Date(Math.max(...validDates));

        // Format dates to ISO string or any other desired format
        setMinDateString(minDate.toISOString().split("T")[0]);
        setMaxDateString(maxDate.toISOString().split("T")[0]);
      }

      //   const responseAll = await axios.get(
      //     `${baseApiUrl}/sites/${idInUse}/allData`
      //   );
      //   const resultsAll = responseAll.data;
      //   setAllDataList(resultsAll);
    } catch (error) {
      console.error("Getting data error:", error);
    }
  }

  useEffect(() => {
    fetchDischargeList();
  }, []);

  console.log(`Date Range: ${minDateString} to ${maxDateString}`);

  const isFormValid = () => {
    if (!startDate || !endDate || !selectedOption) {
      setFormError(true);
      return false;
    } else {
      setFormError(false);
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValid = isFormValid();
    if (formValid) {
      if (startDate && endDate && selectedOption) {
        const selectedRange = {
          startDate: startDate,
          endDate: endDate,
        };
        if (selectedOption === "check flow rate") {
          try {
            await axios.post(
              `${baseApiUrl}/sites/${idInUse}/flowRates`,
              selectedRange
            );
            navigate(`/sites/${idInUse}/flowRates/selectedDate`, {
              state: {
                startDate: startDate,
                endDate: endDate,
                selectedOption: selectedOption,
                idInUse: idInUse,
                siteNameInUse: siteNameInUse,
              },
            });
          } catch (error) {
            console.log("Error:", error);
          }
        } else {
          try {
            await axios.post(
              `${baseApiUrl}/sites/${idInUse}/allData`,
              selectedRange
            );
            navigate(`/sites/${idInUse}/allData/selectedDate`, {
              state: {
                startDate: startDate,
                endDate: endDate,
                selectedOption: selectedOption,
                idInUse: idInUse,
                siteNameInUse: siteNameInUse,
              },
            });
          } catch (error) {
            console.log("Error:", error);
          }
        }
      }
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <section className="hydrology">
      <h2>
        Gauge site id: {idInUse} and name: {siteNameInUse}
      </h2>
      <p>
        Please type in the date within range {minDateString} to {maxDateString}
        in the format of YYYY-MM-DD.
      </p>
      <form className="hydrology__form" onSubmit={handleSubmit}>
        <div className="hydrology__startDate-contanier">
          <label className="hydrology__startDate-label" htmlFor="startDate">
            Start date from :
          </label>
          <input
            type="text"
            id="startDate"
            name="startDate"
            placeholder="YYYY-MM-DD"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            value={startDate}
            className={`hydrology__startDate-add ${
              !formError && !startDate
                ? ""
                : "hydrology__startDate-add--inactive"
            }`}
          ></input>
        </div>
        <div className="hydrology__endDate-contanier">
          <label className="hydrology__endDate-label" htmlFor="endDate">
            End date to:
          </label>
          <input
            type="text"
            id="endDate"
            name="endDate"
            placeholder="YYYY-MM-DD"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            value={endDate}
            className={`hydrology__endDate-add ${
              !formError && !endDate ? "" : "hydrology__endDate-add--inactive"
            }`}
          ></input>
        </div>

        <div
          className={`hydrology__results-selection ${
            !formError && !selectedOption
              ? ""
              : "hydrology__results-selection--inactive"
          }`}
        >
          <h2>Select one group of data you want to see:</h2>
          <div className="hydrology__results">
            <label>
              <input
                type="radio"
                name="dataSelection"
                value="check flow rate"
                onChange={() => setSelectedOption("check flow rate")}
                className="hydrology__results-options"
              />
              <span>Check flow rate only</span>
            </label>
          </div>
          <div className="hydrology__results">
            <label>
              <input
                type="radio"
                name="dataSelection"
                value="check all data"
                onChange={() => setSelectedOption("check all data")}
                className="hydrology__results-options"
              />
              <span>Check all data</span>
            </label>
          </div>
        </div>

        <div className="site-page__button-container">
          <button className="site-page__button">Confirm</button>
          <button className="site-page__cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default SelectedSitePage;
