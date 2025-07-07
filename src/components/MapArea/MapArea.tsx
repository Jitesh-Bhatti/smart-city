import { MapPin } from 'lucide-react';
import styles from './MapArea.module.css';

const MapArea = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centered}>
        <MapPin size={64} color="#3b82f6" />
        <h3>Interactive Map</h3>
        <p>Real-time incident tracking across Gujarat</p>
        <div className={styles.legend}>
          <span><span className={styles.dot} style={{ backgroundColor: '#ef4444' }}></span> Active</span>
          <span><span className={styles.dot} style={{ backgroundColor: '#f97316' }}></span> Awaiting</span>
          <span><span className={styles.dot} style={{ backgroundColor: '#10b981' }}></span> Resolved</span>
        </div>
      </div>
    </div>
  );
};

export default MapArea;
