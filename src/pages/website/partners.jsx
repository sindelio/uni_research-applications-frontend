import Navbar from '../../components/website/navbar.jsx';
import Footer from '../../components/website/footer.jsx';

function Partners() {
  return (
    <div>
      <Navbar />
      <section class="p-4 pb-8 md:p-12">
        <h1 class="text-3xl md:text-5xl p-4 pb-12 text-center font-bold">
          Partners
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-12 grid-rows-12 bg-white p-8 pb-12">
          <div class="pt-4 ml-4 mb-4 col-start-1 md:col-start-2 md:col-span-3 row-start-2">
            <div class="p-6 pb-2 text-gray-800 border-2 border-purple-400 rounded-2xl shadow-lg hover:cursor-pointer">
              <a
                href="https://thelokenbergs.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  class="w-64 h-12"
                  src="/images/logo-loks.png"
                  alt="The Lokenbergs"
                />
                <p class="my-6 text-center">
                  Recruitment services and training
                </p>
              </a>
            </div>
          </div>
          <div class="pt-4 ml-4 mb-4 col-start-1 row-start-3 md:col-start-5 md:col-span-3 md:row-start-2">
            <div class="p-6 pb-2 text-gray-800 border-2 border-purple-400 rounded-2xl shadow-lg hover:cursor-pointer">
              <a
                href="https://shinier.com.br/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  class="w-64 h-12"
                  src="/images/logo-shinier.png"
                  alt="Shinier"
                />
                <p class="my-6 text-center">Software house</p>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Partners;
