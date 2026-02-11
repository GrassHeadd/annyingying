"use client";

import { useState } from "react";
import Envelope from "./origin/Envelope";
import Letter from "./origin/Letter";
import Celebration from "./origin/Celebration";

export default function OriginTab() {
  const [stage, setStage] = useState("envelope");

  return (
    <div className="origin-wrapper">
      {stage === "envelope" && (
        <Envelope onOpen={() => setStage("letter")} />
      )}
      {stage === "letter" && (
        <Letter onYes={() => setStage("celebration")} />
      )}
      {stage === "celebration" && <Celebration />}
    </div>
  );
}
