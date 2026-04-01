import Navbar from '../../components/app/navbar.jsx';
import Anchor from '../../components/app/anchor.jsx';

function Billing() {
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="text-center ml-72 m-8 flex flex-row mt-[10%]">
        <Anchor href="/app/billing/settings" inputClass="mx-4 px-16 py-12">
          Settings
        </Anchor>
        <br />
        <Anchor href="/app/billing/history" inputClass="mx-4 px-16 py-12">
          History
        </Anchor>
        <br />
        {/* <Anchor disabled inputClass="ml-4 px-16 py-12">Billing stats</Anchor><br/> */}
      </div>
    </div>
  );
}

export default Billing;
