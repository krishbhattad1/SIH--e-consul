import { Link } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./TermsConditions.css";

function TermsConditions() {
  return (
    <div className="legal-page">

      <GovernmentHeader />

      <main className="legal-content">

        <div className="legal-breadcrumb">
          <Link to="/">Home</Link> / Terms & Conditions
        </div>

        <h1>Terms & Conditions</h1>

        <p className="legal-intro">
          These Terms & Conditions govern the use of the
          e-Consultation Portal and the submission of public
          feedback through the platform.
        </p>

        <section className="legal-section">
          <h2>1. Purpose of the Portal</h2>

          <p>
            The e-Consultation Portal provides a platform for
            citizens and stakeholders to view government
            consultations and submit comments, suggestions,
            and feedback on proposed policies and initiatives.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Use of the Portal</h2>

          <p>
            Users are expected to use the portal only for
            lawful purposes and provide information that is
            accurate and relevant to the consultation.
          </p>

          <p>
            Users must not submit content that is unlawful,
            abusive, threatening, defamatory, misleading,
            or unrelated to the consultation.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Public Feedback</h2>

          <p>
            Feedback submitted through the portal may be
            reviewed by the concerned department or authority.
            Submission of feedback does not guarantee that
            a suggestion will be accepted or implemented.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Content Moderation</h2>

          <p>
            The concerned authority may review, moderate,
            remove, or reject submissions that violate these
            terms or applicable laws and policies.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Availability of Services</h2>

          <p>
            Reasonable efforts may be made to keep the portal
            available and functional. However, temporary
            interruptions may occur due to maintenance,
            technical issues, or circumstances beyond the
            control of the portal administrators.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Changes to These Terms</h2>

          <p>
            These Terms & Conditions may be updated periodically.
            Any changes will be reflected on this page.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Contact and Support</h2>

          <p>
            For assistance regarding the portal or a specific
            consultation, users should contact the concerned
            department through the support mechanisms provided
            by the portal.
          </p>
        </section>

        <div className="legal-back">
          <Link to="/">← Back to Home</Link>
        </div>

      </main>

    </div>
  );
}

export default TermsConditions;