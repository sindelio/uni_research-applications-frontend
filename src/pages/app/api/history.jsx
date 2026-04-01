import { onMount } from 'solid-js';
import checkSessionJwt from '../../../helpers/check-session-jwt.js';
import request from '../../../helpers/request.js';
import Navbar from '../../../components/app/navbar.jsx';
import Button from '../../../components/app/button.jsx';
import P from '../../../components/app/paragraph.jsx';
import InputNumber from '../../../components/app/input-number.jsx';

async function getHistory(pageRequested = 1) {
  const responseJson = await request(
    'POST',
    '/paginated-find',
    {
      type: 'Request',
      query: {},
      page: pageRequested,
    },
    true
  );
  if (responseJson.error !== null) {
    await Swal.fire({
      title: 'Oops',
      text: 'Something unexpected happened. Please request support in the menu.',
      confirmButtonText: 'OK',
    });
    window.location.href = '/app/dashboard';
  }
  const { numberOfItems, itemsInPage } = responseJson.data;
  return {
    numberOfItems,
    itemsInPage,
  };
}

async function addHistoryInfo(itemsInPage) {
  const listEl = document.getElementById('list-of-items-in-page');
  while (listEl.firstChild) {
    listEl.removeChild(listEl.lastChild);
  }
  itemsInPage?.forEach((item) => {
    const el = document.createElement('li');
    el.className =
      'list-none my-6 px-6 py-4 border-2 border-purple-500 rounded-xl col-start-1 col-span-full shadow-md hover:cursor-pointer';
    const request = `<div class="py-1">Action: ${item?.action} | Source: ${item?.source} | Type: ${item?.type}</div>`;
    const plus = `<div class="text-center text-purple-500 text-xl">+</div>`;
    el.innerHTML = `${request}${plus}`;
    el.addEventListener('click', async () => {
      window.location.href = `/app/api/history/details?id=${item._id}`;
    });
    listEl.appendChild(el);
  });
}

async function addPaginationInfo(pageRequested, numberOfItems) {
  const pageEl = document.getElementById('page');
  pageEl.value = pageRequested;
  const pageInfoEl = document.getElementById('pageInfo');
  pageInfoEl.innerHTML = `Showing page <b>${pageRequested}</b>, from entries <b>${
    (pageRequested - 1) * 10 + 1
  }</b> to <b>${pageRequested * 10}</b> out of <b>${numberOfItems}</b>`;
}

async function jumpToPage(pageRequested = 1) {
  if (
    Number.isNaN(pageRequested) ||
    pageRequested < 1 ||
    !Number.isInteger(pageRequested)
  ) {
    window.alert('Oops, please check your input!');
    return null;
  }
  const { itemsInPage, numberOfItems } = await getHistory(pageRequested);
  if (pageRequested > Math.ceil(numberOfItems / 10)) {
    window.alert('Oops, the page requested does not exist yet!');
    return null;
  }
  await addHistoryInfo(itemsInPage);
  await addPaginationInfo(pageRequested, numberOfItems);
}

async function addPageJumpListener() {
  const jumpEl = document.getElementById('jump');
  jumpEl.addEventListener('click', async () => {
    const pageEl = document.getElementById('page');
    const pageRequested = Number(pageEl.value);
    await jumpToPage(pageRequested);
  });
}

async function addPreviousListener() {
  const previousEl = document.getElementById('previous');
  previousEl.addEventListener('click', async () => {
    const pageEl = document.getElementById('page');
    const currentPage = Number(pageEl.value);
    const requestedPage = currentPage - 1;
    await jumpToPage(requestedPage);
  });
}

async function addNextListener() {
  const nextEl = document.getElementById('next');
  nextEl.addEventListener('click', async () => {
    const pageEl = document.getElementById('page');
    const currentPage = Number(pageEl.value);
    const requestedPage = currentPage + 1;
    await jumpToPage(requestedPage);
  });
}

function ApiHistory() {
  onMount(async () => {
    await checkSessionJwt();
    const { numberOfItems, itemsInPage } = await getHistory();
    await addHistoryInfo(itemsInPage);
    await addPaginationInfo(1, numberOfItems);
    await addPageJumpListener();
    await addPreviousListener();
    await addNextListener();
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8 grid grid-cols-12 grid-rows-12">
        <div class="col-start-2 col-span-full row-start-1">
          <ul id="list-of-items-in-page"></ul>
          <br />
          <P id="pageInfo"></P>
          <Button id="previous">Previous</Button>
          <Button id="jump" inputClass="ml-6">
            Jump to page
          </Button>
          <InputNumber id="page" inputClass="mr-6" />
          <Button id="next">Next</Button>
        </div>
      </div>
    </div>
  );
}

export default ApiHistory;
