(function(ns) {
    const dom = ns.dom || {};
    const appState = ns.appState || { currentStep: 0 };
    const steps = ns.steps || [];

    function updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar && steps.length > 0) {
            const progress = ((appState.currentStep + 1) / steps.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    function goToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= steps.length) return;
        appState.currentStep = stepIndex;
        ns.renderStep?.();
        updateProgressBar();
        ns.saveProgress?.();
    }

    function handleNext() {
        if (appState.currentStep < steps.length - 1) {
            goToStep(appState.currentStep + 1);
        }
    }

    function handleBack() {
        if (appState.currentStep > 0) {
            goToStep(appState.currentStep - 1);
        }
    }

    function initNavigation() {
        dom.backButton?.addEventListener('click', handleBack);
        dom.nextButton?.addEventListener('click', handleNext);
        updateProgressBar();
    }

    ns.navigation = {
        initNavigation,
        updateProgressBar
    };
})(window.vibeApp = window.vibeApp || {});
