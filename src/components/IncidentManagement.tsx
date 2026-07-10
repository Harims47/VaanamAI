import React, { useState } from 'react';
import { 
  AlertOctagon, CheckCircle2, X, MapPin, 
  Image, Send
} from 'lucide-react';


interface Incident {
  id: string;
  type: 'Forest Fire' | 'Illegal Tree Cutting' | 'Poaching' | 'Animal Conflict' | 'Encroachment';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  beat: string;
  location: string;
  officer: string;
  status: 'Reported' | 'Assigned' | 'Field Verification' | 'Evidence Upload' | 'Approval' | 'Closed';
  date: string;
  details: string;
  evidencePhoto: string;
  timeline: { stage: string; time: string; note: string }[];
}

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-081',
    type: 'Forest Fire',
    priority: 'CRITICAL',
    beat: 'Nilgiris Beat 4',
    location: 'Nilgiri Core Hills (11.41° N, 76.69° E)',
    officer: 'Range Officer M. Kathiravan',
    status: 'Field Verification',
    date: 'Today 14:10',
    details: 'Thermal hotspot anomaly registered via satellite MODIS sensor. Vegetation dry index high.',
    evidencePhoto: 'Forest Fire Smoke Column - Sentinel Satellite telemetry',
    timeline: [
      { stage: 'Reported', time: 'Today 14:10', note: 'AI System flagged satellite MODIS hotspot warning.' },
      { stage: 'Assigned', time: 'Today 14:15', note: 'Dispatched to Gudalur Range Officer Kathiravan.' },
      { stage: 'Field Verification', time: 'Today 14:35', note: 'Forest Guard Vignesh dispatched to coordinates.' }
    ]
  },
  {
    id: 'INC-2026-082',
    type: 'Animal Conflict',
    priority: 'HIGH',
    beat: 'Gudalur Beat 1',
    location: 'Highway Corridor 12 (11.52° N, 76.51° E)',
    officer: 'Range Officer K. Selvam',
    status: 'Evidence Upload',
    date: 'Today 11:30',
    details: 'Herd of 11 elephants observed crossing Highway 12 near forest borders. Visual telemetry confirmed.',
    evidencePhoto: 'Elephant herd telemetry frame #CAM-412',
    timeline: [
      { stage: 'Reported', time: 'Today 11:30', note: 'Sensor camera trap log triggered AI herd detection.' },
      { stage: 'Assigned', time: 'Today 11:35', note: 'Masinagudi team assigned to alert traffic divisions.' },
      { stage: 'Field Verification', time: 'Today 11:50', note: 'Guard patrol arrived, confirmed location.' },
      { stage: 'Evidence Upload', time: 'Today 12:10', note: 'Thermal photo array uploaded to database.' }
    ]
  },
  {
    id: 'INC-2026-083',
    type: 'Illegal Tree Cutting',
    priority: 'HIGH',
    beat: 'Bhavanisagar West Beat 2',
    location: 'Sathyamangalam Reserve border (11.45° N, 77.12° E)',
    officer: 'Range Officer S. Loganathan',
    status: 'Approval',
    date: 'Yesterday 17:04',
    details: 'Acoustic monitoring node registered high-frequency chainsaw vibrations. Sandalwood trees compromised.',
    evidencePhoto: 'Sandalwood log seizures photo',
    timeline: [
      { stage: 'Reported', time: 'Yesterday 17:04', note: 'Acoustic sensor grid flagged decibel audio spikes.' },
      { stage: 'Assigned', time: 'Yesterday 17:10', note: 'Bhavanisagar force dispatched.' },
      { stage: 'Field Verification', time: 'Yesterday 17:45', note: 'Rangers intercepted site. Sawmills raided.' },
      { stage: 'Evidence Upload', time: 'Yesterday 18:30', note: 'Timber seized, FIR case file uploaded.' },
      { stage: 'Approval', time: 'Today 09:00', note: 'Pending DFO clearance for legal forestry prosecution.' }
    ]
  },
  {
    id: 'INC-2026-084',
    type: 'Poaching',
    priority: 'CRITICAL',
    beat: 'Anamalai Beat 6',
    location: 'Core Tiger Habitat (10.37° N, 76.98° E)',
    officer: 'Range Officer Tmt. R. Priya',
    status: 'Reported',
    date: 'Today 15:48',
    details: 'Wire snare trap detected by patrol drone infrared feed. Potential threat to leopard corridors.',
    evidencePhoto: 'Drone Infrared capture #DR-09',
    timeline: [
      { stage: 'Reported', time: 'Today 15:48', note: 'Drone routine search feed flagged suspicious metal loops.' }
    ]
  },
  {
    id: 'INC-2026-085',
    type: 'Encroachment',
    priority: 'MEDIUM',
    beat: 'Mettupalayam Slope Beat 5',
    location: 'Coimbatore border boundary (11.31° N, 76.93° E)',
    officer: 'Range Officer J. Ronald',
    status: 'Closed',
    date: '06 July 2026',
    details: 'Fencing structures constructed on reserve land. Cleared by demolition task force.',
    evidencePhoto: 'Encroachment clearance certificate',
    timeline: [
      { stage: 'Reported', time: '05 July 10:00', note: 'Field inspection logged unauthorized fence posts.' },
      { stage: 'Assigned', time: '05 July 11:00', note: 'Mettupalayam enforcement team assigned.' },
      { stage: 'Field Verification', time: '05 July 14:00', note: 'Boundary posts confirmed inside reserve.' },
      { stage: 'Evidence Upload', time: '05 July 16:30', note: 'Survey coordinates map compiled.' },
      { stage: 'Approval', time: '06 July 10:00', note: 'DFO sign-off granted for clearance action.' },
      { stage: 'Closed', time: '06 July 14:00', note: 'Encroachment demolished. Reserve integrity restored.' }
    ]
  }
];

const STAGES = ['Reported', 'Assigned', 'Field Verification', 'Evidence Upload', 'Approval', 'Closed'];

export default function IncidentManagement() {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(INITIAL_INCIDENTS[0]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [remarks, setRemarks] = useState('');

  const filteredIncidents = incidents.filter(inc => {
    const matchesType = typeFilter === 'All' || inc.type === typeFilter;
    const matchesPriority = priorityFilter === 'All' || inc.priority === priorityFilter;
    return matchesType && matchesPriority;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'badge-danger';
      case 'HIGH': return 'badge-danger';
      case 'MEDIUM': return 'badge-warning';
      case 'LOW': return 'badge-success';
      default: return '';
    }
  };

  const advanceWorkflow = (id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        const currentIdx = STAGES.indexOf(inc.status);
        if (currentIdx < STAGES.length - 1) {
          const nextStatus = STAGES[currentIdx + 1] as Incident['status'];
          const newTimelineItem = {
            stage: nextStatus,
            time: 'Just Now',
            note: remarks || `Advanced to ${nextStatus} stage.`
          };
          setRemarks('');
          const updated = {
            ...inc,
            status: nextStatus,
            timeline: [...inc.timeline, newTimelineItem]
          };
          if (selectedIncident?.id === id) {
            setSelectedIncident(updated);
          }
          return updated;
        }
      }
      return inc;
    }));
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>Incident Management</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            <AlertOctagon style={{ color: 'var(--color-danger)' }} />
            Incident Case Files
          </h1>
          <div className="page-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => alert('Dispatched drone survey to core...')}>
              Scan Area via Drone
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Creating a new incident file...')}>
              Log Incident File
            </button>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="card" style={{ padding: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Incident Type:</span>
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '12px', color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)' }}
          >
            <option value="All">All Types</option>
            <option value="Forest Fire">Forest Fire</option>
            <option value="Animal Conflict">Animal Conflict</option>
            <option value="Illegal Tree Cutting">Illegal Tree Cutting</option>
            <option value="Poaching">Poaching</option>
            <option value="Encroachment">Encroachment</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Priority Rank:</span>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '12px', color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)' }}
          >
            <option value="All">All Priorities</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      {/* Layout Split: Table on left, Drawer details on right */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedIncident ? '1.8fr 1.2fr' : '1fr', gap: '24px', transition: 'all 0.3s' }}>
        
        {/* Table view */}
        <div className="card" style={{ padding: 0 }}>
          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Incident ID</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Forest Beat</th>
                  <th>Ranger Assigned</th>
                  <th>Operational Stage</th>
                  <th>Log Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((inc) => (
                  <tr 
                    key={inc.id} 
                    onClick={() => setSelectedIncident(inc)}
                    style={{
                      backgroundColor: selectedIncident?.id === inc.id ? 'rgba(22, 163, 74, 0.04)' : 'transparent',
                      borderLeft: selectedIncident?.id === inc.id ? '3px solid var(--color-primary-green)' : 'none'
                    }}
                  >
                    <td style={{ fontWeight: 700 }}>{inc.id}</td>
                    <td>{inc.type}</td>
                    <td>
                      <span className={`badge ${getPriorityBadge(inc.priority)}`}>
                        {inc.priority}
                      </span>
                    </td>
                    <td>{inc.beat}</td>
                    <td>{inc.officer}</td>
                    <td>
                      <span className={`badge ${
                        inc.status === 'Closed' ? 'badge-success' : 
                        inc.status === 'Approval' ? 'badge-purple' : 'badge-info'
                      }`}>
                        {inc.status}
                      </span>
                    </td>
                    <td>{inc.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Workflow Side Drawer */}
        {selectedIncident && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--color-primary-green)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>{selectedIncident.id}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{selectedIncident.type}</h3>
              </div>
              <button 
                onClick={() => setSelectedIncident(null)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* 6-Stage Incident Workflow Visualization */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                Incident Lifecycle Timeline
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {STAGES.map((stage, idx) => {
                  const currentIdx = STAGES.indexOf(selectedIncident.status);
                  const isCompleted = idx < currentIdx;
                  const isActive = idx === currentIdx;
                  const isFuture = idx > currentIdx;

                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* Workflow check circles */}
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isCompleted ? 'rgba(22, 163, 74, 0.12)' : isActive ? 'var(--color-primary-green)' : 'var(--bg-primary)',
                        border: `2px solid ${isCompleted || isActive ? 'var(--color-primary-green)' : 'var(--border-color)'}`,
                        color: isCompleted ? 'var(--color-primary-green)' : isActive ? 'white' : 'var(--text-muted)',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      
                      <div style={{ display: 'flex', flex: 1, justify: 'space-between', alignItems: 'center' }}>
                        <span style={{ 
                          fontSize: '12.5px', 
                          fontWeight: isActive || isCompleted ? 600 : 400,
                          color: isActive ? 'var(--text-primary)' : isFuture ? 'var(--text-muted)' : 'var(--text-secondary)'
                        }}>
                          {stage}
                        </span>
                        
                        {/* Timestamps in timeline */}
                        {selectedIncident.timeline.find(t => t.stage === stage) && (
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                            {selectedIncident.timeline.find(t => t.stage === stage)?.time}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target incident details */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Location Coordinates</span>
                <p style={{ fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <MapPin size={14} color="var(--color-danger)" /> {selectedIncident.location}
                </p>
              </div>
              
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Description Log</span>
                <p style={{ fontSize: '13px', marginTop: '2px', lineHeight: '1.4' }}>{selectedIncident.details}</p>
              </div>

              {/* Photo Evidence simulator box */}
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Field Photo Evidence</span>
                <div style={{
                  height: '110px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px dashed var(--border-color)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '4px',
                  color: 'var(--text-secondary)',
                  fontSize: '12px'
                }}>
                  <Image size={24} style={{ marginBottom: '6px', color: 'var(--text-muted)' }} />
                  <span>{selectedIncident.evidencePhoto}</span>
                </div>
              </div>
            </div>

            {/* Workflow actions */}
            {selectedIncident.status !== 'Closed' && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Officer remarks / verification comments..." 
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    fontSize: '12.5px',
                    outline: 'none',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button 
                  onClick={() => advanceWorkflow(selectedIncident.id)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Send size={14} /> Advance to Next Stage
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
