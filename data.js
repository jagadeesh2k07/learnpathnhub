// Mock data for LearnKit
const STUDENT = {
  name: "Jagadeesh K",
  age: 19,
  email: "jagadeesh2k07@gmail.com",
  address: "SKML Nagar-53009, Andhra Pradesh",
  language: "English",
  course: "B.Tech Computer Science — Year 2",
  initials: "KJ",
  joined: "Dec 2024",
  stats: {
    videosWatched: 160,
    assignmentsTaken: 48,
    averageScore: 81,
    streakDays: 19,
    journeyPercent: 50,
  },
};

const SUBJECTS = [
  {
    id: "dsa", name: "Data Structures & Algorithms", emoji: "🧩", progress: 72,
    topics: [
      { id: "arrays", title: "Arrays & Strings",
        notes: "Arrays store elements in contiguous memory. Key ops: traversal, insertion, deletion, two-pointer technique.",
        videos: [
          { title: "Intro to Arrays", duration: "12:30", watched: true },
          { title: "Two Pointer Technique", duration: "18:05", watched: true },
          { title: "Sliding Window", duration: "22:14", watched: false },
        ]},
      { id: "trees", title: "Trees & Graphs",
        notes: "Trees are hierarchical structures. BFS uses a queue, DFS uses a stack/recursion.",
        videos: [
          { title: "Binary Trees Basics", duration: "16:40", watched: true },
          { title: "BFS vs DFS", duration: "20:11", watched: false },
        ]},
    ],
  },
  {
    id: "os", name: "Operating Systems", emoji: "💻", progress: 45,
    topics: [
      { id: "process", title: "Processes & Threads",
        notes: "A process is an instance of a program; threads share the process's address space.",
        videos: [
          { title: "Process Lifecycle", duration: "14:22", watched: true },
          { title: "Thread Scheduling", duration: "19:50", watched: false },
        ]},
      { id: "memory", title: "Memory Management",
        notes: "Paging divides memory into fixed-size blocks. Virtual memory enables larger logical address space.",
        videos: [{ title: "Paging Explained", duration: "21:08", watched: false }]},
    ],
  },
  {
    id: "dbms", name: "Database Systems", emoji: "🗄️", progress: 58,
    topics: [
      { id: "sql", title: "SQL Fundamentals",
        notes: "SELECT, JOIN, GROUP BY, and subqueries are the core building blocks.",
        videos: [
          { title: "Joins Deep Dive", duration: "24:00", watched: true },
          { title: "Indexes & Performance", duration: "17:45", watched: false },
        ]},
    ],
  },
  {
    id: "math", name: "Discrete Mathematics", emoji: "📐", progress: 30,
    topics: [
      { id: "logic", title: "Propositional Logic",
        notes: "Truth tables, implications, and equivalences form the basis of logical reasoning.",
        videos: [{ title: "Truth Tables", duration: "11:20", watched: false }]},
    ],
  },
];

const RECENTLY_WATCHED = [
  { title: "Two Pointer Technique", subject: "DSA", duration: "18:05", progress: 100 },
  { title: "Joins Deep Dive", subject: "DBMS", duration: "24:00", progress: 100 },
  { title: "Process Lifecycle", subject: "OS", duration: "14:22", progress: 78 },
  { title: "Binary Trees Basics", subject: "DSA", duration: "16:40", progress: 100 },
];

const ASSIGNMENTS = [
  { title: "Array Problem Set 3", subject: "DSA", type: "Assignment", due: "May 5, 2026", status: "pending", total: 50 },
  { title: "OS Scheduling Quiz", subject: "OS", type: "Quiz", due: "May 4, 2026", status: "pending", total: 20 },
  { title: "SQL Joins Practice", subject: "DBMS", type: "Assignment", due: "May 8, 2026", status: "pending", total: 40 },
  { title: "Logic Quiz 1", subject: "Math", type: "Quiz", due: "Apr 28, 2026", status: "completed", score: 17, total: 20 },
  { title: "Trees Assignment", subject: "DSA", type: "Assignment", due: "Apr 25, 2026", status: "completed", score: 44, total: 50 },
  { title: "DBMS Mid Quiz", subject: "DBMS", type: "Quiz", due: "Apr 20, 2026", status: "completed", score: 18, total: 20 },
  { title: "Memory Mgmt Assignment", subject: "OS", type: "Assignment", due: "Apr 18, 2026", status: "completed", score: 38, total: 50 },
];

const JOURNEY = {
  completed: [
    { name: "Programming Foundations", year: "Year 1 · Sem 1", grade: "A" },
    { name: "Mathematics I", year: "Year 1 · Sem 1", grade: "A-" },
    { name: "Digital Logic Design", year: "Year 1 · Sem 2", grade: "B+" },
    { name: "Object Oriented Programming", year: "Year 1 · Sem 2", grade: "A" },
  ],
  current: [
    { name: "Data Structures & Algorithms", progress: 72 },
    { name: "Operating Systems", progress: 45 },
    { name: "Database Systems", progress: 58 },
    { name: "Discrete Mathematics", progress: 30 },
  ],
  upcoming: [
    { name: "Computer Networks", semester: "Year 3 · Sem 1" },
    { name: "Software Engineering", semester: "Year 3 · Sem 1" },
    { name: "Machine Learning Intro", semester: "Year 3 · Sem 2" },
  ],
};

const DOUBTS = [
  { q: "Why is quicksort average O(n log n) but worst O(n²)?", subject: "DSA", answered: true, date: "Apr 29" },
  { q: "Difference between paging and segmentation?", subject: "OS", answered: false, date: "May 1" },
  { q: "When should I use a LEFT JOIN vs INNER JOIN?", subject: "DBMS", answered: true, date: "Apr 27" },
];

const NOTES = [
  { t: "Two-pointer cheatsheet", b: "Use when array is sorted or finding pairs/triplets.", d: "Apr 30" },
  { t: "SQL window functions", b: "ROW_NUMBER, RANK, DENSE_RANK — partition by groups.", d: "Apr 28" },
  { t: "Process states", b: "New → Ready → Running → Waiting → Terminated.", d: "Apr 25" },
];
