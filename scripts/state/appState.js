(function(ns) {
    const STORAGE_KEY = 'vibeCoderAcademy_progress';

    function loadProgress() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                return {
                    currentStep: data.currentStep || 0,
                    codeEditor: data.codeEditor || '',
                    selectedApp: data.selectedApp || null
                };
            }
        } catch (e) {
            console.warn('Could not load progress from localStorage:', e);
        }
        return { currentStep: 0, codeEditor: '', selectedApp: null };
    }

    function saveProgress() {
        try {
            const data = {
                currentStep: ns.appState.currentStep,
                codeEditor: ns.dom?.codeEditor?.value || '',
                selectedApp: ns.appState.selectedApp
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save progress to localStorage:', e);
        }
    }

    function selectApp(appId) {
        ns.appState.selectedApp = appId;
        // Rebuild steps with new app content
        if (ns.buildSteps) {
            ns.steps = ns.buildSteps();
        }
        saveProgress();
    }

    function resetProgress() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            ns.appState.currentStep = 0;
            ns.appState.selectedApp = null;
            ns.appState.savedCodeEditor = '';
            if (ns.dom?.codeEditor) {
                ns.dom.codeEditor.value = '';
            }
        } catch (e) {
            console.warn('Could not reset progress:', e);
        }
    }

    const savedProgress = loadProgress();

    ns.appState = {
        currentStep: savedProgress.currentStep,
        savedCodeEditor: savedProgress.codeEditor,
        selectedApp: savedProgress.selectedApp
    };

    ns.saveProgress = saveProgress;
    ns.selectApp = selectApp;
    ns.resetProgress = resetProgress;
})(window.vibeApp = window.vibeApp || {});
