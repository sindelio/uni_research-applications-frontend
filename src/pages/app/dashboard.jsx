import { createSignal, onMount } from 'solid-js';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';
import checkSessionJwt from '../../helpers/check-session-jwt.js';
import request from '../../helpers/request.js';
import Navbar from '../../components/app/navbar.jsx';
import Heading from '../../components/app/heading.jsx';
import P from '../../components/app/paragraph.jsx';
import Select from '../../components/app/select.jsx';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

const [getYear, setYear] = createSignal(currentYear);
const [getMonth, setMonth] = createSignal(currentMonth);
const [getDay, setDay] = createSignal(currentDay);
const [getAccount, setAccount] = createSignal(null);
const [getStats, setStats] = createSignal(null);
const [getYearBarChart, setYearBarChart] = createSignal(null);
const [getMonthBarChart, setMonthBarChart] = createSignal(null);
const [getDayBarChart, setDayBarChart] = createSignal(null);

const MONTH_ENUM = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

async function readAccount() {
  const responseJson = await request('GET', '/', null, true);
  if (responseJson.error) {
    await Swal.fire({
      title: 'Oops',
      text: 'Something unexpected happened. Please request support in the menu.',
      confirmButtonText: 'OK',
    });
    window.location.href = '/app/dashboard';
    return null;
  }
  const account = responseJson.data;
  setAccount(account);
  return null;
}

async function readStats() {
  const data = {
    year: getYear(),
    month: getMonth(),
    day: getDay(),
  };
  const responseJson = await request('POST', '/stats', data, true);
  if (responseJson.error) {
    await Swal.fire({
      title: 'Oops',
      text: 'Something unexpected happened. Please request support in the menu.',
      confirmButtonText: 'OK',
    });
    window.location.href = '/app/dashboard';
    return null;
  }
  const { stats } = responseJson.data;
  setStats(stats);
  return null;
}

async function configureChartDefaults() {
  Chart.defaults.color = '#000000';
  Chart.defaults.font.size = 16;
  Chart.defaults.font.family = 'Poppins, sans-serif';
}

async function drawPizzaChart(
  canvasElId,
  labels,
  values,
  titleText,
  backgroundColor
) {
  const chartEl = document.getElementById(canvasElId);
  const data = {
    labels,
    datasets: [
      {
        label: 'Requests',
        data: values,
        backgroundColor,
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data,
    options: {
      plugins: {
        title: {
          display: true,
          text: titleText,
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 11.5,
            },
          },
        },
      },
    },
  };
  const chart = new Chart(chartEl, config);
  chart.resize(300, 300);
}

async function configurePizzaCharts() {
  const account = getAccount();
  const stats = getStats();

  const bg1 = ['#a955f7', '#f3f4f6'];
  const bg2 = ['#f06292', '#4fc3f7'];

  let canvasElId = 'daily-copy-usage-pizza-chart';
  let labels = ['Used', 'Unused'];
  const copyDailyUsage = account.usage.copy.dailyUsage;
  const copyDailyLimit = account.usage.copy.dailyLimit;
  let values = [copyDailyUsage, copyDailyLimit - copyDailyUsage];
  let titleText = 'Copy';
  await drawPizzaChart(canvasElId, labels, values, titleText, bg1);

  canvasElId = 'daily-parse-usage-pizza-chart';
  labels = ['Used', 'Unused'];
  const parseDailyUsage = account.usage.parse.dailyUsage;
  const parseDailyLimit = account.usage.parse.dailyLimit;
  values = [parseDailyUsage, parseDailyLimit - parseDailyUsage];
  titleText = 'Resume parsing';
  await drawPizzaChart(canvasElId, labels, values, titleText, bg1);

  canvasElId = 'total-action-pizza-chart';
  labels = ['Copy', 'Resume parsing'];
  values = [stats?.total?.action?.copy, stats?.total?.action?.parse];
  titleText = 'All time total';
  await drawPizzaChart(canvasElId, labels, values, titleText, bg2);
}

async function drawBarChart(type, chartEl, labels, data, title, xMin = 0) {
  const chart = new Chart(chartEl, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: title,
          data,
          borderWidth: 0,
          borderRadius: 2,
          backgroundColor: '#a955f7',
          // borderColor: '#c084fc',
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          min: xMin,
        },
      },
    },
  });
  if (type === 'year') {
    setYearBarChart(chart);
  }
  if (type === 'month') {
    setMonthBarChart(chart);
  }
  if (type === 'day') {
    setDayBarChart(chart);
  }
}

async function configureBarCharts() {
  const stats = getStats();
  const year = getYear();
  const month = getMonth();
  const day = getDay();

  const yearChartEl = document.getElementById('barChartYear');
  const yearLabels = stats.overTime.yearly.map((item) => {
    return `${MONTH_ENUM[item.month]}/${year}`;
  });
  const yearData = stats.overTime.yearly.map((item) => {
    return item.combined;
  });
  await drawBarChart(
    'year',
    yearChartEl,
    yearLabels,
    yearData,
    `Requests per month in ${year}`
  );

  const monthChartEl = document.getElementById('barChartMonth');
  const monthLabels = stats.overTime.monthly.map((item) => {
    return `${item.day}`;
  });
  const monthData = stats.overTime.monthly.map((item) => item.combined);
  await drawBarChart(
    'month',
    monthChartEl,
    monthLabels,
    monthData,
    `Requests per day in ${MONTH_ENUM[month]} of ${year}`,
    1
  );

  const dayChartEl = document.getElementById('barChartDay');
  const dayLabels = stats.overTime.daily.map((item) => {
    return `${item.hour}`;
  });
  const dayData = stats.overTime.daily.map((item) => item.combined);
  await drawBarChart(
    'day',
    dayChartEl,
    dayLabels,
    dayData,
    `Requests per hour in ${day}, ${MONTH_ENUM[month]} of ${year}`
  );
}

async function updateBarCharts() {
  const year = getYear();
  const month = getMonth();
  const day = getDay();
  const stats = getStats();

  const yearBarChart = getYearBarChart();
  const yearLabels = stats.overTime.yearly.map((item) => {
    return `${MONTH_ENUM[item.month]}`;
  });
  const yearData = stats.overTime.yearly.map((item) => item.combined);
  yearBarChart.data.labels = yearLabels;
  yearBarChart.data.datasets[0].data = yearData;
  yearBarChart.data.datasets[0].label = `Requests per month in ${year}`;
  yearBarChart.update();

  const monthBarChart = getMonthBarChart();
  const monthLabels = stats.overTime.monthly.map((item) => {
    return `${item.day}`;
  });
  const monthData = stats.overTime.monthly.map((item) => item.combined);
  monthBarChart.data.labels = monthLabels;
  monthBarChart.data.datasets[0].data = monthData;
  monthBarChart.data.datasets[0].label = `Requests per day in ${MONTH_ENUM[month]} of ${year}`;
  monthBarChart.update();

  const dayBarChart = getDayBarChart();
  const dayLabels = stats.overTime.daily.map((item) => {
    return `${item.hour}`;
  });
  const dayData = stats.overTime.daily.map((item) => item.combined);
  dayBarChart.data.labels = dayLabels;
  dayBarChart.data.datasets[0].data = dayData;
  dayBarChart.data.datasets[0].label = `Requests per hour in ${day}, ${MONTH_ENUM[month]} of ${year}`;
  dayBarChart.update();
}

async function inputListener(_event) {
  const yearSelectEl = document.getElementById('yearSelector');
  const monthSelectEl = document.getElementById('monthSelector');
  const daySelectEl = document.getElementById('daySelector');
  const selectedYear = yearSelectEl.value;
  const selectedMonth = monthSelectEl.value;
  const selectedDay = daySelectEl.value;
  setYear(Number(selectedYear));
  setMonth(Number(selectedMonth));
  setDay(Number(selectedDay));
  await readStats();
  await updateBarCharts();
}

function Dashboard() {
  onMount(async () => {
    await checkSessionJwt();
    await Promise.all([readAccount(), readStats()]);
    await configureChartDefaults();
    await configurePizzaCharts();
    await configureBarCharts();
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8">
        <Heading>Dashboard</Heading>
        <div class="grid grid-cols-2 grid-rows-1 border-2 border-purple-400 rounded-xl px-6 py-4 mb-12">
          <P>Daily usage</P>
          <div class="col-start-1">
            <canvas id="daily-copy-usage-pizza-chart" class="m-2"></canvas>
          </div>
          <div class="col-start-2">
            <canvas id="daily-parse-usage-pizza-chart" class="m-2"></canvas>
          </div>
        </div>

        <div class="w-full border-2 border-purple-400 rounded-xl px-6 py-4 my-12">
          <Select
            id="yearSelector"
            label="Select target year"
            oninput={inputListener}
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </Select>
          <canvas id="barChartYear" class="m-6"></canvas>
        </div>
        <div class="w-full border-2 border-purple-400 rounded-xl px-6 pt-4 my-12">
          <Select
            id="monthSelector"
            label="Select target month"
            oninput={inputListener}
          >
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </Select>
          <canvas id="barChartMonth" class="m-6"></canvas>
        </div>
        <div class="w-full border-2 border-purple-400 rounded-xl px-6 pt-4 my-12">
          <Select
            id="daySelector"
            label="Select target day"
            oninput={inputListener}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </Select>
          <canvas id="barChartDay" class="m-6"></canvas>
        </div>
        <div class="grid grid-cols-2 grid-rows-1 border-2 border-purple-400 rounded-xl px-6 py-4">
          <P>Request distribution by action</P>
          <div class="col-start-1">
            <canvas id="total-action-pizza-chart" class="m-2"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
