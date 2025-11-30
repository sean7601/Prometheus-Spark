(function(ns) {
	function boot() {
		const { steps, dom, renderStep, navigation, workbench, appState } = ns;
		if (!steps || !dom || !renderStep) {
			console.error('Prometheus Spark: missing core modules.');
			return;
		}

		dom.totalSteps.innerText = steps.length;
		
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
