import { Header } from './components/header/header';
import { AppRoutes } from './routes/app.routes';

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <AppRoutes></AppRoutes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
