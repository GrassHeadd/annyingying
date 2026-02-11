"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import s from "./valentineGame.module.css";

const scenes = [
  { type: "title", bg: "#13101f" },
  { type: "day", day: "1", date: "2月14日", subtitle: "Valentine's Day", bg: "#1a1430" },
  { type: "scene", label: "~ 出发 ~", text: "来吧宝宝\n冒险要开始了~", bg: "#1a1430" },
  { type: "scene", label: "📍 Court Square Hotel", text: "Long Island City\n先把东西放下~", bg: "#1a1430", bgImage: "/bg_court1.avif" },
  { type: "scene", label: "", text: "然后我们...\n先休息一下？👀", bg: "#18122e", bgImage: "/bg_court1.avif" },
  { type: "scene", label: "📍 NARO · 5:30 PM", text: "情人节晚餐~\n610 5th Ave", bg: "#1c1432", bgImage: "/bg_naro.avif" },
  { type: "scene", label: "", text: "吃饱了\n回酒店休息～ 💤", bg: "#0f0d1a", bgImage: "/bg_court1.avif" },
  { type: "day", day: "2", date: "2月15日", subtitle: "The Adventure Continues", bg: "#161230" },
  { type: "scene", label: "☀️ 早上好", text: "新的一天！\n退房，去Downtown~", bg: "#181430", bgImage: "/bg_court1.avif" },
  { type: "scene", label: "🍽️ 午饭", text: "先去吃点东西\n补充体力~", bg: "#181430" },
  { type: "scene", label: "📍 SIX · 2:00 PM", text: "Broadway 音乐剧！\nMezz · Row J", bg: "#1a1235", bgImage: "/bg_six.png" },
  { type: "scene", label: "📍 AC Hotel by Marriott", text: "New York Downtown\n新酒店 check in~", bg: "#181430", bgImage: "/bg_ac.avif" },
  { type: "scene", label: "🍽️ 晚餐", text: "待定...\n你想吃什么？", bg: "#181430" },
  { type: "scene", label: "", text: "然后继续...\nNetflix？😏💤", bg: "#0f0d1a", bgImage: "/bg_ac.avif" },
  { type: "day", day: "3", date: "2月16日", subtitle: "Until Next Time", bg: "#161222" },
  { type: "scene", label: "", text: "退房～\n冒险结束了...", bg: "#161222", bgImage: "/bg_ac.avif" },
  { type: "ending", text: "但跟你的故事\n才刚刚开始", bg: "#161222" },
];

function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 10 + 8}s`,
        delay: `${Math.random() * 12}s`,
        size: `${Math.random() * 10 + 8}px`,
        maxOpacity: (Math.random() * 0.15 + 0.06).toFixed(2),
      }))
    );
  }, []);

  return (
    <div className={s.heartsBg}>
      {hearts.map((h) => (
        <div
          key={h.id}
          className={s.pixelHeart}
          style={{
            left: h.left,
            animationDuration: h.duration,
            animationDelay: h.delay,
            fontSize: h.size,
            "--max-opacity": h.maxOpacity,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

function TitleScene() {
  return (
    <>
      <div className={s.titleChars}>
        <Image src="/jj_pixel.png" alt="JJ" width={90} height={90} className={s.bob1} />
        <span className={s.titleHeart}>❤️</span>
        <Image src="/ann_pixel.png" alt="Ann" width={90} height={90} className={s.bob2} />
      </div>
      <div className={s.titleMain}>{"VALENTINE'S"}<br />QUEST</div>
      <div className={s.titleYear}>2026</div>
      <div className={s.titleStart}>TAP TO START</div>
    </>
  );
}

function DayScene({ scene }) {
  return (
    <div className={s.dayScreen}>
      <div className={s.dayLabel}>DAY {scene.day}</div>
      <div className={s.dayDate}>{scene.date}</div>
      <div className={s.daySubtitle}>{scene.subtitle}</div>
    </div>
  );
}

function DialogueScene({ scene, typedHtml, showArrow }) {
  return (
    <div className={s.sceneContent}>
      <div className={s.sceneLabel}>{scene.label || ""}</div>
      <div className={s.characters}>
        <Image src="/jj_pixel.png" alt="JJ" width={160} height={160} className={`${s.char} ${s.bob1}`} />
        <Image src="/ann_pixel.png" alt="Ann" width={160} height={160} className={`${s.char} ${s.bob2}`} />
      </div>
      <div className={s.dialogueBox}>
        <div className={s.dialogueText} dangerouslySetInnerHTML={{ __html: typedHtml }} />
        <div className={`${s.dialogueArrow} ${showArrow ? s.dialogueArrowShow : ""}`}>▼</div>
      </div>
    </div>
  );
}

function EndingScene({ scene }) {
  return (
    <div className={s.endingScreen}>
      <div className={`${s.characters} ${s.endingChars}`}>
        <Image src="/jj_pixel.png" alt="JJ" width={100} height={100} className={`${s.char} ${s.bob1}`} />
        <Image src="/ann_pixel.png" alt="Ann" width={100} height={100} className={`${s.char} ${s.bob2}`} />
      </div>
      <div className={s.endingText} dangerouslySetInnerHTML={{ __html: scene.text.replace(/\n/g, "<br/>") }} />
      <div className={s.endingHearts}>❤️ ❤️ ❤️</div>
    </div>
  );
}

export default function ValentineGameTab() {
  const [currentScene, setCurrentScene] = useState(0);
  const [fading, setFading] = useState(false);
  const [typedHtml, setTypedHtml] = useState("");
  const [showArrow, setShowArrow] = useState(false);

  const stateRef = useRef("READY"); // READY | TYPING | TRANSITIONING | DONE
  const timerRef = useRef(null);
  const fullTextRef = useRef("");

  const scene = scenes[currentScene];
  const progress = (currentScene / (scenes.length - 1)) * 100;

  // Start typing when scene changes to a dialogue scene
  useEffect(() => {
    if (scene.type === "scene") {
      startTyping(scene.text);
    } else if (scene.type === "ending") {
      stateRef.current = "DONE";
    } else {
      stateRef.current = "READY";
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentScene]);

  function startTyping(text) {
    stateRef.current = "TYPING";
    fullTextRef.current = text;
    setTypedHtml("");
    setShowArrow(false);

    let i = 0;
    const chars = text.split("");
    let html = "";

    timerRef.current = setInterval(() => {
      if (i < chars.length) {
        const ch = chars[i];
        html += ch === "\n" ? "<br/>" : ch;
        setTypedHtml(html);
        i++;
      } else {
        clearInterval(timerRef.current);
        timerRef.current = null;
        stateRef.current = "READY";
        setShowArrow(true);
      }
    }, 50);
  }

  function completeTyping() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTypedHtml(fullTextRef.current.replace(/\n/g, "<br/>"));
    setShowArrow(true);
    stateRef.current = "READY";
  }

  function goTo(index) {
    if (stateRef.current === "TRANSITIONING") return;
    if (index < 0 || index >= scenes.length) return;

    if (stateRef.current === "TYPING") {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    }

    stateRef.current = "TRANSITIONING";
    setFading(true);

    setTimeout(() => {
      setCurrentScene(index);
      setFading(false);
    }, 350);
  }

  const advance = useCallback(() => {
    const state = stateRef.current;

    if (state === "TYPING") {
      completeTyping();
      return;
    }

    if (state === "DONE" || state === "TRANSITIONING") return;

    if (state === "READY") {
      const next = currentScene + 1;
      if (next >= scenes.length) {
        stateRef.current = "DONE";
        return;
      }

      goTo(next);
    }
  }, [currentScene]);

  function goBack(e) {
    e.stopPropagation();
    if (currentScene > 0) goTo(currentScene - 1);
  }

  function goForward(e) {
    e.stopPropagation();
    advance();
  }

  function handleClick(e) {
    e.stopPropagation();
    advance();
  }

  function handleTouch(e) {
    e.preventDefault();
    e.stopPropagation();
    advance();
  }

  return (
    <div
      className={s.game}
      style={{ background: scene.bg }}
      onClick={handleClick}
      onTouchEnd={handleTouch}
    >
      {/* Background image */}
      {scene.bgImage && (
        <div
          className={s.bgImage}
          style={{ backgroundImage: `url(${scene.bgImage})` }}
        />
      )}

      <FloatingHearts />

      <div className={`${s.sceneContainer} ${fading ? s.fadeOut : ""}`}>
        {scene.type === "title" && <TitleScene />}
        {scene.type === "day" && <DayScene scene={scene} />}
        {scene.type === "scene" && (
          <DialogueScene scene={scene} typedHtml={typedHtml} showArrow={showArrow} />
        )}
        {scene.type === "ending" && <EndingScene scene={scene} />}
      </div>

      {/* Back button */}
      {currentScene > 0 && (
        <button className={`${s.navBtn} ${s.navLeft}`} onClick={goBack} onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); goBack(e); }}>
          ‹
        </button>
      )}

      <div className={s.progressBar}>
        <div className={s.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
