import { Settings } from 'lucide-react';
import styles from './Header.module.css';

interface Props {
  selectedCity: string;
  onChangeCity: (city: string) => void;
  cities: string[];
}

const Header = ({ selectedCity, onChangeCity, cities }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Smart City Incident Management</h1>
        <span>Emergency Control Panel</span>
      </div>
      <div className={styles.right}>
        <select value={selectedCity} onChange={(e) => onChangeCity(e.target.value)}>
          {cities.map(city => (
            <option key={city} value={city}>{city === 'all' ? 'All Cities' : city}</option>
          ))}
        </select>
        <button className={styles.settingsBtn}><Settings size={20} /></button>
      </div>
    </header>
  );
};

export default Header;
