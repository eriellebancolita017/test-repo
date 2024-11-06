import React from "react";
interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalResults: number;
  setPageIndex?: (pageIndex: number) => void;
}

export default function PaginationClassic({
  pageIndex,
  pageSize,
  totalResults,
  setPageIndex,
}: PaginationProps) {
  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePrevious = () => {
    if (setPageIndex) {
      if (pageIndex > 1) {
        setPageIndex(pageIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (setPageIndex) {
      if (pageIndex < totalPages) {
        setPageIndex(pageIndex + 1);
      }
    }
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button
              className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500"
              onClick={handlePrevious}
              disabled={pageIndex === 1}
            >
              &lt;- Previous
            </button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500"
              onClick={handleNext}
              disabled={pageIndex === totalPages}
            >
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {(pageIndex - 1) * pageSize + 1}
        </span>{" "}
        to{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {Math.min(pageIndex * pageSize, totalResults)}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {totalResults}
        </span>{" "}
        results
      </div>
    </div>
  );
}
