import Container from "components/Container";
import Structure from "components/Structure";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container>
      <Structure>
        <div className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 pb-16">
          Hola
        </div>
      </Structure>
    </Container>
  );
};

export default Home;
