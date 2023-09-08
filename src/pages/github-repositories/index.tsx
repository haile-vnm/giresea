import { Pagination } from 'antd';
import DebounceSearchInput from '../../components/debounce-search-input';
import GitHubRepositories from '../../components/github-repositories';
import { useState } from 'react';
import { useReactRepositorySearch } from '../../integrations/github/repository';

export default function GitHubRepositoriesPage() {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState({});
  const { data, error, loading } = useReactRepositorySearch({ ...page, search: searchName });

  const paginate = (page: number) => {
    console.log({ page });
  };

  return (
    <>
      <DebounceSearchInput commit={(value) => setSearchName(value)}></DebounceSearchInput>
      <GitHubRepositories items={data?.repos || []}></GitHubRepositories>
      <Pagination hideOnSinglePage={true} onChange={paginate} total={50}/>
    </>
  );
}
