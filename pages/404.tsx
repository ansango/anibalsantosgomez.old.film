import ContactForm from "../components/blocks/contact-form";
import { Hero } from "../components/blocks";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";

export default function FourOhFour() {
  return (
    <Layout>
      <Container>
        <Hero
          data={{
            headline: "404 - Page Not Found",
            text: "The page you are looking for does not exist.",
            type: "center",
          }}
        />
      </Container>
      <ContactForm />
    </Layout>
  );
}
