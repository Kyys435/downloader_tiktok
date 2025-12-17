// Inline JavaScript
// Modal
    function openProfileModal() {
      document.getElementById('profileModal').style.display = 'flex';
    }
    function closeProfileModal() {
      document.getElementById('profileModal').style.display = 'none';
    }

    // Downloader Logic
    document.addEventListener('DOMContentLoaded', () => {
      const elements = {
        downloadBtn: document.getElementById('downloadBtn'),
        urlInput: document.getElementById('urlInput'),
        loadingSection: document.getElementById('loadingSection'),
        messageSection: document.getElementById('messageSection'),
        messageText: document.getElementById('messageText')
      };

      elements.downloadBtn.addEventListener('click', handleDownload);
      elements.urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleDownload();
      });

      async function handleDownload() {
        const url = elements.urlInput.value.trim();
        if (!url) {
          showMessage('Link TikTok-nya belum diisi, nih!', 'error');
          return;
        }
        if (!url.includes('tiktok.com')) {
          showMessage('Pastikan link-nya dari TikTok, ya!', 'error');
          return;
        }

        hideMessage();
        setLoadingState(true);

        try {
          const encodedUrl = encodeURIComponent(url);
          const apiUrl = `https://api.zenzxz.my.id/api/downloader/tiktok?url=${encodedUrl}`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.success && data.data) {
            const cleanData = JSON.parse(JSON.stringify(data.data), (key, value) => {
              return typeof value === 'string' ? value.trim() : value;
            });
            sessionStorage.setItem('tiktokData', JSON.stringify(cleanData));
            showMessage('Admin Berhasil Mendapatkan Data...', 'success');
            setTimeout(() => window.location.href = 'Snapber/Result', 750);
          } else {
            showMessage('Gagal ambil video. Coba ulang, ya!', 'error');
          }
        } catch (error) {
          console.error('Error:', error);
          showMessage('Ada gangguan koneksi. Cek internetmu!', 'error');
        } finally {
          setLoadingState(false);
        }
      }

      function setLoadingState(isLoading) {
        elements.loadingSection.style.display = isLoading ? 'block' : 'none';
        elements.downloadBtn.disabled = isLoading;
        elements.downloadBtn.innerHTML = isLoading
          ? '<i class="fas fa-spinner fa-spin"></i> PROSES...'
          : '<i class="fas fa-download"></i> UNDUH';
      }

      function showMessage(msg, type = 'info') {
        elements.messageText.textContent = msg;
        elements.messageSection.className = '';
        elements.messageSection.classList.add(`message-${type}`);
        elements.messageSection.style.display = 'block';
      }

      function hideMessage() {
        elements.messageSection.style.display = 'none';
      }

      elements.urlInput.focus();
    });
    
(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const hideLoader = () => {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => loader.remove(), 300);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideLoader);
  } else {
    hideLoader();
  }
})();

