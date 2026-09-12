import React from 'react';
import type { ReturnItem } from '../types';
import { ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReturnDetailPageProps {
  item: ReturnItem | null;
  onBack: () => void;
  onAccept: (item: ReturnItem) => void;
  onOverride: (item: ReturnItem) => void;
  onViewDecisionQueue?: () => void;
}

export const ReturnDetailPage: React.FC<ReturnDetailPageProps> = ({
  item,
  onBack,
  onAccept,
  onOverride,
}) => {
  if (!item) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center text-[#667085]">
        <p className="text-base font-semibold text-[#111827]">Return item not found</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#F7F8FA] border border-[#E5E7EB] text-[#111827] rounded-xl text-xs font-semibold hover:bg-slate-100"
        >
          Back to returns
        </button>
      </div>
    );
  }

  const isAccepted = item.status === 'Accepted' || item.status === 'Routed' || item.status === 'Completed';
  const isOverridden = item.status === 'Overridden';
  const activeDisp = isOverridden ? item.humanOverride?.chosenDisposition : item.recommendedDisposition;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs text-[#667085] hover:text-[#111827] font-medium mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Returns</span>
        </button>

        <div className="flex items-baseline space-x-3">
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            {item.id}
          </h1>
          <span className="text-xl font-bold text-[#111827]">{item.productName}</span>
        </div>
        <p className="text-xs text-[#667085] mt-0.5">
          {item.returnReason} · Returned {item.daysSincePurchase} days after purchase
        </p>
      </div>

      {/* Main Grid: LEFT ~60% (7 cols) / RIGHT ~40% (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Return Context & Disposition Economics (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: Return Context (Clean 2-column info grid) */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#667085]">
              Return context
            </h2>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs border-t border-[#E5E7EB]/60 pt-3">
              <div>
                <span className="text-[#667085] block text-[11px]">Original sale value</span>
                <span className="font-bold text-[#111827] font-mono text-sm">
                  ₹{item.originalValue.toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <span className="text-[#667085] block text-[11px]">Condition</span>
                <span className="font-semibold text-[#111827]">{item.condition}</span>
              </div>

              <div>
                <span className="text-[#667085] block text-[11px]">Grade</span>
                <span className="font-semibold text-[#111827]">Grade {item.grade}</span>
              </div>

              <div>
                <span className="text-[#667085] block text-[11px]">Functionality</span>
                <span className="font-semibold text-[#111827]">{item.functionality}</span>
              </div>

              <div>
                <span className="text-[#667085] block text-[11px]">Accessories</span>
                <span className="font-semibold text-[#111827]">{item.accessories}</span>
              </div>

              <div>
                <span className="text-[#667085] block text-[11px]">Warehouse</span>
                <span className="font-semibold text-[#111827]">{item.warehouse}</span>
              </div>

              <div>
                <span className="text-[#667085] block text-[11px]">Processing cost</span>
                <span className="font-mono font-semibold text-[#111827]">
                  ₹{item.processingCost.toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <span className="text-[#667085] block text-[11px]">Refurbishment cost</span>
                <span className="font-mono font-semibold text-[#111827]">
                  ₹{item.refurbishCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2: Disposition Economics (Comparison Table) */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#667085]">
              Disposition economics
            </h2>
            <p className="text-xs text-[#667085]">
              Net value comparison across all feasible channels.
            </p>

            <div className="overflow-x-auto border-t border-[#E5E7EB]/60 pt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-[#667085] uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-3 font-semibold">Disposition</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Recovery</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Cost</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Expected Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]/60">
                  {item.comparisons.map((comp) => {
                    const isRec = comp.disposition === item.recommendedDisposition;
                    return (
                      <tr
                        key={comp.disposition}
                        className={`transition-colors ${
                          isRec ? 'bg-emerald-50/70 font-semibold text-[#111827]' : 'text-[#667085]'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-bold flex items-center space-x-2">
                          <span>{comp.disposition}</span>
                          {isRec && (
                            <span className="text-[10px] bg-[#0F766E] text-white px-1.5 py-0.2 rounded font-bold">
                              Recommended
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          ₹{comp.expectedRecovery.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-[#667085]">
                          ₹{comp.processingCost.toLocaleString('en-IN')}
                        </td>
                        <td className={`py-2.5 px-3 text-right font-mono font-bold ${
                          isRec ? 'text-[#15803D]' : 'text-[#111827]'
                        }`}>
                          ₹{comp.expectedNet.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DECISION PANEL (THE VISUAL CENTERPIECE) (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-5">
          {/* Eyebrow */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
              SecondRoute Recommendation
            </span>

            {/* Large Hero Disposition Text */}
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl font-extrabold text-[#0F766E] tracking-tight">
                {activeDisp}
              </span>
              <span className="text-xs font-bold bg-emerald-50 text-[#15803D] px-2.5 py-1 rounded-full border border-emerald-200">
                {item.confidenceScore}% confidence
              </span>
            </div>
          </div>

          {/* Overridden / Accepted status alert */}
          {isOverridden && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-[#B45309]">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Overridden by Operator:</span>
                  <p className="mt-0.5">
                    Reason: <em>"{item.humanOverride?.overrideReason}"</em>
                  </p>
                </div>
              </div>
            </div>
          )}

          {isAccepted && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#15803D] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-semibold">Recommendation Accepted & Routed</span>
            </div>
          )}

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#E5E7EB] text-xs">
            <div>
              <span className="text-[#667085] block text-[11px]">Expected recovery</span>
              <span className="font-bold text-[#111827] text-base font-mono">
                ₹{item.resaleRecovery.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-[#667085] block text-[11px]">Expected net recovery</span>
              <span className="font-extrabold text-[#15803D] text-lg font-mono">
                ₹{item.expectedNetRecovery.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Rationale Statement */}
          <div className="text-xs text-[#111827] font-medium leading-relaxed bg-[#F7F8FA] p-3.5 rounded-xl border border-[#E5E7EB]">
            "{item.rationale[0]}"
          </div>

          {/* 3 Decision Factors */}
          <div className="space-y-2 text-xs pt-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
              Decision factors
            </span>

            <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]/50">
              <span className="text-[#111827] font-medium">Condition</span>
              <span className="font-semibold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                Strong positive
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]/50">
              <span className="text-[#111827] font-medium">Demand / context</span>
              <span className="font-semibold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                Positive
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-[#111827] font-medium">Economics</span>
              <span className="font-semibold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                Strong positive
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 space-y-2.5">
            <button
              onClick={() => onAccept(item)}
              disabled={isAccepted}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2 ${
                isAccepted
                  ? 'bg-slate-100 text-[#667085] cursor-not-allowed'
                  : 'bg-[#0F766E] hover:bg-[#0D645E] text-white shadow-2xs'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAccepted ? 'Recommendation Accepted' : 'Accept recommendation'}</span>
            </button>

            <button
              onClick={() => onOverride(item)}
              className="w-full bg-white hover:bg-[#F7F8FA] text-[#111827] py-2.5 px-4 rounded-xl text-xs font-semibold border border-[#E5E7EB] transition-colors"
            >
              {isOverridden ? 'Edit Override Reason' : 'Override decision'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
