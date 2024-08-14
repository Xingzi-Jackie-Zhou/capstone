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
    navigate("/upload");
  };
  const clickPredict = () => {
    navigate("/prediction");
  };
  return (
    <div className="directory">
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
  );
}

export default HomePage;
