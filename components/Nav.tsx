import SwitchLang from "./SwitchLang";
import SwitchTheme from "./SwitchTheme";

import { useCycle, motion, AnimatePresence, useAnimation } from "framer-motion";
import Link from "next/link";

const links = [
  { name: "Home", to: "/", id: 1 },
  { name: "Blog", to: "/blog", id: 3 },
  { name: "About", to: "#", id: 2 },
];
const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const path01Variants = {
  open: { d: "M3.06061 2.99999L21.0606 21" },
  closed: { d: "M0 9.5L24 9.5" },
};

const path02Variants = {
  open: { d: "M3.00006 21.0607L21 3.06064" },
  moving: { d: "M0 14.5L24 14.5" },
  closed: { d: "M0 14.5L15 14.5" },
};

const Nav = () => {
  const [open, cycleOpen] = useCycle(false, true);
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();

  const onClick = async () => {
    cycleOpen();
    if (!open) {
      await path02Controls.start(path02Variants.moving);
      path01Controls.start(path01Variants.open);
      path02Controls.start(path02Variants.open);
    } else {
      path01Controls.start(path01Variants.closed);
      await path02Controls.start(path02Variants.moving);
      path02Controls.start(path02Variants.closed);
    }
  };
  return (
    <div className="flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <div className="">
          <button onClick={onClick}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <motion.path
                {...path01Variants.closed}
                animate={path01Controls}
                transition={{ duration: 0.2 }}
                stroke="#000"
              />
              <motion.path
                {...path02Variants.closed}
                animate={path02Controls}
                transition={{ duration: 0.2 }}
                stroke="#000"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <SwitchLang />
          <SwitchTheme />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{
                width: 0,
                transition: { delay: 0.7, duration: 0.3 },
              }}
              className="h-full absolute mt-60"
            >
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
                className="space-y-2"
              >
                {links.map(({ name, to, id }) => (
                  <Link href={to} key={id} passHref>
                    <motion.div
                      className="bg-gray-200 dark:bg-gray-800 p-3"
                      whileHover={{ scale: 1.1 }}
                      variants={itemVariants}
                    >
                      <a>{name}</a>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Nav;
