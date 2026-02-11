"use client";

import { useMemo } from "react";
import styles from "./origin.module.css";

export default function Celebration() {
  const confettiPieces = useMemo(() => {
    const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff8cc8", "#a66cff"];
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + "vw",
      bg: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3 + "s",
      duration: Math.random() * 2 + 2 + "s",
    }));
  }, []);

  const floatingHearts = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + "vw",
      delay: Math.random() * 5 + "s",
      size: Math.random() * 20 + 15 + "px",
    }));
  }, []);

  return (
    <div className={styles.celebrationPage}>
      <div className={styles.confettiContainer}>
        {confettiPieces.map((c) => (
          <div
            key={c.id}
            className={styles.confetti}
            style={{
              left: c.left,
              backgroundColor: c.bg,
              animationDelay: c.delay,
              animationDuration: c.duration,
            }}
          />
        ))}
      </div>
      <div className={styles.heartsContainer}>
        {floatingHearts.map((h) => (
          <div
            key={h.id}
            className={styles.floatingHeart}
            style={{
              left: h.left,
              animationDelay: h.delay,
              fontSize: h.size,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      <div className={styles.celebrationContent}>
        <h1 className={styles.celebrationTitle}>太好啦！！</h1>
        <p className={styles.celebrationSubtext}>我会好好珍惜你的 ❤️</p>
        <div className={styles.celebrationImg}>
          <img src="/cat_flowers.jpeg" alt="Cute cat with flowers" />
        </div>
      </div>
    </div>
  );
}
