(function(ns) {
    const { attachPromptCopyHandler } = ns.prompts;
    const { wireQuizButtons } = ns.quiz;
    const { wireInlineActionButtons } = ns.downloads;

    const studyGuideData = [
        {
            section: "1. The TCF Framework",
            icon: "📋",
            keyPoints: [
                "<strong>Task (T):</strong> Plain-language description of what the app should do",
                "<strong>Context (C):</strong> Real-world constraints and rules the AI cannot guess (e.g., 'must work offline')",
                "<strong>Format (F):</strong> Exact shape of output you want (e.g., 'single index.html file')"
            ],
            tips: [
                "Without Task, the AI doesn't know the problem",
                "Without Context, you get a generic solution",
                "Without Format, you may get code you can't run",
                "Always use fake/anonymized data—never paste sensitive info"
            ]
        },
        {
            section: "2. Iteration & Layering",
            icon: "🔄",
            keyPoints: [
                "Build in layers: skeleton first, then add features incrementally",
                "Each follow-up prompt adds one focused improvement",
                "Keep all previous features working when adding new ones"
            ],
            tips: [
                "Dense 'do everything' prompts can overwhelm the AI",
                "Small, focused prompts make it easier to track what changed",
                "If something breaks, tell the AI exactly what used to work"
            ]
        },
        {
            section: "3. Debugging Mindset",
            icon: "🔧",
            keyPoints: [
                "Use F12 (or right-click → Inspect → Console) to see errors",
                "Copy the red error text exactly as shown",
                "Use the two-part debug prompt structure"
            ],
            tips: [
                "<strong>2-Part Debug Prompt:</strong>",
                "<strong>Part 1 — What doesn't work:</strong> 'I clicked [X] and expected [Y], but [Z] happened instead.'" ,
                "<strong>Part 2 — What the console says:</strong> Paste the exact red error (e.g., 'Uncaught ReferenceError: addItem is not defined').",
                "Always reproduce the bug first, then immediately copy the fresh Console error."
            ]
        },
        {
            section: "4. Data Persistence with JSON",
            icon: "💾",
            keyPoints: [
                "Browser memory is temporary—data disappears on refresh",
                "JSON files let you save, share, and restore app state",
                "Download JSON to your device, upload it later to restore"
            ],
            tips: [
                "JSON is portable: works across computers and browsers",
                "Robust apps handle missing fields gracefully with defaults",
                "JSON turns your local device into a simple 'database'"
            ]
        },
        {
            section: "5. UX Basics for Tools",
            icon: "🎨",
            keyPoints: [
                "<strong>Group related things:</strong> Data on left, views on right",
                "<strong>Visual hierarchy:</strong> Use headings, spacing, and borders",
                "<strong>Consistent styling:</strong> One theme, same fonts and button styles"
            ],
            tips: [
                "Conflict detection: Highlight problems in red (soft warnings)",
                "Undo/Redo: Let users fix mistakes without reloading",
                "Follow familiar patterns to reduce mental effort"
            ]
        },
        {
            section: "6. Working with Real Data (CSV)",
            icon: "📊",
            keyPoints: [
                "CSV = Comma-Separated Values (plain text, rows and columns)",
                "Import data from spreadsheets instead of retyping",
                "Safely ignore extra columns beyond what you need"
            ],
            tips: [
                "Most spreadsheet tools can export to CSV",
                "Importing saves time and reduces typos",
                "Browser can read CSV files locally (no server needed)"
            ]
        },
        {
            section: "7. Algorithms & Logic",
            icon: "🧠",
            keyPoints: [
                "An algorithm is a set of rules for solving a problem",
                "Describe your rules clearly in plain English",
                "The AI translates your rules into code logic"
            ],
            tips: [
                "Example rules: 'Distribute evenly,' 'Respect constraints'",
                "If the algorithm violates a rule, send a follow-up prompt",
                "Treat logic bugs like syntax errors—describe and fix"
            ]
        },
        {
            section: "8. Print Styles & Output",
            icon: "🖨️",
            keyPoints: [
                "Web apps often look terrible when printed",
                "Use @media print CSS to change styles for printing",
                "Hide buttons, use white background, show only essential content"
            ],
            tips: [
                "Buttons are useless on paper—hide them",
                "White background saves ink",
                "Make table borders crisp and visible for printing"
            ]
        },
        {
            section: "9. Data Visualization",
            icon: "📈",
            keyPoints: [
                "Charts make trends obvious faster than tables",
                "Simple HTML/CSS bars work for basic displays (no dependencies)",
                "Libraries (D3.js, Chart.js) are better for complex/interactive charts"
            ],
            tips: [
                "CSS bars: Quick, lightweight—great for progress/workload bars",
                "Libraries: Better for pie, line, scatter, or interactive charts",
                "Visualizations turn data into insights at a glance"
            ]
        }
    ];

    function buildStudyGuide() {
        const container = document.getElementById('study-guide-content');
        if (!container) return;

        let html = '<div class="study-guide">';
        
        studyGuideData.forEach((section, index) => {
            html += `
                <div class="study-section">
                    <div class="study-section-header">
                        <span class="study-icon">${section.icon}</span>
                        <h4>${section.section}</h4>
                    </div>
                    <div class="study-columns">
                        <div class="study-column">
                            <div class="study-column-header">Key Concepts</div>
                            <ul class="study-list">
                                ${section.keyPoints.map(point => `<li>${point}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="study-column">
                            <div class="study-column-header">Tips & Reminders</div>
                            <ul class="study-list tips">
                                ${section.tips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    function buildPromptBox(promptText) {
        const promptBox = document.createElement('div');
        promptBox.className = 'prompt-container';

        const label = document.createElement('div');
        label.className = 'prompt-label';
        label.innerText = 'PROMPT TO COPY';
        promptBox.appendChild(label);

        const text = document.createElement('div');
        text.className = 'prompt-text';
        text.textContent = promptText;
        promptBox.appendChild(text);

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'copy-btn';
        button.innerText = 'Copy to Clipboard';
        attachPromptCopyHandler(button, promptText);
        promptBox.appendChild(button);

        return promptBox;
    }

    function buildQuiz(question, qIndex) {
        const container = document.createElement('div');
        container.className = 'quiz-container';

        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.innerHTML = question.q;
        container.appendChild(questionText);

        const optionsWrapper = document.createElement('div');
        optionsWrapper.className = 'quiz-options';

        question.options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'quiz-btn';
            button.dataset.option = optionIndex;
            button.dataset.correct = question.correct;
            button.innerHTML = option;
            optionsWrapper.appendChild(button);
        });

        container.appendChild(optionsWrapper);

        const explanation = document.createElement('div');
        explanation.className = 'explanation';
        explanation.dataset.question = qIndex;
        explanation.innerHTML = question.explain;
        container.appendChild(explanation);

        return container;
    }

    function toggleWorkbench(step) {
        const { steps, appState, dom } = ns;
        const isReadingStep = (step.type === 'lesson' || step.type === 'quiz') && (appState.currentStep !== steps.length - 1);
        if (isReadingStep) {
            dom.appContainer.classList.add('hide-workbench');
        } else {
            dom.appContainer.classList.remove('hide-workbench');
        }

        if (step.mode === 'focus') {
            dom.appContainer.classList.add('focus-mode');
        } else {
            dom.appContainer.classList.remove('focus-mode');
        }

        // Toggle AI Studio button visibility - only show on first 3 steps (modules 1-3)
        const aiLinkContainer = document.getElementById('ai-link-container');
        if (aiLinkContainer) {
            aiLinkContainer.style.display = appState.currentStep <= 2 ? 'block' : 'none';
        }
    }

    function renderSummary() {
        const { steps } = ns;
        const container = document.getElementById('summary-list');
        if (!container) return;

        const list = document.createElement('div');
        list.className = 'summary-list';

        steps.forEach((s, index) => {
            if (s.type === 'summary') return;

            const item = document.createElement('div');
            item.className = 'summary-item';
            
            // Handle function text
            const textContent = typeof s.text === 'function' ? s.text() : s.text;
            let badge = '';
            if (textContent.includes('class="lesson-badge"')) {
                const match = textContent.match(/<span class="lesson-badge">([^<]+)<\/span>/);
                if (match) badge = match[1];
            }

            item.innerHTML = `
                <div class="summary-header">
                    <span class="summary-num">#${index + 1}</span>
                    ${badge ? `<span class="summary-badge">${badge}</span>` : ''}
                    <span class="summary-title">${s.title}</span>
                </div>
            `;
            list.appendChild(item);
        });

        container.appendChild(list);
    }

    // Build and show app selection modal
    function showAppSelector() {
        const { appChoices, dom } = ns;
        
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'app-selector-overlay';
        overlay.id = 'app-selector-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'app-selector-modal';
        
        modal.innerHTML = `
            <h2>Choose Your Project</h2>
            <p>Select which app you'd like to build during this course. All lessons will be customized for your choice.</p>
            <div class="app-choices">
                ${Object.values(appChoices).map(app => `
                    <button class="app-choice-btn" data-app="${app.id}">
                        <span class="app-choice-icon">${app.icon}</span>
                        <span class="app-choice-name">${app.name}</span>
                        <span class="app-choice-desc">${app.description}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Wire up choice buttons
        modal.querySelectorAll('.app-choice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const appId = btn.dataset.app;
                ns.selectApp(appId);
                overlay.remove();
                // Rebuild and render
                ns.steps = ns.buildSteps();
                dom.totalSteps.innerText = ns.steps.length;
                ns.navigation?.buildProgressSegments?.();
                renderStep();
            });
        });
    }

    // Update app indicator in header
    function updateAppIndicator() {
        const { appState, appChoices } = ns;
        const indicator = document.getElementById('app-indicator');
        const iconEl = document.getElementById('app-indicator-icon');
        const nameEl = document.getElementById('app-indicator-name');
        const changeBtn = document.getElementById('app-change-btn');
        
        if (!indicator || !appState.selectedApp) {
            if (indicator) indicator.style.display = 'none';
            return;
        }
        
        const choice = appChoices[appState.selectedApp];
        if (!choice) {
            indicator.style.display = 'none';
            return;
        }
        
        indicator.style.display = 'flex';
        iconEl.textContent = choice.icon;
        nameEl.textContent = `Building: ${choice.name}`;
        
        // Wire up change button (only once)
        if (!changeBtn.dataset.wired) {
            changeBtn.dataset.wired = 'true';
            changeBtn.addEventListener('click', () => {
                if (confirm('This will reset your progress and let you choose a different project. Continue?')) {
                    ns.resetProgress();
                    location.reload();
                }
            });
        }
    }

    function renderStep() {
        const { steps, appState, dom } = ns;
        
        // Update app indicator
        updateAppIndicator();
        
        // If no app selected and at step 0, show selector
        if (!appState.selectedApp && appState.currentStep === 0) {
            showAppSelector();
            return;
        }
        
        // Ensure steps are built
        if (!steps || steps.length === 0) {
            ns.steps = ns.buildSteps();
            ns.navigation?.buildProgressSegments?.();
        }
        
        const step = ns.steps[appState.currentStep];
        if (!step) return;
        
        toggleWorkbench(step);

        dom.stepTitle.innerText = step.title;
        dom.stepNum.innerText = appState.currentStep + 1;
        
        // Handle dynamic text content (functions)
        const textContent = typeof step.text === 'function' ? step.text() : step.text;
        dom.stepContent.innerHTML = textContent;
        dom.quizArea.innerHTML = '';

        // Handle dynamic prompt content (functions)
        if (step.prompt) {
            const promptText = typeof step.prompt === 'function' ? step.prompt() : step.prompt;
            if (promptText) {
                const promptBox = buildPromptBox(promptText);
                dom.stepContent.appendChild(promptBox);
            }
        }

        if (step.type === 'quiz' && Array.isArray(step.questions)) {
            step.questions.forEach((question, index) => {
                dom.quizArea.appendChild(buildQuiz(question, index));
            });
        }

        if (step.type === 'summary') {
            renderSummary();
        }

        if (step.type === 'studyguide') {
            buildStudyGuide();
        }

        dom.backButton.style.visibility = appState.currentStep === 0 ? 'hidden' : 'visible';
        dom.nextButton.innerText = appState.currentStep === ns.steps.length - 1 ? 'Finish' : 'Next Step';
        dom.scrollContainer.scrollTop = 0;

        wireQuizButtons(dom.quizArea);
        wireInlineActionButtons(dom.stepContent);
    }

    ns.renderStep = renderStep;
    ns.showAppSelector = showAppSelector;
})(window.vibeApp = window.vibeApp || {});
