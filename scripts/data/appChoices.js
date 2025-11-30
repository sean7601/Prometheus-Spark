(function(ns) {
    // App definitions with their specific content variations
    ns.appChoices = {
        watchbill: {
            id: 'watchbill',
            name: 'Watchbill Manager',
            icon: '⏰',
            description: 'Manage watch schedules, assign sailors to duty slots, and track qualifications.',
            dataType: 'sailors, watches, and settings',
            csvColumns: 'Name, Rank, Section',
            sampleCsv: `Name,Rank,Section
Alex Smith,LT,Operations
Jordan Lee,LTJG,Maintenance`,
            downloadFilename: 'watchbill.html',
            jsonFilename: 'watchbill.json'
        },
        detailer: {
            id: 'detailer',
            name: 'Detailer Planner',
            icon: '📋',
            description: 'Track sailors, projected rotation dates, available billets, and build rotation plans.',
            dataType: 'sailors, billets, and rotation plans',
            csvColumns: 'Name, Rank, Current Billet, PRD (Projected Rotation Date)',
            sampleCsv: `Name,Rank,Current Billet,PRD
Alex Smith,LT,Operations Officer,2025-06
Jordan Lee,LTJG,Maintenance Lead,2025-09
Taylor Brown,ENS,Admin Officer,2026-01`,
            downloadFilename: 'detailer.html',
            jsonFilename: 'detailer.json'
        },
        testing: {
            id: 'testing',
            name: 'Test Builder',
            icon: '📝',
            description: 'Create tests with questions, administer them to students, and auto-grade submissions.',
            dataType: 'tests, questions, students, and submissions',
            csvColumns: 'Name, Email, Section',
            sampleCsv: `Name,Email,Section
Alex Smith,asmith@example.com,Section A
Jordan Lee,jlee@example.com,Section B
Taylor Brown,tbrown@example.com,Section A`,
            downloadFilename: 'testbuilder.html',
            jsonFilename: 'testbuilder.json'
        }
    };

    // Content templates that vary by app choice
    ns.appContent = {
        // Lesson 1 stays mostly the same but examples change
        lesson1Examples: {
            watchbill: {
                task: 'A watchbill manager for my squad.',
                context: 'There is a 30-minute turnover period.',
                format: 'A single index.html file with embedded CSS/JS, no external links.'
            },
            detailer: {
                task: 'A detailer planning tool for my command.',
                context: 'Sailors have projected rotation dates (PRD) that must be tracked.',
                format: 'A single index.html file with embedded CSS/JS, no external links.'
            },
            testing: {
                task: 'A test-building and grading app for my training program.',
                context: 'Tests should support multiple choice and auto-grading.',
                format: 'A single index.html file with embedded CSS/JS, no external links.'
            }
        },

        // Mission 1 prompt varies by app
        mission1Prompt: {
            watchbill: `Please generate a complete single-file offline web app (a single index.html) 
that I can save and open from file:// without any internet.

The app should let me:
- Add sailors (name, rank, section, quals)
- Edit or delete sailors
- View a simple month-style watchbill table (dates down the left, watch slots across the top)
- Assign sailors to each watch slot using dropdowns
- See a summary showing how many watches each sailor has

Requirements:
- Everything must be in one file: HTML, CSS, and JavaScript together
- No external libraries, fonts, or CDNs (no online links)
- Must run offline in a browser with no server
- Use clear comments in the code so a beginner can follow the logic

Please output ONLY the full index.html file, beginning with <!DOCTYPE html>.`,

            detailer: `Please generate a complete single-file offline web app (a single index.html) 
that I can save and open from file:// without any internet.

The app should let me:
- Add sailors (name, rank, current billet, projected rotation date/PRD)
- Edit or delete sailors
- Add available billets (title, location, required rank, availability date)
- View a timeline showing when each sailor rotates
- Create rotation plans by matching sailors to future billets
- See a summary showing upcoming rotations and unfilled billets

Requirements:
- Everything must be in one file: HTML, CSS, and JavaScript together
- No external libraries, fonts, or CDNs (no online links)
- Must run offline in a browser with no server
- Use clear comments in the code so a beginner can follow the logic

Please output ONLY the full index.html file, beginning with <!DOCTYPE html>.`,

            testing: `Please generate a complete single-file offline web app (a single index.html) 
that I can save and open from file:// without any internet.

The app should let me:
- Create tests with a title and description
- Add multiple-choice questions to each test (question text, 4 options, correct answer)
- Add students (name, email, section)
- Have students take tests (select answers for each question)
- Auto-grade submissions and show scores
- See a summary of all test results by student

Requirements:
- Everything must be in one file: HTML, CSS, and JavaScript together
- No external libraries, fonts, or CDNs (no online links)
- Must run offline in a browser with no server
- Use clear comments in the code so a beginner can follow the logic

Please output ONLY the full index.html file, beginning with <!DOCTYPE html>.`
        },

        // Mission 2 (granularity) prompt varies by app
        mission2Prompt: {
            watchbill: `Please update the current offline watchbill app to support more detailed watch definitions.

The user should be able to:
1. Define how long each watch is (in hours).
2. Select which days it is on (weekdays only, weekends only, every day, specific days, etc.).
3. Define what qualifications are required for that watch.

Keep all existing core features working (adding/editing sailors, assigning watches, and the summary view), and add these new capabilities in a clear and simple way.

Return a complete, updated index.html file that still:
- Runs from file:// (no server)
- Uses no external libraries or CDNs
- Includes HTML, CSS, and JavaScript in a single file.`,

            detailer: `Please update the current offline detailer app to support more detailed billet and rotation management.

The user should be able to:
1. Define billet requirements (required qualifications, sea/shore duty type, priority level).
2. Set sailor preferences (preferred locations, duty type preferences).
3. Add notes and status tracking for each rotation plan entry.

Keep all existing core features working (adding/editing sailors, managing billets, creating rotation plans), and add these new capabilities in a clear and simple way.

Return a complete, updated index.html file that still:
- Runs from file:// (no server)
- Uses no external libraries or CDNs
- Includes HTML, CSS, and JavaScript in a single file.`,

            testing: `Please update the current offline testing app to support more detailed test configuration.

The user should be able to:
1. Set time limits for each test (in minutes).
2. Choose question types (multiple choice, true/false, short answer).
3. Assign point values to individual questions.
4. Shuffle question order for each student.

Keep all existing core features working (creating tests, adding questions, student submissions, auto-grading), and add these new capabilities in a clear and simple way.

Return a complete, updated index.html file that still:
- Runs from file:// (no server)
- Uses no external libraries or CDNs
- Includes HTML, CSS, and JavaScript in a single file.`
        },

        // Mission 4 (JSON save/load) prompt varies by app
        mission4Prompt: {
            watchbill: `Please modify this offline watchbill app to support saving and loading all data using JSON files.

Add:
- A "Download Watchbill JSON" button that serializes the entire app state (sailors, watches, and settings) into a JSON file and triggers a download.
- An "Upload Watchbill JSON" button that lets me pick a JSON file and restores that state into the app.

Requirements:
- It must still run from file:// with no server.
- Do not use external libraries or CDNs.
- If there is existing data on the screen, loading JSON should replace it.

Return a complete, updated index.html file with clear comments explaining how the save and load functions work.`,

            detailer: `Please modify this offline detailer app to support saving and loading all data using JSON files.

Add:
- A "Download Plan JSON" button that serializes the entire app state (sailors, billets, rotation plans, and settings) into a JSON file and triggers a download.
- An "Upload Plan JSON" button that lets me pick a JSON file and restores that state into the app.

Requirements:
- It must still run from file:// with no server.
- Do not use external libraries or CDNs.
- If there is existing data on the screen, loading JSON should replace it.

Return a complete, updated index.html file with clear comments explaining how the save and load functions work.`,

            testing: `Please modify this offline testing app to support saving and loading all data using JSON files.

Add:
- A "Download Tests JSON" button that serializes the entire app state (tests, questions, students, and submissions) into a JSON file and triggers a download.
- An "Upload Tests JSON" button that lets me pick a JSON file and restores that state into the app.

Requirements:
- It must still run from file:// with no server.
- Do not use external libraries or CDNs.
- If there is existing data on the screen, loading JSON should replace it.

Return a complete, updated index.html file with clear comments explaining how the save and load functions work.`
        },

        // Mission 5: Test Data Generation prompt varies by app
        mission5TestDataPrompt: {
            watchbill: `Please add a "Generate Test Data" feature to this offline watchbill app.

Add a button called "Generate Test Data" that, when clicked:
1. Creates 10-15 sample sailors with realistic fake names, random ranks (E1-E9, O1-O6), and random sections (Alpha, Bravo, Charlie, Delta).
2. Creates sample watch types if the app supports them (e.g., "OOD", "JOOD", "Duty Driver").
3. Randomly assigns some sailors to watch slots for the current week.
4. Shows a confirmation message when test data is loaded.

This is for testing and demonstration purposes. 

Requirements:
- Keep all existing features working (JSON save/load, etc.).
- No external libraries.
- Add the button somewhere easy to find (like near other data management buttons).

Return the full updated index.html.`,

            detailer: `Please add a "Generate Test Data" feature to this offline detailer app.

Add a button called "Generate Test Data" that, when clicked:
1. Creates 10-15 sample sailors with realistic fake names, random ranks, current billets, and PRDs spread over the next 18 months.
2. Creates 8-12 sample available billets with different locations, required ranks, and availability dates.
3. Optionally creates 2-3 sample rotation plan entries matching sailors to billets.
4. Shows a confirmation message when test data is loaded.

This is for testing and demonstration purposes. 

Requirements:
- Keep all existing features working (JSON save/load, etc.).
- No external libraries.
- Add the button somewhere easy to find (like near other data management buttons).

Return the full updated index.html.`,

            testing: `Please add a "Generate Test Data" feature to this offline testing app.

Add a button called "Generate Test Data" that, when clicked:
1. Creates 10-15 sample students with realistic fake names, email addresses, and sections (Section A, B, or C).
2. Creates 2-3 sample tests with 5-8 multiple-choice questions each, complete with answer options and correct answers marked.
3. Creates sample submissions for some students with randomized answers (some correct, some wrong) so you can see grading in action.
4. Shows a confirmation message when test data is loaded.

This is for testing and demonstration purposes.

Requirements:
- Keep all existing features working (JSON save/load, etc.).
- No external libraries.
- Add the button somewhere easy to find (like near other data management buttons).

Return the full updated index.html.`
        },

        // Mission 5A (UX layout) prompt varies by app
        mission5aPrompt: {
            watchbill: `Please improve the layout and styling of this offline watchbill app.

Goals:
- Use a simple, readable dark theme.
- Put the sailor roster and configuration controls on the LEFT.
- Put the calendar/watchbill view on the RIGHT.
- Keep global actions (save/load, JSON, etc.) in a consistent location (for example, a top or bottom bar).
- Use headings, spacing, and simple borders so it is obvious where to start.

Requirements:
- Keep ALL existing functionality working (adding/editing sailors, assigning watches, JSON save/load, etc.).
- Do NOT add any external libraries or CDNs.
- Keep everything in a single index.html file that runs from file://.

Return the full updated index.html file with brief comments marking the main layout sections.`,

            detailer: `Please improve the layout and styling of this offline detailer app.

Goals:
- Use a simple, readable dark theme.
- Put the sailor roster and billet list on the LEFT.
- Put the rotation timeline and planning view on the RIGHT.
- Keep global actions (save/load, JSON, etc.) in a consistent location (for example, a top or bottom bar).
- Use headings, spacing, and simple borders so it is obvious where to start.

Requirements:
- Keep ALL existing functionality working (adding/editing sailors, managing billets, rotation plans, JSON save/load, etc.).
- Do NOT add any external libraries or CDNs.
- Keep everything in a single index.html file that runs from file://.

Return the full updated index.html file with brief comments marking the main layout sections.`,

            testing: `Please improve the layout and styling of this offline testing app.

Goals:
- Use a simple, readable dark theme.
- Put test management and student roster on the LEFT.
- Put the test-taking view and results on the RIGHT.
- Keep global actions (save/load, JSON, etc.) in a consistent location (for example, a top or bottom bar).
- Use headings, spacing, and simple borders so it is obvious where to start.

Requirements:
- Keep ALL existing functionality working (creating tests, adding questions, student submissions, grading, JSON save/load, etc.).
- Do NOT add any external libraries or CDNs.
- Keep everything in a single index.html file that runs from file://.

Return the full updated index.html file with brief comments marking the main layout sections.`
        },

        // Mission 5B (smart UX) prompt varies by app
        mission5bPrompt: {
            watchbill: `Please update the app to add "Smart UX" features for safety and convenience.

1. **Conflict Detection:**
   - If I assign the same sailor to two watches on the same day (or overlapping times), highlight their name in RED and show a warning message near the watchbill.

2. **Undo/Redo:**
   - Add "Undo" and "Redo" buttons at the top.
   - These should track changes to the roster and watch assignments so I can step back if I make a mistake.

Requirements:
- Keep the dark theme and 2-column layout.
- Keep all existing features (JSON save/load, etc.).
- No external libraries.

Return the full updated index.html.`,

            detailer: `Please update the app to add "Smart UX" features for safety and convenience.

1. **Conflict Detection:**
   - If I assign the same sailor to multiple billets with overlapping dates, highlight their name in RED and show a warning message.
   - If a billet is assigned to someone whose rank doesn't match requirements, show a warning.

2. **Undo/Redo:**
   - Add "Undo" and "Redo" buttons at the top.
   - These should track changes to sailors, billets, and rotation plans so I can step back if I make a mistake.

Requirements:
- Keep the dark theme and 2-column layout.
- Keep all existing features (JSON save/load, etc.).
- No external libraries.

Return the full updated index.html.`,

            testing: `Please update the app to add "Smart UX" features for safety and convenience.

1. **Validation & Warnings:**
   - If a test has no questions, show a warning when trying to administer it.
   - If a question has no correct answer marked, highlight it in RED.
   - Show a confirmation before deleting tests with existing submissions.

2. **Undo/Redo:**
   - Add "Undo" and "Redo" buttons at the top.
   - These should track changes to tests, questions, and student data so I can step back if I make a mistake.

Requirements:
- Keep the dark theme and 2-column layout.
- Keep all existing features (JSON save/load, etc.).
- No external libraries.

Return the full updated index.html.`
        },

        // Mission 6 (CSV import) prompt varies by app
        mission6Prompt: {
            watchbill: `Please update this offline watchbill app to support loading a sailor roster from a CSV file.

Add:
- A "Load Roster CSV" button.
- When I choose a CSV file with columns "Name,Rank,Section", parse it and populate the roster automatically.

Requirements:
- Keep the existing UX layout (roster and controls on the left, calendar on the right).
- Do not break JSON save/load or any existing features.
- Safely ignore any extra columns beyond Name, Rank, and Section.
- The app must remain a single index.html file with no external libraries or CDNs.
- It must still run offline from file://.

Return the full updated index.html file. Include brief comments near the CSV parsing code describing what it does.`,

            detailer: `Please update this offline detailer app to support loading sailors from a CSV file.

Add:
- A "Load Sailors CSV" button.
- When I choose a CSV file with columns "Name,Rank,Current Billet,PRD", parse it and populate the sailor list automatically.

Requirements:
- Keep the existing UX layout (roster and billets on the left, timeline on the right).
- Do not break JSON save/load or any existing features.
- Safely ignore any extra columns beyond Name, Rank, Current Billet, and PRD.
- The app must remain a single index.html file with no external libraries or CDNs.
- It must still run offline from file://.

Return the full updated index.html file. Include brief comments near the CSV parsing code describing what it does.`,

            testing: `Please update this offline testing app to support loading students from a CSV file.

Add:
- A "Load Students CSV" button.
- When I choose a CSV file with columns "Name,Email,Section", parse it and populate the student list automatically.

Requirements:
- Keep the existing UX layout (test management on the left, test-taking view on the right).
- Do not break JSON save/load or any existing features.
- Safely ignore any extra columns beyond Name, Email, and Section.
- The app must remain a single index.html file with no external libraries or CDNs.
- It must still run offline from file://.

Return the full updated index.html file. Include brief comments near the CSV parsing code describing what it does.`
        },

        // Mission 7 (algorithm) prompt varies by app
        mission7Prompt: {
            watchbill: `Please add an "Auto-Fill Watchbill" button to the app.

When clicked, it should:
1. Automatically assign sailors to empty watch slots.
2. Follow these rules:
   - Distribute watches as evenly as possible (fairness).
   - Do not assign the same person to two watches in a row.
   - Respect the qualifications required for each watch (if defined).

Requirements:
- Keep all existing features and layout.
- No external libraries.

Return the full updated index.html.`,

            detailer: `Please add an "Auto-Match Rotations" button to the app.

When clicked, it should:
1. Automatically suggest sailor-to-billet matches for sailors approaching their PRD.
2. Follow these rules:
   - Match sailors to billets that align with their PRD (within 3 months).
   - Respect rank requirements for each billet.
   - Prioritize filling high-priority billets first.
   - Consider sailor preferences if defined.

Requirements:
- Keep all existing features and layout.
- No external libraries.

Return the full updated index.html.`,

            testing: `Please add an "Auto-Generate Report" button to the app.

When clicked, it should:
1. Automatically generate a comprehensive results report for all tests.
2. Include:
   - Average score per test
   - Score distribution (how many A's, B's, C's, etc.)
   - Questions most frequently missed
   - Student rankings by overall performance

Requirements:
- Keep all existing features and layout.
- No external libraries.

Return the full updated index.html.`
        },

        // Mission 8 (print styles) prompt varies by app
        mission8Prompt: {
            watchbill: `Please add "Print Styles" to the CSS.

When I print the page (Ctrl+P):
- Hide all buttons, inputs, and the sidebar (roster).
- Show ONLY the watchbill table.
- Change the background to white and text to black (to save ink).
- Make sure the table borders are crisp and visible on paper.

Requirements:
- The app should still look like a dark-mode web app on the screen.
- The print styles should only apply when printing (@media print).
- Keep all existing functionality.

Return the full updated index.html.`,

            detailer: `Please add "Print Styles" to the CSS.

When I print the page (Ctrl+P):
- Hide all buttons, inputs, and the sidebar.
- Show ONLY the rotation plan/timeline.
- Change the background to white and text to black (to save ink).
- Make sure borders and dates are crisp and visible on paper.

Requirements:
- The app should still look like a dark-mode web app on the screen.
- The print styles should only apply when printing (@media print).
- Keep all existing functionality.

Return the full updated index.html.`,

            testing: `Please add "Print Styles" to the CSS.

When I print the page (Ctrl+P):
- Hide all buttons, inputs, and navigation.
- Show ONLY the test content (for printing blank tests) OR the results summary (for printing grades).
- Change the background to white and text to black (to save ink).
- Make sure questions and answer choices are clearly formatted on paper.

Requirements:
- The app should still look like a dark-mode web app on the screen.
- The print styles should only apply when printing (@media print).
- Keep all existing functionality.

Return the full updated index.html.`
        },

        // Mission 9 (visualization) prompt varies by app
        mission9Prompt: {
            watchbill: `Please add a "Workload Stats" section below the watchbill.

It should:
- Show a list of sailors.
- Next to each name, show a horizontal bar representing how many hours (or watches) they are assigned.
- Use simple HTML/CSS for the bars (no chart libraries).
- Update automatically when the watchbill changes.

Requirements:
- Keep the dark theme and existing layout.
- Keep all other features working.

Return the full updated index.html.`,

            detailer: `Please add a "Rotation Stats" section below the timeline.

It should:
- Show a visual summary of upcoming rotations by month.
- Show a bar chart of billets by status (filled, pending, vacant).
- Use simple HTML/CSS for the bars (no chart libraries).
- Update automatically when rotation plans change.

Requirements:
- Keep the dark theme and existing layout.
- Keep all other features working.

Return the full updated index.html.`,

            testing: `Please add a "Performance Dashboard" section below the test results.

It should:
- Show a bar chart of average scores by test.
- Show a bar chart of score distribution (90-100, 80-89, etc.).
- Use simple HTML/CSS for the bars (no chart libraries).
- Update automatically when new submissions are graded.

Requirements:
- Keep the dark theme and existing layout.
- Keep all other features working.

Return the full updated index.html.`
        },

        // Diagram labels for data flow lesson
        dataFlowLabels: {
            watchbill: {
                computerA: 'App open with current watchbill',
                download: '⬇ Download JSON',
                file: 'watchbill.json',
                fileDesc: 'Saved / emailed / shared',
                upload: '⬇ Upload JSON',
                computerB: 'App now shows the same watchbill state'
            },
            detailer: {
                computerA: 'App open with current rotation plan',
                download: '⬇ Download JSON',
                file: 'detailer.json',
                fileDesc: 'Saved / emailed / shared',
                upload: '⬇ Upload JSON',
                computerB: 'App now shows the same rotation plan'
            },
            testing: {
                computerA: 'App open with current tests & results',
                download: '⬇ Download JSON',
                file: 'testbuilder.json',
                fileDesc: 'Saved / emailed / shared',
                upload: '⬇ Upload JSON',
                computerB: 'App now shows the same tests & results'
            }
        },

        // Final mission complete text varies by app
        missionCompleteDownloadLabel: {
            watchbill: 'Download watchbill.html from current code',
            detailer: 'Download detailer.html from current code',
            testing: 'Download testbuilder.html from current code'
        }
    };

    // Helper to get content for current app choice
    ns.getAppContent = function(contentKey, subKey) {
        const selectedApp = ns.appState?.selectedApp || 'watchbill';
        const content = ns.appContent[contentKey];
        if (!content) return null;
        
        if (subKey) {
            return content[selectedApp]?.[subKey] || content.watchbill?.[subKey];
        }
        return content[selectedApp] || content.watchbill;
    };

    ns.getAppChoice = function() {
        const selectedApp = ns.appState?.selectedApp || 'watchbill';
        return ns.appChoices[selectedApp] || ns.appChoices.watchbill;
    };

})(window.vibeApp = window.vibeApp || {});
