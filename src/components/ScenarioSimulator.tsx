import { useState } from 'react';
import { Play, Compass, RefreshCw, Cpu } from 'lucide-react';


export default function ScenarioSimulator() {
  const [rainfall, setRainfall] = useState(0); // deviation -50% to +50%
  const [temp, setTemp] = useState(0); // temperature +0 to +8
  const [patrols, setPatrols] = useState(30); // 10 to 60 teams
  const [isLoading, setIsLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  // Predictions based on inputs
  const [fireRisk, setFireRisk] = useState(45);
  const [wildlifeAlert, setWildlifeAlert] = useState('Stable corridor activity.');
  const [carbonLoss, setCarbonLoss] = useState('0 Tons Carbon Equivalent');
  const [recommendation, setRecommendation] = useState('Continue standard patrol routing schedules.');
  const [riskReduction, setRiskReduction] = useState(0);

  const runSimulation = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Logic for mock intelligence calculations
      // Fire risk formulas
      const baseRisk = 45;
      const rainImpact = -rainfall * 0.6; // negative rainfall increases risk
      const tempImpact = temp * 5.5; // temp increases risk
      const patrolImpact = -(patrols - 30) * 0.8; // extra patrols decrease risk
      
      const calculatedRisk = Math.min(98, Math.max(8, Math.round(baseRisk + rainImpact + tempImpact + patrolImpact)));
      setFireRisk(calculatedRisk);

      // Wildlife prediction
      if (rainfall < -20 || temp > 4) {
        setWildlifeAlert('🐘 Elephant migration shifts likely near Gudalur highway buffer zones (Water scarcity).');
      } else {
        setWildlifeAlert('Stable corridor activity across protected reserve borders.');
      }

      // Carbon equivalent impact
      if (calculatedRisk > 70) {
        setCarbonLoss('Estimated 28,000 Tons Loss (High Hazard Class)');
      } else if (calculatedRisk > 50) {
        setCarbonLoss('Estimated 8,500 Tons Loss (Moderate Hazard Class)');
      } else {
        setCarbonLoss('0 Tons Loss (Protected Canopy)');
      }

      // AI Recommendation
      if (calculatedRisk > 65) {
        const extraTeamsNeeded = Math.ceil((calculatedRisk - 50) / 4);
        setRecommendation(`Deploy ${extraTeamsNeeded} extra patrol teams to Nilgiris buffer zones immediately.`);
        setRiskReduction(Math.round(extraTeamsNeeded * 8.5));
      } else {
        setRecommendation('Current deploy is sufficient. Maintain core division monitoring.');
        setRiskReduction(0);
      }

      setIsLoading(false);
      setHasRun(true);
    }, 1000);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>AI Scenario Simulator</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            <Cpu style={{ color: 'var(--color-primary-green)' }} />
            AI "What-If" Scenario Simulator
          </h1>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            PREDICTIVE MODELLING ENVIRONMENT
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Adjust environmental and operational variables to simulate forest fire risk, animal movement patterns, and carbon stock impact.
        </p>
      </div>

      <div className="scenario-simulator-layout">
        
        {/* Sliders Input Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span className="card-title">Simulator Input Variables</span>
          
          <div className="simulator-param-group">
            {/* Rainfall slider */}
            <div className="simulator-param-slider">
              <div className="simulator-slider-header">
                <span>Rainfall Deviation</span>
                <span style={{ color: rainfall < 0 ? 'var(--color-danger)' : 'var(--color-primary-green)' }}>
                  {rainfall}% {rainfall < 0 ? 'Drought' : 'Surplus'}
                </span>
              </div>
              <input 
                type="range" 
                min="-50" 
                max="50" 
                value={rainfall}
                onChange={(e) => setRainfall(Number(e.target.value))}
                className="simulator-slider-input" 
              />
            </div>

            {/* Temperature slider */}
            <div className="simulator-param-slider">
              <div className="simulator-slider-header">
                <span>Temperature Rise</span>
                <span style={{ color: temp > 3 ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                  +{temp}°C
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="8" 
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="simulator-slider-input" 
              />
            </div>

            {/* Patrol teams slider */}
            <div className="simulator-param-slider">
              <div className="simulator-slider-header">
                <span>Active Patrol Teams</span>
                <span style={{ color: 'var(--color-primary-green)' }}>{patrols} Teams</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="60" 
                value={patrols}
                onChange={(e) => setPatrols(Number(e.target.value))}
                className="simulator-slider-input" 
              />
            </div>
          </div>

          <button 
            onClick={runSimulation} 
            disabled={isLoading}
            className="btn btn-ai"
            style={{ width: '100%', marginTop: '10px', padding: '12px' }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <RefreshCw size={16} className="spin-anim" /> Running Neural Simulations...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <Play size={16} /> Run VanamAI Predictive Simulation
              </span>
            )}
          </button>
        </div>

        {/* Prediction Outputs Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', backgroundColor: hasRun ? 'transparent' : 'var(--bg-primary)', borderStyle: hasRun ? 'solid' : 'dashed' }}>
          {!hasRun && !isLoading ? (
            <div style={{
              margin: 'auto',
              textAlign: 'center',
              padding: '48px',
              color: 'var(--text-muted)'
            }}>
              <Compass size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Awaiting Simulation Run</h3>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>
                Adjust variables in the left panel and execute the neural engine to compile predictions.
              </p>
            </div>
          ) : isLoading ? (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <RefreshCw size={36} className="spin-anim" style={{ color: 'var(--color-primary-green)', marginBottom: '12px' }} />
              <span>Simulating Climate Factors...</span>
            </div>
          ) : (
            // Simulation Results
            <div>
              <span className="card-title">VanamAI Prediction Outcomes</span>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px', marginTop: '16px' }}>
                
                {/* Visual gauge */}
                <div className="simulator-result-gauge" style={{
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)'
                }}>
                  <span className="simulator-gauge-val" style={{
                    color: fireRisk > 70 ? 'var(--color-danger)' : fireRisk > 45 ? 'var(--color-warning)' : 'var(--color-primary-green)'
                  }}>{fireRisk}%</span>
                  <span className="simulator-gauge-label">Fire Risk Index</span>
                </div>

                {/* Outcome analytics details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Wildlife Corridor Impact</span>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {wildlifeAlert}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Canopy Carbon Sequestration</span>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {carbonLoss}
                    </p>
                  </div>
                </div>

              </div>

              {/* Actionable recommendation panel */}
              <div style={{
                marginTop: '24px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(22, 163, 74, 0.08)',
                borderLeft: '4px solid var(--color-primary-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Recommended Mitigations</span>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {recommendation}
                  </p>
                </div>
                {riskReduction > 0 && (
                  <div style={{
                    backgroundColor: 'var(--color-primary-green)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    -{riskReduction}% Risk Reduction
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
