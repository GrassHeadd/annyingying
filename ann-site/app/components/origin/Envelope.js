"use client";

import { useState } from "react";
import styles from "./origin.module.css";

export default function Envelope({ onOpen }) {
  const [opened, setOpened] = useState(false);

  function handleClick() {
    setOpened(true);
    setTimeout(() => onOpen(), 800);
  }

  return (
    <div className={styles.envelopePage}>
      <h1 className={styles.envelopeTitle}>给你的一封信</h1>
      <div
        className={`${styles.envelope} ${opened ? styles.envelopeOpened : ""}`}
        onClick={handleClick}
      >
        <div className={styles.envelopeFlap} />
        <div className={styles.envelopeBody}>
          <span className={styles.envelopeHeart}>&#10084;</span>
        </div>
      </div>
      <p className={styles.envelopeHint}>点击信封</p>
    </div>
  );
}
