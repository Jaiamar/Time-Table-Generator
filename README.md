# CBSE School Timetable Generator

This is a self-contained browser MVP based on the supplied documentation.

## What is included

- Dedicated Master Data page for teachers, sections, subjects, rooms, and assignments.
- Add/edit/remove controls for subjects and rooms.
- Editable period timings, add/remove periods, and per-section periods-per-day.
- Add/edit/remove teachers and add/edit/rename/remove class sections.
- Assign specific subject + class/section combinations to each teacher from the teacher form.
- Many-to-many teaching assignment model.
- Validation for missing data, workload overload, availability, rooms, and section capacity.
- Constraint-based timetable generation with teacher, section, room, availability, block-length, daily-limit, and preference rules.
- Class-wise, teacher-wise, and room-wise timetable views.
- Teacher and section rows include direct timetable shortcuts.
- Manual move suggestions with live conflict checking.
- Lock visible timetable entries for partial regeneration.
- Teacher workload and room utilization reports.
- CSV export and assignment CSV template download.
- Substitution recommendations for teacher absences.

## Run

Open `index.html` in a browser, or run a local server from this folder:

```powershell
python -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

The app loads sample CBSE data automatically. Use **Generate Timetable** to create a candidate version.

## Notes

The documentation recommends OR-Tools CP-SAT for production scale. This MVP uses a deterministic browser-side constructive scheduler so it can run without installing a backend. A production build should move generation into an isolated worker service backed by PostgreSQL, Redis, and OR-Tools CP-SAT.
