import "./AllData.scss";
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
        fill: true,
      },
      {
        label: "Water Level",
        data: dataList?.map((item) => item.water_level),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
      },
      {
        label: "Average Temperature",
        data: dataList?.map((item) => item.ave_temperature),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
      },
      {
        label: "Total Precipitation",
        data: dataList?.map((item) => item.total_preciptation),
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)",
        fill: true,
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
        },
      },
      y: {
        title: {
          display: true,
          text: "Value for parameters",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="result-page__chart-container">
        <Line data={chartData} options={options} />
        <p>
          Metrics over time period from {startDate} to {endDate} for site
          {idInUse}, {siteNameInUse}.
        </p>
        <div className="result-page__statistics">
          <div className="result-page__statistics-title">
            <p>Statistics</p>
            <p>Discharge (m³ s⁻¹)</p>
            <p>Water Level (m)</p>
            <p>Temperature (°C)</p>
            <p>Preciptation (mm)</p>
          </div>
          <div>
            <p>Max</p>
            <p>{maxDischarge}</p>
            <p>{maxLevel}</p>
            <p>{maxTemp}</p>
            <p>{maxPrep}</p>
          </div>
          <div>
            <p>Min</p>
            <p>{minDischarge}</p>
            <p>{minLevel}</p>
            <p>{minTemp}</p>
            <p>{minPrep}</p>
          </div>
          <div>
            <p>Mean</p>
            <p>{avgDischarge}</p>
            <p>{avgLevel}</p>
            <p>{avgTemp}</p>
            <p>{avgPrep}</p>
          </div>
        </div>
        <button onClick={downloadChart}>Download Chart</button>
      </div>
      <Link className="result-page__return-link" to={`/sites/${idInUse}`}>
        <p>Return to previous page</p>
      </Link>
    </>
  );
};

export default AllData;
