import { Link, useLocation } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  const location = useLocation();

  const isNotFound = location.pathname !== "/";

  return (
    <main className="error-page">
      <div className="error-container">

        <div className="error-code">
          {isNotFound ? "404" : "500"}
        </div>

        <h1>
          {isNotFound
            ? "Page Not Found"
            : "Something Went Wrong"}
        </h1>

        <p>
          {isNotFound
            ? "The page you are looking for may have been moved, deleted, or the URL may be incorrect."
            : "We are unable to process your request right now. Please try again later."}
        </p>

        <div className="error-actions">
          <Link to="/" className="error-primary-button">
            Go to Home
          </Link>

          <button
            className="error-secondary-button"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>

      </div>
    </main>
  );
}

export default ErrorPage;