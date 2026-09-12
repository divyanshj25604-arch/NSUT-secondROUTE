import React from 'react';
import type { ReturnStatus } from '../../types';

interface StatusBadgeProps {
  status: ReturnStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let styles = 'bg-slate-100 text-slate-700 border-slate-200';

  switch (status) {
    case 'Pending':
      styles = 'bg-slate-100 text-slate-700 border-slate-200';
      break;
    case 'Review required':
      styles = 'bg-amber-50 text-amber-800 border-amber-200 font-medium';
      break;
    case 'Accepted':
      styles = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium';
      break;
    case 'Overridden':
      styles = 'bg-amber-50 text-amber-900 border-amber-300 font-medium';
      break;
    case 'Routed':
      styles = 'bg-blue-50 text-blue-800 border-blue-200 font-medium';
      break;
    case 'Completed':
      styles = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-medium';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'Accepted' || status === 'Completed' ? 'bg-emerald-600' :
        status === 'Review required' || status === 'Overridden' ? 'bg-amber-600' :
        status === 'Routed' ? 'bg-blue-600' : 'bg-slate-400'
      }`} />
      {status}
    </span>
  );
};
