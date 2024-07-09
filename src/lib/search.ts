"use server";

import algoliasearch from "algoliasearch";
const client = algoliasearch(
  process.env.ALGOLIA_PROJECT!,
  process.env.ALGOLIA_KEY!
);
const index = client.initIndex("zk-jobs");

export async function searchJobs(params: {
  query: string;
  hitsPerPage: number;
  currentPage: number;
}): Promise<{ hits: any[]; nbHits: number; nbPages: number; page: number }> {
  const { query, hitsPerPage, currentPage } = params;
  console.log({ query, hitsPerPage, currentPage });
  // TODO: limit return fields

  const result = await index.search(query, {
    hitsPerPage,
    page: currentPage ?? 0,
    attributesToRetrieve: [
      "jobId",
      "timeCreated",
      "repo",
      "jobStatus",
      "metadata",
      "chain",
    ],
  });

  console.log(result);
  const { hits, nbHits, nbPages, page } = result;
  return { hits, nbHits, nbPages, page };
}
