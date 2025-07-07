import React, { useState } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import MapArea from './components/MapArea/MapArea';
import Drawer from './components/Drawer/Drawer';
import { sampleAlerts } from './data/alerts';
import { Plus } from 'lucide-react';

function App() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const cities = ['all', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'];

  const filtered = selectedCity === 'all'
    ? sampleAlerts
    : sampleAlerts.filter(alert => alert.location.includes(selectedCity));

  return (
    <div className={styles.app}>
      <Header selectedCity={selectedCity} onChangeCity={setSelectedCity} cities={cities} />
      <main className={styles.main}>
        <MapArea />
        <Drawer alerts={filtered} isOpen={drawerOpen} toggleDrawer={() => setDrawerOpen(!drawerOpen)} />
      </main>
      <button className={styles.fab}><Plus size={24} /></button>
    </div>
  );
}

export default App;
