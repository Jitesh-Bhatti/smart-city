import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { 
  Bell, 
  Plus, 
  LogOut, 
  Menu, 
  X, 
  AlertTriangle, 
  Users, 
  Activity,
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SOSForm from '../components/SOSForm';
import NotificationPanel from '../components/NotificationPanel';
import L from 'leaflet';

// Fix for React-Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Alert {
  id: number;
  type: 'fire' | 'medical' | 'weather' | 'traffic' | 'earthquake';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  coordinates: [number, number];
  timestamp: string;
  description: string;
  status: 'active' | 'pending' | 'resolved';
  reportedBy: string;
}

const Dashboard: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [showSOSForm, setShowSOSForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');
  
  const { user, logout } = useAuth();
  
  // Sample data
  const [alerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'fire',
      severity: 'high',
      location: 'Ahmedabad - SG Highway',
      coordinates: [23.0225, 72.5714],
      timestamp: new Date().toISOString(),
      description: 'Building fire reported at commercial complex',
      status: 'active',
      reportedBy: 'Fire Department'
    },
    {
      id: 2,
      type: 'medical',
      severity: 'medium',
      location: 'Surat - Udhna',
      coordinates: [21.1959, 72.8302],
      timestamp: new Date(Date.now() - 300000).toISOString(),
      description: 'Medical emergency - ambulance dispatched',
      status: 'pending',
      reportedBy: 'Emergency Services'
    },
    {
      id: 3,
      type: 'weather',
      severity: 'low',
      location: 'Rajkot - Racecourse',
      coordinates: [22.3039, 70.8022],
      timestamp: new Date(Date.now() - 600000).toISOString(),
      description: 'Heavy rain warning issued',
      status: 'resolved',
      reportedBy: 'IMD'
    }
  ]);

  const cities = ['all', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'];
  
  const filteredAlerts = selectedCity === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.location.toLowerCase().includes(selectedCity.toLowerCase()));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ef4444';
      case 'medium': return '#f97316';
      case 'low': return '#eab308';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fire': return '🔥';
      case 'medical': return '🚑';
      case 'weather': return '🌧️';
      case 'traffic': return '🚦';
      case 'earthquake': return '🌍';
      default: return '⚠️';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#ef4444';
      case 'pending': return '#f97316';
      case 'resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  const statsData = [
    { label: 'Active Control Centers', value: 7, color: '#3b82f6' },
    { label: 'Active Relief Columns', value: 24, color: '#10b981' },
    { label: 'Total Disasters', value: 3722, color: '#ef4444' }
  ];

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GKDMS</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Gujarat Disaster Management</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* City Selector */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>

              {/* Notifications Button */}
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                {filteredAlerts.filter(a => a.status === 'active').length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {filteredAlerts.filter(a => a.status === 'active').length}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.designation?.replace('_', ' ')}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors lg:hidden"
              >
                {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Map Area */}
        <div className="flex-1 relative">
          <MapContainer 
            center={[23.0225, 72.5714]} 
            zoom={7} 
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredAlerts.map(alert => (
              <Marker key={alert.id} position={alert.coordinates}>
                <Popup>
                  <div className="p-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{getTypeIcon(alert.type)}</span>
                      <span className="font-semibold capitalize">{alert.type} Alert</span>
                    </div>
                    <p className="text-sm font-medium">{alert.location}</p>
                    <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span 
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: getSeverityColor(alert.severity) }}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                      <span 
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: getStatusColor(alert.status) }}
                      >
                        {alert.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* SOS Button */}
          <button
            onClick={() => setShowSOSForm(true)}
            className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-20"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Right Drawer */}
      <div className={`${drawerOpen ? 'translate-x-0' : 'translate-x-full'} fixed lg:relative lg:translate-x-0 right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 z-50 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Live Dashboard</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-blue-100 text-sm mt-1">Real-time monitoring</p>
          </div>

          {/* Stats Cards */}
          <div className="p-4 space-y-4">
            {statsData.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 rounded-full" style={{ backgroundColor: `${stat.color}20` }}>
                    {index === 0 && <Users className="h-6 w-6" style={{ color: stat.color }} />}
                    {index === 1 && <Activity className="h-6 w-6" style={{ color: stat.color }} />}
                    {index === 2 && <AlertTriangle className="h-6 w-6" style={{ color: stat.color }} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Alerts */}
          <div className="flex-1 overflow-hidden">
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Recent Alerts</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredAlerts.slice(0, 10).map(alert => (
                <div 
                  key={alert.id} 
                  className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{getTypeIcon(alert.type)}</span>
                      <span className="text-sm font-medium capitalize">{alert.type}</span>
                    </div>
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getStatusColor(alert.status) }}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">{alert.location}</p>
                  <p className="text-xs text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{alert.reportedBy}</span>
                    <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SOS Form Modal */}
      {showSOSForm && (
        <SOSForm onClose={() => setShowSOSForm(false)} />
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationPanel 
          alerts={filteredAlerts.filter(a => a.status === 'active')}
          onClose={() => setShowNotifications(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;