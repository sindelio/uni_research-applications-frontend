import { onMount } from 'solid-js';
import checkSessionJwt from '../../../helpers/check-session-jwt.js';
import request from '../../../helpers/request.js';
import Navbar from '../../../components/app/navbar.jsx';
import Heading from '../../../components/app/heading.jsx';
import P from '../../../components/app/paragraph.jsx';

async function readApiHealth(dataSource) {
  const responseJson = await request(
    'GET',
    `/health/${dataSource}`,
    null,
    true
  );
  if (responseJson.success === 'false') {
    return 'unhealthy';
  }
  let status = responseJson?.data?.status;
  if (!status) {
    status = 'unhealthy';
  }
  return status;
}

async function addStatus(statuses) {
  const linkedinEl = document.querySelector('#linkedin');
  if (statuses.linkedin === 'healthy') {
    linkedinEl.textContent = 'healthy';
    linkedinEl.classList.add('text-green-500');
  } else {
    linkedinEl.textContent = 'unhealthy';
    linkedinEl.classList.add('text-red-500');
  }
  const githubEl = document.querySelector('#github');
  if (statuses.github === 'healthy') {
    githubEl.textContent = 'healthy';
    githubEl.classList.add('text-green-500');
  } else {
    githubEl.textContent = 'unhealthy';
    githubEl.classList.add('text-red-500');
  }
  const dribbbleEl = document.querySelector('#dribbble');
  if (statuses.dribbble === 'healthy') {
    dribbbleEl.textContent = 'healthy';
    dribbbleEl.classList.add('text-green-500');
  } else {
    dribbbleEl.textContent = 'unhealthy';
    dribbbleEl.classList.add('text-red-500');
  }
}

function ApiStatus() {
  onMount(async () => {
    await checkSessionJwt();
    const statuses = {
      linkedin: await readApiHealth('linkedin'),
      github: await readApiHealth('github'),
      dribbble: await readApiHealth('dribbble'),
    };
    await addStatus(statuses);
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8">
        <Heading>API status</Heading>
        <P>
          LinkedIn: <span id="linkedin">please wait a moment ...</span>
        </P>
        <P>
          GitHub: <span id="github">please wait a moment ...</span>
        </P>
        <P>
          Dribbble: <span id="dribbble">please wait a moment ...</span>
        </P>
      </div>
    </div>
  );
}

export default ApiStatus;
