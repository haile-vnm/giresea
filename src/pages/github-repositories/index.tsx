import DebounceSearchInput from '../../components/debounce-search-input';
import GitHubRepositories from '../../components/github-repositories';
import { useEffect, useState } from 'react';
import { useLazyReactRepositorySearch } from '../../integrations/github/repository';
import UnknownSizePagination from '../../components/unknown-size-pagination';
import styled from 'styled-components';
import If from '../../components/if';
import { notification, Spin } from 'antd';
import TokenManagement from '../../components/token-management';
import { getField } from '../../lib/localstorage';

const HeaderWrapper = styled.div`
  background-color: white;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  padding: 1rem;
  padding-bottom: 0;
`;

const HeaderInputWrapper = styled.div`
  margin-bottom: .5rem;
  display: flex;
  width: 100%;
`;

const TokenWrapper = styled.div`
  margin-right: .5rem;
`;

const ContentWrapper = styled.div`
  padding: 0 .75rem;
  padding-top: 92px; // header height
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 1rem;
  width: 80%;
  max-width: 500px;
  min-width: 250px;
`;

export default function GitHubRepositoriesPage() {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState<{ after?: string; before?: string }>({});
  const {
    fetch: fetchRepos,
    result: { data, error, loading, refetch }
  } = useLazyReactRepositorySearch({ ...page, search: searchName });
  const [api, contextHolder] = notification.useNotification();

  const showError = (message: string) => {
    api.error({
      message: 'GitHub',
      description: message,
    });
  };

  const search = (value: string) => setSearchName(value);
  const loadNextPage = (token: string) => {
    setPage({ after: token });
  };

  const loadPrevPage = (token: string) => {
    setPage({ before: token });
  };

  useEffect(() => {
    if (error?.message) {
      showError(error?.message);
    }
  }, [error]);

  useEffect(() => {
    if (getField('github-personal-token')) {
      fetchRepos();
      return;
    }

    api.info({
      message: 'Authentication',
      description: 'Please enter your personal token to start having great experience with Giresea 🚀'
    });
  }, []);

  const onTokenChanges = (token: string) => {
    if (token) {
      refetch();
    }
  };

  return (
    <>
      {contextHolder}
      <HeaderWrapper>
        <PageHeader>
          <HeaderInputWrapper>
            <TokenWrapper>
              <TokenManagement onSave={onTokenChanges}></TokenManagement>
            </TokenWrapper>
            <DebounceSearchInput commit={search} placeholder="Search by repository name"></DebounceSearchInput>
          </HeaderInputWrapper>
          <UnknownSizePagination onNext={loadNextPage} onPrev={loadPrevPage} pageInfo={data.pageInfo}/>
        </PageHeader>
      </HeaderWrapper>
      <ContentWrapper>
        <If
          condition={!loading}
          else={<Spin size="large" />}
        >
          <GitHubRepositories items={error ? [] : (data?.repos || [])}></GitHubRepositories>
        </If>
      </ContentWrapper>
    </>
  );
}
