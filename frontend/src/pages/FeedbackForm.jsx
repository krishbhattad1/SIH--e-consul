import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./FeedbackForm.css";

function FeedbackForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [consultationRules, setConsultationRules] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/modules")
      .then((res) => res.json())
      .then((data) => {
        if (data.modules) setConsultationRules(data.modules);
      })
      .catch((err) => console.error("Failed to load modules", err));
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: formData.name,
      email: formData.email,
      ruleId: formData.rule,
      language: formData.language,
      opinion: "AI_computed",
      feedback: formData.feedback,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const id = `EC-${Date.now().toString().slice(-8)}`;
        setFeedbackId(id);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Network error during feedback submission:", error);
    }
  };

  const handleCsvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    setUploadStatus("Uploading...");

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze-upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.status === "success") {
        setUploadStatus(`✓ Uploaded ${result.insertedCount} comments!`);
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (err) {
      setUploadStatus("Network error.");
    }
  };

  if (submitted) {
    return (
      <div className="feedback-page">
        <GovernmentHeader />
        <main className="feedback-main">
          <div className="feedback-container">
            <div className="confirmation">
              <div className="confirmation-mark">✓</div>
              <h1>Feedback submitted successfully</h1>
              <p>Thank you for participating in the public consultation.</p>
              <div className="feedback-reference">
                <span>Your feedback reference number</span>
                <strong>{feedbackId}</strong>
              </div>
              <div className="confirmation-actions">
                <button className="primary-action" onClick={() => navigate("/")}>
                  Back to consultations
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
          <div className="feedback-breadcrumb">Home / Consultations / Give Feedback</div>
          <button className="feedback-back" onClick={() => navigate("/")}>
            ← Back to home
          </button>
          
          <div className="feedback-layout">
            <form className="feedback-form" onSubmit={handleSubmit}>
              <section className="form-section">
                <h2>Your details</h2>
                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="name">Name <span>*</span></label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email address <span>*</span></label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h2>What are you commenting on?</h2>
                <div className="form-field">
                  <label htmlFor="rule">Policy section <span>*</span></label>
                  <select id="rule" name="rule" value={formData.rule} onChange={handleChange} required>
                    <option value="">Select a section</option>
                    {consultationRules.map((rule) => (
                      <option key={rule.id} value={rule.id}>{rule.title}</option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="form-section">
                <h2>Your comments</h2>
                <div className="form-field">
                  <label htmlFor="language">Language</label>
                  <select id="language" name="language" value={formData.language} onChange={handleChange}>
                    <option value="English">English</option>
                    <option value="Hindi">हिन्दी</option>
                    <option value="Marathi">मराठी</option>
                  </select>
                </div>
                <div className="form-field feedback-text-field">
                  <label htmlFor="feedback">Feedback <span>*</span></label>
                  <textarea id="feedback" name="feedback" value={formData.feedback} onChange={handleChange} rows="6" required />
                </div>
              </section>

              <section className="form-section">
                <div className="consent-row">
                  <input id="consent" name="consent" type="checkbox" checked={formData.consent} onChange={handleChange} required />
                  <label htmlFor="consent">I confirm that the information provided is accurate.</label>
                </div>
              </section>

              <div className="form-actions">
                <button type="submit" className="submit-button">Submit Feedback</button>
              </div>
            </form>

            <aside className="feedback-information">
              <h2>Testing & Help</h2>
              <input type="file" accept=".csv" ref={fileInputRef} style={{ display: "none" }} onChange={handleCsvUpload} />
              <div style={{ marginTop: "10px", padding: "12px", border: "1px dashed #90caf9", borderRadius: "6px", background: "#f0f7ff" }}>
                <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ width: "100%", padding: "8px", background: "#1976d2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Upload Test CSV Data
                </button>
                {uploadStatus && <span style={{ display: "block", fontSize: "0.8rem", marginTop: "6px", color: "#0d47a1" }}>{uploadStatus}</span>}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FeedbackForm;