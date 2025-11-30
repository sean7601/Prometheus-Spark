(function(ns) {
    function annotateExplanation(explanation, label) {
        if (!explanation || explanation.dataset.annotated === 'true') return;
        explanation.innerHTML = `<strong>${label}:</strong> ${explanation.innerHTML}`;
        explanation.dataset.annotated = 'true';
    }

    function handleQuizClick(event) {
        const button = event.currentTarget;
        const optionIndex = Number(button.dataset.option);
        const correctIndex = Number(button.dataset.correct);
        const optionsContainer = button.closest('.quiz-options');
        if (!optionsContainer) return;

        const buttons = optionsContainer.querySelectorAll('.quiz-btn');
        buttons.forEach(btn => btn.disabled = true);

        const explanation = optionsContainer.parentElement.querySelector('.explanation');
        explanation.classList.add('visible');

        if (optionIndex === correctIndex) {
            button.classList.add('correct');
            explanation.classList.add('correct');
            annotateExplanation(explanation, 'CORRECT');
        } else {
            button.classList.add('wrong');
            explanation.classList.add('wrong');
            const correctButton = Array.from(buttons).find(btn => Number(btn.dataset.option) === correctIndex);
            if (correctButton) correctButton.classList.add('correct');
            annotateExplanation(explanation, 'INCORRECT');
        }
    }

    function wireQuizButtons(container) {
        if (!container) return;
        const buttons = container.querySelectorAll('.quiz-btn');
        buttons.forEach(button => {
            button.addEventListener('click', handleQuizClick, { once: true });
        });
    }

    ns.quiz = {
        wireQuizButtons
    };
})(window.vibeApp = window.vibeApp || {});
