import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import BackToTop from "./pages/Home/BackToTop/BackToTop";
import { LoadingProvider } from "./contexts/Loading/Loading";
function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Router />
        <BackToTop />
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
