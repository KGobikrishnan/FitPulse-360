import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState(() => {
    try {
      const queue = JSON.parse(localStorage.getItem('fitpulse_offline_sync_queue') || '[]');
      return queue.length;
    } catch (e) {
      return 0;
    }
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const queueOfflineAction = (actionType, payload) => {
    try {
      const queue = JSON.parse(localStorage.getItem('fitpulse_offline_sync_queue') || '[]');
      queue.push({
        id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        actionType,
        payload,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('fitpulse_offline_sync_queue', JSON.stringify(queue));
      setPendingSyncCount(queue.length);
    } catch (e) {
      console.warn('Failed to queue offline action', e);
    }
  };

  const syncPendingQueue = async () => {
    try {
      const queue = JSON.parse(localStorage.getItem('fitpulse_offline_sync_queue') || '[]');
      if (queue.length === 0) return;

      console.log(`[Offline Sync] Processing ${queue.length} pending offline actions...`);
      // When back online, notify application and flush queue
      window.dispatchEvent(new CustomEvent('fitpulse:sync-completed', { detail: { count: queue.length } }));
      localStorage.removeItem('fitpulse_offline_sync_queue');
      setPendingSyncCount(0);
    } catch (e) {
      console.warn('Error syncing offline queue', e);
    }
  };

  return { isOnline, pendingSyncCount, queueOfflineAction, syncPendingQueue };
};
