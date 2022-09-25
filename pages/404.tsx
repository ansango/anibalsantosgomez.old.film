import { seoConfig } from "../components/layout/layout";
import { Hero } from "../components/blocks";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";

export default function FourOhFour() {
  return (
    <Layout
      seo={{
        ...seoConfig,
        title: "No encontrada",
        description: "Esta página no existe",
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
