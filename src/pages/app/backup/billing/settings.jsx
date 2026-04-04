import env from '../../../../client-envs/current.js';
import { onMount } from 'solid-js';
import Swal from 'sweetalert2';
import checkSessionJwt from '../../../../helpers/check-session-jwt.js';
import request from '../../../../helpers/request.js';
import exists from '../../../../helpers/exists.js';
import Navbar from '../../../../components/app/navbar.jsx';
import Heading from '../../../../components/app/heading.jsx';
import P from '../../../../components/app/paragraph.jsx';
import InputText from '../../../../components/app/input-text.jsx';
import Select from '../../../../components/app/select.jsx';
import Button from '../../../../components/app/button.jsx';
import Divider from '../../../../components/app/divider.jsx';

async function readAccount() {
  const responseJson = await request('GET', '/', null, {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem(
      'talent-sourcery-session-jwt',
    )}`,
  });
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

async function addAccountInfo(account) {
  const { billing } = account;
  const { plan, currency } = billing;
  const planEl = document.getElementById('plan');
  planEl.textContent = `Plan: ${plan}`;
  const currencyEl = document.getElementById('currency');
  currencyEl.textContent = `Currency: ${currency}`;
  const financeExecutiveEl = document.getElementById('financeExecutive');
  financeExecutiveEl.textContent = `Finance executive: ${account.billing.financeExecutive}`;
  if (plan === env.BILLING_PLAN_TRIAL) {
    const trialEl = document.getElementById('trial');
    trialEl.classList.remove('hidden');
    const copyCreditsEl = document.getElementById('copyCredits');
    const parseCreditsEl = document.getElementById('parseCredits');
    const searchCreditsEl = document.getElementById('searchCredits');
    copyCreditsEl.textContent = `Copy: ${billing.trial.credits.copy}`;
    parseCreditsEl.textContent = `Parse: ${billing.trial.credits.parse}`;
    searchCreditsEl.textContent = `Search: ${billing.trial.credits.search}`;
  }
  if (billing.plan === env.BILLING_PLAN_CONSUMPTION) {
    const consumptionEl = document.getElementById('consumption');
    consumptionEl.classList.remove('hidden');
    const { price } = billing.consumption;
    const copyPriceEl = document.getElementById('copyPrice');
    copyPriceEl.textContent = `Copy: ${price.copy} ${billing.currency}`;
    const parsePriceEl = document.getElementById('parsePrice');
    parsePriceEl.textContent = `Parse: ${price.parse} ${billing.currency}`;
    const searchPriceEl = document.getElementById('searchPrice');
    searchPriceEl.textContent = `search: ${price.search} ${billing.currency}`;
  }
  if (billing.plan === env.BILLING_PLAN_SUBSCRIPTION) {
    const subscriptionEl = document.getElementById('subscription');
    subscriptionEl.classList.remove('hidden');
    const { monthlyAmount } = billing.subscription;
    const copyAmountEl = document.getElementById('copyAmount');
    copyAmountEl.textContent = `Copy: ${monthlyAmount.copy} ${billing.currency}`;
    const parseAmountEl = document.getElementById('parseAmount');
    parseAmountEl.textContent = `Parse: ${monthlyAmount.parse} ${billing.currency}`;
    const searchAmountEl = document.getElementById('searchAmount');
    searchAmountEl.textContent = `Search: ${monthlyAmount.search} ${billing.currency}`;
    const totalAmountEl = document.getElementById('totalAmount');
    totalAmountEl.textContent = `Total: ${monthlyAmount.total} ${billing.currency}`;
  }
}

async function addUpdateListener() {
  const updateEl = document.querySelector('#update');
  updateEl.addEventListener('click', () => {
    const formEl = document.querySelector('#form');
    formEl.classList.remove('hidden');
    updateEl.classList.add('hidden');
  });
}

async function addSubmitListener() {
  const submitEl = document.getElementById('submit');
  submitEl.addEventListener('click', async (event) => {
    Swal.fire({ title: 'Please wait ...' });
    event.preventDefault();
    const formEl = document.querySelector('#form');
    const formData = new FormData(formEl);
    const newFinanceExecutive = formData.get('newFinanceExecutive');
    const newCurrency = formData.get('newCurrency');
    if (!exists(newFinanceExecutive) || !exists(newCurrency)) {
      await Swal.fire({
        title: 'Oops',
        text: 'Please check your input.',
        confirmButtonText: 'OK',
      });
      return null;
    }
    const responseJson = await request(
      'PATCH',
      '/',
      {
        billing: {
          financeExecutive: newFinanceExecutive,
          currency: newCurrency,
        },
      },
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
    const account = await readAccount();
    await addAccountInfo(account);
    formEl.classList.add('hidden');
    const updateElement = document.querySelector('#update');
    updateElement.classList.remove('hidden');
    Swal.fire({
      title: 'Success',
      text: 'Billing settings updated!',
      confirmButtonText: 'OK',
    });
  });
}

function BillingSettings() {
  onMount(async () => {
    await checkSessionJwt();
    const account = await readAccount();
    await addAccountInfo(account);
    await addSubmitListener();
    await addUpdateListener();
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8">
        <Heading>Billing settings</Heading>
        <P id="financeExecutive"></P>
        <P id="plan"></P>
        <P id="currency"></P>
        <P id="trial" inputClass="hidden">
          Credits:
          <P id="copyCredits" inputClass="ml-4"></P>
          <P id="parseCredits" inputClass="ml-4"></P>
          <P id="searchCredits" inputClass="ml-4"></P>
        </P>
        <P id="consumption" inputClass="hidden">
          Prices:
          <P id="copyPrice" inputClass="ml-4"></P>
          <P id="parsePrice" inputClass="ml-4"></P>
          <P id="searchPrice" inputClass="ml-4"></P>
        </P>
        <P id="subscription" inputClass="hidden">
          Monthly amount:
          <P id="copyAmount" inputClass="ml-4"></P>
          <P id="parseAmount" inputClass="ml-4"></P>
          <P id="searchAmount" inputClass="ml-4"></P>
          <P id="totalAmount" inputClass="ml-4"></P>
        </P>
        <Button id="update" type="button">
          Update executive or currency
        </Button>
        <form id="form" class="hidden">
          <Divider inputClass="w-full bg-purple-500 border-purple-500"></Divider>
          <InputText
            id="newFinanceExecutive"
            label="New finance executive email *"
            size={24}
            placeholder=""
          ></InputText>
          <Select id="newCurrency" label="New currency *">
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </Select>
          <Button id="submit" type="button">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default BillingSettings;
