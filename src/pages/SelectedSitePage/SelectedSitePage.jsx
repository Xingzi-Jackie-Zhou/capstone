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
  const returnName = state?.returnName;

  const idInUse = siteId || siteIdFromRiverPage;
  const siteNameInUse =
    siteNameFromSitePage || siteNameFromRiverPage || returnName;

  const baseApiUrl = import.meta.env.VITE_API_URL;

  const [minDateString, setMinDateString] = useState("");
  const [maxDateString, setMaxDateString] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [formError, setFormError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const navigate = useNavigate();
  const userNameId = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token");
  async function fetchDischargeList() {
    try {
      if (userNameId) {
        const userResponse = await axios.get(
          `${baseApiUrl}/users/${userNameId}/sites/${idInUse}/flowRates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userResultsDischarge = userResponse.data;

        const allDate = [
          ...new Set(userResultsDischarge.map((site) => site.date)),
        ];

        const validDates = allDate
          .map((date) => new Date(date))
          .filter((date) => !isNaN(date.getTime()));

        if (validDates.length > 0) {
          const minDate = new Date(Math.min(...validDates));
          const maxDate = new Date(Math.max(...validDates));

          setMinDateString(minDate.toISOString().split("T")[0]);
          setMaxDateString(maxDate.toISOString().split("T")[0]);
        }
      } else {
        const response = await axios.get(
          `${baseApiUrl}/sites/${idInUse}/flowRates`
        );

        const defaultResultsDischarge = response.data;

        const allDate = [
          ...new Set(defaultResultsDischarge.map((site) => site.date)),
        ];

        const validDates = allDate
          .map((date) => new Date(date))
          .filter((date) => !isNaN(date.getTime()));

        if (validDates.length > 0) {
          const minDate = new Date(Math.min(...validDates));
          const maxDate = new Date(Math.max(...validDates));

          setMinDateString(minDate.toISOString().split("T")[0]);
          setMaxDateString(maxDate.toISOString().split("T")[0]);
        }
      }
    } catch (error) {
      console.error("Getting data error:", error);
    }
  }

  useEffect(() => {
    fetchDischargeList();
  }, []);

  console.log(`Date Range: ${minDateString} to ${maxDateString}`);

  const isDateValid = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateStr) && !isNaN(new Date(dateStr).getTime());
  };

  const start = new Date(startDate);
  const end = new Date(endDate);
  const minDate = new Date(minDateString);
  const maxDate = new Date(maxDateString);
  console.log("startDate", start, end, "guild Start", maxDate, minDate);
  const isFormValid = () => {
    if (!startDate || !endDate || !selectedOption) {
      setFormError(true);
      setDateError(true);
      return false;
    }
    if (!isDateValid(startDate) || !isDateValid(endDate)) {
      setFormError(true);
      setDateError(true);
      return false;
    }
    if (start < minDate || end > maxDate || start > end) {
      setDateError(true);
      setFormError(true);

      return false;
    }
    setFormError(false);
    setDateError(false);
    return true;
  };
  console.log("formError", formError, "dateError", dateError);
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
            if (userNameId) {
              await axios.post(
                `${baseApiUrl}/users/${userNameId}/sites/${idInUse}/flowRates`,
                selectedRange,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              navigate(
                `/users/${userNameId}/sites/${idInUse}/flowRates/selectedDate`,
                {
                  state: {
                    startDate: startDate,
                    endDate: endDate,
                    selectedOption: selectedOption,
                    idInUse: idInUse,
                    siteNameInUse: siteNameInUse,
                  },
                }
              );
            } else {
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
            }
          } catch (error) {
            console.log("Error:", error);
          }
        } else {
          try {
            if (userNameId) {
              await axios.post(
                `${baseApiUrl}/users/${userNameId}/sites/${idInUse}/allData`,
                selectedRange,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              navigate(
                `/users/${userNameId}/sites/${idInUse}/allData/selectedDate`,
                {
                  state: {
                    startDate: startDate,
                    endDate: endDate,
                    selectedOption: selectedOption,
                    idInUse: idInUse,
                    siteNameInUse: siteNameInUse,
                  },
                }
              );
            } else {
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
            }
          } catch (error) {
            console.log("Error:", error);
          }
        }
      }
    }
  };
  const handleCancel = () => {
    if (userNameId) {
      navigate(
        siteNameFromRiverPage
          ? `/users/${userNameId}/rivers`
          : `/users/${userNameId}/sites`
      );
    } else {
      navigate(siteNameFromRiverPage ? "/rivers" : "/sites");
    }
  };

  return (
    <section className="hydrology">
      <h2 className="hydrology__conclusion">
        Gauge site id: {idInUse} and name:{" "}
        <span className="hydrology__style">{siteNameInUse}</span>
      </h2>
      <p className="hydrology__description">
        Please type in the date within range{" "}
        <span
          className={`hydrology__bold ${
            formError && dateError ? "hydrology__bold--red" : ""
          }`}
        >
          {minDateString} to {maxDateString}{" "}
        </span>
        in the format of{" "}
        <span
          className={`hydrology__bold ${
            formError && dateError ? "hydrology__bold--red" : ""
          }`}
        >
          YYYY-MM-DD
        </span>
        .
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
              formError && !startDate
                ? "hydrology__startDate-add--inactive"
                : ""
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
              formError && !endDate ? "hydrology__endDate-add--inactive" : ""
            }`}
          ></input>
          <div
            className={`hydrology__form-warning ${
              formError && dateError ? "hydrology__form-warning--display" : ""
            }`}
          >
            <p className="hydrology__form-message">
              * Please check the date range and its format. *
            </p>
          </div>
          <div
            className={`hydrology__form-warning ${
              formError && (!endDate || !startDate)
                ? "hydrology__form-warning--display"
                : ""
            }`}
          >
            <p className="hydrology__form-message">
              * This field is required *
            </p>
          </div>
        </div>

        <div className="hydrology__results-selection">
          <h2 className="hydrology__chart-selection-label">
            Select one group of data you want to see:
          </h2>
          <div className="hydrology__results">
            <label>
              <input
                type="radio"
                name="dataSelection"
                value="check flow rate"
                onChange={() => setSelectedOption("check flow rate")}
                className="hydrology__results-options"
              />
              <span className="hydrology__option-content">
                Check flow rate only
              </span>
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
              <span className="hydrology__option-content">Check all data</span>
            </label>
          </div>
          <div
            className={`hydrology__form-warning ${
              formError && !selectedOption
                ? "hydrology__form-warning--display"
                : ""
            }`}
          >
            <p className="hydrology__form-message">
              * This field is required *
            </p>
          </div>
        </div>

        <div className="hydrology__button-container">
          <button className="hydrology__button">Confirm</button>
          <button className="hydrology__cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default SelectedSitePage;
