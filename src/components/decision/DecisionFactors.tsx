import React, { useState } from 'react';
import type { DecisionFactor } from '../../types';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface DecisionFactorsProps {
  factors: DecisionFactor[];
}

export const DecisionFactors: React.FC<DecisionFactorsProps> = ({ factors }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#0F766E]" />
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Decision factors
            </h3>
            <p className="text-xs text-slate-500">
              Weighting of key inputs influencing this recommendation
            </p>
          </div>
        </div>

        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-slate-100 divide-y divide-slate-100">
          {factors.map((factor, idx) => {
            let impactColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            if (factor.impact === 'MEDIUM IMPACT') {
              impactColor = 'bg-blue-50 text-blue-700 border-blue-200';
            } else if (factor.impact === 'LOW IMPACT') {
              impactColor = 'bg-slate-50 text-slate-600 border-slate-200';
            }

            return (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex-1 pr-4">
                  <span className="font-semibold text-slate-800">{factor.name}</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">{factor.description}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${impactColor}`}>
                  {factor.impact}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
