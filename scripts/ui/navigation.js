(function(ns) {
    function updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        const steps = ns.steps || [];
        const appState = ns.appState || { currentStep: 0 };
        if (progressBar && steps.length > 0) {
            const progress = ((appState.currentStep + 1) / steps.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    function goToStep(stepIndex) {
        const steps = ns.steps || [];
        const appState = ns.appState || { currentStep: 0 };
        if (stepIndex < 0 || stepIndex >= steps.length) return;
        appState.currentStep = stepIndex;
        ns.renderStep?.();
        updateProgressBar();
        ns.saveProgress?.();
    }

    function handleNext() {
        const steps = ns.steps || [];
        const appState = ns.appState || { currentStep: 0 };
        if (appState.currentStep < steps.length - 1) {
            goToStep(appState.currentStep + 1);
        }
    }

    function handleBack() {
        const appState = ns.appState || { currentStep: 0 };
        if (appState.currentStep > 0) {
            goToStep(appState.currentStep - 1);
        }
    }

    function initNavigation() {
        const dom = ns.dom || {};
        dom.backButton?.addEventListener('click', handleBack);
        dom.nextButton?.addEventListener('click', handleNext);
        updateProgressBar();
    }

    ns.navigation = {
        initNavigation,
        updateProgressBar
    };
})(window.vibeApp = window.vibeApp || {});
