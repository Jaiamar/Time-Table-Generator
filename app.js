const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const defaultPeriods = [
  { id: 1, label: "P1", time: "08:00-08:40", teaching: true },
  { id: 2, label: "P2", time: "08:45-09:25", teaching: true },
  { id: 3, label: "P3", time: "09:30-10:10", teaching: true },
  { id: 4, label: "P4", time: "10:15-10:55", teaching: true },
  { id: 5, label: "P5", time: "11:15-11:55", teaching: true },
  { id: 6, label: "P6", time: "12:00-12:40", teaching: true },
  { id: 7, label: "P7", time: "12:45-13:25", teaching: true },
  { id: 8, label: "P8", time: "13:30-14:10", teaching: true }
];
const periods = clone(defaultPeriods);

const state = {
  activeView: "dashboard",
  activeMaster: "teachers",
  viewMode: "section",
  selectedEntity: "",
  version: { name: "Version 1", status: "Draft", generatedAt: null },
  teachers: [],
  sections: [],
  subjects: [],
  rooms: [],
  assignments: [],
  timetable: [],
  audit: [],
  quality: null,
  selectedEntryId: null
};

const sampleData = {
  teachers: [
    { id: "T-001", name: "Priya Sharma", dept: "Science", maxWeekly: 28, maxDaily: 6, unavailable: ["Tuesday-1", "Friday-7", "Friday-8"], subjects: ["SCI", "MAT"] },
    { id: "T-002", name: "Arun Mehta", dept: "Mathematics", maxWeekly: 30, maxDaily: 6, unavailable: ["Thursday-8"], subjects: ["MAT", "PHY"] },
    { id: "T-003", name: "Sara Khan", dept: "English", maxWeekly: 26, maxDaily: 5, unavailable: ["Monday-1"], subjects: ["ENG"] },
    { id: "T-004", name: "Vikram Rao", dept: "Computer Science", maxWeekly: 24, maxDaily: 5, unavailable: ["Saturday-7", "Saturday-8"], subjects: ["CS"] },
    { id: "T-005", name: "Neha Iyer", dept: "Social Science", maxWeekly: 28, maxDaily: 6, unavailable: ["Wednesday-6"], subjects: ["SST", "HIN"] },
    { id: "T-006", name: "Ritu Sen", dept: "Languages", maxWeekly: 28, maxDaily: 6, unavailable: [], subjects: ["HIN", "ENG"] },
    { id: "T-007", name: "Kabir Das", dept: "Science", maxWeekly: 26, maxDaily: 5, unavailable: ["Tuesday-5"], subjects: ["CHE", "SCI"] },
    { id: "T-008", name: "Ananya Bose", dept: "Physical Education", maxWeekly: 24, maxDaily: 5, unavailable: ["Friday-1"], subjects: ["PE"] }
  ],
  sections: [
    { id: "7-A", grade: "7", name: "Class 7-A", strength: 38, homeRoom: "R-7A", periodsPerDay: 8 },
    { id: "7-B", grade: "7", name: "Class 7-B", strength: 40, homeRoom: "R-7B", periodsPerDay: 8 },
    { id: "8-A", grade: "8", name: "Class 8-A", strength: 39, homeRoom: "R-8A", periodsPerDay: 8 },
    { id: "10-B", grade: "10", name: "Class 10-B", strength: 42, homeRoom: "R-10B", periodsPerDay: 8 },
    { id: "12-A", grade: "12", name: "Class 12-A", strength: 34, homeRoom: "R-12A", periodsPerDay: 8 }
  ],
  subjects: [
    { id: "MAT", name: "Mathematics", dept: "Mathematics", color: "#176b87", roomType: "CLASSROOM" },
    { id: "SCI", name: "Science", dept: "Science", color: "#167248", roomType: "CLASSROOM" },
    { id: "PHY", name: "Physics", dept: "Science", color: "#6b4fb3", roomType: "LAB" },
    { id: "CHE", name: "Chemistry", dept: "Science", color: "#8a5a21", roomType: "LAB" },
    { id: "ENG", name: "English", dept: "Languages", color: "#b42318", roomType: "CLASSROOM" },
    { id: "HIN", name: "Hindi", dept: "Languages", color: "#a15c08", roomType: "CLASSROOM" },
    { id: "SST", name: "Social Science", dept: "Humanities", color: "#295f98", roomType: "CLASSROOM" },
    { id: "CS", name: "Computer Science", dept: "Computer Science", color: "#4b6b35", roomType: "LAB" },
    { id: "PE", name: "Physical Education", dept: "Activities", color: "#545b62", roomType: "SPORTS" }
  ],
  rooms: [
    { id: "R-7A", name: "7-A Classroom", type: "CLASSROOM", capacity: 45 },
    { id: "R-7B", name: "7-B Classroom", type: "CLASSROOM", capacity: 45 },
    { id: "R-8A", name: "8-A Classroom", type: "CLASSROOM", capacity: 45 },
    { id: "R-10B", name: "10-B Classroom", type: "CLASSROOM", capacity: 45 },
    { id: "R-12A", name: "12-A Classroom", type: "CLASSROOM", capacity: 45 },
    { id: "LAB-SCI", name: "Science Lab 1", type: "LAB", capacity: 36 },
    { id: "LAB-CS", name: "Computer Lab", type: "LAB", capacity: 40 },
    { id: "GROUND", name: "Sports Ground", type: "SPORTS", capacity: 150 }
  ],
  assignments: [
    { id: "A-001", teacherId: "T-001", subjectId: "SCI", sectionId: "12-A", periodsPerWeek: 3, blockLength: 1, maxPerDay: 2, roomType: "CLASSROOM", priority: 8, preferred: [1, 2, 3, 4, 5, 6], prohibited: [] },
    { id: "A-002", teacherId: "T-001", subjectId: "SCI", sectionId: "12-A", periodsPerWeek: 2, blockLength: 2, maxPerDay: 2, roomType: "LAB", priority: 10, preferred: [1, 2, 3, 4], prohibited: [8] },
    { id: "A-003", teacherId: "T-001", subjectId: "MAT", sectionId: "7-B", periodsPerWeek: 6, blockLength: 1, maxPerDay: 2, roomType: "CLASSROOM", priority: 7, preferred: [1, 2, 3, 4], prohibited: [8] },
    { id: "A-004", teacherId: "T-002", subjectId: "MAT", sectionId: "10-B", periodsPerWeek: 6, blockLength: 1, maxPerDay: 2, roomType: "CLASSROOM", priority: 7, preferred: [1, 2, 3, 4, 5], prohibited: [] },
    { id: "A-005", teacherId: "T-002", subjectId: "PHY", sectionId: "12-A", periodsPerWeek: 4, blockLength: 1, maxPerDay: 2, roomType: "LAB", priority: 8, preferred: [1, 2, 3, 4], prohibited: [8] },
    { id: "A-006", teacherId: "T-003", subjectId: "ENG", sectionId: "7-A", periodsPerWeek: 5, blockLength: 1, maxPerDay: 2, roomType: "CLASSROOM", priority: 6, preferred: [2, 3, 4, 5], prohibited: [] },
    { id: "A-007", teacherId: "T-003", subjectId: "ENG", sectionId: "8-A", periodsPerWeek: 5, blockLength: 1, maxPerDay: 2, roomType: "CLASSROOM", priority: 6, preferred: [2, 3, 4, 5], prohibited: [] },
    { id: "A-008", teacherId: "T-004", subjectId: "CS", sectionId: "10-B", periodsPerWeek: 3, blockLength: 1, maxPerDay: 1, roomType: "LAB", priority: 9, preferred: [3, 4, 5, 6], prohibited: [] },
    { id: "A-009", teacherId: "T-005", subjectId: "SST", sectionId: "8-A", periodsPerWeek: 5, blockLength: 1, maxPerDay: 2, roomType: "CLASSROOM", priority: 6, preferred: [1, 2, 3, 4, 5], prohibited: [] },
    { id: "A-010", teacherId: "T-005", subjectId: "HIN", sectionId: "7-B", periodsPerWeek: 4, blockLength: 1, maxPerDay: 2, roomType: "CLASSROOM", priority: 5, preferred: [2, 3, 4, 5], prohibited: [] },
    { id: "A-011", teacherId: "T-006", subjectId: "HIN", sectionId: "7-A", periodsPerWeek: 4, blockLength: 1, maxPerDay: 2, roomType: "CLASSROOM", priority: 5, preferred: [2, 3, 4, 5], prohibited: [] },
    { id: "A-012", teacherId: "T-007", subjectId: "CHE", sectionId: "12-A", periodsPerWeek: 2, blockLength: 2, maxPerDay: 2, roomType: "LAB", priority: 10, preferred: [1, 2, 3, 4], prohibited: [8] },
    { id: "A-013", teacherId: "T-008", subjectId: "PE", sectionId: "7-A", periodsPerWeek: 2, blockLength: 1, maxPerDay: 1, roomType: "SPORTS", priority: 4, preferred: [5, 6, 7], prohibited: [] },
    { id: "A-014", teacherId: "T-008", subjectId: "PE", sectionId: "7-B", periodsPerWeek: 2, blockLength: 1, maxPerDay: 1, roomType: "SPORTS", priority: 4, preferred: [5, 6, 7], prohibited: [] }
  ]
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function byId(collection, id) {
  return collection.find((item) => item.id === id);
}

function slotKey(day, period) {
  return `${day}-${period}`;
}

function availablePeriodsForSection(sectionId) {
  const section = byId(state.sections, sectionId);
  const limit = Math.min(Number(section?.periodsPerDay || periods.length), periods.length);
  return periods.filter((period) => period.id <= limit && period.teaching);
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function loadSampleData() {
  periods.splice(0, periods.length, ...clone(defaultPeriods));
  state.teachers = clone(sampleData.teachers);
  state.sections = clone(sampleData.sections);
  state.subjects = clone(sampleData.subjects);
  state.rooms = clone(sampleData.rooms);
  state.assignments = clone(sampleData.assignments);
  state.timetable = [];
  state.version = { name: "Version 1", status: "Draft", generatedAt: null };
  state.audit = [{ at: new Date().toISOString(), action: "Sample data loaded" }];
  state.quality = null;
  refreshAll();
}

function validateData() {
  const issues = [];
  const teacherIds = new Set(state.teachers.map((t) => t.id));
  const subjectIds = new Set(state.subjects.map((s) => s.id));
  const sectionIds = new Set(state.sections.map((s) => s.id));
  const roomTypes = new Set(state.rooms.map((r) => r.type));

  if (!state.teachers.length) issues.push(issue("bad", "No teachers configured", "Add or import teacher master data before generation."));
  if (!state.sections.length) issues.push(issue("bad", "No sections configured", "At least one class section is required."));
  if (!state.assignments.length) issues.push(issue("bad", "No teaching assignments", "Create teacher-subject-section assignments with weekly periods."));

  for (const assignment of state.assignments) {
    const teacher = byId(state.teachers, assignment.teacherId);
    if (!teacherIds.has(assignment.teacherId)) issues.push(issue("bad", `Missing teacher in ${assignment.id}`, "Assignment references an unknown teacher."));
    if (!subjectIds.has(assignment.subjectId)) issues.push(issue("bad", `Missing subject in ${assignment.id}`, "Assignment references an unknown subject."));
    if (!sectionIds.has(assignment.sectionId)) issues.push(issue("bad", `Missing section in ${assignment.id}`, "Assignment references an unknown section."));
    if (!roomTypes.has(assignment.roomType)) issues.push(issue("bad", `No ${assignment.roomType} room`, "Add a room that satisfies this assignment room rule."));
    if (assignment.periodsPerWeek < assignment.blockLength) issues.push(issue("bad", `Invalid block in ${assignment.id}`, "Weekly periods must be at least the requested block length."));
    if (assignment.periodsPerWeek % assignment.blockLength !== 0) issues.push(issue("warn", `Uneven block count in ${assignment.id}`, "The final lesson block will be shortened unless periods divide by block length."));
    if (teacher && assignment.periodsPerWeek > eligibleSlotCount(teacher, assignment)) {
      issues.push(issue("bad", `Insufficient availability for ${teacher.name}`, `${assignment.id} needs ${assignment.periodsPerWeek} periods but has too few eligible slots.`));
    }
  }

  for (const teacher of state.teachers) {
    const required = state.assignments.filter((a) => a.teacherId === teacher.id).reduce((sum, a) => sum + a.periodsPerWeek, 0);
    if (required > teacher.maxWeekly) issues.push(issue("bad", `${teacher.name} workload exceeds limit`, `${required} periods required; maximum is ${teacher.maxWeekly}.`));
  }

  const sectionLoads = state.sections.map((section) => {
    const required = state.assignments.filter((a) => a.sectionId === section.id).reduce((sum, a) => sum + a.periodsPerWeek, 0);
    return { section, required };
  });
  for (const row of sectionLoads) {
    const capacity = days.length * Number(row.section.periodsPerDay || periods.length);
    if (row.required > capacity) issues.push(issue("bad", `${row.section.name} exceeds weekly slots`, `${row.required} required periods cannot fit in ${capacity} configured slots.`));
  }

  if (!issues.length) issues.push(issue("ok", "Ready for generation", "Master data, assignments, availability and room rules pass the core checks."));
  return issues;
}

function issue(level, title, detail) {
  return { level, title, detail };
}

function eligibleSlotCount(teacher, assignment) {
  let count = 0;
  for (const day of days) {
    for (const period of availablePeriodsForSection(assignment.sectionId)) {
      if (isSlotAllowed(teacher, assignment, day, period.id, assignment.blockLength)) count += 1;
    }
  }
  return count;
}

function isSlotAllowed(teacher, assignment, day, startPeriod, duration) {
  if (assignment.prohibited?.includes(startPeriod)) return false;
  const sectionPeriodCount = Number(byId(state.sections, assignment.sectionId)?.periodsPerDay || periods.length);
  if (startPeriod + duration - 1 > sectionPeriodCount) return false;
  for (let offset = 0; offset < duration; offset += 1) {
    const period = startPeriod + offset;
    if (teacher.unavailable.includes(slotKey(day, period))) return false;
    if (assignment.prohibited?.includes(period)) return false;
  }
  return true;
}

function expandDemands(scope) {
  let assignments = state.assignments;
  if (scope === "middle") assignments = assignments.filter((a) => Number(byId(state.sections, a.sectionId)?.grade || 0) <= 8);
  if (scope === "senior") assignments = assignments.filter((a) => Number(byId(state.sections, a.sectionId)?.grade || 0) >= 10);

  const demands = [];
  for (const assignment of assignments) {
    let remaining = assignment.periodsPerWeek;
    let index = 1;
    while (remaining > 0) {
      const duration = Math.min(assignment.blockLength, remaining);
      demands.push({
        id: `${assignment.id}-${index}`,
        assignmentId: assignment.id,
        teacherId: assignment.teacherId,
        subjectId: assignment.subjectId,
        sectionId: assignment.sectionId,
        roomType: assignment.roomType,
        duration,
        priority: assignment.priority || 1
      });
      remaining -= duration;
      index += 1;
    }
  }
  return demands.sort((a, b) => (b.duration - a.duration) || (b.priority - a.priority));
}

function generateTimetable() {
  const errors = validateData().filter((row) => row.level === "bad");
  if (errors.length) {
    renderValidation(errors);
    setJobState("Failed");
    return false;
  }

  const seed = Number(document.querySelector("#seedInput")?.value || 42);
  const rand = seededRandom(seed);
  const scope = document.querySelector("#scopeSelect")?.value || "all";
  const preserveLocks = document.querySelector("#respectLocks")?.checked ?? true;
  const demands = expandDemands(scope);
  const locked = preserveLocks ? state.timetable.filter((entry) => entry.locked) : [];
  const nextEntries = clone(locked);
  const occupancy = buildOccupancy(nextEntries);
  const unscheduled = [];

  for (const demand of demands) {
    if (locked.some((entry) => entry.demandId === demand.id)) continue;
    const assignment = byId(state.assignments, demand.assignmentId);
    const teacher = byId(state.teachers, demand.teacherId);
    const candidates = buildCandidates(demand, assignment, teacher, occupancy)
      .sort((a, b) => a.penalty - b.penalty || rand() - 0.5);

    const picked = candidates[0];
    if (!picked) {
      unscheduled.push(demand);
      continue;
    }

    const entry = {
      id: `E-${Date.now()}-${nextEntries.length + 1}`,
      demandId: demand.id,
      assignmentId: demand.assignmentId,
      teacherId: demand.teacherId,
      subjectId: demand.subjectId,
      sectionId: demand.sectionId,
      roomId: picked.roomId,
      day: picked.day,
      period: picked.period,
      duration: demand.duration,
      locked: false,
      source: "Generated",
      penalty: picked.penalty
    };
    nextEntries.push(entry);
    reserveOccupancy(occupancy, entry);
  }

  state.timetable = nextEntries;
  state.version = {
    name: `Version ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
    status: unscheduled.length ? "Completed with Warnings" : "Candidate",
    generatedAt: new Date().toISOString()
  };
  state.audit.unshift({ at: new Date().toISOString(), action: `Generation completed with ${unscheduled.length} unscheduled demand(s)` });
  state.quality = scoreTimetable(unscheduled);
  refreshAll();
  return true;
}

function buildCandidates(demand, assignment, teacher, occupancy) {
  const candidates = [];
  const rooms = state.rooms.filter((room) => room.type === demand.roomType);
  for (const day of days) {
    for (const period of availablePeriodsForSection(demand.sectionId)) {
      if (!isSlotAllowed(teacher, assignment, day, period.id, demand.duration)) continue;
      if (dailyCount(occupancy, "section", demand.sectionId, day, assignment.subjectId) >= (assignment.maxPerDay || 8)) continue;
      for (const room of rooms) {
        const entry = {
          teacherId: demand.teacherId,
          sectionId: demand.sectionId,
          roomId: room.id,
          day,
          period: period.id,
          duration: demand.duration
        };
        if (hasCollision(occupancy, entry)) continue;
        candidates.push({ day, period: period.id, roomId: room.id, penalty: candidatePenalty(assignment, day, period.id, room.id, occupancy) });
      }
    }
  }
  return candidates;
}

function candidatePenalty(assignment, day, period, roomId, occupancy) {
  let penalty = 0;
  if (assignment.preferred?.length && !assignment.preferred.includes(period)) penalty += 10;
  if (period === 8) penalty += 4;
  if (dailyCount(occupancy, "teacher", assignment.teacherId, day) >= 4) penalty += 6;
  if (dailyCount(occupancy, "section", assignment.sectionId, day, assignment.subjectId) > 0) penalty += 5;
  const section = byId(state.sections, assignment.sectionId);
  if (section?.homeRoom && assignment.roomType === "CLASSROOM" && roomId !== section.homeRoom) penalty += 7;
  return penalty;
}

function buildOccupancy(entries) {
  const occupancy = { teacher: new Map(), section: new Map(), room: new Map(), subjectDaily: new Map() };
  for (const entry of entries) reserveOccupancy(occupancy, entry);
  return occupancy;
}

function reserveOccupancy(occupancy, entry) {
  for (let offset = 0; offset < entry.duration; offset += 1) {
    const key = slotKey(entry.day, entry.period + offset);
    setOcc(occupancy.teacher, entry.teacherId, key, entry.id);
    setOcc(occupancy.section, entry.sectionId, key, entry.id);
    setOcc(occupancy.room, entry.roomId, key, entry.id);
    const subjectKey = `${entry.sectionId}-${entry.subjectId}-${entry.day}`;
    occupancy.subjectDaily.set(subjectKey, (occupancy.subjectDaily.get(subjectKey) || 0) + 1);
  }
}

function setOcc(map, entityId, key, entryId) {
  if (!map.has(entityId)) map.set(entityId, new Map());
  map.get(entityId).set(key, entryId);
}

function hasCollision(occupancy, entry) {
  for (let offset = 0; offset < entry.duration; offset += 1) {
    const key = slotKey(entry.day, entry.period + offset);
    if (occupancy.teacher.get(entry.teacherId)?.has(key)) return true;
    if (occupancy.section.get(entry.sectionId)?.has(key)) return true;
    if (occupancy.room.get(entry.roomId)?.has(key)) return true;
  }
  return false;
}

function dailyCount(occupancy, type, entityId, day, subjectId = null) {
  if (subjectId) return occupancy.subjectDaily.get(`${entityId}-${subjectId}-${day}`) || 0;
  const map = occupancy[type].get(entityId);
  if (!map) return 0;
  return [...map.keys()].filter((key) => key.startsWith(`${day}-`)).length;
}

function scoreTimetable(unscheduled = []) {
  const required = state.assignments.reduce((sum, a) => sum + a.periodsPerWeek, 0);
  const scheduled = state.timetable.reduce((sum, e) => sum + e.duration, 0);
  const hardViolations = findConflicts().length;
  const preferred = state.timetable.filter((entry) => {
    const assignment = byId(state.assignments, entry.assignmentId);
    return !assignment?.preferred?.length || assignment.preferred.includes(entry.period);
  }).length;
  const preferenceScore = state.timetable.length ? Math.round((preferred / state.timetable.length) * 100) : 0;
  const scheduledScore = required ? Math.round((scheduled / required) * 100) : 0;
  const hardScore = hardViolations ? 0 : 100;
  const spreadScore = Math.max(0, 100 - subjectSpreadPenalty());
  const overall = Math.round((scheduledScore * 0.35) + (hardScore * 0.35) + (preferenceScore * 0.15) + (spreadScore * 0.15));
  return { overall, scheduledScore, hardScore, preferenceScore, spreadScore, hardViolations, unscheduled: unscheduled.length };
}

function subjectSpreadPenalty() {
  let penalty = 0;
  for (const assignment of state.assignments) {
    const byDay = {};
    for (const entry of state.timetable.filter((e) => e.assignmentId === assignment.id)) {
      byDay[entry.day] = (byDay[entry.day] || 0) + entry.duration;
    }
    for (const count of Object.values(byDay)) {
      if (count > (assignment.maxPerDay || 8)) penalty += (count - assignment.maxPerDay) * 12;
      if (count > 2) penalty += 4;
    }
  }
  return penalty;
}

function findConflicts() {
  const conflicts = [];
  const seen = { teacher: new Map(), section: new Map(), room: new Map() };
  for (const entry of state.timetable) {
    for (let offset = 0; offset < entry.duration; offset += 1) {
      const key = slotKey(entry.day, entry.period + offset);
      for (const type of ["teacher", "section", "room"]) {
        const entityId = entry[`${type}Id`];
        const composite = `${entityId}-${key}`;
        if (seen[type].has(composite)) conflicts.push({ type, entryId: entry.id, otherId: seen[type].get(composite), key });
        seen[type].set(composite, entry.id);
      }
    }
  }
  return conflicts;
}

function moveEntry(entryId, day, period) {
  const entry = state.timetable.find((row) => row.id === entryId);
  if (!entry || entry.locked) return false;
  const occupancy = buildOccupancy(state.timetable.filter((row) => row.id !== entryId));
  const test = { ...entry, day, period };
  if (hasCollision(occupancy, test)) return false;
  const teacher = byId(state.teachers, entry.teacherId);
  const assignment = byId(state.assignments, entry.assignmentId);
  if (!isSlotAllowed(teacher, assignment, day, period, entry.duration)) return false;
  entry.day = day;
  entry.period = period;
  entry.source = "Manual";
  entry.penalty = candidatePenalty(assignment, day, period, entry.roomId, occupancy);
  state.audit.unshift({ at: new Date().toISOString(), action: `Moved ${entry.id} to ${day} period ${period}` });
  state.quality = scoreTimetable();
  refreshAll();
  return true;
}

function renderDashboard() {
  document.querySelector("#metricTeachers").textContent = state.teachers.length;
  document.querySelector("#metricSections").textContent = state.sections.length;
  document.querySelector("#metricAssignments").textContent = state.assignments.length;
  const required = state.assignments.reduce((sum, a) => sum + a.periodsPerWeek, 0);
  const scheduled = state.timetable.reduce((sum, e) => sum + e.duration, 0);
  document.querySelector("#metricScheduled").textContent = required ? `${Math.round((scheduled / required) * 100)}%` : "0%";
  renderValidation(validateData());
  renderQuality();
}

function renderValidation(issues) {
  const container = document.querySelector("#validationList");
  container.innerHTML = issues.map((row) => `<article class="issue ${row.level === "ok" ? "" : row.level}"><strong>${row.title}</strong><small>${row.detail}</small></article>`).join("");
}

function renderQuality() {
  const quality = state.quality || scoreTimetable();
  document.querySelector("#qualityScore").textContent = quality.overall;
  const rows = [
    ["Hard constraints", quality.hardScore],
    ["Scheduled demand", quality.scheduledScore],
    ["Preferences", quality.preferenceScore],
    ["Subject spread", quality.spreadScore]
  ];
  document.querySelector("#qualityBars").innerHTML = rows.map(([label, value]) => `
    <div class="bar-row">
      <strong>${label}</strong>
      <div class="bar-track"><div class="bar-fill" style="width:${value}%"></div></div>
      <span>${value}</span>
    </div>
  `).join("");
}

function renderPeriodGrid() {
  document.querySelector("#periodGrid").innerHTML = periods.map((period) => `
    <div class="period editable-period" data-period="${period.id}">
      <strong>${period.label}</strong>
      <label>Time <input class="period-time" value="${period.time}" data-period="${period.id}" /></label>
      <label class="checkbox"><input class="period-teaching" type="checkbox" data-period="${period.id}" ${period.teaching ? "checked" : ""} /> Teaching</label>
      <button class="ghost compact remove-period" data-period="${period.id}">Remove</button>
    </div>
  `).join("");
}

function renderMasterTable() {
  const table = document.querySelector("#masterTable");
  const key = state.activeMaster;
  renderMasterOverview();
  table.className = `master-table ${key}-table`;
  if (key === "teachers") {
    renderTeacherMasterTable(table);
    return;
  }
  if (key === "sections") {
    renderSectionMasterTable(table);
    return;
  }
  if (key === "subjects") {
    renderSubjectMasterTable(table);
    return;
  }
  if (key === "rooms") {
    renderRoomMasterTable(table);
    return;
  }
  const rows = state[key] || [];
  if (!rows.length) {
    table.innerHTML = "<tbody><tr><td>No data loaded.</td></tr></tbody>";
    return;
  }
  const columns = Object.keys(rows[0]).filter((column) => column !== "unavailable" && column !== "subjects" && column !== "color");
  const actionHead = key === "teachers" || key === "sections" ? "<th>Actions</th>" : "";
  table.innerHTML = `<thead><tr>${columns.map((column) => `<th>${labelize(column)}</th>`).join("")}${actionHead}</tr></thead><tbody>${rows.map((row) => `
    <tr data-id="${row.id}">${columns.map((column) => `<td>${row[column]}</td>`).join("")}${actionHead ? `<td class="row-actions">${masterActions(key, row)}</td>` : ""}</tr>
  `).join("")}</tbody>`;
}

function renderMasterOverview() {
  const totals = {
    masterTeachers: state.teachers.length,
    masterSections: state.sections.length,
    masterSubjects: state.subjects.length,
    masterRooms: state.rooms.length
  };
  for (const [id, value] of Object.entries(totals)) {
    const el = document.querySelector(`#${id}`);
    if (el) el.textContent = value;
  }
  const copy = {
    teachers: ["Teachers", "Teacher profiles, workload limits, and class-subject eligibility."],
    sections: ["Sections", "Class and section records, student strength, home rooms, and period limits."],
    subjects: ["Subjects", "Subject catalogue with departments, categories, and required room types."],
    rooms: ["Rooms", "Classrooms, labs, sports facilities, capacity, and resource types."]
  };
  const title = document.querySelector("#masterTableTitle");
  const hint = document.querySelector("#masterTableHint");
  if (title) title.textContent = copy[state.activeMaster][0];
  if (hint) hint.textContent = copy[state.activeMaster][1];
  const addButtons = {
    teachers: "addTeacherBtn",
    sections: "addSectionBtn",
    subjects: "addSubjectBtn",
    rooms: "addRoomBtn"
  };
  for (const id of Object.values(addButtons)) {
    const button = document.querySelector(`#${id}`);
    if (button) button.hidden = id !== addButtons[state.activeMaster];
  }
}

function renderTeacherMasterTable(table) {
  if (!state.teachers.length) {
    table.innerHTML = "<tbody><tr><td>No teachers loaded.</td></tr></tbody>";
    return;
  }
  table.innerHTML = `
    <thead><tr><th>Teacher Records</th></tr></thead>
    <tbody>
      ${state.teachers.map((teacher) => `
        <tr data-id="${teacher.id}" class="teacher-record-row">
          <td>
            <article class="teacher-record">
              <div class="teacher-record-main">
                <div class="teacher-identity">
                  <strong>${teacher.name}</strong>
                  <small>${teacher.id}</small>
                </div>
                <div class="teacher-facts">
                  <div>
                    <span class="field-label">Department</span>
                    <strong>${teacher.dept}</strong>
                  </div>
                  <div>
                    <span class="field-label">Weekly Load</span>
                    <strong>${assignedPeriods(teacher.id)} / ${teacher.maxWeekly}</strong>
                    <small>${teacher.maxDaily} per day max</small>
                  </div>
                </div>
              </div>
              <div class="teacher-assignments">
                <span class="field-label">Classes and Subjects</span>
                ${teacherAssignmentSummary(teacher.id)}
              </div>
              <div class="row-actions teacher-actions">${masterActions("teachers", teacher)}</div>
            </article>
          </td>
        </tr>
      `).join("")}
    </tbody>`;
}

function renderSectionMasterTable(table) {
  if (!state.sections.length) {
    table.innerHTML = "<tbody><tr><td>No sections loaded.</td></tr></tbody>";
    return;
  }
  table.innerHTML = `
    <thead>
      <tr>
        <th>Class / Section</th>
        <th>Students</th>
        <th>Home Room</th>
        <th>Periods / Day</th>
        <th>Subjects Assigned</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${state.sections.map((section) => `
        <tr data-id="${section.id}">
          <td><strong>${section.name}</strong><small>Class ${section.grade} · ${section.id}</small></td>
          <td>${section.strength}</td>
          <td>${byId(state.rooms, section.homeRoom)?.name || section.homeRoom}</td>
          <td>${section.periodsPerDay || periods.length}</td>
          <td>${sectionAssignmentSummary(section.id)}</td>
          <td class="row-actions">${masterActions("sections", section)}</td>
        </tr>
      `).join("")}
    </tbody>`;
}

function renderSubjectMasterTable(table) {
  if (!state.subjects.length) {
    table.innerHTML = "<tbody><tr><td>No subjects loaded.</td></tr></tbody>";
    return;
  }
  table.innerHTML = `
    <thead>
      <tr>
        <th>Subject</th>
        <th>Room Type</th>
        <th>Color</th>
        <th>Assignments</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${state.subjects.map((subject) => `
        <tr data-id="${subject.id}">
          <td><strong>${subject.name}</strong><small>${subject.id}</small></td>
          <td>${subject.roomType}</td>
          <td><span class="color-swatch" style="background:${subject.color}"></span>${subject.color}</td>
          <td>${state.assignments.filter((assignment) => assignment.subjectId === subject.id).length}</td>
          <td class="row-actions">${masterActions("subjects", subject)}</td>
        </tr>
      `).join("")}
    </tbody>`;
}

function renderRoomMasterTable(table) {
  if (!state.rooms.length) {
    table.innerHTML = "<tbody><tr><td>No rooms loaded.</td></tr></tbody>";
    return;
  }
  table.innerHTML = `
    <thead>
      <tr>
        <th>Room</th>
        <th>Type</th>
        <th>Capacity</th>
        <th>Scheduled Entries</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${state.rooms.map((room) => `
        <tr data-id="${room.id}">
          <td><strong>${room.name}</strong><small>${room.id}</small></td>
          <td>${room.type}</td>
          <td>${room.capacity}</td>
          <td>${state.timetable.filter((entry) => entry.roomId === room.id).length}</td>
          <td class="row-actions">${masterActions("rooms", room)}</td>
        </tr>
      `).join("")}
    </tbody>`;
}

function teacherAssignmentSummary(teacherId) {
  const rows = state.assignments.filter((assignment) => assignment.teacherId === teacherId);
  if (!rows.length) return `<span class="muted-text">No class-subject assigned</span>`;
  return `<div class="chips">${rows.map((assignment) => {
    const section = byId(state.sections, assignment.sectionId)?.name || assignment.sectionId;
    const subject = byId(state.subjects, assignment.subjectId)?.name || assignment.subjectId;
    return `<span class="chip">${section} · ${subject} · ${assignment.periodsPerWeek}P</span>`;
  }).join("")}</div>`;
}

function sectionAssignmentSummary(sectionId) {
  const rows = state.assignments.filter((assignment) => assignment.sectionId === sectionId);
  if (!rows.length) return `<span class="muted-text">No teachers assigned</span>`;
  const subjectCount = new Set(rows.map((assignment) => assignment.subjectId)).size;
  const weekly = rows.reduce((sum, assignment) => sum + assignment.periodsPerWeek, 0);
  return `${subjectCount} subject${subjectCount === 1 ? "" : "s"} · ${weekly} weekly periods`;
}

function assignedPeriods(teacherId) {
  return state.assignments.filter((assignment) => assignment.teacherId === teacherId).reduce((sum, assignment) => sum + assignment.periodsPerWeek, 0);
}

function masterActions(key, row) {
  if (key === "teachers") {
    return `<button class="ghost compact view-teacher" data-id="${row.id}">Timetable</button><button class="secondary compact edit-teacher" data-id="${row.id}">Edit</button><button class="danger compact remove-teacher" data-id="${row.id}">Remove</button>`;
  }
  if (key === "sections") {
    return `<button class="ghost compact view-section" data-id="${row.id}">Timetable</button><button class="secondary compact edit-section" data-id="${row.id}">Edit</button><button class="danger compact remove-section" data-id="${row.id}">Remove</button>`;
  }
  if (key === "subjects") {
    return `<button class="secondary compact edit-subject" data-id="${row.id}">Edit</button><button class="danger compact remove-subject" data-id="${row.id}">Remove</button>`;
  }
  if (key === "rooms") {
    return `<button class="secondary compact edit-room" data-id="${row.id}">Edit</button><button class="danger compact remove-room" data-id="${row.id}">Remove</button>`;
  }
  return "";
}

function renderAssignments() {
  const table = document.querySelector("#assignmentTable");
  if (!state.assignments.length) {
    table.innerHTML = "<tbody><tr><td>No assignments yet.</td></tr></tbody>";
    return;
  }
  const rows = state.assignments.map((a) => ({
    id: a.id,
    teacher: byId(state.teachers, a.teacherId)?.name || a.teacherId,
    subject: byId(state.subjects, a.subjectId)?.name || a.subjectId,
    section: byId(state.sections, a.sectionId)?.name || a.sectionId,
    weekly: a.periodsPerWeek,
    block: a.blockLength,
    room: a.roomType,
    priority: a.priority
  }));
  const cols = Object.keys(rows[0]);
  table.innerHTML = `<thead><tr>${cols.map((c) => `<th>${labelize(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `
    <tr>${cols.map((c) => `<td>${row[c]}</td>`).join("")}</tr>
  `).join("")}</tbody>`;
}

function renderTimetable() {
  renderEntitySelect();
  const selected = state.selectedEntity || document.querySelector("#entitySelect").value;
  const mode = state.viewMode;
  const periodsToShow = mode === "section" && selected ? availablePeriodsForSection(selected) : periods;
  const grid = document.querySelector("#timetableGrid");
  const header = [`<div class="grid-cell grid-head"></div>`, ...days.map((day) => `<div class="grid-cell grid-head">${day}</div>`)];
  const body = [];
  for (const period of periodsToShow) {
    body.push(`<div class="grid-cell period-head">${period.label}</div>`);
    for (const day of days) {
      const entries = state.timetable.filter((entry) => entry.day === day && entry.period === period.id && entryMatches(entry, mode, selected));
      body.push(`<div class="grid-cell">${entries.length ? entries.map(renderLesson).join("") : "<div class=\"empty-slot\"></div>"}</div>`);
    }
  }
  grid.innerHTML = [...header, ...body].join("");
}

function entryMatches(entry, mode, selected) {
  if (!selected) return true;
  if (mode === "section") return entry.sectionId === selected;
  if (mode === "teacher") return entry.teacherId === selected;
  return entry.roomId === selected;
}

function renderLesson(entry) {
  const teacher = byId(state.teachers, entry.teacherId)?.name || entry.teacherId;
  const subject = byId(state.subjects, entry.subjectId) || { name: entry.subjectId, color: "#176b87" };
  const section = byId(state.sections, entry.sectionId)?.name || entry.sectionId;
  const room = byId(state.rooms, entry.roomId)?.name || entry.roomId;
  const conflicts = findConflicts().some((c) => c.entryId === entry.id || c.otherId === entry.id);
  return `
    <button class="lesson ${entry.locked ? "locked" : ""} ${conflicts ? "conflict" : ""}" data-entry="${entry.id}" style="border-left-color:${subject.color}">
      <strong>${subject.name}${entry.duration > 1 ? ` (${entry.duration}P)` : ""}</strong>
      <span>${teacher}</span>
      <span>${section} · ${room}</span>
    </button>
  `;
}

function renderEntitySelect() {
  const select = document.querySelector("#entitySelect");
  const options = state.viewMode === "section" ? state.sections : state.viewMode === "teacher" ? state.teachers : state.rooms;
  const current = state.selectedEntity || options[0]?.id || "";
  select.innerHTML = options.map((item) => `<option value="${item.id}">${item.name}</option>`).join("");
  select.value = current;
  state.selectedEntity = current;
}

function renderReports() {
  renderWorkloadTable();
  renderRoomReport();
}

function renderWorkloadTable() {
  const rows = state.teachers.map((teacher) => {
    const required = state.assignments.filter((a) => a.teacherId === teacher.id).reduce((sum, a) => sum + a.periodsPerWeek, 0);
    const scheduled = state.timetable.filter((e) => e.teacherId === teacher.id).reduce((sum, e) => sum + e.duration, 0);
    return { teacher: teacher.name, dept: teacher.dept, required, scheduled, max: teacher.maxWeekly };
  });
  renderSimpleTable("#workloadTable", rows);
}

function renderRoomReport() {
  const rows = state.rooms.map((room) => {
    const used = state.timetable.filter((e) => e.roomId === room.id).reduce((sum, e) => sum + e.duration, 0);
    return { room: room.name, type: room.type, capacity: room.capacity, used, utilization: `${Math.round((used / (days.length * periods.length)) * 100)}%` };
  });
  renderSimpleTable("#roomReportTable", rows);
}

function renderSimpleTable(selector, rows) {
  const table = document.querySelector(selector);
  if (!rows.length) {
    table.innerHTML = "<tbody><tr><td>No data.</td></tr></tbody>";
    return;
  }
  const cols = Object.keys(rows[0]);
  table.innerHTML = `<thead><tr>${cols.map((c) => `<th>${labelize(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `
    <tr>${cols.map((c) => `<td>${row[c]}</td>`).join("")}</tr>
  `).join("")}</tbody>`;
}

function renderSubstitutionControls() {
  document.querySelector("#absenceTeacher").innerHTML = state.teachers.map((t) => `<option value="${t.id}">${t.name}</option>`).join("");
  document.querySelector("#absenceDay").innerHTML = days.map((d) => `<option value="${d}">${d}</option>`).join("");
  document.querySelector("#absencePeriod").innerHTML = periods.map((p) => `<option value="${p.id}">${p.label}</option>`).join("");
}

function recommendSubstitutes() {
  const teacherId = document.querySelector("#absenceTeacher").value;
  const day = document.querySelector("#absenceDay").value;
  const period = Number(document.querySelector("#absencePeriod").value);
  const affected = state.timetable.filter((entry) => entry.teacherId === teacherId && entry.day === day && period >= entry.period && period < entry.period + entry.duration);
  const container = document.querySelector("#substitutionResults");
  if (!affected.length) {
    container.innerHTML = `<article class="issue"><strong>No affected lesson</strong><small>The selected teacher has no scheduled lesson in this slot.</small></article>`;
    return;
  }
  const occupancy = buildOccupancy(state.timetable);
  const results = [];
  for (const lesson of affected) {
    const subject = byId(state.subjects, lesson.subjectId);
    const candidates = state.teachers
      .filter((teacher) => teacher.id !== teacherId)
      .filter((teacher) => teacher.subjects.includes(lesson.subjectId) || teacher.dept === subject.dept)
      .filter((teacher) => !teacher.unavailable.includes(slotKey(day, period)))
      .filter((teacher) => !occupancy.teacher.get(teacher.id)?.has(slotKey(day, period)))
      .slice(0, 5);
    results.push({ lesson, candidates });
  }
  container.innerHTML = results.map(({ lesson, candidates }) => {
    const subject = byId(state.subjects, lesson.subjectId)?.name || lesson.subjectId;
    const section = byId(state.sections, lesson.sectionId)?.name || lesson.sectionId;
    return `<article class="issue ${candidates.length ? "" : "warn"}">
      <strong>${subject} for ${section}</strong>
      <small>${candidates.length ? candidates.map((t) => `${t.name} (${t.dept})`).join(", ") : "No qualified free teacher found."}</small>
    </article>`;
  }).join("");
}

function openMovePanel(entryId) {
  const entry = state.timetable.find((row) => row.id === entryId);
  const panel = document.querySelector("#movePanel");
  if (!entry) return;
  state.selectedEntryId = entryId;
  const subject = byId(state.subjects, entry.subjectId)?.name || entry.subjectId;
  const candidates = buildCandidates(
    { ...entry, roomType: byId(state.rooms, entry.roomId)?.type, duration: entry.duration },
    byId(state.assignments, entry.assignmentId),
    byId(state.teachers, entry.teacherId),
    buildOccupancy(state.timetable.filter((row) => row.id !== entryId))
  ).slice(0, 18);
  panel.hidden = false;
  panel.innerHTML = `
    <strong>Move ${subject}</strong>
    <div class="move-options">
      ${entry.locked ? "<span>Locked entries must be unlocked before moving.</span>" : candidates.map((c) => `<button class="ghost move-option" data-day="${c.day}" data-period="${c.period}">${c.day} P${c.period}</button>`).join("")}
    </div>
  `;
}

function lockVisible() {
  for (const entry of state.timetable) {
    if (entryMatches(entry, state.viewMode, state.selectedEntity)) entry.locked = true;
  }
  state.audit.unshift({ at: new Date().toISOString(), action: `Locked visible ${state.viewMode} timetable` });
  refreshAll();
}

function exportCsv() {
  const headers = ["day", "period", "duration", "teacher", "section", "subject", "room", "source", "locked"];
  const rows = state.timetable.map((entry) => [
    entry.day,
    entry.period,
    entry.duration,
    byId(state.teachers, entry.teacherId)?.name || entry.teacherId,
    byId(state.sections, entry.sectionId)?.name || entry.sectionId,
    byId(state.subjects, entry.subjectId)?.name || entry.subjectId,
    byId(state.rooms, entry.roomId)?.name || entry.roomId,
    entry.source,
    entry.locked ? "yes" : "no"
  ]);
  download("timetable-export.csv", [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n"));
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function download(filename, content) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadAssignmentTemplate() {
  const csv = [
    "term,teacher_code,subject_code,section,periods_per_week,block_length,room_requirement",
    "2026-27-T1,T-0042,MATHEMATICS,CLASS-7-B,6,1,CLASSROOM"
  ].join("\n");
  download("teaching-assignments-template.csv", csv);
}

function labelize(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function refreshAll() {
  renderVersion();
  renderDashboard();
  renderPeriodGrid();
  renderMasterTable();
  renderAssignments();
  renderTimetable();
  renderReports();
  renderSubstitutionControls();
  populateAssignmentDialog();
}

function renderVersion() {
  document.querySelector("#versionStatus").textContent = state.version.status;
  document.querySelector("#versionName").textContent = state.version.name;
  document.querySelector("#versionMeta").textContent = state.version.generatedAt ? new Date(state.version.generatedAt).toLocaleString() : "Not generated yet";
}

function populateAssignmentDialog() {
  document.querySelector("#newTeacher").innerHTML = state.teachers.map((t) => `<option value="${t.id}">${t.name}</option>`).join("");
  document.querySelector("#newSubject").innerHTML = state.subjects.map((s) => `<option value="${s.id}">${s.name}</option>`).join("");
  document.querySelector("#newSection").innerHTML = state.sections.map((s) => `<option value="${s.id}">${s.name}</option>`).join("");
  document.querySelector("#newRoomType").innerHTML = [...new Set(state.rooms.map((r) => r.type))].map((type) => `<option value="${type}">${type}</option>`).join("");
  document.querySelector("#sectionHomeRoom").innerHTML = state.rooms.map((room) => `<option value="${room.id}">${room.name}</option>`).join("");
}

function addPeriod() {
  const nextId = periods.length ? Math.max(...periods.map((period) => period.id)) + 1 : 1;
  periods.push({ id: nextId, label: `P${nextId}`, time: "14:15-14:55", teaching: true });
  for (const section of state.sections) {
    section.periodsPerDay = Math.max(Number(section.periodsPerDay || 0), Math.min(nextId, periods.length));
  }
  state.timetable = [];
  state.version.status = "Draft";
  refreshAll();
}

function updatePeriod(periodId, patch) {
  const period = periods.find((row) => row.id === periodId);
  if (!period) return;
  Object.assign(period, patch);
  state.timetable = [];
  state.version.status = "Draft";
  refreshAll();
}

function setPeriodTime(periodId, time) {
  const period = periods.find((row) => row.id === periodId);
  if (!period) return;
  period.time = time;
  state.timetable = [];
  state.version.status = "Draft";
  renderVersion();
}

function removePeriod(periodId) {
  if (periods.length <= 1) return;
  const index = periods.findIndex((period) => period.id === periodId);
  if (index < 0) return;
  periods.splice(index, 1);
  periods.forEach((period, i) => {
    period.id = i + 1;
    period.label = `P${i + 1}`;
  });
  for (const section of state.sections) {
    section.periodsPerDay = Math.min(Number(section.periodsPerDay || periods.length), periods.length);
  }
  state.timetable = [];
  state.version.status = "Draft";
  refreshAll();
}

function openTeacherDialog(id = "") {
  const teacher = byId(state.teachers, id) || { id: nextCode("T", state.teachers), name: "", dept: "", maxWeekly: 28, maxDaily: 6, subjects: [] };
  document.querySelector("#teacherDialogTitle").textContent = id ? "Edit Teacher" : "Add Teacher";
  document.querySelector("#teacherEditId").value = id;
  document.querySelector("#teacherCode").value = teacher.id;
  document.querySelector("#teacherCode").disabled = Boolean(id);
  document.querySelector("#teacherName").value = teacher.name;
  document.querySelector("#teacherDept").value = teacher.dept;
  document.querySelector("#teacherMaxWeekly").value = teacher.maxWeekly;
  document.querySelector("#teacherMaxDaily").value = teacher.maxDaily;
  renderTeacherAssignmentBuilder(id);
  document.querySelector("#teacherDialog").showModal();
}

function renderTeacherAssignmentBuilder(teacherId = "") {
  const rows = teacherId
    ? state.assignments.filter((assignment) => assignment.teacherId === teacherId)
    : [];
  const container = document.querySelector("#teacherAssignmentRows");
  const sourceRows = rows.length ? rows : [{ subjectId: state.subjects[0]?.id || "", sectionId: state.sections[0]?.id || "", periodsPerWeek: 4, blockLength: 1, roomType: state.subjects[0]?.roomType || "CLASSROOM" }];
  container.innerHTML = sourceRows.map((assignment) => teacherAssignmentRowHtml(assignment)).join("");
}

function teacherAssignmentRowHtml(assignment = {}) {
  return `
    <div class="builder-row teacher-assignment-row">
      <label>Subject
        <select class="teacher-assignment-subject">
          ${state.subjects.map((subject) => `<option value="${subject.id}" ${assignment.subjectId === subject.id ? "selected" : ""}>${subject.name}</option>`).join("")}
        </select>
      </label>
      <label>Class / Section
        <select class="teacher-assignment-section">
          ${state.sections.map((section) => `<option value="${section.id}" ${assignment.sectionId === section.id ? "selected" : ""}>${section.name}</option>`).join("")}
        </select>
      </label>
      <label>Weekly periods
        <input class="teacher-assignment-periods" type="number" min="1" max="12" value="${assignment.periodsPerWeek || 4}" />
      </label>
      <label>Block
        <input class="teacher-assignment-block" type="number" min="1" max="3" value="${assignment.blockLength || 1}" />
      </label>
      <button type="button" class="danger compact remove-teacher-assignment">Remove</button>
    </div>`;
}

function addTeacherAssignmentRow() {
  document.querySelector("#teacherAssignmentRows").insertAdjacentHTML("beforeend", teacherAssignmentRowHtml({
    subjectId: state.subjects[0]?.id || "",
    sectionId: state.sections[0]?.id || "",
    periodsPerWeek: 4,
    blockLength: 1
  }));
}

function collectTeacherAssignments(teacherId) {
  return [...document.querySelectorAll(".teacher-assignment-row")].map((row, index) => {
    const subjectId = row.querySelector(".teacher-assignment-subject").value;
    const sectionId = row.querySelector(".teacher-assignment-section").value;
    const subject = byId(state.subjects, subjectId);
    return {
      id: `A-${teacherId}-${index + 1}-${Date.now()}`,
      teacherId,
      subjectId,
      sectionId,
      periodsPerWeek: Number(row.querySelector(".teacher-assignment-periods").value),
      blockLength: Number(row.querySelector(".teacher-assignment-block").value),
      maxPerDay: 2,
      roomType: subject?.roomType || "CLASSROOM",
      priority: subject?.roomType === "LAB" ? 9 : 6,
      preferred: [1, 2, 3, 4, 5, 6],
      prohibited: []
    };
  }).filter((assignment) => assignment.subjectId && assignment.sectionId && assignment.periodsPerWeek > 0);
}

function saveTeacher(event) {
  event.preventDefault();
  const editId = document.querySelector("#teacherEditId").value;
  const payload = {
    id: document.querySelector("#teacherCode").value.trim(),
    name: document.querySelector("#teacherName").value.trim(),
    dept: document.querySelector("#teacherDept").value.trim(),
    maxWeekly: Number(document.querySelector("#teacherMaxWeekly").value),
    maxDaily: Number(document.querySelector("#teacherMaxDaily").value),
    unavailable: byId(state.teachers, editId)?.unavailable || [],
    subjects: []
  };
  if (!payload.id || !payload.name) return;
  const existing = byId(state.teachers, editId || payload.id);
  if (existing) Object.assign(existing, payload, { id: existing.id });
  else state.teachers.push(payload);
  const teacherId = existing?.id || payload.id;
  const newAssignments = collectTeacherAssignments(teacherId);
  payload.subjects = [...new Set(newAssignments.map((assignment) => assignment.subjectId))];
  const savedTeacher = byId(state.teachers, teacherId);
  if (savedTeacher) savedTeacher.subjects = payload.subjects;
  state.assignments = state.assignments.filter((assignment) => assignment.teacherId !== teacherId).concat(newAssignments);
  state.timetable = state.timetable.filter((entry) => entry.teacherId !== teacherId);
  state.version.status = "Draft";
  document.querySelector("#teacherDialog").close();
  refreshAll();
}

function openSectionDialog(id = "") {
  const section = byId(state.sections, id) || {
    id: nextSectionCode(),
    grade: "",
    name: "",
    strength: 40,
    homeRoom: state.rooms[0]?.id || "",
    periodsPerDay: periods.length
  };
  document.querySelector("#sectionDialogTitle").textContent = id ? "Edit Section" : "Add Section";
  document.querySelector("#sectionEditId").value = id;
  document.querySelector("#sectionCode").value = section.id;
  document.querySelector("#sectionCode").disabled = Boolean(id);
  document.querySelector("#sectionGrade").value = section.grade;
  document.querySelector("#sectionName").value = section.name;
  document.querySelector("#sectionStrength").value = section.strength;
  document.querySelector("#sectionHomeRoom").value = section.homeRoom;
  document.querySelector("#sectionPeriodsPerDay").max = periods.length;
  document.querySelector("#sectionPeriodsPerDay").value = Math.min(Number(section.periodsPerDay || periods.length), periods.length);
  document.querySelector("#sectionDialog").showModal();
}

function openSubjectDialog(id = "") {
  const subject = byId(state.subjects, id) || { id: nextSubjectCode(), name: "", roomType: "CLASSROOM", color: "#176b87" };
  document.querySelector("#subjectDialogTitle").textContent = id ? "Edit Subject" : "Add Subject";
  document.querySelector("#subjectEditId").value = id;
  document.querySelector("#subjectCode").value = subject.id;
  document.querySelector("#subjectCode").disabled = Boolean(id);
  document.querySelector("#subjectName").value = subject.name;
  document.querySelector("#subjectRoomType").value = subject.roomType;
  document.querySelector("#subjectColor").value = subject.color || "#176b87";
  document.querySelector("#subjectDialog").showModal();
}

function saveSubject(event) {
  event.preventDefault();
  const editId = document.querySelector("#subjectEditId").value;
  const payload = {
    id: document.querySelector("#subjectCode").value.trim().toUpperCase(),
    name: document.querySelector("#subjectName").value.trim(),
    roomType: document.querySelector("#subjectRoomType").value,
    color: document.querySelector("#subjectColor").value
  };
  if (!payload.id || !payload.name) return;
  const existing = byId(state.subjects, editId || payload.id);
  if (existing) Object.assign(existing, payload, { id: existing.id, dept: existing.dept || "" });
  else state.subjects.push({ ...payload, dept: "" });
  document.querySelector("#subjectDialog").close();
  refreshAll();
}

function openRoomDialog(id = "") {
  const room = byId(state.rooms, id) || { id: nextRoomCode(), name: "", type: "CLASSROOM", capacity: 40 };
  document.querySelector("#roomDialogTitle").textContent = id ? "Edit Room" : "Add Room";
  document.querySelector("#roomEditId").value = id;
  document.querySelector("#roomCode").value = room.id;
  document.querySelector("#roomCode").disabled = Boolean(id);
  document.querySelector("#roomName").value = room.name;
  document.querySelector("#roomType").value = room.type;
  document.querySelector("#roomCapacity").value = room.capacity;
  document.querySelector("#roomDialog").showModal();
}

function saveRoom(event) {
  event.preventDefault();
  const editId = document.querySelector("#roomEditId").value;
  const payload = {
    id: document.querySelector("#roomCode").value.trim().toUpperCase(),
    name: document.querySelector("#roomName").value.trim(),
    type: document.querySelector("#roomType").value,
    capacity: Number(document.querySelector("#roomCapacity").value)
  };
  if (!payload.id || !payload.name) return;
  const existing = byId(state.rooms, editId || payload.id);
  if (existing) Object.assign(existing, payload, { id: existing.id });
  else state.rooms.push(payload);
  document.querySelector("#roomDialog").close();
  refreshAll();
}

function saveSection(event) {
  event.preventDefault();
  const editId = document.querySelector("#sectionEditId").value;
  const payload = {
    id: document.querySelector("#sectionCode").value.trim(),
    grade: document.querySelector("#sectionGrade").value.trim(),
    name: document.querySelector("#sectionName").value.trim(),
    strength: Number(document.querySelector("#sectionStrength").value),
    homeRoom: document.querySelector("#sectionHomeRoom").value,
    periodsPerDay: Math.min(Number(document.querySelector("#sectionPeriodsPerDay").value), periods.length)
  };
  if (!payload.id || !payload.name) return;
  const existing = byId(state.sections, editId || payload.id);
  if (existing) Object.assign(existing, payload, { id: existing.id });
  else state.sections.push(payload);
  state.timetable = [];
  state.version.status = "Draft";
  document.querySelector("#sectionDialog").close();
  refreshAll();
}

function removeTeacher(id) {
  const teacher = byId(state.teachers, id);
  if (!teacher) return;
  const linkedAssignments = state.assignments.filter((assignment) => assignment.teacherId === id).length;
  const ok = window.confirm(`Remove ${teacher.name}? This will also remove ${linkedAssignments} linked assignment(s) and generated timetable entries.`);
  if (!ok) return;
  state.teachers = state.teachers.filter((row) => row.id !== id);
  state.assignments = state.assignments.filter((assignment) => assignment.teacherId !== id);
  state.timetable = state.timetable.filter((entry) => entry.teacherId !== id);
  if (state.viewMode === "teacher" && state.selectedEntity === id) state.selectedEntity = "";
  state.version.status = "Draft";
  state.audit.unshift({ at: new Date().toISOString(), action: `Removed teacher ${teacher.name}` });
  refreshAll();
}

function removeSection(id) {
  const section = byId(state.sections, id);
  if (!section) return;
  const linkedAssignments = state.assignments.filter((assignment) => assignment.sectionId === id).length;
  const ok = window.confirm(`Remove ${section.name}? This will also remove ${linkedAssignments} linked assignment(s) and generated timetable entries.`);
  if (!ok) return;
  state.sections = state.sections.filter((row) => row.id !== id);
  state.assignments = state.assignments.filter((assignment) => assignment.sectionId !== id);
  state.timetable = state.timetable.filter((entry) => entry.sectionId !== id);
  if (state.viewMode === "section" && state.selectedEntity === id) state.selectedEntity = "";
  state.version.status = "Draft";
  state.audit.unshift({ at: new Date().toISOString(), action: `Removed section ${section.name}` });
  refreshAll();
}

function removeSubject(id) {
  const subject = byId(state.subjects, id);
  if (!subject) return;
  const linkedAssignments = state.assignments.filter((assignment) => assignment.subjectId === id).length;
  const ok = window.confirm(`Remove ${subject.name}? This will also remove ${linkedAssignments} linked assignment(s) and timetable entries.`);
  if (!ok) return;
  state.subjects = state.subjects.filter((row) => row.id !== id);
  state.assignments = state.assignments.filter((assignment) => assignment.subjectId !== id);
  state.timetable = state.timetable.filter((entry) => entry.subjectId !== id);
  for (const teacher of state.teachers) teacher.subjects = (teacher.subjects || []).filter((subjectId) => subjectId !== id);
  state.version.status = "Draft";
  state.audit.unshift({ at: new Date().toISOString(), action: `Removed subject ${subject.name}` });
  refreshAll();
}

function removeRoom(id) {
  const room = byId(state.rooms, id);
  if (!room) return;
  const homeSections = state.sections.filter((section) => section.homeRoom === id).length;
  const scheduledEntries = state.timetable.filter((entry) => entry.roomId === id).length;
  const ok = window.confirm(`Remove ${room.name}? This will clear ${homeSections} home-room reference(s) and ${scheduledEntries} scheduled room allocation(s).`);
  if (!ok) return;
  state.rooms = state.rooms.filter((row) => row.id !== id);
  for (const section of state.sections) {
    if (section.homeRoom === id) section.homeRoom = state.rooms.find((candidate) => candidate.type === "CLASSROOM")?.id || "";
  }
  state.timetable = state.timetable.filter((entry) => entry.roomId !== id);
  state.version.status = "Draft";
  state.audit.unshift({ at: new Date().toISOString(), action: `Removed room ${room.name}` });
  refreshAll();
}

function nextCode(prefix, rows) {
  const max = rows.reduce((value, row) => {
    const match = String(row.id).match(new RegExp(`^${prefix}-(\\d+)$`));
    return match ? Math.max(value, Number(match[1])) : value;
  }, 0);
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

function nextSectionCode() {
  const grade = "NEW";
  let index = 1;
  while (state.sections.some((section) => section.id === `${grade}-${index}`)) index += 1;
  return `${grade}-${index}`;
}

function nextSubjectCode() {
  let index = state.subjects.length + 1;
  while (state.subjects.some((subject) => subject.id === `SUB-${index}`)) index += 1;
  return `SUB-${index}`;
}

function nextRoomCode() {
  let index = state.rooms.length + 1;
  while (state.rooms.some((room) => room.id === `ROOM-${index}`)) index += 1;
  return `ROOM-${index}`;
}

function showEntityTimetable(mode, id) {
  state.viewMode = mode;
  state.selectedEntity = id;
  document.querySelector("#viewMode").value = mode;
  setView("timetable");
  renderTimetable();
}

function saveAssignment(event) {
  event.preventDefault();
  const id = `A-${String(state.assignments.length + 1).padStart(3, "0")}`;
  state.assignments.push({
    id,
    teacherId: document.querySelector("#newTeacher").value,
    subjectId: document.querySelector("#newSubject").value,
    sectionId: document.querySelector("#newSection").value,
    periodsPerWeek: Number(document.querySelector("#newPeriods").value),
    blockLength: Number(document.querySelector("#newBlock").value),
    maxPerDay: 2,
    roomType: document.querySelector("#newRoomType").value,
    priority: 5,
    preferred: [1, 2, 3, 4, 5, 6],
    prohibited: []
  });
  document.querySelector("#assignmentDialog").close();
  refreshAll();
}

function setView(view) {
  state.activeView = view;
  document.querySelectorAll(".view").forEach((el) => el.classList.toggle("active-view", el.id === view));
  document.querySelectorAll(".nav-button").forEach((el) => el.classList.toggle("active", el.dataset.view === view));
  const labels = {
    dashboard: ["Dashboard", "Data readiness, conflicts, workloads, and current timetable state."],
    setup: ["Academic Setup", "Working days, bell schedule, and period timings."],
    masterdata: ["Master Data", "Manage teachers, sections, subjects, rooms, and teaching eligibility."],
    assignments: ["Assignments", "Many-to-many teacher, subject, class, section, room, and weekly demand mapping."],
    generate: ["Generation Center", "Validate inputs, run the constraint scheduler, and review job progress."],
    timetable: ["Timetable Editor", "Class-wise, teacher-wise, and room-wise grid with live conflict validation."],
    reports: ["Reports", "Teacher workload, room utilization, quality score, and export-ready summaries."],
    substitution: ["Substitution Desk", "Find qualified free teachers for day-specific absences."]
  };
  document.querySelector("#pageTitle").textContent = labels[view][0];
  document.querySelector("#pageSubtitle").textContent = labels[view][1];
}

function setJobState(status, activeIndex = -1) {
  document.querySelector("#jobState").textContent = status;
  const steps = ["Queued", "Validating", "Building Model", "Solving", "Post-validating", status];
  document.querySelector("#jobSteps").innerHTML = steps.map((step, index) => `<li class="${index < activeIndex ? "done" : index === activeIndex ? "active" : ""}">${step}</li>`).join("");
}

async function runGenerationWithLifecycle() {
  const steps = ["Queued", "Validating", "Building Model", "Solving", "Post-validating"];
  for (let i = 0; i < steps.length; i += 1) {
    setJobState(steps[i], i);
    await new Promise((resolve) => setTimeout(resolve, 160));
  }
  const ok = generateTimetable();
  setJobState(ok ? state.version.status : "Failed", ok ? steps.length : 1);
}

function bindEvents() {
  document.querySelectorAll(".nav-button").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
  document.querySelector("#loadSampleBtn").addEventListener("click", loadSampleData);
  document.querySelector("#generateNowBtn").addEventListener("click", runGenerationWithLifecycle);
  document.querySelector("#runGenerationBtn").addEventListener("click", runGenerationWithLifecycle);
  document.querySelector("#validateBtn").addEventListener("click", () => renderValidation(validateData()));
  document.querySelectorAll(".tab").forEach((tab) => tab.addEventListener("click", () => {
    state.activeMaster = tab.dataset.table;
    document.querySelectorAll(".tab").forEach((el) => el.classList.toggle("active", el === tab));
    renderMasterTable();
  }));
  document.querySelector("#addPeriodBtn").addEventListener("click", addPeriod);
  document.querySelector("#periodGrid").addEventListener("change", (event) => {
    const timeInput = event.target.closest(".period-time");
    const teachingInput = event.target.closest(".period-teaching");
    if (timeInput) setPeriodTime(Number(timeInput.dataset.period), timeInput.value);
    if (teachingInput) updatePeriod(Number(teachingInput.dataset.period), { teaching: teachingInput.checked });
  });
  document.querySelector("#periodGrid").addEventListener("input", (event) => {
    const timeInput = event.target.closest(".period-time");
    if (timeInput) setPeriodTime(Number(timeInput.dataset.period), timeInput.value);
  });
  document.querySelector("#periodGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".remove-period");
    if (button) removePeriod(Number(button.dataset.period));
  });
  document.querySelector("#addTeacherBtn").addEventListener("click", () => openTeacherDialog());
  document.querySelector("#addSectionBtn").addEventListener("click", () => openSectionDialog());
  document.querySelector("#addSubjectBtn").addEventListener("click", () => openSubjectDialog());
  document.querySelector("#addRoomBtn").addEventListener("click", () => openRoomDialog());
  document.querySelector("#addTeacherAssignmentRow").addEventListener("click", addTeacherAssignmentRow);
  document.querySelector("#teacherAssignmentRows").addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-teacher-assignment");
    if (!removeButton) return;
    const row = removeButton.closest(".teacher-assignment-row");
    if (document.querySelectorAll(".teacher-assignment-row").length > 1) row.remove();
  });
  document.querySelector("#masterTable").addEventListener("click", (event) => {
    const editTeacher = event.target.closest(".edit-teacher");
    const editSection = event.target.closest(".edit-section");
    const editSubject = event.target.closest(".edit-subject");
    const editRoom = event.target.closest(".edit-room");
    const viewTeacher = event.target.closest(".view-teacher");
    const viewSection = event.target.closest(".view-section");
    const removeTeacherButton = event.target.closest(".remove-teacher");
    const removeSectionButton = event.target.closest(".remove-section");
    const removeSubjectButton = event.target.closest(".remove-subject");
    const removeRoomButton = event.target.closest(".remove-room");
    if (editTeacher) openTeacherDialog(editTeacher.dataset.id);
    if (editSection) openSectionDialog(editSection.dataset.id);
    if (editSubject) openSubjectDialog(editSubject.dataset.id);
    if (editRoom) openRoomDialog(editRoom.dataset.id);
    if (viewTeacher) showEntityTimetable("teacher", viewTeacher.dataset.id);
    if (viewSection) showEntityTimetable("section", viewSection.dataset.id);
    if (removeTeacherButton) removeTeacher(removeTeacherButton.dataset.id);
    if (removeSectionButton) removeSection(removeSectionButton.dataset.id);
    if (removeSubjectButton) removeSubject(removeSubjectButton.dataset.id);
    if (removeRoomButton) removeRoom(removeRoomButton.dataset.id);
  });
  document.querySelector("#viewMode").addEventListener("change", (event) => {
    state.viewMode = event.target.value;
    state.selectedEntity = "";
    renderTimetable();
  });
  document.querySelector("#entitySelect").addEventListener("change", (event) => {
    state.selectedEntity = event.target.value;
    renderTimetable();
  });
  document.querySelector("#timetableGrid").addEventListener("click", (event) => {
    const lesson = event.target.closest(".lesson");
    if (lesson) openMovePanel(lesson.dataset.entry);
  });
  document.querySelector("#movePanel").addEventListener("click", (event) => {
    const option = event.target.closest(".move-option");
    if (!option || !state.selectedEntryId) return;
    moveEntry(state.selectedEntryId, option.dataset.day, Number(option.dataset.period));
  });
  document.querySelector("#lockVisibleBtn").addEventListener("click", lockVisible);
  document.querySelector("#exportCsvBtn").addEventListener("click", exportCsv);
  document.querySelector("#downloadTemplateBtn").addEventListener("click", downloadAssignmentTemplate);
  document.querySelector("#addAssignmentBtn").addEventListener("click", () => document.querySelector("#assignmentDialog").showModal());
  document.querySelector("#saveAssignmentBtn").addEventListener("click", saveAssignment);
  document.querySelector("#saveTeacherBtn").addEventListener("click", saveTeacher);
  document.querySelector("#saveSectionBtn").addEventListener("click", saveSection);
  document.querySelector("#saveSubjectBtn").addEventListener("click", saveSubject);
  document.querySelector("#saveRoomBtn").addEventListener("click", saveRoom);
  document.querySelector("#recommendSubsBtn").addEventListener("click", recommendSubstitutes);
}

bindEvents();
loadSampleData();
