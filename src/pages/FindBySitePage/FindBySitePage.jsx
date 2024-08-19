import "./FindBySitePage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FindBySitePage() {
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [siteNames, setSiteNames] = useState([]);
  const [siteIds, setSiteIds] = useState([]);
  const [selectSite, setSelectSite] = useState("");
  const [selectId, setSelectId] = useState("");
  const [formError, setFormError] = useState(false);
  const [siteNameIdMap, setSiteNameIdMap] = useState({});
  const [siteIdNameMap, setSiteIdNameMap] = useState({});

  const userNameId = sessionStorage.getItem("username");

  async function fetchSiteList() {
    try {
      const token = sessionStorage.getItem("token");
      if (userNameId) {
        const userResponse = await axios.get(
          `${baseApiUrl}/users/${userNameId}/sites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userResults = userResponse.data;

        const nameIdMap = {};
        userResults.forEach((site) => {
          if (!nameIdMap[site.site_name]) {
            nameIdMap[site.site_name] = site.site_id;
          }
        });

        const idNameMap = {};
        userResults.forEach((site) => {
          if (!idNameMap[site.site_id]) {
            idNameMap[site.site_id] = site.site_name;
          }
        });

        setSiteNameIdMap(nameIdMap);
        setSiteIdNameMap(idNameMap);

        const uniqueSiteNames = [
          ...new Set(userResults.map((site) => site.site_name)),
        ];
        const uniqueSiteIds = [
          ...new Set(userResults.map((site) => site.site_id)),
        ];

        setSiteNames(uniqueSiteNames);
        setSiteIds(uniqueSiteIds);
      } else {
        const response = await axios.get(`${baseApiUrl}/sites`);
        const defaultResults = response.data;
        const nameIdMap = {};
        defaultResults.forEach((site) => {
          if (!nameIdMap[site.site_name]) {
            nameIdMap[site.site_name] = site.site_id;
          }
        });

        const idNameMap = {};
        defaultResults.forEach((site) => {
          if (!idNameMap[site.site_id]) {
            idNameMap[site.site_id] = site.site_name;
          }
        });

        setSiteNameIdMap(nameIdMap);
        setSiteIdNameMap(idNameMap);

        const uniqueSiteNames = [
          ...new Set(defaultResults.map((site) => site.site_name)),
        ];
        const uniqueSiteIds = [
          ...new Set(defaultResults.map((site) => site.site_id)),
        ];

        setSiteNames(uniqueSiteNames);
        setSiteIds(uniqueSiteIds);
      }
    } catch (error) {
      console.error("Getting site list error:", error);
    }
  }

  useEffect(() => {
    fetchSiteList();
  }, []);

  const isFormValid = () => {
    if (!selectSite && !selectId) {
      setFormError(true);
      return false;
    } else if (selectSite && selectId) {
      setFormError(true);
      setSelectSite("");
      setSelectId("");
      return false;
    } else {
      setFormError(false);
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValid = isFormValid();
    const idToNavigate = selectSite || siteIdNameMap[selectId];
    const siteToNavigate = selectId || siteNameIdMap[selectSite];
    if (formValid) {
      if (siteToNavigate && idToNavigate) {
        if (userNameId) {
          navigate(`/users/${userNameId}/sites/${siteToNavigate}`, {
            state: { site_name: idToNavigate },
          });
        } else {
          navigate(`/sites/${siteToNavigate}`, {
            state: { site_name: idToNavigate },
          });
        }
      }
    }
  };
  const clickRiver = () => {
    if (userNameId) {
      navigate(`/users/${userNameId}/rivers`);
    } else {
      navigate("/rivers");
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="site-page">
      <h3>Find discharge by selecting a gauge site:</h3>
      <form className="site-page__form" onSubmit={handleSubmit}>
        <div>
          <div>
            <label className="site-page__label" htmlFor="selectSite">
              Gauge site name:
            </label>
            <select
              id="selectSite"
              name="selectSite"
              onChange={(e) => {
                setSelectSite(e.target.value);
              }}
              value={selectSite}
              className={`site-page__site-add ${
                !formError ? "" : "site-page__site-add--inactive"
              }`}
            >
              <option value="" disabled>
                Please select a gauge site
              </option>
              {siteNames?.map((siteName) => (
                <option
                  className="site-page__site-name-options"
                  key={siteName}
                  value={siteName}
                >
                  {siteName.toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <h3>OR</h3>
          <div>
            <label className="site-page__label" htmlFor="selectSiteId">
              Gauge site id:
            </label>
            <select
              id="selectSiteId"
              name="selectSiteId"
              onChange={(e) => setSelectId(e.target.value)}
              value={selectId}
              className={`site-page__site-add ${
                !formError ? "" : "site-page__site-add--inactive"
              }`}
            >
              <option className="site-page__option" value="" disabled>
                Please select a gauge site
              </option>
              {siteIds?.map((siteId) => (
                <option
                  className="site-page__site-id-options"
                  key={siteId}
                  value={siteId}
                >
                  {siteId}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className={`site-page__form-warning ${
            formError ? "site-page__form-warning--display" : ""
          }`}
        >
          <p className="site-page__form-message">
            * Please select a gauge site by either site name or station id. *
          </p>
        </div>

        <div className="site-page__button-container">
          <button className="site-page__button">Confirm</button>
          <button className="site-page__cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      <div className="site-page__button-container">
        <button className="site-page__button" onClick={clickRiver}>
          Find by river
        </button>
      </div>
    </div>
  );
}

export default FindBySitePage;
