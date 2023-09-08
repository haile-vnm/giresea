import { Avatar, List, Pagination } from 'antd';
import { Repository } from '../../integrations/github/types/repository';
import DebounceInput from '../../components/debounce-input';
import GitHubRepositories from '../../components/github-repositories';
import { useEffect, useState } from 'react';
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
      <DebounceInput commit={(value) => setSearchName(value)}></DebounceInput>
      <GitHubRepositories items={data?.repos || []}></GitHubRepositories>
      <Pagination hideOnSinglePage={true} onChange={paginate} total={50}/>
    </>
  );
}
