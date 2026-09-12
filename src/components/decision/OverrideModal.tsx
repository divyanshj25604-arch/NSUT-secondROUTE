import React, { useState } from 'react';
import type { ReturnItem, DispositionOption } from '../../types';
import { AlertTriangle, X } from 'lucide-react';

interface OverrideModalProps {
  item: ReturnItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    item: ReturnItem,
    chosenDisposition: DispositionOption,
    reason: string,
    notes?: string
  ) => void;
}

const OVERRIDE_REASONS = [
  'Condition is worse than recorded',
  'Local demand is weaker than expected',
  'Processing cost is higher',
  'Operational constraint',
  'Other'
];

const DISPOSITIONS: DispositionOption[] = [
  'Resell',
  'Refurbish',
  'Exchange',
  'Donate',
  'Recycle',
  'Write-off'
];

export const OverrideModal: React.FC<OverrideModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !item) return null;

  const [selectedReason, setSelectedReason] = useState(OVERRIDE_REASONS[0]);
  const [chosenDisposition, setChosenDisposition] = useState<DispositionOption>(
    item.recommendedDisposition === 'Resell' ? 'Refurbish' : 'Resell'
  );
  const [operatorNotes, setOperatorNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(item, chosenDisposition, selectedReason, operatorNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-slate-900">
              Override recommendation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Current recommendation banner */}
          <div className="p-3 bg-slate-100 border border-slate-200 rounded-md flex items-center justify-between">
            <span className="text-slate-600 font-medium">Return ID: {item.id} ({item.productName})</span>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">System Recommendation</span>
              <span className="font-bold text-[#0F766E] text-sm">{item.recommendedDisposition} ({item.confidenceScore}%)</span>
            </div>
          </div>

          {/* Question: Reason selection */}
          <div>
            <label className="block font-semibold text-slate-800 mb-2">
              Why are you overriding this recommendation?
            </label>
            <div className="space-y-1.5">
              {OVERRIDE_REASONS.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center space-x-2.5 p-2.5 rounded-md border cursor-pointer transition-colors ${
                    selectedReason === reason
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-medium'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="overrideReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="text-[#0F766E] focus:ring-[#0F766E]"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {/* New disposition selection */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              New disposition destination:
            </label>
            <select
              value={chosenDisposition}
              onChange={(e) => setChosenDisposition(e.target.value as DispositionOption)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0F766E]"
            >
              {DISPOSITIONS.map((disp) => (
                <option key={disp} value={disp}>
                  {disp} {disp === item.recommendedDisposition ? '(System Recommended)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Optional notes */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Operator notes (optional):
            </label>
            <textarea
              rows={2}
              value={operatorNotes}
              onChange={(e) => setOperatorNotes(e.target.value)}
              placeholder="e.g. Screen has minor scratch not captured during initial physical inspection."
              className="w-full border border-slate-300 rounded-md p-2 text-xs focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-md font-semibold transition-colors"
            >
              Confirm override
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
