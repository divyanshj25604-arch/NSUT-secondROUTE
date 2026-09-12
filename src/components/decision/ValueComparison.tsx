import React from 'react';
import type { DispositionComparison } from '../../types';
import { Check } from 'lucide-react';

interface ValueComparisonProps {
  comparisons: DispositionComparison[];
  recommendedDisposition: string;
}

export const ValueComparison: React.FC<ValueComparisonProps> = ({
  comparisons,
  recommendedDisposition
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            How the alternatives compare
          </h3>
          <p className="text-xs text-slate-500">
            Evaluation of gross value, movement/refurbish overhead, and net economic recovery across all 6 channels.
          </p>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Currency: INR (₹)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/50">
              <th className="py-2.5 px-3 font-semibold">Disposition</th>
              <th className="py-2.5 px-3 font-semibold text-right">Expected Recovery</th>
              <th className="py-2.5 px-3 font-semibold text-right">Processing Cost</th>
              <th className="py-2.5 px-3 font-semibold text-right">Expected Net</th>
              <th className="py-2.5 px-3 font-semibold">Channel Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparisons.map((comp) => {
              const isRecommended = comp.disposition === recommendedDisposition;
              return (
                <tr
                  key={comp.disposition}
                  className={`transition-colors ${
                    isRecommended
                      ? 'bg-emerald-50/70 text-emerald-950 font-medium'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <td className="py-2.5 px-3 font-semibold flex items-center space-x-2">
                    <span>{comp.disposition}</span>
                    {isRecommended && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-emerald-700 text-white font-bold">
                        <Check className="w-3 h-3 mr-0.5" /> Recommended
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono">
                    ₹{comp.expectedRecovery.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                    ₹{comp.processingCost.toLocaleString('en-IN')}
                  </td>
                  <td className={`py-2.5 px-3 text-right font-mono font-bold ${
                    comp.expectedNet > 0 ? (isRecommended ? 'text-emerald-800' : 'text-slate-900') : 'text-slate-400'
                  }`}>
                    ₹{comp.expectedNet.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 font-normal text-[11px]">
                    {comp.notes || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
