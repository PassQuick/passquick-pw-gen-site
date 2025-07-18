if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(() => {
          console.log("✅ Service Worker registered");
        }).catch(err => {
          console.warn("Service Worker not registered:", err);
        });
      });
    }
