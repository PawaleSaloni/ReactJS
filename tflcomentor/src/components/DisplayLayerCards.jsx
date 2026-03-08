import { useState, useEffect, useRef } from "react";

const _import = document.createElement("link");
_import.rel = "stylesheet";
_import.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
document.head.appendChild(_import);

const GRADIENT_PRIMARY = "linear-gradient(135deg, hsl(0, 65%, 51%), hsl(14, 100%, 57%))";
const GRADIENT_HERO    = "linear-gradient(135deg, hsl(0, 65%, 51%, 0.1), hsl(14, 100%, 57%, 0.1))";
const SHADOW_ELEGANT   = "0 10px 30px -10px hsl(0, 65%, 51%, 0.3)";

function useScrollAnimation() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

const layers = [
  { title: "Frontend", icon: "🖥️", techs: ["React", "Angular", "Vue", "Next.js"] },
  { title: "Backend",  icon: "⚙️",  techs: ["Express JS", "Next JS", "Springboot", "Django", "Node.js"] },
  { title: "Database", icon: "🗄️", techs: ["SQL", "MongoDB", "MySQL", "PostgreSQL"] },
];

export default function DisplayLayerCards() {
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState({
    Frontend: ["React"],
    Backend: ["Express JS"],
    Database: ["MongoDB"],
  });
  const [shown, setShown] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const toggle = (layer, tech) => {
    setSelected((prev) => {
      const cur = prev[layer] || [];
      return {
        ...prev,
        [layer]: cur.includes(tech) ? cur.filter((t) => t !== tech) : [...cur, tech],
      };
    });
  };

  const totalSelected = Object.values(selected).flat().length;

  return (
    // section py-16 sm:py-20 bg-background
    <section style={{ padding: "64px 0 80px", background: "hsl(0, 0%, 100%)", fontFamily: "'Inter', sans-serif" }}>
      {/* container mx-auto px-4 */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1rem" }}>

        {/* Heading — same as QuickStatistics */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{
            fontSize: "clamp(1.875rem, 4vw, 2.25rem)",
            fontWeight: 700,
            color: "hsl(222.2, 84%, 4.9%)",
            margin: "0 0 1rem",
            lineHeight: 1.2,
          }}>
            Display{" "}
            <span style={{
              background: GRADIENT_PRIMARY,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Layer
            </span>
          </h2>
        </div>

        {/* max-w-5xl mx-auto */}
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          {/* Card: border-0 shadow-elegant overflow-hidden + scroll anim */}
          <div
            ref={ref}
            style={{
              border: "none",
              boxShadow: SHADOW_ELEGANT,
              overflow: "hidden",
              borderRadius: "0.5rem",
              transition: "opacity 1s ease, transform 1s ease",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            {/* bg-gradient-hero p-8 sm:p-10 */}
            <div style={{
              background: GRADIENT_HERO,
              padding: "clamp(2rem, 3vw, 2.5rem)",
            }}>
              {/* 3 column grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
              }}>
                {layers.map((layer) => {
                  const selCount = (selected[layer.title] || []).length;
                  return (
                    <div
                      key={layer.title}
                      style={{
                        background: "hsl(0, 0%, 100%)",
                        borderRadius: "0.5rem",
                        padding: "1.25rem 1rem 1.5rem",
                        boxShadow: "0 2px 8px hsl(0, 65%, 51%, 0.08)",
                        border: "1px solid hsl(220, 13%, 91%)", // --border
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      {/* Layer header */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: 40, height: 40,
                          borderRadius: "0.5rem",
                          background: GRADIENT_PRIMARY,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 20, flexShrink: 0,
                          boxShadow: SHADOW_ELEGANT,
                        }}>
                          {layer.icon}
                        </div>
                        <div>
                          <div style={{
                            fontWeight: 700, fontSize: "1rem",
                            color: "hsl(222.2, 84%, 4.9%)",
                          }}>
                            {layer.title}
                          </div>
                          <div style={{
                            fontSize: "0.75rem", fontWeight: 600,
                            background: GRADIENT_PRIMARY,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}>
                            {selCount} selected
                          </div>
                        </div>
                      </div>

                      {/* Tech rows — Button variant="hero" style */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {layer.techs.map((tech) => {
                          const checked = (selected[layer.title] || []).includes(tech);
                          return (
                            <button
                              key={tech}
                              onClick={() => toggle(layer.title, tech)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.625rem",
                                padding: "0.625rem 0.875rem",
                                borderRadius: "0.5rem",
                                border: checked ? "none" : "1px solid hsl(220, 13%, 91%)",
                                background: checked ? GRADIENT_PRIMARY : "hsl(0, 0%, 100%)",
                                boxShadow: checked ? SHADOW_ELEGANT : "none",
                                cursor: "pointer",
                                userSelect: "none",
                                fontFamily: "inherit",
                                width: "100%",
                                textAlign: "left",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                            >
                              {/* Checkbox */}
                              <div style={{
                                width: 18, height: 18,
                                borderRadius: "0.25rem",
                                border: checked ? "none" : "2px solid hsl(0, 65%, 51%, 0.4)",
                                background: checked ? "rgba(255,255,255,0.25)" : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                                transition: "all 0.2s ease",
                              }}>
                                {checked && (
                                  <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, lineHeight: 1 }}>✓</span>
                                )}
                              </div>
                              <span style={{
                                fontSize: "0.875rem",
                                fontWeight: checked ? 600 : 400,
                                color: checked ? "#fff" : "hsl(222.2, 84%, 4.9%)",
                                transition: "color 0.2s ease",
                              }}>
                                {tech}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics result */}
        {shown && (
          <div style={{
            maxWidth: "64rem", margin: "1.5rem auto 0",
            background: GRADIENT_HERO,
            border: "1px solid hsl(220, 13%, 91%)",
            borderRadius: "0.5rem",
            padding: "1.125rem 1.5rem",
            animation: "lcPop 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          }}>
            <style>{`@keyframes lcPop { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <div style={{
              fontSize: "0.6875rem", color: "hsl(220, 9%, 46%)",
              fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.08em", marginBottom: "0.625rem",
            }}>
              Selected Stack ({totalSelected} technologies)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.entries(selected).map(([layer, techs]) =>
                techs.map((t) => (
                  <span key={layer + t} style={{
                    background: GRADIENT_PRIMARY,
                    color: "#fff",
                    borderRadius: "9999px",
                    padding: "0.3125rem 0.875rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                  }}>
                    {layer}: {t}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Show Analytics Button — same style as Refresh */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <button
            onClick={() => setShown((p) => !p)}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              background: GRADIENT_PRIMARY,
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.75rem 2.5rem",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: SHADOW_ELEGANT,
              transform: btnHovered ? "translateY(-2px)" : "translateY(0)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {shown ? "Hide Analytics" : "Show Analytics"}
          </button>
        </div>

      </div>
    </section>
  );
}
