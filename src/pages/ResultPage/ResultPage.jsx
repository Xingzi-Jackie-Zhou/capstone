import "./ResultPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import FlowRates from "../../components/FlowRates/FlowRates.jsx";
import AllData from "../../components/AllData/AllData.jsx";

function ResultPage() {
  const { siteId } = useParams();
  const location = useLocation();
  const { state } = location;
  const startDate = state?.startDate; //take from find a site page
  const endDate = state?.endDate;
  const selectedOption = state?.selectedOption;
  const idInUse = state?.idInUse;
  const siteNameInUse = state?.siteNameInUse;

  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [dataList, setDataList] = useState([]);

  console.log("selectOption", selectedOption);
  async function fetchDataList() {
    try {
      const url =
        selectedOption === "check flow rate"
          ? `${baseApiUrl}/sites/${siteId}/flowRates/selectedDate`
          : `${baseApiUrl}/sites/${siteId}/allData/selectedDate`;

      // Fetch the data from the API
      const response = await axios.get(url);
      console.log(response);
      // Filter data based on startDate and endDate
      const start = new Date(startDate + "T00:00:00Z"); // start of the day in UTC
      const end = new Date(endDate + "T23:59:59Z"); // end of the day in UTC
      const selectedData = response.data.filter((item) => {
        const itemDate = new Date(item.date || item.discharge_date);
        console.log(itemDate);
        return itemDate >= start && itemDate <= end;
      });
      // Update the state with the fetched data
      setDataList(selectedData);
      console.log(selectedData);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  }

  useEffect(() => {
    fetchDataList();
  }, []);

  const renderContent = () => {
    switch (selectedOption) {
      case "check flow rate":
        return (
          <FlowRates
            startDate={startDate}
            endDate={endDate}
            dataList={dataList}
            idInUse={idInUse}
            siteNameInUse={siteNameInUse}
          />
        );
      case "check all data":
        return (
          <AllData
            startDate={startDate}
            endDate={endDate}
            dataList={dataList}
            idInUse={idInUse}
            siteNameInUse={siteNameInUse}
          />
        );
      default:
        return <p>No option selected.</p>;
    }
  };

  return (
    <div className="result-page">
      <h1>Results </h1>
      {renderContent()}
    </div>
  );
}

export default ResultPage;
