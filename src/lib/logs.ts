"use server";

import {
  CloudWatchLogsClient,
  GetLogEventsCommand,
  GetLogEventsCommandOutput,
} from "@aws-sdk/client-cloudwatch-logs";
import next from "next";
const { LOGS_ID, LOGS_KEY } = process.env;

export interface LogStream {
  /** The log group name */
  logGroupName: string;

  /** The log stream name */
  logStreamName: string;
}

export interface LogEvent {
  chain: string;
  timeCreated: number;
  operation: string;
  text: string;
}

export async function getLogs(): Promise<LogEvent[]> {
  const result: LogEvent[] = [];
  const logStreams: LogStream[] = [
    { logGroupName: "winston", logStreamName: "devnet" },
    { logGroupName: "winston", logStreamName: "mainnet" },
  ];

  try {
    const client = new CloudWatchLogsClient({
      region: "eu-west-1",
      credentials: {
        accessKeyId: LOGS_ID!,
        secretAccessKey: LOGS_KEY!,
      },
    });

    for (const log of logStreams) {
      let finished = false;
      let nextToken: string | undefined = undefined;
      let count = 0;
      while (!finished && count < 10) {
        count++;
        const command = new GetLogEventsCommand({
          logGroupName: log.logGroupName,
          logStreamName: log.logStreamName,
          startTime: Date.now() - 1000 * 60 * 60 * 24 * 7,
          limit: 100,
          nextToken,
        });

        const data: any = await client.send(command);
        /*
        console.log(
          "getLogs events for",
          log.logStreamName,
          data.events?.length
        );
        */
        //console.log("getLogs", data);
        if (data.nextBackwardToken === undefined) {
          finished = true;
        } else {
          nextToken = (data as any).nextBackwardToken;
        }

        //if (data.events?.length === 0) finished = true;

        for (const event of data.events ?? []) {
          let text: any = "parse error";
          let operation = "unknown";
          try {
            const json = JSON.parse(event.message ?? "{}");
            const msg = flat(json.message);
            const txt = flat(json.text);
            text =
              msg === ""
                ? flat(json.text)
                : msg + (txt === "" ? "" : ": " + txt);
            if (json.name) text += " name:" + flat(json.name);
            if (json.hash) text += " hash:" + flat(json.hash);
            if (json.winstonComponent) operation = json.winstonComponent;
          } catch (error) {
            text = event.message ?? "parse error";
          }
          result.push({
            chain: log.logStreamName,
            timeCreated: event.ingestionTime ?? Date.now(),
            text,
            operation,
          });
        }
      }
    }
    // sort by timeCreated
    result.sort((a, b) => b.timeCreated - a.timeCreated);
    console.log("getLogs result", result.length);
    return result;
  } catch (error: any) {
    console.error("getLogs error:", error);
    return [];
  }
}

function flat(data: any): string {
  if (typeof data === "string") return data;
  if (typeof data === "number") return data.toString();
  if (typeof data === "boolean") return data.toString();
  if (typeof data === "undefined") return "";
  if (data === null) return "";
  if (Array.isArray(data)) return data.map(flat).join(" ");
  if (typeof data === "object") {
    return Object.keys(data)
      .map((key) => key + ":" + flat(data[key]))
      .join(" ");
  }
  if (data.toString !== undefined) return data.toString();
  return "unknown";
}
