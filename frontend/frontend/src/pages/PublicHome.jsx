import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./PublicHome.css";

const consultations = [
  {
    id: "ev-policy-2027",
    title: "Draft Electric Vehicle Policy 2027",
    department: "Ministry of Heavy Industries",
    sector: "Transport",
    closingDate: "15 September 2026",
  },
  {
    id: "urban-transport",
    title: "National Urban Transport Policy",
    department: "Ministry of Housing and Urban Affairs",
    sector: "Urban Development",
    closingDate: "30 September 2026",
  },
  {
    id: "digital-education",
    title: "Digital Education Framework",
    department: "Ministry of Education",
    sector: "Education",
    closingDate: "05 October 2026",
  },
  {
    id: "water-management",
    title: "National Water Management Framework",
    department: "Ministry of Jal Shakti",
    sector: "Water Resources",
    closingDate: "12 October 2026",
  },
  {
    id: "logistics-policy",
    title: "Draft National Logistics Policy Amendment",
    department: "Ministry of Commerce & Industry",
    sector: "Commerce",
    closingDate: "20 October 2026",
  },
];

function PublicHome() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [sector, setSector] = useState("All sectors");

  const departments = [
    "All departments",
    ...new Set(consultations.map((item) => item.department)),
  ];

  const sectors = [
    "All sectors",
    ...new Set(consultations.map((item) => item.sector)),
  ];

  const filteredConsultations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return consultations.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query);

      const matchesDepartment =
        department === "All departments" ||
        item.department === department;

      const matchesSector =
        sector === "All sectors" ||
        item.sector === sector;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSector
      );
    });
  }, [search, department, sector]);

  const openConsultation = (id) => {
    navigate(`/consultation/${id}`);
  };

  return (
    <div className="public-portal">

      <GovernmentHeader />

      <main>

        {/* Page heading */}

        <section className="page-introduction">

          <div className="breadcrumb">
            Home / Public Consultations
          </div>

          <h1>
            Public Consultations
          </h1>

          <p className="introduction-text">
            Find government consultations, review proposed
            policies and submit your comments or suggestions
            to the concerned department.
          </p>

        </section>

        {/* Search */}

        <section className="search-section">

          <div className="search-heading">

            <h2>
              Find a consultation
            </h2>

            <p>
              Search by title or government department.
            </p>

          </div>

          <div className="filters">

            <div className="search-field">

              <label htmlFor="consultation-search">
                Search consultations
              </label>

              <input
                id="consultation-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search consultations..."
              />

            </div>

            <div className="filter-field">

              <label htmlFor="department">
                Department
              </label>

              <select
                id="department"
                value={department}
                onChange={(event) =>
                  setDepartment(event.target.value)
                }
              >
                {departments.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

            <div className="filter-field">

              <label htmlFor="sector">
                Sector
              </label>

              <select
                id="sector"
                value={sector}
                onChange={(event) =>
                  setSector(event.target.value)
                }
              >
                {sectors.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </section>

        {/* Consultation list */}

        <section
          className="consultation-section"
          id="consultations"
        >

          <div className="listing-header">

            <div>
              <h2>
                Open consultations
              </h2>

              <p>
                {filteredConsultations.length} consultation
                {filteredConsultations.length !== 1
                  ? "s"
                  : ""}{" "}
                available for public comments.
              </p>
            </div>

            {(search ||
              department !== "All departments" ||
              sector !== "All sectors") && (
              <button
                className="clear-filters"
                onClick={() => {
                  setSearch("");
                  setDepartment("All departments");
                  setSector("All sectors");
                }}
              >
                Clear filters
              </button>
            )}

          </div>

          <div className="consultation-list">

            {filteredConsultations.length === 0 ? (

              <div className="no-results">

                <h3>
                  No consultations found
                </h3>

                <p>
                  Try a different search term or change
                  the selected filters.
                </p>

              </div>

            ) : (

              filteredConsultations.map((item) => (

                <article
                  className="consultation-row"
                  key={item.id}
                >

                  <div className="consultation-information">

                    <div className="consultation-status">
                      <span></span>
                      Open
                    </div>

                    <h3>
                      {item.title}
                    </h3>

                    <p className="department">
                      {item.department}
                    </p>

                    <div className="consultation-meta">

                      <span>
                        <strong>Sector:</strong>{" "}
                        {item.sector}
                      </span>

                      <span>
                        <strong>Closes:</strong>{" "}
                        {item.closingDate}
                      </span>

                    </div>

                  </div>

                  <div className="consultation-action">

                    <button
                      onClick={() =>
                        openConsultation(item.id)
                      }
                    >
                      View details
                      <span>→</span>
                    </button>

                  </div>

                </article>

              ))

            )}

          </div>

        </section>

      </main>

      <footer className="portal-footer">

        <div className="footer-content">

          <div>
            <strong>
              e-Consultation Portal
            </strong>

            <p>
              Government Consultation & Public Feedback System
            </p>
          </div>

        <div className="footer-navigation">

  <a href="#home">
    Home
  </a>

  <a href="#consultations">
    Consultations
  </a>

  <a href="#help">
    Help
  </a>

</div>

           </div>

        <div className="footer-legal">

          <span>
            Prototype interface — SIH 2026 Internal Hackathon
          </span>
<div className="footer-legal-links">

  <a href="/terms">
    Terms & Conditions
  </a>

  <span>|</span>

  <a href="/privacy">
    Privacy Policy
  </a>

</div>

        </div>

      </footer>

    </div>
  );
}

export default PublicHome;