import Navbar from '../../components/website/navbar.jsx';
import Footer from '../../components/website/footer.jsx';

function LinkedinBanner() {
  return (
    <div>
      <Navbar />
      <section class="p-16 text-center gradient text-white">
        <div class="flex flex-row justify-center p-8 border-2 border-white">
          <div class="pl-30 pt-4">
            <h1 class="px-4 py-1 bg-white font-[Wizzta] text-purple-500 text-5xl rounded-lg shadow-md">
              TalentSourcery
            </h1>
            <h1 class="py-2 font-[Poppins]">Magical data provider</h1>
          </div>
          <div>
            <img
              class="ml-8 w-18 h-28"
              src="../../public/images/sourcerer.png"
            ></img>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default LinkedinBanner;
