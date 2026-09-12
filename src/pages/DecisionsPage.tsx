import React, { useState } from 'react';
import type { ReturnItem } from '../types';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

interface DecisionsPageProps {
  returns: ReturnItem[];
  onSelectReturn: (returnId: string) => void;
  onAccept: (item: ReturnItem) => void;
  onOverride: (item: ReturnItem) => void;
}

export const DecisionsPage: React.FC<DecisionsPageProps> = ({
  returns,
  onSelectReturn,
  onAccept,
  onOverride
}) => {
  const [tab, setTab] = useState<'needs_review' | 'ready_to_route' | 'completed' | 'all'>('needs_review');

  const needsReviewItems = returns.filter(
    r => r.status === 'Review required' || r.confidenceScore < 85 || r.status === 'Pending'
  );
  const readyToRouteItems = returns.filter(r => r.status === 'Accepted' || r.status === 'Overridden');
  const completedItems = returns.filter(r => r.status === 'Routed' || r.status === 'Completed');

  let displayedReturns = returns;
  if (tab === 'needs_review') displayedReturns = needsReviewItems;
  if (tab === 'ready_to_route') displayedReturns = readyToRouteItems;
  if (tab === 'completed') displayedReturns = completedItems;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Decisions
          </h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Review recommendations, overrides and completed dispositions.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-medium self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-[#B45309] font-bold border border-amber-200 flex items-center">
            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-[#B45309]" />
            {needsReviewItems.length} Needs Review
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-[#15803D] font-bold border border-emerald-200 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#15803D]" />
            {readyToRouteItems.length + completedItems.length} Processed
          </span>
        </div>
      </div>

      {/* Queue Tabs */}
      <div className="border-b border-[#E5E7EB] flex space-x-6 text-xs font-semibold">
        <button
          onClick={() => setTab('needs_review')}
          className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
            tab === 'needs_review'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#667085] hover:text-[#111827]'
          }`}
        >
          <span>Needs Review</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-[#B45309]">
            {needsReviewItems.length}
          </span>
        </button>

        <button
          onClick={() => setTab('ready_to_route')}
          className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
            tab === 'ready_to_route'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#667085] hover:text-[#111827]'
          }`}
        >
          <span>Ready to Route / Accepted</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-[#15803D]">
            {readyToRouteItems.length}
          </span>
        </button>

        <button
          onClick={() => setTab('completed')}
          className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
            tab === 'completed'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#667085] hover:text-[#111827]'
          }`}
        >
          <span>Completed</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-700">
            {completedItems.length}
          </span>
        </button>

        <button
          onClick={() => setTab('all')}
          className={`pb-3 border-b-2 transition-colors ${
            tab === 'all'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#667085] hover:text-[#111827]'
          }`}
        >
          <span>All ({returns.length})</span>
        </button>
      </div>

      {/* Decisions Queue Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#667085] uppercase tracking-wider text-[11px] bg-[#F7F8FA]">
                <th className="py-3 px-3.5 font-semibold">Return ID</th>
                <th className="py-3 px-3.5 font-semibold">Product</th>
                <th className="py-3 px-3.5 font-semibold">Recommendation</th>
                <th className="py-3 px-3.5 font-semibold">Confidence</th>
                <th className="py-3 px-3.5 font-semibold text-right">Expected Net</th>
                <th className="py-3 px-3.5 font-semibold">Attention Rationale</th>
                <th className="py-3 px-3.5 font-semibold text-right">Next Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]/60">
              {displayedReturns.length > 0 ? (
                displayedReturns.map((item) => {
                  const isOverridden = item.status === 'Overridden';
                  const activeDisp = isOverridden ? item.humanOverride?.chosenDisposition : item.recommendedDisposition;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F7F8FA] transition-colors"
                    >
                      <td className="py-3.5 px-3.5 font-mono font-semibold text-[#0F766E]">
                        <button
                          onClick={() => onSelectReturn(item.id)}
                          className="hover:underline"
                        >
                          {item.id}
                        </button>
                      </td>
                      <td className="py-3.5 px-3.5">
                        <span className="font-semibold text-[#111827] block truncate max-w-[180px]">
                          {item.productName}
                        </span>
                        <span className="text-[11px] text-[#667085]">
                          {item.condition}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 font-bold">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-[#0F766E]/10 text-[#0F766E] text-xs font-extrabold border border-[#0F766E]/20">
                          {activeDisp}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.confidenceScore >= 90 ? 'bg-emerald-50 text-[#15803D]' : 'bg-amber-50 text-[#B45309]'
                        }`}>
                          {item.confidenceScore}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-right font-mono font-bold text-[#111827]">
                        ₹{item.expectedNetRecovery.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-3.5 text-[#667085] text-[11px] truncate max-w-[200px]">
                        {item.confidenceScore < 85
                          ? `Low confidence score (${item.confidenceScore}%) requires review`
                          : item.rationale[0]}
                      </td>
                      <td className="py-3.5 px-3.5 text-right space-x-2">
                        {item.status === 'Pending' || item.status === 'Review required' ? (
                          <>
                            <button
                              onClick={() => onAccept(item)}
                              className="px-3 py-1 bg-[#0F766E] hover:bg-[#0D645E] text-white rounded-lg text-[11px] font-semibold transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => onOverride(item)}
                              className="px-3 py-1 bg-white border border-[#E5E7EB] text-[#111827] hover:bg-[#F7F8FA] rounded-lg text-[11px] font-semibold transition-colors"
                            >
                              Override
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => onSelectReturn(item.id)}
                            className="px-3 py-1 bg-[#F7F8FA] border border-[#E5E7EB] hover:bg-slate-100 text-[#111827] rounded-lg text-[11px] font-semibold flex items-center space-x-1 ml-auto"
                          >
                            <span>Inspect</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#667085]">
                    No returns in this queue tab.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
