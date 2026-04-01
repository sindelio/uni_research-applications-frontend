import Waves from '../../components/app/waves.jsx';
import { onMount } from 'solid-js';
import Swal from 'sweetalert2';
import request from '../../helpers/request.js';
import Anchor from '../../components/app/anchor.jsx';
import Button from '../../components/app/button.jsx';
import InputText from '../../components/app/input-text.jsx';
import InputPassword from '../../components/app/input-password.jsx';

async function checkPasswordLength() {
  const passwordEl = document.getElementById('password');
  const passwordCheckLengthEl = document.getElementById('passwordCheckLength');
  const passwordLength = passwordEl?.value?.length;
  if (passwordLength >= 8) {
    passwordCheckLengthEl.classList.add('hidden');
    return true;
  } else {
    passwordCheckLengthEl.classList.remove('hidden');
    return false;
  }
}

async function checkPasswordMatch() {
  const passwordEl = document.getElementById('password');
  const repeatPasswordEl = document.getElementById('repeatPassword');
  const password = passwordEl?.value;
  const repeatPassword = repeatPasswordEl?.value;
  const passwordCheckMatchEl = document.getElementById('passwordCheckMatch');
  if (password === repeatPassword) {
    passwordCheckMatchEl.classList.add('hidden');
    return true;
  } else {
    passwordCheckMatchEl.classList.remove('hidden');
    return false;
  }
}

async function addPasswordChangeListener() {
  const passwordEl = document.getElementById('password');
  passwordEl.addEventListener('keyup', checkPasswordLength);
  const repeatPasswordEl = document.getElementById('repeatPassword');
  repeatPasswordEl.addEventListener('keyup', checkPasswordMatch);
}

async function checkEmailFormat() {
  const emailEl = document.getElementById('email');
  const email = emailEl?.value;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

async function checkTermsAgreement() {
  const termsAgreementEl = document.getElementById('termsAgreement');
  return termsAgreementEl?.checked;
}

async function addSubmitListener() {
  const formEl = document.querySelector('#form');
  formEl.addEventListener(
    'submit',
    async (event) => {
      Swal.fire({ title: 'Please wait ...' });
      event.preventDefault();
      const termsAgreement = await checkTermsAgreement();
      if (termsAgreement === false) {
        await Swal.fire({
          title: 'Oops',
          text: 'Please agree to the terms of service and privacy policy before signin up.',
          confirmButtonText: 'OK',
        });
        return null;
      }
      const emailCheckFormat = await checkEmailFormat();
      if (emailCheckFormat === false) {
        await Swal.fire({
          title: 'Oops',
          text: 'Please provide a valid email address.',
          confirmButtonText: 'OK',
        });
        return null;
      }
      const passwordCheckLength = await checkPasswordLength();
      if (passwordCheckLength === false) {
        await Swal.fire({
          title: 'Oops',
          text: 'Please provide a password with 8 characters or more.',
          confirmButtonText: 'OK',
        });
        return null;
      }
      const passwordCheckMatch = await checkPasswordMatch();
      if (passwordCheckMatch === false) {
        await Swal.fire({
          title: 'Oops',
          text: 'Please make sure password and repeat password are matching.',
          confirmButtonText: 'OK',
        });
        return null;
      }
      const formData = new FormData(formEl);
      const user = {
        email: formData.get('email'),
        password: formData.get('password'),
      };
      const responseJson = await request('POST', '/', user);
      if (responseJson.success === true) {
        await Swal.fire({
          title: 'Success',
          text: 'A confirmation email has been sent to you, please check your inbox. If the email is not in your inbox, it might be in spam.',
          confirmButtonText: 'OK',
        });
        window.location.href = '/app/signin';
      } else if (responseJson?.error) {
        await Swal.fire({
          title: 'Oops',
          text: responseJson?.error?.message,
          confirmButtonText: 'OK',
        });
      }
    },
    false
  );
}

function SignUp() {
  onMount(async () => {
    await addSubmitListener();
    await addPasswordChangeListener();
  });
  return (
    <div
      class="grid grid:cols-1 md:grid-cols-10 md:text-lg text-center"
      style={{ 'font-family': 'Poppins, sans-serif' }}
    >
      <div class="col-start-1 col-span-1 md:col-start-1 md:col-span-full text-3xl md:text-5xl">
        <h1 class="font-[Wizzta] p-8 text-purple-600">TalentSourcery</h1>
      </div>
      <div class="col-start-1 col-span-1 md:col-start-3 md:col-span-6 flex flex-row p-4 bg-white border-2 border-purple-500 rounded-2xl">
        <div class="grid grid-cols-2">
          <div class="col-start-1 col-span-2 md:col-span-1 flex flex-col">
            <form id="form" class="flex flex-col">
              <InputText
                id="email"
                placeholder="Email"
                required
                inputClass="w-[90%] mt-6 mb-2 text-center text-purple-600"
              ></InputText>
              <InputPassword
                id="password"
                placeholder="Password"
                required
                inputClass="w-[90%] mt-2 mb-2 text-center text-purple-600"
              ></InputPassword>
              <InputPassword
                id="repeatPassword"
                placeholder="Repeat password"
                required
                inputClass="w-[90%] mt-2 mb-4 text-center text-purple-600"
              ></InputPassword>
              <p
                id="passwordCheckLength"
                class="mt-0 mb-0 text-xs text-red-600"
              >
                Password must have 8 characters or more
              </p>
              <p id="passwordCheckMatch" class="mt-0 mb-2 text-xs text-red-600">
                Passwords must match
              </p>
              <div class="my-4">
                <input
                  type="checkbox"
                  id="termsAgreement"
                  name="termsAgreement"
                  class="accent-purple-600 w-[1em] h-[1em] mr-2 my-0 text-xs"
                />
                <label for="termsAgreement" class="my-0 text-sm">
                  I agree to the{' '}
                  <a
                    href="https://talentsourcery.io/terms-of-service"
                    class="text-purple-600"
                  >
                    terms
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://talentsourcery.io/privacy-policy"
                    class="text-purple-600"
                  >
                    policy
                  </a>
                </label>
              </div>
              <Button type="submit" id="submit" inputClass="mx-auto mb-2">
                Sign up
              </Button>
            </form>
            <hr class="w-[90%] h-[0.15rem] mx-auto my-6 bg-purple-400 rounded-2xl"></hr>
            <div class="mt-2 mb-6 flex flex-row justify-center">
              <Anchor href="/signin" inputClass="mx-4 my-0 text-sm">
                Sign in
              </Anchor>
            </div>
          </div>
          <div class="col-start-2 col-span-1 invisible md:visible mx-auto my-auto">
            <img
              id="sourcerer"
              src="/images/sourcerer.png"
              alt="TalentSourcerer"
              title="TalentSourcerer generated by AI"
              class="w-64 h-64"
            />
          </div>
        </div>
      </div>
      <Waves />
    </div>
  );
}

export default SignUp;
