import React, { useState, useEffect } from 'react';
import { 
  Tv, BarChart4, Layers, Navigation, AlertOctagon, Smartphone, Cpu, 
  BrainCircuit, Sprout, FolderOpen, Milestone, Settings, Moon, Sun, 
  Menu, X, Bell, Cpu as AI, Compass,
  LogOut
} from 'lucide-react';



// Import components
import Login from './components/Login';
import CommandCentre from './components/CommandCentre';
import Dashboard from './components/Dashboard';
import ExecutiveAnalytics from './components/ExecutiveAnalytics';
import ForestStructures from './components/ForestStructures';
import IncidentManagement from './components/IncidentManagement';
import PatrolManagement from './components/PatrolManagement';
import MobileAppPreview from './components/MobileAppPreview';
import ScenarioSimulator from './components/ScenarioSimulator';
import AIDecisionSupport from './components/AIDecisionSupport';
import Resources from './components/Resources';
import DocumentManagement from './components/DocumentManagement';
import Strategy from './components/Strategy';

interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'fire' | 'wildlife' | 'patrol' | 'weather';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'NT-1', title: '🔴 Forest Fire Alert', desc: 'Nilgiris core range, Beat 4 sensor registered thermal spikes >48°C.', time: '2 mins ago', type: 'fire', read: false },
  { id: 'NT-2', title: '🐘 Elephant Corridor Crossing', desc: '11 Elephants tracked approaching Mudumalai border highway crossings.', time: '15 mins ago', type: 'wildlife', read: false },
  { id: 'NT-3', title: '🌧️ Heavy Rain Alert', desc: 'Anamalai Tiger Reserve watchtower sensors warning for high flash flood risk.', time: '1 hour ago', type: 'weather', read: true },
  { id: 'NT-4', title: '🚔 Patrol Missed Warning', desc: 'Sathyamangalam Beat 12 reports route schedule gaps.', time: 'Today', type: 'patrol', read: true }
];

const COPILOT_RESPONSES: Record<string, string> = {
  "Predict Fire Risk": "🔥 VanamAI Fire Forecast:\nHigh Fire Risk (91% probability) in Nilgiris Core Range tomorrow between 1 PM and 5 PM due to low scrub moisture (8%) and 38.4°C temperatures.\n\nMitigations:\n1. Deploy 3 extra patrol teams to Nilgiris Beat 4.\n2. Dispatch early warning flags to DFO Nilgiris circles.",
  "Summarize today's patrol": "🚔 Daily Patrol Summary:\n- 184 active teams deployed (98% schedule target met).\n- Total distance traversed: 1,420 km.\n- Core checkpoints visited: 56.\n- 3 active threats logged. Guards Vignesh and Balaji online; Valparai offline sync pending.",
  "Generate monthly report": "📋 Monthly State Report:\n- Area Monitored: 1.35 Million Hectares.\n- Plantation survival rate: 92%.\n- Total incidents: 42 logged (38 resolved, 4 pending).\n- Budget utilization: 74% completed. Monthly PDF exported to documents.",
  "Find wildlife hotspots": "🐘 Telemetry Corridor Alert:\n- High-density Asian Elephant corridor migrations logged Gudalur NH crossings. SMS warnings sent to local ranges.\n- Bengal Tiger corridors active in Sathyamangalam sector beats.",
  "Show pending approvals": "⚖️ Pending Executive approvals:\n- 14 core files registered.\n- Target sign-offs needed: Controlled burn authorization (#APP-192) and DFO Nilgiris poaching evidence case file review.",
  "Recommend officer allocation": "🎯 AI Guard Deployment Plan:\n- Patrol gaps observed in Sathyamangalam West core.\n- Recommend shifting 8 guards from lower ranges to Sathyamangalam Tiger buffer ranges immediately to covers key crossings."
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  
  const [activePage, setActivePage] = useState('Digital Command Centre');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    if (window.innerWidth < 768) {
      setSidebarCollapsed(true);
    }
  };
  
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsUnreadCount, setNotificationsUnreadCount] = useState(2);
  
  // Copilot Drawer states
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'assistant', text: string }[]>([
    { sender: 'assistant', text: "Vanakkam. I am the VanamAI Forest Copilot. Select a preset query below or ask anything about Tamil Nadu core forest sectors." }
  ]);
  const [userInput, setUserInput] = useState('');

  // Handle dark mode toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const handleLogin = (role: string, name: string) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
    // PCCF should immediately log in to the Executive Brief dashboard page
    if (role === 'PCCF') {
      setActivePage('AI Executive Brief');
    } else {
      setActivePage('Digital Command Centre');
    }
  };

  const handleAddNotification = (title: string, desc: string, location: string, type: Notification['type']) => {
    const newNotif: Notification = {
      id: `NT-${Date.now()}`,
      title,
      desc: `${desc} Location: ${location}`,
      time: 'Just Now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setNotificationsUnreadCount(prev => prev + 1);
  };

  const handleClearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setNotificationsUnreadCount(0);
  };

  const handleCopilotPrompt = (prompt: string) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: prompt }]);
    setTimeout(() => {
      const response = COPILOT_RESPONSES[prompt] || "I am analyzing the forest database logs. Telemetry feeds indicate stable parameters.";
      setChatMessages(prev => [...prev, { sender: 'assistant', text: response }]);
    }, 600);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const msg = userInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: msg }]);
    setUserInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'assistant', text: "I have registered your command. Searching Project VanamAI core telemetry databases..." }]);
    }, 600);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      
      {/* Sidebar Backdrop Overlay for Mobile */}
      {!sidebarCollapsed && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      
      {/* Sidebar navigation */}
      <aside className={`app-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo">V</div>
            {!sidebarCollapsed && (
              <div>
                <span className="sidebar-brand-text">Project VanamAI</span>
                <div className="sidebar-brand-subtext">Forest Portal</div>
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-menu-wrapper">
          
          {/* Operational Control section */}
          <div>
            {!sidebarCollapsed && <div className="sidebar-section-title">Operational Control</div>}
            <ul className="sidebar-menu-list">
              <li 
                className={`sidebar-menu-item ${activePage === 'Digital Command Centre' ? 'active' : ''}`}
                onClick={() => handlePageChange('Digital Command Centre')}
              >
                <Tv className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Digital Command Centre</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Forest Divisions' ? 'active' : ''}`}
                onClick={() => handlePageChange('Forest Divisions')}
              >
                <Layers className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Forest Divisions</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Forest Ranges' ? 'active' : ''}`}
                onClick={() => handlePageChange('Forest Ranges')}
              >
                <Layers className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Forest Ranges</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Forest Beats' ? 'active' : ''}`}
                onClick={() => handlePageChange('Forest Beats')}
              >
                <Layers className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Forest Beats</span>}
              </li>
            </ul>
          </div>

          {/* Decision Support section */}
          <div>
            {!sidebarCollapsed && <div className="sidebar-section-title">AI Decision Support</div>}
            <ul className="sidebar-menu-list">
              <li 
                className={`sidebar-menu-item ${activePage === 'AI Executive Brief' ? 'active' : ''}`}
                onClick={() => handlePageChange('AI Executive Brief')}
              >
                <BarChart4 className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>AI Executive Brief</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Executive Analytics' ? 'active' : ''}`}
                onClick={() => handlePageChange('Executive Analytics')}
              >
                <BarChart4 className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Executive Analytics</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'AI Scenario Simulator' ? 'active' : ''}`}
                onClick={() => handlePageChange('AI Scenario Simulator')}
              >
                <Cpu className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>AI Scenario Simulator</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'AI Decision Support' ? 'active' : ''}`}
                onClick={() => handlePageChange('AI Decision Support')}
              >
                <BrainCircuit className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Decision Support</span>}
              </li>
            </ul>
          </div>

          {/* Core Operations section */}
          <div>
            {!sidebarCollapsed && <div className="sidebar-section-title">Core Operations</div>}
            <ul className="sidebar-menu-list">
              <li 
                className={`sidebar-menu-item ${activePage === 'Incident Workflows' ? 'active' : ''}`}
                onClick={() => handlePageChange('Incident Workflows')}
              >
                <AlertOctagon className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Incident Workflows</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Patrol Tracking' ? 'active' : ''}`}
                onClick={() => handlePageChange('Patrol Tracking')}
              >
                <Navigation className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Patrol Tracking</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Ranger Field App' ? 'active' : ''}`}
                onClick={() => handlePageChange('Ranger Field App')}
              >
                <Smartphone className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Ranger Field App</span>}
              </li>
            </ul>
          </div>

          {/* Assets & Resources section */}
          <div>
            {!sidebarCollapsed && <div className="sidebar-section-title">Resources & Assets</div>}
            <ul className="sidebar-menu-list">
              <li 
                className={`sidebar-menu-item ${activePage === 'Plantation Management' ? 'active' : ''}`}
                onClick={() => handlePageChange('Plantation Management')}
              >
                <Sprout className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Plantation Management</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Wildlife Monitoring' ? 'active' : ''}`}
                onClick={() => handlePageChange('Wildlife Monitoring')}
              >
                <Compass className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Wildlife Corridors</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Forest Assets' ? 'active' : ''}`}
                onClick={() => handlePageChange('Forest Assets')}
              >
                <Settings className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Forest Assets</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Document Management' ? 'active' : ''}`}
                onClick={() => handlePageChange('Document Management')}
              >
                <FolderOpen className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Document Manager</span>}
              </li>
            </ul>
          </div>

          {/* Strategy & Vision section */}
          <div>
            {!sidebarCollapsed && <div className="sidebar-section-title">Strategy & Vision</div>}
            <ul className="sidebar-menu-list">
              <li 
                className={`sidebar-menu-item ${activePage === 'Why AI' ? 'active' : ''}`}
                onClick={() => handlePageChange('Why AI')}
              >
                <Milestone className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Why AI? (Comparison)</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Forest Digital Twin' ? 'active' : ''}`}
                onClick={() => handlePageChange('Forest Digital Twin')}
              >
                <Milestone className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Forest Digital Twin</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Innovation Highlights' ? 'active' : ''}`}
                onClick={() => handlePageChange('Innovation Highlights')}
              >
                <Milestone className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Innovation Center</span>}
              </li>
              <li 
                className={`sidebar-menu-item ${activePage === 'Platform Vision' ? 'active' : ''}`}
                onClick={() => handlePageChange('Platform Vision')}
              >
                <Milestone className="sidebar-menu-icon" />
                {!sidebarCollapsed && <span>Platform Road Map</span>}
              </li>
            </ul>
          </div>

          {/* Phase 2 Future modules info section */}
          {!sidebarCollapsed && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '11px'
            }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary-green)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Planned Phase 2 Modules
              </span>
              <ul style={{ paddingLeft: '14px', color: 'var(--sidebar-text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <li>Drone Monitoring</li>
                <li>Camera Trap AI</li>
                <li>e-Permit Transits</li>
                <li>Timber Pass Core</li>
                <li>Carbon Credits Node</li>
              </ul>
            </div>
          )}

        </div>
      </aside>

      {/* Main workspace layout */}
      <div className="main-wrapper">
        
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="nav-left">
            <button 
              className="nav-icon-btn" 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Menu size={20} />
            </button>
            
            <div className="system-title-container">
              <span className="system-badge-gov">Government of Tamil Nadu</span>
              <span className="system-title-text">Project VanamAI Portal</span>
            </div>
          </div>

          <div className="nav-right">
            
            {/* Theme Toggle */}
            <button className="nav-icon-btn" onClick={() => setIsDarkMode(!isDarkMode)} title="Toggle light/dark theme">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notification Drawer controller */}
            <button className="nav-icon-btn" onClick={() => setShowNotifications(!showNotifications)} title="Notifications Center">
              <Bell size={18} />
              {notificationsUnreadCount > 0 && <span className="nav-notification-badge" />}
            </button>

            {/* AI Assistant drawer trigger */}
            <button 
              className="btn btn-ai btn-sm" 
              onClick={() => setCopilotOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                fontSize: '12px'
              }}
            >
              <AI size={14} /> <span className="nav-copilot-text">Forest AI Copilot</span>
            </button>

            {/* User Profile */}
            <div className="user-profile-widget" onClick={() => alert(`Logged in as: ${userName}\nRole: ${userRole}`)}>
              <div className="user-profile-avatar">{userRole.slice(0, 2)}</div>
              <div className="user-profile-info">
                <span className="user-profile-name">{userName}</span>
                <span className="user-profile-role">{userRole} designation</span>
              </div>
            </div>
            
            <button 
              className="nav-icon-btn" 
              onClick={() => {
                if (window.confirm('Confirm portal logout?')) {
                  setIsLoggedIn(false);
                }
              }} 
              title="Portal Log Out"
            >
              <LogOut size={16} color="var(--color-danger)" />
            </button>
          </div>
        </header>

        {/* Notifications Panel Overlay */}
        {showNotifications && (
          <div className="notification-panel">
            <div className="notification-header">
              <span style={{ fontWeight: 700, fontSize: '13px' }}>Platform Notifications</span>
              <button 
                onClick={handleClearNotifications}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary-green)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Mark all read
              </button>
            </div>
            <div className="notification-list">
              {notifications.map((notif) => (
                <div key={notif.id} className="notification-item">
                  {!notif.read && <div className="notification-item-dot" />}
                  <div className="notification-item-content">
                    <span className="notification-item-title">{notif.title}</span>
                    <span className="notification-item-desc">{notif.desc}</span>
                    <span className="notification-item-time">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Active Page Content based on React state */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {activePage === 'Digital Command Centre' && <CommandCentre />}
          {activePage === 'Forest Divisions' && <ForestStructures level="divisions" />}
          {activePage === 'Forest Ranges' && <ForestStructures level="ranges" />}
          {activePage === 'Forest Beats' && <ForestStructures level="beats" />}
          {activePage === 'AI Executive Brief' && (
            <Dashboard 
              userName={userName} 
              userRole={userRole} 
              onNavigate={(page) => setActivePage(page)} 
            />
          )}
          {activePage === 'Executive Analytics' && <ExecutiveAnalytics />}
          {activePage === 'AI Scenario Simulator' && <ScenarioSimulator />}
          {activePage === 'AI Decision Support' && <AIDecisionSupport />}
          {activePage === 'Incident Workflows' && <IncidentManagement />}
          {activePage === 'Patrol Tracking' && <PatrolManagement />}
          {activePage === 'Ranger Field App' && <MobileAppPreview onAddNotification={handleAddNotification} />}
          {activePage === 'Plantation Management' && <Resources type="plantations" />}
          {activePage === 'Wildlife Monitoring' && <Resources type="wildlife" />}
          {activePage === 'Forest Assets' && <Resources type="assets" />}
          {activePage === 'Document Management' && <DocumentManagement />}
          {activePage === 'Why AI' && <Strategy view="whyai" />}
          {activePage === 'Forest Digital Twin' && <Strategy view="digitaltwin" />}
          {activePage === 'Innovation Highlights' && <Strategy view="innovations" />}
          {activePage === 'Platform Vision' && <Strategy view="vision" />}
        </main>
      </div>

      {/* Global AI Copilot Side Drawer */}
      <div className={`copilot-drawer ${copilotOpen ? 'open' : ''}`}>
        <div className="copilot-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AI size={18} />
            <span style={{ fontWeight: 700, fontSize: '15px' }}>Forest AI Copilot</span>
          </div>
          <button 
            onClick={() => setCopilotOpen(false)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="copilot-body">
          {/* Chat Messages */}
          <div className="copilot-chat-container">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`copilot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick Query Prompts */}
          <div className="copilot-prompt-suggestions">
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Suggested Queries
            </span>
            {Object.keys(COPILOT_RESPONSES).map((prompt) => (
              <button 
                key={prompt}
                onClick={() => handleCopilotPrompt(prompt)}
                className="copilot-suggestion-btn"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat input form */}
        <form onSubmit={handleSendChat} className="copilot-footer">
          <div className="copilot-input-wrapper">
            <input 
              type="text" 
              placeholder="Ask Forest AI..." 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '8px 12px' }}>
            Send
          </button>
        </form>
      </div>

    </div>
  );
}
