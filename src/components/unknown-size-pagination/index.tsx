import { Pagination, PaginationProps } from 'antd';

const PAGE_ITEMS = 10;
const PAGE_SIZES = 3;
const TOTAL_ITEMS = PAGE_SIZES * PAGE_ITEMS;
// pageIndex: 1 - 2 - 3
const PAGE_INDEX = {
  first: 1,
  center: 2,
  last: 3
};

interface PageInfo {
  endCursor?: string;
  hasNextPage?: boolean;
}

interface UnknownSizePaginationProps extends PaginationProps {
  pageInfo?: PageInfo;
  onPrev?: (token: string) => void;
  onNext?: (token: string) => void;
}

const itemRender: PaginationProps['itemRender'] = (_, type) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return;
};

const getCurrentPageIndex = (pageInfo?: PageInfo) => {
  const enableNext = pageInfo?.hasNextPage;
  const enablePrev = pageInfo?.endCursor;

  if (enablePrev && enableNext) {
    return PAGE_INDEX.center;
  }

  if (enablePrev) {
    return PAGE_INDEX.last;
  }

  if (enableNext) {
    return PAGE_INDEX.first;
  }

  return;
};

export default function UnknownSizePagination(props: UnknownSizePaginationProps) {
  const { pageInfo, onNext, onPrev } = props;
  const currentPage = getCurrentPageIndex(pageInfo);

  const onChange = (page: number) => {
    if (page === PAGE_INDEX.last && onNext) {
      onNext(pageInfo?.endCursor!);
    }

    if (page === PAGE_INDEX.first && onPrev) {
      onPrev(pageInfo?.endCursor!);
    }
  };

  if (!currentPage) {
    return <></>;
  }

  return (
    <Pagination
      { ...props }
      current={currentPage}
      itemRender={itemRender}
      onChange={onChange}
      total={TOTAL_ITEMS}
    />
  );
}
