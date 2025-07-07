import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { 
  Bell, 
  Plus, 
  LogOut, 
  AlertTriangle, 
  Users, 
  Activity,
  Home,
  Cloud,
  CloudRain
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

interface WeatherAlert {
  id: number;
  type: 'rain' | 'thunderstorm' | 'wind';
  title: string;
  description: string;
  time: string;
  icon: any;
}

const Dashboard: React.FC = () => {
  const [showSOSForm, setShowSOSForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
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

  const [weatherAlerts] = useState<WeatherAlert[]>([
    {
      id: 1,
      type: 'rain',
      title: 'RAIN',
      description: 'Light to moderate spells of rain very likely to occur at isolated places in the districts of...',
      time: '7/7/2025, 10:06:23 PM',
      icon: CloudRain
    },
    {
      id: 2,
      type: 'thunderstorm',
      title: 'RAIN',
      description: 'Light Thunderstorm with moderate rain is very likely to occur at isolated places over Dadra...',
      time: '7/7/2025, 9:59:59 PM',
      icon: CloudRain
    },
    {
      id: 3,
      type: 'rain',
      title: 'RAIN',
      description: 'Light Thunderstorm with moderate rain is very likely to occur at isolated places over Dadra...',
      time: '7/7/2025, 9:59:59 PM',
      icon: CloudRain
    }
  ]);

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
    { label: 'Active Control Centers', value: 7, color: '#3b82f6', bgColor: 'bg-blue-500' },
    { label: 'Active Relief Columns', value: 23, color: '#10b981', bgColor: 'bg-teal-500' },
    { label: 'Disasters', value: 3722, color: '#ef4444', bgColor: 'bg-green-500' }
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header - Clean and Simple */}
      <header className="bg-blue-600 text-white shadow-lg z-50 relative">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Smart City Monitoring</h1>
              <p className="text-blue-100 text-sm hidden sm:block">Real-time City Management System</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications Button */}
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
            >
              <Bell className="h-5 w-5" />
              {alerts.filter(a => a.status === 'active').length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {alerts.filter(a => a.status === 'active').length}
                </span>
              )}
            </button>

            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-blue-200 capitalize">{user?.designation?.replace('_', ' ')}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex relative">
        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer 
            center={[23.0225, 72.5714]} 
            zoom={7} 
            className="h-full w-full z-10"
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {alerts.map(alert => (
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
            className="absolute bottom-6 left-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-30"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Right Sidebar - Always Visible */}
        <div className="w-80 bg-white border-l border-gray-200 z-20 relative flex flex-col">
          {/* Stats Cards */}
          <div className="p-4 space-y-3">
            {statsData.map((stat, index) => (
              <div key={index} className={`${stat.bgColor} text-white rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-opacity-90 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-full bg-white bg-opacity-20">
                    {index === 0 && <Users className="h-6 w-6 text-white" />}
                    {index === 1 && <Activity className="h-6 w-6 text-white" />}
                    {index === 2 && <AlertTriangle className="h-6 w-6 text-white" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Weather Alerts Section */}
          <div className="flex-1 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-blue-500" />
                <span>Weather Alerts</span>
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {weatherAlerts.map(alert => (
                <div key={alert.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 bg-blue-500 rounded-lg">
                      <alert.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-blue-900">{alert.title}</h4>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed mb-2 line-clamp-2">
                        {alert.description}
                      </p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="border-t border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Recent Incidents</h3>
            </div>
            <div className="max-h-48 overflow-y-auto p-4 space-y-3">
              {alerts.slice(0, 3).map(alert => (
                <div 
                  key={alert.id} 
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3"
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
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{alert.description}</p>
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
        <div className="fixed inset-0 z-50">
          <SOSForm onClose={() => setShowSOSForm(false)} />
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 z-50">
          <NotificationPanel 
            alerts={alerts.filter(a => a.status === 'active')}
            onClose={() => setShowNotifications(false)} 
          />
        </div>
      )}

      {/* Active SOS Banner */}
      <div className="bg-red-600 text-white px-6 py-2 z-40 relative">
        <div className="flex items-center justify-center">
          <span className="text-sm font-medium">
            Active SOS: {alerts.filter(a => a.status === 'active').length} | 
            Resolved SOS: {alerts.filter(a => a.status === 'resolved').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;