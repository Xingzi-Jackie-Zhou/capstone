import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header/Header.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";

import FindByRiverPage from "./pages/FindByRiverPage/FindByRiverPage.jsx";
import FindBySitePage from "./pages/FindBySitePage/FindBySitePage.jsx";
import SelectedRiverPage from "./pages/SelectedRiverPage/SelectedRiverPage.jsx";
import SelectedSitePage from "./pages/SelectedSitePage/SelectedSitePage.jsx";
import ResultPage from "./pages/ResultPage/ResultPage.jsx";

import PredictionPage from "./pages/PredictionPage/PredictionPage.jsx";
import UploadPage from "./pages/UploadPage/UploadPage.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/signup" element={<SignupPage />} />
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/:userNameId/profile" element={<ProfilePage />} />
          <Route path="/users/:userNameId/upload" element={<UploadPage />} />

          <Route path="/sites" element={<FindBySitePage />} />
          <Route path="/users/:userNameId/sites" element={<FindBySitePage />} />

          <Route path="/sites/:siteId" element={<SelectedSitePage />} />
          <Route
            path="/users/:userNameId/sites/:siteId"
            element={<SelectedSitePage />}
          />
          <Route
            path="/sites/:siteId/flowRates/selectedDate"
            element={<ResultPage />}
          />
          <Route
            path="/sites/:siteId/allData/selectedDate"
            element={<ResultPage />}
          />
          <Route path="/rivers" element={<FindByRiverPage />} />
          <Route
            path="/users/:userNameId/rivers"
            element={<FindByRiverPage />}
          />
          <Route path="/rivers/:riverName" element={<SelectedRiverPage />} />
          <Route
            path="/users/:userNameId/rivers/:riverName"
            element={<SelectedRiverPage />}
          />
          <Route path="/prediction" element={<PredictionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
