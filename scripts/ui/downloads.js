(function(ns) {
    const dom = ns.dom || {};

    function downloadSampleCSV() {
        // Get the sample CSV for the selected app
        const choice = ns.getAppChoice ? ns.getAppChoice() : null;
        const csvContent = choice?.sampleCsv || `Name,Rank,Section
Alex Smith,LT,Operations
Jordan Lee,LTJG,Maintenance`;

        const blob = new Blob([csvContent + '\n'], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'sample_data.csv';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    }

    function downloadApp() {
        const code = ns.dom?.codeEditor?.value || '';
        if (!code.trim()) {
            alert('Your STAGING_AREA code box is empty. Paste your final app code there first, then try again.');
            return;
        }

        // Get the filename for the selected app
        const choice = ns.getAppChoice ? ns.getAppChoice() : null;
        const filename = choice?.downloadFilename || 'app.html';

        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    }

    function handleInlineAction(action) {
        switch (action) {
            case 'download-sample-csv':
                downloadSampleCSV();
                break;
            case 'download-watchbill':
            case 'download-app':
                downloadApp();
                break;
            case 'print-summary':
                window.print();
                break;
            case 'print-study-guide':
                window.print();
                break;
            default:
                break;
        }
    }

    function wireInlineActionButtons(container) {
        if (!container) return;
        const actionable = container.querySelectorAll('[data-action]');
        actionable.forEach(element => {
            const action = element.dataset.action;
            if (!action) return;
            element.addEventListener('click', () => handleInlineAction(action));
        });
    }

    ns.downloads = {
        wireInlineActionButtons
    };
})(window.vibeApp = window.vibeApp || {});
