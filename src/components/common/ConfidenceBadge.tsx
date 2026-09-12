import React from 'react';
import { HelpCircle } from 'lucide-react';

interface ConfidenceBadgeProps {
  score: number;
  showTooltip?: boolean;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ score, showTooltip = true }) => {
  let badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  let dotStyle = 'bg-emerald-600';
  let label = 'High confidence';

  if (score < 75) {
    badgeStyle = 'bg-rose-50 text-rose-800 border-rose-200';
    dotStyle = 'bg-rose-600';
    label = 'Human review required';
  } else if (score < 90) {
    badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200';
    dotStyle = 'bg-amber-600';
    label = 'Review recommended';
  }

  return (
    <div className="group relative inline-flex items-center">
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${badgeStyle}`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotStyle}`} />
        {score}% confidence
        {showTooltip && <HelpCircle className="w-3.5 h-3.5 ml-1.5 opacity-60 text-slate-500" />}
      </span>

      {showTooltip && (
        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2.5 bg-slate-900 text-white text-xs rounded-md shadow-lg z-50 pointer-events-none">
          <p className="font-medium text-slate-200 mb-1">{score}% Evaluation Confidence ({label})</p>
          <p className="text-slate-300 font-normal leading-relaxed">
            Confidence reflects how strongly the available return context, SKU history, and regional demand support this recommendation.
          </p>
          <div className="absolute left-4 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
        </div>
      )}
    </div>
  );
};
