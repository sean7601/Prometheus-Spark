(function(ns) {
    const STORAGE_KEY = 'vibeCoderAcademy_progress';

    function loadProgress() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                return {
                    currentStep: data.currentStep || 0,
                    codeEditor: data.codeEditor || ''
                };
            }
        } catch (e) {
            console.warn('Could not load progress from localStorage:', e);
        }
        return { currentStep: 0, codeEditor: '' };
    }

    function saveProgress() {
        try {
            const data = {
                currentStep: ns.appState.currentStep,
                codeEditor: ns.dom?.codeEditor?.value || ''
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save progress to localStorage:', e);
        }
    }

    const savedProgress = loadProgress();

    ns.appState = {
        currentStep: savedProgress.currentStep,
        savedCodeEditor: savedProgress.codeEditor
    };

    ns.saveProgress = saveProgress;
})(window.vibeApp = window.vibeApp || {});
