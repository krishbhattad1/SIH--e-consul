import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./AuthorityDashboard.css";

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

function AuthorityDashboard() {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [search, setSearch] = useState("");
  const [sentiment, setSentiment] = useState("all");
  const [language, setLanguage] = useState("all");

  useEffect(() => {
    const loadFeedback = () => {
      const stored =
        JSON.parse(
          localStorage.getItem("consultationFeedback")
        ) || [];

      setFeedback(stored);
    };

    loadFeedback();

    window.addEventListener(
      "storage",
      loadFeedback
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadFeedback
      );
    };
  }, []);

  const getRuleFeedback = (ruleId) => {
    return feedback.filter(
      (item) => item.ruleId === ruleId
    );
  };

  const getCount = (ruleId, opinion) => {
    return getRuleFeedback(ruleId).filter(
      (item) => item.opinion === opinion
    ).length;
  };

  const selectedRuleFeedback = useMemo(() => {
    if (!selectedRule) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return feedback.filter((item) => {

      const matchesRule =
        item.ruleId === selectedRule;

      const matchesSearch =
        !query ||
        item.feedback
          .toLowerCase()
          .includes(query) ||
        item.name
          .toLowerCase()
          .includes(query) ||
        item.id
          .toLowerCase()
          .includes(query);

      const matchesSentiment =
        sentiment === "all" ||
        item.opinion === sentiment;

      const matchesLanguage =
        language === "all" ||
        item.language === language;

      return (
        matchesRule &&
        matchesSearch &&
        matchesSentiment &&
        matchesLanguage
      );
    });
  }, [
    feedback,
    selectedRule,
    search,
    sentiment,
    language,
  ]);

  const totalSupport = feedback.filter(
    (item) => item.opinion === "support"
  ).length;

  const totalNeutral = feedback.filter(
    (item) => item.opinion === "neutral"
  ).length;

  const totalConcern = feedback.filter(
    (item) => item.opinion === "concern"
  ).length;

  const getOpinionLabel = (opinion) => {
    if (opinion === "support") {
      return "Support";
    }

    if (opinion === "neutral") {
      return "Neutral";
    }

    return "Concern";
  };

  const openRule = (ruleId) => {
    setSelectedRule(ruleId);

    setSearch("");
    setSentiment("all");
    setLanguage("all");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeRule = () => {
    setSelectedRule(null);
    setSearch("");
    setSentiment("all");
    setLanguage("all");
  };

  return (
    <div className="authority-page">

      <GovernmentHeader />

      <div className="authority-layout">

        {/* SIDEBAR */}

        <aside className="authority-sidebar">

          <div className="authority-user">

            <div className="authority-avatar">
              A
            </div>

            <div>
              <strong>
                Authority User
              </strong>

              <span>
                Ministry of Heavy Industries
              </span>
            </div>

          </div>

          <nav className="authority-navigation">

            <button className="active">
              Dashboard
            </button>

            <button>
              Consultations
            </button>

            <button
              className={
                selectedRule
                  ? "active-section"
                  : "active-section"
              }
            >
              Feedback
            </button>

            <button>
              Analysis
            </button>

            <button>
              Reports
            </button>

          </nav>

          <button
            className="public-portal-link"
            onClick={() => navigate("/")}
          >
            ← Public Portal
          </button>

        </aside>

        {/* MAIN */}

        <main className="authority-main">

          <div className="authority-breadcrumb">
            Authority Portal / Feedback
          </div>

          <div className="authority-heading">

            <div>

              <h1>
                Feedback Dashboard
              </h1>

              <p>
                Draft Electric Vehicle Policy 2027
              </p>

            </div>

            <div className="consultation-status-badge">
              Open consultation
            </div>

          </div>

          {/* SUMMARY */}

          <section className="feedback-summary">

            <div className="summary-item">

              <span>
                Total responses
              </span>

              <strong>
                {feedback.length}
              </strong>

            </div>

            <div className="summary-item">

              <span>
                Support
              </span>

              <strong>
                {totalSupport}
              </strong>

            </div>

            <div className="summary-item">

              <span>
                Neutral
              </span>

              <strong>
                {totalNeutral}
              </strong>

            </div>

            <div className="summary-item">

              <span>
                Concern
              </span>

              <strong>
                {totalConcern}
              </strong>

            </div>

          </section>

          {/* RULE VIEW */}

          {!selectedRule && (

            <section className="rules-section">

              <div className="rules-heading">

                <div>

                  <h2>
                    Consultation sections
                  </h2>

                  <p>
                    Review public feedback according to
                    the section of the proposed policy.
                  </p>

                </div>

              </div>

              <div className="rules-list">

                {consultationRules.map((rule) => {

                  const count =
                    getRuleFeedback(rule.id).length;

                  const support =
                    getCount(
                      rule.id,
                      "support"
                    );

                  const neutral =
                    getCount(
                      rule.id,
                      "neutral"
                    );

                  const concern =
                    getCount(
                      rule.id,
                      "concern"
                    );

                  return (
                    <article
                      className="rule-card"
                      key={rule.id}
                    >

                      <div className="rule-card-main">

                        <h3>
                          {rule.title}
                        </h3>

                        <p>
                          {count} response
                          {count !== 1 ? "s" : ""}
                        </p>

                      </div>

                      <div className="rule-breakdown">

                        <div>
                          <span>Support</span>
                          <strong>{support}</strong>
                        </div>

                        <div>
                          <span>Neutral</span>
                          <strong>{neutral}</strong>
                        </div>

                        <div>
                          <span>Concern</span>
                          <strong>{concern}</strong>
                        </div>

                      </div>

                      <button
                        className="view-rule-button"
                        onClick={() =>
                          openRule(rule.id)
                        }
                      >
                        View feedback
                        <span>→</span>
                      </button>

                    </article>
                  );
                })}

              </div>

            </section>

          )}

          {/* SELECTED RULE */}

          {selectedRule && (

            <section className="rule-feedback-section">

              <button
                className="back-to-rules"
                onClick={closeRule}
              >
                ← Back to consultation sections
              </button>

              <div className="selected-rule-heading">

                <div>

                  <h2>
                    {
                      consultationRules.find(
                        (rule) =>
                          rule.id === selectedRule
                      )?.title
                    }
                  </h2>

                  <p>
                    {getRuleFeedback(selectedRule).length} total
                    response
                    {getRuleFeedback(selectedRule).length !== 1
                      ? "s"
                      : ""}
                  </p>

                </div>

              </div>

              {/* FILTERS */}

              <div className="feedback-controls">

                <div className="dashboard-search">

                  <label htmlFor="feedback-search">
                    Search feedback
                  </label>

                  <input
                    id="feedback-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search feedback..."
                  />

                </div>

                <div className="dashboard-filter">

                  <label htmlFor="sentiment-filter">
                    Opinion
                  </label>

                  <select
                    id="sentiment-filter"
                    value={sentiment}
                    onChange={(event) =>
                      setSentiment(event.target.value)
                    }
                  >
                    <option value="all">
                      All opinions
                    </option>

                    <option value="support">
                      Support
                    </option>

                    <option value="neutral">
                      Neutral
                    </option>

                    <option value="concern">
                      Concern
                    </option>

                  </select>

                </div>

                <div className="dashboard-filter">

                  <label htmlFor="language-filter">
                    Language
                  </label>

                  <select
                    id="language-filter"
                    value={language}
                    onChange={(event) =>
                      setLanguage(event.target.value)
                    }
                  >

                    <option value="all">
                      All languages
                    </option>

                    <option value="English">
                      English
                    </option>

                    <option value="Hindi">
                      Hindi
                    </option>

                    <option value="Marathi">
                      Marathi
                    </option>

                  </select>

                </div>

              </div>

              {/* FEEDBACK */}

              <div className="feedback-list">

                {selectedRuleFeedback.length === 0 ? (

                  <div className="dashboard-no-results">

                    <h3>
                      No feedback submitted for this section
                    </h3>

                    <p>
                      Feedback submitted by citizens will
                      appear here.
                    </p>

                  </div>

                ) : filteredFeedback.length === 0 ? (

                  <div className="dashboard-no-results">

                    <h3>
                      No matching feedback
                    </h3>

                    <p>
                      Try changing the search or filters.
                    </p>

                  </div>

                ) : (

                  filteredFeedback.map((item) => (

                    <article
                      className="feedback-card"
                      key={item.id}
                    >

                      <div className="feedback-card-header">

                        <div>

                          <strong className="feedback-id">
                            {item.id}
                          </strong>

                          <span className="feedback-name">
                            {item.name}
                          </span>

                        </div>

                        <span
                          className={`opinion-badge ${item.opinion}`}
                        >
                          {getOpinionLabel(item.opinion)}
                        </span>

                      </div>

                      <p className="feedback-card-text">
                        {item.feedback}
                      </p>

                      <div className="feedback-card-footer">

                        <span>
                          Language:{" "}
                          <strong>
                            {item.language}
                          </strong>
                        </span>

                        <span>
                          Submitted:{" "}
                          <strong>
                            {item.date}
                          </strong>
                        </span>

                      </div>

                    </article>

                  ))

                )}

              </div>

            </section>

          )}

        </main>

      </div>

    </div>
  );
}

export default AuthorityDashboard;