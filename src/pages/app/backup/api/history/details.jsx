import { onMount } from 'solid-js';
import checkSessionJwt from '../../../../../helpers/check-session-jwt.js';
import request from '../../../../../helpers/request.js';
import Navbar from '../../../../../components/app/navbar.jsx';
import P from '../../../../../components/app/paragraph.jsx';

async function readRequest() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const responseJson = await request('GET', `/request?id=${id}`, null, true);
  if (responseJson.error !== null) {
    await Swal.fire({
      title: 'Oops',
      text: 'Something unexpected happened. Please request support in the menu.',
      confirmButtonText: 'OK',
    });
    window.location.href = '/app/dashboard';
  }
  const requestInfo = responseJson.data;
  return requestInfo;
}

async function addRequestInfo(requestInfo) {
  const actionEl = document.getElementById('action');
  actionEl.textContent = `Action: ${requestInfo?.action || '-'}`;
  const sourceEl = document.getElementById('source');
  sourceEl.textContent = `Source: ${requestInfo?.source || '-'}`;
  const typeEl = document.getElementById('type');
  typeEl.textContent = `Type: ${requestInfo?.type || '-'}`;
  const formEl = document.getElementById('form');
  const planEl = document.getElementById('plan');
  planEl.textContent = `Plan: ${requestInfo?.billing?.plan || '-'}`;
  const dateEl = document.getElementById('date');
  dateEl.textContent = `Date: ${requestInfo?.createdAt?.readableDate || '-'}`;
  formEl.textContent = JSON.stringify(requestInfo?.form, null, 4) || '-';
}

function ApiHistoryDetails() {
  onMount(async () => {
    await checkSessionJwt();
    const requestInfo = await readRequest();
    await addRequestInfo(requestInfo);
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8">
        <P id="action"></P>
        <P id="source"></P>
        <P id="type"></P>
        <P id="date"></P>
        <P id="plan"></P>
        <P id="paid"></P>
        <P>Form:</P>
        <pre id="form"></pre>
        <P id="paid"></P>
      </div>
    </div>
  );
}

export default ApiHistoryDetails;
