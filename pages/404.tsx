import { Layout } from "../components/layout";
import { Container } from "../components/util/container";

export default function FourOhFour() {
  return (
    <Layout>
      <Container>
        <section>
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex flex-col w-full mb-12 text-center">
              <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                404 - Page Not Found
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
                The page you are looking for does not exist.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
