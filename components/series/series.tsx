import React from "react";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { BsArrowRight } from "react-icons/bs";
import { useTheme } from "../layout";
import { formatDate } from "../../utils";
import Image from "next/image";

export const Series = ({ data }) => {
  const theme = useTheme();
  const titleColorClasses = {
    blue: "group-hover:text-blue-600 dark:group-hover:text-blue-300",
    teal: "group-hover:text-teal-600 dark:group-hover:text-teal-300",
    green: "group-hover:text-green-600 dark:group-hover:text-green-300",
    red: "group-hover:text-red-600 dark:group-hover:text-red-300",
    pink: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
    purple: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
    orange: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
    yellow: "group-hover:text-yellow-500 dark:group-hover:text-yellow-300",
  };

  return (
    <>
      <div className="relative">
        <div className="pb-4 border-b border-gray-600">
          <h3 className="text-xl font-semibold leading-6 text-neutral-600">
            All series
          </h3>
        </div>
      </div>
      <div className="space-y-8 lg:divide-y lg:divide-gray-100">
        {data.map(({ node }) => {
          const serie = node;
          return (
            <Link
              key={serie._sys.filename}
              href={`/serie/` + serie._sys.filename}
              passHref
            >
              <a className="pt-8 sm:flex lg:items-end group">
                <div className="mb-4 sm:mb-0 sm:mr-4">
                  {serie.cover && (
                    <div className="w-full relative sm:w-48 md:w-64 lg:w-32">
                      <Image
                        className="object-cover w-full"
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
                    <h2 className="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl">
                      {serie.title}
                    </h2>
                  </p>
                  <p className="mt-2 text-lg text-gray-500">
                    A wonderful serenity has taken possession of my entire soul,
                    like these sweet mornings of spring which I enjoy with my
                    whole heart.
                  </p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};
