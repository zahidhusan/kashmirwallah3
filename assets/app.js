
function getQueryParams() {
  const params = {};
  const qs = window.location.search.slice(1).split("&").filter(Boolean);
  for (const part of qs) {
    const [k,v] = part.split("=");
    params[decodeURIComponent(k)] = decodeURIComponent(v || "");
  }
  return params;
}

function applyTheme(theme) {
  const body = document.body;
  body.classList.remove("theme-dark","theme-kashmir","theme-light");
  if (theme === "dark") body.classList.add("theme-dark");
  else if (theme === "kashmir") body.classList.add("theme-kashmir");
  else body.classList.add("theme-light");
}

function initThemeSwitcher() {
  const select = document.querySelector("#theme-select");
  const stored = localStorage.getItem("kwallah-theme") || "kashmir";
  applyTheme(stored);
  if (select) {
    select.value = stored;
    select.addEventListener("change", () => {
      const val = select.value;
      localStorage.setItem("kwallah-theme", val);
      applyTheme(val);
    });
  }
}

const EXAM = {
  id: "jkssb_fa",
  name: "JKSSB Finance Accounts Assistant",
  label: "120 Marks · OMR · 2 Hours",
  meta: "Finance Department · JKSSB",
  marksBreakdown: [
    { id: "gk_jk",      section: "General Knowledge (with special reference to J&K UT)", marks: 30 },
    { id: "accountancy",section: "Accountancy & Book Keeping", marks: 30 },
    { id: "english",    section: "General English", marks: 10 },
    { id: "statistics", section: "Statistics", marks: 10 },
    { id: "mathematics",section: "Mathematics", marks: 10 },
    { id: "economics",  section: "General Economics", marks: 10 },
    { id: "science",    section: "General Science", marks: 10 },
    { id: "computer",   section: "Knowledge of Computers", marks: 10 }
  ]
};

const SUBJECT_META = {
  "gk_jk": {
    name: "General Knowledge (J&K + India/World)",
    badge: "30 Marks",
    meta: "J&K history, geography, polity, economy, current affairs",
  },
  "accountancy": {
    name: "Accountancy & Book Keeping",
    badge: "30 Marks",
    meta: "Journal, ledger, final accounts, BRS, depreciation, etc.",
  },
  "english": {
    name: "General English",
    badge: "10 Marks",
    meta: "Grammar, vocabulary, comprehension"
  },
  "mathematics": {
    name: "Mathematics",
    badge: "10 Marks",
    meta: "Arithmetic for competitive exams"
  },
  "statistics": {
    name: "Statistics",
    badge: "10 Marks",
    meta: "Data, averages, index numbers, probability"
  },
  "economics": {
    name: "General Economics",
    badge: "10 Marks",
    meta: "Micro, macro, Indian economy basics"
  },
  "science": {
    name: "General Science",
    badge: "10 Marks",
    meta: "Physics, Chemistry, Biology basics"
  },
  "computer": {
    name: "Knowledge of Computers",
    badge: "10 Marks",
    meta: "Basics of IT, OS, MS Office, internet"
  }
};

const SUBJECT_TOPICS = {
  "accountancy": [["basic_terms", "Basic Accounting Terms"], ["accounting_equation", "Accounting Equation"], ["principles_concepts", "Accounting Principles & Concepts"], ["double_entry", "Double Entry System"], ["journal", "Journal"], ["ledger", "Ledger"], ["cash_book", "Cash Book"], ["subsidiary_books", "Subsidiary Books"], ["trial_balance", "Trial Balance"], ["errors_rectification", "Errors & Rectification of Errors"], ["brs", "Bank Reconciliation Statement (BRS)"], ["depreciation", "Depreciation (SLM & WDV)"], ["trading_account", "Trading Account"], ["profit_loss", "Profit & Loss Account"], ["balance_sheet", "Balance Sheet"], ["adjustments", "Adjustments in Final Accounts"], ["bills_exchange", "Bills of Exchange & Promissory Note"], ["capital_revenue", "Capital & Revenue"], ["provisions_reserves", "Provisions, Reserves & Bad Debts"]],
  "gk_jk": [["jk_history", "History of J&K"], ["jk_geography", "Geography of J&K"], ["jk_economy", "Economy of J&K"], ["jk_polity", "Polity & Administration of J&K"], ["jk_culture", "Art, Culture & Literature of J&K"], ["jk_tourism", "Tourism & Important Places in J&K"], ["india_gk", "Indian History & National Movement"], ["india_geography", "India & World Geography"], ["india_polity", "Indian Polity"], ["india_economy", "Indian Economy & Schemes"], ["current_affairs_india", "Current Affairs \u2013 India & World"], ["current_affairs_jk", "Current Affairs \u2013 J&K UT"]],
  "english": [["tenses", "Tenses & Verb Forms"], ["articles_prepositions", "Articles & Prepositions"], ["voice_narration", "Active-Passive & Direct-Indirect Speech"], ["subject_verb", "Subject-Verb Agreement"], ["vocabulary", "Synonyms & Antonyms"], ["idioms_phrases", "Idioms & Phrases"], ["one_word", "One Word Substitution"], ["spellings", "Commonly Confused Spellings"], ["comprehension", "Reading Comprehension"], ["error_spotting", "Error Spotting & Sentence Improvement"]],
  "mathematics": [["number_system", "Number System"], ["simplification", "Simplification & BODMAS"], ["percentage", "Percentage"], ["ratio_proportion", "Ratio & Proportion"], ["profit_loss", "Profit, Loss & Discount"], ["simple_interest", "Simple Interest"], ["compound_interest", "Compound Interest"], ["time_work", "Time & Work"], ["time_distance", "Time, Speed & Distance"], ["mensuration", "Mensuration \u2013 2D & 3D Basics"]],
  "statistics": [["data_collection", "Collection & Classification of Data"], ["tabulation", "Tabulation & Presentation of Data"], ["central_tendency", "Measures of Central Tendency"], ["dispersion", "Measures of Dispersion"], ["correlation", "Correlation & Regression \u2013 Basics"], ["index_numbers", "Index Numbers"], ["probability", "Probability \u2013 Basic Concepts"], ["sampling", "Sampling Techniques \u2013 Basics"]],
  "economics": [["basic_concepts", "Basic Concepts of Economics"], ["demand_supply", "Demand & Supply"], ["national_income", "National Income Concepts"], ["money_banking", "Money & Banking"], ["inflation", "Inflation & Deflation"], ["public_finance", "Public Finance & Budget"], ["indian_economy", "Structure of Indian Economy"], ["economic_planning", "Economic Planning in India"], ["poverty_unemployment", "Poverty & Unemployment"], ["international_trade", "International Trade & Institutions"]],
  "science": [["physics_basics", "Physics \u2013 Motion, Force & Energy"], ["heat_light", "Heat & Light"], ["electricity", "Electricity & Magnetism Basics"], ["chemistry_matter", "Matter & Its Structure"], ["acids_bases_salts", "Acids, Bases & Salts"], ["metals_nonmetals", "Metals & Non-Metals"], ["biology_life", "Life Processes & Cells"], ["human_body", "Human Body & Diseases"], ["plants", "Plants & Photosynthesis"], ["environment", "Environment, Pollution & Conservation"]],
  "computer": [["computer_fundamentals", "Computer Fundamentals & Generations"], ["hardware_software", "Hardware & Software"], ["os_basics", "Operating Systems Basics"], ["ms_word", "MS Word & Document Handling"], ["ms_excel", "MS Excel & Data Handling"], ["ms_powerpoint", "MS PowerPoint Basics"], ["internet_email", "Internet, Email & Web Concepts"], ["networking", "Networking Basics"], ["cyber_security", "Cyber Security & Safe Practices"], ["it_egovernance", "IT & e-Governance Applications"]]
};

function initHomePage() {
  const cardBody = document.querySelector("#marks-tbody");
  const examTileContainer = document.querySelector("#exam-grid");
  if (cardBody) {
    cardBody.innerHTML = "";
    EXAM.marksBreakdown.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${row.section}</td><td>${row.marks}</td>`;
      cardBody.appendChild(tr);
    });
    const trTotal = document.createElement("tr");
    const total = EXAM.marksBreakdown.reduce((sum, r) => sum + (r.marks || 0), 0);
    trTotal.innerHTML = `<td><strong>Total</strong></td><td><strong>${total}</strong></td>`;
    cardBody.appendChild(trTotal);
  }
  if (examTileContainer) {
    const a = document.createElement("a");
    a.className = "tile";
    a.href = "subjects.html?exam=" + encodeURIComponent(EXAM.id);
    a.innerHTML = `
      <div class="badge">${EXAM.label}</div>
      <div class="tile-title">${EXAM.name}</div>
      <div class="tile-meta">${EXAM.meta}</div>
      <div class="tile-meta">Start from syllabus → topics → MCQ bank</div>
    `;
    examTileContainer.appendChild(a);
  }
}

function initSubjectsPage() {
  const grid = document.querySelector("#subject-grid");
  const titleEl = document.querySelector("#page-title");
  if (!grid) return;
  titleEl.textContent = "Syllabus Components · Marks-wise (JKSSB FA)";
  grid.innerHTML = "";
  EXAM.marksBreakdown.forEach(row => {
    const meta = SUBJECT_META[row.id] || { name: row.section, badge: row.marks + " Marks", meta: "" };
    const a = document.createElement("a");
    a.className = "tile";
    a.href = "topics.html?exam=" + encodeURIComponent(EXAM.id) +
             "&subject=" + encodeURIComponent(row.id);
    a.innerHTML = `
      <div class="badge">${meta.badge}</div>
      <div class="tile-title">${meta.name}</div>
      <div class="tile-meta">${meta.meta || row.section}</div>
      <div class="tile-meta">Click to view topic-wise question bank placeholders</div>
    `;
    grid.appendChild(a);
  });
}

function initTopicsPage() {
  const params = getQueryParams();
  const subjectId = params.subject || "accountancy";
  const topicList = SUBJECT_TOPICS[subjectId] || [];
  const grid = document.querySelector("#topic-grid");
  const titleEl = document.querySelector("#page-title");
  if (!grid) return;
  const meta = SUBJECT_META[subjectId];
  if (meta) {
    const exRow = EXAM.marksBreakdown.find(r => r.id === subjectId);
    titleEl.textContent = meta.name + (exRow ? (" · " + exRow.marks + " Marks") : "");
  } else {
    titleEl.textContent = "Topics · JKSSB FA";
  }
  grid.innerHTML = "";
  if (!topicList.length) {
    grid.innerHTML = "<div class='tile'><div class='tile-title'>No topics configured yet</div><div class='tile-meta'>Add topics in SUBJECT_TOPICS config.</div></div>";
    return;
  }
  topicList.forEach((pair, idx) => {
    const tid = pair[0];
    const label = pair[1];
    const a = document.createElement("a");
    a.className = "tile";
    a.href = `topic.html?exam=${encodeURIComponent(EXAM.id)}&subject=${encodeURIComponent(subjectId)}&topic=${encodeURIComponent(tid)}`;
    a.innerHTML = `
      <div class="badge">Topic ${idx + 1}</div>
      <div class="tile-title">${label}</div>
      <div class="tile-meta">Open MCQ bank for this topic</div>
    `;
    grid.appendChild(a);
  });
}

function wireQuestionOptions(container) {
  container.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const optKey = btn.dataset.option;
      const correctKey = btn.closest(".q-card").dataset.correct;
      const allBtns = btn.closest(".q-card").querySelectorAll(".option-btn");
      allBtns.forEach(b => {
        b.classList.remove("correct","wrong");
      });
      if (optKey === correctKey) {
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
      }
    });
  });
}

async function initTopicPage() {
  const params = getQueryParams();
  const subjectId = params.subject || "accountancy";
  const topicId = params.topic;
  const bcTopic = document.querySelector("#bc-topic");
  const bcSubject = document.querySelector("#bc-subject");
  const hTitle = document.querySelector("#topic-title");
  const notesEl = document.querySelector("#topic-notes");
  const qaContainer = document.querySelector("#qa-container");
  const searchInput = document.querySelector("#search-input");
  if (!qaContainer) return;

  const topicList = SUBJECT_TOPICS[subjectId] || [];
  const found = topicList.find(p => p[0] === topicId) || topicList[0];
  const tid = found ? found[0] : topicId;
  const label = found ? found[1] : (topicId || "Topic");
  const subjMeta = SUBJECT_META[subjectId];

  if (bcSubject && subjMeta) bcSubject.textContent = subjMeta.name;
  if (bcTopic) bcTopic.textContent = label;
  if (hTitle) hTitle.textContent = label;

  const jsonPath = `data/topics/${subjectId}__${tid}.json`;
  let questions = [];
  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error("Failed to load topic file");
    const data = await res.json();
    if (notesEl && Array.isArray(data.notes)) {
      notesEl.textContent = data.notes[0] || "";
    }
    questions = data.questions || [];
  } catch (err) {
    if (notesEl) notesEl.textContent = "Could not load topic file. Check JSON name/path.";
  }

  function renderQuestions(filterText) {
    const f = (filterText || "").toLowerCase();
    qaContainer.innerHTML = "";
    let filtered = questions;
    if (f) {
      filtered = questions.filter(q => (q.text || "").toLowerCase().includes(f));
    }
    if (!filtered.length) {
      qaContainer.innerHTML = "<div class='q-card'>No questions match this search. Try a different keyword.</div>";
      return;
    }
    filtered.forEach(q => {
      const div = document.createElement("div");
      div.className = "q-card";
      div.dataset.correct = q.correct || "";
      const opts = q.options || {};
      div.innerHTML = `
        <div class="q-header-line">
          <div class="q-text">${q.text || ""}</div>
          <div class="q-difficulty">${q.difficulty || ""}</div>
        </div>
        <div class="options">
          <button class="option-btn" data-option="a"><span class="key">A</span><span>${opts.a || ""}</span></button>
          <button class="option-btn" data-option="b"><span class="key">B</span><span>${opts.b || ""}</span></button>
          <button class="option-btn" data-option="c"><span class="key">C</span><span>${opts.c || ""}</span></button>
          <button class="option-btn" data-option="d"><span class="key">D</span><span>${opts.d || ""}</span></button>
        </div>
        <div class="explanation"><strong>Explanation:</strong> ${q.explanation || ""}</div>
      `;
      qaContainer.appendChild(div);
    });
    wireQuestionOptions(qaContainer);
  }

  renderQuestions("");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderQuestions(searchInput.value);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  const page = document.body.dataset.page;
  if (page === "home") initHomePage();
  if (page === "subjects") initSubjectsPage();
  if (page === "topics") initTopicsPage();
  if (page === "topic") initTopicPage();
});
