import React from "react";
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
const PaginationMain: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPaginationGroup = () => {
    if (totalPages <= 9) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages];
      } else if (currentPage > totalPages - 5) {
        return [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        return [
          1,
          "...",
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          "...",
          totalPages,
        ];
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded"
      >
        Previous
      </button>
      {getPaginationGroup().map((item, index) =>
        typeof item === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(item)}
            className={`px-3 py-1 border rounded ${currentPage === item ? "bg-primaryMain text-white" : ""}`}
          >
            {item}
          </button>
        ) : (
          <span key={index} className="px-3 py-1">
            {item}
          </span>
        ),
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationMain;
