"use client";

import FadeIn from "./FadeIn";

const aboutYou = [
  "很直接",
  "会communicate你的感受",
  "很decisive",
  "很可爱",
  "很喜欢甜食",
  "小吃货",
  "打游戏很厉害",
];

const whatsNext = [
  "Cancún 🌴",
  "一起hunt更多adventure",
  "和你贴贴",
  "和你做豆",
  "和你看电影",
  "更多一起吃的东西",
  "更多一起走的路",
  "不做承诺，但会一直认真",
];

export default function ValentineTab() {
  return (
    <div className="tab-content">
      {/* Intro */}
      <section className="section section-intro">
        <FadeIn>
          <p className="intro-text">
            从那个网站到现在，好像很多事情都变了。
          </p>
        </FadeIn>
      </section>

      {/* About You */}
      <section className="section section-with-divider">
        <FadeIn>
          <h2 className="section-title">关于你</h2>
        </FadeIn>
        <div className="items-list">
          {aboutYou.map((text, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <p className="item">{text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* What's Next */}
      <section className="section section-with-divider">
        <FadeIn>
          <h2 className="section-title">接下来</h2>
        </FadeIn>
        <div className="items-list">
          {whatsNext.map((text, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <p className="item">{text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="section section-closing">
        <FadeIn>
          <p className="closing-line">谢谢你让我走进来。</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="closing-greeting">情人节快乐，宝宝。</p>
        </FadeIn>
        <FadeIn delay={0.6}>
          <p className="closing-love">爱你 ❤️</p>
        </FadeIn>
      </section>
    </div>
  );
}
