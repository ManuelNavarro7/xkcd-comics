// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import algoliasearch from "algoliasearch/lite";
const client = algoliasearch("8ZKUABN2PU", "ae98fb109da86f7c85a4407ad961d86a");
const index = client.initIndex("prod_comics");

import { search } from "../../services/index.js";

export default async function handler(req, res) {
  try {
    const { query } = req;
    const q = query.q;
    // console.log(q);
    const { results } = await search({ q });
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
