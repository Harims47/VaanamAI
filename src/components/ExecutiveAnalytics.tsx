import { 
  BarChart4, Percent, Clock, Heart, DollarSign, Leaf, ShieldX 
} from 'lucide-react';

export default function ExecutiveAnalytics() {
  const analyticsData = [
    { title: "Patrol Efficiency", value: "94.2%", icon: Percent, trend: "+2.4% vs last month", desc: "Average percentage of beat route compliance by field forces." },
    { title: "Avg Incident Response Time", value: "24.6 Min", icon: Clock, trend: "-12 mins since AI dispatch", desc: "Mean duration from sensor threat log to ranger dispatch confirmation." },
    { title: "Forest Health Index", value: "89.1%", icon: Heart, trend: "Stable", desc: "Remote sensing NDVI calculations tracking canopy moisture and density." },
    { title: "Carbon Stock Estimation", value: "1.2M Tons", icon: Leaf, trend: "+0.15M Tons (Reforestation)", desc: "Carbon equivalent sequestered across protected core reserves." },
    { title: "Budget Utilization", value: "74.2%", icon: DollarSign, trend: "Target matching", desc: "Funds deployed for elephant trenches, fire lines, and solar water pumps." },
    { title: "Active Pending Cases", value: "12 Cases", icon: ShieldX, trend: "-4 resolved today", desc: "Incidents requiring DFO or PCCF sign-offs." }
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>Executive Analytics</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            <BarChart4 style={{ color: 'var(--color-primary-green)' }} />
            Executive Analytics Console
          </h1>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            TAMIL NADU FOREST DIGITAL MISSION HUB
          </div>
        </div>
      </div>

      {/* Analytics grid summary */}
      <div className="grid-cols-3">
        {analyticsData.map((data, i) => {
          const Icon = data.icon;
          return (
            <div className="card" key={i} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>{data.title}</span>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(22, 163, 74, 0.08)',
                    color: 'var(--color-primary-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>{data.value}</div>
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>{data.desc}</p>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#16a34a', marginTop: '12px' }}>
                {data.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed charts representation */}
      <div className="grid-cols-2">
        {/* Division Performance rankings */}
        <div className="card">
          <span className="card-title">Top Performing Forest Divisions</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            {[
              { rank: 1, name: "Anamalai Tiger Reserve", score: 98, status: "Outstanding" },
              { rank: 2, name: "Sathyamangalam Reserve", score: 94, status: "Excellent" },
              { rank: 3, name: "Mudumalai Core", score: 91, status: "Excellent" },
              { rank: 4, name: "Nilgiris North", score: 88, status: "Satisfactory" },
              { rank: 5, name: "Coimbatore South", score: 85, status: "Satisfactory" }
            ].map((div, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: div.rank === 1 ? 'gold' : div.rank === 2 ? '#cbd5e1' : '#f59e0b',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {div.rank}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{div.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>{div.status}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{div.score} Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Officer efficiency & pending works */}
        <div className="card">
          <span className="card-title">Officer Performance index</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            {[
              { name: "Dr. K. Ravichandran, IFS", title: "PCCF", efficiency: "98%", cases: 0 },
              { name: "Thiru S. Ramasubramanian, IFS", title: "CCF", efficiency: "96%", cases: 2 },
              { name: "Tmt. M. Anbarasi, IFS", title: "DFO Nilgiris", efficiency: "92%", cases: 4 },
              { name: "M. Kathiravan", title: "RFO Gudalur", efficiency: "88%", cases: 5 },
              { name: "R. Vignesh", title: "Forest Guard", efficiency: "94%", cases: 1 }
            ].map((officer, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, display: 'block' }}>{officer.name}</span>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{officer.title}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px', display: 'block' }}>Efficiency</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary-green)' }}>{officer.efficiency}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px', display: 'block' }}>Pending Cases</span>
                    <span style={{ fontWeight: 700, color: officer.cases > 3 ? 'var(--color-danger)' : 'var(--text-primary)' }}>{officer.cases}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
