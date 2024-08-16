import "./FlowRates.scss";
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

    const discharges = dataList.map((item) => parseFloat(item.discharge));
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
    ); // Ensure your chart is inside this container
    html2canvas(chartElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 277, 210); //margin, margin, imgWidth, imgHeight
      pdf.save(`chart_site${idInUse}.pdf`);
    });
  };

  //Data and options for the chart
  const chartData = {
    labels: dataList?.map((item) => FormatDate(item.date)), // X-axis labels
    datasets: [
      {
        label: "Discharge Rate", // Label for the dataset
        data: dataList?.map((item) => item.discharge), // Y-axis data
        borderColor: "rgba(75,192,192,1)", // Line color
        backgroundColor: "rgba(75,192,192,0.2)", // Fill color
        fill: true, // Fill the area under the line
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
        text: "Discharge Rate Over Time ",
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
          text: "Discharge Rate (m³ s⁻¹)",
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
          Discharge rate over time period from {startDate} to for {endDate} site
          {idInUse},{siteNameInUse}.
        </p>
        <div className="result-page__statistics">
          <p>Max Discharge: {max} m³ s⁻¹</p>
          <p>Min Discharge: {min} m³ s⁻¹</p>
          <p>Average Discharge: {avg} m³ s⁻¹</p>
        </div>
        <button onClick={downloadChart}>Download Chart</button>
      </div>
      <Link className="result-page__return-link" to={`/sites/${idInUse}`}>
        <p>Return to previous page</p>
      </Link>
    </>
  );
  // return <></>;
};

export default FlowRates;
