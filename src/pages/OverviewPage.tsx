import React from 'react';
import type { ReturnItem } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface OverviewPageProps {
  returns: ReturnItem[];
  onSelectReturn: (returnId: string) => void;
  onNavigateToDecisions: () => void;
  onOpenEvaluateModal: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  returns,
  onSelectReturn,
  onNavigateToDecisions,
  onOpenEvaluateModal
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Overview
          </h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Monitor returns, disposition decisions and recovered value.
          </p>
        </div>

        <button
          onClick={onOpenEvaluateModal}
          className="bg-[#0F766E] hover:bg-[#0D645E] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 shadow-2xs self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Evaluate return</span>
        </button>
      </div>

      {/* SINGLE HORIZONTAL KPI STRIP WITH Subtle Dividers */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E7EB]">
          {/* KPI 1 */}
          <div className="py-2 lg:py-0 lg:px-4 first:pl-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
              Returns evaluated
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-[#111827] font-mono tracking-tight">1,248</span>
              <span className="text-xs font-medium text-[#15803D] bg-emerald-50 px-1.5 py-0.5 rounded">
                +12.4%
              </span>
            </div>
            <span className="text-[11px] text-[#667085] block mt-0.5">Decision engine processed</span>
          </div>

          {/* KPI 2 */}
          <div className="py-2 lg:py-0 lg:px-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
              Net recovery
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-[#111827] font-mono tracking-tight">₹5.68L</span>
              <span className="text-xs font-medium text-[#15803D] bg-emerald-50 px-1.5 py-0.5 rounded">
                +14.2%
              </span>
            </div>
            <span className="text-[11px] text-[#667085] block mt-0.5">Incremental value yield</span>
          </div>

          {/* KPI 3 */}
          <div className="py-2 lg:py-0 lg:px-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
              Avg decision time
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-[#111827] font-mono tracking-tight">42 sec</span>
              <span className="text-xs font-medium text-[#15803D] bg-emerald-50 px-1.5 py-0.5 rounded">
                -95%
              </span>
            </div>
            <span className="text-[11px] text-[#667085] block mt-0.5">Vs 14 min manual baseline</span>
          </div>

          {/* KPI 4 */}
          <div className="py-2 lg:py-0 lg:px-4 last:pr-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
              Waste avoided
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-[#111827] font-mono tracking-tight">18.7%</span>
              <span className="text-xs font-medium text-[#15803D] bg-emerald-50 px-1.5 py-0.5 rounded">
                +4.1%
              </span>
            </div>
            <span className="text-[11px] text-[#667085] block mt-0.5">Diverted from write-off</span>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT BELOW KPIs (~65% / ~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Returns requiring attention (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#111827]">
                Returns requiring attention
              </h2>
              <p className="text-xs text-[#667085]">
                Click any return to inspect the decision factors and recommendation rationale.
              </p>
            </div>

            <button
              onClick={onNavigateToDecisions}
              className="text-xs text-[#0F766E] font-semibold hover:underline flex items-center space-x-1"
            >
              <span>View queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[#667085] uppercase tracking-wider text-[11px] bg-[#F7F8FA]">
                  <th className="py-2.5 px-3 font-semibold">Return</th>
                  <th className="py-2.5 px-3 font-semibold">Product</th>
                  <th className="py-2.5 px-3 font-semibold">Condition</th>
                  <th className="py-2.5 px-3 font-semibold">Recommendation</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Expected Recovery</th>
                  <th className="py-2.5 px-3 font-semibold">Confidence</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]/60">
                {returns.slice(0, 6).map((item) => {
                  const isOverridden = item.status === 'Overridden';
                  const activeDisp = isOverridden ? item.humanOverride?.chosenDisposition : item.recommendedDisposition;

                  return (
                    <tr
                      key={item.id}
                      onClick={() => onSelectReturn(item.id)}
                      className="hover:bg-[#F7F8FA] cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-3 font-mono font-semibold text-[#0F766E] group-hover:underline">
                        {item.id}
                      </td>
                      <td className="py-3 px-3 font-medium text-[#111827]">
                        <span className="truncate block max-w-[170px]">{item.productName}</span>
                      </td>
                      <td className="py-3 px-3 text-[#667085]">
                        {item.condition} · Grade {item.grade}
                      </td>
                      <td className="py-3 px-3 font-bold">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold tracking-wide border border-[#0F766E]/20">
                          {activeDisp}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-[#111827]">
                        ₹{item.expectedNetRecovery.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.confidenceScore >= 90 ? 'bg-emerald-50 text-[#15803D]' : 'bg-amber-50 text-[#B45309]'
                        }`}>
                          {item.confidenceScore}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center text-[11px] text-[#667085] font-medium">
                          {item.status === 'Accepted' || item.status === 'Routed' ? 'Ready' : item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: Decision Health (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs space-y-5">
          <div>
            <h2 className="text-base font-bold text-[#111827]">
              Decision health
            </h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Algorithm performance & operator adherence.
            </p>
          </div>

          <div className="space-y-3 divide-y divide-[#E5E7EB]/60 text-xs">
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[#667085] font-medium flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] mr-1.5" />
                Recommendation acceptance
              </span>
              <span className="font-bold text-[#111827] font-mono text-sm">87%</span>
            </div>

            <div className="pt-2.5 flex items-center justify-between">
              <span className="text-[#667085] font-medium flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] mr-1.5" />
                Average confidence
              </span>
              <span className="font-bold text-[#111827] font-mono text-sm">91%</span>
            </div>

            <div className="pt-2.5 flex items-center justify-between">
              <span className="text-[#667085] font-medium flex items-center">
                <AlertCircle className="w-3.5 h-3.5 text-[#B45309] mr-1.5" />
                Low-confidence decisions
              </span>
              <span className="font-bold text-[#B45309] font-mono text-sm">14</span>
            </div>
          </div>

          {/* Disposition Breakdown Mini Viz */}
          <div className="pt-3 border-t border-[#E5E7EB]/70">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] mb-2.5">
              Disposition Breakdown
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: 'Resell', pct: 42, color: 'bg-[#0F766E]' },
                { label: 'Refurbish', pct: 28, color: 'bg-emerald-600' },
                { label: 'Exchange', pct: 12, color: 'bg-blue-600' },
                { label: 'Donate', pct: 8, color: 'bg-indigo-600' },
                { label: 'Recycle', pct: 6, color: 'bg-amber-600' },
                { label: 'Write-off', pct: 4, color: 'bg-slate-400' }
              ].map((item) => (
                <div key={item.label} className="flex items-center space-x-2">
                  <span className="w-16 text-[#667085] text-[11px] truncate">{item.label}</span>
                  <div className="flex-1 h-2 bg-[#F7F8FA] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px] text-[#111827] font-semibold">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
