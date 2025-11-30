(function(ns) {
    ns.dom = {
        appContainer: document.getElementById('app-container'),
        stepContent: document.getElementById('step-content'),
        quizArea: document.getElementById('quiz-area'),
        stepTitle: document.getElementById('step-title'),
        stepNum: document.getElementById('step-num'),
        totalSteps: document.getElementById('total-steps'),
        backButton: document.getElementById('btn-back'),
        nextButton: document.getElementById('btn-next'),
        scrollContainer: document.getElementById('scroll-container'),
        tabs: document.querySelectorAll('.tab'),
        editorContainers: document.querySelectorAll('.editor-container'),
        codeEditor: document.getElementById('code-editor'),
        previewContainer: document.getElementById('view-preview'),
        runButton: document.getElementById('btn-run-code')
    };
})(window.vibeApp = window.vibeApp || {});
