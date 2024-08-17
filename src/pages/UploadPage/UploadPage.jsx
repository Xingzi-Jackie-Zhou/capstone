import { useState } from "react";
import axios from "axios";
import "./UploadPage.scss";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [dischargeFile, setDischargeFile] = useState(null);
  const [weatherFile, setWeatherFile] = useState(null);
  const [siteName, setSiteName] = useState("");
  const [river, setRiver] = useState("");
  const [city, setCity] = useState("");

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "discharge") setDischargeFile(files[0]);
    if (name === "weather") setWeatherFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("discharge", dischargeFile);
      formData.append("weather", weatherFile);
      formData.append("site_name", siteName);
      formData.append("river", river);
      formData.append("city", city);
      const userNameId = sessionStorage.getItem("userName");

      await axios.post(`${baseUrl}/users/${userNameId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/users/profile");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="upload-Page">
      <h2 className="upload-Page__header">Upload Data</h2>
      <form className="upload-Page__form" onSubmit={handleSubmit}>
        <div className="upload-Page__content-discharge">
          <label className="upload-Page__discharge-label" htmlFor="discharge">
            Step 1: upload discharge.csv file here
          </label>
          <input
            className="upload-Page__content"
            type="file"
            id="discharge"
            name="discharge"
            accept=".csv"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="upload-Page__content-weather">
          <label className="upload-Page__weather-label" htmlFor="weather">
            Step 2: upload weather.csv file here
          </label>
          <input
            className="upload-Page__content"
            type="file"
            id="weather"
            name="weather"
            accept=".csv"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="upload-Page__content-site">
          <label className="upload-Page__site-label" htmlFor="site">
            Step 3: site name
          </label>
          <input
            className="upload-Page__content"
            type="text"
            id="site"
            name="site"
            placeholder="Site Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            required
          />
        </div>
        <div className="upload-Page__content-site">
          <label className="upload-Page__discharge-label" htmlFor="riverName">
            Step 4: river name. (e.g., river name BoW River, then type in Bow
            here)
          </label>
          <input
            className="upload-Page__content"
            type="text"
            id="riverName"
            name="riverName"
            placeholder="River"
            value={river}
            onChange={(e) => setRiver(e.target.value)}
            required
          />
        </div>
        <div className="upload-Page__content-site">
          <label className="upload-Page__discharge-label" htmlFor="cityId">
            Step 5: city Id (city Id is the climate_id in weather.csv)
          </label>
          <input
            className="upload-Page__content"
            type="text"
            id="cityId"
            name="cityId"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="upload-Page__content-site">
          <p>
            Last step: Click upload button to upload a site to your account.
          </p>
          <button className="upload-Page__button" type="submit">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
