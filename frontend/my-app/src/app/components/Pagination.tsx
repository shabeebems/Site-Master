import Pagination from '@mui/material/Pagination';

interface PaginationPageProps {
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}


const PaginationPage: React.FC<PaginationPageProps> = ({ count, onChange }) => {
  return (
    <div className="mt-8 flex justify-center gap-2 flex-wrap p-4 rounded-lg">
      <Pagination
        count={count}
        onChange={onChange}
        color="primary"
        shape="rounded"
      />
    </div>
  )
}

export default PaginationPage
