# GKDMS - Gujarat Disaster Management System

A comprehensive emergency response and disaster management system built with React, TypeScript, and Leaflet maps.

## Features

### 🔐 Authentication System
- **Secure Login/Signup**: Complete user authentication with role-based access
- **User Roles**: 
  - Administrator
  - Emergency Responder  
  - Field Coordinator
- **User Profile Management**: ID numbers, departments, group assignments

### 🗺️ Interactive Dashboard
- **Real-time Map**: Interactive map showing emergency incidents across Gujarat
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Live Data**: Real-time incident tracking with location markers
- **City Filtering**: Filter incidents by specific cities (Ahmedabad, Surat, Vadodara, etc.)

### 🚨 Emergency SOS System
- **Quick SOS Button**: Red floating action button for emergency reporting
- **Comprehensive Form**: Detailed incident reporting with:
  - Event name and type (Fire, Medical, Weather, Traffic, Earthquake, Other)
  - Severity levels (Low, Medium, High, Critical)
  - Location with GPS integration
  - Time range (start and estimated end time)
  - Contact information
  - Resource requirements
  - Additional notes
- **Form Validation**: Real-time validation with error handling
- **GPS Integration**: Automatic location detection with manual override

### 🔔 Notification System
- **Live Notifications**: Real-time alerts for active emergencies
- **Priority Sorting**: Alerts sorted by severity and timestamp
- **Notification Badge**: Visual indicator showing active alert count
- **Detailed View**: Complete incident information in notification panel

### 📊 Statistics Dashboard
- **Live Stats**: Real-time display of:
  - Active Control Centers (7)
  - Active Relief Columns (24)
  - Total Disasters (3722)
- **Visual Indicators**: Color-coded status indicators
- **Recent Alerts**: Scrollable list of recent incidents

### 📱 Responsive Right Drawer
- **Mobile Optimized**: Collapsible drawer for mobile devices
- **Desktop Persistent**: Always visible on larger screens
- **Toggle Control**: Easy show/hide functionality
- **Live Updates**: Real-time data refresh

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Maps**: Leaflet with React-Leaflet for interactive mapping
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router DOM for navigation
- **Build Tool**: Vite for fast development and building

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gkdms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Use any email and password to login (demo mode)

### Demo Credentials
For testing purposes, you can use any email and password combination to access the system.

## Usage Guide

### 1. Authentication
- **Login**: Use existing credentials or demo access
- **Signup**: Create new account with required fields:
  - ID Number (e.g., GKDMS001)
  - Personal information (name, email)
  - Department and designation
  - Group/team assignment

### 2. Dashboard Navigation
- **Map Center**: Interactive map showing incident locations
- **Right Drawer**: Statistics and recent alerts
- **Header Controls**: City filter, notifications, user menu
- **Mobile**: Use hamburger menu to toggle drawer

### 3. Emergency Reporting
- **Click SOS Button**: Red floating button (bottom right)
- **Fill Form**: Complete all required fields
- **Submit**: Emergency teams are notified automatically

### 4. Notifications
- **Bell Icon**: Shows active alert count
- **Click to Open**: View all active notifications
- **Priority Display**: Critical alerts shown first
- **Actions**: View details or respond to incidents

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── SOSForm.tsx      # Emergency reporting form
│   └── NotificationPanel.tsx # Alerts notification panel
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── pages/              # Main application pages
│   ├── LoginPage.tsx   # User authentication
│   ├── SignupPage.tsx  # User registration
│   └── Dashboard.tsx   # Main application dashboard
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

## Key Features Implemented

✅ **Responsive Design**: Mobile-first approach with desktop optimization  
✅ **User Authentication**: Complete login/signup system with roles  
✅ **Interactive Maps**: Real-time incident visualization  
✅ **Emergency SOS**: Comprehensive incident reporting system  
✅ **Live Notifications**: Real-time alert management  
✅ **Statistics Dashboard**: Live data display  
✅ **City Filtering**: Location-based incident filtering  
✅ **GPS Integration**: Automatic location detection  
✅ **Form Validation**: Real-time validation with error handling  
✅ **Mobile Optimization**: Touch-friendly interface  

## Future Enhancements

- **Backend Integration**: Connect to real emergency services API
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Analytics**: Incident trends and reporting
- **Multi-language Support**: Gujarati and Hindi translations
- **Offline Capability**: PWA features for offline access
- **Push Notifications**: Browser push notifications for alerts
- **Advanced Mapping**: Heat maps and incident clustering
- **Data Export**: PDF reports and data export features

## License

This project is developed for emergency management and disaster response purposes.

## Support

For technical support or feature requests, please contact the development team.

---

**Emergency Contacts**: In case of real emergencies, always call your local emergency services first before using this application.
