import styled from "styled-components";

const Pagination = ({
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
  width = 28,
  height = 28,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const MAX_VISIBLE_PAGES = 5;
  const halfRange = Math.floor(MAX_VISIBLE_PAGES / 2);

  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

  // 뒤쪽 페이지가 모자라면 앞쪽 페이지를 늘려서 최대 5개를 유지한다.
  startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Wrapper>
      <ArrowButton
        onClick={handlePrev}
        disabled={currentPage === 1}
        $width={width}
        $height={height}
      >
        &lt;
      </ArrowButton>

      {visiblePages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          $active={page === currentPage}
          $width={width}
          $height={height}
        >
          {page}
        </PageButton>
      ))}

      <ArrowButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        $width={width}
        $height={height}
      >
        &gt;
      </ArrowButton>
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PageButton = styled.button`
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  border-radius: 50%;
  border: 1px solid ${({ $active }) => ($active ? "#C9A84C" : "#222b3a")};
  background: ${({ $active }) => ($active ? "#C9A84C" : "transparent")};
  color: ${({ $active }) => ($active ? "#111827" : "#8b95a7")};
  font-size: 12px;
  cursor: pointer;
`;

const ArrowButton = styled.button`
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  border-radius: 50%;
  border: 1px solid #222b3a;
  background: transparent;
  color: #8b95a7;
  font-size: 12px;
  cursor: pointer;

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
`;
