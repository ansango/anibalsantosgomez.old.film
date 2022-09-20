import React from "react";
import Link from "next/link";
import { formatDate } from "../../lib/utils";

export const Series = ({ data }) => {
  return (
    <div className="space-y-5 sm:space-y-0">
      <div className="relative">
        <div className="pb-4 border-b border-gray-600">
          <h2 className="text-xl font-semibold leading-6 text-gray-800">
            All series
          </h2>
        </div>
      </div>
      <div className="space-y-12 sm:space-y-8 lg:divide-y lg:divide-gray-100">
        {data.map(({ node }) => {
          const serie = node;
          return (
            <article>
              <Link
                key={serie._sys.filename}
                href={`/serie/` + serie._sys.filename}
                passHref
              >
                <a className="pt-8 sm:flex lg:items-end group">
                  <div className="mb-4 sm:mb-0 sm:mr-4">
                    {serie.cover && (
                      <div className="w-full relative sm:w-48 md:w-64 lg:w-32">
                        <img
                          className="object-cover w-full aspect-4/3"
                          alt=""
                          src={serie.cover}
                          width={2048}
                          height={1365}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      {formatDate(serie.publishedAt)}
                    </span>
                    <p className="mt-3 text-lg font-medium leading-6">
                      <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                        {serie.title}
                      </h3>
                    </p>
                    <p className="mt-2 text-lg text-gray-500">
                      A wonderful serenity has taken possession of my entire
                      soul, like these sweet mornings of spring which I enjoy
                      with my whole heart.
                    </p>
                  </div>
                </a>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
};
