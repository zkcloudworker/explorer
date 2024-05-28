"use server";

import algoliasearch from "algoliasearch";
const client = algoliasearch(
  process.env.ALGOLIA_PROJECT!,
  process.env.ALGOLIA_KEY!
);
const index = client.initIndex("jobs");

export async function searchJobs(params: {
  query: string;
  hitsPerPage: number;
  currentPage: number;
}): Promise<{ hits: any[]; nbHits: number; nbPages: number; page: number }> {
  const { query, hitsPerPage, currentPage } = params;
  // TODO: limit return fields
  const { hits, nbHits, nbPages, page } = await index.search(query, {
    hitsPerPage,
    page: currentPage,
    attributesToRetrieve: [
      "jobId",
      "timeCreated",
      "repo",
      "jobStatus",
      "metadata",
    ],
  });
  return { hits, nbHits, nbPages, page };
}
