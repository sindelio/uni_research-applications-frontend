import env from '../../../../../client-envs/current.js';
import { onMount } from 'solid-js';
import Swal from 'sweetalert2';
import checkSessionJwt from '../../../../../helpers/check-session-jwt.js';
import request from '../../../../../helpers/request.js';
import Navbar from '../../../../../components/app/navbar.jsx';
import Button from '../../../../../components/app/button.jsx';
import P from '../../../../../components/app/paragraph.jsx';

async function getInvoice() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const responseJson = await request('GET', `/invoice?id=${id}`, null, true);
  if (responseJson.error !== null) {
    await Swal.fire({
      title: 'Oops',
      text: 'Something unexpected happened. Please request support in the menu.',
      confirmButtonText: 'OK',
    });
    window.location.href = '/app/dashboard';
  }
  const invoice = responseJson.data;
  return invoice;
}

async function addInvoiceInfo(invoice) {
  const {
    paid,
    currency,
    monthOfReference,
    yearOfReference,
    amount,
    amountStringified,
    receiptUrl,
  } = invoice;
  const dateEl = document.getElementById('date');
  dateEl.textContent = `Month and year: ${monthOfReference} of ${yearOfReference}`;
  const paidEl = document.getElementById('paid');
  if (paid === true) {
    paidEl.innerHTML = `Paid: <span class="text-green-600">${paid}</span>`;
    const receiptElement = document.querySelector('#receipt');
    receiptElement.innerHTML = `<div class="underline text-purple-600"><a href="${receiptUrl}" target="_blank">Receipt</a></div>`;
    receiptElement.classList.remove('hidden');
  } else if (amount.total < 0.5) {
    paidEl.innerHTML = `Paid: <span class="text-green-600">Payment not necessary</span>`;
  } else {
    paidEl.innerHTML = `Paid: <span class="text-red-600">${paid}</span>`;
  }
  const currencyEl = document.getElementById('currency');
  currencyEl.textContent = `Currency: ${currency}`;
  const copyUsageEl = document.getElementById('copyUsage');
  copyUsageEl.textContent = `Copy: ${invoice?.usage?.copy}`;
  const parseUsageEl = document.getElementById('parseUsage');
  parseUsageEl.textContent = `Parse: ${invoice?.usage?.parse}`;
  const searchUsageEl = document.getElementById('searchUsage');
  searchUsageEl.textContent = `Search: ${invoice?.usage?.search}`;
  const copyAmountEl = document.getElementById('copyAmount');
  copyAmountEl.textContent = `Copy: ${amountStringified.copy}`;
  const parseAmountEl = document.getElementById('parseAmount');
  parseAmountEl.textContent = `Parse: ${amountStringified.parse}`;
  const searchAmountEl = document.getElementById('searchAmount');
  searchAmountEl.textContent = `Search: ${amountStringified.search}`;
  const totalAmountEl = document.getElementById('totalAmount');
  totalAmountEl.textContent = `Total: ${amountStringified.total}`;
}

async function addPaymentListener(invoice) {
  const payEl = document.getElementById('pay');
  if (invoice?.paid === false && invoice?.amount?.total > 0.5) {
    payEl.addEventListener('click', async () => {
      const responseJson = await request(
        'POST',
        `/invoice/pay`,
        { id: invoice._id },
        true,
      );
      if (responseJson.error !== null) {
        await Swal.fire({
          title: 'Oops',
          text: 'Something unexpected happened. Please request support in the menu.',
          confirmButtonText: 'OK',
        });
        window.location.href = '/app/dashboard';
      }
      const { stripeCheckoutSessionUrl } = responseJson.data;
      window.open(stripeCheckoutSessionUrl, '_blank');
    });
  } else {
    payEl.classList.add('hidden');
  }
}

function BillingHistoryDetails() {
  onMount(async () => {
    await checkSessionJwt();
    const invoice = await getInvoice();
    await addInvoiceInfo(invoice);
    await addPaymentListener(invoice);
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8">
        <P id="date"></P>
        <P id="paid"></P>
        <P id="currency"></P>
        <P>
          Usage:
          <P id="copyUsage" inputClass="ml-4"></P>
          <P id="parseUsage" inputClass="ml-4"></P>
          <P id="searchUsage" inputClass="ml-4"></P>
        </P>
        <P>
          Amount:
          <P id="copyAmount" inputClass="ml-4"></P>
          <P id="parseAmount" inputClass="ml-4"></P>
          <P id="searchAmount" inputClass="ml-4"></P>
          <P id="totalAmount" inputClass="ml-4"></P>
        </P>
        <P id="receipt" inputClass="hidden"></P>
        <Button id="pay">Pay</Button>
      </div>
    </div>
  );
}

export default BillingHistoryDetails;
