const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
function showPage(name) {
  $$(".page").forEach(p => p.classList.toggle("active", p.dataset.page === name));
  $$(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.target === name));
  $(".sidebar").classList.remove("open");
  window.scrollTo(0, 0);
}
$$(".nav-item").forEach(n => n.addEventListener("click", e => { e.preventDefault(); showPage(n.dataset.target); }));
$("#menuToggle")?.addEventListener("click", () => $(".sidebar").classList.toggle("open"));
function bindTabs(root) {
  $$(".tabs", root).forEach(group => {
    const tabs = $$(".tab", group);
    const panels = $$(":scope ~ .tab-panel", group).length
      ? $$(":scope ~ .tab-panel", group)
      : $$(".tab-panel", group.parentElement);
    tabs.forEach(t => t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      t.classList.add("active");
      const panel = panels.find(p => p.dataset.panel === t.dataset.tab);
      if (panel) panel.classList.add("active");
    }));
  });
}
function renderHome() {
  const pending = ASSIGNMENTS.filter(a => a.status === "pending");
  const completed = ASSIGNMENTS.filter(a => a.status === "completed");
  const avg = Math.round(completed.reduce((s,a)=>s + (a.score/a.total)*100, 0) / completed.length);

  $("#homeHero").innerHTML = `
    <div>
      <h2>Welcome back, ${STUDENT.name.split(" ")[0]} 👋</h2>
      <p>${STUDENT.course} · ${STUDENT.stats.streakDays}-day streak</p>
    </div>
    <span class="badge">${STUDENT.stats.journeyPercent}% Journey complete</span>
  `;

  $("#homeStats").innerHTML = [
    { l: "Videos Watched", v: STUDENT.stats.videosWatched, d: "+12 this week" },
    { l: "Assignments", v: STUDENT.stats.assignmentsTaken, d: `${pending.length} pending` },
    { l: "Average Score", v: avg + "%", d: "Across all quizzes" },
    { l: "Streak", v: STUDENT.stats.streakDays + "d", d: "Keep it up!" },
  ].map(s => `<div class="stat"><div class="label">${s.l}</div><div class="value">${s.v}</div><div class="delta">${s.d}</div></div>`).join("");

$("#courseProgress").innerHTML = SUBJECTS.map(s => {
    const tier = s.progress >= 70 ? "high" : s.progress >= 40 ? "mid" : "low";
    return `
    <div class="progress-row ${tier}">
      <div class="row-top">
        <span>${s.emoji} ${s.name}</span><span class="pct">${s.progress}%</span>
      </div>
      <div class="progress"><span style="--fill:${s.progress}%"></span></div>
    </div>`;
  }).join("");

  requestAnimationFrame(() => requestAnimationFrame(() => {
    $$("#courseProgress .progress > span").forEach(el => el.classList.add("filled"));
  }));

  $("#recentVideos").innerHTML = RECENTLY_WATCHED.map(v => `
    <div class="list-item">
      <div class="thumb play">▶</div>
      <div class="meta"><div class="t">${v.title}</div><div class="s">${v.subject} · ${v.duration}</div></div>
      <span class="tag ${v.progress === 100 ? "green" : "blue"}">${v.progress === 100 ? "✓ Done" : v.progress + "%"}</span>
    </div>`).join("");

  $("#pendingTasks").innerHTML = pending.map(a => `
    <div class="list-item">
      <div class="thumb">${a.type === "Quiz" ? "❓" : "📝"}</div>
      <div class="meta"><div class="t">${a.title}</div><div class="s">${a.subject} · Due ${a.due}</div></div>
      <span class="tag amber">${a.type}</span>
    </div>`).join("");
}
let activeSubjectId = SUBJECTS[0].id;
function renderCourses() {
$("#subjectList").innerHTML = SUBJECTS.map(s => `
    <button class="subject-btn ${s.id === activeSubjectId ? "active" : ""}" data-id="${s.id}">
      <span class="em">${s.emoji}</span>
      <div class="info">
        <div class="n">${s.name}</div>
        <div class="pct">${s.progress}% complete</div>
        <div class="progress" style="margin-top:6px"><span style="width:${s.progress}%"></span></div>
      </div>
    </button>`).join("");
  $$("#subjectList .subject-btn").forEach(b => b.addEventListener("click", () => {
    activeSubjectId = b.dataset.id; renderCourses();
  }));
}

  const sub = SUBJECTS.find(s => s.id === activeSubjectId);
  const watchedCount = sub.topics.flatMap(t => t.videos).filter(v => v.watched).length;
  const totalVideos = sub.topics.flatMap(t => t.videos).length;

  $("#subjectDetail").innerHTML = `
    <div class="card" style="margin-bottom:16px">
      <div class="subject-hero">
        <span class="em-big">${sub.emoji}</span>
        <div style="flex:1">
          <h3>${sub.name}</h3>
          <div class="sub-meta">${sub.topics.length} topics · ${watchedCount}/${totalVideos} videos watched</div>
          <div class="subject-progress" style="margin-top:10px">
            <div class="progress"><span style="--fill:${sub.progress}%;width:0" class="filled"></span></div>
          </div>
        </div>
        <span class="tag green">${sub.progress}% done</span>
      </div>
    </div>
    <div class="tabs">
      ${sub.topics.map((t,i) => `<div class="tab ${i===0?"active":""}" data-tab="${t.id}">${t.title}</div>`).join("")}
    </div>
    ${sub.topics.map((t,i) => `
      <div class="tab-panel ${i===0?"active":""}" data-panel="${t.id}">
        <div class="card" style="margin-bottom:14px">
          <h3>▶ Videos <span style="color:var(--muted);font-size:13px;font-weight:400">(${t.videos.filter(v=>v.watched).length}/${t.videos.length} watched)</span></h3>
          <div class="list">
          ${t.videos.map(v => `
            <div class="list-item ${v.watched ? "watched" : ""}">
              <div class="thumb ${v.watched ? "" : "play"}">${v.watched ? "✓" : "▶"}</div>
              <div class="meta"><div class="t">${v.title}</div><div class="s">${v.duration}</div></div>
              <span class="tag ${v.watched ? "green" : "blue"}">${v.watched ? "✓ Done" : "Watch"}</span>
            </div>`).join("")}
          </div>
        </div>
        <div class="card"><h3>📄 Notes</h3><p style="color:var(--muted);margin:0">${t.notes}</p></div>
      </div>`).join("")}
  `;
  bindTabs($("#subjectDetail"));

function renderJourney() {
  $("#journeyRoadmap").innerHTML = `
    <div class="roadmap">
      <div class="milestone done" data-step="1">
        <div class="t">Foundations</div>
        <div class="s">Year 1 — Completed</div>
      </div>
      <div class="milestone active-step" data-step="2">
        <div class="t">Core CS Concepts</div>
        <div class="s">Year 2 Sem 1 — Currently in progress</div>
      </div>
      <div class="milestone" data-step="3">
        <div class="t">Specialization</div>
        <div class="s">Year 2 Sem 2 — Up next</div>
      </div>
      <div class="milestone upcoming" data-step="4">
        <div class="t">Advanced & Electives</div>
        <div class="s">Year 3 — Upcoming</div>
      </div>
      <div class="milestone upcoming" data-step="5">
        <div class="t">Capstone Project</div>
        <div class="s">Year 4 — Future</div>
      </div>
    </div>`;

  $("#journeyCompleted").innerHTML = JOURNEY.completed.map(c => `
    <div class="list-item">
      <div class="thumb">✓</div>
      <div class="meta"><div class="t">${c.name}</div><div class="s">${c.year}</div></div>
      <span class="tag green">Grade ${c.grade}</span>
    </div>`).join("");

  $("#journeyCurrent").innerHTML = JOURNEY.current.map(c => `
    <div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px">
        <span>${c.name}</span><span style="color:var(--muted)">${c.progress}%</span>
      </div>
      <div class="progress"><span style="width:${c.progress}%"></span></div>
    </div>`).join("");

  $("#journeyUpcoming").innerHTML = JOURNEY.upcoming.map(c => `
    <div class="list-item">
      <div class="thumb">→</div>
      <div class="meta"><div class="t">${c.name}</div><div class="s">${c.semester}</div></div>
      <span class="tag blue">Upcoming</span>
    </div>`).join("");

  $("#journeyDoubts").innerHTML = DOUBTS.map(d => `
    <div class="note">
      <div class="t">${d.q}</div>
      <div class="b">${d.subject} · ${d.answered ? "Answered" : "Awaiting reply"}</div>
      <div class="d">${d.date}</div>
    </div>`).join("");

  $("#journeyPending").innerHTML = ASSIGNMENTS.filter(a => a.status === "pending").map(a => `
    <div class="list-item">
      <div class="thumb">${a.type === "Quiz" ? "❓" : "📝"}</div>
      <div class="meta"><div class="t">${a.title}</div><div class="s">${a.subject} · Due ${a.due}</div></div>
      <span class="tag amber">${a.type}</span>
    </div>`).join("");
}
function renderAssignments() {
  const pending = ASSIGNMENTS.filter(a => a.status === "pending");
  const completed = ASSIGNMENTS.filter(a => a.status === "completed");

const today = new Date();

  $("#assignPending").innerHTML = pending.length ? pending.map(a => {
    const due = new Date(a.due);
    const daysLeft = Math.ceil((due - today) / (1000*60*60*24));
    const urgent = daysLeft <= 3;
    return `<div class="list-item">
      <div class="thumb">${a.type === "Quiz" ? "❓" : "📝"}</div>
      <div class="meta">
        <div class="t">${a.title}</div>
        <div class="s">${a.subject} · <span class="${urgent ? "due-soon" : ""}">Due ${a.due}${urgent ? " ⚠️" : ""}</span> · ${a.total} pts</div>
      </div>
      <button class="btn">Start</button>
    </div>`;
  }).join("") : `<div class="assign-empty">🎉 No pending assignments!</div>`;

  $("#assignCompleted").innerHTML = completed.map(a => {
    const pct = Math.round(a.score/a.total*100);
    const color = pct >= 85 ? "var(--success)" : pct >= 70 ? "var(--accent-dark)" : "var(--warning)";
    const r = 23, circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;
    return `<div class="list-item">
      <div class="score-ring">
        <svg viewBox="0 0 54 54">
          <circle class="ring-bg" cx="27" cy="27" r="${r}"/>
          <circle class="ring-fill" cx="27" cy="27" r="${r}"
            stroke="${color}"
            stroke-dasharray="${circ}"
            stroke-dashoffset="${offset}"/>
        </svg>
        <div class="ring-label">${pct}%</div>
      </div>
      <div class="meta">
        <div class="t">${a.title}</div>
        <div class="s">${a.subject} · ${a.score}/${a.total} pts · ${a.due}</div>
      </div>
      <span class="tag ${pct>=85?"green":pct>=70?"blue":"amber"}">${a.type}</span>
    </div>`;
  }).join("");
  const bySubject = {};
  completed.forEach(a => {
    if (!bySubject[a.subject]) bySubject[a.subject] = { total: 0, score: 0, count: 0 };
    bySubject[a.subject].total += a.total;
    bySubject[a.subject].score += a.score;
    bySubject[a.subject].count++;
  });
  $("#assignAnalysis").innerHTML = Object.entries(bySubject).map(([sub, d]) => {
    const pct = Math.round(d.score/d.total*100);
    return `<div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px">
        <span>${sub} · ${d.count} tasks</span><span style="color:var(--muted)">${pct}%</span>
      </div>
      <div class="progress"><span style="width:${pct}%"></span></div>
    </div>`;
  }).join("");
}
function renderProfile() {
  $("#profileHeader").innerHTML = `
    <div class="avatar big">${STUDENT.initials}</div>
    <div style="flex:1">
      <h2>${STUDENT.name}</h2>
      <p>${STUDENT.course} · Joined ${STUDENT.joined}</p>
    </div>
    <span class="tag green">${STUDENT.stats.journeyPercent}% Journey</span>
  `;

  $("#profileInfo").innerHTML = `
    <div class="field"><span class="k">Full Name</span><span class="v">${STUDENT.name}</span></div>
    <div class="field"><span class="k">Age</span><span class="v">${STUDENT.age}</span></div>
    <div class="field"><span class="k">Email</span><span class="v">${STUDENT.email}</span></div>
    <div class="field"><span class="k">Address</span><span class="v">${STUDENT.address}</span></div>
    <div class="field"><span class="k">Course</span><span class="v">${STUDENT.course}</span></div>
    <div class="field"><span class="k">Language</span><span class="v">${STUDENT.language}</span></div>
  `;

  $("#profileStats").innerHTML = [
    { l: "Videos Watched", v: STUDENT.stats.videosWatched },
    { l: "Assignments Taken", v: STUDENT.stats.assignmentsTaken },
    { l: "Average Score", v: STUDENT.stats.averageScore + "%" },
    { l: "Journey Done", v: STUDENT.stats.journeyPercent + "%" },
  ].map(s => `<div class="stat"><div class="label">${s.l}</div><div class="value">${s.v}</div></div>`).join("");

  $("#profileNotes").innerHTML = NOTES.map(n => `
    <div class="note"><div class="t">${n.t}</div><div class="b">${n.b}</div><div class="d">${n.d}</div></div>
  `).join("");

  $("#profileDoubts").innerHTML = DOUBTS.map(d => `
    <div class="note"><div class="t">${d.q}</div><div class="b">${d.subject} · ${d.answered?"Answered":"Open"}</div><div class="d">${d.date}</div></div>
  `).join("");
}
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
  $(".topbar").classList.toggle("scrolled", window.scrollY > 4);
  });
  renderHome();
  renderCourses();
  renderJourney();
  renderAssignments();
  renderProfile();
  bindTabs(document);
  showPage("home");
});
