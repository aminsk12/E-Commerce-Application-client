import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};
interface PaginationProps {
  meta: TMeta;
  onPageChange: (page: number) => void;
}

export function DynamicPagination({ meta, onPageChange }: PaginationProps) {
  const { page, totalPage } = meta;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="mb-6">
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              //  disabled={page === 1}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {Array.from({ length: totalPage }, (_, idx) => idx + 1)
            .slice(Math.max(0, page - 2), page + 1) // Show nearby pages
            .map((pg) => (
              <PaginationItem key={pg}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(pg)}
                  isActive={pg === page}
                >
                  {pg}
                </PaginationLink>
              </PaginationItem>
            ))}

          {/* Ellipsis for Skipped Pages */}
          {totalPage > 3 && page < totalPage - 2 && <PaginationEllipsis />}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(page + 1)}
              // disabled={page === totalPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
