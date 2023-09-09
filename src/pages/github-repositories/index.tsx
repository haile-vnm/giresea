import DebounceSearchInput from '../../components/debounce-search-input';
import GitHubRepositories from '../../components/github-repositories';
import { useEffect, useState } from 'react';
import { useReactRepositorySearch } from '../../integrations/github/repository';
import UnknownSizePagination from '../../components/unknown-size-pagination';
import styled from 'styled-components';
import If from '../../components/if';
import { notification, Spin } from 'antd';
import TokenManagement from '../../components/token-management';

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

const HeaderInputWrapper = styled.div`
  margin-bottom: .5rem;
  display: flex;
  width: 100%;
`;

const TokenWrapper = styled.div`
  margin-right: .5rem;
`;

const ContentWrapper = styled.div`
  padding-top: 64px; // header height
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 1rem;
  width: 80%;
  max-width: 800px;
  min-width: 400px;
`;

export default function GitHubRepositoriesPage() {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState<{ after?: string; before?: string }>({});
  const { data, error, loading } = useReactRepositorySearch({ ...page, search: searchName });
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

  return (
    <>
      {contextHolder}
      <PageWrapper>
        <HeaderWrapper>
          <PageHeader>
            <HeaderInputWrapper>
              <TokenWrapper>
                <TokenManagement></TokenManagement>
              </TokenWrapper>
              <DebounceSearchInput commit={search}></DebounceSearchInput>
            </HeaderInputWrapper>
            <UnknownSizePagination onNext={loadNextPage} onPrev={loadPrevPage} pageInfo={data.pageInfo}/>
          </PageHeader>
        </HeaderWrapper>
        <ContentWrapper>
          <If
            condition={!loading}
            else={<Spin size="large" />}
          >
            <GitHubRepositories items={data?.repos || []}></GitHubRepositories>
          </If>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}
