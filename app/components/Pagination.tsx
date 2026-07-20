'use client';

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({
  itemCount,
  pageSize,
  currentPage
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handlePageChange = (e: React.MouseEvent, pageNumber: number) => {
    e.preventDefault();
    router.push(createPageUrl(pageNumber));
  };

  // Helper logic to render explicit page numbers (optional layout enhancement)
  const renderPageLinks = () => {
    const links = [];
    for (let i = 1; i <= pageCount; i++) {
      // Simple rendering logic: show current, first, last, and immediate neighbors
      if (i === 1 || i === pageCount || (i >= currentPage - 1 && i <= currentPage + 1)) {
        links.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageUrl(i)}
              isActive={currentPage === i}
              onClick={(e) => handlePageChange(e, i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        links.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return links;
  };

  return (
    <ShadcnPagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
            onClick={(e) => currentPage > 1 && handlePageChange(e, currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* Individual Page Number Links */}
        {renderPageLinks()}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={currentPage < pageCount ? createPageUrl(currentPage + 1) : '#'}
            onClick={(e) => currentPage < pageCount && handlePageChange(e, currentPage + 1)}
            aria-disabled={currentPage === pageCount}
            className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;