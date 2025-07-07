import type { Alert } from '../../types/Alert';
import styles from './AlertCard.module.css';

const getColor = (severity: string) => {
  switch (severity) {
    case 'high': return '#dc2626';
    case 'medium': return '#f97316';
    case 'low': return '#eab308';
    default: return '#6b7280';
  }
};

const getIcon = (type: string) => {
  switch (type) {
    case 'fire': return '🔥';
    case 'medical': return '🚑';
    case 'weather': return '🌧️';
    case 'traffic': return '🚦';
    default: return '⚠️';
  }
};

interface Props {
  alert: Alert;
}

const AlertCard = ({ alert }: Props) => {
  const color = getColor(alert.severity);

  return (
    <div className={styles.card} style={{ borderLeftColor: color }}>
      <div className={styles.header}>
        <div>{getIcon(alert.type)} <span>{alert.type.toUpperCase()}</span></div>
        <span className={styles.statusDot} style={{ backgroundColor: getColor(alert.status) }}></span>
      </div>
      <h4>{alert.location}</h4>
      <p>{alert.description}</p>
      <footer>
        <span>{alert.source}</span>
        <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
      </footer>
    </div>
  );
};

export default AlertCard;
