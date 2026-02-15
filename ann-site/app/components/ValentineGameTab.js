"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import s from "./valentineGame.module.css";

const scenes = [
  { type: "title", bg: "#13101f" },
  {
    type: "day",
    day: "1",
    date: "2月14日",
    subtitle: "Valentine's Day",
    bg: "#1a1430",
  },
  {
    type: "scene",
    label: "~ 出发 ~",
    text: "来吧宝宝\n我们出发了~",
    bg: "#1a1430",
  },
  {
    type: "scene",
    label: "📍 Court Square Hotel · 4:00 PM",
    text: "Court Square Hotel\n先把东西放下~",
    bg: "#1a1430",
    bgImage: "/bg_court1.avif",
  },
  {
    type: "scene",
    label: "📍 NARO · 5:30 PM",
    text: "情人节晚餐~\n610 5th Ave",
    bg: "#1c1432",
    bgImage: "/bg_naro.avif",
  },
  {
    type: "scene",
    label: "🌙 Evening",
    text: "吃饱了～\n回酒店看Singles Inferno 🔥",
    bg: "#0f0d1a",
    bgImage: "/bg_court1.avif",
  },
  {
    type: "day",
    day: "2",
    date: "2月15日",
    subtitle: "The Adventure Continues",
    bg: "#161230",
  },
  {
    type: "scene",
    label: "☀️ 早上好 · 11:00 AM",
    text: "新的一天！\n退房去新酒店放东西~",
    bg: "#181430",
    bgImage: "/bg_court1.avif",
  },
  {
    type: "scene",
    label: "🍽️ 午饭 · 12:00 PM",
    text: "待定...\n你想吃什么？",
    bg: "#181430",
  },
  {
    type: "scene",
    label: "📍 SIX · 2:00 PM",
    text: "Broadway 音乐剧！\nMezz · Row J",
    bg: "#1a1235",
    bgImage: "/bg_six.png",
  },
  {
    type: "scene",
    label: "📍 AC Hotel · 4:00 PM",
    text: "AC Marriott Hotel\n新酒店 check in~",
    bg: "#181430",
    bgImage: "/bg_ac.avif",
  },
  {
    type: "scene",
    label: "🍽️ 晚餐 · 6:30 PM",
    text: "待定...\n你想吃什么？",
    bg: "#181430",
  },
  {
    type: "scene",
    label: "🌙 Evening",
    text: "然后继续...\nNetflix？😏💤",
    bg: "#0f0d1a",
    bgImage: "/bg_ac.avif",
  },
  {
    type: "day",
    day: "3",
    date: "2月16日",
    subtitle: "Until Next Time",
    bg: "#161222",
  },
  {
    type: "scene",
    label: "☀️ 11:00 AM",
    text: "退房～\n旅程结束了...",
    bg: "#161222",
    bgImage: "/bg_ac.avif",
  },
  { type: "ending", text: "但跟你的故事\n才刚刚开始", bg: "#161222" },
];

const schedule = [
  {
    day: "1",
    date: "2月14日",
    subtitle: "Valentine's Day",
    items: [
      {
        time: "4:00 PM",
        label: "Court Square Hotel",
        desc: "Check in · 放东西",
      },
      { time: "5:30 PM", label: "NARO", desc: "情人节晚餐 · 610 5th Ave" },
      { time: "Evening", label: "", desc: "回酒店看 Singles Inferno 🔥" },
    ],
  },
  {
    day: "2",
    date: "2月15日",
    subtitle: "The Adventure Continues",
    items: [
      { time: "11:00 AM", label: "", desc: "退房去新酒店放东西" },
      { time: "12:00 PM", label: "", desc: "午饭 · 新疆菜" },
      { time: "2:00 PM", label: "SIX", desc: "Broadway 音乐剧 · Mezz Row J" },
      { time: "4:00 PM", label: "SIX", desc: "SOHO shopping" },
      {
        time: "6:00 PM",
        label: "AC Marriott Hotel",
        desc: "Check in · 放东西",
      },
      { time: "6:30 PM", label: "", desc: "晚餐 · 青花椒" },
      { time: "Evening", label: "", desc: "Alan Walker tbc" },
    ],
  },
  {
    day: "3",
    date: "2月16日",
    subtitle: "Until Next Time",
    items: [{ time: "11:00 AM", label: "", desc: "退房 · 旅程结束" }],
  },
];

// ─── Sound helper ───
function playTone(freq, duration, volume = 0.08) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

function playTypeSound() {
  playTone(800 + Math.random() * 400, 0.04, 0.03);
}

function playAdvanceSound() {
  playTone(523, 0.08, 0.06);
  setTimeout(() => playTone(659, 0.08, 0.06), 60);
}

function playStartSound() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((n, i) => setTimeout(() => playTone(n, 0.15, 0.06), i * 100));
}

function playDaySound() {
  playTone(440, 0.2, 0.05);
  setTimeout(() => playTone(554, 0.2, 0.05), 150);
  setTimeout(() => playTone(659, 0.3, 0.05), 300);
}

// ─── Components ───

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
      })),
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

function TitleScene({ starting }) {
  return (
    <div className={`${s.titleScreen} ${starting ? s.titleStarting : ""}`}>
      <div className={s.titleChars}>
        <Image
          src="/jj_pixel.png"
          alt="JJ"
          width={90}
          height={90}
          className={s.bob1}
        />
        <Image
          src="/pixel_heart.png"
          alt="heart"
          width={48}
          height={48}
          className={s.titleHeartImg}
        />
        <Image
          src="/ann_pixel.png"
          alt="Ann"
          width={90}
          height={90}
          className={s.bob2}
        />
      </div>
      <div className={s.titleMain}>
        {"VALENTINE'S"}
        <br />
        QUEST
      </div>
      <div className={s.titleYear}>2026</div>
      <div className={s.titleStart}>TAP TO START</div>
    </div>
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
      <div className={s.portraitRow}>
        <Image
          src="/jj_pixel.png"
          alt="JJ"
          width={80}
          height={80}
          className={`${s.portrait} ${s.bob1}`}
        />
        <Image
          src="/ann_pixel.png"
          alt="Ann"
          width={80}
          height={80}
          className={`${s.portrait} ${s.bob2}`}
        />
      </div>
      <div className={s.dialogueBox}>
        <div
          className={s.dialogueText}
          dangerouslySetInnerHTML={{ __html: typedHtml }}
        />
        <div
          className={`${s.dialogueArrow} ${showArrow ? s.dialogueArrowShow : ""}`}
        >
          ▼
        </div>
      </div>
    </div>
  );
}

function EndingScene({ scene }) {
  return (
    <div className={s.endingScreen}>
      <div className={`${s.characters} ${s.endingChars}`}>
        <Image
          src="/jj_pixel.png"
          alt="JJ"
          width={100}
          height={100}
          className={`${s.char} ${s.bob1}`}
        />
        <Image
          src="/pixel_heart.png"
          alt="heart"
          width={40}
          height={40}
          className={s.endingHeartImg}
        />
        <Image
          src="/ann_pixel.png"
          alt="Ann"
          width={100}
          height={100}
          className={`${s.char} ${s.bob2}`}
        />
      </div>
      <div
        className={s.endingText}
        dangerouslySetInnerHTML={{ __html: scene.text.replace(/\n/g, "<br/>") }}
      />
    </div>
  );
}

function ScheduleSheet() {
  return (
    <div className={s.sheet}>
      <div className={s.sheetInner}>
        <div className={s.sheetTitle}>{"VALENTINE'S QUEST"}</div>
        <div className={s.sheetSubtitle}>2026</div>
        {schedule.map((day) => (
          <div key={day.day} className={s.sheetDay}>
            <div className={s.sheetDayHeader}>
              <span className={s.sheetDayLabel}>DAY {day.day}</span>
              <span className={s.sheetDayDate}>{day.date}</span>
            </div>
            {day.items.map((item, i) => (
              <div key={i} className={s.sheetItem}>
                <div className={s.sheetTime}>{item.time}</div>
                <div>
                  {item.label && (
                    <div className={s.sheetDesc}>{item.label}</div>
                  )}
                  <div className={item.label ? s.sheetLabel : s.sheetDesc}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Singleton BGM ───
let bgmAudio = null;

// ─── Main ───

export default function ValentineGameTab() {
  const [currentScene, setCurrentScene] = useState(0);
  const [fading, setFading] = useState(false);
  const [typedHtml, setTypedHtml] = useState("");
  const [showArrow, setShowArrow] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [starting, setStarting] = useState(false);

  const stateRef = useRef("READY");
  const timerRef = useRef(null);
  const fullTextRef = useRef("");

  const scene = scenes[currentScene];
  const progress = (currentScene / (scenes.length - 1)) * 100;

  useEffect(() => {
    if (scene.type === "scene") {
      startTyping(scene.text);
    } else if (scene.type === "ending") {
      stateRef.current = "DONE";
    } else if (scene.type === "day") {
      stateRef.current = "READY";
      playDaySound();
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
        if (ch !== "\n" && ch !== " ") playTypeSound();
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
    playAdvanceSound();

    setTimeout(() => {
      setCurrentScene(index);
      setFading(false);
    }, 400);
  }

  const advance = useCallback(() => {
    const state = stateRef.current;

    if (state === "TYPING") {
      completeTyping();
      return;
    }

    if (state === "DONE" || state === "TRANSITIONING") return;

    if (state === "READY") {
      // Start animation for title screen
      if (currentScene === 0) {
        setStarting(true);
        playStartSound();
        // Start background music (singleton)
        if (!bgmAudio) {
          bgmAudio = new Audio("/bgm.mp3");
          bgmAudio.loop = true;
          bgmAudio.volume = 0.15;
        }
        bgmAudio.play().catch(() => {});
        stateRef.current = "TRANSITIONING";
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setCurrentScene(1);
            setFading(false);
            setStarting(false);
          }, 400);
        }, 500);
        return;
      }

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

  function handleClick(e) {
    if (e.target.closest("button")) return;
    e.stopPropagation();
    advance();
  }

  function toggleSheet(e) {
    e.stopPropagation();
    setShowSheet((v) => !v);
  }

  return (
    <div
      className={s.game}
      style={{ background: showSheet ? "#13101f" : scene.bg }}
      onClick={showSheet ? undefined : handleClick}
    >
      {!showSheet && scene.bgImage && (
        <div
          className={s.bgImage}
          style={{ backgroundImage: `url(${scene.bgImage})` }}
        />
      )}

      <FloatingHearts />

      <button className={s.toggleBtn} onClick={toggleSheet}>
        {showSheet ? "GAME" : "SCHEDULE"}
      </button>

      {showSheet ? (
        <ScheduleSheet />
      ) : (
        <>
          <div className={`${s.sceneContainer} ${fading ? s.fadeOut : ""}`}>
            {scene.type === "title" && <TitleScene starting={starting} />}
            {scene.type === "day" && <DayScene scene={scene} />}
            {scene.type === "scene" && (
              <DialogueScene
                scene={scene}
                typedHtml={typedHtml}
                showArrow={showArrow}
              />
            )}
            {scene.type === "ending" && <EndingScene scene={scene} />}
          </div>

          {currentScene > 0 && (
            <button className={`${s.navBtn} ${s.navLeft}`} onClick={goBack}>
              ‹
            </button>
          )}

          <div className={s.progressBar}>
            <div className={s.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </>
      )}
    </div>
  );
}
