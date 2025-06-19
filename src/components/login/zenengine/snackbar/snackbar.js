
  import { useEffect, useState } from 'react';
  import './snackbar.css';
  
  export default function SnackBar({ message, duration, onClose }) {
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false)
        const closeEvent = setTimeout(() => {
          onClose()
        }, 500);
        return () => clearTimeout(closeEvent);
      }, duration);
      return () => clearTimeout(timer);
      //eslint-disable-next-line
    }, [message]);
  
    return (
      <div className={`snackbar ${visible ? 'show' : ''}`}>
        {message}
      </div>
    );
  }
  