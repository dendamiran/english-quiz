import { useState } from "react";

const allQuestions = [
  // 🐾 ANIMALS
  { question: "What animal is this? 🐶", options: ["Cat", "Dog", "Bird", "Fish"], answer: "Dog", category: "Animals" },
  { question: "What animal is this? 🐱", options: ["Dog", "Cat", "Rabbit", "Horse"], answer: "Cat", category: "Animals" },
  { question: "What animal is this? 🐦", options: ["Bird", "Fish", "Lion", "Snake"], answer: "Bird", category: "Animals" },
  { question: "What animal is this? 🐘", options: ["Elephant", "Tiger", "Dog", "Cat"], answer: "Elephant", category: "Animals" },

  // 🎨 COLORS
  { question: "The sky is ___ ☁️", options: ["Green", "Blue", "Red", "Black"], answer: "Blue", category: "Colors" },
  { question: "Grass is ___ 🌿", options: ["Blue", "Yellow", "Green", "Pink"], answer: "Green", category: "Colors" },
  { question: "The sun is ___ ☀️", options: ["Black", "Yellow", "Blue", "Purple"], answer: "Yellow", category: "Colors" },
  { question: "A banana is ___ 🍌", options: ["Red", "Green", "Yellow", "Blue"], answer: "Yellow", category: "Colors" },

  // 🍎 FOOD
  { question: "This is a ___ 🍎", options: ["Apple", "Banana", "Pizza", "Milk"], answer: "Apple", category: "Food" },
  { question: "This is a ___ 🍕", options: ["Burger", "Pizza", "Rice", "Apple"], answer: "Pizza", category: "Food" },
  { question: "This is ___ 🥛", options: ["Water", "Juice", "Milk", "Tea"], answer: "Milk", category: "Food" },
  { question: "This is a ___ 🍌", options: ["Banana", "Apple", "Grape", "Orange"], answer: "Banana", category: "Food" },

  // 🔢 NUMBERS
  { question: "How many stars? ⭐⭐⭐", options: ["Two", "Three", "Four", "Five"], answer: "Three", category: "Numbers" },
  { question: "How many apples? 🍎🍎🍎🍎🍎", options: ["Three", "Four", "Five", "Six"], answer: "Five", category: "Numbers" },
  { question: "How many fingers? ✋", options: ["Three", "Four", "Five", "Six"], answer: "Five", category: "Numbers" },
  { question: "How many cats? 🐱🐱", options: ["One", "Two", "Three", "Four"], answer: "Two", category: "Numbers" },

  // 🧠 BODY
  { question: "You use this to see 👁️", options: ["Ear", "Eye", "Nose", "Hand"], answer: "Eye", category: "Body" },
  { question: "You use this to hear 👂", options: ["Eye", "Ear", "Mouth", "Leg"], answer: "Ear", category: "Body" },
  { question: "You use this to walk 🚶", options: ["Hand", "Leg", "Eye", "Nose"], answer: "Leg", category: "Body" },
  { question: "You use this to eat 🍽️", options: ["Hand", "Foot", "Eye", "Ear"], answer: "Hand", category: "Body" },
];

const TOTAL = 20;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [stage, setStage] = useState("start");

  const q = questions[current];

  function startGame() {
    const shuffled = shuffle(allQuestions).slice(0, TOTAL);

    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setStage("playing");
  }

  function answer(opt) {
    if (!q || selected) return;

    setSelected(opt);

    if (opt === q.answer) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      setSelected(null);

      if (current + 1 >= TOTAL) {
        setStage("result");
      } else {
        setCurrent((c) => c + 1);
      }
    }, 600);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* START */}
        {stage === "start" && (
          <>
            <h1 style={styles.title}>Brenda’s Quiz</h1>
            <p style={styles.subtitle}>English Vocabulary Practice</p>
            <button style={styles.button} onClick={startGame}>
              Start
            </button>
          </>
        )}

        {/* QUIZ */}
        {stage === "playing" && q && (
          <>
            <h2 style={styles.question}>{q.question}</h2>

            <div style={styles.options}>
              {q.options.map((opt) => {
                let bg = "#fff";
                let border = "1px solid #ddd";

                if (selected) {
                  if (opt === q.answer) {
                    bg = "#cdeccf";
                    border = "2px solid #2e7d32";
                  } else if (opt === selected) {
                    bg = "#f8c8c8";
                    border = "2px solid #c62828";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => answer(opt)}
                    style={{ ...styles.option, background: bg, border }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <p style={styles.score}>Score: {score}</p>
          </>
        )}

        {/* RESULT */}
        {stage === "result" && (
          <>
            <h1 style={styles.title}>Finished 🎉</h1>
            <p style={styles.subtitle}>
              You got {score} / {TOTAL}
            </p>

            <button style={styles.button} onClick={startGame}>
              Play Again
            </button>
          </>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F4F0E8",
    fontFamily: "sans-serif",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: 26,
    fontWeight: 800,
    color: "#2B241C",
  },

  subtitle: {
    color: "#7A6E63",
    marginBottom: 20,
  },

  question: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 20,
  },

  options: {
    display: "grid",
    gap: 10,
    marginBottom: 20,
  },

  option: {
    padding: 12,
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
    background: "#fff",
  },

  button: {
    background: "#7A5C3E",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
  },

  score: {
    fontWeight: 700,
    color: "#7A5C3E",
  },
};