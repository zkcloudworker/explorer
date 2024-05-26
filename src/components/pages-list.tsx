/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/CbRREBxzBPp
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

/*
const [hits, setHits] = useState<any[]>([]);
const [hitsPerPage, setHitsPerPage] = useState<number>(20);
const [currentPage, setCurrentPage] = useState<number>(0);
const [totalPages, setTotalPages] = useState<number>(0);
const [pageSizes, setPageSizes] = useState<number[]>([20, 50, 100]);
const [totalHits, setTotalHits] = useState<number>(0);
const [searchQuery, setSearchQuery] = useState<string>("");
*/
export function PagesList({
  hitsPerPage,
  currentPage,
  totalPages,
  pageSizes,
  totalHits,
  onChangeHitsPerPage,
  onChangePage,
}: {
  hitsPerPage: number;
  currentPage: number;
  totalPages: number;
  pageSizes: number[];
  totalHits: number;
  onChangeHitsPerPage: (hitsPerPage: number) => void;
  onChangePage: (page: number) => void;
}) {
  const firstElement = currentPage * hitsPerPage + 1;
  const lastElement = Math.min((currentPage + 1) * hitsPerPage, totalHits);
  const showNext = currentPage + 5 < totalPages;
  const pages: number[] = [];
  for (let i = currentPage + 2; i < totalPages && i <= currentPage + 5; i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-between items-center">
      <span>{`Showing ${firstElement} - ${lastElement} out of ${totalHits}`}</span>
      <div className="flex items-center space-x-1">
        {currentPage > 0 && (
          <div>
            <Button
              className="px-3 py-1.5"
              variant="ghost"
              onClick={() =>
                onChangePage(currentPage - 5 < 0 ? 0 : currentPage - 5)
              }
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>

            <Button
              className="px-3 py-1.5"
              variant="ghost"
              onClick={() => onChangePage(0)}
            >
              1
            </Button>
            {currentPage > 1 && <span>...</span>}
          </div>
        )}
        <Button className="px-3 py-1.5" variant="outline">
          {currentPage + 1}
        </Button>
        {pages.map((page) => (
          <Button
            className="px-3 py-1.5"
            variant="ghost"
            key={page}
            onClick={() => onChangePage(page - 1)}
          >
            {page}
          </Button>
        ))}

        {showNext && (
          <div>
            <span>...</span>
            <Button
              className="px-3 py-1.5"
              variant="ghost"
              onClick={() => onChangePage(totalPages - 1)}
            >
              {totalPages}
            </Button>
            <Button
              className="px-3 py-1.5"
              variant="ghost"
              onClick={() =>
                onChangePage(
                  currentPage + 5 > totalPages ? totalPages : currentPage + 5
                )
              }
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <span>Show</span>
        <Select
          defaultValue={`${hitsPerPage}`}
          onValueChange={(value) => {
            onChangePage(0);
            onChangeHitsPerPage(Number(value));
          }}
        >
          <SelectTrigger aria-label="Page size" id="page-size">
            <SelectValue>{hitsPerPage}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {pageSizes.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function ChevronRightIcon(props: any) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronLeftIcon(props: any) {
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
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}