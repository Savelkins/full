import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import CreateSportPage from "./pages/CreateSportPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SportPage from "./pages/SportPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports/:sportId" element={<SportPage />} />
          <Route path="/create-sport" element={<CreateSportPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <footer>Footer</footer>
      </BrowserRouter>
    </>
  );
}

export default App;
