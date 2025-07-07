// import React, { useState, useEffect } from 'react';
// import { AlertTriangle, MapPin, Users, Bell, Plus, Settings, Search, Filter } from 'lucide-react';

// const CrisisCommandDashboard = () => {
//   const [activeAlerts, setActiveAlerts] = useState([
//     {
//       id: 1,
//       type: 'fire',
//       severity: 'high',
//       location: 'Ahmedabad - Satellite Area',
//       timestamp: '2025-01-07T14:30:00Z',
//       source: 'Fire Department',
//       description: 'Building fire reported at commercial complex',
//       status: 'active'
//     },
//     {
//       id: 2,
//       type: 'medical',
//       severity: 'medium',
//       location: 'Surat - Varachha',
//       timestamp: '2025-01-07T14:25:00Z',
//       source: 'Emergency Services',
//       description: 'Medical emergency - ambulance dispatched',
//       status: 'awaiting'
//     },
//     {
//       id: 3,
//       type: 'weather',
//       severity: 'low',
//       location: 'Rajkot - City Center',
//       timestamp: '2025-01-07T14:20:00Z',
//       source: 'IMD',
//       description: 'Heavy rain warning issued',
//       status: 'resolved'
//     }
//   ]);

//   const [selectedCity, setSelectedCity] = useState('all');
//   const [isDrawerOpen, setIsDrawerOpen] = useState(true);

//   const cities = ['all', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'];
  
//   const getSeverityColor = (severity) => {
//     switch(severity) {
//       case 'high': return { backgroundColor: '#fef2f2', borderColor: '#ef4444', color: '#dc2626' };
//       case 'medium': return { backgroundColor: '#fff7ed', borderColor: '#f97316', color: '#ea580c' };
//       case 'low': return { backgroundColor: '#fefce8', borderColor: '#eab308', color: '#ca8a04' };
//       default: return { backgroundColor: '#f9fafb', borderColor: '#6b7280', color: '#374151' };
//     }
//   };

//   const getTypeIcon = (type) => {
//     switch(type) {
//       case 'fire': return '🔥';
//       case 'medical': return '🚑';
//       case 'weather': return '🌧️';
//       case 'traffic': return '🚦';
//       default: return '⚠️';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'active': return '#ef4444';
//       case 'awaiting': return '#f97316';
//       case 'resolved': return '#10b981';
//       default: return '#6b7280';
//     }
//   };

//   const filteredAlerts = selectedCity === 'all' 
//     ? activeAlerts 
//     : activeAlerts.filter(alert => alert.location.includes(selectedCity));

//   const styles = {
//     container: {
//       height: '100vh',
//       backgroundColor: '#f9fafb',
//       display: 'flex',
//       fontFamily: 'system-ui, -apple-system, sans-serif'
//     },
//     mapArea: {
//       flex: 1,
//       position: 'relative'
//     },
//     header: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 10,
//       backgroundColor: 'white',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//       borderBottom: '1px solid #e5e7eb'
//     },
//     headerContent: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '16px 24px'
//     },
//     headerLeft: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px'
//     },
//     title: {
//       fontSize: '24px',
//       fontWeight: 'bold',
//       color: '#1f2937'
//     },
//     subtitle: {
//       fontSize: '14px',
//       color: '#6b7280'
//     },
//     headerRight: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px'
//     },
//     select: {
//       padding: '8px 12px',
//       border: '1px solid #d1d5db',
//       borderRadius: '8px',
//       outline: 'none',
//       fontSize: '14px'
//     },
//     mapPlaceholder: {
//       height: '100%',
//       background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginTop: '80px'
//     },
//     mapContent: {
//       textAlign: 'center'
//     },
//     mapTitle: {
//       fontSize: '20px',
//       fontWeight: '600',
//       color: '#374151',
//       marginBottom: '8px'
//     },
//     mapSubtitle: {
//       color: '#6b7280',
//       marginBottom: '32px'
//     },
//     statusGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(3, 1fr)',
//       gap: '16px',
//       fontSize: '14px'
//     },
//     statusItem: {
//       textAlign: 'center'
//     },
//     statusDot: {
//       width: '12px',
//       height: '12px',
//       borderRadius: '50%',
//       margin: '0 auto 4px'
//     },
//     fabButton: {
//       position: 'fixed',
//       bottom: '32px',
//       right: '32px',
//       backgroundColor: '#ef4444',
//       color: 'white',
//       border: 'none',
//       borderRadius: '50%',
//       width: '64px',
//       height: '64px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer',
//       boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
//       transition: 'all 0.2s'
//     },
//     drawer: {
//       backgroundColor: 'white',
//       boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
//       borderLeft: '1px solid #e5e7eb',
//       width: isDrawerOpen ? '384px' : '0px',
//       overflow: 'hidden',
//       transition: 'width 0.3s ease'
//     },
//     drawerContent: {
//       height: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       width: '384px'
//     },
//     drawerHeader: {
//       padding: '24px',
//       borderBottom: '1px solid #e5e7eb',
//       background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
//       color: 'white'
//     },
//     drawerHeaderTop: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginBottom: '4px'
//     },
//     drawerTitle: {
//       fontSize: '20px',
//       fontWeight: 'bold'
//     },
//     drawerBadge: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     },
//     badgeCount: {
//       backgroundColor: 'white',
//       color: '#2563eb',
//       padding: '4px 8px',
//       borderRadius: '12px',
//       fontSize: '12px',
//       fontWeight: '600'
//     },
//     drawerSubtitle: {
//       color: '#bfdbfe',
//       fontSize: '14px'
//     },
//     alertsList: {
//       flex: 1,
//       overflowY: 'auto',
//       padding: '16px',
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '16px'
//     },
//     alertCard: {
//       borderLeft: '4px solid',
//       padding: '16px',
//       borderRadius: '8px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//       cursor: 'pointer',
//       transition: 'all 0.2s'
//     },
//     alertHeader: {
//       display: 'flex',
//       alignItems: 'flex-start',
//       justifyContent: 'space-between',
//       marginBottom: '8px'
//     },
//     alertType: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     },
//     alertTypeText: {
//       fontWeight: '600',
//       fontSize: '12px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em'
//     },
//     alertLocation: {
//       fontWeight: '500',
//       color: '#1f2937',
//       marginBottom: '4px'
//     },
//     alertDescription: {
//       fontSize: '14px',
//       color: '#4b5563',
//       marginBottom: '8px'
//     },
//     alertFooter: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       fontSize: '12px',
//       color: '#6b7280'
//     },
//     drawerFooter: {
//       padding: '16px',
//       borderTop: '1px solid #e5e7eb',
//       backgroundColor: '#f9fafb'
//     },
//     footerContent: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       fontSize: '14px',
//       color: '#6b7280'
//     },
//     viewAllButton: {
//       color: '#2563eb',
//       textDecoration: 'none',
//       fontWeight: '500',
//       cursor: 'pointer'
//     },
//     toggleButton: {
//       position: 'fixed',
//       top: '50%',
//       right: '0',
//       transform: 'translateY(-50%)',
//       backgroundColor: 'white',
//       boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
//       padding: '8px',
//       borderRadius: '4px 0 0 4px',
//       border: '1px solid #e5e7eb',
//       borderRight: 'none',
//       cursor: 'pointer',
//       transition: 'all 0.2s'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Main Map Area */}
//       <div style={styles.mapArea}>
//         {/* Header */}
//         <div style={styles.header}>
//           <div style={styles.headerContent}>
//             <div style={styles.headerLeft}>
//               <h1 style={styles.title}>Crisis Command</h1>
//               <span style={styles.subtitle}>Smart City Emergency Management</span>
//             </div>
//             <div style={styles.headerRight}>
//               <select 
//                 value={selectedCity} 
//                 onChange={(e) => setSelectedCity(e.target.value)}
//                 style={styles.select}
//               >
//                 {cities.map(city => (
//                   <option key={city} value={city}>
//                     {city === 'all' ? 'All Cities' : city}
//                   </option>
//                 ))}
//               </select>
//               <button style={{ ...styles.select, border: 'none', cursor: 'pointer' }}>
//                 <Settings size={20} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Map Placeholder */}
//         <div style={styles.mapPlaceholder}>
//           <div style={styles.mapContent}>
//             <MapPin size={64} color="#3b82f6" style={{ margin: '0 auto 16px' }} />
//             <h3 style={styles.mapTitle}>Interactive Map</h3>
//             <p style={styles.mapSubtitle}>Real-time incident tracking across Gujarat</p>
//             <div style={styles.statusGrid}>
//               <div style={styles.statusItem}>
//                 <div style={{ ...styles.statusDot, backgroundColor: '#ef4444' }}></div>
//                 <span>Active (3)</span>
//               </div>
//               <div style={styles.statusItem}>
//                 <div style={{ ...styles.statusDot, backgroundColor: '#f97316' }}></div>
//                 <span>Awaiting (2)</span>
//               </div>
//               <div style={styles.statusItem}>
//                 <div style={{ ...styles.statusDot, backgroundColor: '#10b981' }}></div>
//                 <span>Resolved (8)</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Action Button */}
//         <button 
//           style={styles.fabButton}
//           onMouseEnter={(e) => {
//             e.target.style.transform = 'scale(1.1)';
//             e.target.style.backgroundColor = '#dc2626';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = 'scale(1)';
//             e.target.style.backgroundColor = '#ef4444';
//           }}
//         >
//           <Plus size={24} />
//         </button>
//       </div>

//       {/* Right Drawer */}
//       <div style={styles.drawer}>
//         <div style={styles.drawerContent}>
//           {/* Drawer Header */}
//           <div style={styles.drawerHeader}>
//             <div style={styles.drawerHeaderTop}>
//               <h2 style={styles.drawerTitle}>Live Alerts</h2>
//               <div style={styles.drawerBadge}>
//                 <Bell size={20} />
//                 <span style={styles.badgeCount}>
//                   {filteredAlerts.length}
//                 </span>
//               </div>
//             </div>
//             <p style={styles.drawerSubtitle}>Real-time incident monitoring</p>
//           </div>

//           {/* Alerts List */}
//           <div style={styles.alertsList}>
//             {filteredAlerts.map(alert => {
//               const severityStyle = getSeverityColor(alert.severity);
//               return (
//                 <div 
//                   key={alert.id} 
//                   style={{
//                     ...styles.alertCard,
//                     ...severityStyle,
//                     borderLeftColor: severityStyle.borderColor
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
//                   }}
//                 >
//                   <div style={styles.alertHeader}>
//                     <div style={styles.alertType}>
//                       <span style={{ fontSize: '18px' }}>{getTypeIcon(alert.type)}</span>
//                       <span style={{ ...styles.alertTypeText, color: severityStyle.color }}>
//                         {alert.type}
//                       </span>
//                     </div>
//                     <div 
//                       style={{ 
//                         ...styles.statusDot, 
//                         backgroundColor: getStatusColor(alert.status) 
//                       }}
//                     ></div>
//                   </div>
                  
//                   <h4 style={styles.alertLocation}>{alert.location}</h4>
//                   <p style={styles.alertDescription}>{alert.description}</p>
                  
//                   <div style={styles.alertFooter}>
//                     <span>{alert.source}</span>
//                     <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Drawer Footer */}
//           <div style={styles.drawerFooter}>
//             <div style={styles.footerContent}>
//               <span>Last updated: {new Date().toLocaleTimeString()}</span>
//               <button style={styles.viewAllButton}>
//                 View All
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Drawer Toggle Button */}
//       <button 
//         onClick={() => setIsDrawerOpen(!isDrawerOpen)}
//         style={styles.toggleButton}
//         onMouseEnter={(e) => {
//           e.target.style.backgroundColor = '#f9fafb';
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.backgroundColor = 'white';
//         }}
//       >
//         <div style={{ 
//           transform: isDrawerOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//           transition: 'transform 0.2s'
//         }}>
//           ◀
//         </div>
//       </button>
//     </div>
//   );
// };

// export default CrisisCommandDashboard;