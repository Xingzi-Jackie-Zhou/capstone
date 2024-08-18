import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  const clickSite = () => {
    navigate("/sites");
  };
  const clickRiver = () => {
    navigate("/rivers");
  };
  const clickUpload = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/users/upload");
    } else {
      navigate("/users/login");
    }
  };
  const clickPredict = () => {
    navigate("/prediction");
  };
  return (
    <div className="directory">
      <div className="directory__hero-section">
        <p className="directory__theme">
          Effortlessly search and visualize river flow rates for clear,
          actionable insights.
        </p>
        <p className="directory__author">Wrote by ChatGPT</p>
      </div>
      <div className="directory__functions">
        <div className="directory__find">
          <div className="directory__button-container">
            <button className="directory__find-site" onClick={clickSite}>
              Find by Site
            </button>
          </div>
          <div className="directory__button-container">
            <button className="directory__find-river" onClick={clickRiver}>
              Find by river
            </button>
          </div>
          <div className="directory__button-container">
            <button className="directory__upload-site" onClick={clickUpload}>
              Upload a site
            </button>
          </div>
        </div>
        <div className="directory__prediction">
          <button className="directory__predict-site" onClick={clickPredict}>
            Predict Flow Rate for Current Year
          </button>
        </div>
        {/* <div className="directory__site-map">
     
      </div> */}
      </div>
    </div>
  );
}

export default HomePage;
