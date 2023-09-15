import './App.css';
import GitHubRepositoriesPage from './pages/github-repositories';

export default function App() {
  return (
    <div className="App">
      <main data-testid="app-container">
        <GitHubRepositoriesPage></GitHubRepositoriesPage>
      </main>
    </div>
  );
}
