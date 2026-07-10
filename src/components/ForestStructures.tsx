import { useState } from 'react';
import { Layers, Search, Download, Shield, Eye, MapPin } from 'lucide-react';

interface StructureProps {
  level: 'divisions' | 'ranges' | 'beats';
}

const DIVISIONS_DATA = [
  { name: 'Nilgiris North Division', district: 'Nilgiris', hq: 'Ooty', area: '142,300 Ha', rangesCount: 6, activePatrols: 24, health: '88%', status: 'Stable' },
  { name: 'Sathyamangalam Reserve Division', district: 'Erode', hq: 'Sathyamangalam', area: '145,500 Ha', rangesCount: 7, activePatrols: 32, health: '91%', status: 'Excellent' },
  { name: 'Anamalai Tiger Division', district: 'Coimbatore', hq: 'Pollachi', area: '95,800 Ha', rangesCount: 6, activePatrols: 18, health: '94%', status: 'Excellent' },
  { name: 'Coimbatore South Division', district: 'Coimbatore', hq: 'Coimbatore', area: '72,100 Ha', rangesCount: 5, activePatrols: 15, health: '85%', status: 'Investigating' },
  { name: 'Mudumalai Tiger Reserve Core', district: 'Nilgiris', hq: 'Masinagudi', area: '32,100 Ha', rangesCount: 4, activePatrols: 22, health: '93%', status: 'Stable' }
];

const RANGES_DATA = [
  { name: 'Gudalur Range', division: 'Nilgiris North', officer: 'M. Kathiravan (RFO)', activeGuards: 14, incidents: 3, risk: 'High', status: 'Active Alerts' },
  { name: 'Masinagudi Range', division: 'Mudumalai Tiger Reserve', officer: 'K. Selvam (RFO)', activeGuards: 12, incidents: 1, risk: 'Medium', status: 'Stable' },
  { name: 'Bhavanisagar Range', division: 'Sathyamangalam Reserve', officer: 'S. Loganathan (RFO)', activeGuards: 16, incidents: 0, risk: 'Low', status: 'Stable' },
  { name: 'Valparai Range', division: 'Anamalai Tiger Division', officer: 'Tmt. R. Priya (RFO)', activeGuards: 11, incidents: 2, risk: 'Medium', status: 'Monitoring' },
  { name: 'Mettupalayam Range', division: 'Coimbatore South', officer: 'J. Ronald (RFO)', activeGuards: 10, incidents: 4, risk: 'High', status: 'Patrol Gaps' }
];

const BEATS_DATA = [
  { name: 'Mudumalai Core Beat 4', range: 'Masinagudi', guard: 'R. Vignesh (Guard)', gps: 'ONLINE', date: 'Today 15:40', area: '2,400 Ha', status: 'Normal' },
  { name: 'Bhavanisagar West Beat 2', range: 'Bhavanisagar', guard: 'K. Balaji (Guard)', gps: 'ONLINE', date: 'Today 14:15', area: '3,100 Ha', status: 'Normal' },
  { name: 'Gudalur highway crossing Beat 1', range: 'Gudalur', guard: 'S. Muthu (Guard)', gps: 'ONLINE', date: 'Today 16:04', area: '1,800 Ha', status: 'Elephant Alert' },
  { name: 'Valparai Tea Border Beat 3', range: 'Valparai', guard: 'A. Joseph (Guard)', gps: 'OFFLINE', date: 'Yesterday 17:30', area: '2,200 Ha', status: 'Offline Sync' },
  { name: 'Mettupalayam Slope Beat 5', range: 'Mettupalayam', guard: 'P. Kumar (Guard)', gps: 'ONLINE', date: 'Today 11:20', area: '2,900 Ha', status: 'Fire Risk' }
];

export default function ForestStructures({ level }: StructureProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getTitle = () => {
    switch (level) {
      case 'divisions': return 'Forest Divisions';
      case 'ranges': return 'Forest Ranges';
      case 'beats': return 'Forest Beats';
    }
  };

  const getSubtitle = () => {
    switch (level) {
      case 'divisions': return 'Consolidated administrative circles and district operations';
      case 'ranges': return 'Range management circles under designated Range Forest Officers';
      case 'beats': return 'Core localized security beats assigned to Forest Guards & Watchers';
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span>Forest Administration</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>{getTitle()}</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            <Layers style={{ color: 'var(--color-primary-green)' }} />
            {getTitle()}
          </h1>
          <div className="page-actions">
            <div className="nav-search-bar" style={{ width: '240px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder={`Search ${getTitle()}...`} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => alert('Exporting data sheets...')}>
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{getSubtitle()}</p>
      </div>

      {/* Main Table Card */}
      <div className="card" style={{ padding: 0 }}>
        {level === 'divisions' && (
          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Division Name</th>
                  <th>District Jurisdiction</th>
                  <th>HQ Base</th>
                  <th>Area Covered</th>
                  <th>Ranges Count</th>
                  <th>Active Patrols</th>
                  <th>Health Index</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {DIVISIONS_DATA.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((div, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{div.name}</td>
                    <td>{div.district}</td>
                    <td>{div.hq}</td>
                    <td>{div.area}</td>
                    <td>{div.rangesCount} Ranges</td>
                    <td>{div.activePatrols} Teams</td>
                    <td style={{ fontWeight: 600, color: 'var(--color-primary-green)' }}>{div.health}</td>
                    <td>
                      <span className={`badge ${
                        div.status === 'Excellent' ? 'badge-success' : 
                        div.status === 'Stable' ? 'badge-info' : 'badge-warning'
                      }`}>
                        {div.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} onClick={() => alert(`Viewing detailed bounds for ${div.name}`)}>
                        <Eye size={12} /> View Bounds
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {level === 'ranges' && (
          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Range Name</th>
                  <th>Parent Division</th>
                  <th>Assigned RFO</th>
                  <th>Active Guards</th>
                  <th>Open Incidents</th>
                  <th>Fire Risk Rating</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {RANGES_DATA.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).map((range, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{range.name}</td>
                    <td>{range.division}</td>
                    <td>{range.officer}</td>
                    <td>{range.activeGuards} Guards</td>
                    <td style={{ fontWeight: 600, color: range.incidents > 2 ? 'var(--color-danger)' : 'inherit' }}>
                      {range.incidents} cases
                    </td>
                    <td>
                      <span className={`badge ${
                        range.risk === 'High' ? 'badge-danger' : 
                        range.risk === 'Medium' ? 'badge-warning' : 'badge-success'
                      }`}>
                        {range.risk} Risk
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        range.status === 'Stable' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {range.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} onClick={() => alert(`Viewing details for ${range.name}`)}>
                        <Shield size={12} /> View Guards
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {level === 'beats' && (
          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Beat Name</th>
                  <th>Parent Range</th>
                  <th>Assigned Guard</th>
                  <th>GPS Telemetry</th>
                  <th>Last Sync Time</th>
                  <th>Area Density</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {BEATS_DATA.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase())).map((beat, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{beat.name}</td>
                    <td>{beat.range}</td>
                    <td>{beat.guard}</td>
                    <td>
                      <span style={{ 
                        color: beat.gps === 'ONLINE' ? 'var(--color-primary-green)' : 'var(--text-muted)',
                        fontWeight: 700,
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span style={{ 
                          width: '6px', 
                          height: '6px', 
                          backgroundColor: beat.gps === 'ONLINE' ? 'var(--color-primary-green)' : 'var(--text-muted)', 
                          borderRadius: '50%',
                          display: 'inline-block'
                        }}></span>
                        {beat.gps}
                      </span>
                    </td>
                    <td>{beat.date}</td>
                    <td>{beat.area}</td>
                    <td>
                      <span className={`badge ${
                        beat.status === 'Normal' ? 'badge-success' : 
                        beat.status === 'Elephant Alert' ? 'badge-warning' : 'badge-danger'
                      }`}>
                        {beat.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} onClick={() => alert(`Locating guard on map...`)}>
                        <MapPin size={12} /> Locate Guard
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
