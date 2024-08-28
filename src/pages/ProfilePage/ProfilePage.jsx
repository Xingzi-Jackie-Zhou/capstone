import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

function ProfilePage() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;
  const userNameId = sessionStorage.getItem("username");
  //const userId = sessionStorage.getItem("id");
  //console.log(userId);
  const profileUrl = `${baseUrl}/users/${userNameId}/profile`;

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [sites, setSites] = useState([]);
  const token = sessionStorage.getItem("token");
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const fetchProfile = async () => {
    try {
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserSite = async () => {
    try {
      const sitesResponse = await axios.get(`${profileUrl}/sites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSites(sitesResponse.data);
    } catch (error) {
      console.error("Failed to fetch sites:", error);
    }
  };

  useEffect(() => {
    if (userNameId) {
      fetchProfile();
      fetchUserSite();
    } else {
      navigate("/users/login");
    }
  }, [userNameId, profileUrl]);

  const clickUpload = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate(`/users/${userNameId}/upload`);
    } else {
      navigate("/users/login");
    }
  };

  const handleSiteClick = (id, name) => {
    if (userNameId) {
      navigate(`/users/${userNameId}/sites/${id}`, {
        state: { site_name: name },
      });
    } else {
      navigate(`/sites/${id}`, {
        state: { site_name: name },
      });
    }
  };

  const handleEdit = (siteId) => {
    navigate(`/users/${userNameId}/profile/sites/${siteId}/edit`);
  };

  const openDeleteModal = (siteId) => {
    setIsDeleteVisible(true);
    setDeleteId(siteId);
  };

  const closeDeleteModal = () => {
    setIsDeleteVisible(false);
  };
  const handleDelete = async (siteId) => {
    try {
      await axios.delete(
        `${baseUrl}/users/${userNameId}/profile/sites/${siteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Remove the site from the local state
      setSites(sites.filter((site) => site.site_id !== siteId));
    } catch (error) {
      console.error("Failed to delete site:", error);
    }
  };

  return isLoading ? (
    <h2 className="profile-page__title">Loading...</h2>
  ) : (
    <div className="profile-page">
      <h2 className="profile-page__title">Welcome {profile.username}!</h2>
      <div>
        {sites && sites.length > 0 ? (
          <h3 className="profile-page__subtitle">The site you uploaded:</h3>
        ) : (
          <h3 className="profile-page__subtitle">
            You currently have no personal site uploaded.
          </h3>
        )}
        <ul className="profile-page__site-list">
          {sites?.map((site) => (
            <li className="profile-page__site-container" key={site.id}>
              <p
                className="profile-page__site-details"
                onClick={() => handleSiteClick(site.site_id, site.site_name)}
              >
                {site.site_name.toLowerCase()} with station id {site.site_id}
              </p>
              <button
                className="profile-page__button-edit"
                onClick={() => handleEdit(site.site_id)}
              >
                Edit
              </button>
              <button
                className="profile-page__button-delete"
                onClick={() => {
                  openDeleteModal(site.site_id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="profile-page__button-container">
        <button className="profile-page__button-upload" onClick={clickUpload}>
          Upload a site
        </button>
      </div>
      <DeleteModal
        isVisible={isDeleteVisible}
        onClose={closeDeleteModal}
        handleDelete={handleDelete}
        deleteId={deleteId}
      />
    </div>
  );
}

export default ProfilePage;
