import env from '../../../client-envs/current.js';
import { createSignal, onMount } from 'solid-js';
import Swal from 'sweetalert2';
import checkSessionJwt from '../../../helpers/check-session-jwt.js';
import request from '../../../helpers/request.js';
import Navbar from '../../../components/app/navbar.jsx';
import Heading from '../../../components/app/heading.jsx';
import P from '../../../components/app/paragraph.jsx';
import Select from '../../../components/app/select.jsx';

const { SUPPORT_EMAIL } = env;

const [getAccount, setAccount] = createSignal(null);
const [getStats, setStats] = createSignal(null);

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
  const data = {};
  const responseJson = await request('POST', '/stats', data, true);
  if (responseJson.error) {
    await Swal.fire({
      title: 'Oops',
      text: `Algo inesperado aconteceu. Por favor busque suporte no endereço eletrônico ${SUPPORT_EMAIL}`,
      confirmButtonText: 'OK',
    });
    window.location.href = '/app/dashboard';
    return null;
  }
  const { stats } = responseJson.data;
  setStats(stats);
  return null;
}

function Dashboard() {
  onMount(async () => {
    await checkSessionJwt();
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8">
        <Heading>Dashboard</Heading>
      </div>
    </div>
  );
}

export default Dashboard;
