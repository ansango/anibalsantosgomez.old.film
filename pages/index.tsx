import Container from "components/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { NextPage } from "next";

// export async function getStaticProps({ locale }) {
//   console.log("locale", locale);
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common", "footer"])),
//     },
//   };
// }

const Home: NextPage = () => {
  return <Container>Hola!</Container>;
};

export default Home;
