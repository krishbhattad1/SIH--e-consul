import { useNavigate } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./ConsultationDetails.css";

function ConsultationDetails() {
  const navigate = useNavigate();

  return (
    <div className="consultation-page">

      <GovernmentHeader />

      <main>
        <div className="consultation-container">

          {/* Breadcrumb */}

          <div className="breadcrumb">
            Home / Consultations / Draft Electric Vehicle Policy 2027
          </div>

          <button
            className="back-link"
            onClick={() => navigate("/")}
          >
            ← Back to consultations
          </button>

          {/* Consultation heading */}

          <div className="consultation-header">

            <div>

              <div className="consultation-status">
                <span></span>
                Open for public comments
              </div>

              <h1>
                Draft Electric Vehicle Policy 2027
              </h1>

              <p className="department-name">
                Ministry of Heavy Industries
              </p>

            </div>

            <div className="closing-date">

              <span>
                Consultation closes
              </span>

              <strong>
                15 September 2026
              </strong>

            </div>

          </div>

          {/* Main content */}

          <div className="consultation-content">

            <section className="policy-content">

              <h2>
                About this consultation
              </h2>

              <p>
                The Ministry of Heavy Industries has invited
                comments and suggestions from citizens and
                stakeholders on the proposed Draft Electric
                Vehicle Policy 2027.
              </p>

              <p>
                The proposed policy focuses on increasing
                electric vehicle adoption, improving charging
                infrastructure, supporting domestic manufacturing
                and encouraging sustainable mobility.
              </p>

              <p>
                Citizens, organisations, industry representatives
                and other stakeholders are invited to submit
                their views before the consultation closing date.
              </p>

              <h2>
                Areas covered by the proposal
              </h2>

              <ul>
                <li>
                  Electric vehicle adoption and affordability
                </li>

                <li>
                  Charging infrastructure
                </li>

                <li>
                  Vehicle and battery manufacturing
                </li>

                <li>
                  Consumer incentives and subsidies
                </li>

                <li>
                  Electric public transportation
                </li>
              </ul>

              <h2>
                Consultation documents
              </h2>

              <div className="document-list">

                <div className="document">

                  <div>
                    <strong>
                      Draft Electric Vehicle Policy 2027
                    </strong>

                    <span>
                      Policy document · PDF
                    </span>
                  </div>

                  <button type="button">
                    View document
                  </button>

                </div>

                <div className="document">

                  <div>
                    <strong>
                      Background and supporting information
                    </strong>

                    <span>
                      Supporting document · PDF
                    </span>
                  </div>

                  <button type="button">
                    View document
                  </button>

                </div>

              </div>

            </section>

            {/* Feedback panel */}

            <aside className="feedback-box">

              <h2>
                Give your feedback
              </h2>

              <p>
                Share your comments, suggestions or concerns
                regarding this proposed policy.
              </p>

              <div className="feedback-deadline">

                <span>
                  Last date for submission
                </span>

                <strong>
                  15 September 2026
                </strong>

              </div>

              <button
                type="button"
                className="feedback-button"
                onClick={() => navigate("/feedback")}
              >
                Give Feedback
                <span>→</span>
              </button>

              <p className="feedback-note">
                Please review the consultation documents
                before submitting your comments.
              </p>

            </aside>

          </div>

        </div>
      </main>

    </div>
  );
}

export default ConsultationDetails;