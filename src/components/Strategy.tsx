import React from 'react';
import { 
  Sparkles, Network, Milestone, CheckCircle, 
  ArrowRight, Cpu 
} from 'lucide-react';

interface StrategyProps {
  view: 'whyai' | 'digitaltwin' | 'innovations' | 'vision';
}

export default function Strategy({ view }: StrategyProps) {
  return (
    <div className="page-container">
      
      {/* 1. WHY AI Page */}
      {view === 'whyai' && (
        <>
          <div className="page-header">
            <div className="breadcrumb">
              <span>Project VanamAI</span>
              <span className="breadcrumb-separator">/</span>
              <span style={{ color: 'var(--color-primary-green)' }}>Strategic Alignment</span>
            </div>
            <div className="page-header-row">
              <h1 className="page-title">
                <Milestone style={{ color: 'var(--color-primary-green)' }} />
                Why AI? Platform Digital Transformation
              </h1>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Comparing legacy manual practices against the automated predictive capabilities of Project VanamAI.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Current State Column */}
            <div className="card" style={{ borderTop: '4px solid var(--color-danger)' }}>
              <span className="card-title" style={{ color: 'var(--color-danger)' }}>
                Current Legacy Forestry Operations
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                {[
                  { title: "Manual Reporting Sheets", desc: "Inspection reports and logs compiled on papers, lagging by 15-30 days." },
                  { title: "Manual Patrol Scheduling", desc: "Rangers follow static routes without climate or animal migration adjustments." },
                  { title: "Reactive Incident Response", desc: "Fires or wood cuttings logged after visible damage, causing high delays." },
                  { title: "Siloed Software Databases", desc: "Different ranges use legacy standalone computers with zero remote sync." }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: 'var(--color-danger)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '13px',
                      flexShrink: 0
                    }}>✕</div>
                    <div>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</span>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Future State Column */}
            <div className="card" style={{ borderTop: '4px solid var(--color-primary-green)' }}>
              <span className="card-title" style={{ color: 'var(--color-primary-green)' }}>
                VanamAI Future Integrated State
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                {[
                  { title: "AI-Generated Auto Reports", desc: "Real-time reports aggregated daily from satellite, camera trap, and patrol feeds." },
                  { title: "Predictive Patrol Optimization", desc: "Routes customized by AI models forecasting climate risk and elephant tracks." },
                  { title: "Early Warning Threat Dispatches", desc: "Sensors dispatch alerts (MODIS/Chainsaw sound) to guards in 2 minutes." },
                  { title: "Unified Enterprise Portal", desc: "A single command console linking field mobile app caches directly to State HQs." }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(22, 163, 74, 0.12)',
                      color: 'var(--color-primary-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '13px',
                      flexShrink: 0
                    }}>✓</div>
                    <div>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</span>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 2. DIGITAL TWIN Page */}
      {view === 'digitaltwin' && (
        <>
          <div className="page-header">
            <div className="breadcrumb">
              <span>Project VanamAI</span>
              <span className="breadcrumb-separator">/</span>
              <span style={{ color: 'var(--color-primary-green)' }}>Future Innovations</span>
            </div>
            <div className="page-header-row">
              <h1 className="page-title">
                <Network style={{ color: 'var(--color-primary-green)' }} />
                Forest Digital Twin Architecture Blueprint
              </h1>
              <span className="badge badge-purple" style={{ fontSize: '11px', padding: '4px 10px' }}>
                Future Phase Integration concept
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Illustrates how physical forest telemetry feed real-time AI algorithms to output predictive decision logs.
            </p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px' }}>
            <span className="card-title">State Forestry Cyber-Physical Data Loops</span>
            
            {/* SVG Visualizing Flow */}
            <div style={{ width: '100%', maxWidth: '800px', margin: '24px 0' }}>
              <svg viewBox="0 0 800 240" style={{ width: '100%' }}>
                {/* Nodes */}
                {/* Physical Forest */}
                <rect x="20" y="80" width="140" height="80" rx="8" fill="var(--bg-primary)" stroke="var(--border-color)" strokeWidth="2" />
                <text x="90" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">PHYSICAL FOREST</text>
                <text x="90" y="136" textAnchor="middle" fontSize="9" fill="var(--text-muted)">Mudumalai / Nilgiris</text>

                {/* Sensors Gateway */}
                <rect x="230" y="80" width="140" height="80" rx="8" fill="var(--bg-primary)" stroke="var(--border-color)" strokeWidth="2" />
                <text x="300" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">SENSORS / IOT</text>
                <text x="300" y="136" textAnchor="middle" fontSize="9" fill="var(--text-muted)">MODIS, Drones, Audio</text>

                {/* VanamAI core */}
                <rect x="440" y="80" width="140" height="80" rx="8" fill="var(--bg-primary)" stroke="var(--color-primary-green)" strokeWidth="2" />
                <text x="510" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-primary-green)">VANAMAI CORE</text>
                <text x="510" y="136" textAnchor="middle" fontSize="9" fill="var(--text-muted)">Neural Predictions</text>

                {/* Decision Dashboard */}
                <rect x="640" y="80" width="140" height="80" rx="8" fill="var(--bg-primary)" stroke="var(--border-color)" strokeWidth="2" />
                <text x="710" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">COMMAND PORTAL</text>
                <text x="710" y="136" textAnchor="middle" fontSize="9" fill="var(--text-muted)">PCCF Decision Support</text>

                {/* Arrows */}
                <path d="M160,120 L220,120" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="220,120 214,115 214,125" fill="var(--text-muted)" />
                <text x="190" y="112" textAnchor="middle" fontSize="9" fill="var(--text-muted)">Telemetry</text>

                <path d="M370,120 L430,120" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="430,120 424,115 424,125" fill="var(--text-muted)" />
                <text x="400" y="112" textAnchor="middle" fontSize="9" fill="var(--text-muted)">Data Feed</text>

                <path d="M580,120 L630,120" fill="none" stroke="var(--color-primary-green)" strokeWidth="2" />
                <polygon points="630,120 624,115 624,125" fill="var(--color-primary-green)" />
                <text x="605" y="112" textAnchor="middle" fontSize="9" fill="var(--color-primary-green)">Advisories</text>
              </svg>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%', fontSize: '13px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <div>
                <strong>Physical-to-Digital Sync:</strong> IoT sensors log soil humidity, acoustic vibrations, and wildlife movements continuously. Data caches queue in cellular or VHF mesh buffers.
              </div>
              <div>
                <strong>Predictive Output Engine:</strong> VanamAI evaluates data arrays against fire history logs and satellite moisture indexes. Results update the Command Room within 2 minutes.
              </div>
            </div>
          </div>
        </>
      )}

      {/* 3. INNOVATIONS Page */}
      {view === 'innovations' && (
        <>
          <div className="page-header">
            <div className="breadcrumb">
              <span>Project VanamAI</span>
              <span className="breadcrumb-separator">/</span>
              <span style={{ color: 'var(--color-primary-green)' }}>Strategic Core</span>
            </div>
            <div className="page-header-row">
              <h1 className="page-title">
                <Sparkles style={{ color: 'var(--color-primary-green)' }} />
                System Innovation Highlights
              </h1>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Core technological interventions defining the VanamAI platform.
            </p>
          </div>

          <div className="grid-cols-3">
            {[
              { title: "Predictive Fire Intelligence", desc: "Analyzes Sentinel imagery and local sensor metrics to forecast fire outbreaks 48 hours early, warning rangers on coordinates." },
              { title: "Wildlife Corridors Tracker", desc: "Uses automated camera traps and edge AI telemetry to map elephant migration corridors and dispatch SMS alerts to forest villages." },
              { title: "Smart Incident Triage", desc: "Flags critical threat sources (sound of wood cutting / fires) and schedules verification workflows in under 5 minutes." },
              { title: "Offline Ranger Data Sync", desc: "Enables forest guards to record GPS logs, wildlife counts, and images offline. Uploads sync automatically once VHF links lock." },
              { title: "AI Executive Briefing", desc: "Presents senior command officers with a single-screen operational synthesis, displaying actionable mitigations instead of complex charts." },
              { title: "Decision Scenario Simulator", desc: "Allows administrative planners to run 'What-If' dry climate simulations to calculate fire risks and allocate resources optimally." }
            ].map((inn, i) => (
              <div className="card" key={i}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(22, 163, 74, 0.1)',
                  color: 'var(--color-primary-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Cpu size={18} />
                </div>
                <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>{inn.title}</span>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>{inn.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 4. VISION PAGE */}
      {view === 'vision' && (
        <>
          <div className="page-header">
            <div className="breadcrumb">
              <span>Project VanamAI</span>
              <span className="breadcrumb-separator">/</span>
              <span style={{ color: 'var(--color-primary-green)' }}>Platform Vision</span>
            </div>
            <div className="page-header-row">
              <h1 className="page-title">
                <Milestone style={{ color: 'var(--color-primary-green)' }} />
                VanamAI Platform Road Map
              </h1>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Designed modularly to grow and scale with state requirements over subsequent phases.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Phase 1 */}
            <div className="card">
              <span className="card-title" style={{ color: 'var(--color-primary-green)' }}>
                Phase 1: Present Core Modules
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
                {[
                  'Unified Management Information System (MIS)',
                  'AI Executive Brief Dashboard',
                  'Daily Active Patrol Route Tracker',
                  'Asset Registry and Nursery Logs',
                  '6-Stage Incident Workflow Drawer',
                  'What-If Scenario Simulator'
                ].map((mod, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                    <CheckCircle size={16} color="var(--color-primary-green)" style={{ flexShrink: 0 }} />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2 */}
            <div className="card">
              <span className="card-title" style={{ color: '#7c3aed' }}>
                Phase 2: Planned Future Modules
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
                {[
                  'Integrated GIS Core Telemetry Map Layers',
                  'Autonomous Drone Swarm AI Surveys',
                  'IoT Soil Moisture and Fire Line Sensors',
                  'Satellite Synthetic Aperture Radar (SAR) Canopy Tracking',
                  'Wildlife Predictive Corridor Crossings alerts',
                  'Carbon Credit Sequestration Estimator Node'
                ].map((mod, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                    <ArrowRight size={16} color="#7c3aed" style={{ flexShrink: 0 }} />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
