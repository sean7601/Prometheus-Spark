(function(ns) {
	function boot() {
		const { dom, renderStep, navigation, workbench, appState, buildSteps } = ns;
		if (!dom || !renderStep) {
			console.error('Prometheus Spark: missing core modules.');
			return;
		}

		// Build steps based on selected app (or with defaults if none selected yet)
		if (appState.selectedApp) {
			ns.steps = buildSteps();
		}
		
		// Update total steps count
		if (ns.steps && ns.steps.length > 0) {
			dom.totalSteps.innerText = ns.steps.length;
		}
		
		// Restore saved code editor content
		if (appState?.savedCodeEditor && dom.codeEditor) {
			dom.codeEditor.value = appState.savedCodeEditor;
		}
		
		renderStep();
		navigation?.initNavigation();
		workbench?.initWorkbench();
		
		// Save progress when code editor changes
		if (dom.codeEditor) {
			dom.codeEditor.addEventListener('input', () => {
				ns.saveProgress?.();
			});
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})(window.vibeApp = window.vibeApp || {});
