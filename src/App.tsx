
import './App.css';
import PrNameGenerator from './pr-name-generator';

function App() {
  return (
    <div className="App">
      <main >
        <header className='py-5'>
          <h1 className="text-3xl text-gray-700 font-semibold tracking-wider leading-none uppercase text-left p-5">PR Name Generator</h1>
        </header>
      <PrNameGenerator />
      </main>

    </div>
  );
}

export default App;
