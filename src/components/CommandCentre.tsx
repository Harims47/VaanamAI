import React, { useState } from 'react';
import { 
  Tv, Compass, AlertTriangle, Shield, CheckCircle, 
  Layers, Thermometer, Wind, Droplets, Flame, RefreshCw, Eye
} from 'lucide-react';


interface AlertItem {
  id: string;
  type: 'fire' | 'wildlife' | 'patrol' | 'weather';
  title: string;
  location: string;
  time: string;
  status: 'critical' | 'warning' | 'active' | 'info';
  details: string;
  coordinates: { x: number; y: number };
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'AL-901',
    type: 'fire',
    title: 'Thermal Anomaly (Forest Fire Risk)',
    location: 'Nilgiris core division, Beat 4',
    time: '2 mins ago',
    status: 'critical',
    details: 'Satellite MODIS sensor detected temperature elevation >48°C. Biomass moisture < 8%. Fire probability 92%.',
    coordinates: { x: 35, y: 35 }
  },
  {
    id: 'AL-902',
    type: 'wildlife',
    title: 'Elephant Herd Corridor Migration',
    location: 'Gudalur-Mudumalai buffer zone',
    time: '15 mins ago',
    status: 'warning',
    details: 'AI Telemetry node logged 11 elephants approaching Gudalur national highway crossings. Local communities alerted via SMS gateway.',
    coordinates: { x: 30, y: 40 }
  },
  {
    id: 'AL-903',
    type: 'patrol',
    title: 'Ranger Patrol Team 08 Sync',
    location: 'Sathyamangalam Tiger Reserve',
    time: '10 mins ago',
    status: 'active',
    details: 'Beat officer A. Murugan logged checkpoint CP-14. VHF radio link active. GPS signal 100%.',
    coordinates: { x: 50, y: 30 }
  },
  {
    id: 'AL-904',
    type: 'weather',
    title: 'Heavy Rainfall Alert',
    location: 'Anamalai Tiger Reserve',
    time: '1 hour ago',
    status: 'info',
    details: 'IMD reports 34mm rainfall in the last 45 minutes. Watchtower sensors warning for high flash flood risk in mountain streams.',
    coordinates: { x: 42, y: 78 }
  }
];

export default function CommandCentre() {
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(INITIAL_ALERTS[0]);
  const [activeLayers, setActiveLayers] = useState({
    fire: true,
    wildlife: true,
    patrol: true,
    water: true
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const toggleLayer = (layer: 'fire' | 'wildlife' | 'patrol' | 'water') => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>Digital Command Centre</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            <Tv className="nav-icon-btn" style={{ padding: 0, color: 'var(--color-primary-green)' }} />
            Digital Command Centre
            <span className="badge badge-danger pulse-red" style={{ fontSize: '12px', padding: '4px 10px', marginLeft: '8px' }}>
              ● Live Tracking Active
            </span>
          </h1>
          <div className="page-actions">
            <button className="btn btn-secondary btn-sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw size={14} className={isRefreshing ? 'spin-anim' : ''} />
              {isRefreshing ? 'Syncing...' : 'Sync Sensor Feed'}
            </button>
            <button className="btn btn-ai btn-sm" onClick={() => alert('Emergency SOS Broadcast initialized. Alert dispatched to all ranges.')}>
              <AlertTriangle size={14} /> Dispatch Emergency SOS
            </button>
          </div>
        </div>
      </div>

      {/* Grid Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.2fr', gap: '24px' }}>
        
        {/* Left: GIS Map Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            
            {/* Header toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'between',
              padding: '16px 24px',
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)'
            }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '14px' }}>Tamil Nadu Forest Geographic Information System (GIS)</span>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Interactive Operational Grid (Real-time telemetry overlay)</p>
              </div>
              
              {/* Layer Filters */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => toggleLayer('fire')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                    backgroundColor: activeLayers.fire ? 'rgba(220, 38, 38, 0.1)' : 'transparent',
                    color: activeLayers.fire ? 'var(--color-danger)' : 'var(--text-secondary)',
                    transition: 'all 0.2s'
                  }}
                >
                  🔴 Fire Alerts
                </button>
                <button 
                  onClick={() => toggleLayer('wildlife')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                    backgroundColor: activeLayers.wildlife ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                    color: activeLayers.wildlife ? '#d97706' : 'var(--text-secondary)',
                    transition: 'all 0.2s'
                  }}
                >
                  🟡 Elephant Zones
                </button>
                <button 
                  onClick={() => toggleLayer('patrol')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                    backgroundColor: activeLayers.patrol ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                    color: activeLayers.patrol ? '#16a34a' : 'var(--text-secondary)',
                    transition: 'all 0.2s'
                  }}
                >
                  🟢 Patrol Teams
                </button>
                <button 
                  onClick={() => toggleLayer('water')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                    backgroundColor: activeLayers.water ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                    color: activeLayers.water ? '#0284c7' : 'var(--text-secondary)',
                    transition: 'all 0.2s'
                  }}
                >
                  🔵 Water Sources
                </button>
              </div>
            </div>

            {/* GIS Map Canvas with custom vectors */}
            <div className="gis-map-container" style={{ height: '520px' }}>
              <div className="gis-grid-lines" />
              
              {/* Simulated Map Outline using SVGs */}
              <svg viewBox="0 0 500 500" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}>
                {/* State Border Simulation */}
                <path d="M 120 80 Q 200 40 320 60 Q 380 90 410 140 Q 450 220 420 300 Q 400 380 340 420 Q 280 460 250 480 Q 220 400 180 320 Q 150 250 120 180 Z" 
                  fill="none" 
                  stroke="var(--color-primary-green)" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                {/* Internal division boundary outlines */}
                <path d="M 150 120 C 180 150 220 150 250 130 C 280 180 290 220 330 250 M 180 320 C 210 330 240 380 280 420" 
                  fill="none" 
                  stroke="var(--border-color)" 
                  strokeWidth="1" 
                  opacity="0.3"
                />
                
                {/* Division Text Indicators */}
                <text x="145" y="105" fill="var(--text-muted)" fontSize="9" fontWeight="700">MUDUMALAI / NILGIRIS</text>
                <text x="260" y="180" fill="var(--text-muted)" fontSize="9" fontWeight="700">SATHYAMANGALAM</text>
                <text x="210" y="340" fill="var(--text-muted)" fontSize="9" fontWeight="700">ANAMALAI CORRIDOR</text>
              </svg>

              {/* Interactive map markers corresponding to alerts and status */}
              {activeLayers.fire && (
                <div 
                  onClick={() => setSelectedAlert(alerts[0])}
                  style={{
                    position: 'absolute',
                    top: '35%',
                    left: '35%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: 20
                  }}
                >
                  <div className="badge badge-danger pulse-red" style={{ padding: '6px 8px' }}>
                    🔥 Fire Alert: Nilgiris Beat 4
                  </div>
                </div>
              )}

              {activeLayers.wildlife && (
                <div 
                  onClick={() => setSelectedAlert(alerts[1])}
                  style={{
                    position: 'absolute',
                    top: '44%',
                    left: '26%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: 20
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'rgba(245, 158, 11, 0.9)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    boxShadow: 'var(--shadow-soft)'
                  }}>
                    🐘 Elephant Herd Crossing
                  </div>
                </div>
              )}

              {activeLayers.patrol && (
                <div 
                  onClick={() => setSelectedAlert(alerts[2])}
                  style={{
                    position: 'absolute',
                    top: '28%',
                    left: '52%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: 20
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    boxShadow: 'var(--shadow-soft)'
                  }}>
                    🟢 Patrol Team 08 (Active)
                  </div>
                </div>
              )}

              {activeLayers.water && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '74%',
                    left: '42%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'rgba(14, 165, 233, 0.9)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 700
                  }}>
                    💧 Valparai Check-Dam
                  </div>
                </div>
              )}

              {/* GIS Overlay info box */}
              <div className="gis-legend-card">
                <span className="gis-legend-title">VanamAI GIS Engine v2</span>
                <div className="gis-legend-item">
                  <div className="gis-legend-dot" style={{ backgroundColor: 'var(--color-danger)' }} />
                  <span>Fire Risk Zone (MODIS)</span>
                </div>
                <div className="gis-legend-item">
                  <div className="gis-legend-dot" style={{ backgroundColor: 'var(--color-warning)' }} />
                  <span>Wildlife Corridors</span>
                </div>
                <div className="gis-legend-item">
                  <div className="gis-legend-dot" style={{ backgroundColor: '#16a34a' }} />
                  <span>Active Live Patrols</span>
                </div>
                <div className="gis-legend-item">
                  <div className="gis-legend-dot" style={{ backgroundColor: '#0ea5e9' }} />
                  <span>Integrated Check Dams</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', marginTop: '8px', paddingTop: '8px', fontWeight: 600 }}>
                  Future GIS Core Integration preview. Live satellite SAR radar feeds mapping core vegetation thickness.
                </div>
              </div>

              {/* Map controls */}
              <div className="gis-map-controls">
                <button className="gis-control-btn" onClick={() => alert('Zooming Map Layer')} title="Zoom In">+</button>
                <button className="gis-control-btn" onClick={() => alert('Zooming Map Layer')} title="Zoom Out">-</button>
                <button className="gis-control-btn" onClick={() => alert('Toggle satellite overlay')} title="Toggle Sat Imagery">🛰️</button>
              </div>
            </div>
          </div>

          {/* Quick weather status cards */}
          <div className="grid-cols-4">
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <Thermometer style={{ color: 'var(--color-warning)' }} />
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Nilgiris Core Temp</span>
                <p style={{ fontSize: '15px', fontWeight: 700 }}>38.4°C <span style={{ fontSize: '10px', color: 'var(--color-danger)' }}>↑ Dry</span></p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <Droplets style={{ color: '#0ea5e9' }} />
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Avg Forest Humidity</span>
                <p style={{ fontSize: '15px', fontWeight: 700 }}>42% <span style={{ fontSize: '10px', color: 'var(--color-danger)' }}>↓ Low</span></p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <Wind style={{ color: 'var(--text-muted)' }} />
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Wind Speed</span>
                <p style={{ fontSize: '15px', fontWeight: 700 }}>18 km/h <span style={{ fontSize: '10px', color: 'var(--color-warning)' }}>W-NW</span></p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <Flame style={{ color: 'var(--color-danger)' }} />
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Overall Fire Risk</span>
                <p style={{ fontSize: '15px', fontWeight: 700 }}>High <span style={{ fontSize: '10px', color: 'var(--color-danger)' }}>Class IV</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Feeds Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Active Sensor Alerts */}
          <div className="card" style={{ height: '390px', display: 'flex', flexDirection: 'column' }}>
            <span className="card-title">
              <Compass size={18} style={{ color: 'var(--color-primary-green)' }} />
              Active Incident Feeds
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
              {alerts.map(alertItem => (
                <div 
                  key={alertItem.id} 
                  onClick={() => setSelectedAlert(alertItem)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: selectedAlert?.id === alertItem.id ? 'var(--bg-primary)' : 'transparent',
                    border: `1px solid ${selectedAlert?.id === alertItem.id ? 'var(--color-primary-green)' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>{alertItem.id}</span>
                    <span className={`badge ${
                      alertItem.status === 'critical' ? 'badge-danger' : 
                      alertItem.status === 'warning' ? 'badge-warning' : 
                      alertItem.status === 'active' ? 'badge-success' : 'badge-info'
                    }`}>
                      {alertItem.status}
                    </span>
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{alertItem.title}</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    <span>📍 {alertItem.location}</span>
                    <span>⏱️ {alertItem.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Panel for Selected Alert */}
          {selectedAlert && (
            <div className="card" style={{ flex: 1 }}>
              <span className="card-title" style={{ fontSize: '14px', color: 'var(--color-danger)' }}>
                <AlertTriangle size={18} />
                Sensor Details: {selectedAlert.id}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px' }}>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Target Event:</span>
                  <p style={{ marginTop: '2px', fontWeight: 500 }}>{selectedAlert.title}</p>
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Geo-Location:</span>
                  <p style={{ marginTop: '2px' }}>{selectedAlert.location}</p>
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Sensor Data:</span>
                  <p style={{ marginTop: '4px', padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '11px' }}>
                    {selectedAlert.details}
                  </p>
                </div>
                
                {/* Quick actions for Command Center */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button 
                    onClick={() => alert(`Ranger force dispatched to coordinates of ${selectedAlert.id}`)}
                    className="btn btn-primary btn-sm" 
                    style={{ flex: 1 }}
                  >
                    <Shield size={12} /> Dispatch Force
                  </button>
                  <button 
                    onClick={() => alert(`Event ${selectedAlert.id} marked as resolved.`)}
                    className="btn btn-secondary btn-sm" 
                    style={{ flex: 1 }}
                  >
                    <CheckCircle size={12} /> Resolve Event
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Trap Live Feeds */}
      <div className="card">
        <span className="card-title">
          <Eye size={18} style={{ color: 'var(--color-primary-green)' }} />
          Integrated AI Camera Traps (Tiger Corridor Sightings)
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {[
            { tag: 'CAM-401', desc: 'Bengal Tiger spotted', loc: 'Mudumalai Core', time: 'Today 14:32', image: '#022c22' },
            { tag: 'CAM-405', desc: 'Leopard movement detected', loc: 'Sathyamangalam Buffer', time: 'Today 12:15', image: '#064e3b' },
            { tag: 'CAM-409', desc: 'Nilgiri Tahr Herd', loc: 'Nilgiris Upper Plateau', time: 'Yesterday 17:40', image: '#14532d' },
            { tag: 'CAM-412', desc: 'Elephant migration check', loc: 'Gudalur Crossing', time: 'Today 10:04', image: '#1e293b' }
          ].map((camera, i) => (
            <div key={i} style={{
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-primary)'
            }}>
              {/* Simulated camera capture graphic */}
              <div style={{
                height: '140px',
                backgroundColor: camera.image,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '11px',
                fontWeight: 700,
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'red', borderRadius: '50%', display: 'inline-block' }}></span>
                  <span style={{ color: 'white', fontSize: '9px', textTransform: 'uppercase' }}>{camera.tag} LIVE</span>
                </div>
                {/* SVG representing animal outline */}
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" opacity="0.3">
                  <ellipse cx="50" cy="50" rx="35" ry="20" fill="white" />
                  <circle cx="75" cy="40" r="12" fill="white" />
                  <rect x="25" y="55" width="8" height="25" fill="white" />
                  <rect x="40" y="58" width="8" height="22" fill="white" />
                  <rect x="62" y="55" width="8" height="25" fill="white" />
                </svg>

                <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#4ade80', fontSize: '9px', fontWeight: 600 }}>
                  AI Confidence: 96%
                </div>
              </div>
              <div style={{ padding: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, display: 'block' }}>{camera.desc}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>📍 {camera.loc}</span>
                  <span>{camera.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
