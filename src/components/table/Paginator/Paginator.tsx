import { cn, isNumber } from "@/lib/utils/utils";
import { Button } from "@headlessui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Props for the Paginator component
 */
export interface PaginatorProps {
  /** Current active page number (1-indexed) */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
  /** Callback fired when user navigates to a different page */
  onPageChange: (page: number) => void;
}

/**
 * Pagination component with ellipsis support for large page counts.
 * Displays page numbers with smart ellipsis placement and navigation arrows.
 * 
 * @example
 * ```tsx
 * <Paginator
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
export const Paginator = ({ currentPage, totalPages, onPageChange }: PaginatorProps) => {
  const generatePages = () => {
    const pages: (number | string)[] = [];

    const addRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) pages.push(i);
    };

    if (totalPages <= 5) {
      addRange(1, totalPages);
    } else {
      const showLeftEllipsis = currentPage > 3;
      const showRightEllipsis = currentPage < totalPages - 2;

      pages.push(1);

      if (showLeftEllipsis) pages.push("...");

      addRange(
        Math.max(2, currentPage - 1),
        Math.min(totalPages - 1, currentPage + 1)
      );

      if (showRightEllipsis) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (isNumber(page) && page !== currentPage) onPageChange(page);
  };

  const pagesClassName = (page: number | string) => {
    return cn(
      styles.pageButton,
      currentPage === page && styles.pageButtonActive
    );
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination navigation"
      className={styles.container}
    >
      <Button
        aria-label="Go to previous page"
        className={styles.arrowButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeft size={20} />
      </Button>

      {generatePages().map((page) => (
        <Button
          key={page}
          aria-label={page === "..." ? "More pages" : `Go to page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
          className={pagesClassName(page)}
          onClick={() => handlePageClick(page)}
          disabled={page === "..."}
        >
          {page}
        </Button>
      ))}

      <Button
        aria-label="Go to next page"
        className={styles.arrowButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRight size={20} />
      </Button>
    </nav>
  );
};

const styles = {
  container: "flex items-center gap-2 bg-white shadow-lg rounded-sm p-2",
  arrowButton: "px-2 text-gray cursor-pointer disabled:cursor-not-allowed hover:opacity-70 transition-opacity duration-200",
  pageButton: "w-7 h-7 text-gray cursor-pointer disabled:cursor-not-allowed hover:opacity-70 transition-opacity duration-200",
  pageButtonActive: "bg-blue text-white rounded-sm",
} as const;
