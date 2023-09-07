import { gql, useQuery } from '@apollo/client';
import { Repository } from './types/repository';
import { client } from './server';

const query = gql`
query Repositories($query: String!, $first: Int, $after: String, $before: String) {
  search(type: REPOSITORY, query: $query, first: $first, after: $after, before: $before) {
    repos: edges {
      repo: node {
        ... on Repository {
          url
          name
          createdAt
          updatedAt
          forks {
            totalCount
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`;

interface RepositorySearchParams {
  search?: string;
  before?: string;
  after?: string;
  first?: number;
}

interface RepositorySearchResponse {
  search: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    repos: Repository[];
  }
}

export const useReactRepositorySearch = (queryData: RepositorySearchParams) => {
  const { data, error, loading } =
    useQuery<RepositorySearchResponse>(query, { variables: { ...queryData, query: 'is:public topic:react sort:updated' }, client });

  return {
    error,
    loading,
    data: data?.search
  };
};
