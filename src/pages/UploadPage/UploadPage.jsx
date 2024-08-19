import { useState } from "react";
import axios from "axios";
import "./UploadPage.scss";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const userNameId = sessionStorage.getItem("username");
  // const userId = sessionStorage.getItem("id");
  const [dischargeFile, setDischargeFile] = useState(null);
  const [weatherFile, setWeatherFile] = useState(null);
  const [siteName, setSiteName] = useState("");
  const [river, setRiver] = useState("");
  const [city, setCity] = useState("");
  const [stationId, setStationId] = useState("");
  const [climateId, setClimateId] = useState("");

  const [formError, setFormError] = useState(false);

  const isUploadValid = async () => {
    if (
      !dischargeFile ||
      !weatherFile ||
      !siteName ||
      !stationId ||
      !river ||
      !city ||
      !climateId
    ) {
      setFormError(true);
      return false;
    } else {
      setFormError(false);
    }
    return true;
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "discharge") setDischargeFile(files[0]);
    if (name === "weather") setWeatherFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadValid = isUploadValid();
    if (uploadValid) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("discharge", dischargeFile);
        formData.append("weather", weatherFile);
        formData.append("siteName", siteName);
        formData.append("stationId", stationId);
        formData.append("riverName", river);
        formData.append("city", city);
        formData.append("climateId", climateId);
        const userNameId = sessionStorage.getItem("username");

        await axios.post(`${baseUrl}/users/${userNameId}}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        navigate(`/users/${userNameId}/profile`);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };
  const handleCancel = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate(`/users/${userNameId}/profile`);
    } else {
      navigate("/users/login");
    }
  };
  return (
    <div className="upload-page">
      <h2 className="upload-page__header">Upload Data</h2>
      <form className="upload-page__form" onSubmit={handleSubmit}>
        <div className="upload-page__content-container">
          <p className="upload-page__step-text">
            {" "}
            Step 1: upload discharge.csv file here.
          </p>
          <label className="upload-page__content-label" htmlFor="discharge">
            Discharge file:
          </label>
          <input
            className={`upload-page__content ${
              formError && !dischargeFile
                ? "upload-page__content--inactive"
                : ""
            }`}
            type="file"
            id="discharge"
            name="discharge"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        <div className="upload-page__content-contanier">
          <p className="upload-page__step-text">
            Step 2: upload weather.csv file here.
          </p>
          <label className="upload-page__content-label" htmlFor="weather">
            Weather file:
          </label>
          <input
            className={`upload-page__content ${
              formError && !weatherFile ? "upload-page__content--inactive" : ""
            }`}
            type="file"
            id="weather"
            name="weather"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        <div className="upload-page__content-contanier">
          <p className="upload-page__step-text">
            Step 3: enter the site name and site id.
          </p>
          <label className="upload-page__content-label" htmlFor="site">
            Site name:
          </label>
          <input
            className={`upload-page__content upload-page__content--add  ${
              formError && !siteName ? "upload-page__content--inactive" : ""
            }`}
            type="text"
            id="site"
            name="site"
            placeholder="Site name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
          <label className="upload-page__content-label" htmlFor="site-id">
            Site id:
          </label>
          <input
            className={`upload-page__content ${
              formError && !stationId ? "upload-page__content--inactive" : ""
            }`}
            type="text"
            id="site-id"
            name="site-id"
            placeholder="Station id"
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
          />
        </div>
        <div className="upload-page__content--contanier">
          <p className="upload-page__step-text">
            {" "}
            Step 4: river name. (e.g., enther Bow for river BoW River).
          </p>
          <label className="upload-page__content-label" htmlFor="riverName">
            River name:
          </label>
          <input
            className={`upload-page__content ${
              formError && !river ? "upload-page__content--inactive" : ""
            }`}
            type="text"
            id="riverName"
            name="riverName"
            placeholder="River"
            value={river}
            onChange={(e) => setRiver(e.target.value)}
          />
        </div>
        <div className="upload-page__content--contanier">
          <p className="upload-page__step-text">
            {" "}
            Step 5: city name and Id (city Id is the climate_id in weather.csv).
          </p>
          <label className="upload-page__content-label" htmlFor="city">
            City name:
          </label>
          <input
            className={`upload-page__content upload-page__content--add ${
              formError && !city ? "upload-page__content--inactive" : ""
            }`}
            type="text"
            id="city"
            name="city"
            placeholder="City name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label className="upload-page__content-label" htmlFor="city-id">
            City id:
          </label>
          <input
            className={`upload-page__content ${
              formError && !climateId ? "upload-page__content--inactive" : ""
            }`}
            type="text"
            id="city-id"
            name="city-id"
            placeholder="City id"
            value={climateId}
            onChange={(e) => setClimateId(e.target.value)}
          />
        </div>
        <div
          className={`upload-page__form-warning ${
            formError ? "upload-page__form-warning--display" : ""
          }`}
        >
          <p className="upload-page__form-message">
            * Please check your input and ensure all fields are correct. *
          </p>
        </div>
        <p className="upload-page__upload-description">
          Last step: Click upload button to upload a site to your account.
        </p>
        <div className="upload-page__button-contanier">
          <button className="upload-page__button" type="submit">
            Upload
          </button>
          <button className="upload-page__cancel-button" onClick={handleCancel}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
