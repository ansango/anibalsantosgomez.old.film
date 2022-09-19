import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "..";
import { Icon } from "../../util/icon";

const buttonColorClasses = {
  mono: {
    slate: "text-slate-900 dark:text-slate-50",
    gray: "text-gray-900 dark:text-gray-50",
    zinc: "text-zinc-900 dark:text-zinc-50",
    neutral: "text-neutral-900 dark:text-neutral-50",
    stone: "text-stone-900 dark:text-stone-50",
  },
  primary: {
    red: "text-red-600 dark:text-red-400",
    orange: "text-orange-600 dark:text-orange-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    amber: "text-amber-600 dark:text-amber-400",
    lime: "text-lime-600 dark:text-lime-400",
    green: "text-green-600 dark:text-green-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    teal: "text-teal-600 dark:text-teal-400",
    cyan: "text-cyan-600 dark:text-cyan-400",
    sky: "text-sky-600 dark:text-sky-400",
    blue: "text-blue-600 dark:text-blue-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
    violet: "text-violet-600 dark:text-violet-400",
    purple: "text-purple-600 dark:text-purple-400",
    fuchsia: "text-fuchsia-600 dark:text-fuchsia-400",
    pink: "text-pink-600 dark:text-pink-400",
    rose: "text-rose-600 dark:text-rose-400",
  },
};

export const RawRenderer = ({ rawData }) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`fixed bottom-10 right-10 z-10 flex items-center px-5 py-2 mx-3 my-2 font-semibold text-sm transition duration-150 ease-out rounded transform focus:shadow-outline focus:outline-none whitespace-nowrap opacity-80 hover:opacity-100 hover:shadow-lg ${
          buttonColorClasses[theme.color]
        }`}
      >
        <Icon
          data={{
            name: "eye",
            color: theme.color,
            size: "sm",
          }}
        />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen max-h-screen px-4 py-12 text-center flex flex-col items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="">
                <Dialog.Overlay className="fixed inset-0 bg-gradient-to-br from-gray-800 to-gray-1000 opacity-80" />
              </div>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="flex-1 w-full prose dark:prose-dark max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-1000 shadow-xl rounded-xl inline-flex flex-col max-h-full">
                <pre className="flex-1 overflow-y-auto">
                  <code>{JSON.stringify(rawData, null, 2)}</code>
                </pre>
                <button
                  type="button"
                  className="flex-0 font-semibold text-lg transition duration-150 ease-out opacity-80 hover:opacity-100"
                  onClick={closeModal}
                >
                  Ok!
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
