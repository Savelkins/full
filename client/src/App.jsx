import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AthletePage from "./pages/AthletePage";
import CreateSportPage from "./pages/CreateSportPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SportPage from "./pages/SportPage";
import CreateAthletePage from "./pages/CreateAthletePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports/:sportId" element={<SportPage />} />
          <Route path="/create-sport" element={<CreateSportPage />} />
          <Route path="/athletes/:athleteId" element={<AthletePage />} />
          <Route path="/create-athlete" element={<CreateAthletePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
