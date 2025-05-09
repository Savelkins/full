import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SportPage from "./pages/SportPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>Logo</header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports/:sportId" element={<SportPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <footer>Footer</footer>
      </BrowserRouter>
    </>
  );
}

export default App;
