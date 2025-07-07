import React from 'react';
import { X, Bell, AlertTriangle, Clock, MapPin } from 'lucide-react';

interface Alert {
  id: number;
  type: 'fire' | 'medical' | 'weather' | 'traffic' | 'earthquake';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  timestamp: string;
  description: string;
  status: 'active' | 'pending' | 'resolved';
  reportedBy: string;
}

interface NotificationPanelProps {
  alerts: Alert[];
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ alerts, onClose }) => {
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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const prioritizeAlerts = (alerts: Alert[]) => {
    const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
    return [...alerts].sort((a, b) => {
      // First sort by severity (critical first)
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      
      // Then by timestamp (newest first)
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  };

  const prioritizedAlerts = prioritizeAlerts(alerts);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mt-16 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <h2 className="text-lg font-bold">Active Notifications</h2>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-medium">
                {alerts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-red-100 text-sm mt-1">
            Real-time emergency alerts requiring attention
          </p>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {prioritizedAlerts.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {prioritizedAlerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    {/* Alert Icon */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: getSeverityColor(alert.severity) }}
                      >
                        <span className="text-lg">{getTypeIcon(alert.type)}</span>
                      </div>
                    </div>

                    {/* Alert Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 capitalize">
                          {alert.type} Emergency
                        </h3>
                        <span 
                          className="px-2 py-1 text-xs font-medium text-white rounded-full"
                          style={{ backgroundColor: getSeverityColor(alert.severity) }}
                        >
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{alert.location}</span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimestamp(alert.timestamp)}
                        </span>
                        <span className="text-gray-400">
                          by {alert.reportedBy}
                        </span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2 mt-3">
                        <button className="flex-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                        <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">
                          Respond
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                No Active Notifications
              </h3>
              <p className="text-xs text-gray-500">
                All clear! No emergency alerts at this time.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {prioritizedAlerts.length > 0 && (
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View All Alerts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;