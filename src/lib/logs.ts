"use server";

import {
  CloudWatchLogsClient,
  GetLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";
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
  text: string;
}

export async function getLogs(): Promise<LogEvent[]> {
  console.log("getLogs");
  const result: LogEvent[] = [];
  const logStreams: LogStream[] = [
    { logGroupName: "winston", logStreamName: "mainnet" },
    { logGroupName: "winston", logStreamName: "devnet" },
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
      const command = new GetLogEventsCommand({
        logGroupName: log.logGroupName,
        logStreamName: log.logStreamName,
      });

      const data = await client.send(command);
      console.log("getLogs events", data.events);

      for (const event of data.events ?? []) {
        let text = "parse error";
        try {
          const json = JSON.parse(event.message ?? "{}");
          if (json.text) text = json.text;
        } catch (error) {
          text = event.message ?? "parse error";
        }
        result.push({
          chain: log.logStreamName,
          timeCreated: event.ingestionTime ?? Date.now(),
          text,
        });
      }
    }
    // sort by timeCreated
    result.sort((a, b) => b.timeCreated - a.timeCreated);
    console.log("getLogs result", result);
    return result;
  } catch (error: any) {
    console.error("getLogs error:", error);
    return [];
  }
}
