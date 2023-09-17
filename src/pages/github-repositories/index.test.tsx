import { render, screen } from '@testing-library/react';
import GitHubRepositoriesPage from '.';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { mockRepositorySearch } from '../../integrations/github/repository';
import { Repository } from '../../integrations/github/types/repository';
import userEvent from '@testing-library/user-event';
import { setField } from '../../lib/localstorage';
import { removeField } from '../../lib/localstorage';

const repos: Repository[] = [
  {
    url: 'https://github.com/nuintun/webpack-antd-builder',
    name: 'webpack-antd-builder',
    forkCount: 0,
    stargazerCount: 3
  },
  {
    url: 'https://github.com/hunghg255/vite-react-antd',
    name: 'vite-react-antd',
    forkCount: 2,
    stargazerCount: 8
  }
];

const renewRepos: Repository[] = [
  {
    url: 'https://github.com/nuintun/webpack-antd-builder-renew',
    name: 'webpack-antd-builder-renew',
    forkCount: 70,
    stargazerCount: 23
  },
  {
    url: 'https://github.com/hunghg255/vite-react-antd-renew',
    name: 'vite-react-antd-renew',
    forkCount: 72,
    stargazerCount: 28
  }
];

const renderPage = (mocks?: MockedResponse[]) => render(
  <MockedProvider addTypename={true} mocks={mocks}>
    <GitHubRepositoriesPage></GitHubRepositoriesPage>
  </MockedProvider>
);

describe('User has not entered token before', () => {
  afterAll(() => {
    removeField('github-personal-token');
  });

  test('Should notify user has to enter their github token first', async () => {
    renderPage();
    const alertMessageEl = await screen.findByText(/Please enter your personal token/i);
    expect(alertMessageEl).toBeInTheDocument();
  });

  test('Should load repositories after user enter their token', async () => {
    renderPage([
      mockRepositorySearch({ search: '' }, { repos, pageInfo: { endCursor: '', hasNextPage: true }})
    ]);

    const authenticateBtn = screen.getByRole('button', { name: /authenticate/i });
    userEvent.click(authenticateBtn);

    userEvent.type(
      screen.getByPlaceholderText(/github personal token/i),
      'valid-token'
    );
    userEvent.click(
      screen.getByRole('button', { name: /save/i })
    );

    const repoNameEl = await screen.findByText(repos[0].name);
    expect(repoNameEl).toBeInTheDocument();
  });
});

describe('User entered token before', () => {
  beforeAll(() => {
    setField('github-personal-token', 'valid-token');
  });

  afterAll(() => {
    removeField('github-personal-token');
  });

  const MOCKED_PAGE_TOKEN = 'mocked-token';

  const verifyReplacingNewRepositories = async (interact: () => void, oldRepos: Repository[], newRepos: Repository[]) => {
    const oldPageNameEl = await screen.findByText(oldRepos[0].name);

    expect(oldPageNameEl).toBeInTheDocument();

    await interact();

    const newPageNameElement = await screen.findByText(newRepos[0].name);
    expect(newPageNameElement).toBeInTheDocument();

    expect(oldPageNameEl).not.toBeInTheDocument();
  };

  test('Should notify expired token message', async () => {
    const EXPIRED_TOKEN_MESSAGE = 'Your token is expired';

    renderPage([
      mockRepositorySearch({ search: '' }, undefined, new Error(EXPIRED_TOKEN_MESSAGE))
    ]);

    const errorMessageEl = await screen.findByText(EXPIRED_TOKEN_MESSAGE);

    expect(errorMessageEl).toBeInTheDocument();
  });

  test('Should load repositories base on search input changes', async () => {
    const SEARCH_NAME = 'antd';
    renderPage([
      mockRepositorySearch({ search: '' }, { repos, pageInfo: { hasNextPage: true, endCursor: '' } }),
      mockRepositorySearch({ search: SEARCH_NAME }, { repos: renewRepos, pageInfo: { hasNextPage: true, endCursor: '' } }),
    ]);

    await verifyReplacingNewRepositories(
      async () => {
        const searchInput = screen.getByPlaceholderText(/Search by repository name/i);
        userEvent.type(searchInput, SEARCH_NAME);
      },
      repos,
      renewRepos
    );
  });

  test('Should replace new repositories when user click on next page', async () => {
    renderPage([
      mockRepositorySearch({ search: '' }, { repos, pageInfo: { hasNextPage: true, endCursor: MOCKED_PAGE_TOKEN } }),
      mockRepositorySearch({ search: '', after: MOCKED_PAGE_TOKEN }, { repos: renewRepos, pageInfo: { hasNextPage: true, endCursor: '' } }),
    ]);

    await verifyReplacingNewRepositories(
      async () => {
        const nextPageElement = await screen.findByRole('listitem', { name: /next/i });
        userEvent.click(nextPageElement);
      },
      repos,
      renewRepos
    );
  });

  test('Should replace new repositories when user click on previous page', async () => {
    renderPage([
      mockRepositorySearch({ search: '' }, { repos, pageInfo: { hasNextPage: true, endCursor: MOCKED_PAGE_TOKEN } }),
      mockRepositorySearch({ search: '', before: MOCKED_PAGE_TOKEN }, { repos: renewRepos, pageInfo: { hasNextPage: true, endCursor: '' } })
    ]);

    await verifyReplacingNewRepositories(
      async () => {
        const nextPageElement = await screen.findByRole('listitem', { name: /previous/i });
        userEvent.click(nextPageElement);
      },
      repos,
      renewRepos
    );
  });
});
