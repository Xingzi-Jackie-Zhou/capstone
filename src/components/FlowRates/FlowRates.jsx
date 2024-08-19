import "./FlowRates.scss";
import FormatDate from "../../utility/FormatDate/FormatDate.jsx";
import exportFromJSON from "export-from-json";
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
  PointElement // Register PointElement if you use points
);

const FlowRates = ({
  dataList,
  startDate,
  endDate,
  idInUse,
  siteNameInUse,
}) => {
  console.log(dataList);
  console.log(startDate);
  console.log(endDate);
  console.log(idInUse);
  console.log(siteNameInUse);

  // Calculate statistics
  const getStatistics = () => {
    if (dataList.length === 0) return { max: 0, min: 0, avg: 0 };

    const discharges = dataList
      .map((item) => parseFloat(item.discharge))
      .filter((value) => !isNaN(value));
    const max = Math.max(...discharges);
    const min = Math.min(...discharges);
    const avg = (
      discharges.reduce((acc, val) => acc + val, 0) / discharges.length
    ).toFixed(2);
    return { max, min, avg };
  };

  const { max, min, avg } = getStatistics();

  // Download chart as PDF
  const downloadChart = () => {
    const chartElement = document.querySelector(
      ".result-page__chart-container"
    );
    html2canvas(chartElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 130); //margin, margin, imgWidth, imgHeight
      pdf.save(`chart_site${idInUse}.pdf`);
    });
  };

  //Data and options for the chart
  const chartData = {
    labels: dataList?.map((item) => FormatDate(item.date)),
    datasets: [
      {
        label: "Discharge Rate",
        data: dataList?.map((item) => item.discharge),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        color: "#000000",
      },
      title: {
        display: true,
        color: "#000000",
        text: "Discharge Rate Over Time ",
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
          autoSkip: true,
          maxRotation: 90,
          minRotation: 0,
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Discharge (m³ s⁻¹)",
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
  console.log(typeof dataList);

  //download dataList as a csv file
  const downloadData = () => {
    const fileName = `download_${idInUse}_data`;
    const exportType = exportFromJSON.types.csv;
    console.log("DataList:", dataList);

    try {
      exportFromJSON({ data: dataList, fileName, exportType });
    } catch (error) {
      console.error("Export download failed:", error);
    }
  };

  return (
    <div className="result-page__container">
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
          Discharge rate over time period from {startDate} to for {endDate} site
          ID {idInUse}, {siteNameInUse}.
        </p>
        <div className="result-page__statistics">
          <p>
            <span className="result-page__bold">Max Discharge: </span>
            {max} m³ s⁻¹
          </p>
          <p>
            <span className="result-page__bold">Min Discharge: </span>
            {min} m³ s⁻¹
          </p>
          <p>
            <span className="result-page__bold">Average Discharge: </span>
            {avg} m³ s⁻¹
          </p>
        </div>
      </div>
      <div className="result-page__button-container">
        <button className="result-page__download-chart" onClick={downloadChart}>
          Download Chart
        </button>
        <button className="result-page__download-data" onClick={downloadData}>
          Download data
        </button>
      </div>
      <Link className="result-page__return-link" to={`/sites/${idInUse}`}>
        <button className="result-page__return-button">
          Return to previous page
        </button>
      </Link>
    </div>
  );
};

export default FlowRates;
