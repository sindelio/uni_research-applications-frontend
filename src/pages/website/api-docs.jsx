import Endpoints from '../../components/website/endpoints.jsx';
import Navbar from '../../components/website/navbar.jsx';
import Footer from '../../components/website/footer.jsx';

function ApiDocs() {
  return (
    <div>
      <Navbar />
      <section class="p-2 pb-8 md:p-12">
        <h1 class="text-3xl md:text-5xl p-4 pb-12 text-center font-bold">
          API docs
        </h1>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Intro</h1>
        <p class="px-8 text-md md:text-lg">
          Welcome to the API docs!
          <br />
          The API is RESTful and works with JSON formatted data going in and
          out.
          <br />
          The API will always return an object with 3 properties:
        </p>
        <pre class="p-2">
          <code class="language-json rounded-lg">
            {`
    {
      "success": true,
      "data": {
        // A lot of data here!
      },
      "error": null
    }`}
          </code>
        </pre>
        <br />
        <p class="px-8 text-md md:text-lg">
          If there is an error, then the success property will be{' '}
          <span class="text-purple-500">false</span>, the data property will be{' '}
          <span class="text-purple-500">null</span> and the error will contain a
          status code and a message:
        </p>
        <pre class="p-2">
          <code class="language-json rounded-lg">
            {`
    {
      "success": false,
      "data": null,
      "error": {
        "statusCode": 500,
        "message": "Something went wrong!"
      }
    }`}
          </code>
        </pre>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Authentication</h1>
        <p class="px-8 text-md md:text-lg">
          Users are authenticated via an API key.
          <br />
          When making a request, the user sends the API key in the Authorization
          header:
        </p>
        <pre class="p-2">
          <code class="language-json rounded-lg">
            {`
    {
      "Authorization": "Bearer $API_KEY"
    }`}
          </code>
        </pre>
        <br />
        <p class="px-8 text-md md:text-lg">
          There will be examples in each endpoint.
          <br />
          To get your API key, &nbsp;
          <a
            class="text-purple-500 hover:underline"
            href="https://app.talentsourcery.io/signup"
            target="_blank"
            rel="noreferrer"
          >
            sign up and sign in to the app
          </a>
          , then navigate to API {'>'} API keys.
        </p>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Rate limits</h1>
        <p class="px-8 text-md md:text-lg">
          Each data source has it's own rate limits:
          <br />
          <br />
          LinkedIn: 1.5M requests per day for all users
          <br />
          GitHub: 50k requests per hour for all users
          <br />
          Dribbble: 1M requests per day for all users
          <br />
        </p>

        <h1 class="p-8 font-bold text-xl md:text-3xl">API status</h1>
        <p class="px-8 text-md md:text-lg">
          The API status for each data source can be checked inside the
          <a
            class="text-purple-500 hover:underline"
            href="https://app.talentsourcery.io/signin"
            target="_blank"
            rel="noreferrer"
          >
            app
          </a>{' '}
          in API {'>'} API status.
        </p>

        <h1 class="p-8 font-bold text-xl md:text-3xl">Credit expenditure</h1>
        <p class="px-8 text-md md:text-lg">
          Credits are charged when a request finishes successfully.
          <br />
          If an error happens during a request, there will be no charge for said
          request.
        </p>

        <h1 class="p-8 font-bold text-xl md:text-3xl">
          Resume parsing endpoints
        </h1>
        <Endpoints source="resume" />

        <h1 class="p-8 font-bold text-xl md:text-3xl">LinkedIn endpoints</h1>
        <Endpoints source="linkedin" />

        <h1 class="p-8 font-bold text-xl md:text-3xl">GitHub endpoints</h1>
        <Endpoints source="github" />

        <h1 class="p-8 font-bold text-xl md:text-3xl">Dribbble endpoints</h1>
        <Endpoints source="dribbble" />
      </section>
      <Footer />
    </div>
  );
}

export default ApiDocs;
