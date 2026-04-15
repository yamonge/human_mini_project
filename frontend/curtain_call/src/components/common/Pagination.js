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

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <PageButton
            key={page}
            onClick={() => onPageChange(page)}
            $active={page === currentPage}
            $width={width}
            $height={height}
          >
            {page}
          </PageButton>
        ),
      )}

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
