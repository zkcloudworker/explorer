/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/2SrYseorKWc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Rubik } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'

rubik({
  subsets: ['latin'],
  display: 'swap',
})

cormorant_garamond({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
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
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import Image from "next/image";

export default function Explorer() {
  return (
    <>
      <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-[#f0f0f0] text-[#f15b22]">
        <Link className="flex items-center gap-2" href="#">
          <CloudIcon className="w-6 h-6" />
          <span
            className="font-semibold"
            style={{
              color: "#f15b22",
            }}
          >
            zkCloudWorker
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link className="hover:underline" href="#">
            Home
          </Link>
          <Link className="hover:underline" href="#">
            Jobs
          </Link>
          <Link className="hover:underline" href="#">
            About
          </Link>
        </nav>
        <Button className="md:hidden" size="icon" variant="ghost">
          <MenuIcon className="w-6 h-6" />
        </Button>
      </header>
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Jobs Explorer</h1>
          <form className="w-full md:w-auto">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                className="pl-10 pr-4 py-2 rounded-md bg-gray-100 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-700"
                placeholder="Search by Job ID, repo, or status"
                type="search"
              />
            </div>
          </form>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Job ID</TableHead>
                <TableHead>Repo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Metadata</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <TableCell>
                  <time dateTime="2023-05-26T12:34:56Z" title="" />
                </TableCell>
                <TableCell className="font-medium">abc123</TableCell>
                <TableCell>user/repo</TableCell>
                <TableCell>
                  <Badge className="bg-green-500 text-white" variant="solid">
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Finished
                  </Badge>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip content="This is a string">
                      <span className="truncate">This is a string</span>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <TableCell>
                  <time dateTime="2023-05-25T09:15:30Z" title="" />
                </TableCell>
                <TableCell className="font-medium">def456</TableCell>
                <TableCell>another/repo</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-500 text-white" variant="solid">
                    <PlayIcon className="w-4 h-4 mr-2" />
                    Started
                  </Badge>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip content="This is a string">
                      <span className="truncate">This is a string</span>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <TableCell>
                  <time dateTime="2023-05-24T16:22:00Z" title="" />
                </TableCell>
                <TableCell className="font-medium">ghi789</TableCell>
                <TableCell>some/repo</TableCell>
                <TableCell>
                  <Badge className="bg-red-500 text-white" variant="solid">
                    <XIcon className="w-4 h-4 mr-2" />
                    Failed
                  </Badge>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip content="This is a string">
                      <span className="truncate">This is a string</span>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <TableCell>
                  <time dateTime="2023-05-23T11:45:15Z" title="" />
                </TableCell>
                <TableCell className="font-medium">jkl012</TableCell>
                <TableCell>other/repo</TableCell>
                <TableCell>
                  <Badge className="bg-blue-500 text-white" variant="solid">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Created
                  </Badge>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip content="This is a string">
                      <span className="truncate">This is a string</span>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <TableCell>
                  <time dateTime="2023-05-22T14:03:45Z" title="" />
                </TableCell>
                <TableCell className="font-medium">mno345</TableCell>
                <TableCell>new/repo</TableCell>
                <TableCell>
                  <Badge className="bg-green-800 text-white" variant="solid">
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Used
                  </Badge>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip content="This is a string">
                      <span className="truncate">This is a string</span>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CloudIcon() {
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

function CloudIconOld(props) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function MenuIcon(props) {
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

function PlayIcon(props) {
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
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
