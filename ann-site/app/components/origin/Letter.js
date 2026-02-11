"use client";

import { useState, useRef } from "react";
import styles from "./origin.module.css";

const noResponses = ["不要", "真的不要", "别点我！", "求你了", "拜拜~"];

export default function Letter({ onYes }) {
  const [moveCount, setMoveCount] = useState(0);
  const [noHidden, setNoHidden] = useState(false);
  const [noPos, setNoPos] = useState(null);
  const [noText, setNoText] = useState("不要");
  const noRef = useRef(null);

  function moveButton() {
    const next = moveCount + 1;

    if (next >= 5) {
      setNoHidden(true);
      return;
    }

    setMoveCount(next);
    setNoText(noResponses[next]);

    const btn = noRef.current;
    if (!btn) return;
    const maxX = window.innerWidth - btn.offsetWidth - 20;
    const maxY = window.innerHeight - btn.offsetHeight - 20;
    setNoPos({
      left: Math.random() * maxX,
      top: Math.random() * maxY,
    });
  }

  return (
    <div className={styles.letterPage}>
      <div className={styles.letterCard}>
        <p>
          我希望有个如你一般的人，如山间清爽的风，如古城温暖的光。从清晨到傍晚，由山野到书房。
        </p>
        <p>
          和你在一起的时候，时间好像变得很轻，很快，很舒服，很自在，很想一直这样下去。
        </p>
        <p>
          认识你的时间很短，但我很认真。我不喜欢做承诺，因为未来太远，谁也看不清。但有些事情不需要想太多——我的心跳、我的直觉、我靠近你时的感觉，都在告诉我同一件事。
        </p>
        <p className={styles.letterHighlight}>我喜欢你。</p>
        <p className={styles.letterEnding}>只要最后是你，就好。</p>
      </div>

      <div className={styles.hearts}>
        <span className={styles.heart}>&#10084;</span>
        <span className={styles.heart}>&#10084;</span>
        <span className={styles.heart}>&#10084;</span>
      </div>

      <p className={styles.question}>做我女朋友好不好？</p>

      <div className={styles.letterButtons}>
        <button className={styles.yesBtn} onClick={onYes}>
          好
        </button>
        {!noHidden && (
          <button
            ref={noRef}
            className={styles.noBtn}
            style={
              noPos
                ? { position: "fixed", left: noPos.left, top: noPos.top }
                : undefined
            }
            onMouseOver={moveButton}
            onClick={moveButton}
          >
            {noText}
          </button>
        )}
      </div>
    </div>
  );
}
