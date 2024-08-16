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
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("discharge", dischargeFile);
      formData.append("weather", weatherFile);
      formData.append("site_name", siteName);
      formData.append("river", river);
      formData.append("city", city);

      await axios.post(`${baseUrl}/users/upload`, formData, {
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
        <input
          className="upload-Page__content"
          type="file"
          name="discharge"
          accept=".csv"
          onChange={handleFileChange}
          required
        />
        <input
          className="upload-Page__content"
          type="file"
          name="weather"
          accept=".csv"
          onChange={handleFileChange}
          required
        />
        <input
          className="upload-Page__content"
          type="text"
          placeholder="Site Name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          required
        />
        <input
          className="upload-Page__content"
          type="text"
          placeholder="River"
          value={river}
          onChange={(e) => setRiver(e.target.value)}
          required
        />
        <input
          className="upload-Page__content"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button className="upload-Page__button" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
