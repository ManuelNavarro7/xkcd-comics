import algoliasearch from "algoliasearch/lite";
const client = algoliasearch("8ZKUABN2PU", "ae98fb109da86f7c85a4407ad961d86a");
const index = client.initIndex("prod_comics");

export const search = async ({ q }) => {
  const { hits } = await index.search(q, {
    attributesToRetrieve: ["id", "title", "img", "alt"],
    hitsPerPage: 10,
  });

  return { results: hits };
};
