import env from '../../../client-envs/current.js';
import { onMount } from 'solid-js';
import Swal from 'sweetalert2';
import checkSessionJwt from '../../../helpers/check-session-jwt.js';
import request from '../../../helpers/request.js';
import Navbar from '../../../components/app/navbar.jsx';
import Content from '../../../components/app/content.jsx';
import Heading from '../../../components/app/heading.jsx';
import InputText from '../../../components/app/input-text.jsx';
import Button from '../../../components/app/button.jsx';
import TextArea from '../../../components/app/text-area.jsx';
import Select from '../../../components/app/select.jsx';

async function requestSupport(event) {
  Swal.fire({ title: 'Please wait ...' });
  event.preventDefault();
  const formEl = document.querySelector('#form');
  const formData = new FormData(formEl);
  const type = formData.get('type');
  const message = formData.get('message');
  const videoUrl = formData.get('videoUrl');
  if (!message) {
    await Swal.fire({
      title: 'Oops',
      text: 'Please check your input.',
      confirmButtonText: 'OK',
    });
    return null;
  }
  try {
    const responseJson = await request(
      'POST',
      '/support',
      {
        type,
        message,
        videoUrl,
      },
      true,
    );
    if (responseJson.success === true) {
      await Swal.fire({
        title: 'Success',
        text: 'Your request has been sent! Please expect a reply within 2 calendar days.',
        confirmButtonText: 'OK',
      });
    } else if (responseJson.error) {
      await Swal.fire({
        title: 'Oops',
        text: `Something unexpected happened. Please request support directly at ${env.SUPPORT_EMAIL}`,
        confirmButtonText: 'OK',
      });
    }
  } catch (e) {
    await Swal.fire({
      title: 'Oops',
      text: `Something unexpected happened. Please request support directly at ${env.SUPPORT_EMAIL}`,
      confirmButtonText: 'OK',
    });
  }
}

async function addSubmitListener() {
  const submitEl = document.getElementById('submit');
  submitEl.addEventListener('click', requestSupport);
}

function Support() {
  onMount(async () => {
    await checkSessionJwt();
    await addSubmitListener();
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <Content>
        <form id="form">
          <Heading>Support request</Heading>
          <Select id="type" label="What is the type of your request? *">
            <option value="support">Support with an issue in the API</option>
            <option value="help">Help using the API</option>
            <option value="feature">Request a feature</option>
            <option value="feedback">Provide valuable feedback</option>
            <option value="other">Other</option>
          </Select>
          <TextArea
            id="message"
            label="Please type your message bellow *"
            placeholder="Your message goes here"
            rows={6}
          ></TextArea>
          <InputText
            id="videoUrl"
            label="Send us a video explaining your request"
            placeholder="Link to YouTube, Loom etc"
            size="32"
          ></InputText>
          <Button id="submit">Send</Button>
        </form>
      </Content>
    </div>
  );
}

export default Support;
