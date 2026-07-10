import { useState } from 'react';
import { 
  Download, BrainCircuit, RefreshCw 
} from 'lucide-react';


interface DecisionModel {
  title: string;
  description: string;
  triggerText: string;
  outcomeType: 'report' | 'summary' | 'risk' | 'patrol';
  content: {
    summary: string;
    details: string;
    confidence: number;
    recommendation: string;
    metrics?: { label: string; val: string }[];
  };
}

const MODELS_DATA: DecisionModel[] = [
  {
    title: "Generate Monthly Report",
    description: "Compile and aggregate operational stats, incident logs, patrol hours, and seedling nurseries.",
    triggerText: "Execute Report Compilation",
    outcomeType: 'report',
    content: {
      summary: "Month-to-date state forestry report compiled successfully.",
      details: "Analyzed 1.35M monitored Hectares. Calculated 94% patrol compliance, 92% plantation survival rate, and 45 incidents resolved. Zero pending high-priority cases.",
      confidence: 98,
      recommendation: "Increase core corridor funding allocations for Gudalur NH crossings next quarter.",
      metrics: [
        { label: 'Total Patrol Distance', val: '124,500 Km' },
        { label: 'Encroachments Demolished', val: '4 Locations' },
        { label: 'Plantation Health Score', val: '91%' }
      ]
    }
  },
  {
    title: "Generate Executive Summary",
    description: "Brief summary of forest health, active threats, and response timelines for CCF and PCCF IFS offices.",
    triggerText: "Generate Executive Summary",
    outcomeType: 'summary',
    content: {
      summary: "Project VanamAI Executive Briefing - 09 July 2026.",
      details: "Dry climate flags class III fire alert risk in Western borders (Nilgiris). Wildlife migration triggers warning near border boundaries. Budgets deployed stand at 74% used.",
      confidence: 96,
      recommendation: "Ensure DFO Nilgiris holds priority daily brief on water-trough refilling.",
      metrics: [
        { label: 'Active Incidents', val: '12 Cases' },
        { label: 'Response Target Met', val: '94%' },
        { label: 'SOS Dispatches', val: '0' }
      ]
    }
  },
  {
    title: "Predict High Risk Areas",
    description: "Map and analyze microclimates to forecast forest fire breakouts and illegal wood cutting.",
    triggerText: "Predict High Risk Areas",
    outcomeType: 'risk',
    content: {
      summary: "Fire risk is expected to increase in Nilgiris over the next 48 hours.",
      details: "MODIS indicators report dry leaf canopy weight reductions. Humidity shifts below 40%. Wind gusts speed > 22 km/h from West-North-West direction.",
      confidence: 94,
      recommendation: "Recommend increasing patrol teams by 3 in Nilgiris Core ranges and issuing local division warnings.",
      metrics: [
        { label: 'Fire Probability', val: '91%' },
        { label: 'Dry Scrub Biomass', val: 'High Risk' },
        { label: 'Target Range', val: 'Nilgiris North' }
      ]
    }
  },
  {
    title: "Suggest Patrol Allocation",
    description: "Optimize guard routes using terrain features, elephant tracking telemetry, and history logs.",
    triggerText: "Optimize Force Allocation",
    outcomeType: 'patrol',
    content: {
      summary: "Sathyamangalam division requires additional patrols.",
      details: "Telemetry overlays show elephant migration shift paths traversing Gudalur border road divisions. Patrol cover gaps registered in Beat 12.",
      confidence: 88,
      recommendation: "Shift 8 guards from lower ranges to Sathyamangalam tiger buffers to cover corridor intersections.",
      metrics: [
        { label: 'Teams Shifted', val: '8 Officers' },
        { label: 'Coverage Increase', val: '+22%' },
        { label: 'Expected Gaps Covered', val: '95%' }
      ]
    }
  }
];

export default function AIDecisionSupport() {
  const [selectedModel, setSelectedModel] = useState<DecisionModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);

  const triggerModel = (model: DecisionModel) => {
    setIsLoading(true);
    setShowReportPreview(false);
    setTimeout(() => {
      setSelectedModel(model);
      setIsLoading(false);
      if (model.outcomeType === 'report') {
        setShowReportPreview(true);
      }
    }, 900);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>AI Decision Support Center</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            <BrainCircuit style={{ color: 'var(--color-primary-green)' }} />
            AI Decision Support Center
          </h1>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            INTELLIGENT PRESCRIPTIVE LOGS
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Run real-time predictive models to output actionable forest alerts, force deployments, and administrative audits.
        </p>
      </div>

      {/* Quick Action buttons representing the 4 key buttons requested */}
      <div className="grid-cols-4">
        {MODELS_DATA.map((model, i) => (
          <div 
            key={i} 
            className="card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: selectedModel?.title === model.title ? '1.5px solid var(--color-primary-green)' : '1px solid var(--border-color)',
              transition: 'all 0.2s'
            }}
            onClick={() => triggerModel(model)}
          >
            <div>
              <span style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--text-primary)', display: 'block' }}>{model.title}</span>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>{model.description}</p>
            </div>
            
            <button 
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', marginTop: '16px', fontSize: '11px', padding: '6px' }}
            >
              Analyze Model
            </button>
          </div>
        ))}
      </div>

      {/* Model Analysis Output */}
      <div className="card" style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', gap: '20px', borderStyle: selectedModel ? 'solid' : 'dashed' }}>
        
        {isLoading ? (
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <RefreshCw size={36} className="spin-anim" style={{ color: '#7c3aed', marginBottom: '12px' }} />
            <span>Compiling VanamAI neural outcomes...</span>
          </div>
        ) : !selectedModel ? (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)', padding: '48px 0' }}>
            <BrainCircuit size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', fontWeight: 700 }}>Decision Intelligence Console</h3>
            <p style={{ fontSize: '13px', marginTop: '6px' }}>Select an analytical model from the cards above to output dynamic predictions.</p>
          </div>
        ) : (
          // Simulation Output
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-purple" style={{ fontSize: '10px' }}>Model Result: {selectedModel.title}</span>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                  {selectedModel.content.summary}
                </h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Prediction Confidence</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a' }}>{selectedModel.content.confidence}%</div>
              </div>
            </div>

            <div className="decision-support-grid-layout">
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Analysis Narrative</span>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.5' }}>
                  {selectedModel.content.details}
                </p>
                
                {/* Recommendation box */}
                <div style={{
                  marginTop: '16px',
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(22, 163, 74, 0.06)',
                  borderLeft: '4px solid var(--color-primary-green)'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary-green)', textTransform: 'uppercase' }}>Recommended Actions</span>
                  <p style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {selectedModel.content.recommendation}
                  </p>
                </div>
              </div>

              {/* Model Metrics */}
              {selectedModel.content.metrics && (
                <div className="decision-metrics-panel">
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Model Key Metrics
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedModel.content.metrics.map((met, idx) => (
                      <div key={idx}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{met.label}</span>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{met.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* Custom AI Report Generation layout preview */}
      {showReportPreview && selectedModel && (
        <div className="card" style={{ border: '1px solid var(--border-color)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '16px',
            marginBottom: '16px'
          }}>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--color-primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TAMIL NADU FOREST CO-PILOT SYSTEM OUTPUT
              </span>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Forest Summary Report</h3>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => alert('Downloading report file...')}>
              <Download size={12} /> Export Document (PDF)
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '16px',
            fontSize: '12.5px',
            padding: '16px',
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '10px', display: 'block' }}>Date</span>
              <span style={{ fontWeight: 600 }}>09 July 2026</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '10px', display: 'block' }}>Today's Incidents</span>
              <span style={{ fontWeight: 600 }}>12 Cases</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '10px', display: 'block' }}>Resolved / Pending</span>
              <span style={{ fontWeight: 600 }}>9 Closed / 3 Active</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '10px', display: 'block' }}>Fire Risk Index</span>
              <span style={{ fontWeight: 600, color: 'var(--color-warning)' }}>Medium Risk</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '10px', display: 'block' }}>Patrol Efficiency</span>
              <span style={{ fontWeight: 600, color: 'var(--color-primary-green)' }}>94% Coverage</span>
            </div>
          </div>

          <div style={{
            marginTop: '16px',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderLeft: '4px solid #3b82f6',
            fontSize: '13px'
          }}>
            <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase' }}>VanamAI Recommendation</span>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
              Increase patrol frequency in Nilgiris core zone beats between 1:00 PM and 5:00 PM today.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
