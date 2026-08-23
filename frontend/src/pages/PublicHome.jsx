import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./PublicHome.css";

function PublicHome() {
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [sector, setSector] = useState("All sectors");

  // Fetch dynamic modules/consultations from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/modules")
      .then((res) => res.json())
      .then((data) => {
        if (data.modules) {
          // Map backend modules to consultation format
          const formatted = data.modules.map((m) => ({
            id: m.id,
            title: m.title,
            department: m.department || "Ministry of Heavy Industries",
            sector: m.sector || "Transport",
            closingDate: m.closingDate || "31 December 2026",
          }));
          setConsultations(formatted);
        }
      })
      .catch((err) => console.error("Failed to load consultations", err));
  }, []);

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

      return matchesSearch && matchesDepartment && matchesSector;
    });
  }, [consultations, search, department, sector]);

  const openConsultation = (id) => {
    navigate(`/consultation/${id}`);
  };

  return (
    <div className="public-portal">
      <GovernmentHeader />

      <main>
        <section className="page-introduction">
          <div className="breadcrumb">Home / Public Consultations</div>
          <h1>Public Consultations</h1>
          <p className="introduction-text">
            Find government consultations, review proposed policies and submit your comments or suggestions to the concerned department.
          </p>
        </section>

        <section className="search-section">
          <div className="search-heading">
            <h2>Find a consultation</h2>
            <p>Search by title or government department.</p>
          </div>

          <div className="filters">
            <div className="search-field">
              <label htmlFor="consultation-search">Search consultations</label>
              <input
                id="consultation-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search consultations..."
              />
            </div>

            <div className="filter-field">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
              >
                {departments.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="sector">Sector</label>
              <select
                id="sector"
                value={sector}
                onChange={(event) => setSector(event.target.value)}
              >
                {sectors.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="consultation-section" id="consultations">
          <div className="listing-header">
            <div>
              <h2>Open consultations</h2>
              <p>
                {filteredConsultations.length} consultation{filteredConsultations.length !== 1 ? "s" : ""} available for public comments.
              </p>
            </div>

            {(search || department !== "All departments" || sector !== "All sectors") && (
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
                <h3>No consultations found</h3>
                <p>Use the Authority Dashboard to add new policy modules and consultations.</p>
              </div>
            ) : (
              filteredConsultations.map((item) => (
                <article className="consultation-row" key={item.id}>
                  <div className="consultation-information">
                    <div className="consultation-status">
                      <span></span>
                      Open
                    </div>
                    <h3>{item.title}</h3>
                    <p className="department">{item.department}</p>
                    <div className="consultation-meta">
                      <span><strong>Sector:</strong> {item.sector}</span>
                      <span><strong>Closes:</strong> {item.closingDate}</span>
                    </div>
                  </div>

                  <div className="consultation-action">
                    <button onClick={() => openConsultation(item.id)}>
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
            <strong>e-Consultation Portal</strong>
            <p>Government Consultation & Public Feedback System</p>
          </div>
          <div className="footer-navigation">
            <button type="button" onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>Home</button>
            <button type="button" onClick={() => navigate("/authority")} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>Authority Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicHome;