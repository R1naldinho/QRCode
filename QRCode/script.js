var currentQRCode = null;

function generateQRCode() {
    var linkInput = document.getElementById('linkInput');
    var link = linkInput.value;

    if (!link.trim()) {
        alert('Please enter a valid link.');
        return;
    }

    document.getElementById('qrcode').innerHTML = ''

    if (currentQRCode !== null) {
        currentQRCode.clear();
        currentQRCode.makeCode('');
    }

    currentQRCode = new QRCode(document.getElementById('qrcode'), {
        text: link,
        width: 128,
        height: 128
    });

    var downloadBtn = document.createElement('a');
    downloadBtn.href = document.getElementById('qrcode').querySelector('canvas').toDataURL();
    downloadBtn.download = 'qrcode.png';

    // Add the download icon
    var downloadIcon = document.createElement('span');
    downloadIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
        </svg>
    `;

    // Set the text for the link
    var downloadText = document.createTextNode(' Download QR Code');

    // Append the icon and text to the download link
    downloadBtn.appendChild(downloadIcon);
    downloadBtn.appendChild(downloadText);

    // Clear previous download link
    var previousDownloadBtn = document.getElementById('downloadBtn');
    if (previousDownloadBtn) {
        previousDownloadBtn.remove();
    }

    // Append the new download link
    downloadBtn.id = 'downloadBtn';
    document.getElementById('qrcode').appendChild(downloadBtn);

    var img = document.getElementById('qrcode').querySelector('img');
    img.style.setProperty('display', 'inline-block', 'important');
    img.style.margin = 'auto';
}

function clearLinkInput(){
    document.getElementById('linkInput').value = ''
}
