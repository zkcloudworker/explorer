"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { connect, NatsConnection, KV } from "nats.ws";

export interface CloudTransactionWithHash {
  /** The transaction id */
  txId: string;

  /** The transaction */
  transaction: string;

  /** The time received */
  timeReceived: number;

  /** The status of the transaction */
  status: string;
  hash?: string;
}

export default function Tx({ params }: { params: { txId: string } }) {
  const { txId } = params;
  const [hits, setHits] = useState<CloudTransactionWithHash[]>([]);
  const [nc, setNc] = useState<NatsConnection | undefined>(undefined);
  const path = usePathname();

  function updateTxs(tx: CloudTransactionWithHash) {
    setHits((prevHits) => {
      return [tx, ...prevHits];
    });
  }

  async function watch(kv: KV, keys: string[]) {
    const iter = await kv.watch({ key: keys });

    for await (const e of iter) {
      const item = JSON.parse(e.string());
      console.log(`${e.key} @ ${e.revision} -> `, item);
      updateTxs(item);
    }
  }

  useEffect(() => {
    async function startNats(): Promise<void> {
      if (nc === undefined) {
        console.log("txId", txId);
        const nc = await connect({
          servers: process.env.NEXT_PUBLIC_NATS_SERVER,
        });
        setNc(nc);
        const js = nc.jetstream();
        const kv = await js.views.kv("profiles");
        watch(kv, [`zkcloudworker.rolluptx.${txId}`]);
      }
    }
    startNats();
  }, [nc]);

  return (
    <>
      <header className="dark:invert flex items-center justify-between h-16 px-4 md:px-6 bg-[#f0f0f0] text-[#f15b22]">
        <Link className="flex items-center gap-0" href="#">
          <CloudWorkerIcon />
          <CloudWorkerText />
        </Link>
        <nav className="dark:invert hidden md:flex items-center gap-6">
          <Link className="hover:underline" href="#">
            Jobs
          </Link>
          <Link className="hover:underline" href="/jwt">
            JWT
          </Link>
          <Link
            className="hover:underline"
            href="https://docs.zkcloudworker.com"
          >
            Docs
          </Link>
          <Link className="hover:underline" href="https://zkcloudworker.com">
            Login
          </Link>
        </nav>
        <Button className="md:hidden" size="icon" variant="ghost">
          <MenuIcon className="w-6 h-6" />
        </Button>
      </header>
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Rollup Transaction History</h1>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>txId</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>L1 hash</TableHead>
                <TableHead>tx</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hits.map((item) => (
                <TableRow
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  key={item.timeReceived}
                >
                  <TableCell>
                    <time>{new Date(item.timeReceived).toLocaleString()}</time>
                  </TableCell>
                  <TableCell>{item.txId}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.hash ?? ""}</TableCell>
                  <TableCell>{item.transaction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}

function CloudWorkerIcon() {
  return (
    <Image
      src="/zkcloudworker-logo-only.svg"
      alt="zkCloudWorker Logo"
      className="dark:invert"
      width={50}
      height={50}
      priority
    />
  );
}

function CloudWorkerText() {
  return (
    <Image
      src="/zkcloudworker-text-only.svg"
      alt="zkCloudWorker Logo"
      className="dark:invert w-64 h-70 relative object-contain right-10"
      width={250}
      height={50}
      priority
    />
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
