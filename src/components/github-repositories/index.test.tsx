import { getByRole, getByText, render, screen } from '@testing-library/react';
import GitHubRepositories from '.';
import { Repository } from '../../integrations/github/types/repository';

const repositories: Repository[] = [
  {
    name: 'public-repo-1',
    url: 'https://github.com/cmc/public-repo-1',
    stargazerCount: 111,
    forkCount: 1111
  },
  {
    name: 'public-repo-2',
    url: 'https://github.com/cmc/public-repo-2',
    stargazerCount: 222,
    forkCount: 2222
  }
];

describe('Empty repositories', () => {
  test('render empty pages by notifying "No data"', () => {
    render(<GitHubRepositories items={[]} />);
    const linkElement = screen.getByText('No data');
    expect(linkElement).toBeInTheDocument();
  });
});

describe('Presence repositories', () => {
  beforeEach(() => {
    render(<GitHubRepositories items={repositories} />);
  });

  test('should render name, star, folk count on each item', () => {
    const firstRepository = repositories[0];

    const firstRepositoryElement = screen.getByTestId(firstRepository.url);
    const nameElement = getByRole(firstRepositoryElement, 'link', { name: firstRepository.name });
    const descElement = getByText(firstRepositoryElement, new RegExp(`${firstRepository.stargazerCount}.*${firstRepository.forkCount}`));

    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveAttribute('href', firstRepository.url);

    expect(descElement).toBeInTheDocument();
  });

  test('should render enough provided items', () => {
    repositories.forEach(repository => {
      expect(screen.getByTestId(repository.url)).toBeInTheDocument();
    });
  });
});
