import Navbar from '../../components/website/navbar.jsx';
import Footer from '../../components/website/footer.jsx';

function Gdpr() {
  return (
    <div>
      <Navbar />
      <section class="p-4 pb-8 md:p-12">
        <h1 class="text-3xl sm:text-5xl p-4 pb-12 text-center font-bold">
          GDPR compliance
        </h1>

        <h1 class="px-8 pt-8 text-lg md:text-xl">
          TalentSourcery was designed to be GDPR compliant from the ground up.
          In our{' '}
          <a href="/privacy-policy" class="text-purple-500">
            privacy policy, section 10
          </a>
          , you will find our GDPR related policy.
          <br />
          However, here's a quick summary:
          <br />
          <br />
        </h1>

        <ul class="">
          <li class="px-8 py-2 text-lg md:text-xl">
            <span class="text-purple-500">●</span>
            &ensp;Only data that is publicly available in the web is acquirable
            by our service.
          </li>
          <li class="px-8 py-2 text-lg md:text-xl">
            <span class="text-purple-500">●</span>
            &ensp;The data we acquire from different sources, such as LinkedIn,
            is not stored in our database. We only store metadata about what was
            done.
          </li>
          <li class="px-8 py-2 text-lg md:text-xl">
            <span class="text-purple-500">●</span>
            &ensp;You can execute all your rights by sending an email to{' '}
            <span class="text-purple-500">support@talentsourcery.io</span>.
            <br />
            For example, you can ask us to fully delete your account and data,
            or request a copy of your data in human or machine readable formats.
          </li>
        </ul>
        <p class="px-8 py-8 text-lg md:text-xl">
          We'll be happy to serve any request GDPR oriented.
        </p>
      </section>
      <Footer />
    </div>
  );
}

export default Gdpr;
