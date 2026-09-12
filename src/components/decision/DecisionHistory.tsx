import React from 'react';
import type { AuditEvent } from '../../types';
import { Clock } from 'lucide-react';

interface DecisionHistoryProps {
  history: AuditEvent[];
}

export const DecisionHistory: React.FC<DecisionHistoryProps> = ({ history }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-center space-x-2 mb-3">
        <Clock className="w-4 h-4 text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-900">
          Decision audit trail
        </h3>
      </div>

      <div className="relative pl-4 space-y-4 border-l border-slate-200 text-xs">
        {history.map((event, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white" />
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-slate-800">{event.action}</span>
              <span className="text-[11px] text-slate-400 font-mono">{event.timestamp}</span>
            </div>
            <div className="text-slate-500 text-[11px] mt-0.5">
              by <span className="font-medium text-slate-700">{event.actor}</span>
              {event.details && ` · ${event.details}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
