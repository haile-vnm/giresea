import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';

export default function App () {
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
      </header>
    </div>
  );
}
