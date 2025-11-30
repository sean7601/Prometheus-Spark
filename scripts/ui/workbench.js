(function(ns) {
    const dom = ns.dom || {};

    function switchTab(mode) {
        (dom.tabs || []).forEach(tab => tab.classList.remove('active'));
        const targetTab = document.getElementById(`tab-${mode}`);
        if (targetTab) targetTab.classList.add('active');

        (dom.editorContainers || []).forEach(container => container.classList.remove('active'));
        const targetView = document.getElementById(`view-${mode}`);
        if (targetView) targetView.classList.add('active');
    }

    function runPreview() {
        let rawCode = dom.codeEditor.value || '';
        if (!rawCode.trim()) {
            alert('Paste the generated HTML into the STAGING_AREA before running the preview.');
            return;
        }

        if (!rawCode.trim().toLowerCase().includes('<!doctype html>')) {
            alert("Warning: The code doesn't look like a full HTML file. Make sure you copied the ENTIRE block from the AI, starting at <!DOCTYPE html>.");
        }

        rawCode = rawCode.replace(/```html/g, '').replace(/```/g, '');
        switchTab('preview');

        dom.previewContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.srcdoc = rawCode;
        dom.previewContainer.appendChild(iframe);
    }

    function initWorkbench() {
        (dom.tabs || []).forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        dom.runButton?.addEventListener('click', runPreview);
    }

    ns.workbench = {
        initWorkbench
    };
})(window.vibeApp = window.vibeApp || {});

