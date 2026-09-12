import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  change?: string;
  positive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  change,
  positive = true
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </div>
        {change && (
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {change}
          </span>
        )}
      </div>
      {subtext && (
        <div className="text-xs text-slate-400 mt-1 font-normal">
          {subtext}
        </div>
      )}
    </div>
  );
};
