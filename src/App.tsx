import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TablePage from "./pages/TablePage";
import NotFoundPage from "./pages/NotFoundPage";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
