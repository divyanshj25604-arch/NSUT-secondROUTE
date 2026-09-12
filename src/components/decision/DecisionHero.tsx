import React from 'react';
import type { ReturnItem } from '../../types';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface DecisionHeroProps {
  item: ReturnItem;
  onAccept: (item: ReturnItem) => void;
  onOverride: (item: ReturnItem) => void;
  onViewDecisionQueue?: () => void;
}

export const DecisionHero: React.FC<DecisionHeroProps> = ({
  item,
  onAccept,
  onOverride,
  onViewDecisionQueue
}) => {
  const isAccepted = item.status === 'Accepted' || item.status === 'Routed' || item.status === 'Completed';
  const isOverridden = item.status === 'Overridden';

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs relative overflow-hidden">
      {/* Subtle brand border top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F766E]" />

      {/* Central Question Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            SecondRoute Decision Layer
          </span>
          <h2 className="text-sm font-semibold text-slate-900 mt-0.5">
            WHAT SHOULD HAPPEN TO THIS RETURN?
          </h2>
        </div>

        <ConfidenceBadge score={item.confidenceScore} />
      </div>

      {/* Overridden Alert banner if applicable */}
      {isOverridden && item.humanOverride && (
        <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Recommendation Overridden by Human Operator:</span>
              <p className="mt-0.5">
                Changed from <strong className="line-through">{item.recommendedDisposition}</strong> to <strong>{item.humanOverride.chosenDisposition}</strong>.
                Reason: <em>"{item.humanOverride.overrideReason}"</em>
                {item.humanOverride.operatorNotes && ` (${item.humanOverride.operatorNotes})`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Accepted Alert banner if applicable */}
      {isAccepted && (
        <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong className="font-semibold">Recommendation Accepted:</strong> Item routed to {item.humanOverride ? item.humanOverride.chosenDisposition : item.recommendedDisposition} disposition queue.
            </span>
          </div>
          {onViewDecisionQueue && (
            <button
              onClick={onViewDecisionQueue}
              className="text-xs text-emerald-800 underline font-medium hover:text-emerald-950 flex items-center"
            >
              View queue <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          )}
        </div>
      )}

      {/* The HERO Recommendation Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Hero Box */}
        <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-lg p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Recommended Next Action
          </div>
          
          <div className="flex items-baseline space-x-3 mt-1 mb-2">
            <span className="text-3xl md:text-4xl font-extrabold text-[#0F766E] tracking-tight">
              {isOverridden ? item.humanOverride?.chosenDisposition : item.recommendedDisposition}
            </span>
            {isOverridden && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                Human Override
              </span>
            )}
          </div>

          {/* Financial summary grid */}
          <div className="grid grid-cols-2 gap-4 pt-3 mt-3 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Expected Gross Recovery</span>
              <span className="text-sm font-semibold text-slate-800">
                ₹{item.resaleRecovery.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Expected Net Recovery</span>
              <span className="text-base font-bold text-emerald-700">
                ₹{item.expectedNetRecovery.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA Box */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-3 pl-0 md:pl-2">
          {!isAccepted && !isOverridden ? (
            <>
              <button
                onClick={() => onAccept(item)}
                className="w-full bg-[#0F766E] hover:bg-[#0d645e] active:bg-[#0a4f4a] text-white font-semibold py-2.5 px-4 rounded-md text-sm shadow-xs transition-colors flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Accept recommendation</span>
              </button>

              <button
                onClick={() => onOverride(item)}
                className="w-full bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-medium py-2.5 px-4 rounded-md text-sm border border-slate-300 transition-colors"
              >
                Override recommendation
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                One-click operational routing into e-commerce ERP
              </p>
            </>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => onOverride(item)}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-2 px-3 rounded-md text-xs border border-slate-200"
              >
                {isOverridden ? 'Edit Override Reason' : 'Change Disposition (Override)'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Why SecondRoute Recommends Section */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3">
          Why SecondRoute recommends {item.recommendedDisposition}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {item.rationale.map((reason, idx) => (
            <div key={idx} className="bg-slate-50/70 border border-slate-200/80 rounded-md p-3 text-xs">
              <div className="flex items-center space-x-1.5 text-slate-700 font-semibold mb-1">
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span>{idx === 0 ? 'Condition' : idx === 1 ? 'Economics' : 'Demand / Context'}</span>
              </div>
              <p className="text-slate-600 leading-relaxed font-normal">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
