import { Container } from "../util/container";
import { Section } from "../util/section";

export const Latest = ({ data }) => {
  return (
    <Section>
      <Container>
        <div className="pb-4 border-b border-gray-600">
          <h3 className="text-xl font-semibold leading-6 text-gray-800">
            Latest Entries
          </h3>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
            <div className="flex flex-col mb-12 overflow-hidden cursor-pointer">
              <a href="/blog-post">
                <div className="flex-shrink-0">
                  <img
                    className="object-cover w-full"
                    src={data.image.src}
                    alt=""
                  />
                </div>
              </a>
              <div className="flex flex-col justify-between flex-1">
                <a href="/blog-post"></a>
                <div className="flex-1">
                  <a href="/blog-post">
                    <div className="flex pt-6 space-x-1 text-sm text-gray-500">
                      <time dateTime="2020-03-10"> Mar 10, 2020 </time>
                      <span aria-hidden="true"> · </span>
                      <span> 4 min read </span>
                    </div>
                  </a>
                  <a href="#" className="block mt-2 space-y-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                      Typography on app.
                    </h3>
                    <p className="text-lg font-normal text-gray-500">
                      Filling text so you can see how it looks like with text.
                      Did I said text?
                    </p>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-12 overflow-hidden cursor-pointer">
              <a href="/blog-post">
                <div className="flex-shrink-0">
                  <img
                    className="object-cover w-full"
                    src={data.image.src}
                    alt=""
                  />
                </div>
              </a>
              <div className="flex flex-col justify-between flex-1">
                <a href="/blog-post"></a>
                <div className="flex-1">
                  <a href="/blog-post">
                    <div className="flex pt-6 space-x-1 text-sm text-gray-500">
                      <time dateTime="2020-03-10"> Mar 10, 2020 </time>
                      <span aria-hidden="true"> · </span>
                      <span> 4 min read </span>
                    </div>
                  </a>
                  <a href="#" className="block mt-2 space-y-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                      Typography on app.
                    </h3>
                    <p className="text-lg font-normal text-gray-500">
                      Filling text so you can see how it looks like with text.
                      Did I said text?
                    </p>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-12 overflow-hidden cursor-pointer">
              <a href="/blog-post">
                <div className="flex-shrink-0">
                  <img
                    className="object-cover w-full"
                    src={data.image.src}
                    alt=""
                  />
                </div>
              </a>
              <div className="flex flex-col justify-between flex-1">
                <a href="/blog-post"></a>
                <div className="flex-1">
                  <a href="/blog-post">
                    <div className="flex pt-6 space-x-1 text-sm text-gray-500">
                      <time dateTime="2020-03-10"> Mar 10, 2020 </time>
                      <span aria-hidden="true"> · </span>
                      <span> 4 min read </span>
                    </div>
                  </a>
                  <a href="#" className="block mt-2 space-y-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                      Typography on app.
                    </h3>
                    <p className="text-lg font-normal text-gray-500">
                      Filling text so you can see how it looks like with text.
                      Did I said text?
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
