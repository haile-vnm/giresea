import { ApolloProvider } from '@apollo/client';
import './App.css';
import GitHubRepositoriesPage from './pages/github-repositories';
import { client } from './integrations/github/server';

export default function App() {
  return (
    <div className="App">
      <main data-testid="app-container">
        <ApolloProvider client={client}>
          <GitHubRepositoriesPage></GitHubRepositoriesPage>
        </ApolloProvider>
      </main>
    </div>
  );
}
