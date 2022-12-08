import { Hero } from "../components/blocks";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";

export default function FourOhFour() {
  return (
    <Layout
      seo={{
        title: "404",
        description:
          "404 - Página no encontrada, vuelve a la página principal o a la página anterior",
      }}
    >
      <Container>
        <Hero
          data={{
            headline: "404 - Página no encontrada",
            text: "Esta página no existe",
            type: "center",
          }}
        />
      </Container>
    </Layout>
  );
}
