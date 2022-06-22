import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AppLogo } from "../lib/components/AppLogo";

export const NotFound = () => {
  return (
    <section className="flex items-center h-full ">
      <Helmet>
        <title>404 - NOT FOUND</title>
      </Helmet>

      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <AppLogo w="125" h="125" />

        <div className="max-w-md text-center">
          <h1 className="mb-8 font-extrabold text-9xl ">
            <span className="sr-only">Error</span>404
          </h1>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 ">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            rel="noopener noreferrer"
            to="/"
            className="bg-orange-200 px-8 py-3 font-semibold rounded"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};
