import { useNavigate, useLocation } from "react-router-dom";
import "./GovernmentHeader.css";

function GovernmentHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to determine active nav tab safely
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <header className="government-header" style={{ width: "100%", background: "#fff", borderBottom: "1px solid #ddd" }}>
      {/* Top Gray Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 20px", background: "#f8f9fa", fontSize: "0.8rem", color: "#555", borderBottom: "1px solid #eee" }}>
        <span>Government of India</span>
        <span>Skip to main content | हिन्दी | Accessibility</span>
      </div>

      {/* Main Branding & Login Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src="https://flagcdn.com/w80/in.png" alt="Indian Flag" style={{ width: "45px", borderRadius: "3px", border: "1px solid #ccc" }} />
          <div>
            <strong style={{ fontSize: "1.3rem", display: "block", color: "#000" }}>e-Consultation Portal</strong>
            <span style={{ fontSize: "0.85rem", color: "#666" }}>Government Consultation & Public Feedback System</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ cursor: "pointer", color: "#555", fontSize: "0.9rem" }} onClick={() => navigate("/")}>Public Portal</span>
          <button
            type="button"
            onClick={() => navigate("/authority")}
            style={{
              padding: "8px 16px",
              background: "#fff",
              color: "#000",
              border: "1px solid #000",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Authority Login
          </button>
        </div>
      </div>

      {/* Blue Navigation Bar */}
      <nav style={{ display: "flex", background: "#f8f9fa", borderTop: "1px solid #ddd" }}>
        <button onClick={() => navigate("/")} style={{ padding: "12px 24px", background: isActive("/") ? "#1f4e79" : "transparent", color: isActive("/") ? "#fff" : "#333", border: "none", cursor: "pointer", fontWeight: "bold" }}>Home</button>
        <button onClick={() => navigate("/")} style={{ padding: "12px 24px", background: "transparent", color: "#333", border: "none", cursor: "pointer", fontWeight: "bold" }}>Consultations</button>
        <button onClick={() => alert("Departments page coming soon!")} style={{ padding: "12px 24px", background: "transparent", color: "#333", border: "none", cursor: "pointer", fontWeight: "bold" }}>Departments</button>
        <button onClick={() => alert("About page coming soon!")} style={{ padding: "12px 24px", background: "transparent", color: "#333", border: "none", cursor: "pointer", fontWeight: "bold" }}>About</button>
        <button onClick={() => alert("Help & Support coming soon!")} style={{ padding: "12px 24px", background: "transparent", color: "#333", border: "none", cursor: "pointer", fontWeight: "bold" }}>Help & Support</button>
      </nav>
    </header>
  );
}

export default GovernmentHeader;