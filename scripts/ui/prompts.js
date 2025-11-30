(function(ns) {
    function fallbackCopy(text) {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.setAttribute('readonly', '');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
    }

    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            fallbackCopy(text);
        }
    }

    function attachPromptCopyHandler(button, promptText) {
        if (!button) return;
        button.addEventListener('click', async () => {
            const original = button.innerText;
            button.disabled = true;
            await copyToClipboard(promptText);
            button.innerText = 'COPIED!';
            button.style.background = '#00ff9d';
            button.style.color = '#000';
            setTimeout(() => {
                button.innerText = original;
                button.style.background = '';
                button.style.color = '';
                button.disabled = false;
            }, 1500);
        });
    }

    ns.prompts = {
        attachPromptCopyHandler
    };
})(window.vibeApp = window.vibeApp || {});
