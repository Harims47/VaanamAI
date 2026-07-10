import React from 'react';
import { 
  Flame, Users, Eye, ShieldAlert, HeartHandshake, Compass, 
  Sprout, Award, TrendingUp, Calendar, AlertCircle, FileText, CheckCircle2 
} from 'lucide-react';

interface DashboardProps {
  userName: string;
  userRole: string;
  onNavigate: (page: string) => void;
}

export default function Dashboard({ userName, userRole, onNavigate }: DashboardProps) {
  // Mock data for Tamil Nadu Forest Division
  const kpiData = [
    { title: "Today's Fire Alerts", value: "12", sub: "3 Core, 9 Buffer", color: "danger", icon: Flame },
    { title: "Active Patrol Teams", value: "184", sub: "98% schedule coverage", color: "green", icon: Users },
    { title: "Wildlife Sightings Today", value: "73", sub: "Incl. 2 tiger sightings", color: "ai", icon: Eye },
    { title: "Open Poaching Cases", value: "6", sub: "Nilgiris & Coimbatore", color: "danger", icon: ShieldAlert },
    { title: "Human-Wildlife Conflict", value: "11", sub: "Active elephant warnings", color: "warning", icon: HeartHandshake },
    { title: "Forest Area Monitored", value: "1.35M Ha", sub: "Satellite & drone mesh", color: "green", icon: Compass },
    { title: "Plantation Survival Rate", value: "92%", sub: "Sandalwood & bamboo", color: "green", icon: Sprout },
    { title: "Protected Species", value: "148", sub: "Monitoring programs active", color: "ai", icon: Award }
  ];

  return (
    <div className="page-container">
      {/* 1. AI Executive Brief - Most Important Feature for senior officers */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: '16px',
        padding: '24px',
        color: '#f8fafc',
        boxShadow: 'var(--shadow-soft)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated AI background mesh */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '50%',
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 70% 30%, #3b82f6 0%, transparent 60%), radial-gradient(circle at 40% 75%, #10b981 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                System Greeting
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '2px' }}>
                Good Morning Sir, {userName}
              </h2>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                Principal Chief Conservator of Forests (PCCF) • Tamil Nadu Forest HQ Command
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              fontSize: '12px',
              fontWeight: 500
            }}>
              <Calendar size={14} color="#10b981" /> 09 July 2026
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Today's Incidents</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px', color: '#fca5a5' }}>12 Active</div>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Overall Fire Risk</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px', color: '#fcd34d' }}>Medium Risk</div>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Highest Risk District</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px', color: '#ef4444' }}>Nilgiris Core</div>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Wildlife Alerts</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px', color: '#60a5fa' }}>8 Corridors</div>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Pending Approvals</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px', color: '#c084fc' }}>14 Case Files</div>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Patrol Efficiency</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px', color: '#34d399' }}>94.2%</div>
            </div>
          </div>

          {/* Actionable recommendation */}
          <div style={{
            marginTop: '8px',
            padding: '16px',
            borderRadius: '12px',
            background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)',
            borderLeft: '4px solid #3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60a5fa',
                flexShrink: 0
              }}>
                <AlertCircle size={16} />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase' }}>VanamAI Intelligent Dispatch Recommendation</span>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>
                  Increase patrol frequency in Nilgiris ranges between 1:00 PM and 5:00 PM today. Estimated fire probability is <span style={{ color: '#f87171', fontWeight: 700 }}>91%</span>.
                </p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('AI Decision Support')}
              className="btn btn-ai btn-sm"
              style={{ fontSize: '11px', padding: '6px 12px' }}
            >
              Examine Advisory Details
            </button>
          </div>
        </div>
      </div>

      {/* 2. Large KPI Cards Grid */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>
          Key Forest Operations Metrics
        </div>
        <div className="grid-cols-4">
          {kpiData.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div className="card kpi-card" key={i}>
                <div className="kpi-header">
                  <span className="kpi-title">{kpi.title}</span>
                  <div className={`kpi-icon-container ${kpi.color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div>
                  <div className="kpi-value">{kpi.value}</div>
                  <div className="kpi-footer">{kpi.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Main content grid with charts & activity logs */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '24px' }}>
        
        {/* Left: Charts / Forest Health Map info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Chart Card */}
          <div className="card">
            <div className="card-header-actions">
              <span className="card-title">
                <TrendingUp size={18} style={{ color: 'var(--color-primary-green)' }} />
                Monthly Patrol Coverage vs Incidents Trend
              </span>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Last 6 Months</div>
            </div>

            {/* Custom SVG line-graph representing trend line */}
            <div style={{ position: 'relative', height: '220px', width: '100%', marginTop: '10px' }}>
              <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%' }}>
                {/* Horizontal grid lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeWidth="0.5" />
                <line x1="40" y1="70" x2="480" y2="70" stroke="var(--border-color)" strokeWidth="0.5" />
                <line x1="40" y1="120" x2="480" y2="120" stroke="var(--border-color)" strokeWidth="0.5" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="var(--border-color)" strokeWidth="0.5" />

                {/* Left labels */}
                <text x="10" y="24" fill="var(--text-muted)" fontSize="9">100%</text>
                <text x="10" y="74" fill="var(--text-muted)" fontSize="9">75%</text>
                <text x="10" y="124" fill="var(--text-muted)" fontSize="9">50%</text>
                <text x="10" y="174" fill="var(--text-muted)" fontSize="9">25%</text>

                {/* Chart Data Line 1: Patrol Coverage (Green) */}
                <path 
                  d="M 40 140 Q 120 80 200 110 T 360 50 T 480 30" 
                  fill="none" 
                  stroke="var(--color-primary-green)" 
                  strokeWidth="3" 
                />
                
                {/* Chart Data Line 2: Closed Incidents (Blue) */}
                <path 
                  d="M 40 160 Q 120 120 200 130 T 360 90 T 480 60" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="2" 
                  strokeDasharray="4 2"
                />

                {/* X-Axis labels */}
                <text x="40" y="195" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Jan</text>
                <text x="128" y="195" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Feb</text>
                <text x="216" y="195" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Mar</text>
                <text x="304" y="195" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Apr</text>
                <text x="392" y="195" fill="var(--text-muted)" fontSize="9" textAnchor="middle">May</text>
                <text x="480" y="195" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Jun</text>
              </svg>
            </div>

            {/* Legend for charts */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600 }}>
                <div style={{ width: '12px', height: '4px', backgroundColor: 'var(--color-primary-green)' }} />
                <span>Patrol Coverage Coverage (%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600 }}>
                <div style={{ width: '12px', height: '4px', backgroundColor: '#3b82f6', borderTop: '2px dashed' }} />
                <span>Case Resolutions (%)</span>
              </div>
            </div>
          </div>

          {/* Grid of Division Performance */}
          <div className="card">
            <span className="card-title">Forest Division Performance (Health Index)</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: "Nilgiris Division", health: 88, patrols: "100%", color: "#ef4444" },
                { name: "Anamalai Division", health: 94, patrols: "96%", color: "#16a34a" },
                { name: "Sathyamangalam Division", health: 91, patrols: "94%", color: "#16a34a" },
                { name: "Coimbatore Division", health: 85, patrols: "88%", color: "#f59e0b" }
              ].map((div, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justify: 'space-between', gap: '16px' }}>
                  <span style={{ width: '180px', fontSize: '13px', fontWeight: 600 }}>{div.name}</span>
                  
                  {/* Visual health bar indicator */}
                  <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ width: `${div.health}%`, height: '100%', backgroundColor: div.health > 90 ? 'var(--color-primary-green)' : div.health > 85 ? 'var(--color-warning)' : 'var(--color-danger)', borderRadius: '4px' }}></div>
                  </div>
                  
                  <span style={{ width: '60px', fontSize: '12px', fontWeight: 700, textAlign: 'right' }}>{div.health}% Health</span>
                  <span style={{ width: '80px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>{div.patrols} Patrols</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Workflows Approvals & Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Pending Executive Approvals */}
          <div className="card" style={{ flex: 1 }}>
            <span className="card-title">
              <FileText size={18} style={{ color: 'var(--color-warning)' }} />
              Pending Case Files Approval
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              {[
                { id: 'APP-192', title: 'Controlled Burn Authorization', dept: 'Nilgiris buffer', date: 'Today', status: 'RFO Signed' },
                { id: 'APP-198', title: 'Poaching Evidence Clearance', dept: 'Sathyamangalam Reserve', date: 'Today', status: 'DFO Verified' },
                { id: 'APP-202', title: 'Elephant Trench Budget Approval', dept: 'Coimbatore Division', date: 'Yesterday', status: 'Pending PCCF' },
                { id: 'APP-210', title: 'Teak plantation drone report review', dept: 'Anamalai Core', date: '07 July', status: 'RFO Signed' }
              ].map((app, i) => (
                <div key={i} style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>{app.id} • {app.date}</span>
                    <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{app.title}</span>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)' }}>📍 {app.dept}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-purple" style={{ fontSize: '10px' }}>{app.status}</span>
                    <button 
                      onClick={() => alert(`Reviewing document ${app.id} credentials`)}
                      className="btn btn-secondary btn-sm" 
                      style={{ fontSize: '10px', padding: '4px 8px', marginTop: '6px', display: 'block', marginLeft: 'auto' }}
                    >
                      Sign Off
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick system alerts */}
          <div className="card">
            <span className="card-title">System Activity Logs</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                <CheckCircle2 size={16} color="var(--color-primary-green)" style={{ flexShrink: 0 }} />
                <span>Patrol Log uploaded by guard Vignesh (Mudumalai)</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                <CheckCircle2 size={16} color="var(--color-primary-green)" style={{ flexShrink: 0 }} />
                <span>e-Permit issued for wood transit pass #Pass-9021</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                <AlertCircle size={16} color="var(--color-warning)" style={{ flexShrink: 0 }} />
                <span>Camera Trap CAM-409 disconnected in Nilgiris upper range</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
