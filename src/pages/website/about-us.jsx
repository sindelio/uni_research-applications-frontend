import Navbar from '../../components/website/navbar.jsx';
import Footer from '../../components/website/footer.jsx';

function AboutUs() {
  return (
    <div>
      <Navbar />
      <section class="p-2 pb-8 md:p-12">
        <h1 class="text-3xl md:text-5xl p-4 pb-12 text-center font-bold">
          About us
        </h1>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Team</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4">
          <div class="pt-4 ml-4 mb-4 col-start-1 row-start-1">
            <div class="px-6 pt-4 pb-2 text-gray-800 border-2 border-purple-400 rounded-2xl shadow-lg">
              <img
                src="/images/sid.jpg"
                alt="Sid"
                class="p-4 rounded-full mx-auto w-40 h-40"
              />

              <h3 class="text-lg text-center font-bold leading-none mb-4 pt-4">
                Sindélio H. Lima
              </h3>
              <div class="h-1 bg-purple-700 w-full my-4 py-0 rounded-lg"></div>
              <p class="mb-2 text-center">
                Co-founder
                <br />
                CEO
                <br />
                Software
                <br />
                <br />
                <a
                  href="https://www.linkedin.com/in/sindeliohl/"
                  target="_blank"
                  rel="noreferrer"
                  class="text-lg text-purple-500"
                >
                  <i class="fa-brands fa-linkedin-in "></i>
                </a>
              </p>
            </div>
          </div>

          <div class="pt-4 ml-4 mb-4 col-start-1 row-start-2 sm:col-start-2 sm:row-start-1">
            <div class="px-6 pt-4 pb-2 text-gray-800 border-2 border-purple-400 rounded-2xl shadow-lg">
              <img
                src="/images/rods.jpeg"
                alt="Rods"
                class="p-4 rounded-full mx-auto w-40 h-40"
              />

              <h3 class="text-lg text-center font-bold leading-none mb-4 pt-4">
                Rodrigo N. Bernardi
              </h3>
              <div class="h-1 bg-purple-700 w-full my-4 py-0 rounded-lg"></div>
              <p class="mb-2 text-center">
                Co-founder
                <br />
                CTO
                <br />
                Software
                <br />
                <br />
                <a
                  href="https://www.linkedin.com/in/rodrigobernardi07/"
                  target="_blank"
                  rel="noreferrer"
                  class="text-lg text-purple-500"
                >
                  <i class="fa-brands fa-linkedin-in "></i>
                </a>
              </p>
            </div>
          </div>

          <div class="pt-4 ml-4 mb-4 col-start-1 row-start-3 sm:col-start-1 sm:row-start-2 lg:col-start-3 lg:row-start-1">
            <div class="px-6 pt-4 pb-2 text-gray-800 border-2 border-purple-400 rounded-2xl shadow-lg">
              <img
                src="/images/kim.jpeg"
                alt="Kim"
                class="p-4 rounded-full mx-auto w-40 h-40"
              />

              <h3 class="text-lg text-center font-bold leading-none mb-4 pt-4">
                Kim Lokenberg
              </h3>
              <div class="h-1 bg-purple-700 w-full my-4 py-0 rounded-lg"></div>
              <p class="mb-2 text-center">
                Co-founder
                <br />
                Investor
                <br />
                Sales
                <br />
                <br />
                <a
                  href="https://www.linkedin.com/in/kimdebruyn/"
                  target="_blank"
                  rel="noreferrer"
                  class="text-lg text-purple-500"
                >
                  <i class="fa-brands fa-linkedin-in "></i>
                </a>
              </p>
            </div>
          </div>

          <div class="pt-4 ml-4 mb-4 col-start-1 row-start-4 sm:col-start-2 sm:row-start-2 lg:col-start-4 lg:row-start-1">
            <div class="px-6 pt-4 pb-2 text-gray-800 border-2 border-purple-400 rounded-2xl shadow-lg">
              <img
                src="/images/gordon.jpeg"
                alt="Gordon"
                class="p-4 rounded-full mx-auto w-40 h-40"
              />

              <h3 class="text-lg text-center font-bold leading-none mb-4 pt-4">
                Gordon Lokenberg
              </h3>
              <div class="h-1 bg-purple-700 w-full my-4 py-0 rounded-lg"></div>
              <p class="mb-2 text-center">
                Co-founder
                <br />
                Investor
                <br />
                Sales
                <br />
                <br />
                <a
                  href="https://www.linkedin.com/in/gordonlokenberg/"
                  target="_blank"
                  rel="noreferrer"
                  class="text-lg text-purple-500"
                >
                  <i class="fa-brands fa-linkedin-in "></i>
                </a>
              </p>
            </div>
          </div>
        </div>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Mission</h1>
        <p class="px-8 text-md md:text-lg">
          Our mission is to make up-to-date professional data from people,
          companies and jobs easily accessible to businesses.
          <br />
          Only with up-to-date data can businesses create value in the job
          market.
        </p>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Vision</h1>
        <p class="px-8 text-md md:text-lg">
          Our vision is to become a place where businesses all around the world
          can get high quality and up-to-date talent data, knowing where, when
          and how the data was copied.
        </p>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Values</h1>
        <ul class="">
          <li class="p-4 py-2 text-md md:text-lg">
            &emsp; <span class="text-purple-500">●</span> People first
          </li>
          <li class="p-4 py-2 text-md md:text-lg">
            &emsp; <span class="text-purple-500">●</span> Remote first
          </li>
          <li class="p-4 py-2 text-md md:text-lg">
            &emsp; <span class="text-purple-500">●</span> Enjoyment of the
            journey
          </li>
          <li class="p-4 py-2 text-md md:text-lg">
            &emsp; <span class="text-purple-500">●</span> Excellence with
            simplicity
          </li>
          <li class="p-4 py-2 text-md md:text-lg">
            &emsp; <span class="text-purple-500">●</span> Adaptability and
            flexibility
          </li>
        </ul>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Timeline</h1>
        <ul class="">
          <li class="p-4 py-1 text-md md:text-lg">
            <p>
              <span class="text-purple-500">●</span> Late 2020
            </p>
            &emsp; Sid meets Kim and Gordon in SourceCon, partnership talks
            start
          </li>
          <li class="p-4 py-1 text-md md:text-lg">
            <p>
              <span class="text-purple-500">●</span> Early 2021
            </p>
            &emsp; Sid partners with Kim and Gordon, TalentSourcery is born
          </li>
          <li class="p-4 py-1 text-md md:text-lg">
            <p>
              <span class="text-purple-500">●</span> Early 2021
            </p>
            &emsp; TalentSourcery raises 60k USD from angel investors Kim and
            Gordon
          </li>
          <li class="p-4 py-1 text-md md:text-lg">
            <p>
              <span class="text-purple-500">●</span> Mid 2021
            </p>
            &emsp; First proof-of-concept created, Rodrigo joins part time
          </li>
          <li class="p-4 py-1 text-md md:text-lg">
            <p>
              <span class="text-purple-500">●</span> Late 2021 and 2022
            </p>
            &emsp; Heavy research and software development
          </li>
          <li class="p-4 py-1 text-md md:text-lg">
            <p>
              <span class="text-purple-500">●</span> Mid 2023
            </p>
            &emsp; TalentSourcery pivots from being a sourcing app to an API
          </li>
          <li class="p-4 py-1 text-md md:text-lg">
            <p>
              <span class="text-purple-500">●</span> Mid 2023
            </p>
            &emsp; First deal closed, multiple deals followed
          </li>
          <li class="p-4 py-1 text-md md:text-lg">
            <p>
              <span class="text-purple-500">●</span> The future
            </p>
            &emsp; Much more to come!
          </li>
        </ul>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Location</h1>
        <p class="px-8 text-md md:text-lg">
          TalentSourcery is an international, remote first company.
          <br />
          Currently legally incorporated in Brazil, with plans to incorporate in
          all regions of the globe.
        </p>
      </section>
      <Footer />
    </div>
  );
}

export default AboutUs;
