import { onMount } from 'solid-js';
import Swal from 'sweetalert2';
import checkSessionJwt from '../../helpers/check-session-jwt.js';
import exists from '../../helpers/exists.js';
import request from '../../helpers/request.js';
import Navbar from '../../components/app/navbar.jsx';
import Heading from '../../components/app/heading.jsx';
import P from '../../components/app/paragraph.jsx';
import InputText from '../../components/app/input-text.jsx';
import InputPassword from '../../components/app/input-password.jsx';
import Button from '../../components/app/button.jsx';
import Divider from '../../components/app/divider.jsx';

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

async function addAccountInfo(account) {
  const nameEl = document.getElementById('name');
  nameEl.textContent = `Name: ${account.name}`;
  const companyEl = document.getElementById('company');
  companyEl.textContent = `Company: ${account.company}`;
  const emailEl = document.getElementById('email');
  emailEl.textContent = `Email: ${account.email}`;
}

async function addDetailsSubmitListener() {
  const detailsSubmitEl = document.getElementById('submitDetails');
  detailsSubmitEl.addEventListener('click', async (event) => {
    Swal.fire({ title: 'Please wait ...' });
    event.preventDefault();
    const detailsFormEl = document.querySelector('#detailsForm');
    const formData = new FormData(detailsFormEl);
    const newName = formData.get('newName');
    const newCompany = formData.get('newCompany');
    if (!newName || !newCompany) {
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
        name: newName,
        company: newCompany,
      },
      true
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
    detailsFormEl.classList.add('hidden');
    const detailsUpdateEl = document.querySelector('#updateDetails');
    const passwordUpdateEl = document.querySelector('#updatePassword');
    const signOutEl = document.querySelector('#signOut');
    detailsUpdateEl.classList.remove('hidden');
    passwordUpdateEl.classList.remove('hidden');
    signOutEl.classList.remove('hidden');
    Swal.fire({
      title: 'Success',
      text: 'Account details updated!',
      confirmButtonText: 'OK',
    });
  });
}

async function addDetailsUpdateListener() {
  const updateDetailsEl = document.querySelector('#updateDetails');
  updateDetailsEl.addEventListener('click', () => {
    const detailsFormEl = document.querySelector('#detailsForm');
    const updatePasswordEl = document.querySelector('#updatePassword');
    const signOutEl = document.querySelector('#signOut');
    updateDetailsEl.classList.add('hidden');
    detailsFormEl.classList.remove('hidden');
    updatePasswordEl.classList.add('hidden');
    signOutEl.classList.add('hidden');
  });
}

async function addPasswordSubmitListener(storedPassword) {
  const passwordSubmitEl = document.getElementById('submitPassword');
  passwordSubmitEl.addEventListener('click', async (event) => {
    Swal.fire({ title: 'Please wait ...' });
    event.preventDefault();
    const passwordFormEl = document.querySelector('#passwordForm');
    const formData = new FormData(passwordFormEl);
    const currentPassword = formData.get('password');
    const newPassword = formData.get('newPassword');
    const repeatNewPassword = formData.get('repeatNewPassword');
    if (
      !exists(currentPassword) ||
      !exists(newPassword) ||
      !exists(repeatNewPassword)
    ) {
      await Swal.fire({
        title: 'Oops',
        text: 'Please check your input.',
        confirmButtonText: 'OK',
      });
      return null;
    }
    if (newPassword.length < 8) {
      await Swal.fire({
        title: 'Oops',
        text: 'The new password must have 8 characters or more.',
        confirmButtonText: 'OK',
      });
      return null;
    }
    if (newPassword !== repeatNewPassword) {
      await Swal.fire({
        title: 'Oops',
        text: 'The new password does not match the repeat password.',
        confirmButtonText: 'OK',
      });
      return null;
    }
    if (currentPassword !== storedPassword) {
      await Swal.fire({
        title: 'Oops',
        text: 'The password provided does not match the password stored in our database.',
        confirmButtonText: 'OK',
      });
      return null;
    }
    const responseJson = await request(
      'PATCH',
      '/',
      {
        password: newPassword,
      },
      true
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
    passwordFormEl.classList.add('hidden');
    const passwordUpdateEl = document.querySelector('#updatePassword');
    const detailsUpdateEl = document.querySelector('#updateDetails');
    const signOutEl = document.querySelector('#signOut');
    passwordUpdateEl.classList.remove('hidden');
    detailsUpdateEl.classList.remove('hidden');
    signOutEl.classList.remove('hidden');
    await Swal.fire({
      title: 'Success',
      text: 'Account password updated!',
      confirmButtonText: 'OK',
    });
    window.location.href = '/app/account';
  });
}

async function addPasswordUpdateListener() {
  const updatePasswordEl = document.querySelector('#updatePassword');
  updatePasswordEl.addEventListener('click', () => {
    const passwordFormEl = document.querySelector('#passwordForm');
    const updateDetailsEl = document.querySelector('#updateDetails');
    const signOutEl = document.querySelector('#signOut');
    updatePasswordEl.classList.add('hidden');
    passwordFormEl.classList.remove('hidden');
    updateDetailsEl.classList.add('hidden');
    signOutEl.classList.add('hidden');
  });
}

async function addSignOutListener() {
  const signOutEl = document.getElementById('signOut');
  signOutEl.addEventListener('click', async () => {
    await Swal.fire({
      title: 'Success',
      text: 'You have signed out of your account.',
      confirmButtonText: 'OK',
    });
    localStorage.setItem('talent-sourcery-session-jwt', '');
    window.location.href = '/app/signin';
  });
}

function Account() {
  onMount(async () => {
    await checkSessionJwt();
    const account = await readAccount();
    await addAccountInfo(account);
    await addDetailsSubmitListener();
    await addDetailsUpdateListener();
    await addPasswordSubmitListener(account?.password);
    await addPasswordUpdateListener();
    await addSignOutListener();
  });
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8">
        <Heading>Account details</Heading>
        <P id="name">Name:</P>
        <P id="company">Company:</P>
        <P id="email">Email:</P>
        <Button id="updateDetails" type="button">
          Update details
        </Button>
        <form id="detailsForm" class="hidden">
          <Divider inputClass="w-full bg-purple-500 border-purple-500"></Divider>
          <InputText
            id="newName"
            label="New name *"
            size={24}
            placeholder=""
          ></InputText>
          <InputText
            id="newCompany"
            label="New company *"
            size={24}
            placeholder=""
          ></InputText>
          <Button id="submitDetails" type="button">
            Save
          </Button>
        </form>
        <Button id="updatePassword" type="button" inputClass="mx-4">
          Update password
        </Button>
        <form id="passwordForm" class="hidden">
          <Divider inputClass="w-full bg-purple-500 border-purple-500"></Divider>
          <InputPassword
            id="password"
            label="Current password *"
            size={24}
            placeholder=""
          ></InputPassword>
          <InputPassword
            id="newPassword"
            label="New password *"
            size={24}
            placeholder=""
          ></InputPassword>
          <InputPassword
            id="repeatNewPassword"
            label="Repeat new password *"
            size={24}
            placeholder=""
          ></InputPassword>
          <Button id="submitPassword" type="button">
            Save
          </Button>
        </form>
        <Button id="signOut" type="button">
          Sign out
        </Button>
      </div>
    </div>
  );
}

export default Account;
