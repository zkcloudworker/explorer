"use server";

import axios from "axios";

export async function generateJWT(address: string): Promise<string> {
  let answer = await zkCloudWorkerRequest({
    command: "generateJWT",
    id: address,
    auth: process.env.NEXT_PUBLIC_JWT_ACCESS_KEY,
  });

  console.log(`zkCloudWorker answer:`, answer);
  return answer;
}

async function zkCloudWorkerRequest(params: any) {
  const { command, id, auth, mode } = params;
  const apiData = {
    auth: process.env.NEXT_PUBLIC_ZKCW_AUTH,
    command: command,
    jwtToken: process.env.NEXT_PUBLIC_ZKCW_JWT,
    data: {
      id,
      auth,
    },
    chain: `mainnet`,
  };
  const endpoint = process.env.NEXT_PUBLIC_ZKCW_ENDPOINT + "mainnet";

  const response = await axios.post(endpoint, apiData);
  return response.data;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
