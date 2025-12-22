// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login"; // ✅ Login page


// ✅ Quiz Questions
const quizData = {
  python: [
    { question: "What is Python?", options: ["A snake", "A language", "Both", "None"], answer: 1 },
    { question: "Which keyword is used for function in Python?", options: ["func", "def", "function", "lambda"], answer: 1 },
  ],
  sql: [
    { question: "SQL stands for?", options: ["Structured Query Language", "Simple Query Language", "None", "Both"], answer: 0 },
    { question: "Which command is used to fetch data?", options: ["SELECT", "GET", "FETCH", "EXTRACT"], answer: 0 },
  ],
  javascript: [
    { question: "JS is used for?", options: ["Backend", "Frontend", "Both", "None"], answer: 2 },
    { question: "Which keyword declares a variable?", options: ["var", "let", "const", "All"], answer: 3 },
  ],
  java: [
    { question: "Java is?", options: ["Platform dependent", "Platform independent", "Only web", "None"], answer: 1 },
    { question: "Java is used for?", options: ["Backend", "Frontend", "Both", "None"], answer: 2 },
  ],
  mongodb: [
    { question: "MongoDB is a?", options: ["SQL DB", "NoSQL DB", "Both", "None"], answer: 1 },
    { question: "Command to insert data?", options: ["insertOne()", "insertData()", "add()", "save()"], answer: 0 },
  ],
  ds: [
    { question: "What is a stack?", options: ["FIFO", "LIFO", "Both", "None"], answer: 1 },
    { question: "Queue follows?", options: ["FIFO", "LIFO", "Both", "None"], answer: 0 },
  ],
};

// ✅ Skill Goals
const skillGoals = {
  python: "Python Developer / Data Science",
  sql: "Database Developer / SQL Expert",
  javascript: "Frontend / Full Stack Developer",
  java: "Java Developer",
  mongodb: "Database Developer / NoSQL Specialist",
  ds: "Algorithm / Problem Solving Expert",
};

// ✅ Learning paths with 5 example resources
const learningPaths = {
  python: {
    Beginner: {
      steps: ["Learn Syntax", "Practice Loops", "Functions", "File Handling", "Basic Projects"],
      resources: [
        "W3Schools Python",
        "Programiz",
        "FreeCodeCamp Python",
        "Python.org Docs",
        "YouTube - Tech With Tim",
      ],
    },
    Intermediate: {
      steps: ["OOP", "Modules", "Error Handling", "File I/O", "Intermediate Projects"],
      resources: [
        "Real Python",
        "GeeksforGeeks Python",
        "TutorialsPoint Python",
        "Hackerrank Python",
        "Python Crash Course Book",
      ],
    },
    Expert: {
      steps: ["Flask/Django", "Automation", "Data Science", "AI/ML", "APIs"],
      resources: [
        "Coursera Python",
        "Kaggle",
        "Udemy Advanced Python",
        "YouTube - Corey Schafer",
        "RealWorld Projects GitHub",
      ],
    },
  },

  java: {
    Beginner: {
      steps: ["Basics", "OOP", "Loops", "Conditionals", "Mini Projects"],
      resources: [
        "W3Schools Java",
        "JavaTPoint",
        "CodeWithHarry Java",
        "Oracle Docs",
        "Simplilearn Java",
      ],
    },
    Intermediate: {
      steps: ["Collections", "File I/O", "Multithreading", "JDBC", "Spring Basics"],
      resources: [
        "GeeksforGeeks Java",
        "TutorialsPoint",
        "Java Brains",
        "Baeldung",
        "Coursera Java",
      ],
    },
    Expert: {
      steps: ["Spring Boot", "Hibernate", "REST APIs", "Full Projects", "Deployment"],
      resources: [
        "Udemy Java Masterclass",
        "Baeldung Advanced",
        "YouTube Telusko",
        "CodeWithMosh",
        "Oracle Docs",
      ],
    },
  },

  sql: {
    Beginner: {
      steps: ["SELECT Basics", "Filtering", "Sorting", "LIMIT", "Basic Queries"],
      resources: [
        "W3Schools SQL",
        "SQLZoo",
        "Mode SQL Tutorial",
        "Khan Academy SQL",
        "FreeCodeCamp SQL",
      ],
    },
    Intermediate: {
      steps: ["Joins", "Subqueries", "GROUP BY", "Aggregate Functions", "Set Operations"],
      resources: [
        "Mode Analytics",
        "LeetCode SQL",
        "GeeksforGeeks SQL",
        "Coursera SQL",
        "DataCamp SQL",
      ],
    },
    Expert: {
      steps: ["Optimization", "Stored Procedures", "Triggers", "Functions", "Transactions"],
      resources: [
        "DataCamp Advanced SQL",
        "Hackerrank SQL",
        "W3Resource SQL",
        "TutorialsPoint SQL",
        "Udemy SQL Mastery",
      ],
    },
  },

  javascript: {
    Beginner: {
      steps: ["Basics", "DOM Manipulation", "Events", "Loops", "Simple Apps"],
      resources: [
        "W3Schools JS",
        "FreeCodeCamp",
        "MDN Docs",
        "Programiz JS",
        "Scrimba JS",
      ],
    },
    Intermediate: {
      steps: ["ES6+", "Promises", "APIs", "Modules", "Intermediate Projects"],
      resources: [
        "JavaScript.info",
        "GeeksforGeeks JS",
        "Codecademy JS",
        "Udemy JS Bootcamp",
        "YouTube - Traversy Media",
      ],
    },
    Expert: {
      steps: ["React", "Node.js", "Express", "Full Stack Projects", "Deployment"],
      resources: [
        "React Docs",
        "Node Docs",
        "Next.js Docs",
        "FreeCodeCamp Full Stack",
        "YouTube - Fireship",
      ],
    },
  },

  mongodb: {
    Beginner: {
      steps: ["Basics", "CRUD", "Collections", "Documents", "Querying"],
      resources: [
        "MongoDB Docs",
        "FreeCodeCamp MongoDB",
        "Codecademy MongoDB",
        "YouTube - Net Ninja",
        "Simplilearn MongoDB",
      ],
    },
    Intermediate: {
      steps: ["Indexing", "Aggregation", "Relationships", "Advanced Queries", "Shell Commands"],
      resources: [
        "MongoDB University",
        "GeeksforGeeks MongoDB",
        "Coursera MongoDB",
        "Udemy MongoDB Bootcamp",
        "DataCamp MongoDB",
      ],
    },
    Expert: {
      steps: ["Performance Tuning", "Replication", "Sharding", "Atlas Cloud", "Security"],
      resources: [
        "Udemy Advanced MongoDB",
        "MongoDB Atlas Docs",
        "Official MongoDB Blog",
        "Dev.to Mongo Guides",
        "YouTube - MongoDB Official",
      ],
    },
  },

  ds: {
    Beginner: {
      steps: ["Arrays", "Stacks", "Queues", "Linked Lists", "Searching"],
      resources: [
        "Programiz DSA",
        "W3Schools DSA",
        "Simplilearn",
        "YouTube - Jenny’s Lectures",
        "GeeksforGeeks DSA",
      ],
    },
    Intermediate: {
      steps: ["Trees", "Heaps", "Recursion", "Sorting", "Graphs"],
      resources: [
        "Coursera DSA",
        "Khan Academy",
        "Scaler Topics",
        "NeetCode",
        "GeeksforGeeks",
      ],
    },
    Expert: {
      steps: ["Dynamic Programming", "Graph Algorithms", "Complexity Analysis", "Optimization", "Real Projects"],
      resources: [
        "LeetCode",
        "HackerRank",
        "InterviewBit",
        "Codeforces",
        "CodeChef",
      ],
    },
  },
};

function App() {
  const [skills, setSkills] = useState({
    python: 0,
    sql: 0,
    ds: 0,
    javascript: 0,
    java: 0,
    mongodb: 0,
  });

  const [goal, setGoal] = useState("Set your goal");
  const [path, setPath] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userId, setUserId] = useState(null);

  // Quiz states
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizTopic, setQuizTopic] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/getPath/${userId}`)
        .then((res) => {
          if (res.data) {
            setSkills(res.data.skills || skills);
            setGoal(res.data.goal || goal);
            setPath(res.data.path || []);
          }
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [userId]);

  const getLevel = (score) => {
    if (score <= 1) return "Beginner";
    if (score === 2) return "Intermediate";
    return "Expert";
  };

  const startQuiz = (topic) => {
    setQuizTopic(topic);
    setCurrentQuestion(0);
    setScore(0);
    setShowQuiz(true);
  };

  const submitAnswer = (optionIndex) => {
    const isCorrect = quizData[quizTopic][currentQuestion].answer === optionIndex;
    const updatedScore = isCorrect ? score + 1 : score;

    // ✅ update score immediately before next question
    setScore(updatedScore);

    if (currentQuestion + 1 < quizData[quizTopic].length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz(updatedScore);
    }
  };

  const finishQuiz = async (finalScore) => {
    const updatedSkills = { ...skills, [quizTopic]: finalScore };
    setSkills(updatedSkills);

    const bestSkill = Object.keys(updatedSkills).reduce((a, b) =>
      updatedSkills[a] > updatedSkills[b] ? a : b
    );

    const level = getLevel(updatedSkills[bestSkill]);
    const newGoal = skillGoals[bestSkill];
    setGoal(newGoal);

    const selectedPath = learningPaths[bestSkill][level];
    const formattedPath = selectedPath.steps.map((step) => ({
      text: step,
      completed: false,
    }));

    setPath(formattedPath);
    setShowQuiz(false);

    // ✅ Save updated data to DB
    if (userId) {
      try {
        await axios.post(`http://localhost:5000/api/updateUser`, {
          userId,
          skills: updatedSkills,
          goal: newGoal,
          path: formattedPath,
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const toggleComplete = (index) => {
    const updated = [...path];
    updated[index].completed = !updated[index].completed;
    setPath(updated);
    const completed = updated.filter((i) => i.completed).length;
    setProgress(Math.round((completed / updated.length) * 100));
  };

  if (showWelcome) {
    return (
      <Login
        setUserId={setUserId}
        setSkills={setSkills}
        setGoal={setGoal}
        setPath={setPath}
        setShowWelcome={setShowWelcome}
      />
    );
  }

  return (
    <div>
      <header className="hero bg-primary text-white text-center py-4">
        <h1>Personalized Learning Path Generator</h1>
        <p>Generate a roadmap based on your skills & goals</p>
      </header>

      <main className="py-5 container">
        <div className="row g-4">
          {/* LEFT SECTION */}
          <div className="col-lg-7">
            <div className="card p-4 mb-4 shadow-sm">
              <h4>Skill Assessment</h4>
              {Object.keys(skills).map((key) => (
                <div key={key} className="row align-items-center mb-3">
                  <div className="col-4 text-capitalize">{key}</div>
                  <div className="col-6">
                    <input type="range" min="0" max="5" value={skills[key]} readOnly className="form-range" />
                  </div>
                  <div className="col-2 text-end">
                    <div className="border rounded-circle d-inline-flex justify-content-center align-items-center" style={{ width: 44, height: 44 }}>
                      {skills[key]}
                    </div>
                  </div>
                </div>
              ))}
              <hr />
              <h5>Current Learning Goal: <b>{goal}</b></h5>
            </div>

            {/* QUIZ SECTION */}
            <div className="card p-4 mb-4 shadow-sm">
              <h5>Take a Quiz</h5>
              {Object.keys(quizData).map((topic) => (
                <button key={topic} className="btn btn-secondary me-2 mb-2" onClick={() => startQuiz(topic)}>
                  {topic.toUpperCase()} Quiz
                </button>
              ))}
            </div>

            {showQuiz && quizTopic && (
              <div className="card p-4 shadow-sm">
                <h4>{quizTopic.toUpperCase()} Quiz</h4>
                <p>
                  Question {currentQuestion + 1}: {quizData[quizTopic][currentQuestion].question}
                </p>
                <div className="d-flex flex-column gap-2">
                  {quizData[quizTopic][currentQuestion].options.map((opt, i) => (
                    <button key={i} className="btn btn-outline-primary" onClick={() => submitAnswer(i)}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="col-lg-5">
            <div className="card p-4 shadow-sm">
              <h5>Learning Path</h5>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>Progress</div>
                <div style={{ width: 160 }}>
                  <div className="progress" style={{ height: 10 }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: progress + "%" }}>
                      {progress}%
                    </div>
                  </div>
                </div>
              </div>

              <ul className="list-group list-group-flush">
                {path.map((item, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className={item.completed ? "text-decoration-line-through text-muted" : ""}>
                      {i + 1}. {item.text}
                    </div>
                    <button className="btn btn-sm btn-outline-success" onClick={() => toggleComplete(i)}>
                      {item.completed ? "Undo" : "Mark"}
                    </button>
                  </li>
                ))}
              </ul>

              {path.length > 0 && (
                <>
                  <hr />
                  <h6>📚 Recommended Resources:</h6>
                  <ul>
                    {Object.values(learningPaths)
                      .flatMap((topic) => Object.values(topic))
                      .flatMap((lvl) => lvl.resources.slice(0, 5))
                      .slice(0, 5)
                      .map((res, i) => (
                        <li key={i}>{res}</li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-3 text-center text-muted">
        © {new Date().getFullYear()} Personalized Learning
      </footer>
    </div>
  );
}

export default App;