import Link from "next/link";
import ExternalLink from "./ExternalLink";
import Structure from "./Structure";

const Footer = () => {
  return (
    <Structure>
      <footer className="flex flex-col justify-center items-start w-full mb-8">
        <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />

        <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <a className="text-gray-500 hover:text-gray-600 transition">
                Home
              </a>
            </Link>
            <Link href="/blog">
              <a className="text-gray-500 hover:text-gray-600 transition">
                Blog
              </a>
            </Link>
            <Link href="/about">
              <a className="text-gray-500 hover:text-gray-600 transition">
                About
              </a>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="https://instagram.com/iamasync">
              Instagram
            </ExternalLink>
            <ExternalLink href="https://twitter.com/iamasync_">
              Twitter
            </ExternalLink>
            <ExternalLink href="https://github.com/ansango">
              GitHub
            </ExternalLink>
          </div>
        </div>
      </footer>
    </Structure>
  );
};

export default Footer;
