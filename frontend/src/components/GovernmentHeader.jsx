import "./GovernmentHeader.css";

function IndiaFlag() {
  return (
    <svg
      className="india-flag"
      viewBox="0 0 60 40"
      role="img"
      aria-label="Flag of India"
    >
      <rect width="60" height="40" fill="#ffffff" />
      <rect width="60" height="13.33" fill="#FF9933" />
      <rect y="26.67" width="60" height="13.33" fill="#138808" />

      <circle
        cx="30"
        cy="20"
        r="6"
        fill="none"
        stroke="#000080"
        strokeWidth="1.2"
      />

      <circle cx="30" cy="20" r="1.2" fill="#000080" />

      <g stroke="#000080" strokeWidth="0.65">
        <line x1="30" y1="14" x2="30" y2="26" />
        <line x1="24" y1="20" x2="36" y2="20" />
        <line x1="25.76" y1="15.76" x2="34.24" y2="24.24" />
        <line x1="34.24" y1="15.76" x2="25.76" y2="24.24" />
        <line x1="27.7" y1="14.32" x2="32.3" y2="25.68" />
        <line x1="32.3" y1="14.32" x2="27.7" y2="25.68" />
        <line x1="24.32" y1="17.7" x2="35.68" y2="22.3" />
        <line x1="35.68" y1="17.7" x2="24.32" y2="22.3" />
      </g>
    </svg>
  );
}

function GovernmentHeader() {
  return (
    <header className="government-header">

      <div className="utility-bar">
        <div className="utility-left">
          <span>Government of India</span>
        </div>

        <div className="utility-right">
          <button>Skip to main content</button>
          <span>|</span>
          <button>हिन्दी</button>
          <span>|</span>
          <button>Accessibility</button>
        </div>
      </div>

      <div className="identity-bar">

        <div className="identity-left">

          <IndiaFlag />

          <div className="identity-text">
            <div className="identity-title">
              e-Consultation Portal
            </div>

            <div className="identity-subtitle">
              Government Consultation & Public Feedback System
            </div>
          </div>

        </div>

        <div className="identity-right">
          <span>Public Portal</span>

          <button className="authority-button">
            Authority Login
          </button>
        </div>

      </div>

      <nav className="main-navigation">

        <div className="navigation-inner">

          <a href="#home" className="navigation-link active">
            Home
          </a>

          <a href="#consultations" className="navigation-link">
            Consultations
          </a>

          <a href="#departments" className="navigation-link">
            Departments
          </a>

          <a href="#about" className="navigation-link">
            About
          </a>

          <a href="#help" className="navigation-link">
            Help & Support
          </a>

        </div>

      </nav>

    </header>
  );
}

export default GovernmentHeader;