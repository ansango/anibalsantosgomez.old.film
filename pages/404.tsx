import { seoConfig } from "../components/layout/layout";
import { Hero } from "../components/blocks";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";

export default function FourOhFour() {
  return (
    <Layout
      seo={{
        ...seoConfig,
        title: "Not found",
        description: "This Page does not exist",
      }}
    >
      <Container>
        <Hero
          data={{
            headline: "404 - Page Not Found",
            text: "The page you are looking for does not exist.",
            type: "center",
          }}
        />
      </Container>
    </Layout>
  );
}
