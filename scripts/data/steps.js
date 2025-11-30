(function(ns) {

// Helper function to get dynamic content
function getContent(key) {
    return ns.getAppContent ? ns.getAppContent(key) : null;
}

function getChoice() {
    return ns.getAppChoice ? ns.getAppChoice() : { id: 'watchbill', name: 'Watchbill Manager', csvColumns: 'Name, Rank, Section', sampleCsv: 'Name,Rank,Section\nAlex Smith,LT,Operations', downloadFilename: 'watchbill.html' };
}

// Function to build steps dynamically based on selected app
ns.buildSteps = function() {
    const choice = getChoice();
    
    return [
    {
        title: "Lesson 1: The TCF Framework",
        type: "lesson",
        mode: "focus",
        text: function() {
            const examples = getContent('lesson1Examples') || {
                task: 'A watchbill manager for my squad.',
                context: 'There is a 30-minute turnover period.',
                format: 'A single index.html file with embedded CSS/JS, no external links.'
            };
            return `
            <span class="lesson-badge">THEORY</span>
            <p>To get usable code from AI, you need to structure your request instead of just saying "build me an app." We use the <strong>TCF Framework</strong>:</p>
            <ul>
                <li><strong>Task (T):</strong> The plain-language description of what the app should do.<br><em>Example: "${examples.task}"</em></li>
                <li><strong>Context (C):</strong> The real-world constraints and rules the AI cannot guess.<br><em>Example: "${examples.context}"</em></li>
                <li><strong>Format (F):</strong> The exact shape of the output you want.<br><em>Example: "${examples.format}"</em></li>
            </ul>
            <p><strong>Why this matters:</strong></p>
            <ul>
                <li>Without <strong>Task</strong>, the AI does not know what problem you are solving.</li>
                <li>Without <strong>Context</strong>, the AI builds a generic app that does not fit your environment.</li>
                <li>Without <strong>Format</strong>, the AI may give you code in a language or structure you cannot actually run.</li>
            </ul>
            <p><strong>Safety Reminder:</strong> When you practice, use fake or anonymized data. Do not paste classified information, PII, or real schedules into AI tools. Treat AI prompts like you are sending an email to an external partner.</p>
        `;
        }
    },
    {
        title: "Mission 1: The First Prompt",
        type: "action",
        mode: "focus",
        text: `
            <span class="lesson-badge">ACTION</span>
            <p>Now you will write your first structured prompt using TCF. This prompt asks for a complete, offline prototype.</p>
            <p><strong>Do this before you click Next:</strong></p>
            <ol>
                <li>Open AI Studio using the button above (or any chat-style coding assistant you have).</li>
                <li>Copy the entire prompt below, from the first line through the last line.</li>
                <li>Paste it into AI Studio and send it.</li>
                <li>Wait for the AI to return a full HTML file that starts with <code>&lt;!DOCTYPE html&gt;</code>.</li>
            </ol>
            <p>If the AI explains things first and then shows code, scroll until you see the beginning of the HTML file and copy from there.</p>
        `,
        prompt: function() {
            return getContent('mission1Prompt');
        }
    },
    {
        title: "Mission 1: Assembly",
        type: "action",
        mode: "workbench",
        text: `
            <span class="lesson-badge">BUILD</span>
            <p><strong>Time to assemble your first prototype.</strong></p>
            <p><strong>Step-by-step:</strong></p>
            <ol>
                <li>In AI Studio, select all the code starting at <code>&lt;!DOCTYPE html&gt;</code> and ending at the very last line of the file.</li>
                <li>Copy that code.</li>
                <li>Click in the <strong>STAGING_AREA (Paste Code)</strong> panel on the right.</li>
                <li>Paste the code so it completely replaces whatever is in the box.</li>
                <li>Click <strong>RUN CODE</strong> at the top right.</li>
            </ol>
            <p>You should now see your raw, functional prototype in the LIVE_PREVIEW tab. It might be ugly and imperfect, but that is expected. The goal of this step is <strong>working structure</strong>, not perfection.</p>
            <p>If nothing appears, or the preview is blank, keep going. Later missions will show you how to debug and improve it.</p>
        `
    },
    {
        title: "Debrief: Prompting",
        type: "quiz",
        mode: "workbench",
        text: "<p>Quick check: did the TCF pieces land the way we want them to?</p>",
        questions: [
            {
                q: "In the TCF framework, where does 'Must work offline from file://' belong?",
                options: [
                    "Task (what the app does)",
                    "Context (environment and constraints)",
                    "Format (output structure and file type)"
                ],
                correct: 1,
                explain: "Context is where you tell the AI about your environment: offline use, security limits, time constraints, or anything it cannot guess."
            },
            {
                q: "Why did we specify 'Single index.html file' and 'no external libraries or CDNs' in the prompt?",
                options: [
                    "It makes the code mathematically faster",
                    "It keeps the app portable so we can run it from file:// or send it as a single attachment",
                    "The AI charges less for single files"
                ],
                correct: 1,
                explain: "Specifying the Format makes the output usable in your real environment: one file you can save, open offline, and share without needing a server."
            },
            {
                q: "If you forget to specify the Format, which of these problems is most likely?",
                options: [
                    "The AI refuses to answer at all",
                    "You get code in a language or structure you cannot easily run (for example, a multi-file React app)",
                    "Your browser will not allow you to press F12"
                ],
                correct: 1,
                explain: "Without a clear Format, the AI might choose any reasonable approach, including frameworks or backends you did not plan to use."
            },
            {
                q: "Which of these is the safest way to use real-world details in your prompts?",
                options: [
                    "Paste full names, real SSNs, and real schedules so the AI has 'real data'",
                    "Use anonymized or fake-but-realistic data that keeps the structure but removes sensitive information",
                    "Only send screenshots so the AI cannot see the actual text"
                ],
                correct: 1,
                explain: "Anonymized or fake-but-realistic data lets you practice the workflow while protecting sensitive information."
            }
        ]
    },
    {
        title: "Mission 2: Adding Granularity",
        type: "action",
        mode: "workbench",
        text: `
            <span class="lesson-badge">ITERATION</span>
            <p>The first version is just a skeleton. Now we teach the AI more of your real-world rules by giving it extra Context.</p>
            <p><strong>Goal:</strong> Add more detailed control over how the app works.</p>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Copy the follow-up prompt below.</li>
                <li>Paste it into the <strong>same</strong> AI Studio chat that produced your first version, so it remembers that code.</li>
                <li>Let the AI regenerate the <strong>entire</strong> index.html file.</li>
                <li>Copy the new code (again starting from <code>&lt;!DOCTYPE html&gt;</code>), replace the code in the STAGING_AREA, and click <strong>RUN CODE</strong>.</li>
            </ol>
            <p>If the AI removes features you still need, you can always tell it explicitly in a follow-up message: "Keep all existing features working and add the new ones."</p>
        `,
        prompt: function() {
            return getContent('mission2Prompt');
        }
    },
    {
        title: "Debrief: Iteration",
        type: "quiz",
        mode: "workbench",
        text: "<p>System Check: Why did we avoid asking for everything in one huge prompt?</p>",
        questions: [
            {
                q: "Why didn't we ask for all the detailed rules in the very first prompt?",
                options: [
                    "To save a few seconds of typing",
                    "Because very dense 'do everything at once' prompts can make it harder for the AI to organize the solution cleanly",
                    "The AI cannot physically process long prompts"
                ],
                correct: 1,
                explain: "Building in layers is usually more reliable. A clear skeleton first, then focused follow-up prompts for details, makes it easier for the model (and for you) to reason about what changed."
            },
            {
                q: "If a follow-on prompt accidentally breaks a feature that used to work, what is the best first move?",
                options: [
                    "Delete everything and start over from scratch",
                    "Tell the AI exactly what used to work, what changed, and ask it to restore the lost behavior while keeping new features",
                    "Stop using AI entirely and switch to hand-coding"
                ],
                correct: 1,
                explain: "Describing what used to work and what broke helps the AI compare versions and repair the regression without losing new improvements."
            },
            {
                q: "What is one major advantage of iterating in small, focused prompts?",
                options: [
                    "It guarantees that the AI will never make a mistake",
                    "It makes it easier to see which change introduced a new bug or improvement",
                    "It automatically documents the code in perfect detail"
                ],
                correct: 1,
                explain: "When each prompt represents a small change, it is easier to connect that change to any new behavior you see in the app."
            }
        ]
    },
    {
        title: "Lesson: The Debugging Mindset",
        type: "lesson",
        mode: "workbench",
        text: `
            <span class="lesson-badge">SKILL</span>
            <p>You click a button. Nothing happens. That does not mean you failed. It means you found a <strong>bug</strong> that you can learn from.</p>
            <p>To fix it, you need to see what the browser saw. That is what the Developer Tools Console is for.</p>
            
            <div class="diagram-container">
                <div class="browser-mockup">
                    <div class="browser-header">My App - Chrome</div>
                    <div class="browser-body">
                        <p>Clicking this does nothing:</p>
                        <button class="mock-btn">Add Item</button>
                        
                        <div class="console-drawer">
                            <div class="console-tab">Console</div>
                            <div class="error-msg">x Uncaught ReferenceError: addItem is not defined</div>
                            <div style="color:#666">&gt; _</div>
                        </div>
                    </div>
                </div>
                <p style="margin-top:10px">
                    Open the Developer Tools:
                    <br>
                    <span class="key-cap">F12</span>
                    or Right-click the page → <strong>Inspect</strong> → click the <strong>Console</strong> tab.
                </p>
            </div>
            
            <p><strong>Debug Loop:</strong></p>
            <ol>
                <li>Reproduce the problem (click the button again).</li>
                <li>Look at the Console and find the <span style="color: var(--error);">red error text</span>.</li>
                <li>Highlight and copy the full error message, including the error type and any function or variable names.</li>
                <li>Send a short, structured prompt to the AI that includes what you did and what the Console says.</li>
            </ol>

            <div class="prompt-container">
                <div class="prompt-label">DEBUG PROMPT TEMPLATE</div>
                <div class="prompt-text">What doesn't work:
Describe exactly what you clicked, what you expected, and what you actually saw.
Example:
I clicked "Add" and nothing happened. I expected a new item to appear in the list.

What the console says:
Paste the full red error message from the Console.
Example:
Uncaught ReferenceError: addItem is not defined at HTMLButtonElement.onclick</div>
            </div>

            <p>Using this two-line structure keeps your debug prompts clear and repeatable, so the AI has everything it needs to help you fix the bug.</p>
        `
    },
    {
        title: "Mission 3: Practicing a Fix",
        type: "action",
        mode: "workbench",
        text: `
            <span class="lesson-badge">PRACTICE</span>
            <p>We will simulate a common bug: the button is wired to a function name that does not exist.</p>
            <p><strong>Goal:</strong> Practice sending a clear, two-part debug prompt.</p>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Copy the prompt below.</li>
                <li>Paste it into your AI chat.</li>
                <li>Read how the AI explains the bug and proposes a fix.</li>
            </ol>
            <p>You are practicing the pattern here, not necessarily fixing your real app yet.</p>
        `,
        prompt: `What doesn't work:
I clicked "Add" and nothing happened. I expected a new item to appear in the list.

What the console says:
Uncaught ReferenceError: addItem is not defined at HTMLButtonElement.onclick

Please:
1. Explain the root cause of this error in plain language for a non-programmer.
2. Then give me a corrected version of the ENTIRE index.html file that fixes this problem, keeping all existing features working.`
    },
    {
        title: "Debrief: Debugging",
        type: "quiz",
        mode: "workbench",
        text: "<p>System Check: When something breaks, what do we actually send to the AI?</p>",
        questions: [
            {
                q: "What is the most useful information to give the AI when your app is broken?",
                options: [
                    "'It doesn't work'",
                    "The red error text from the F12 Console, copied as text",
                    "A screenshot of the button you clicked"
                ],
                correct: 1,
                explain: "The console error message usually includes the type of error, the function or variable name, and sometimes a line number. That gives the AI a precise starting point to diagnose the bug."
            },
            {
                q: "Which of these is the best first move before you send a debug prompt?",
                options: [
                    "Click randomly around the app hoping it fixes itself",
                    "Reproduce the issue once on purpose, then immediately check and copy the Console error",
                    "Close the browser so the error goes away"
                ],
                correct: 1,
                explain: "Reproducing the issue and copying the Console error gives you a clean, recent snapshot of what actually went wrong."
            },
            {
                q: "Where do you usually find the Console for a web page?",
                options: [
                    "In the browser's Bookmarks menu",
                    "In Developer Tools (F12 or Right-click → Inspect → Console tab)",
                    "In the system's file explorer"
                ],
                correct: 1,
                explain: "The Console lives inside the browser's Developer Tools. Learning one reliable way to open it (like F12) is an important habit."
            }
        ]
    },
    {
        title: "Lesson: Data & JSON",
        type: "lesson",
        mode: "workbench",
        text: function() {
            const labels = getContent('dataFlowLabels') || {
                computerA: 'App open with current data',
                download: '⬇ Download JSON',
                file: 'data.json',
                fileDesc: 'Saved / emailed / shared',
                upload: '⬇ Upload JSON',
                computerB: 'App now shows the same data'
            };
            return `
            <span class="lesson-badge">THEORY</span>
            <p>By default, when you refresh or close a page, the data stored in its memory disappears unless you add extra code to save it.</p>
            <p>There are a few ways to save data in a browser. In this course, we focus on one simple, portable option: <strong>JSON files</strong>.</p>
            
            <div class="diagram-container">
                <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; align-items:center; font-size:0.75rem;">
                    <div class="flow-step" style="width:40%; min-width:180px; border-color:#fff; color:#fff;">
                        Computer A
                        <br>
                        <span style="font-size:0.7rem; color:#ccc;">${labels.computerA}</span>
                    </div>
                    <div class="flow-arrow">${labels.download}</div>
                    <div class="flow-step" style="border-style:dashed; width:40%; min-width:180px;">
                        ${labels.file}
                        <br>
                        <span style="font-size:0.7rem; color:#ccc;">${labels.fileDesc}</span>
                    </div>
                    <div class="flow-arrow">${labels.upload}</div>
                    <div class="flow-step" style="width:40%; min-width:180px;">
                        Computer B
                        <br>
                        <span style="font-size:0.7rem; color:#ccc;">${labels.computerB}</span>
                    </div>
                </div>
            </div>

            <p><strong>Key idea:</strong> JSON is just structured text that represents data (lists, objects, etc.). You can:</p>
            <ul>
                <li>Download it to your own computer as a file.</li>
                <li>Share it with someone else (for example by email or a shared drive).</li>
                <li>Upload it back into the app later, on your computer or theirs, to restore the same state.</li>
            </ul>
            <p>This turns your local device(s) into the "database" for the app without needing a remote server.</p>
        `;
        }
    },
    {
        title: "Mission 4: Save and Load with JSON",
        type: "action",
        mode: "workbench",
        text: `
            <span class="lesson-badge">ACTION</span>
            <p><strong>Goal:</strong> Add buttons to save the entire app state to a JSON file and restore it later.</p>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Make sure the latest version of your app code is in the STAGING_AREA.</li>
                <li>Copy the prompt below into the <strong>same</strong> AI Studio chat.</li>
                <li>Let the AI regenerate the full index.html file with Save/Load features.</li>
                <li>Paste the new code into the STAGING_AREA and click <strong>RUN CODE</strong>.</li>
                <li>Test the new buttons by adding some sample data, downloading JSON, refreshing, and then uploading the same file.</li>
            </ol>
        `,
        prompt: function() {
            return getContent('mission4Prompt');
        }
    },
    {
        title: "Debrief: Data Persistence",
        type: "quiz",
        mode: "workbench",
        text: "<p>System Check: Where does your data actually live now?</p>",
        questions: [
            {
                q: "In this style of offline app, where does your data live during and after a session?",
                options: [
                    "In the browser's memory while the page is open, and in JSON files you save for long-term storage",
                    "In a hidden Google Cloud database that the browser connects to",
                    "Inside the HTML tags themselves"
                ],
                correct: 0,
                explain: "While the page is open, data lives in variables in memory. When you click download, you export that state as JSON to a file on your device so you can close the page and restore it later."
            },
            {
                q: "What is JSON, in practical terms?",
                options: [
                    "A full programming language",
                    "A text-based format for representing data (like objects and lists)",
                    "A specific brand of database"
                ],
                correct: 1,
                explain: "JSON is plain text in a structured format. Many tools and languages can read and write JSON, which is why it's great for moving data between systems."
            },
            {
                q: "If you email a JSON file exported from Computer A to Computer B, what should happen when Computer B uploads it into the same app?",
                options: [
                    "The app on Computer B should show the same data that existed on Computer A when the file was downloaded",
                    "The app will ignore the file because it came from a different computer",
                    "The browser will automatically install a new database system"
                ],
                correct: 0,
                explain: "JSON is portable: as long as the receiving app expects the same data shape, it can load state that was created on another machine."
            },
            {
                q: "If the JSON file is missing some newer fields that the app expects, what is the safest behavior?",
                options: [
                    "Crash immediately without explanation",
                    "Try to load what it can, leave new fields at default values, and let the user know if anything couldn't be restored exactly",
                    "Silently make up random data for the missing fields"
                ],
                correct: 1,
                explain: "A robust app should handle older files gracefully: use defaults for missing fields and, if possible, tell the user what happened."
            }
        ]
    },
    {
        title: "Lesson: Testing with Sample Data",
        type: "lesson",
        mode: "workbench",
        text: function() {
            const choice = getChoice();
            let dataExamples = '';
            if (choice.id === 'watchbill') {
                dataExamples = `
                <li>Sailors with different ranks (E1-E9, O1-O6)</li>
                <li>Multiple sections (Alpha, Bravo, Charlie)</li>
                <li>Various watch types and time slots</li>
                <li>Some pre-filled assignments to see conflicts</li>`;
            } else if (choice.id === 'detailer') {
                dataExamples = `
                <li>Sailors with PRDs spread across the next 18 months</li>
                <li>Available billets at different locations</li>
                <li>A mix of ranks and duty types</li>
                <li>Some rotation plans already in progress</li>`;
            } else {
                dataExamples = `
                <li>Students in different sections</li>
                <li>Tests with various question types</li>
                <li>Sample submissions with mixed scores</li>
                <li>Enough data to see grading and reports work</li>`;
            }
            
            return `
            <span class="lesson-badge">TESTING THEORY</span>
            <p>Before you trust an app with real data, you need to test it. But testing with real data is risky—what if something goes wrong?</p>
            <p><strong>The solution:</strong> Generate fake but realistic sample data that exercises all the app's features without exposing real information.</p>
            <p><strong>Good test data should include:</strong></p>
            <ul>
                ${dataExamples}
            </ul>
            <p><strong>Why this matters:</strong></p>
            <ul>
                <li><strong>Safety:</strong> No real PII or sensitive schedules are exposed if something breaks.</li>
                <li><strong>Completeness:</strong> You can test edge cases (like conflicts or missing data) without waiting for them to happen naturally.</li>
                <li><strong>Demos:</strong> When showing the app to others, realistic sample data makes it easier to understand than empty forms.</li>
            </ul>
            <p>You can ask the AI to build a "Generate Test Data" button right into the app. One click fills the app with realistic sample data for testing.</p>
        `;
        }
    },
    {
        title: "Mission 5: Generate Test Data",
        type: "action",
        mode: "workbench",
        text: function() {
            const choice = getChoice();
            let description = '';
            if (choice.id === 'watchbill') {
                description = 'sample sailors, watch types, and some pre-filled assignments';
            } else if (choice.id === 'detailer') {
                description = 'sample sailors, available billets, and rotation plan entries';
            } else {
                description = 'sample students, tests with questions, and graded submissions';
            }
            
            return `
            <span class="lesson-badge">TEST DATA</span>
            <p><strong>Goal:</strong> Add a button that fills your app with ${description} for testing.</p>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Make sure your latest code (with JSON save/load) is in the STAGING_AREA.</li>
                <li>Copy the prompt below into your AI chat.</li>
                <li>Paste the updated index.html into the STAGING_AREA and click <strong>RUN CODE</strong>.</li>
                <li>Click the new "Generate Test Data" button and verify that sample data appears.</li>
                <li>Test the app's features with this sample data to make sure everything works.</li>
            </ol>
            <p><strong>Pro tip:</strong> After generating test data, try the JSON download feature. This lets you save a "demo dataset" that you can reload anytime for testing or presentations.</p>
        `;
        },
        prompt: function() {
            return getContent('mission5TestDataPrompt');
        }
    },
    {
        title: "Debrief: Test Data",
        type: "quiz",
        mode: "workbench",
        text: "<p>System Check: Why is test data important?</p>",
        questions: [
            {
                q: "Why is it better to test with generated sample data rather than real data?",
                options: [
                    "Real data is always too small to test with",
                    "Sample data protects sensitive information while still exercising all the app's features",
                    "The AI cannot process real data"
                ],
                correct: 1,
                explain: "Sample data lets you test edge cases and demonstrate features without risking exposure of real PII, schedules, or sensitive information."
            },
            {
                q: "What should good test data include?",
                options: [
                    "Only one or two records to keep things simple",
                    "Enough variety to exercise different features and edge cases",
                    "Exact copies of production data"
                ],
                correct: 1,
                explain: "Good test data should include variety: different ranks, sections, dates, and scenarios so you can verify all features work correctly."
            },
            {
                q: "What is a practical use for the 'Generate Test Data' button beyond personal testing?",
                options: [
                    "There is no other use",
                    "Demos and training—realistic data helps others understand how the app works",
                    "It replaces the need for JSON save/load"
                ],
                correct: 1,
                explain: "When demonstrating the app to stakeholders or training new users, having one-click sample data makes the app immediately usable and understandable."
            },
            {
                q: "After generating test data, what is a good next step?",
                options: [
                    "Delete it immediately",
                    "Download it as JSON to save a reusable demo dataset",
                    "Never use JSON save/load with test data"
                ],
                correct: 1,
                explain: "Saving test data as JSON creates a reusable demo dataset. You can reload it anytime for testing or presentations without regenerating."
            }
        ]
    },
    {
        title: "Lesson: UX Basics for Tools",
        type: "lesson",
        mode: "workbench",
        text: function() {
            const choice = getChoice();
            let layoutExample = '';
            if (choice.id === 'watchbill') {
                layoutExample = `
                <li>Left pane: roster and configuration (sailors, watch types).</li>
                <li>Right pane: the calendar or watchbill view.</li>`;
            } else if (choice.id === 'detailer') {
                layoutExample = `
                <li>Left pane: sailors and available billets.</li>
                <li>Right pane: the rotation timeline and planning view.</li>`;
            } else {
                layoutExample = `
                <li>Left pane: tests, questions, and student roster.</li>
                <li>Right pane: test-taking view and results.</li>`;
            }
            
            return `
            <span class="lesson-badge">UX THEORY</span>
            <p>Even a powerful tool feels clumsy if the layout fights the user. Basic user experience (UX) choices can make your AI-generated app feel much more usable.</p>
            <p><strong>Three simple UX ideas for this ${choice.name.toLowerCase()}:</strong></p>
            <ul>
                <li><strong>Group related things together:</strong> Data in one place, views in another, controls in a third. This reduces the amount of jumping around.</li>
                <li><strong>Visual hierarchy:</strong> Use headings, spacing, and subtle borders so it is obvious where to start and what is most important.</li>
                <li><strong>Consistent styling:</strong> Stick to one theme (for example, dark mode) and reuse the same font sizes and button styles.</li>
            </ul>
            <p>For this app, a common pattern is:</p>
            <ul>
                ${layoutExample}
                <li>Top or bottom bar: global actions (save, load, export).</li>
            </ul>
            <p>You do not need to hand-write CSS to get this. You can ask the AI to reorganize the layout using plain language ("put data on the left, views on the right, dark mode, clear headings").</p>
        `;
        }
    },
    {
        title: "Mission 5A: Improve Layout & UX",
        type: "action",
        mode: "workbench",
        text: `
            <span class="lesson-badge">UX ACTION</span>
            <p><strong>Goal:</strong> Make your app easier to scan and use, without changing the core logic.</p>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Make sure your latest working code (with JSON save/load) is in the STAGING_AREA.</li>
                <li>Copy the prompt below into the same AI chat you've been using.</li>
                <li>Ask the AI to keep all existing functionality, and focus only on layout and styling.</li>
                <li>Paste the updated file into the STAGING_AREA and click <strong>RUN CODE</strong>.</li>
                <li>Check: Is it obvious where to add data? Is the main view easy to find?</li>
            </ol>
        `,
        prompt: function() {
            return getContent('mission5aPrompt');
        }
    },
    {
        title: "Mission 5B: Smart UX Features",
        type: "action",
        mode: "workbench",
        text: `
            <span class="lesson-badge">UX POWER</span>
            <p><strong>Goal:</strong> Add "guardrails" and "time travel" to make the app safer to use.</p>
            <p>We will add two advanced UX features:</p>
            <ul>
                <li><strong>Conflict/Validation Detection:</strong> Visual feedback when something is wrong.</li>
                <li><strong>Undo/Redo:</strong> A way to fix mistakes without reloading the page.</li>
            </ul>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Ensure your layout-improved code is in the STAGING_AREA.</li>
                <li>Copy the prompt below.</li>
                <li>Paste it into the AI chat.</li>
                <li>Update the STAGING_AREA with the new code and click <strong>RUN CODE</strong>.</li>
                <li>Test it: Try creating a conflict and see if it warns you. Try making a change and then clicking Undo.</li>
            </ol>
        `,
        prompt: function() {
            return getContent('mission5bPrompt');
        }
    },
    {
        title: "Debrief: UX & Safety",
        type: "quiz",
        mode: "workbench",
        text: "<p>System Check: How do layout and logic work together?</p>",
        questions: [
            {
                q: "Why is 'Conflict Detection' (highlighting errors in red) better than just blocking the user?",
                options: [
                    "It allows the user to make temporary adjustments while still being aware of the problem",
                    "It uses less battery power",
                    "It is impossible to block users in HTML"
                ],
                correct: 0,
                explain: "Soft warnings (visual feedback) are often better than hard blocks because they let the user decide how to resolve the issue without fighting the tool."
            },
            {
                q: "Why is it helpful to keep data/controls on one side and views on the other?",
                options: [
                    "Because every app must follow that layout by law",
                    "It matches a common pattern: data and controls on one side, results or views on the other, so users know where to look",
                    "It makes the code run faster"
                ],
                correct: 1,
                explain: "Using a familiar pattern reduces the mental effort needed to figure out where things are and how to interact with them."
            },
            {
                q: "Which of these is the best UX-focused instruction to give the AI?",
                options: [
                    "\"Make it look cool\"",
                    "\"Group related controls together, use clear headings so I know where to start\"",
                    "\"Change all colors randomly each time the page loads\""
                ],
                correct: 1,
                explain: "Specific instructions about grouping and hierarchy give the AI something concrete to design around."
            },
            {
                q: "What is a good rule for visual hierarchy?",
                options: [
                    "Make everything the same size so nothing stands out",
                    "Use slightly larger text and more spacing for the most important sections",
                    "Use as many fonts as possible so each section is unique"
                ],
                correct: 1,
                explain: "Clear hierarchy uses size, spacing, and simplicity to show what is primary versus secondary."
            }
        ]
    },
    {
        title: "Lesson: Working with Real Data (CSV)",
        type: "lesson",
        mode: "workbench",
        text: function() {
            const choice = getChoice();
            return `
            <span class="lesson-badge">DATA THEORY</span>
            <p>Most real data lives in spreadsheets, not in web apps. CSV (Comma-Separated Values) is a simple file format that many tools can export.</p>
            <p>A CSV file is just text, for example:</p>
            <pre class="prompt-text" style="background:#111; border-radius:4px; padding:10px; font-size:0.8rem;">
${choice.sampleCsv.split('\n').slice(0, 3).join('\n')}
            </pre>
            <p>Each line is a row, and commas separate the columns. For this app we care about columns like:</p>
            <ul>
                <li><code>${choice.csvColumns}</code></li>
            </ul>
            <p>If you can import a CSV into the app, you avoid retyping everything by hand. The browser can read the file locally without sending it to a server.</p>
        `;
        }
    },
    {
        title: "Mission 6: Load Real Data from CSV",
        type: "action",
        mode: "workbench",
        text: function() {
            const choice = getChoice();
            return `
            <span class="lesson-badge">DATA ACTION</span>
            <p><strong>Goal:</strong> Let the app read a CSV file and populate the data automatically.</p>
            <p>You can test with this sample CSV:</p>
            <pre class="prompt-text" style="background:#111; border-radius:4px; padding:10px;">
${choice.sampleCsv}
            </pre>
            <button class="inline-btn" type="button" data-action="download-sample-csv">Download sample CSV</button>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Save the sample CSV somewhere easy to find, or export real (sanitized) data from your spreadsheet tool.</li>
                <li>Make sure your latest UX-improved code is in the STAGING_AREA.</li>
                <li>Copy the prompt below into your AI chat.</li>
                <li>Paste the updated index.html into the STAGING_AREA and click <strong>RUN CODE</strong>.</li>
                <li>Use the new "Load CSV" button and confirm that data appears correctly.</li>
            </ol>
        `;
        },
        prompt: function() {
            return getContent('mission6Prompt');
        }
    },
    {
        title: "Debrief: Real Data (CSV)",
        type: "quiz",
        mode: "workbench",
        text: "<p>System Check: How do CSV files fit into this tool?</p>",
        questions: [
            {
                q: "What is a CSV file in this context?",
                options: [
                    "A special database engine built into the browser",
                    "A plain text file where each line is a row and commas separate the columns",
                    "An encrypted format that only Excel can read"
                ],
                correct: 1,
                explain: "CSV is a simple, widely supported way to represent tables as text. Browsers and many languages can parse it."
            },
            {
                q: "Why is it useful to import data from CSV instead of typing it by hand?",
                options: [
                    "It makes the app look more impressive but has no practical benefit",
                    "It reduces manual data entry, saves time, and reduces the chance of typos when loading large datasets",
                    "It is required for the JSON save/load features to work"
                ],
                correct: 1,
                explain: "Importing from existing spreadsheets lets you re-use work that has already been done and lowers the chance of errors."
            },
            {
                q: "If the CSV has extra columns beyond what the app expects, what should the app do?",
                options: [
                    "Refuse to import the file",
                    "Safely ignore extra columns and just use the ones it understands",
                    "Randomly map extra columns to other fields"
                ],
                correct: 1,
                explain: "Robust tools handle extra data gracefully: use what is known and ignore the rest unless you explicitly choose to support it."
            }
        ]
    },
    {
        title: "Lesson: Algorithms & Logic",
        type: "lesson",
        mode: "workbench",
        text: `
            <span class="lesson-badge">LOGIC THEORY</span>
            <p>So far, your app is a "dumb" container: it stores what you type. To make it smart, you need to ask for <strong>algorithms</strong>.</p>
            <p>An algorithm is just a set of rules for solving a problem. You don't need to write the math yourself; you just need to describe the <strong>rules</strong> and the <strong>goal</strong>.</p>
            <p><strong>Example:</strong></p>
            <ul>
                <li><strong>Goal:</strong> Automate something tedious.</li>
                <li><strong>Rule 1:</strong> Distribute work fairly.</li>
                <li><strong>Rule 2:</strong> Respect constraints and requirements.</li>
            </ul>
            <p>When you prompt for this, you are moving from "building a UI" to "automating a process."</p>
        `
    },
    {
        title: "Mission 7: The Algorithm",
        type: "action",
        mode: "workbench",
        text: function() {
            const choice = getChoice();
            let description = '';
            if (choice.id === 'watchbill') {
                description = 'Instead of clicking dropdowns one by one, we will ask the AI to write an algorithm to fill the watchbill for us.';
            } else if (choice.id === 'detailer') {
                description = 'Instead of manually matching sailors to billets, we will ask the AI to write an algorithm to suggest optimal rotation matches.';
            } else {
                description = 'Instead of manually calculating grades, we will ask the AI to write an algorithm to generate comprehensive reports automatically.';
            }
            
            return `
            <span class="lesson-badge">LOGIC</span>
            <p><strong>Goal:</strong> Stop doing the work yourself. Let the computer automate it.</p>
            <p>${description}</p>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Copy the prompt below.</li>
                <li>Paste it into the AI chat.</li>
                <li>Update the STAGING_AREA and click <strong>RUN CODE</strong>.</li>
                <li>Click the new automation button and see if it works correctly.</li>
            </ol>
        `;
        },
        prompt: function() {
            return getContent('mission7Prompt');
        }
    },
    {
        title: "Debrief: Algorithms",
        type: "quiz",
        mode: "workbench",
        text: "<p>System Check: How do we talk to the AI about logic?</p>",
        questions: [
            {
                q: "What is the most important part of prompting for an algorithm?",
                options: [
                    "Using complex mathematical symbols",
                    "Clearly describing the rules and constraints in plain English",
                    "Asking the AI to 'use AI' to solve it"
                ],
                correct: 1,
                explain: "The AI translates your plain-English rules into code logic. If you can't explain the rule clearly, the AI can't code it."
            },
            {
                q: "If the automation produces incorrect results, what should you do?",
                options: [
                    "Assume the AI is broken and give up",
                    "Send a follow-up prompt describing exactly what rule was violated and ask it to fix the logic",
                    "Manually fix it every time"
                ],
                correct: 1,
                explain: "Treat logic bugs just like syntax errors. Tell the AI what rule it broke and ask it to fix the logic."
            }
        ]
    },
    {
        title: "Lesson: Context-Aware Styling",
        type: "lesson",
        mode: "workbench",
        text: `
            <span class="lesson-badge">CSS THEORY</span>
            <p>Your app lives on a screen, but sometimes it needs to live on paper. A web page usually looks terrible when printed: dark backgrounds waste ink, and buttons are useless on a piece of paper.</p>
            <p>CSS has a feature called <strong>Media Queries</strong> that lets the app change its look based on where it is being viewed.</p>
            <pre class="prompt-text" style="background:#111; border-radius:4px; padding:10px; font-size:0.8rem;">
@media print {
  body { background: white; color: black; }
  button { display: none; }
}
            </pre>
            <p>You don't need to write this code. You just need to tell the AI: "Make it look good when I print it."</p>
        `
    },
    {
        title: "Mission 8: The Paper Trail",
        type: "action",
        mode: "workbench",
        text: `
            <span class="lesson-badge">OUTPUT</span>
            <p><strong>Goal:</strong> Make the app print-friendly.</p>
            <p>Sometimes you need a physical copy. Web apps often print poorly (dark backgrounds waste ink, buttons show up on paper). We will fix that with CSS.</p>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Copy the prompt below.</li>
                <li>Paste it into the AI chat.</li>
                <li>Update the STAGING_AREA and click <strong>RUN CODE</strong>.</li>
                <li>Press <strong>Ctrl+P</strong> (or Cmd+P) in the preview window (or open the preview in a new tab to print) to see the result.</li>
            </ol>
        `,
        prompt: function() {
            return getContent('mission8Prompt');
        }
    },
    {
        title: "Debrief: Output Contexts",
        type: "quiz",
        mode: "workbench",
        text: "<p>System Check: Why does context matter for output?</p>",
        questions: [
            {
                q: "Why do we hide buttons when printing?",
                options: [
                    "Because printers cannot print the shape of a button",
                    "Because you cannot click a button on a piece of paper, so it is just visual clutter",
                    "To save paper"
                ],
                correct: 1,
                explain: "User Interface (UI) elements like buttons and navigation are for screens. On paper, they are noise."
            },
            {
                q: "What is the technical term for styles that only apply when printing?",
                options: [
                    "Print Mode",
                    "@media print",
                    "Paper CSS"
                ],
                correct: 1,
                explain: "CSS Media Queries (@media) allow you to apply different styles for different devices, like 'print' or 'screen'."
            }
        ]
    },
    {
        title: "Lesson: Visualizing Data",
        type: "lesson",
        mode: "workbench",
        text: `
            <span class="lesson-badge">VISUAL THEORY</span>
            <p>A table of numbers is hard to read quickly. A chart makes trends obvious instantly.</p>
            <p>For complex visualizations, libraries like D3.js or Chart.js are powerful options. But for simple tools, you can often use <strong>HTML and CSS</strong> alone.</p>
            <p>A simple bar chart is just a colored <code>&lt;div&gt;</code> where the width is a percentage (e.g., <code>width: 50%</code>).</p>
            <p><strong>When to use simple CSS vs. libraries:</strong></p>
            <ul>
                <li><strong>CSS bars:</strong> Quick, lightweight, no dependencies—great for basic progress/workload displays.</li>
                <li><strong>Chart libraries:</strong> Better for complex charts (pie, line, scatter) or interactive visualizations.</li>
                <li>For offline single-file apps, CSS keeps things simple. For richer dashboards, libraries are worth the trade-off.</li>
            </ul>
        `
    },
    {
        title: "Mission 9: The Dashboard",
        type: "action",
        mode: "workbench",
        text: function() {
            const choice = getChoice();
            let description = '';
            if (choice.id === 'watchbill') {
                description = 'We will add a simple chart to see who is working the most.';
            } else if (choice.id === 'detailer') {
                description = 'We will add a visual summary of rotation timelines and billet status.';
            } else {
                description = 'We will add a performance dashboard to visualize test scores and trends.';
            }
            
            return `
            <span class="lesson-badge">VISUALS</span>
            <p><strong>Goal:</strong> Visualize the data to spot trends.</p>
            <p>${description} We don't need heavy charting libraries; simple HTML/CSS bars work fine.</p>
            <p><strong>Do this:</strong></p>
            <ol>
                <li>Copy the prompt below.</li>
                <li>Paste it into the AI chat.</li>
                <li>Update the STAGING_AREA and click <strong>RUN CODE</strong>.</li>
                <li>Look for the new stats/dashboard section.</li>
            </ol>
        `;
        },
        prompt: function() {
            return getContent('mission9Prompt');
        }
    },
    {
        title: "Debrief: Visualization",
        type: "quiz",
        mode: "workbench",
        text: "<p>System Check: Keeping it simple.</p>",
        questions: [
            {
                q: "When is it better to use simple HTML/CSS bars vs. a chart library?",
                options: [
                    "Always use libraries—CSS bars are outdated",
                    "CSS bars are great for simple displays; libraries are better for complex, interactive charts",
                    "Always use CSS—libraries never work offline"
                ],
                correct: 1,
                explain: "CSS bars are quick and dependency-free, perfect for basic workload displays. Chart libraries like D3.js or Chart.js are better when you need complex visualizations like pie charts or interactive features."
            },
            {
                q: "What is the main benefit of adding a visualization like a stats dashboard?",
                options: [
                    "It makes the app look more expensive",
                    "It helps users spot patterns and trends faster than reading a table",
                    "It uses more memory"
                ],
                correct: 1,
                explain: "Visualizations are about insight. They turn raw data into a story that's easy to understand at a glance."
            }
        ]
    },
    {
        title: "Mission Complete",
        type: "lesson",
        mode: "workbench",
        text: function() {
            const choice = getChoice();
            return `
            <span class="lesson-badge">VICTORY</span>
            <h3>You are now a Vibe Coder.</h3>
            <p>You have guided an AI to build and improve an offline ${choice.name.toLowerCase()} by:</p>
            <ul>
                <li>Framing the problem with <strong>Task, Context, and Format</strong>.</li>
                <li>Iterating in layers instead of trying to design everything in one shot.</li>
                <li>Using the browser Console error messages with a clear two-line prompt: "What doesn't work" and "What the console says".</li>
                <li>Adding JSON-based save/load so data persists beyond a single session and can move between machines.</li>
                <li>Generating sample test data for safe testing and demos without exposing real information.</li>
                <li>Improving the layout and UX so the tool is easier to understand and use.</li>
                <li>Importing real-world data from CSV instead of retyping everything by hand.</li>
            </ul>
            <p><strong>Final Step:</strong></p>
            <ol>
                <li>Make sure the STAGING_AREA on the right contains your final version of the app code.</li>
                <li>Click the button below to download that code as <code>${choice.downloadFilename}</code>.</li>
                <li>Double-click <code>${choice.downloadFilename}</code> to open it in your browser from <code>file://</code>.</li>
                <li>If your organization allows it, you can share this file or a JSON export with teammates so they can try it locally.</li>
            </ol>
            <button class="inline-btn" type="button" data-action="download-app">${getContent('missionCompleteDownloadLabel')}</button>
            <p>From here, you can reuse the same patterns to build other tools: TCF for prompting, layering for design, Console for debugging, JSON for data, UX tweaks for usability, and CSV import to connect with the spreadsheets people already use.</p>
        `;
        }
    },
    {
        title: "Study Guide",
        type: "studyguide",
        mode: "focus",
        text: `
            <span class="lesson-badge">STUDY GUIDE</span>
            <h3>Printable Reference Sheet</h3>
            <p>This is a comprehensive study guide covering all the key concepts from each section. Print this page to keep as a quick reference.</p>
            <div id="study-guide-content"></div>
            <button class="inline-btn" data-action="print-study-guide">🖨️ Print Study Guide</button>
        `
    },
    {
        title: "Knowledge Check",
        type: "quiz",
        mode: "focus",
        text: `
            <span class="lesson-badge">FINAL EXAM</span>
            <h3>Comprehensive Knowledge Check</h3>
            <p>Test your understanding of the main takeaways from each section of the course. Answer all questions to verify your mastery of the material.</p>
        `,
        questions: [
            {
                q: "Section 1: TCF Framework — What are the three components of the TCF Framework?",
                options: [
                    "Template, Code, Function",
                    "Task, Context, Format",
                    "Type, Class, File",
                    "Test, Compile, Fix"
                ],
                correct: 1,
                explain: "TCF stands for Task (what the app does), Context (environment and constraints), and Format (the structure of the output). This framework helps you communicate clearly with AI to get usable code."
            },
            {
                q: "Section 1: TCF Framework — Why is specifying 'Context' important when prompting an AI?",
                options: [
                    "It makes the AI respond faster",
                    "It tells the AI about real-world constraints it cannot guess on its own",
                    "It helps the AI choose better variable names",
                    "It's only required for advanced apps"
                ],
                correct: 1,
                explain: "Context includes constraints like 'must work offline,' security limits, or specific requirements. Without it, the AI builds generic solutions that may not fit your environment."
            },
            {
                q: "Section 2: Iteration — Why is it better to build an app in layers rather than one massive prompt?",
                options: [
                    "It's impossible to write long prompts",
                    "Layering makes it easier to track changes and find bugs",
                    "The AI charges more for long prompts",
                    "It reduces the total number of prompts needed"
                ],
                correct: 1,
                explain: "Building incrementally helps you see which change introduced a bug or improvement. Dense 'do everything at once' prompts can overwhelm the AI and make debugging harder."
            },
            {
                q: "Section 3: Debugging — What is the most useful information to include in a debug prompt?",
                options: [
                    "A screenshot of the broken button",
                    "The exact red error text from the browser Console (F12)",
                    "A description saying 'it doesn't work'",
                    "The entire source code of the app"
                ],
                correct: 1,
                explain: "The Console error message usually includes the error type, function name, and line number. This gives the AI a precise starting point to diagnose and fix the bug."
            },
            {
                q: "Section 3: Debugging — What is the recommended two-part structure for a debug prompt?",
                options: [
                    "Before and After",
                    "'What doesn't work' and 'What the console says'",
                    "Question and Answer",
                    "Code and Comments"
                ],
                correct: 1,
                explain: "The two-line debug structure—describing what failed and pasting the Console error—keeps prompts clear and gives the AI everything it needs to help you."
            },
            {
                q: "Section 4: Data Persistence — How does JSON help with data persistence in offline apps?",
                options: [
                    "It encrypts data so only you can read it",
                    "It allows you to save app state to a file that can be downloaded, shared, and restored later",
                    "It automatically syncs data to the cloud",
                    "It compresses data to use less memory"
                ],
                correct: 1,
                explain: "JSON is a text-based format for representing data. You can download it as a file, share it, and upload it later to restore the exact same state—even on a different computer."
            },
            {
                q: "Section 5: Test Data — Why is it better to test with generated sample data rather than real data?",
                options: [
                    "Real data is always too small to test with",
                    "Sample data protects sensitive information while still exercising all features",
                    "The AI cannot process real data",
                    "Generated data runs faster"
                ],
                correct: 1,
                explain: "Sample data lets you test edge cases and demonstrate features without risking exposure of real PII, schedules, or sensitive information."
            },
            {
                q: "Section 6: UX Basics — Why should you group related controls together?",
                options: [
                    "It's required by web standards",
                    "It reduces mental effort by following familiar patterns users expect",
                    "It makes the code run faster",
                    "It uses less screen space"
                ],
                correct: 1,
                explain: "Using familiar patterns (data/controls on one side, results on the other) reduces the mental effort needed to figure out where things are and how to use them."
            },
            {
                q: "Section 6: UX Basics — Why is 'soft warning' (red highlight) often better than blocking the user entirely?",
                options: [
                    "It uses less battery power",
                    "It allows users to make temporary adjustments while still being aware of the problem",
                    "HTML doesn't support blocking users",
                    "It's easier to code"
                ],
                correct: 1,
                explain: "Soft warnings let users decide how to resolve issues without fighting the tool. This is usually better UX than hard blocks that prevent any action."
            },
            {
                q: "Section 7: CSV Import — What is CSV, and why is it useful for importing data?",
                options: [
                    "A database format that requires special software",
                    "A plain text format where commas separate columns, making it easy to export from spreadsheets",
                    "A programming language for data analysis",
                    "An encrypted format for secure data transfer"
                ],
                correct: 1,
                explain: "CSV (Comma-Separated Values) is simple text that many tools can export. Importing from existing spreadsheets saves time and reduces data entry errors."
            },
            {
                q: "Section 8: Algorithms — What is the most important thing when prompting for an algorithm?",
                options: [
                    "Using complex mathematical notation",
                    "Clearly describing the rules and constraints in plain English",
                    "Asking the AI to 'use machine learning'",
                    "Providing sample output data"
                ],
                correct: 1,
                explain: "The AI translates your plain-English rules into code logic. If you can explain the rules clearly, the AI can implement them."
            },
            {
                q: "Section 9: Print Styles — What CSS feature allows different styles for printing vs. screen display?",
                options: [
                    "Print Mode declarations",
                    "@media print queries",
                    "Paper CSS selectors",
                    "Output stylesheets"
                ],
                correct: 1,
                explain: "CSS Media Queries (@media print) let you apply different styles when the page is printed—like hiding buttons and using white backgrounds to save ink."
            },
            {
                q: "Section 10: Visualization — When should you use simple CSS bars vs. a charting library?",
                options: [
                    "Always use libraries—CSS is outdated",
                    "CSS bars for simple displays; libraries for complex/interactive charts",
                    "Always use CSS—libraries never work",
                    "It doesn't matter, they're identical"
                ],
                correct: 1,
                explain: "CSS bars are quick and dependency-free for basic workload displays. Chart libraries (D3.js, Chart.js) are better for complex visualizations like pie charts, line graphs, or interactive dashboards."
            }
        ]
    },
    {
        title: "Course Complete",
        type: "summary",
        mode: "focus",
        text: `
            <span class="lesson-badge">VICTORY</span>
            <p>Congratulations on completing the Prometheus Spark course! Here is a summary of your journey.</p>
            <div id="summary-list"></div>
            <button class="inline-btn" data-action="print-summary">Print Summary</button>
        `
    }
];
};

// Initialize steps (will be rebuilt when app is selected)
ns.steps = [];

})(window.vibeApp = window.vibeApp || {});
