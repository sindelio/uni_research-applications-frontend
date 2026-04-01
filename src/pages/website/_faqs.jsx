import { onMount } from 'solid-js';
import Navbar from '../../components/website/navbar.jsx';
import Footer from '../../components/website/footer.jsx';

async function addToggleToQuestions(index) {
  const questionEl = document.getElementById(`question${index}`);
  let toggle = false;
  questionEl.addEventListener('click', () => {
    const plusElement = document.getElementById(`plus${index}`);
    const detailsElement = document.getElementById(`details${index}`);
    if (toggle === false) {
      plusElement.classList.add('hidden');
      detailsElement.classList.remove('hidden');
      toggle = true;
    } else if (toggle === true) {
      plusElement.classList.remove('hidden');
      detailsElement.classList.add('hidden');
      toggle = false;
    }
  });
}

function Faqs() {
  onMount(async () => {
    for (let i = 1; i < 4; i += 1) {
      addToggleToQuestions(i);
    }
  });
  return (
    <div>
      <Navbar />
      <section class="grid grid-cols-1 grid-rows-12 md:grid-cols-12 p-2 pb-8 md:p-12">
        <h1 class="col-start-1 col-span-full text-3xl md:text-5xl p-4 pb-8 md:pb-12 text-center font-bold">
          Frequently Asked Questions - FAQs
        </h1>
        <div
          id="question1"
          class="col-start-1 col-span-1 md:col-span-12 row-start-2 mx-8 my-4 p-2 border-2 border-purple-400 rounded-2xl shadow-lg hover:cursor-pointer"
        >
          <h1 class="p-2 text-center font-bold text-lg md:text-xl">
            How does the data I get look like?
          </h1>
          <p id="plus1" class="pl-8 text-center text-purple-500 text-3xl">
            +
          </p>
          <p id="details1" class="hidden p-8 pb-4 text-md md:text-lg">
            The data you will get after a search is finished will be available
            in Comma Separated Value - CSV and JavaScript Object Notation - JSON
            formats. The CSV is intended for humans - talent sourcers, whereas
            the JSON is intended for machines - API integrations. Note that the
            actual contents of the data will vary depending on the target
            website it was acquired from. Further details will not be listed
            here, because the way we prepare the data is a constant evolving
            process. If you would like more details,{' '}
            <a
              href="https://calendly.com/thelokenbergs/meet-talentsourcery"
              target="_blank"
              rel="noreferrer"
              class="text-purple-600"
            >
              please book a demo with us.
            </a>
          </p>
        </div>
        <div
          id="question2"
          class="col-start-1 col-span-1 md:col-span-12 row-start-3 mx-8 my-4 p-2 border-2 border-purple-400 rounded-2xl shadow-lg hover:cursor-pointer"
        >
          <h1 class="p-2 text-center font-bold text-lg md:text-xl">
            What happens if there's an issue with my search?
          </h1>
          <p id="plus2" class="pl-8 text-center text-purple-500 text-3xl">
            +
          </p>
          <p id="details2" class="hidden p-8 pb-4 text-md md:text-lg">
            Don't worry, if a search fails your search credits will be intact.
            <br />
            Also, any errors are sent automatically to us, so those errors are
            fixed asap.
            <br />
            We'll help you if there's anything unexpected.
          </p>
        </div>
        <div
          id="question3"
          class="col-start-1 col-span-1 md:col-span-12 row-start-4 mx-8 my-4 p-2 border-2 border-purple-400 rounded-2xl shadow-lg hover:cursor-pointer"
        >
          <h1 class="p-2 text-center font-bold text-lg md:text-xl">
            Can I use the app in my smartphone?
          </h1>
          <p id="plus3" class="pl-8 text-center text-purple-500 text-3xl">
            +
          </p>
          <p id="details3" class="hidden p-8 pb-4 text-md md:text-lg">
            Not currently. The web app is intended for professional talent
            sourcers working on a computer or laptop.
            <br />
            However, we have plans to support all screen sizes in the future.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Faqs;
