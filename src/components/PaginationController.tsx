import { Pagination } from "@mui/material";

interface PaginationProps {
  pageNumber: number;
  onChange: (page: number) => void;
  totalPages: number;
}

const PaginationController = ({
  pageNumber,
  onChange,
  totalPages,
}: PaginationProps): JSX.Element => (
  <Pagination
    count={totalPages}
    page={pageNumber}
    onChange={(event, value) => onChange(value)}
    siblingCount={1}
    boundaryCount={1}
    color="primary"
    size="small"
  />
);

export default PaginationController;
