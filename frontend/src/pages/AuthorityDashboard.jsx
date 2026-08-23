import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./AuthorityDashboard.css";

function AuthorityDashboard() {
  const navigate = useNavigate();
  const [portalFeedback, setPortalFeedback] = useState([]);
  const [consultationRules, setConsultationRules] = useState([]);
  
  const [ruleFilter, setRuleFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("all");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [newSector, setNewSector] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newClosingDate, setNewClosingDate] = useState("");
  const [newFile, setNewFile] = useState(null);

  const [generatedSummary, setGeneratedSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/modules")
      .then((res) => res.json())
      .then((data) => {
        if (data.modules) setConsultationRules(data.modules);
      })
      .catch((err) => console.error("Failed to load modules", err));

    fetch("http://127.0.0.1:8000/comments")
      .then((res) => res.json())
      .then((data) => {
        if (data.comments) setPortalFeedback(data.comments);
      })
      .catch((err) => console.error("Failed to fetch comments", err));
  }, []);

  const handleCreateModule = async (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    
    const id = newModuleTitle.toLowerCase().replace(/[^a-z0-9]/g, "-");
   // Format the date nicely for the frontend
    const formattedDate = newClosingDate 
      ? new Date(newClosingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : "31 December 2026";

    const payload = { 
      id, 
      title: newModuleTitle, 
      department: newDepartment || "Ministry of Heavy Industries", 
      sector: newSector || "Transport",
      description: newDescription || "No description provided.",
      fileName: newFile ? newFile.name : "",
      closingDate: formattedDate // Use the formatted date here!
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setConsultationRules((prev) => [...prev, payload]);
        setNewModuleTitle("");
        setNewDepartment("");
        setNewSector("");
        setNewDescription("");
        setNewFile(null);
        setShowAddModal(false);
        alert("Success! Consultation has been saved and published.");
      } else {
        alert("Failed to save. Check backend console.");
      }
    } catch (err) {
      console.error("Network error adding module:", err);
      alert("Network error: Make sure FastAPI is running on port 8000.");
    }
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-module-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ruleId: ruleFilter }),
      });
      const data = await response.json();
      setGeneratedSummary(data.summary);
    } catch (error) {
      setGeneratedSummary("Error generating summary.");
    } finally {
      setIsGenerating(false);
    }
  };

  const feedbackData = useMemo(() => {
    return portalFeedback.map((item, index) => ({
      id: item.id || `LIVE-${index + 1}`,
      name: item.name || "Citizen",
      ruleId: item.ruleId || "general",
      opinion: item.opinion || item.computed_sentiment || "neutral",
      language: item.language || "English",
      date: item.date || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }),
      feedback: item.english_feedback || item.feedback || "",
    }));
  }, [portalFeedback]);

  const filteredFeedback = useMemo(() => {
    const query = search.trim().toLowerCase();
    return feedbackData.filter((item) => {
      const matchesSearch = !query || item.id.toLowerCase().includes(query) || item.name.toLowerCase().includes(query) || item.feedback.toLowerCase().includes(query);
      const matchesSentiment = sentimentFilter === "all" || item.opinion === sentimentFilter;
      const matchesRule = ruleFilter === "all" || item.ruleId === ruleFilter;
      return matchesSearch && matchesSentiment && matchesRule;
    });
  }, [feedbackData, search, sentimentFilter, ruleFilter]);

  const sentimentCounts = useMemo(() => ({
    support: filteredFeedback.filter((item) => item.opinion === "support").length,
    neutral: filteredFeedback.filter((item) => item.opinion === "neutral").length,
    concern: filteredFeedback.filter((item) => item.opinion === "concern").length,
  }), [filteredFeedback]);

  const getRuleLabel = (ruleId) => {
    const rule = consultationRules.find((item) => item.id === ruleId);
    return rule ? rule.title : "General / Other";
  };

  return (
    <>
      <GovernmentHeader />
      <div className="authority-layout">
        <aside className="authority-sidebar">
          <div className="authority-user">
            <div className="authority-user-mark">A</div>
            <div>
              <strong>Authority User</strong>
              <span>Ministry of Heavy Industries</span>
            </div>
          </div>
          <button type="button" className="public-portal-link" onClick={() => navigate("/")}>← Public Portal</button>
        </aside>

        <main className="authority-main">
          <div className="authority-heading">
            <div>
              <h1>Authority Dashboard — Feedback Analysis</h1>
              <p>Restricted access for ministry officials to review summaries and citizen sentiment.</p>
            </div>
          </div>

          <div style={{ margin: "20px 0", background: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
            <button type="button" onClick={() => setShowAddModal(!showAddModal)} style={{ padding: "10px 18px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
              + Add New Policy Module
            </button>
            
            {showAddModal && (
              <form onSubmit={handleCreateModule} style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "600px" }}>
                <input type="text" placeholder="Consultation Title (e.g. Draft Solar Policy)" value={newModuleTitle} onChange={(e) => setNewModuleTitle(e.target.value)} style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} required />
                <input type="text" placeholder="Department (e.g. Ministry of Power)" value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} required />
                <input type="text" placeholder="Sector (e.g. Energy)" value={newSector} onChange={(e) => setNewSector(e.target.value)} style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} required />
                
                {/* New Date Picker */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "0.9rem", color: "#555", marginBottom: "4px" }}>Consultation Closing Date:</label>
                  <input type="date" value={newClosingDate} onChange={(e) => setNewClosingDate(e.target.value)} style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }} required />
                </div>
                {/* New Description Box */}
                <textarea placeholder="Enter detailed description for this consultation..." value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows="4" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }} required />
                
                {/* New File Upload */}
                <div style={{ padding: "10px", border: "1px dashed #ccc", borderRadius: "4px", background: "#fafafa" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", color: "#555" }}>Attach Policy Document (PDF):</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setNewFile(e.target.files[0])} />
                </div>

                <button type="submit" style={{ padding: "12px 18px", background: "#1976d2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                  Save & Publish Consultation
                </button>
              </form>
            )}
          </div>

          <section className="filters-panel">
            <div className="filter-grid">
              <div className="filter-field">
                <label htmlFor="rule-filter">Filter by Policy section</label>
                <select id="rule-filter" value={ruleFilter} onChange={(event) => setRuleFilter(event.target.value)}>
                  <option value="all">All policy sections</option>
                  {consultationRules.map((rule) => (
                    <option key={rule.id} value={rule.id}>{rule.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="feedback-summary">
            <article className="summary-item"><span>Total responses</span><strong>{filteredFeedback.length}</strong></article>
            <article className="summary-item positive-card"><span>Support</span><strong>{sentimentCounts.support}</strong></article>
            <article className="summary-item neutral-card"><span>Neutral</span><strong>{sentimentCounts.neutral}</strong></article>
            <article className="summary-item negative-card"><span>Concern</span><strong>{sentimentCounts.concern}</strong></article>
          </section>

          <section className="insights-grid">
            <article className="insights-card">
              <div className="section-title">
                <div>
                  <h2>AI-generated executive summary</h2>
                  <p>Powered by Gemini 2.5 Flash (Restricted to Authority view)</p>
                </div>
                <span className="ai-label">AI</span>
              </div>
              <div className="executive-summary">
                <button type="button" onClick={handleGenerateSummary} disabled={isGenerating} style={{ marginBottom: "12px", padding: "8px 14px", background: "#1976d2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  {isGenerating ? "Analyzing feedback..." : `Generate AI Summary for ${ruleFilter === "all" ? "All Sections" : getRuleLabel(ruleFilter)}`}
                </button>
                <p style={{ whiteSpace: "pre-line", lineHeight: "1.5" }}>{generatedSummary || "Click the button above to compile live feedback and trigger Gemini analysis."}</p>
              </div>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}

export default AuthorityDashboard;