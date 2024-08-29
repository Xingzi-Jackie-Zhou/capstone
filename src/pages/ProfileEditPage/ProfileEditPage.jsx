import "./ProfileEditPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProfileEditPage() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const userNameId = sessionStorage.getItem("username");
  const profileUrl = `${baseUrl}/users/${userNameId}/profile`;

  const token = sessionStorage.getItem("token");
  const { siteId } = useParams();
  const navigate = useNavigate();

  const [siteData, setSiteData] = useState("");
  const [cityData, setCityData] = useState("");
  const [dischargeData, setDischargeData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const [formError, setFormError] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [siteIdentification, setSiteIdentification] = useState(siteId);
  const [riverName, setRiverName] = useState("");
  const [cityName, setCityName] = useState("");
  const [climateId, setClimateId] = useState("");

  useEffect(() => {
    async function fetchSiteData() {
      try {
        const response = await axios.get(`${profileUrl}/sites/${siteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSiteData(response.data.site);
        setCityData(response.data.city);
        setDischargeData(response.data.discharge);
        setWeatherData(response.data.weather);

        setSiteName(siteData.site_name);
        setSiteIdentification(siteData.site_id);
        setRiverName(siteData.river);
        setCityName(cityData.weather_site);
        setClimateId(siteData.site_name);
      } catch (error) {
        console.error("Error fetching site data:", error);
      }
    }

    fetchSiteData();
  }, [profileUrl, siteId, token]);
  console.log(siteData, cityData);
  if (!siteData) {
    return <div>Loading...</div>;
  }

  const handleCancel = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate(`/users/${userNameId}/profile`);
    } else {
      navigate("/users/login");
    }
  };

  const isFormValid = () => {
    if (
      !siteName ||
      !siteIdentification ||
      !riverName ||
      !cityName ||
      !climateId
    ) {
      setFormError(true);
      return false;
    }
    if (siteIdentification !== siteId) {
      setFormError(true);
      return false;
    }

    setFormError(false);
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValid = isFormValid();
    if (formValid) {
      try {
        const body = {
          siteName: siteName,
          siteIdentification: siteIdentification,
          riverName: riverName,
          cityName: cityName,
          climateId: climateId,
        };
        await axios.put(`${profileUrl}/sites/${siteId}/edit`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error updating site data:", error);
      }
    }
  };

  return (
    <div className="edit">
      <h1>Edit Site</h1>
      <div className="site-info">
        <h2>Site Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="edit__text-container">
            <label type="text" id="siteName" name="siteName" htmlFor="siteName">
              Site Name:
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              onChange={(e) => setSiteName(e.target.value)}
              value={siteName}
              className={`edit-inventory__siteName-add ${
                siteName ? "" : "edit-inventory__siteName-add--inactive"
              }`}
            />
            <div
              className={`edit-inventory__form-warning ${
                formError && !siteName
                  ? "edit-inventory__form-warning--display"
                  : ""
              }`}
            >
              <p className="form__message">This field is required</p>
            </div>
          </div>

          <div className="edit__text-container">
            <label
              type="text"
              id="siteIdentification"
              name="siteIdentification"
              htmlFor="siteIdentification"
            >
              Site id:
            </label>
            <input
              type="text"
              id="siteIdentification"
              name="siteIdentification"
              onChange={(e) => setSiteIdentification(e.target.value)}
              value={siteIdentification}
              className={`edit-inventory__siteIdentification-add ${
                siteIdentification
                  ? ""
                  : "edit-inventory__siteIdentification-add--inactive"
              }`}
            />
            <div
              className={`edit-inventory__form-warning ${
                formError && !siteIdentification
                  ? "edit-inventory__form-warning--display"
                  : ""
              }`}
            >
              <p className="form__message">This field is required</p>
            </div>
          </div>

          <div className="edit__text-container">
            <label
              type="text"
              id="riverName"
              name="riverName"
              htmlFor="riverName"
            >
              River name:
            </label>
            <input
              type="text"
              id="riverName"
              name="riverName"
              onChange={(e) => setRiverName(e.target.value)}
              value={riverName}
              className={`edit-inventory__riverName-add ${
                riverName ? "" : "edit-inventory__riverName-add--inactive"
              }`}
            />
            <div
              className={`edit-inventory__form-warning ${
                formError && !riverName
                  ? "edit-inventory__form-warning--display"
                  : ""
              }`}
            >
              <p className="form__message">This field is required</p>
            </div>
          </div>

          <div className="edit__text-container">
            <label type="text" id="cityName" name="cityName" htmlFor="cityName">
              City name:
            </label>
            <input
              type="text"
              id="cityName"
              name="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
              className={`edit-inventory__cityName-add ${
                cityName ? "" : "edit-inventory__cityName-add--inactive"
              }`}
            />
            <div
              className={`edit-inventory__form-warning ${
                formError && !cityName
                  ? "edit-inventory__form-warning--display"
                  : ""
              }`}
            >
              <p className="form__message">This field is required</p>
            </div>
          </div>

          <div className="edit__text-container">
            <label
              type="text"
              id="climateId"
              name="climateId"
              htmlFor="climateId"
            >
              Climate id:
            </label>
            <input
              type="text"
              id="climateId"
              name="climateId"
              onChange={(e) => setClimateId(e.target.value)}
              value={climateId}
              className={`edit-inventory__climateId-add ${
                climateId ? "" : "edit-inventory__climateId-add--inactive"
              }`}
            />
            <div
              className={`edit-inventory__form-warning ${
                formError && !climateId
                  ? "edit-inventory__form-warning--display"
                  : ""
              }`}
            >
              <p className="form__message">This field is required</p>
            </div>
          </div>

          <button type="submit">Update</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>

      <h2>Discharge Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Discharge</th>
            <th>Water Level</th>
          </tr>
        </thead>
        <tbody>
          {dischargeData.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.discharge}</td>
              <td>{record.water_level}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Weather Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>Precipitation</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.ave_temperature}</td>
              <td>{record.total_preciptation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfileEditPage;
