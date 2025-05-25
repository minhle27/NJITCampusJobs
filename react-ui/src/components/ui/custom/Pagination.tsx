import { useNavigate } from 'react-router-dom';

import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  baseRoute: string;
  type: 'numberList' | 'prevNext';
}

const PaginationWrapper = ({ totalPages, currentPage, setCurrentPage, baseRoute, type }: PaginationWrapperProps) => {
  const navigate = useNavigate();
  const pageNumbers = totalPages ? Array.from({ length: totalPages }, (_, i) => i + 1) : [];

  const maxPageNum = 5;
  const pageNumLimit = Math.floor(maxPageNum / 2);

  const activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length),
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      navigate(`${baseRoute}?page=${currentPage + 1}`);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      navigate(`${baseRoute}?page=${currentPage - 1}`);
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem key={idx}>
        <PaginationLink
          isActive={currentPage === page}
          onClick={() => setCurrentPage(page)}
          href={`${baseRoute}?page=${page}`}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis key="ellipsis-start" onClick={() => setCurrentPage(activePages[0] - 1)} />,
      );
    }

    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() => setCurrentPage(activePages[activePages.length - 1] + 1)}
        />,
      );
    }

    return renderedPages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>

        {type === 'numberList' ? renderPages() : (
          <div className='flex items-center space-x-2'>
            <Input
              type="number"
              value={currentPage}
              onChange={(e) => {
                const page = Math.max(1, Math.min(totalPages, Number(e.target.value)));

                setCurrentPage(page);
              }}
              className='w-14 text-center border rounded-md'
            />
            <span className='text-sm font-medium'>/</span>
            <span className='text-sm font-medium'>{totalPages}</span>
          </div>
        )}

        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationWrapper;
