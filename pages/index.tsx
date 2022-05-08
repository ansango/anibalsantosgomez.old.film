import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Link href="blog">
        <a>Blog</a>
      </Link>
    </div>
  );
};

export default Home;
