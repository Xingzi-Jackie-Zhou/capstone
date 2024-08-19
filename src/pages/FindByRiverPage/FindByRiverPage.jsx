import "./FindByRiverPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function FindByRiverPage() {
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [riverNames, setRiverNames] = useState([]);
  const [selectRiver, setSelectRiver] = useState("");
  const [formError, setFormError] = useState(false);

  const userNameId = sessionStorage.getItem("username");
  async function fetchRiverList() {
    try {
      const token = sessionStorage.getItem("token");
      if (userNameId) {
        const userResponse = await axios.get(
          `${baseApiUrl}/users/${userNameId}/rivers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userRivers = userResponse.data;
        const combinedRivers = userRivers;
        console.log("combined river List", combinedRivers);
        const uniqueRiverNames = [
          ...new Set(combinedRivers?.map((item) => item.river)),
        ];
        setRiverNames(uniqueRiverNames);
        console.log(uniqueRiverNames);
        console.log(riverNames);
      } else {
        const response = await axios.get(`${baseApiUrl}/rivers`);
        const defaultRivers = response.data;
        const uniqueRiverNames = [
          ...new Set(defaultRivers.map((item) => item.river)),
        ];
        setRiverNames(uniqueRiverNames);
        console.log(uniqueRiverNames);
        console.log("default", riverNames);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRiverList();
  }, []);

  const isFormValid = () => {
    if (!selectRiver) {
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
      if (userNameId) {
        navigate(`/users/${userNameId}/rivers/${selectRiver}`);
      } else {
        navigate(`/rivers/${selectRiver}`);
      }
    }
  };
  const clickSite = () => {
    if (userNameId) {
      navigate(`/users/${userNameId}/sites`);
    } else {
      navigate("/sites");
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="river-page">
      <h2>Find gauge site by select a river:</h2>
      <form className="river-page__form" onSubmit={handleSubmit}>
        <label className="river-page__label" htmlFor="river">
          River categories :
        </label>
        <select
          id="selectRiver"
          name="selectRiver"
          onChange={(e) => setSelectRiver(e.target.value)}
          value={selectRiver}
          className={`river-page__river-add ${
            !formError ? "" : "river-page__river-add--inactive"
          }`}
        >
          <option value="" disabled>
            Please select a river
          </option>
          {riverNames &&
            riverNames?.map((riverName) => (
              <option
                className="river-page__river-options"
                key={riverName}
                value={riverName}
              >
                {riverName}
              </option>
            ))}
        </select>
        <div
          className={`river-page__form-warning ${
            formError ? "river-page__form-warning--display" : ""
          }`}
        >
          <p className="river-page__form-message">* This field is required *</p>
        </div>

        <div className="river-page__button-container">
          <button className="river-page__button">confirm</button>
          <button className="river-page__cancel-button" onClick={handleCancel}>
            cancel
          </button>
        </div>
      </form>
      <div className="river-page__button-container">
        <button className="river-page__button" onClick={clickSite}>
          Find by site
        </button>
      </div>
    </div>
  );
}

export default FindByRiverPage;
