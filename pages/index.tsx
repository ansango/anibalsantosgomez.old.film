import Container from "components/Container";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        Hola
      </div>
    </Container>
  );
};

export default Home;
