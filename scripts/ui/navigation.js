(function(ns) {
    let tooltipTimeout = null;

    function buildProgressSegments() {
        const segmentsContainer = document.getElementById('progress-segments');
        const steps = ns.steps || [];
        const appState = ns.appState || { currentStep: 0 };
        
        if (!segmentsContainer || steps.length === 0) return;
        
        segmentsContainer.innerHTML = '';
        
        steps.forEach((step, index) => {
            const segment = document.createElement('div');
            segment.className = 'progress-segment';
            segment.dataset.stepIndex = index;
            
            // Mark completed and current segments
            if (index < appState.currentStep) {
                segment.classList.add('completed');
            } else if (index === appState.currentStep) {
                segment.classList.add('current');
            }
            
            // Click handler
            segment.addEventListener('click', () => {
                goToStep(index);
            });
            
            // Hover handlers
            segment.addEventListener('mouseenter', (e) => {
                showTooltip(index, e);
            });
            
            segment.addEventListener('mouseleave', () => {
                hideTooltip();
            });
            
            segmentsContainer.appendChild(segment);
        });
    }

    function showTooltip(stepIndex, event) {
        const tooltip = document.getElementById('progress-tooltip');
        const steps = ns.steps || [];
        const step = steps[stepIndex];
        
        if (!tooltip || !step) return;
        
        // Clear any pending hide
        if (tooltipTimeout) {
            clearTimeout(tooltipTimeout);
            tooltipTimeout = null;
        }
        
        // Build tooltip content
        const typeLabels = {
            'lesson': 'Lesson',
            'action': 'Action',
            'quiz': 'Quiz',
            'studyguide': 'Study Guide',
            'summary': 'Summary'
        };
        const typeLabel = typeLabels[step.type] || step.type || '';
        
        tooltip.innerHTML = `
            <span class="tooltip-step">Module ${stepIndex + 1}</span>
            ${step.title}
            ${typeLabel ? `<span class="tooltip-type">${typeLabel}</span>` : ''}
        `;
        
        // Position tooltip at the segment
        const segment = event.target;
        const container = document.getElementById('progress-container');
        const containerRect = container.getBoundingClientRect();
        const segmentRect = segment.getBoundingClientRect();
        
        // Reset positioning first and make visible so we can measure
        tooltip.style.left = '0px';
        tooltip.style.transform = 'none';
        tooltip.classList.add('visible');
        
        // Use requestAnimationFrame to ensure DOM has updated before measuring
        requestAnimationFrame(() => {
            const tooltipWidth = tooltip.offsetWidth;
            const padding = 10; // Minimum distance from edges
            
            // Calculate where the tooltip should ideally be centered (in viewport coords)
            const idealCenterX = segmentRect.left + (segmentRect.width / 2);
            
            // Calculate the left edge if centered
            let tooltipLeft = idealCenterX - (tooltipWidth / 2);
            
            // Clamp to stay on screen
            if (tooltipLeft < padding) {
                tooltipLeft = padding;
            } else if (tooltipLeft + tooltipWidth > window.innerWidth - padding) {
                tooltipLeft = window.innerWidth - padding - tooltipWidth;
            }
            
            // Convert to position relative to container
            const relativeLeft = tooltipLeft - containerRect.left;
            
            tooltip.style.left = `${relativeLeft}px`;
            tooltip.style.transform = 'none';
        });
    }

    function hideTooltip() {
        const tooltip = document.getElementById('progress-tooltip');
        if (!tooltip) return;
        
        tooltipTimeout = setTimeout(() => {
            tooltip.classList.remove('visible');
        }, 100);
    }

    function updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        const steps = ns.steps || [];
        const appState = ns.appState || { currentStep: 0 };
        if (progressBar && steps.length > 0) {
            const progress = ((appState.currentStep + 1) / steps.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // Update segment states
        updateSegmentStates();
    }

    function updateSegmentStates() {
        const segmentsContainer = document.getElementById('progress-segments');
        const appState = ns.appState || { currentStep: 0 };
        
        if (!segmentsContainer) return;
        
        const segments = segmentsContainer.querySelectorAll('.progress-segment');
        segments.forEach((segment, index) => {
            segment.classList.remove('completed', 'current');
            if (index < appState.currentStep) {
                segment.classList.add('completed');
            } else if (index === appState.currentStep) {
                segment.classList.add('current');
            }
        });
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
        buildProgressSegments();
        updateProgressBar();
    }

    ns.navigation = {
        initNavigation,
        updateProgressBar,
        buildProgressSegments
    };
})(window.vibeApp = window.vibeApp || {});
