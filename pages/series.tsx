import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Series } from "../components/series";
import { client } from "../.tina/__generated__/client";
import { Layout } from "../components/layout";
import { Hero } from "../components/blocks";

export default function SeriesPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const series = props.data.serieConnection.edges;

  return (
    <Layout>
      <Hero
        data={{
          tagline: "Raw Rolls",
          headline: "Series",
          text: "You can find all the series I've shot and developed here.",
          type: "left",
        }}
      />
      <Section>
        <Container>
          <Series data={series} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.seriesPublishedQuery();

  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
