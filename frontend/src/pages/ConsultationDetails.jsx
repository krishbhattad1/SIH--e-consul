import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./ConsultationDetails.css";

function ConsultationDetails() {
  const navigate = useNavigate();
  // We grab the ID from the URL (e.g. /consultation/draft-solar-policy)
  const { id } = useParams(); 
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/modules")
      .then((res) => res.json())
      .then((data) => {
        if (data.modules) {
          // Find the specific module that matches this page URL
          const currentModule = data.modules.find(m => m.id === id);
          setModuleData(currentModule);
        }
      })
      .catch((err) => console.error("Failed to load module details", err));
  }, [id]);

  if (!moduleData) {
    return (
      <div className="consultation-page">
        <GovernmentHeader />
        <main style={{ padding: "40px", textAlign: "center" }}>Loading consultation details...</main>
      </div>
    );
  }

  return (
    <div className="consultation-page">
      <GovernmentHeader />
      <main>
        <div className="consultation-container">
          <div className="breadcrumb">Home / Consultations / {moduleData.title}</div>
          <button className="back-link" onClick={() => navigate("/")}>← Back to consultations</button>

          <div className="consultation-header">
            <div>
              <div className="consultation-status"><span></span> Open for public comments</div>
              <h1>{moduleData.title}</h1>
              <p className="department-name">{moduleData.department}</p>
            </div>
            <div className="closing-date">
              <span>Consultation closes</span>
              <strong>{moduleData.closingDate}</strong>
            </div>
          </div>

          <div className="consultation-content">
            <section className="policy-content">
              <h2>About this consultation</h2>
              {/* Display the dynamically saved description */}
              <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
                {moduleData.description}
              </p>

              {/* Display the dynamically saved file if one exists */}
              {moduleData.fileName && (
                <>
                  <h2 style={{ marginTop: "30px" }}>Consultation documents</h2>
                  <div className="document-list">
                    <div className="document" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", border: "1px solid #ddd", borderRadius: "6px" }}>
                      <div>
                        <strong style={{ display: "block" }}>{moduleData.fileName}</strong>
                        <span style={{ fontSize: "0.85rem", color: "#666" }}>Attached Policy Document</span>
                      </div>
                      <button type="button" style={{ padding: "8px 14px", background: "#eee", border: "1px solid #ccc", borderRadius: "4px" }}>
                        Download File
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>

            <aside className="feedback-box">
              <h2>Give your feedback</h2>
              <p>Share your comments, suggestions or concerns regarding this proposed policy.</p>
              <div className="feedback-deadline">
                <span>Last date for submission</span>
                <strong>{moduleData.closingDate}</strong>
              </div>
              <button type="button" className="feedback-button" onClick={() => navigate("/feedback")}>
                Give Feedback <span>→</span>
              </button>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ConsultationDetails;