import { useState } from 'react';
import { 
  Smartphone, Camera, Flame, Eye, RefreshCw, 
  MapPin, ShieldAlert, CheckCircle, Wifi, Database 
} from 'lucide-react';

interface MobilePreviewProps {
  onAddNotification: (title: string, desc: string, location: string, type: 'fire' | 'wildlife' | 'patrol' | 'weather') => void;
}

export default function MobileAppPreview({ onAddNotification }: MobilePreviewProps) {
  const [activeScreen, setActiveScreen] = useState<'home' | 'fire' | 'wildlife' | 'sos' | 'success'>('home');
  const [animalCount, setAnimalCount] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState('Elephant');
  const [isSyncing, setIsSyncing] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const handleFireReport = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNotification(
      '🔴 Fire Alert Dispatched',
      `Forest Guard Vignesh reported active smoke plume. Thermal index high.`,
      'Sathyamangalam Core Range',
      'fire'
    );
    setPhotoCaptured(false);
    setActiveScreen('success');
  };

  const handleWildlifeReport = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNotification(
      '🟡 Elephant Movement Triggered',
      `Guard reported ${animalCount} ${selectedAnimal}(s) crossing core zone buffer borders.`,
      'Mudumalai Border NH-18',
      'wildlife'
    );
    setActiveScreen('success');
  };

  const triggerSOS = () => {
    onAddNotification(
      '🔴 EMERGENCY SOS SIGNAL',
      'Ranger Vignesh triggered emergency backup dispatch signal.',
      'Sathyamangalam East core',
      'patrol'
    );
    setActiveScreen('sos');
  };

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Offline database caches synced successfully. Cloud backup complete.');
    }, 1200);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>Ranger Field App Simulator</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            <Smartphone style={{ color: 'var(--color-primary-green)' }} />
            Ranger Mobile App Simulator
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            This simulator demonstrates the offline-first field app used by Forest Guards & Foresters on active beats.
          </p>
        </div>
      </div>

      <div className="mobile-preview-layout">
        
        {/* Left: Device Simulator Shell */}
        <div className="mobile-device-container">
          <div className="mobile-phone-frame">
            <div className="mobile-phone-speaker" />
            <div className="mobile-phone-screen">
              
              {/* App status bar */}
              <div className="mobile-phone-header">
                <span style={{ fontSize: '11px', fontWeight: 600 }}>09:41 AM</span>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <Wifi size={12} color="#22c55e" />
                  <Database size={11} color="#60a5fa" />
                  <span style={{ fontSize: '10px' }}>100%</span>
                </div>
              </div>

              {/* Main screen content conditional */}
              {activeScreen === 'home' && (
                <div className="mobile-phone-body" style={{ color: '#0f172a' }}>
                  {/* Ranger profile summary */}
                  <div style={{
                    backgroundColor: '#1e293b',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Active Forest Officer</span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>Ranger R. Vignesh</span>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>Beat: Sathyamangalam East core</span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '9px',
                      color: '#cbd5e1',
                      marginTop: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      padding: '4px 6px',
                      borderRadius: '4px'
                    }}>
                      <MapPin size={10} color="red" /> GPS Tracker active (Galileo L1)
                    </div>
                  </div>

                  {/* Operational actions */}
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginTop: '10px', display: 'block' }}>
                    Quick Field Reporting
                  </span>

                  <div className="mobile-action-card" onClick={() => setActiveScreen('fire')}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: 'var(--color-danger)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Flame size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, display: 'block' }}>Report Forest Fire</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Capture smoke plume coordinates</span>
                    </div>
                  </div>

                  <div className="mobile-action-card" onClick={() => setActiveScreen('wildlife')}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      color: '#d97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Eye size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, display: 'block' }}>Report Wildlife Sighting</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Log elephants/tigers corridors</span>
                    </div>
                  </div>

                  {/* Sync status & SOS buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <button 
                      onClick={triggerSync}
                      style={{
                        padding: '12px 6px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: 'white',
                        color: '#0f172a',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RefreshCw size={16} className={isSyncing ? 'spin-anim' : ''} />
                      <span>{isSyncing ? 'Syncing...' : 'Offline Sync'}</span>
                    </button>
                    <button 
                      onClick={triggerSOS}
                      style={{
                        padding: '12px 6px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-danger)',
                        color: 'white',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <ShieldAlert size={16} />
                      <span>Emergency SOS</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Fire Report screen */}
              {activeScreen === 'fire' && (
                <div className="mobile-phone-body" style={{ color: '#0f172a' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', display: 'block' }}>Report Forest Fire Smoke</span>
                  <form onSubmit={handleFireReport} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>1. Capture Plume Evidence</span>
                      <div 
                        onClick={() => setPhotoCaptured(true)}
                        style={{
                          height: '110px',
                          border: '1px dashed #cbd5e1',
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backgroundColor: photoCaptured ? 'rgba(34, 197, 94, 0.05)' : 'white',
                          color: photoCaptured ? 'var(--color-primary-green)' : '#64748b',
                          fontSize: '12px'
                        }}
                      >
                        <Camera size={24} style={{ marginBottom: '4px' }} />
                        <span>{photoCaptured ? 'PhotoCaptured_Fire08.jpg' : 'Tap to simulate photo capture'}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>2. GPS Verification coords</span>
                      <input 
                        type="text" 
                        readOnly 
                        value="11.4589° N, 77.1245° E (Auto)" 
                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#f1f5f9', outline: 'none' }} 
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button 
                        type="button" 
                        onClick={() => setActiveScreen('home')} 
                        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        style={{ flex: 1, padding: '10px', borderRadius: '6px', backgroundColor: 'var(--color-danger)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                      >
                        Dispatch Alert
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Wildlife report screen */}
              {activeScreen === 'wildlife' && (
                <div className="mobile-phone-body" style={{ color: '#0f172a' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', display: 'block' }}>Log Wildlife Sighting</span>
                  <form onSubmit={handleWildlifeReport} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>1. Target Species</span>
                      <select 
                        value={selectedAnimal} 
                        onChange={(e) => setSelectedAnimal(e.target.value)}
                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' }}
                      >
                        <option value="Elephant">Elephant Herd</option>
                        <option value="Tiger">Bengal Tiger</option>
                        <option value="Leopard">Leopard</option>
                        <option value="Nilgiri Tahr">Nilgiri Tahr</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>2. Herd Size count</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button 
                          type="button" 
                          onClick={() => setAnimalCount(Math.max(1, animalCount - 1))}
                          style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                        >-</button>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{animalCount}</span>
                        <button 
                          type="button" 
                          onClick={() => setAnimalCount(animalCount + 1)}
                          style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                        >+</button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button 
                        type="button" 
                        onClick={() => setActiveScreen('home')} 
                        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        style={{ flex: 1, padding: '10px', borderRadius: '6px', backgroundColor: '#d97706', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                      >
                        Report Sighting
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* SOS screen */}
              {activeScreen === 'sos' && (
                <div className="mobile-phone-body" style={{
                  backgroundColor: '#7f1d1d',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: '16px',
                  animation: 'pulse 1.5s infinite'
                }}>
                  <ShieldAlert size={54} color="white" />
                  <span style={{ fontSize: '18px', fontWeight: 800 }}>EMERGENCY TRANSMITTING</span>
                  <p style={{ fontSize: '12px', color: '#fca5a5' }}>
                    GPS high-precision vector sent to Command & Control Center. Rangers and local DFO dispatched.
                  </p>
                  <button 
                    onClick={() => setActiveScreen('home')}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '20px',
                      border: 'none',
                      backgroundColor: 'white',
                      color: '#7f1d1d',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '20px'
                    }}
                  >
                    Terminate Broadcast
                  </button>
                </div>
              )}

              {/* Success message screen */}
              {activeScreen === 'success' && (
                <div className="mobile-phone-body" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: '12px',
                  color: '#0f172a'
                }}>
                  <CheckCircle size={48} color="#16a34a" />
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>Data Transmitted</span>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>
                    Field record synced successfully with Project VanamAI core. Central notifications dispatched.
                  </p>
                  <button 
                    onClick={() => setActiveScreen('home')}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      marginTop: '10px'
                    }}
                  >
                    Return Home
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right: Operational explanations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card">
            <span className="card-title">Mobile App Features Preview</span>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li>
                <strong>Offline-First Synchronization:</strong> Guards can capture telemetry and photos completely offline. The system stores records in an indexed DB and syncs automatically when GSM/VHF links return.
              </li>
              <li>
                <strong>Emergency SOS Transmissions:</strong> Interfaced with local VHF channels, enabling immediate rescue notifications even in zero cell-coverage zones.
              </li>
              <li>
                <strong>AI Species Tagging:</strong> The built-in camera uses localized edge models to label species and herd sizes automatically to simplify rangers reports.
              </li>
            </ul>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--color-primary-green)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Command Control Sync</span>
            <p style={{ fontSize: '13px', marginTop: '6px', lineHeight: '1.4' }}>
              When you submit a report on the phone simulator (e.g. fire or animal sightings), the system dispatches live warnings directly to the top notification centers. Try clicking <strong>Report Forest Fire</strong> or <strong>Report Wildlife Sighting</strong> now!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
