import { useState } from 'react';
import { Navigation, Search } from 'lucide-react';


interface Patrol {
  officer: string;
  role: string;
  gps: 'ONLINE' | 'OFFLINE' | 'SYNCED';
  area: string;
  checkpoints: string;
  completion: number;
  duration: string;
  threatsLogged: number;
}

const PATROLS_DATA: Patrol[] = [
  { officer: 'R. Vignesh', role: 'Forest Guard', gps: 'ONLINE', area: 'Sathyamangalam East core', checkpoints: '12 / 15', completion: 80, duration: '4h 12m', threatsLogged: 1 },
  { officer: 'K. Balaji', role: 'Forest Guard', gps: 'ONLINE', area: 'Mudumalai Southern Buffer', checkpoints: '10 / 10', completion: 100, duration: '6h 02m', threatsLogged: 0 },
  { officer: 'S. Muthu', role: 'Forester', gps: 'SYNCED', area: 'Gudalur highway crossing', checkpoints: '8 / 12', completion: 66, duration: '3h 45m', threatsLogged: 2 },
  { officer: 'A. Joseph', role: 'Forest Guard', gps: 'OFFLINE', area: 'Valparai Mountain slope', checkpoints: '3 / 10', completion: 30, duration: '1h 20m', threatsLogged: 0 },
  { officer: 'P. Kumar', role: 'Watcher', gps: 'ONLINE', area: 'Mettupalayam reserve beats', checkpoints: '14 / 18', completion: 77, duration: '5h 10m', threatsLogged: 0 }
];

export default function PatrolManagement() {
  const [patrols] = useState<Patrol[]>(PATROLS_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const getGpsBadgeColor = (status: string) => {
    switch (status) {
      case 'ONLINE': return 'badge-success';
      case 'SYNCED': return 'badge-info';
      case 'OFFLINE': return 'badge-danger';
      default: return '';
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>Patrol Management</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            <Navigation style={{ color: 'var(--color-primary-green)' }} />
            Active Patrol Tracking
          </h1>
          <div className="page-actions">
            <div className="nav-search-bar" style={{ width: '220px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search patrol guard..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Dispatching remote patrol routing update...')}>
              Optimize Routes (AI)
            </button>
          </div>
        </div>
      </div>

      {/* Grid: list and mini-map */}
      <div className="patrol-main-layout">
        
        {/* Patrol table */}
        <div className="card" style={{ padding: 0 }}>
          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Officer Name</th>
                  <th>Designation</th>
                  <th>GPS Telemetry</th>
                  <th>Assigned Beats Boundary</th>
                  <th>Checkpoints Cleared</th>
                  <th>Route Completion %</th>
                  <th>Shift Duration</th>
                  <th>Threats Logged</th>
                </tr>
              </thead>
              <tbody>
                {patrols.filter(p => p.officer.toLowerCase().includes(searchTerm.toLowerCase())).map((patrol, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{patrol.officer}</td>
                    <td>{patrol.role}</td>
                    <td>
                      <span className={`badge ${getGpsBadgeColor(patrol.gps)}`}>
                        ● {patrol.gps}
                      </span>
                    </td>
                    <td>{patrol.area}</td>
                    <td>{patrol.checkpoints} Checkpoints</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '6px', backgroundColor: 'var(--bg-primary)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${patrol.completion}%`, height: '100%', backgroundColor: patrol.completion === 100 ? 'var(--color-primary-green)' : 'var(--color-warning)' }}></div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700 }}>{patrol.completion}%</span>
                      </div>
                    </td>
                    <td>{patrol.duration}</td>
                    <td style={{ fontWeight: 700, color: patrol.threatsLogged > 0 ? 'var(--color-danger)' : 'inherit' }}>
                      {patrol.threatsLogged} logged
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live track visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Track Panel */}
          <div className="card">
            <span className="card-title">Route Compliance Radar</span>
            
            {/* Visual simulation of patrol path */}
            <div style={{
              height: '200px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden',
              marginTop: '10px'
            }}>
              {/* Radar scanner graphics */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(circle, rgba(22, 163, 74, 0.05) 10%, transparent 60%)'
              }} />
              
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute' }}>
                {/* Simulated patrol tracks */}
                <path d="M10,90 L30,60 L50,80 L70,30 L90,10" fill="none" stroke="rgba(22, 163, 74, 0.3)" strokeWidth="3" />
                <path d="M10,90 L30,60 L50,80" fill="none" stroke="var(--color-primary-green)" strokeWidth="3" strokeDasharray="1" />
                
                {/* Checkpoint dots */}
                <circle cx="10" cy="90" r="3" fill="#16a34a" />
                <circle cx="30" cy="60" r="3" fill="#16a34a" />
                <circle cx="50" cy="80" r="3" fill="#16a34a" />
                <circle cx="70" cy="30" r="3" fill="var(--color-warning)" />
                <circle cx="90" cy="10" r="3" fill="var(--color-danger)" />

                {/* Ranger dot pulsing */}
                <circle cx="50" cy="80" r="4" fill="var(--color-primary-green)" className="pulse-red" />
              </svg>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span>🟢 Cleared Checkpoints</span>
              <span>🟡 Approaching Checkpoint</span>
              <span>🔴 Unreached Core zone</span>
            </div>
          </div>

          {/* Quick recommendations */}
          <div className="card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>AI Patrol Shortage alert</span>
            <p style={{ fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>
              Sathyamangalam sector requires 8 additional guard forces in Western divisions due to core elephant corridor migration shifts.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
