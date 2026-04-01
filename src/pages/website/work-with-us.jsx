import Navbar from '../../components/website/navbar.jsx';
import Footer from '../../components/website/footer.jsx';

function WorkWithUs() {
  return (
    <div>
      <Navbar />
      <section class="p-2 pb-8 md:p-12">
        <h1 class="text-3xl md:text-5xl p-4 pb-12 text-center font-bold">
          Opportunities
        </h1>
        <h1 class="p-8 text-lg md:text-xl">
          No opportunities open at the moment.
        </h1>
      </section>
      <Footer />
    </div>
  );
}

export default WorkWithUs;
