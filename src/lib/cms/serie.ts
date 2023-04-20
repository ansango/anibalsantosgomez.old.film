import tinaClient from "../../../.tina/__generated__/client";

type Params = {
  filename: string;
};

export async function getSerie({ params }: { params: Params }) {
  const args = { relativePath: `${params.filename}.mdx` };

  try {
    const {
      data: { serie },
    } = await tinaClient.queries.serie(args);

    return serie;
  } catch (error) {
    console.error("Error while getting serie", error);
    return null;
  }
}
