import "./SelectedRiverPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SelectedRiverPage() {
  const { riverName } = useParams();
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [siteList, setSiteList] = useState([]);

  async function fetchSitesList() {
    try {
      const response = await axios.get(`${baseApiUrl}/rivers/${riverName}`);
      const results = response.data;
      setSiteList(results);
      console.log(results);
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
      <h2>River name: {riverName}</h2>
      <p>
        A total of {numberOfSite} gauge sites were found on the river. Please
        select the site you are interested in below.
      </p>
      <ul>
        {siteList?.map((site) => (
          <li className="river-site__site-details" key={site.id}>
            <Link
              className="river-site__site-link"
              to={`/sites/${site.site_id}`}
              state={{ site_id: site.site_id, site_name: site.site_name }}
            >
              <span>{site.site_name.toLowerCase()}</span> with station id
              {site.site_id}
            </Link>
          </li>
        ))}
      </ul>
      <Link className="river-site__river-link" to={`/rivers`}>
        <p>Return to previous page</p>
      </Link>
    </section>
  );
}

export default SelectedRiverPage;
