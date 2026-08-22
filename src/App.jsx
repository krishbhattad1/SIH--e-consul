import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import PublicHome from "./pages/PublicHome";
import ConsultationDetails from "./pages/ConsultationDetails";
import FeedbackForm from "./pages/FeedbackForm";
import AuthorityDashboard from "./pages/AuthorityDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<PublicHome />}
        />

        <Route
          path="/consultation/:id"
          element={<ConsultationDetails />}
        />

        <Route
          path="/feedback"
          element={<FeedbackForm />}
        />

        <Route
          path="/authority"
          element={<AuthorityDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;