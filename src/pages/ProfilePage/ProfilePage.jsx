import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";

function ProfilePage() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;
  const userNameId = sessionStorage.getItem("username");
  console.log(userNameId);
  const profileUrl = `${baseUrl}/users/${userNameId}/profile`;

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  //const [sites, setSites] = useState([]);
  const token = sessionStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setProfile(response.data);
      console.log(response);
    } catch (error) {
      //sessionStorage.removeItem("token");
      console.error(error);
    }
  };

  // const fetchUserSite = async () => {
  //   try {
  //     // Fetch user's sites
  //     const sitesResponse = await axios.get(`${baseUrl}/users/sites/siteId`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setSites(sitesResponse.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchProfile();
  }, [profileUrl]);

  // useEffect(() => {
  //   fetchUserSite();
  // }, [siteId]);

  // const handleSiteClick = (siteId) => {
  //   // Handle site button click (e.g., navigate to site details page)
  // };

  const clickUpload = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate(`/users/${userNameId}/upload`);
    } else {
      navigate("/users/login");
    }
  };

  return isLoading ? (
    <h2 className="profile-page__title">Loading...</h2>
  ) : (
    <div className="profile-page">
      <h2 className="profile-page__title">Welcome {profile.username}!</h2>
      <div>
        <h3 className="profile-page__subtitle">The site you uploaded:</h3>
        {/* {sites?.map((site) => (
          <button
            key={site.id}
            onClick={() => handleSiteClick(site.station_id)}
          >
            {site.site_name}
          </button>
        ))} */}
      </div>
      <div className="profile-page__button-container">
        <button className="profile-page__button" onClick={clickUpload}>
          Upload a site
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
