import { gql, useLazyQuery } from '@apollo/client';
import { Repository } from './types/repository';
import { DEFAULT_PAGINATION_ITEMS } from '../../lib/constant';
import { MockedResponse } from '@apollo/client/testing';

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

const query = gql`
query Repositories($query: String!, $first: Int, $after: String, $before: String) {
  search(
    type: REPOSITORY
    query: $query
    first: $first
    after: $after
    before: $before
  ) {
    repos: nodes {
      ... on Repository {
        url
        name
        forkCount
        stargazerCount
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`;

const extractQueryVariables = (queryData: RepositorySearchParams) => {
  const { search } = queryData;
  const nameQuery = search ? `${search} in:name` : '';

  return {
    ...queryData,
    first: queryData.first || DEFAULT_PAGINATION_ITEMS,
    query: `is:public ${nameQuery} topic:react sort:updated`
  };
};

export const useLazyReactRepositorySearch = (queryData: RepositorySearchParams) => {
  const [fetch, result] =
    useLazyQuery<RepositorySearchResponse, RepositorySearchParams & { query: string }>(
      query,
      {
        variables: extractQueryVariables(queryData)
      }
    );

  return {
    fetch,
    result: {
      ...result,
      data: { ...result.data?.search, repos: result.data?.search.repos }
    }
  };
};

export const mockRepositorySearch = (
  queryData: RepositorySearchParams,
  response?: RepositorySearchResponse['search'],
  error?: Error
): MockedResponse<RepositorySearchResponse> => {
  return {
    request: {
      query,
      variables: extractQueryVariables(queryData)
    },
    ...response && {
      result: {
        data: { search: { ...response, repos: response.repos.map(repo => ({ ...repo, __typename: 'Repository' }))} }
      }
    },
    ...error && { error }
  };
};
