import { onMount, createSignal } from 'solid-js';
import Swal from 'sweetalert2';
import checkSessionJwt from '../../../../helpers/check-session-jwt.js';
import request from '../../../../helpers/request.js';
import Navbar from '../../../../components/app/navbar.jsx';
import Heading from '../../../../components/app/heading.jsx';
import P from '../../../../components/app/paragraph.jsx';
import Button from '../../../../components/app/button.jsx';

const [getKeyVisibility, setKeyVisibility] = createSignal(false);

let apiKey = '';

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
  return account;
}

async function addObfuscatedKeyInfo() {
  setKeyVisibility(false);
  const obfuscatedApiKey = `${apiKey.slice(
    0,
    4,
  )}**************************************************${apiKey.slice(-4)}`;
  const apiKeyEl = document.getElementById('apiKey');
  apiKeyEl.textContent = obfuscatedApiKey;
  const toggleViewEl = document.querySelector('#toggle-view');
  toggleViewEl.textContent = 'View key';
}

async function addKeyInfo() {
  setKeyVisibility(true);
  const apiKeyEl = document.getElementById('apiKey');
  apiKeyEl.textContent = apiKey;
  const toggleViewEl = document.querySelector('#toggle-view');
  toggleViewEl.textContent = 'Hide key';
}

async function addViewToggleListener() {
  const toggleViewEl = document.querySelector('#toggle-view');
  toggleViewEl.addEventListener('click', async () => {
    if (getKeyVisibility() === true) {
      addObfuscatedKeyInfo();
    } else {
      addKeyInfo();
    }
  });
}

async function addRegenerateListener() {
  const regenerateEl = document.querySelector('#regenerate');
  regenerateEl.addEventListener('click', async () => {
    Swal.fire({ title: 'Please wait ...' });
    const responseJson = await request(
      'POST',
      '/regenerate-api-key',
      null,
      true,
    );
    if (responseJson.error) {
      await Swal.fire({
        title: 'Oops',
        text: 'Something unexpected happened. Please request support in the menu.',
        confirmButtonText: 'OK',
      });
      window.location.href = '/app/dashboard';
      return null;
    }
    await Swal.fire({
      title: 'Success',
      text: 'API key regenerated! Note that the old key will not work anymore.',
      confirmButtonText: 'OK',
    });
    const newApiKey = responseJson?.data?.apiKey;
    apiKey = newApiKey;
    addKeyInfo();
  });
}

function ApiKeys() {
  onMount(async () => {
    await checkSessionJwt();
    const account = await readAccount();
    apiKey = account.apiKey;
    await addObfuscatedKeyInfo();
    await addRegenerateListener();
    await addViewToggleListener();
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8">
        <Heading>API keys</Heading>
        <P>Primary key:</P>
        <P id="apiKey"></P>
        <Button id="toggle-view" type="button">
          View key
        </Button>
        <Button id="regenerate" type="button" inputClass="mx-4">
          Regenerate key
        </Button>
      </div>
    </div>
  );
}

export default ApiKeys;
