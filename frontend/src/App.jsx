import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import PublicHome from "./pages/PublicHome";
import ConsultationDetails from "./pages/ConsultationDetails";
import FeedbackForm from "./pages/FeedbackForm";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public portal */}
        <Route
          path="/"
          element={<PublicHome />}
        />

        {/* Consultation details */}
        <Route
          path="/consultation/:id"
          element={<ConsultationDetails />}
        />

        {/* Feedback */}
        <Route
          path="/feedback"
          element={<FeedbackForm />}
        />

        {/* Authority analytics dashboard */}
        <Route
          path="/authority"
          element={<AuthorityDashboard />}
        />

        {/* Legal pages */}
        <Route
          path="/terms"
          element={<TermsConditions />}
        />

        <Route
          path="/privacy"
          element={<PrivacyPolicy />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<ErrorPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;