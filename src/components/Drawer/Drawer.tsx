import { Bell } from 'lucide-react';
import styles from './Drawer.module.css';
import type { Alert } from '../../types/Alert';
import AlertCard from '../AlertCard/AlertCard';

interface Props {
  alerts: Alert[];
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Drawer = ({ alerts, isOpen, toggleDrawer }: Props) => {
  return (
    <>
      <aside className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Live Alerts <Bell size={20} /></h2>
          <p>{alerts.length} Alerts</p>
        </div>
        <div className={styles.list}>
          {alerts.map(alert => <AlertCard key={alert.id} alert={alert} />)}
        </div>
        <div className={styles.footer}>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <button>View All</button>
        </div>
      </aside>
      <button onClick={toggleDrawer} className={styles.toggleBtn}>
        {isOpen ? '◀' : '▶'}
      </button>
    </>
  );
};

export default Drawer;
