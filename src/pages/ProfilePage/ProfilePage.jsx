import axios from "axios";
import { useState, useEffect } from "react";

function ProfilePage() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const profileUrl = `${baseUrl}/users/profile`;

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
    // Remember to include the token in Authorization header
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
    fetchProfile();
  }, []);

  return isLoading ? <h1>Loading...</h1> : <h1>Welcome {profile.userName}!</h1>;
}

export default ProfilePage;
