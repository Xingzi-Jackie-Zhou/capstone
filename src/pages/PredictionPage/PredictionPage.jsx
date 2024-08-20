import "./PredictionPage.scss";
import { Link } from "react-router-dom";

function PredictionPage() {
  return (
    <div className="prediction-page">
      <h2>Prediction Page</h2>
      <p>We are still working on building the page.</p>
      <Link className="prediction-page__return-link" to={`/`}>
        <button className="prediction-page__return-button">
          Return to home page
        </button>
      </Link>
    </div>
  );
}

export default PredictionPage;
