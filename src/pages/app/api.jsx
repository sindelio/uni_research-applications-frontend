import Navbar from '../../components/app/navbar.jsx';
import Anchor from '../../components/app/anchor.jsx';

function Api() {
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="ml-72 m-8 flex flex-row mt-[10%]">
        <Anchor href="/app/api/keys" inputClass="mr-4 px-16 py-12">
          API keys
        </Anchor>
        <br />
        {/* The req history will be kept here in case it is needed */}
        {/* <Anchor href="/app/api/history" inputClass="mx-4 px-16 py-12">
          Request history
        </Anchor> */}
        <br />
        <Anchor href="/app/api/status" inputClass="mx-4 px-16 py-12">
          API status
        </Anchor>
        <br />
        <Anchor
          href="https://talentsourcery.io/api-docs"
          target="_blank"
          inputClass="mx-4 px-16 py-12"
        >
          API docs
        </Anchor>
        <br />
      </div>
    </div>
  );
}

export default Api;
