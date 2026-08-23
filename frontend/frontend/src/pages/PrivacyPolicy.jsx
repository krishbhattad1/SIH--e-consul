import { Link } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="legal-page">

      <GovernmentHeader />

      <main className="legal-content">

        <div className="legal-breadcrumb">
          <Link to="/">Home</Link> / Privacy Policy
        </div>

        <h1>Privacy Policy</h1>

        <p className="legal-intro">
          This Privacy Policy explains how information submitted
          through the e-Consultation Portal may be collected,
          used, stored, and protected.
        </p>

        <section className="legal-section">
          <h2>1. Information We Collect</h2>

          <p>
            Depending on the consultation and services provided,
            the portal may collect information such as name,
            contact information, feedback, comments, and other
            information voluntarily submitted by users.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Purpose of Collection</h2>

          <p>
            Information submitted through the portal may be used
            to process public feedback, understand stakeholder
            views, communicate regarding a consultation, and
            improve the consultation process.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Protection of Information</h2>

          <p>
            Appropriate administrative and technical measures
            should be used to protect information against
            unauthorized access, alteration, disclosure, or
            destruction.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Disclosure of Information</h2>

          <p>
            Information may be accessed by authorized personnel
            and may be disclosed where required by applicable
            law, regulation, or government procedure.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Public Submissions</h2>

          <p>
            Users should avoid including sensitive personal
            information in consultation comments unless such
            information is specifically required for the
            consultation process.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Cookies and Technical Data</h2>

          <p>
            The portal may use essential technical information,
            including browser or session information, to maintain
            security, functionality, and performance.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Updates to This Policy</h2>

          <p>
            This Privacy Policy may be updated periodically to
            reflect changes in the portal, applicable requirements,
            or data-handling practices.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Contact</h2>

          <p>
            Questions regarding privacy or information submitted
            through the portal should be directed to the concerned
            department or designated portal support authority.
          </p>
        </section>

        <div className="legal-back">
          <Link to="/">← Back to Home</Link>
        </div>

      </main>

    </div>
  );
}

export default PrivacyPolicy;