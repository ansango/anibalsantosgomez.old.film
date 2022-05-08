import SwitchLang from "components/SwitchLang";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  
  return (
    <div>
      <SwitchLang />
      <Link href="/blog">
        <a>Blog</a>
      </Link>
    </div>
  );
};

export default Home;
