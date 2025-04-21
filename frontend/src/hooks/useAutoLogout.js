import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 menit

const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const token = localStorage.getItem('token');
        if (token) {
          alert('🔒 Tidak ada aktivitas selama 5 menit. Kamu telah logout otomatis.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
        }
      }, IDLE_TIMEOUT);
    };

    const activityEvents = ['mousemove', 'keydown', 'scroll', 'click'];
    activityEvents.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Set timer saat pertama kali masuk

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timer);
    };
  }, [navigate]);
};

export default useAutoLogout;
