import tinaClient from "../../../.tina/__generated__/client";

type Params = {
  filename: string;
};

export async function getPage({ params }: { params: Params }) {
  const args = { relativePath: `${params.filename}.mdx` };

  try {
    const {
      data: { page },
    } = await tinaClient.queries.page(args);

    return page;
  } catch (error) {
    console.error("Error while getting page", error);
    return null;
  }
}
