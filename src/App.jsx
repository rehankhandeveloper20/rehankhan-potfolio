import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const heroRef = useRef(null);
  const alterRef = useRef(null);

  const cursorTarget = useRef({
    x: 0,
    y: 0,
  });

  const cursorCurrent = useRef({
    x: 0,
    y: 0,
  });

  const revealTarget = useRef({
    x: 50,
    y: 50,
  });

  const revealCurrent = useRef({
    x: 50,
    y: 50,
  });

  const animationFrame = useRef(null);

  const [active, setActive] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const alter = alterRef.current;

    if (!hero || !alter) return;

    const handlePointerMove = (event) => {
      const rect = hero.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;

      const y = ((event.clientY - rect.top) / rect.height) * 100;

      revealTarget.current.x = Math.max(0, Math.min(100, x));

      revealTarget.current.y = Math.max(0, Math.min(100, y));

      cursorTarget.current.x = event.clientX;
      cursorTarget.current.y = event.clientY;

      setActive(true);
      setCursorVisible(true);
    };

    const handlePointerLeave = () => {
      setActive(false);
      setCursorVisible(false);

      revealTarget.current.x = 50;
      revealTarget.current.y = 50;
    };

    const handlePointerOver = (event) => {
      const interactive = event.target.closest("a");

      setCursorHover(Boolean(interactive));
    };

    const animate = () => {
      revealCurrent.current.x +=
        (revealTarget.current.x - revealCurrent.current.x) * 0.11;

      revealCurrent.current.y +=
        (revealTarget.current.y - revealCurrent.current.y) * 0.11;

      cursorCurrent.current.x +=
        (cursorTarget.current.x - cursorCurrent.current.x) * 0.16;

      cursorCurrent.current.y +=
        (cursorTarget.current.y - cursorCurrent.current.y) * 0.16;

      alter.style.setProperty("--mouse-x", `${revealCurrent.current.x}%`);

      alter.style.setProperty("--mouse-y", `${revealCurrent.current.y}%`);

      document.documentElement.style.setProperty(
        "--cursor-x",
        `${cursorCurrent.current.x}px`,
      );

      document.documentElement.style.setProperty(
        "--cursor-y",
        `${cursorCurrent.current.y}px`,
      );

      animationFrame.current = requestAnimationFrame(animate);
    };

    hero.addEventListener("pointermove", handlePointerMove);

    hero.addEventListener("pointerleave", handlePointerLeave);

    hero.addEventListener("pointerover", handlePointerOver);

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);

      hero.removeEventListener("pointerleave", handlePointerLeave);

      hero.removeEventListener("pointerover", handlePointerOver);

      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <main className="portfolio">
      {/* =========================================
          CUSTOM CURSOR
      ========================================= */}

      <div
        className={`custom-cursor ${cursorVisible ? "visible" : ""} ${
          cursorHover ? "hovering" : ""
        }`}
      >
        <span className="cursor-dot" />

        <span className="cursor-ring" />

        <span className="cursor-label">MOVE</span>
      </div>

      {/* =========================================
          NORMAL WORLD
      ========================================= */}

      <section ref={heroRef} className="hero normal-world">
        <div className="intro-cover" />

        <div className="frame" />

        {/* TOP BAR */}

        <header className="top-bar">
          <div className="brand">REHAN KHAN</div>

          <div className="top-center">BSC COMPUTER SCIENCE / 2026</div>

          <nav>
            <a href="#work">WORK</a>

            <a href="#about">ABOUT</a>

            <a href="#contact">CONTACT</a>
          </nav>
        </header>

        {/* BACKGROUND TITLE */}

        <div className="background-title">
          <span>FULL STACK</span>

          <span className="background-x">X</span>

          <span>CYBERSECURITY</span>
        </div>

        {/* PORTRAIT */}

        <div className="portrait">
          <img src="/src/assets/image1.png" alt="Rehan Khan" />
        </div>

        {/* LEFT EDITORIAL */}

        <div className="editorial left-editorial">
          <div className="editorial-meta">
            <span>01</span>

            <span>DEVELOPMENT</span>
          </div>

          <div className="editorial-line" />

          <p className="eyebrow">CURRENTLY LEARNING</p>

          <h1>
            BUILD
            <br />
            SECURE
            <br />
            CREATE
          </h1>

          <p className="description">
            I'm Rehan Khan, a first-year BSc Computer Science student exploring
            full-stack development and cybersecurity.
          </p>

          <a className="editorial-link" href="#work">
            <span>EXPLORE MY WORK</span>

            <strong>↗</strong>
          </a>
        </div>

        {/* RIGHT EDITORIAL */}

        <div className="editorial right-editorial">
          <div className="editorial-meta">
            <span>REHAN</span>

            <span>01 / 02</span>
          </div>

          <div className="editorial-line" />

          <p className="eyebrow">WEB DEVELOPMENT</p>

          <h2>
            CODE
            <br />
            MEETS
            <br />
            CREATIVITY
          </h2>

          <p className="description">
            Building modern web experiences while constantly learning new
            technologies and ideas.
          </p>
        </div>

        {/* SIDE LABELS */}

        <div className="side-label side-label-left">
          FULL STACK / CYBERSECURITY
        </div>

        <div className="side-label side-label-right">
          REHAN KHAN / CREATIVE DEVELOPER
        </div>

        {/* BOTTOM LABELS */}

        <div className="bottom-left">BASED IN INDIA</div>

        <div className="bottom-center">MOVE TO REVEAL</div>

        <div className="bottom-right">SCROLL TO EXPLORE ↓</div>
      </section>

      {/* =========================================
          ALTER WORLD
      ========================================= */}

      <section
        ref={alterRef}
        className={`hero alter-world ${active ? "is-active" : ""}`}
      >
        <div className="frame" />

        {/* TOP BAR */}

        <header className="top-bar">
          <div className="brand">REHAN KHAN</div>

          <div className="top-center">BSC COMPUTER SCIENCE / 2026</div>

          <nav>
            <a href="#work">WORK</a>

            <a href="#about">ABOUT</a>

            <a href="#contact">CONTACT</a>
          </nav>
        </header>

        {/* BACKGROUND TITLE */}

        <div className="background-title">
          <span>FULL STACK</span>

          <span className="background-x">X</span>

          <span>CYBERSECURITY</span>
        </div>

        {/* ALTER PORTRAIT */}

        <div className="portrait">
          <img
            src="/src/assets/image2.png"
            alt="Rehan Khan alternate portrait"
          />
        </div>

        {/* ALTER LEFT EDITORIAL */}

        <div className="editorial left-editorial">
          <div className="editorial-meta">
            <span>01</span>

            <span>DEVELOPMENT</span>
          </div>

          <div className="editorial-line" />

          <p className="eyebrow">CURRENTLY LEARNING</p>

          <h1>
            BUILD
            <br />
            SECURE
            <br />
            CREATE
          </h1>

          <p className="description">
            I'm Rehan Khan, a first-year BSc Computer Science student exploring
            full-stack development and cybersecurity.
          </p>

          <a className="editorial-link" href="#work">
            <span>EXPLORE MY WORK</span>

            <strong>↗</strong>
          </a>
        </div>

        {/* ALTER RIGHT EDITORIAL */}

        <div className="editorial right-editorial">
          <div className="editorial-meta">
            <span>REHAN</span>

            <span>01 / 02</span>
          </div>

          <div className="editorial-line" />

          <p className="eyebrow">WEB DEVELOPMENT</p>

          <h2>
            CODE
            <br />
            MEETS
            <br />
            CREATIVITY
          </h2>

          <p className="description">
            Building modern web experiences while constantly learning new
            technologies and ideas.
          </p>
        </div>

        {/* SIDE LABELS */}

        <div className="side-label side-label-left">
          FULL STACK / CYBERSECURITY
        </div>

        <div className="side-label side-label-right">
          REHAN KHAN / CREATIVE DEVELOPER
        </div>

        {/* BOTTOM LABELS */}

        <div className="bottom-left">BASED IN INDIA</div>

        <div className="bottom-center">MOVE TO REVEAL</div>

        <div className="bottom-right">SCROLL TO EXPLORE ↓</div>
      </section>
    </main>
  );
}

export default App;
