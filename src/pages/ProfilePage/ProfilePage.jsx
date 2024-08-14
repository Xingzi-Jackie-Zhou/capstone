import axios from "axios";
import { useState, useEffect } from "react";

const baseUrl = "http://localhost:8080";
const profileUrl = `${baseUrl}/profile`;

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const token = sessionStorage.getItem("authToken");

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
        setUserInfo(response.data);
        console.log(response);
      } catch (error) {
        // sessionStorage.removeItem("authToken");
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  return isLoading ? <h1>Loading...</h1> : <h1>Welcome {userInfo.name}!</h1>;
}

export default ProfilePage;
