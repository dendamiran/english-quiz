import { useState } from "react";

const allQuestions = [
  { question: "What is this? 🐱", options: ["Dog", "Cat", "Bird", "Fish"], answer: "Cat", category: "Animals" },
  { question: "What is this? 🐶", options: ["Cat", "Rabbit", "Dog", "Horse"], answer: "Dog", category: "Animals" },
  { question: "What is this? 🐘", options: ["Lion", "Elephant", "Giraffe", "Tiger"], answer: "Elephant", category: "Animals" },
  { question: "What is this? 🐦", options: ["Fish", "Snake", "Bird", "Frog"], answer: "Bird", category: "Animals" },
  { question: "The sky is... ☁️🌤️", options: ["Green", "Red", "Blue", "Yellow"], answer: "Blue", category: "Colors" },
  { question: "Grass is... 🌿", options: ["Purple", "Green", "Orange", "Pink"], answer: "Green", category: "Colors" },
  { question: "The sun is... ☀️", options: ["Blue", "White", "Black", "Yellow"], answer: "Yellow", category: "Colors" },
  { question: "What is this? 🍎", options: ["Banana", "Orange", "Apple", "Grape"], answer: "Apple", category: "Food" },
  { question: "What is this? 🍕", options: ["Burger", "Pizza", "Pasta", "Bread"], answer: "Pizza", category: "Food" },
  { question: "What is this? 🥛", options: ["Juice", "Water", "Milk", "Coffee"], answer: "Milk", category: "Food" },
  { question: "What is this? 🍌", options: ["Mango", "Lemon", "Pear", "Banana"], answer: "Banana", category: "Food" },
  { question: "How many? 🌟🌟🌟", options: ["Two", "Four", "Three", "Five"], answer: "Three", category: "Numbers" },
  { question: "How many? 🍎🍎🍎🍎🍎", options: ["Three", "Six", "Four", "Five"], answer: "Five", category: "Numbers" },
  { question: "You use this to see 👁️", options: ["Nose", "Ear", "Eye", "Mouth"], answer: "Eye", category: "Body" },
  { question: "You use this to hear 👂", options: ["Eye", "Ear", "Hand", "Nose"], answer: "Ear", category: "Body" },
  { question: "You use this to walk 🦵", options: ["Arm", "Head", "Hand", "Leg"], answer: "Leg", category: "Body" },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const TOTAL = 8;

const categoryColors = {
  Animals: "#FF6B6B", Colors: "#A78BFA",
  Food: "#34D399", Numbers: "#FBBF24", Body: "#60A5FA",
};

const BrandBar = () => (
  <div style={s.brandBar}>
    <span style={s.brandName}>👩‍🏫 Brenda Miranda</span>
    <a href="https://instagram.com/ibrendadotcom" target="_blank" rel="noopener noreferrer" style={s.brandInsta}>
      📸 @ibrendadotcom
    </a>
  </div>
);

export default function VocabQuiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState("start");
  const [shake, setShake] = useState(false);
  const [bounce, setBounce] = useState(false);

  function startGame() {
    setQuestions(shuffle(allQuestions).slice(0, TOTAL));
    setCurrent(0); setScore(0); setSelected(null); setStage("playing");
  }

  function handleAnswer(option) {
    if (selected !== null) return;
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(sc => sc + 1);
      setBounce(true); setTimeout(() => setBounce(false), 600);
    } else {
      setShake(true); setTimeout(() => setShake(false), 500);
    }
    setTimeout(() => {
      setSelected(null);
      if (current + 1 >= TOTAL) setStage("result");
      else setCurrent(c => c + 1);
    }, 1100);
  }

  const q = questions[current];
  const progress = ((current) / TOTAL) * 100;
  const resultEmoji = score >= 7 ? "🏆" : score >= 5 ? "🌟" : score >= 3 ? "👍" : "💪";
  const resultMsg = score >= 7 ? "Amazing! You're a star!" : score >= 5 ? "Great job! Keep it up!" : score >= 3 ? "Good try! Practice more!" : "Keep studying! You can do it!";

  return (
    <div style={s.root}>
      <div style={s.bg} />

      {stage === "start" && (
        <div style={s.card}>
          <BrandBar />
          <div style={s.titleEmoji}>📚</div>
          <h1 style={s.title}>English Vocab Quiz</h1>
          <p style={s.subtitle}>Level: Beginner (A1/A2)</p>
          <div style={s.topicGrid}>
            {["🐱 Animals","🎨 Colors","🍎 Food","🔢 Numbers","👁️ Body"].map(t => (
              <span key={t} style={s.topicTag}>{t}</span>
            ))}
          </div>
          <p style={s.info}>{TOTAL} questions · Multiple choice</p>
          <button style={s.startBtn} onClick={startGame}>Let's Play! 🚀</button>
        </div>
      )}

      {stage === "playing" && q && (
        <div style={s.card}>
          <BrandBar />
          <div style={s.header}>
            <span style={{ ...s.categoryBadge, background: categoryColors[q.category] || "#94a3b8" }}>{q.category}</span>
            <span style={s.scoreBox}>⭐ {score}</span>
          </div>
          <div style={s.progressBar}><div style={{ ...s.progressFill, width: `${progress}%` }} /></div>
          <p style={s.progressText}>{current + 1} / {TOTAL}</p>
          <div style={{ ...s.questionBox, animation: shake ? "shake 0.5s" : bounce ? "pop 0.4s" : "none" }}>
            <p style={s.question}>{q.question}</p>
          </div>
          <div style={s.options}>
            {q.options.map(opt => {
              let bg = "#f8fafc", color = "#1e293b", border = "2px solid #e2e8f0";
              if (selected !== null) {
                if (opt === q.answer) { bg = "#bbf7d0"; border = "2px solid #22c55e"; color = "#166534"; }
                else if (opt === selected) { bg = "#fecaca"; border = "2px solid #ef4444"; color = "#991b1b"; }
              }
              return (
                <button key={opt} style={{ ...s.optionBtn, background: bg, color, border }} onClick={() => handleAnswer(opt)}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {stage === "result" && (
        <div style={s.card}>
          <BrandBar />
          <div style={{ fontSize: 64, textAlign: "center", marginTop: 8 }}>{resultEmoji}</div>
          <h2 style={s.resultTitle}>Quiz Complete!</h2>
          <div style={s.scoreCircle}>
            <span style={s.scoreNum}>{score}</span>
            <span style={s.scoreTotal}>/{TOTAL}</span>
          </div>
          <p style={s.resultMsg}>{resultMsg}</p>
          <div style={s.resultBar}><div style={{ ...s.resultFill, width: `${(score / TOTAL) * 100}%` }} /></div>
          <button style={s.startBtn} onClick={startGame}>Play Again 🔄</button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Nunito', sans-serif; }
        @keyframes shake { 0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)} }
        @keyframes pop { 0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        button:hover { filter: brightness(0.95); transform: scale(1.02); }
        button:active { transform: scale(0.98); }
        a:hover { opacity: 0.8; }
      `}</style>
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px", position: "relative", overflow: "hidden",
  },
  bg: {
    position: "absolute", inset: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  card: {
    background: "white", borderRadius: 28, padding: "28px 32px",
    width: "100%", maxWidth: 460,
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    animation: "fadeIn 0.4s ease", position: "relative", zIndex: 1,
  },
  brandBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "#faf5ff", borderRadius: 12, padding: "8px 14px",
    marginBottom: 20, border: "1.5px solid #ede9fe",
  },
  brandName: { fontSize: 13, fontWeight: 800, color: "#6d28d9" },
  brandInsta: { fontSize: 13, fontWeight: 800, color: "#7c3aed", textDecoration: "none" },
  titleEmoji: { fontSize: 52, textAlign: "center", marginBottom: 6 },
  title: { fontSize: 28, fontWeight: 900, textAlign: "center", color: "#1e293b", marginBottom: 4 },
  subtitle: { textAlign: "center", color: "#7c3aed", fontWeight: 700, fontSize: 14, marginBottom: 18 },
  topicGrid: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 14 },
  topicTag: { background: "#f1f5f9", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#475569" },
  info: { textAlign: "center", color: "#94a3b8", fontSize: 13, marginBottom: 24, fontWeight: 600 },
  startBtn: {
    width: "100%", padding: "15px", borderRadius: 16, border: "none",
    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    color: "white", fontSize: 17, fontWeight: 800, cursor: "pointer",
    boxShadow: "0 8px 20px rgba(109,40,217,0.35)", transition: "all 0.2s",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  categoryBadge: { padding: "5px 14px", borderRadius: 20, color: "white", fontSize: 12, fontWeight: 800 },
  scoreBox: { background: "#fef9c3", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 800, color: "#854d0e" },
  progressBar: { height: 8, background: "#f1f5f9", borderRadius: 8, overflow: "hidden", marginBottom: 5 },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #7c3aed, #a78bfa)", borderRadius: 8, transition: "width 0.4s ease" },
  progressText: { textAlign: "right", fontSize: 11, color: "#94a3b8", fontWeight: 700, marginBottom: 18 },
  questionBox: { background: "#faf5ff", borderRadius: 18, padding: "22px 18px", marginBottom: 18, border: "2px solid #ede9fe" },
  question: { fontSize: 21, fontWeight: 800, textAlign: "center", color: "#1e293b", lineHeight: 1.4 },
  options: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  optionBtn: {
    padding: "15px 10px", borderRadius: 14, border: "2px solid #e2e8f0",
    background: "#f8fafc", color: "#1e293b", fontSize: 15, fontWeight: 700,
    cursor: "pointer", transition: "all 0.15s", boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },
  resultTitle: { fontSize: 24, fontWeight: 900, textAlign: "center", color: "#1e293b", margin: "10px 0 18px" },
  scoreCircle: {
    width: 110, height: 110, borderRadius: "50%",
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 14px", boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
  },
  scoreNum: { fontSize: 40, fontWeight: 900, color: "white" },
  scoreTotal: { fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.75)", marginTop: 8 },
  resultMsg: { textAlign: "center", fontSize: 16, fontWeight: 700, color: "#64748b", marginBottom: 18 },
  resultBar: { height: 10, background: "#f1f5f9", borderRadius: 8, overflow: "hidden", marginBottom: 24 },
  resultFill: { height: "100%", background: "linear-gradient(90deg, #22c55e, #86efac)", borderRadius: 8, transition: "width 0.8s ease" },
};