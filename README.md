# Smart City Monitoring System

A real-time city management and monitoring dashboard built with React, TypeScript, and Tailwind CSS.

## 🏙️ Overview

Smart City Monitoring is a comprehensive dashboard for managing and monitoring various city operations including:

- **Real-time Map Monitoring**: Interactive map with incident markers and real-time updates
- **Emergency Response**: SOS reporting and incident management
- **Weather Alerts**: Live weather monitoring and alerts
- **Statistical Dashboard**: Key metrics for control centers, relief columns, and disaster statistics
- **Incident Management**: Track and manage various types of city incidents (fire, medical, weather, traffic)

## 🚀 Features

### Current Implementation
- ✅ **Clean, Simple Header**: Inspired by GKDMS design with Smart City branding
- ✅ **Fixed Right Sidebar**: Always visible with statistics and alerts (non-collapsible)
- ✅ **Interactive Map**: Leaflet-based map with incident markers and popups
- ✅ **Weather Alerts Panel**: Real-time weather notifications
- ✅ **Statistics Cards**: Active control centers, relief columns, and disaster counts
- ✅ **Authentication System**: Login/signup with role-based access
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **SOS Reporting**: Emergency reporting system
- ✅ **Real-time Notifications**: Alert system with notification panel

### Prepared for Database Integration
- 🔄 **Modular Data Structure**: Clean interfaces ready for API integration
- 🔄 **Authentication Context**: Ready for backend authentication
- 🔄 **State Management**: Structured for real-time data updates
- 🔄 **API-Ready Components**: Designed for easy backend integration

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Maps**: React Leaflet
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-city-monitoring
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AlertCard/       # Alert/incident cards
│   ├── Drawer/          # Sidebar drawer components
│   ├── Header/          # Header components
│   ├── MapArea/         # Map-related components
│   ├── NotificationPanel.tsx
│   └── SOSForm.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── pages/               # Page components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── LoginPage.tsx    # Login page
│   └── SignupPage.tsx   # Registration page
├── types/               # TypeScript type definitions
├── data/                # Static data and constants
└── assets/              # Static assets
```

## 🎨 Design Principles

### Layout Architecture
- **Header**: Clean, simple navigation with app branding
- **Main Content**: Full-width map with interactive elements
- **Right Sidebar**: Fixed, always-visible information panel
- **Footer Banner**: Status bar for emergency information

### Color Scheme
- **Primary**: Blue (#3b82f6) - Headers and primary actions
- **Secondary**: Teal (#10b981) - Success states and secondary info
- **Accent**: Red (#ef4444) - Alerts and emergency indicators
- **Background**: Gray (#f9fafb) - Main background

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MAP_API_KEY=your_map_api_key
VITE_WEATHER_API_KEY=your_weather_api_key
```

### Map Configuration
The application uses OpenStreetMap by default. To use a different tile provider:

1. Update the `TileLayer` URL in `Dashboard.tsx`
2. Add any required API keys to environment variables

## 🔮 Future Development

### Database Integration Roadmap
1. **Backend API Setup**
   - Express.js/Node.js or your preferred backend
   - Database (PostgreSQL/MongoDB recommended)
   - Authentication middleware

2. **Real-time Features**
   - WebSocket integration for live updates
   - Push notifications
   - Real-time map marker updates

3. **Enhanced Features**
   - Advanced filtering and search
   - Historical data analysis
   - Report generation
   - Multi-language support

### API Integration Points
- `src/contexts/AuthContext.tsx` - Authentication endpoints
- `src/pages/Dashboard.tsx` - Data fetching hooks
- `src/components/SOSForm.tsx` - Emergency reporting endpoints

## 📱 Usage

### For Administrators
- View real-time city statistics
- Monitor active incidents on the map
- Receive and manage emergency alerts
- Track response team deployment

### For Emergency Responders
- Report incidents via SOS form
- View assigned tasks and locations
- Update incident status
- Communicate with command center

### For Citizens (Future)
- Report non-emergency issues
- View public safety information
- Receive emergency notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Smart City Monitoring System** - Building smarter, safer cities through technology.
