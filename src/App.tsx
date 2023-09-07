import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import { useReactRepositorySearch } from './integrations/github/repository';

export default function App() {
  const { loading, error, data } = useReactRepositorySearch({ first: 3 });
  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="App-logo" src={logo} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> <Button
          href="https://ant.design/"
          size="large"
          type="primary"
        >
          Learn Ant Design
        </Button>

        {error && JSON.stringify(error)}
        {loading ? 'loading' : 'loaded'}
        {!loading && !error && JSON.stringify(data)}
      </header>
    </div>
  );
}
