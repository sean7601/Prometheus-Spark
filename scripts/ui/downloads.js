(function(ns) {
    const dom = ns.dom || {};

    function downloadSampleCSV() {
        const csvContent = [
            'Name,Rank,Section',
            'Alex Smith,LT,Operations',
            'Jordan Lee,LTJG,Maintenance'
        ].join('\n') + '\n';

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'roster_sample.csv';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    }

    function downloadWatchbill() {
        const code = dom.codeEditor?.value || '';
        if (!code.trim()) {
            alert('Your STAGING_AREA code box is empty. Paste your final app code there first, then try again.');
            return;
        }

        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'watchbill.html';
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
                downloadWatchbill();
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
