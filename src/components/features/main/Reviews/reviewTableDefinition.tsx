import { ColumnsType } from 'antd/es/table';
import { ReviewInterface } from '../../../../interfaces/app-review.interface';

export const columnsRequests: ColumnsType<ReviewInterface> = [
  {
    key: 'id',
    title: 'Review Id',
    dataIndex: 'id',
    ellipsis: true,
    sorter: (a: ReviewInterface, b: ReviewInterface) => {
      const x = a.id.toUpperCase();
      const y = b.id.toUpperCase();
      return x < y ? -1 : x > y ? 1 : 0;
    }
  },
  {
    key: 'requestId',
    title: 'Request Id',
    dataIndex: 'requestId',
    ellipsis: true,
    sorter: (a: ReviewInterface, b: ReviewInterface) => {
      const x = a.requestId.toUpperCase();
      const y = b.requestId.toUpperCase();
      return x < y ? -1 : x > y ? 1 : 0;
    }
  },
  {
    key: 'author',
    title: 'Author',
    dataIndex: 'author',
    ellipsis: true,
    sorter: (a: ReviewInterface, b: ReviewInterface) => {
      const x = a.author.toUpperCase();
      const y = b.author.toUpperCase();
      return x < y ? -1 : x > y ? 1 : 0;
    }
  },
  {
    key: 'state',
    title: 'State',
    dataIndex: 'state',
    ellipsis: true,
    sorter: (a: ReviewInterface, b: ReviewInterface) => {
      const x = a.state.toUpperCase();
      const y = b.state.toUpperCase();
      return x < y ? -1 : x > y ? 1 : 0;
    }
  }
];
