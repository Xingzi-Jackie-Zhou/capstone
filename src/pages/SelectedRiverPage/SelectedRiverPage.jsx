import "./SelectedRiverPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SelectedRiverPage() {
  const { riverName } = useParams();
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [siteList, setSiteList] = useState([]);

  const userNameId = sessionStorage.getItem("username");
  async function fetchSitesList() {
    try {
      const token = sessionStorage.getItem("token");
      if (userNameId) {
        const userResponse = await axios.get(
          `${baseApiUrl}/users/${userNameId}/rivers/${riverName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userResults = userResponse.data;
        setSiteList(userResults);
        console.log("combined results List", userResults);
      } else {
        const defaultResponse = await axios.get(
          `${baseApiUrl}/rivers/${riverName}`
        );
        const defaultResults = defaultResponse.data;
        setSiteList(defaultResults);
        console.log(defaultResults);
      }
    } catch (error) {
      console.error("Getting site list error:", error);
    }
  }

  useEffect(() => {
    fetchSitesList();
  }, []);

  const numberOfSite = siteList.length;

  return (
    <section className="river-site">
      <h2 className="river-site__sub-title">River name: {riverName} River</h2>
      <p className="river-site__conclusion">
        A total of {numberOfSite} gauge sites were found on the river. Please
        select the site you are interested in below.
      </p>
      <ul className="river-site__site-list">
        {siteList?.map((site) => (
          <li className="river-site__site-details" key={site.id}>
            <Link
              className="river-site__site-link"
              to={`/sites/${site.site_id}`}
              state={{ site_id: site.site_id, site_name: site.site_name }}
            >
              <span className="river-site__style">
                {site.site_name.toLowerCase()}
              </span>{" "}
              with station id {site.site_id}
            </Link>
          </li>
        ))}
      </ul>
      <Link className="river-site__river-link" to={`/rivers`}>
        <p>Return to previous page</p>
      </Link>
      <Link className="river-site__river-link" to={`/sites`}>
        <button className="river-site__button">Find by site</button>
      </Link>
    </section>
  );
}

export default SelectedRiverPage;
