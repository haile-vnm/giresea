import DebounceSearchInput from '../../components/debounce-search-input';
import GitHubRepositories from '../../components/github-repositories';
import { useState } from 'react';
import { useReactRepositorySearch } from '../../integrations/github/repository';
import UnknownSizePagination from '../../components/unknown-size-pagination';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 2rem;
`;

const HeaderWrapper = styled.div`
  background-color: white;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  padding-top: 1rem;
`;

const ContentWrapper = styled.div`
  padding-top: 64px; // header height
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: auto;
  margin-bottom: 1rem;
  width: 50%;
  max-width: 500px;
  min-width: 240px;
`;

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
    <PageWrapper>
      <HeaderWrapper>
        <PageHeader>
          <DebounceSearchInput commit={(value) => setSearchName(value)}></DebounceSearchInput>
          <UnknownSizePagination onNext={loadNextPage} onPrev={loadPrevPage} pageInfo={data.pageInfo}/>
        </PageHeader>
      </HeaderWrapper>
      <ContentWrapper>
        <GitHubRepositories items={data?.repos || []}></GitHubRepositories>
      </ContentWrapper>
    </PageWrapper>
  );
}
