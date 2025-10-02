"use client";
import { useEffect } from "react";

export default function Starfield() {
  useEffect(() => {
    const canvas = document.getElementById("stars");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let stars = [];
    const numStars = 120;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speed: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00cba9";

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createStars();
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      id="stars"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}
