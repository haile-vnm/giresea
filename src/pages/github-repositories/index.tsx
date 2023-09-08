import DebounceSearchInput from '../../components/debounce-search-input';
import GitHubRepositories from '../../components/github-repositories';
import { useState } from 'react';
import { useReactRepositorySearch } from '../../integrations/github/repository';
import UnknownSizePagination from '../../components/unknown-size-pagination';

export default function GitHubRepositoriesPage() {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState({});
  const { data, error, loading } = useReactRepositorySearch({ ...page, search: searchName });

  const loadNextPage = (token: string) => {
    setPage({ after: token });
  };

  const loadPrevPage = (token: string) => {
    setPage({ before: token });
  };

  return (
    <>
      <DebounceSearchInput commit={(value) => setSearchName(value)}></DebounceSearchInput>
      <GitHubRepositories items={data?.repos || []}></GitHubRepositories>
      <UnknownSizePagination onNext={loadNextPage} onPrev={loadPrevPage} pageInfo={data.pageInfo}/>
    </>
  );
}
