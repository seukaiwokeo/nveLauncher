const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    handleWindowControls();
});

window.addEventListener('beforeunload', () => {
    ipcRenderer.removeAllListeners();
});

function handleWindowControls() {
    const minButton = document.getElementById('min-button');
    const maxButton = document.getElementById('max-button');
    const restoreButton = document.getElementById('restore-button');
    const closeButton = document.getElementById('close-button');

    minButton.addEventListener('click', () => {
        ipcRenderer.send('minimize-window');
    });

    maxButton.addEventListener('click', () => {
        ipcRenderer.send('maximize-window');
    });

    restoreButton.addEventListener('click', () => {
        ipcRenderer.send('restore-window');
    });

    closeButton.addEventListener('click', () => {
        ipcRenderer.send('close-window');
    });

    ipcRenderer.on('window-status', (event, isMaximized) => {
        const body = document.body;
        if (isMaximized) {
            body.classList.add('maximized');
        } else {
            body.classList.remove('maximized');
        }
    });

    ipcRenderer.send('get-window-status');
}