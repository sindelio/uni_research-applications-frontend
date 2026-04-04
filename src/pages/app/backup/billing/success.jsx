import Navbar from '../../../../components/app/navbar.jsx';

function BillingSuccess() {
  return (
    <div class="flex flex-row text-lg">
      <Navbar></Navbar>
      <div class="pl-56">
        <div class="m-16">
          <h1 class="m-2 h-8 text-3xl">Your payment has been confirmed!</h1>
        </div>
      </div>
    </div>
  );
}

export default BillingSuccess;
