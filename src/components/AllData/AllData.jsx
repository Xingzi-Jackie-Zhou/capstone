import "./AllData.scss";
import exportFromJSON from "export-from-json";
import FormatDate from "../../utility/FormatDate/FormatDate.jsx";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement, // Register PointElement if using points
  Filler,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Register components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement, // Register PointElement if you use points
  Filler
);

const AllData = ({ dataList, startDate, endDate, idInUse, siteNameInUse }) => {
  console.log(dataList);
  console.log(startDate);
  console.log(endDate);
  console.log(idInUse);
  console.log(siteNameInUse);

  // Calculate statistics
  const getStatistics = () => {
    if (dataList.length === 0)
      return {
        maxDischarge: 0,
        minDischarge: 0,
        avgDischarge: 0,
        maxLevel: 0,
        minLevel: 0,
        avgLevel: 0,
        maxTemp: 0,
        minTemp: 0,
        avgTemp: 0,
        maxPrep: 0,
        minPrep: 0,
        avgPrep: 0,
      };

    const discharges = dataList.map((item) => parseFloat(item.discharge));
    const maxDischarge = Math.max(...discharges);
    const minDischarge = Math.min(...discharges);
    const avgDischarge = (
      discharges.reduce((acc, val) => acc + val, 0) / discharges.length
    ).toFixed(2);

    const level = dataList.map((item) => parseFloat(item.water_level));
    const maxLevel = Math.max(...level);
    const minLevel = Math.min(...level);
    const avgLevel = (
      level.reduce((acc, val) => acc + val, 0) / level.length
    ).toFixed(2);

    const temp = dataList.map((item) => parseFloat(item.ave_temperature));
    const maxTemp = Math.max(...temp);
    const minTemp = Math.min(...temp);
    const avgTemp = (
      temp.reduce((acc, val) => acc + val, 0) / temp.length
    ).toFixed(2);

    const prep = dataList.map((item) => parseFloat(item.total_preciptation));
    const maxPrep = Math.max(...prep);
    const minPrep = Math.min(...prep);
    const avgPrep = (
      prep.reduce((acc, val) => acc + val, 0) / prep.length
    ).toFixed(2);

    return {
      maxDischarge,
      minDischarge,
      avgDischarge,
      maxLevel,
      minLevel,
      avgLevel,
      maxTemp,
      minTemp,
      avgTemp,
      maxPrep,
      minPrep,
      avgPrep,
    };
  };

  const {
    maxDischarge,
    minDischarge,
    avgDischarge,
    maxLevel,
    minLevel,
    avgLevel,
    maxTemp,
    minTemp,
    avgTemp,
    maxPrep,
    minPrep,
    avgPrep,
  } = getStatistics();

  // Download chart as PDF
  const downloadChart = () => {
    const chartElement = document.querySelector(
      ".result-page__chart-container"
    ); // Ensure your chart is inside this container
    html2canvas(chartElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 210, 277); // Margin, margin, imgWidth, imgHeight
      pdf.save(`chart_site${idInUse}.pdf`);
    });
  };

  // Data and options for the chart
  const chartData = {
    labels: dataList?.map((item) => FormatDate(item.discharge_date)), // X-axis labels
    datasets: [
      {
        label: "Discharge Rate",
        data: dataList?.map((item) => item.discharge),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: false,
      },
      {
        label: "Water Level",
        data: dataList?.map((item) => item.water_level),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: false,
      },
      {
        label: "Average Temperature",
        data: dataList?.map((item) => item.ave_temperature),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: false,
      },
      {
        label: "Total Precipitation",
        data: dataList?.map((item) => item.total_preciptation),
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Various Parameters Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: "#000000",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        grid: {
          display: true,
          drawBorder: true,
          color: "#e0e0e0",
          lineWidth: 1,
          drawOnChartArea: true,
          drawTicks: true,
          tickLength: 4,
        },
        ticks: {
          display: true,
          color: "#000000",
          font: {
            size: 12,
          },
          autoSkip: true,
          maxRotation: 90,
          minRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: "Value for parameters",
          color: "#000000",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        grid: {
          display: true,
          drawBorder: true,
          color: "#e0e0e0",
          lineWidth: 1,
          drawOnChartArea: true,
          drawTicks: true,
          tickLength: 4,
        },
        ticks: {
          display: true,
          color: "#000000",
          font: {
            size: 12,
          },
          autoSkip: true,
          maxRotation: 90,
          minRotation: 0,
        },
      },
    },
  };

  //download dataList as a csv file
  const downloadData = () => {
    const fileName = `download_${idInUse}_data`;
    const exportType = exportFromJSON.types.csv;
    console.log("DataList:", dataList);
    //   console.log("dataListArray", dataListArray);
    try {
      exportFromJSON({ data: dataList, fileName, exportType });
    } catch (error) {
      console.error("Export download failed:", error);
    }
  };

  return (
    <div className="result-page__container-all">
      <div className="result-page__chart-container">
        <p className="result-page__notice">
          * No chart avaliable in mobile view, please switch to tablet or
          laptop. *{" "}
        </p>
        <div className="result-page__chart">
          <Line data={chartData} options={options} />
        </div>
        <p className="result-page__chart-caption">
          <span className="result-page__bold result-page__bold--subheader">
            Figure caption :{" "}
          </span>{" "}
          Metrics over time period from {startDate} to {endDate} for site{" "}
          {idInUse}, {siteNameInUse}.
        </p>
        <div className="result-page__statistics-all">
          <div className="result-page__statistics-title">
            <p>Statistics</p>
            <p>Discharge (m³ s⁻¹)</p>
            <p>Water Level (m)</p>
            <p>Temperature (°C)</p>
            <p>Preciptation (mm)</p>
          </div>
          <div className="result-page__statistics-content">
            <p className="result-page__row-title">Max</p>
            <p className="result-page__content-all">
              <span className="result-page__note">Max Discharge: </span>
              {maxDischarge}
              <span className="result-page__unit"> m³ s⁻¹</span>
            </p>
            <p className="result-page__content-all">
              <span className="result-page__note">Max Water Level: </span>
              {maxLevel}
              <span className="result-page__unit"> m</span>
            </p>
            <p className="result-page__content-all">
              <span className="result-page__note">Max Temperature: </span>
              {maxTemp}
              <span className="result-page__unit"> °C</span>
            </p>
            <p className="result-page__content-all">
              <span className="result-page__note">Max Preciptation: </span>
              {maxPrep}
              <span className="result-page__unit"> mm</span>
            </p>
          </div>
          <div className="result-page__statistics-content">
            <p className="result-page__row-title">Min</p>
            <p className="result-page__content-all">
              <span className="result-page__note">Min Discharge: </span>
              {minDischarge}
              <span className="result-page__unit"> m³ s⁻¹</span>
            </p>
            <p className="result-page__content-all">
              <span className="result-page__note">Min Water Level: </span>
              {minLevel}
              <span className="result-page__unit"> m</span>
            </p>
            <p className="result-page__content-all">
              <span className="result-page__note">Min Temperature: </span>
              {minTemp}
              <span className="result-page__unit"> °C</span>
            </p>
            <p className="result-page__content-all">
              <span className="result-page__note">Min Preciptation: </span>
              {minPrep}
              <span className="result-page__unit"> mm</span>
            </p>
          </div>
          <div className="result-page__statistics-content">
            <p className="result-page__row-title">Mean</p>
            <p className="result-page__content-all">
              <span className="result-page__note">Mean Discharge: </span>
              {avgDischarge}
              <span className="result-page__unit"> m³ s⁻¹</span>
            </p>
            <p className="result-page__content-all">
              <span className="result-page__note">Mean Water Level: </span>
              {avgLevel}
              <span className="result-page__unit"> m</span>
            </p>
            <p className="result-page__content-all">
              <span className="result-page__note">Mean Temperature: </span>
              {avgTemp}
              <span className="result-page__unit"> °C</span>
            </p>
            <p className="result-page__content-all">
              <span className="result-page__note">Mean Preciptation: </span>
              {avgPrep}
              <span className="result-page__unit"> mm</span>
            </p>
          </div>
        </div>
      </div>
      <div className="result-page__button-container-all">
        <button
          className="result-page__download-chart-all"
          onClick={downloadChart}
        >
          Download Chart
        </button>
        <button
          className="result-page__download-data-all"
          onClick={downloadData}
        >
          Download data
        </button>
      </div>
      <Link className="result-page__return-link-all" to={`/sites/${idInUse}`}>
        <button className="result-page__return-button-all">
          Return to previous page
        </button>
      </Link>
    </div>
  );
};

export default AllData;
