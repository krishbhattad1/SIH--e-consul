import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./FeedbackForm.css";

const consultationRules = [
  {
    id: "ev-adoption",
    title: "Rule 1 — Electric Vehicle Adoption",
  },
  {
    id: "charging",
    title: "Rule 2 — Charging Infrastructure",
  },
  {
    id: "incentives",
    title: "Rule 3 — Purchase Incentives",
  },
  {
    id: "battery",
    title: "Rule 4 — Battery Manufacturing",
  },
  {
    id: "public-transport",
    title: "Rule 5 — Public Transport Electrification",
  },
  {
    id: "general",
    title: "General / Other",
  },
];

function FeedbackForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rule: "",
    language: "English",
    opinion: "",
    feedback: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = `EC-${Date.now().toString().slice(-8)}`;

    const selectedRule = consultationRules.find(
      (rule) => rule.id === formData.rule
    );

    const newFeedback = {
      id,
      consultationId: "ev-policy-2027",
      consultationTitle: "Draft Electric Vehicle Policy 2027",
      name: formData.name,
      email: formData.email,
      ruleId: formData.rule,
      ruleTitle: selectedRule?.title || "General / Other",
      language: formData.language,
      opinion: formData.opinion,
      feedback: formData.feedback,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    let existingFeedback = [];

try {
  const storedFeedback = localStorage.getItem(
    "consultationFeedback"
  );

  existingFeedback = storedFeedback
    ? JSON.parse(storedFeedback)
    : [];

  if (!Array.isArray(existingFeedback)) {
    existingFeedback = [];
  }
} catch (error) {
  console.error(
    "Unable to read stored feedback:",
    error
  );

  existingFeedback = [];
}
    localStorage.setItem(
      "consultationFeedback",
      JSON.stringify([
        ...existingFeedback,
        newFeedback,
      ])
    );

    setFeedbackId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="feedback-page">

        <GovernmentHeader />

        <main className="feedback-main">

          <div className="feedback-container">

            <div className="confirmation">

              <div className="confirmation-mark">
                ✓
              </div>

              <h1>
                Feedback submitted successfully
              </h1>

              <p>
                Thank you for participating in the public
                consultation on the Draft Electric Vehicle
                Policy 2027.
              </p>

              <div className="feedback-reference">

                <span>
                  Your feedback reference number
                </span>

                <strong>
                  {feedbackId}
                </strong>

              </div>

              <p className="confirmation-note">
                Please keep this reference number for your records.
              </p>

              <div className="confirmation-actions">

                <button
                  className="primary-action"
                  onClick={() => navigate("/")}
                >
                  Back to consultations
                </button>

                <button
                  className="secondary-action"
                  onClick={() =>
                    navigate("/authority")
                  }
                >
                  Authority Dashboard
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="feedback-page">

      <GovernmentHeader />

      <main className="feedback-main">

        <div className="feedback-container">

          <div className="feedback-breadcrumb">
            Home / Consultations / Draft Electric Vehicle
            Policy 2027 / Give Feedback
          </div>

          <button
            className="feedback-back"
            onClick={() =>
              navigate("/consultation/ev-policy-2027")
            }
          >
            ← Back to consultation
          </button>

          <div className="feedback-heading">

            <div className="feedback-label">
              PUBLIC FEEDBACK
            </div>

            <h1>
              Give your feedback
            </h1>

            <p>
              Draft Electric Vehicle Policy 2027
            </p>

            <span>
              Ministry of Heavy Industries
            </span>

          </div>

          <div className="feedback-layout">

            <form
              className="feedback-form"
              onSubmit={handleSubmit}
            >

              {/* DETAILS */}

              <section className="form-section">

                <h2>
                  Your details
                </h2>

                <p className="section-description">
                  Provide your basic contact details.
                </p>

                <div className="form-grid">

                  <div className="form-field">

                    <label htmlFor="name">
                      Name <span>*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />

                  </div>

                  <div className="form-field">

                    <label htmlFor="email">
                      Email address <span>*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />

                  </div>

                </div>

              </section>

              {/* RULE */}

              <section className="form-section">

                <h2>
                  What are you commenting on?
                </h2>

                <p className="section-description">
                  Select the section of the proposal that
                  your feedback relates to.
                </p>

                <div className="form-field">

                  <label htmlFor="rule">
                    Policy section <span>*</span>
                  </label>

                  <select
                    id="rule"
                    name="rule"
                    value={formData.rule}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select a section
                    </option>

                    {consultationRules.map((rule) => (
                      <option
                        key={rule.id}
                        value={rule.id}
                      >
                        {rule.title}
                      </option>
                    ))}
                  </select>

                </div>

              </section>

              {/* OPINION */}

              <section className="form-section">

                <h2>
                  Your overall view
                </h2>

                <p className="section-description">
                  How do you feel about this part of the proposal?
                </p>

                <div className="opinion-options">

                  <label
                    className={`opinion-option ${
                      formData.opinion === "support"
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="opinion"
                      value="support"
                      checked={
                        formData.opinion === "support"
                      }
                      onChange={handleChange}
                      required
                    />

                    <span className="opinion-icon">
                      😊
                    </span>

                    <span>
                      Support
                    </span>
                  </label>

                  <label
                    className={`opinion-option ${
                      formData.opinion === "neutral"
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="opinion"
                      value="neutral"
                      checked={
                        formData.opinion === "neutral"
                      }
                      onChange={handleChange}
                    />

                    <span className="opinion-icon">
                      😐
                    </span>

                    <span>
                      Neutral / Undecided
                    </span>
                  </label>

                  <label
                    className={`opinion-option ${
                      formData.opinion === "concern"
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="opinion"
                      value="concern"
                      checked={
                        formData.opinion === "concern"
                      }
                      onChange={handleChange}
                    />

                    <span className="opinion-icon">
                      ☹
                    </span>

                    <span>
                      Concern / Oppose
                    </span>
                  </label>

                </div>

              </section>

              {/* COMMENT */}

              <section className="form-section">

                <h2>
                  Your comments
                </h2>

                <p className="section-description">
                  Share your suggestions, concerns or
                  observations about the proposal.
                </p>

                <div className="form-field">

                  <label htmlFor="language">
                    Language
                  </label>

                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  >
                    <option value="English">
                      English
                    </option>

                    <option value="Hindi">
                      हिन्दी
                    </option>

                    <option value="Marathi">
                      मराठी
                    </option>
                  </select>

                </div>

                <div className="form-field feedback-text-field">

                  <label htmlFor="feedback">
                    Feedback <span>*</span>
                  </label>

                  <textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Write your comments or suggestions here..."
                    rows="8"
                    maxLength="3000"
                    required
                  />

                  <div className="character-count">
                    {formData.feedback.length} / 3000
                  </div>

                </div>

              </section>

              {/* CONSENT */}

              <section className="form-section">

                <div className="consent-row">

                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="consent">
                    I confirm that the information provided
                    is accurate and agree to the submission
                    of this feedback.
                  </label>

                </div>

              </section>

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    navigate(
                      "/consultation/ev-policy-2027"
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-button"
                >
                  Submit Feedback
                </button>

              </div>

            </form>

            {/* INFORMATION */}

            <aside className="feedback-information">

              <h2>
                Before you submit
              </h2>

              <ul>

                <li>
                  Select the policy section that your
                  comment relates to.
                </li>

                <li>
                  Keep your comments specific and relevant
                  to the proposal.
                </li>

                <li>
                  Do not include sensitive personal
                  information.
                </li>

                <li>
                  Your feedback may be analysed to identify
                  public sentiment and common concerns.
                </li>

              </ul>

              <div className="consultation-summary">

                <span>
                  Consultation
                </span>

                <strong>
                  Draft Electric Vehicle Policy 2027
                </strong>

                <span>
                  Closing date
                </span>

                <strong>
                  15 September 2026
                </strong>

              </div>

            </aside>

          </div>

        </div>

      </main>

    </div>
  );
}

export default FeedbackForm;