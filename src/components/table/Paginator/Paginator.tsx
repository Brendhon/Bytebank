import { cn, isNumber } from "@/lib/utils/utils";
import { Button } from "@headlessui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default ({ currentPage, totalPages, onPageChange }: PaginatorProps) => {
  // Function to generate the pages array with ellipses
  const generatePages = () => {
    // Initialize an array to store the pages or ellipsis
    const pages: (number | string)[] = [];

    // Helper function to add a range of numbers to the pages array
    const addRange = (start: number, end: number) => {
      // Add each number in the range to the pages array
      for (let i = start; i <= end; i++) pages.push(i);
    };

    // If the total number of pages is 5 or less, show all pages
    if (totalPages <= 5) addRange(1, totalPages);
    else {
      // If there are more than 5 pages, determine which pages to show
      const showLeftEllipsis = currentPage > 3; // Show "..." on the left if the current page is greater than 3
      const showRightEllipsis = currentPage < totalPages - 2; // Show "..." on the right if the current page is less than totalPages - 2

      // Always include the first page
      pages.push(1);

      // Add "..." if needed on the left
      if (showLeftEllipsis) pages.push("...");

      // Add the range of pages around the current page
      addRange(
        Math.max(2, currentPage - 1), // Start range at 2 or currentPage - 1, whichever is larger
        Math.min(totalPages - 1, currentPage + 1) // End range at totalPages - 1 or currentPage + 1, whichever is smaller
      );

      // Add "..." if needed on the right
      if (showRightEllipsis) pages.push("...");

      // Always include the last page
      pages.push(totalPages);
    }

    // Return the array of pages and ellipses
    return pages;
  };

  // Function to handle page click
  const handlePageClick = (page: number | string) => {
    if (isNumber(page) && page !== currentPage) onPageChange(page);
  };

  // Function to determine the class name for each page button
  const pagesClassName = (page: number | string) => {
    return cn(
      "w-7 h-7 text-gray cursor-pointer disabled:cursor-not-allowed hover:opacity-70 transition-opacity duration-200",
      currentPage === page && "bg-blue text-white rounded-sm"
    )
  };

  // Arrow buttons class name
  const arrowClassName = "px-2 text-gray cursor-pointer disabled:cursor-not-allowed hover:opacity-70 transition-opacity duration-200";

  // Render the paginator component
  return (
    <div className="flex items-center gap-2 bg-white shadow-lg rounded-sm p-2">
      <Button
        className={arrowClassName}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <ArrowLeft size={20} />
      </Button>

      {generatePages().map((page, index) => (
        <Button
          key={index}
          className={pagesClassName(page)}
          onClick={() => handlePageClick(page)}
          disabled={page === "..."}>
          {page}
        </Button>
      ))}

      <Button
        className={arrowClassName}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <ArrowRight size={20} />
      </Button>
    </div>
  );
};
