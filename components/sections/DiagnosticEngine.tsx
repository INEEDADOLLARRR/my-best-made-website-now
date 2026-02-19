import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, CheckCircle, Calculator } from 'lucide-react';
import { DiagnosticResult } from '../../types';

export const DiagnosticEngine: React.FC = () => {
  const [step, setStep] = useState(1);
  const [sqFt, setSqFt] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const calculate = () => {
    let risk: 'Low' | 'Moderate' | 'Critical' = 'Low';
    let loss = 0;
    
    // Simple logic for demonstration
    if (age > 15) risk = 'Moderate';
    if (age > 20) risk = 'Critical';
    
    // Estimating potential inventory/production loss per sqft based on risk
    const lossMultiplier = risk === 'Critical' ? 25 : risk === 'Moderate' ? 10 : 2;
    loss = sqFt * lossMultiplier;

    setResult({
      riskLevel: risk,
      estimatedLoss: loss,
      recommendation: risk === 'Critical' 
        ? "Immediate structural assessment required to prevent failure." 
        : "Preventative maintenance program recommended to extend lifespan."
    });
    setStep(3);
  };

  return (
    <section id="engine" className="py-32 bg-[#080808] text-white relative overflow-hidden border-y border-white/5">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-brand-blue/10 to-transparent" />
        <div className="grid grid-cols-12 h-full w-full opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/10 h-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-white">
              The "Wait and See" Cost Calculator
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed mb-8">
              Most facility managers underestimate the cost of roof neglect. 
              Use our diagnostic engine to see what your current roof condition might actually cost you in a failure event.
            </p>
            <div className="flex items-center gap-4 text-sm font-mono text-brand-orange">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                LIVE ESTIMATION
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 lg:p-12 shadow-2xl">
              
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="flex items-center gap-3 mb-4 text-brand-blue">
                    <Calculator className="w-6 h-6" />
                    <span className="font-semibold tracking-wider uppercase text-sm">Step 1 of 2</span>
                  </div>
                  <h3 className="text-2xl font-bold">Facility Dimensions</h3>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Total Roof Area (Sq. Ft.)</label>
                    <input 
                      type="number" 
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-brand-blue transition-colors text-lg"
                      placeholder="e.g. 50000"
                      onChange={(e) => setSqFt(Number(e.target.value))}
                    />
                  </div>
                  <button 
                    onClick={() => sqFt > 0 && setStep(2)}
                    className="w-full bg-white hover:bg-slate-200 text-black font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                   <div className="flex items-center gap-3 mb-4 text-brand-blue">
                    <Calculator className="w-6 h-6" />
                    <span className="font-semibold tracking-wider uppercase text-sm">Step 2 of 2</span>
                  </div>
                  <h3 className="text-2xl font-bold">Asset Age</h3>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Age of current roof system (Years)</label>
                    <input 
                      type="number" 
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-brand-blue transition-colors text-lg"
                      placeholder="e.g. 15"
                      onChange={(e) => setAge(Number(e.target.value))}
                    />
                  </div>
                  <button 
                    onClick={calculate}
                    className="w-full bg-white hover:bg-slate-200 text-black font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Risks <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 3 && result && (
                <div className="text-center space-y-6 animate-in zoom-in duration-500">
                  <div className={`inline-flex p-4 rounded-full ${result.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {result.riskLevel === 'Critical' ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm uppercase tracking-widest mb-1">Estimated Liability Exposure</p>
                    <div className="text-5xl font-bold text-white mb-2">
                      ${result.estimatedLoss.toLocaleString()}
                    </div>
                    <p className={`text-lg font-medium ${result.riskLevel === 'Critical' ? 'text-red-400' : 'text-yellow-400'}`}>
                      Risk Level: {result.riskLevel}
                    </p>
                  </div>

                  <div className="bg-black/40 p-4 rounded-lg border border-white/10 text-left">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      <strong className="text-white block mb-1">Our Analysis:</strong>
                      {result.recommendation}
                    </p>
                  </div>

                  <button className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-orange-500/20">
                    Schedule Free Inspection
                  </button>
                  <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-white underline">
                    Restart Calculation
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};