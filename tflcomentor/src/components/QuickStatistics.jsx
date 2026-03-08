import { useState, useEffect, useRef } from "react";

const _import = document.createElement("link");
_import.rel = "stylesheet";
_import.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
document.head.appendChild(_import);

const GRADIENT_PRIMARY = "linear-gradient(135deg, hsl(0, 65%, 51%), hsl(14, 100%, 57%))";
const GRADIENT_HERO    = "linear-gradient(135deg, hsl(0, 65%, 51%, 0.1), hsl(14, 100%, 57%, 0.1))";
const SHADOW_ELEGANT   = "0 10px 30px -10px hsl(0, 65%, 51%, 0.3)";

const initialStats = [
  { label: "Total Questions", value: 25 },
  { label: "Runtime", value: 10 },
  { label: "Language", value: 10 },
  { label: "Layers", value: 10 },
  { label: "Technology", value: 10 },
  { label: "Question Type", value: 5 },
  { label: "Concept", value: 10 },
];

function useScrollAnimation() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

function useCountUp(target, duration = 900, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) { setCount(0); return; }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, trigger]);
  return count;
}

function HeroButton({ label, value, trigger }) {
  const count = useCountUp(value, 900, trigger);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        gap: 12,
        textAlign: "center",
        border: "none",
        borderRadius: "0.5rem", // --radius
        cursor: "pointer",
        userSelect: "none",
        background: GRADIENT_PRIMARY,
        color: "#fff",
        boxShadow: SHADOW_ELEGANT,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "inherit",
        width: "100%",
      }}
    >
      {/* text-lg font-medium */}
      <span style={{ fontSize: "1.125rem", fontWeight: 500, lineHeight: 1.4 }}>
        {label}
      </span>
      {/* text-4xl sm:text-5xl font-bold */}
      <span style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1 }}>
        {trigger ? count : 0}
      </span>
    </button>
  );
}

export default function QuickStatistics() {
  const { ref, isVisible } = useScrollAnimation();
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setStats(initialStats.map((s) => ({ ...s, value: s.value + Math.floor(Math.random() * 15 + 1) })));
      setLoading(false);
    }, 500);
  };

  return (
    // section py-16 sm:py-20 bg-background
    <section style={{ padding: "64px 0 80px", background: "hsl(0, 0%, 100%)", fontFamily: "'Inter', sans-serif" }}>
      {/* container mx-auto px-4 */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1rem" }}>

        {/* text-center mb-12 sm:mb-16 */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          {/* text-3xl sm:text-4xl font-bold text-foreground mb-4 */}
          <h2 style={{
            fontSize: "clamp(1.875rem, 4vw, 2.25rem)",
            fontWeight: 700,
            color: "hsl(222.2, 84%, 4.9%)",
            margin: "0 0 1rem",
            lineHeight: 1.2,
          }}>
            Quick{" "}
            {/* bg-gradient-primary bg-clip-text text-transparent */}
            <span style={{
              background: GRADIENT_PRIMARY,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Statistics
            </span>
          </h2>
        </div>

        {/* max-w-5xl mx-auto */}
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          {/* Card: border-0 shadow-elegant overflow-hidden transition-all duration-1000 + scroll anim */}
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
              {/* CardContent — grid sm:grid-cols-2 lg:grid-cols-4 gap-8 */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "2rem",
              }}>
                {stats.map((stat, i) => (
                  <HeroButton
                    key={stat.label + stat.value}
                    label={stat.label}
                    value={stat.value}
                    trigger={isVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Refresh button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <button
            onClick={handleRefresh}
            disabled={loading}
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
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              boxShadow: SHADOW_ELEGANT,
              transform: btnHovered ? "translateY(-2px)" : "translateY(0)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Refreshing..." : "Refresh Stats"}
          </button>
        </div>

      </div>
    </section>
  );
}
