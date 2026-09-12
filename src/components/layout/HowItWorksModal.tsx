import React from 'react';
import { X, GitBranch, CheckCircle2 } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '1',
      title: 'Capture Return Context',
      desc: 'Receives purchase timestamp, SKU specifications, original sale MSRP, and initial return reason from ERP/WMS.'
    },
    {
      num: '2',
      title: 'Assess Condition & Grade',
      desc: 'Physical inspection inputs (cosmetic grade, component functionality, missing accessories, hygiene status).'
    },
    {
      num: '3',
      title: 'Evaluate 6 Dispositions',
      desc: 'Evaluates feasible next destinations: Resell, Refurbish, Exchange, Donate, Recycle, or Write-off.'
    },
    {
      num: '4',
      title: 'Compare Recovery vs Cost',
      desc: 'Calculates expected gross value minus processing, shipping, refurbishing costs & waste implications.'
    },
    {
      num: '5',
      title: 'Recommend Action + Confidence',
      desc: 'Generates single actionable recommendation with confidence score and explainable 3-point rationale.'
    },
    {
      num: '6',
      title: 'Human Control & Outcome Feedback',
      desc: 'Operator accepts or overrides with audit log. Actual recovery feeds back into future decision rules.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-[#0F766E] text-white flex items-center justify-center">
              <GitBranch className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                How SecondRoute Decides
              </h3>
              <p className="text-xs text-slate-500">
                The decision layer inserted into existing returns workflows.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs">
          {/* Core positioning banner */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-md text-emerald-900">
            <p className="font-semibold text-xs mb-0.5">The Product Architecture Principle:</p>
            <p className="text-slate-700 leading-relaxed">
              "Existing systems manage the return. SecondRoute decides what happens next."
            </p>
          </div>

          {/* 6-step diagram grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="bg-slate-50 border border-slate-200 rounded-md p-3.5 flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {s.num}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-xs">{s.title}</h4>
                  <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 6 Disposition Outcomes list */}
          <div className="pt-4 border-t border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              The 6 Evaluated Disposition Outcomes
            </div>
            <div className="flex flex-wrap gap-2">
              {['1. Resell', '2. Refurbish', '3. Exchange', '4. Donate', '5. Recycle', '6. Write-off'].map((disp) => (
                <span key={disp} className="px-2.5 py-1 rounded bg-white border border-slate-200 font-medium text-slate-800 text-xs shadow-2xs flex items-center">
                  <CheckCircle2 className="w-3 h-3 text-[#0F766E] mr-1" />
                  {disp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0F766E] text-white rounded-md font-semibold text-xs hover:bg-[#0d645e] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
