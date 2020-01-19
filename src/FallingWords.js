import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { random } from "lodash";

export default function FallingWords({
  words,
  guess,
  width,
  onComplete,
  onWordIndexChange,
  onFailure
}) {
  const [animatingWords, setAnimatingWords] = useState([
    { index: 0, x: `${random(0, width - 50)}px` }
  ]);
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const myRef = useRef();
  const [status, setStatus] = useState(null);

  const handleAnimationComplete = () => {
    animatingWords.shift();
    setScore(score - 1);
    setAnimatingWords([...animatingWords]);
    if (animatingWords.length) {
      onWordIndexChange(animatingWords[0].index);
    }
  };

  useEffect(() => {
    if (animatingWords.length === 0 && wordIndex === words.length - 1) {
      if (score >= 0) {
        onComplete();
      } else {
        setStatus("failure");
        onFailure();
      }
    }
  }, [animatingWords.length]);

  useEffect(() => {
    if (
      animatingWords.length &&
      words[animatingWords[0].index].replace(/\W/g, "") === guess
    ) {
      animatingWords.shift();
      setScore(score + 1);
      setAnimatingWords([...animatingWords]);
      if (animatingWords.length) {
        onWordIndexChange(animatingWords[0].index);
      }
    }
  }, [guess, animatingWords]);

  useEffect(() => {
    function update() {
      if (wordIndex < words.length - 1) {
        const newIndex = wordIndex + 1;
        setWordIndex(newIndex);
        if (!animatingWords.length) {
          onWordIndexChange(newIndex);
        }
        setAnimatingWords([
          ...animatingWords,
          {
            index: newIndex,
            x: `${random(0, width - 50)}px`
          }
        ]);
      }
    }
    const timer = window.setTimeout(update, 1000);
    return () => window.clearTimeout(timer);
  }, [wordIndex, animatingWords]);

  return (
    <div ref={myRef}>
      <div style={{ position: "absolute", right: "1rem", top: "7.5rem" }}>
        Score: {score}
      </div>
      {status === "failure" && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          Sorry, try again :(
        </div>
      )}
      {animatingWords.map((animatedWord, index) => {
        return (
          <motion.div
            key={animatedWord.index}
            style={{
              position: "absolute",
              x: animatedWord.x
            }}
            animate={{
              y: "calc(45vh)",
              transitionEnd: {
                display: "none"
              }
            }}
            transition={{ ease: "easeOut", duration: 10 }}
            onAnimationComplete={handleAnimationComplete}
          >
            <span style={{ fontWeight: `${index === 0 ? "bold" : "normal"}` }}>
              {words[animatedWord.index].replace(/\W/g, "")}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
