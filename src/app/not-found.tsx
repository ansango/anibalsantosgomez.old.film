import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Container, Section } from "@/components";

export default function NotFound() {
  return (
    <main>
      <Section className="flex flex-col items-center justify-center h-screen">
        <Container className="space-y-5 text-center">
          <h1>
            <span>
              404 - <br className="sm:hidden" />
              <br className="hidden md:block" />
              Página no encontrada
            </span>
          </h1>
          <p>
            <Balancer>La página que estás buscando no existe.</Balancer>
          </p>
          <Link className="block" href="/">
            Volver al inicio
          </Link>
        </Container>
      </Section>
    </main>
  );
}
