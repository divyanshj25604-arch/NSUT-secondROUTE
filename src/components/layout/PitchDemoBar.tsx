import React from 'react';
import { Play, ChevronRight, X, Sparkles } from 'lucide-react';
import type { ActiveTab } from '../../types';

interface PitchDemoBarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onExecuteStep: (step: number) => void;
  onClose: () => void;
}

export const DEMO_STEPS = [
  {
    step: 1,
    title: '1. Overview Dashboard',
    sub: 'Show operational queue',
    action: 'Open Overview',
    tab: 'overview' as ActiveTab,
    script: '"These are the returns currently being processed across our electronics hubs."'
  },
  {
    step: 2,
    title: '2. Open Return #SR-1024',
    sub: 'iPhone 14 Return Detail',
    action: 'Open SR-1024',
    tab: 'returns' as ActiveTab,
    script: '"This iPhone 14 has been inspected. SecondRoute now evaluates what should happen next."'
  },
  {
    step: 3,
    title: '3. Decision & Alternatives',
    sub: 'Hero RESELL (94%) & Table',
    action: 'View Recommendation',
    tab: 'returns' as ActiveTab,
    script: '"Rather than static rules, SecondRoute compares gross recovery, processing cost, and waste for all 6 dispositions."'
  },
  {
    step: 4,
    title: '4. Accept & Route',
    sub: 'Click Accept Recommendation',
    action: 'Accept SR-1024',
    tab: 'returns' as ActiveTab,
    script: '"Clicking Accept instantly routes the unit into the retailer\'s Resell queue."'
  },
  {
    step: 5,
    title: '5. Decisions Queue',
    sub: 'Operational Action Queue',
    action: 'View Decisions',
    tab: 'decisions' as ActiveTab,
    script: '"Here ops teams manage pending review items and view completed routing."'
  },
  {
    step: 6,
    title: '6. Second Path: Human Override',
    sub: 'Open SR-1021 (68% Low Confidence)',
    action: 'Open SR-1021',
    tab: 'returns' as ActiveTab,
    script: '"When confidence is low (68%), human review is required. Operators can override with audit logging."'
  },
  {
    step: 7,
    title: '7. Analytics & ROI',
    sub: 'Measure business value',
    action: 'Open Analytics',
    tab: 'analytics' as ActiveTab,
    script: '"Operations leaders see measurable outcomes: ₹455 incremental net recovery per return."'
  }
];

export const PitchDemoBar: React.FC<PitchDemoBarProps> = ({
  currentStep,
  setCurrentStep,
  onExecuteStep,
  onClose
}) => {
  const stepObj = DEMO_STEPS.find(s => s.step === currentStep) || DEMO_STEPS[0];

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 px-6 py-2.5 flex items-center justify-between z-40 relative shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-[#0F766E] text-white text-[11px] font-bold tracking-wide">
          <Sparkles className="w-3 h-3" />
          <span>PITCH DEMO MODE</span>
        </div>
        
        <div className="text-xs">
          <span className="font-semibold text-slate-100">{stepObj.title}:</span>
          <span className="text-slate-300 ml-1.5 italic font-mono">{stepObj.script}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Step dots */}
        <div className="flex items-center space-x-1">
          {DEMO_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStep(s.step);
                onExecuteStep(s.step);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                s.step === currentStep
                  ? 'bg-emerald-400 w-5'
                  : s.step < currentStep
                  ? 'bg-slate-500'
                  : 'bg-slate-700'
              }`}
              title={s.title}
            />
          ))}
        </div>

        {/* Step Action Button */}
        <button
          onClick={() => {
            const nextStep = currentStep >= DEMO_STEPS.length ? 1 : currentStep + 1;
            setCurrentStep(nextStep);
            onExecuteStep(nextStep);
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded flex items-center space-x-1 transition-colors"
        >
          <Play className="w-3 h-3 fill-white" />
          <span>Step {currentStep}/{DEMO_STEPS.length}: {stepObj.action}</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
          title="Exit Pitch Demo Mode"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
