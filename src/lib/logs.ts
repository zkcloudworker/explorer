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
      const command = new GetLogEventsCommand({
        logGroupName: log.logGroupName,
        logStreamName: log.logStreamName,
        startTime: Date.now() - 1000 * 60 * 60 * 24 * 7,
        limit: 100,
      });

      const data = await client.send(command);
      console.log("getLogs events for", log.logStreamName, data.events?.length);

      for (const event of data.events ?? []) {
        let text = "parse error";
        let operation = "unknown";
        try {
          const json = JSON.parse(event.message ?? "{}");
          if (json.text) text = json.text;
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
    // sort by timeCreated
    result.sort((a, b) => b.timeCreated - a.timeCreated);
    console.log("getLogs result", result.length);
    return result;
  } catch (error: any) {
    console.error("getLogs error:", error);
    return [];
  }
}
