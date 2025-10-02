"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  // Example: simulate fetching subscription status
  const [isSubscribedmb, setIsSubscribedmb] = useState(false);

  useEffect(() => {
    // Replace this with your real subscription check, e.g., API call or cookie/localStorage
    const subscriptionStatus = localStorage.getItem("subscribedmb"); // 'true' or 'false'
    setIsSubscribedmb(subscriptionStatus === "true");
  }, []);

  const handleDownload = (e) => {
    e.preventDefault();
    if (isSubscribedmb) {
      // If subscribed, allow download
      window.location.href = "/Mr-Bot.apk";
    } else {
      // If not subscribed, redirect to subscribe page
      router.push("/subscribe");
    }
  };

  return (
    <main className="landing-container">    
      {/* === Topbar === */}
      <header className="topbar">
        <div className="brand">
          Mr.<span className="accent">Bot</span>
        </div>
        <nav className="nav">

          <a href="#download">Download</a>
        </nav>
      </header>

      {/* === Hero Section === */}
      <section className="hero">
        <h1 className="hero-title">Enter the Cyber Grid</h1>
        <p className="hero-subtitle">
          Hack systems. Expose secrets. Rewrite the digital world.
        </p>
        <a href="#download" className="btn primary" data-text="Mr. Bot">
          <span className="btn-text">Download Now</span>
        </a>
      </section>

      {/* === About Section === */}
      <section id="about" className="recon-container">
        <h2>About the Game</h2>
        <p>
          In <span className="st">Mr. Bot</span>, you step into the shoes of a
          master hacker navigating a city of secrets. Leak classified
          information, manipulate online narratives, and outsmart powerful
          corporations. Every move changes the balance of digital power.
        </p>
        <Link href="./story" className="btn primary" data-text="Mr. Bot" style={{width:'100%' , textAlign:'center'}}>
          <span className="btn-text">Story</span>
        </Link>
      </section>
{/* === Features Section === */}
<section id="features" className="recon-container">
        <h2>🎮 Features</h2>
        <ul className="features-list">
          <li><strong>Story-rich Missions</strong> → Uncover scandals, expose secrets, and shape history.</li>
          <li><strong>Social Engineering Gameplay</strong> → Build personas, spread rumors, and manipulate hashtags.</li>
          <li><strong>Choice & Consequence</strong> → Truth, half-truth, or fabrication — each path changes the world.</li>
          <li><strong>Hacking Tools & Strategy</strong> → Use virtual exploits, leak documents, and evade fact-checkers.</li>
          <li><strong>Political Thriller Setting</strong> → Dark themes of corruption, power, and control.</li>
        </ul>
      </section>
      {/* === Screenshots Section === */}
      <section id="screenshots" className="recon-container">
        <h2>Screenshots</h2>
        <div className="screens-grid">
          <div className="screenshot-card"><img src="/m1.png"/></div>
          <div className="screenshot-card"><img src="/m2.png"/></div>
          <div className="screenshot-card"><img src="/m3.png"/></div>
          <div className="screenshot-card"><img src="/m4.png"/></div>
          <div className="screenshot-card"><img src="/m5.png"/></div>
          <div className="screenshot-card"><img src="/m6.png"/></div>
          <div className="screenshot-card"><img src="/m7.png"/></div>
        </div>
      </section>

      {/* === Download Section === */}
      <section id="download" className="recon-container">
        <h2>Download & Play</h2>
        <p>
          Grab the latest build of <span className="st">Mr. Bot</span> and start
          hacking the cyber grid today.
        </p>
        <button
          onClick={handleDownload}
          className="btn primary"
          style={{ textAlign: "center", width: "100%" }}
        >
          <span className="btn-text">Download APK</span>
        </button>
      </section>

      {/* === Footer === */}
      <footer className="footer">
        © 2025 Mr. Bot Studio | All Rights Reserved
      </footer>
    </main>
  );
}
