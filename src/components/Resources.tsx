import { useState } from 'react';
import { Sprout, Eye, Truck, Search, Download } from 'lucide-react';

interface ResourceProps {
  type: 'plantations' | 'wildlife' | 'assets';
}

const PLANTATIONS_DATA = [
  { species: 'Sandalwood (Santalum album)', district: 'Sathyamangalam', area: '120 Ha', health: '94%', age: '4 Years', status: 'Healthy', nextInspection: '12 July 2026' },
  { species: 'Teakwood (Tectona grandis)', district: 'Anamalai', area: '340 Ha', health: '91%', age: '7 Years', status: 'Healthy', nextInspection: '15 July 2026' },
  { species: 'Bamboo (Bambusa bambos)', district: 'Nilgiris North', area: '200 Ha', health: '88%', age: '2 Years', status: 'Growth phase', nextInspection: '20 July 2026' },
  { species: 'Rosewood (Dalbergia latifolia)', district: 'Coimbatore South', area: '85 Ha', health: '93%', age: '6 Years', status: 'Healthy', nextInspection: '11 July 2026' },
  { species: 'Eucalyptus core nursery', district: 'Nilgiris Upper', area: '45 Ha', health: '82%', age: '1 Year', status: 'Monitoring', nextInspection: 'Today (Drone)' }
];

const WILDLIFE_DATA = [
  { species: 'Asian Elephant', location: 'Gudalur Highway Corridor', population: '11 spotted', lastSighting: '15 mins ago', health: 'Stable', protection: 'Schedule I' },
  { species: 'Bengal Tiger', location: 'Sathyamangalam Reserve Core', population: '1 spotted', lastSighting: 'Today 14:32', health: 'Excellent', protection: 'Schedule I' },
  { species: 'Leopard', location: 'Mudumalai buffer ranges', population: '1 spotted', lastSighting: 'Today 12:15', health: 'Stable', protection: 'Schedule I' },
  { species: 'Nilgiri Tahr', location: 'Nilgiris Upper Plateau', population: '18 spotted', lastSighting: 'Yesterday 17:40', health: 'Excellent', protection: 'Schedule I' },
  { species: 'Gaur (Indian Bison)', location: 'Valparai Tea margins', population: '6 spotted', lastSighting: 'Yesterday 14:10', health: 'Stable', protection: 'Schedule II' }
];

const ASSETS_DATA = [
  { name: 'AI Sensor Camera Traps', type: 'Electronic Sensors', total: 240, operational: 232, maintenance: 8, location: 'All reserves' },
  { name: '4WD Patrol Jeeps', type: 'Vehicles', total: 42, operational: 38, maintenance: 4, location: 'Range HQs' },
  { name: 'Forest Watchtowers', type: 'Infrastructure', total: 28, operational: 28, maintenance: 0, location: 'High elevation beats' },
  { name: 'Galileo Handheld GPS Devices', type: 'Communications', total: 180, operational: 174, maintenance: 6, location: 'Field guards' },
  { name: 'Forest Water Tanks / Check Dams', type: 'Water Supply', total: 64, operational: 62, maintenance: 2, location: 'Core zones' }
];

export default function Resources({ type }: ResourceProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getTitle = () => {
    switch (type) {
      case 'plantations': return 'Plantation & Nursery Management';
      case 'wildlife': return 'Wildlife Telemetry & Corridors';
      case 'assets': return 'Forest Assets & Equipment';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'plantations': return <Sprout style={{ color: 'var(--color-primary-green)' }} />;
      case 'wildlife': return <Eye style={{ color: 'var(--color-primary-green)' }} />;
      case 'assets': return <Truck style={{ color: 'var(--color-primary-green)' }} />;
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span>Resources & Assets</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>{getTitle()}</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            {getIcon()}
            {getTitle()}
          </h1>
          <div className="page-actions">
            <div className="nav-search-bar" style={{ width: '220px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder={`Search ${type}...`} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => alert('Exporting resources spreadsheet...')}>
              <Download size={14} /> Export Sheet
            </button>
          </div>
        </div>
      </div>

      {/* Main Table view */}
      <div className="card" style={{ padding: 0 }}>
        {type === 'plantations' && (
          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Species Name</th>
                  <th>District Range</th>
                  <th>Cultivation Area</th>
                  <th>Plantation Survival Rate</th>
                  <th>Nursery Age</th>
                  <th>Growth Health</th>
                  <th>Next Drone Sweep</th>
                </tr>
              </thead>
              <tbody>
                {PLANTATIONS_DATA.filter(p => p.species.toLowerCase().includes(searchTerm.toLowerCase())).map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{p.species}</td>
                    <td>{p.district}</td>
                    <td>{p.area}</td>
                    <td style={{ fontWeight: 600, color: 'var(--color-primary-green)' }}>{p.health}</td>
                    <td>{p.age}</td>
                    <td>
                      <span className={`badge ${p.status === 'Healthy' ? 'badge-success' : 'badge-warning'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>{p.nextInspection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {type === 'wildlife' && (
          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Protected Species</th>
                  <th>Core Corridor Location</th>
                  <th>Observation Details</th>
                  <th>Last Telemetry Sync</th>
                  <th>Estimated Health</th>
                  <th>Wildlife Schedule</th>
                </tr>
              </thead>
              <tbody>
                {WILDLIFE_DATA.filter(w => w.species.toLowerCase().includes(searchTerm.toLowerCase())).map((w, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{w.species}</td>
                    <td>{w.location}</td>
                    <td>{w.population}</td>
                    <td>{w.lastSighting}</td>
                    <td>
                      <span className="badge badge-success">
                        {w.health}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-purple" style={{ fontSize: '10px' }}>
                        {w.protection}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {type === 'assets' && (
          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Asset Item Class</th>
                  <th>Inventory Type</th>
                  <th>Total Registered</th>
                  <th>Operational Units</th>
                  <th>In Maintenance</th>
                  <th>Deployment Zone</th>
                </tr>
              </thead>
              <tbody>
                {ASSETS_DATA.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map((a, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{a.name}</td>
                    <td>{a.type}</td>
                    <td>{a.total} units</td>
                    <td style={{ color: 'var(--color-primary-green)', fontWeight: 600 }}>{a.operational} units</td>
                    <td style={{ color: a.maintenance > 5 ? 'var(--color-danger)' : 'inherit', fontWeight: 600 }}>{a.maintenance} units</td>
                    <td>{a.location}</td>
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
