import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header/Header.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginAndSignup from "./pages/LoginAndSignup/LoginAndSignup.jsx";
import FindByRiver from "./pages/FindByRiverPage/FindByRiverPage.jsx";
import FindBySite from "./pages/FindBySitePage/FindBySitePage.jsx";
import PredictionPage from "./pages/PredictionPage/PredictionPage.jsx";
import UploadPage from "./pages/UploadPage/UploadPage.jsx";
import SelectedRiverPage from "./pages/SelectedRiverPage/SelectedRiverPage.jsx";
import SelectedSitePage from "./pages/SelectedSitePage/SelectedSitePage.jsx";
import ResultPage from "./pages/ResultPage/ResultPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginAndSignup />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/sites" element={<FindBySite />} />
          <Route path="/sites/:siteId" element={<SelectedSitePage />} />
          <Route
            path="/sites/:siteId/flowRates/selectedDate"
            element={<ResultPage />}
          />
          <Route
            path="/sites/:siteId/allData/selectedDate"
            element={<ResultPage />}
          />
          <Route path="/rivers" element={<FindByRiver />} />
          <Route path="/rivers/:riverName" element={<SelectedRiverPage />} />
          <Route path="/prediction" element={<PredictionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
