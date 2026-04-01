import env from '../../client-envs/current.js';
import { onMount } from 'solid-js';
import Swal from 'sweetalert2';
import request from '../../helpers/request.js';

async function windowWidthHandler() {
  const windowInnerWidth = window.innerWidth;
  const desktopNavbar = document.getElementById('navbar');
  if (windowInnerWidth < 768) desktopNavbar.classList.add('hidden');
  else desktopNavbar.classList.remove('hidden');
}

async function addWindowWidthListener() {
  window.addEventListener('resize', windowWidthHandler);
}

async function readAccount() {
  const responseJson = await request('GET', '/', null, {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem(
      'talent-sourcery-session-jwt'
    )}`,
  });
  if (responseJson.error) {
    await Swal.fire({
      title: 'Oops',
      text: `Something unexpected happened. Please contact ${env.SUPPORT_EMAIL} for support.`,
      confirmButtonText: 'OK',
    });
    window.location.href = '/dashboard';
    return null;
  }
  const account = responseJson.data;
  return account;
}

function Navbar() {
  onMount(async () => {
    await addWindowWidthListener();
    const account = await readAccount();
    const plan = account?.billing?.plan;
    const modeEl = document.querySelector('#mode');
    if (plan === env.BILLING_PLAN_TRIAL) {
      modeEl.textContent = 'Trial';
    }
    if (plan === env.BILLING_PLAN_CONSUMPTION) {
      modeEl.textContent = 'Partner';
    }
    if (plan === env.BILLING_PLAN_SUBSCRIPTION) {
      modeEl.textContent = 'Partner';
    }
  });

  return (
    // These classes work together to create the fixed behavior with a screen height: h-screen fixed flex
    <div id="navbar" class="h-screen fixed flex text-sm text-white">
      <div
        id="desktopNavbar"
        class="w-48 p-2 bg-purple-600 transition duration-300 ease-in-out"
      >
        <img
          id="hat"
          src="/images/hat.png"
          alt="Sourcerer hat"
          class="mx-auto my-4 w-16 h-16"
        />
        <nav class="mx-auto text-center">
          <a
            href="/app/dashboard"
            class=" flex my-2 py-2 px-4 rounded-lg transition duration-200 hover:bg-purple-800 hover:text-white"
          >
            <img
              id="dashboard"
              src="/images/dashboard.svg"
              class="h-6 w-6"
            ></img>
            <span class="ml-4">Dashboard</span>
          </a>
          <a
            href="/app/api"
            class=" flex my-2 py-2 px-4 rounded-lg transition duration-200 hover:bg-purple-800 hover:text-white"
          >
            <img id="api" src="/images/api.svg" class="h-6 w-6"></img>
            <span class="ml-4">API</span>
          </a>
          <a
            id="billing"
            href="/app/billing"
            class="flex my-2 py-2 px-4 rounded-lg transition duration-200 hover:bg-purple-800 hover:text-white"
          >
            <img id="billing" src="/images/billing.svg" class="h-6 w-6"></img>
            <span class="ml-4">Billing</span>
          </a>
          <a
            href="/app/account"
            class="flex my-2 py-2 px-4 rounded-lg transition duration-200 hover:bg-purple-800 hover:text-white"
          >
            <img id="account" src="/images/account.svg" class="h-6 w-6"></img>
            <span class="ml-4">Account</span>
          </a>
          <a
            href="/app/support"
            class="flex my-2 py-2 px-4 rounded-lg transition duration-200 hover:bg-purple-800 hover:text-white"
          >
            <img id="support" src="/images/support.svg" class="h-6 w-6"></img>
            <span class="ml-4">Support</span>
          </a>
          <hr class="w-[80%] h-[0.15rem] mx-auto my-8 bg-white rounded-2xl"></hr>
          <div class="flex flex-col">
            <span id="mode" class="text-xl mx-auto"></span>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
