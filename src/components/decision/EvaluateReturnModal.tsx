import React, { useState } from 'react';
import type { ReturnItem, ReturnCondition, ConditionGrade } from '../../types';
import { evaluateReturn, type EvaluateInput } from '../../engine/decisionEngine';
import { Sparkles, X, PlusCircle } from 'lucide-react';

interface EvaluateReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReturnEvaluated: (newItem: ReturnItem) => void;
}

const SAMPLE_PRODUCTS = [
  { name: 'Apple iPhone 15 Pro 256GB', category: 'Smartphones', value: 129900 },
  { name: 'Sony WH-1000XM5 Headphones', category: 'Audio', value: 29990 },
  { name: 'Samsung Galaxy Tab S9 Ultra', category: 'Tablets', value: 108999 },
  { name: 'MacBook Pro 14 M3 Max', category: 'Laptops', value: 199900 },
  { name: 'Bose QuietComfort Ultra', category: 'Audio', value: 35900 }
];

const CONDITIONS: ReturnCondition[] = [
  'Unopened',
  'Open Box',
  'Used - Like New',
  'Used - Minor Scratches',
  'Damaged Screen',
  'Hygiene Return - Opened',
  'Water Damage',
  'Board Level Failure'
];

const WAREHOUSES = [
  'Delhi NCR Fulfillment Center',
  'Mumbai Logistics Hub',
  'Bengaluru Fulfillment Center',
  'Hyderabad Logistics Hub',
  'Chennai Logistics Hub'
];

export const EvaluateReturnModal: React.FC<EvaluateReturnModalProps> = ({
  isOpen,
  onClose,
  onReturnEvaluated
}) => {
  if (!isOpen) return null;

  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [condition, setCondition] = useState<ReturnCondition>('Open Box');
  const [grade, setGrade] = useState<ConditionGrade>('B');
  const [warehouse, setWarehouse] = useState(WAREHOUSES[0]);
  const [returnReason, setReturnReason] = useState('Customer changed mind within 7 days');
  const [daysSincePurchase, setDaysSincePurchase] = useState(6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = SAMPLE_PRODUCTS[selectedProductIndex];
    const input: EvaluateInput = {
      productName: prod.name,
      category: prod.category,
      originalValue: prod.value,
      condition,
      grade,
      functionality: condition === 'Board Level Failure' ? 'Non-functional' : 'Fully functional electronics',
      accessories: 'Complete original inbox accessories',
      warehouse,
      returnReason,
      daysSincePurchase
    };

    const result = evaluateReturn(input);
    onReturnEvaluated(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-lg shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#0F766E]" />
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Evaluate Incoming Return
              </h3>
              <p className="text-xs text-slate-500">
                Input return inspection parameters to evaluate next-best disposition option.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Product Selector */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Select Product SKU:
            </label>
            <select
              value={selectedProductIndex}
              onChange={(e) => setSelectedProductIndex(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
            >
              {SAMPLE_PRODUCTS.map((p, idx) => (
                <option key={idx} value={idx}>
                  {p.name} — MSRP ₹{p.value.toLocaleString('en-IN')}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Condition */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Inspected Condition:
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ReturnCondition)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Condition Grade */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Condition Grade:
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as ConditionGrade)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
              >
                <option value="A">Grade A (Pristine)</option>
                <option value="B">Grade B (Good)</option>
                <option value="C">Grade C (Cosmetic defect)</option>
                <option value="D">Grade D (Severe issue)</option>
                <option value="F">Grade F (Scrap/Failure)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Warehouse */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Receiving Warehouse Hub:
              </label>
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
              >
                {WAREHOUSES.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* Days since purchase */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Days Since Purchase:
              </label>
              <input
                type="number"
                min={1}
                max={90}
                value={daysSincePurchase}
                onChange={(e) => setDaysSincePurchase(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Return Reason */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Customer Return Reason:
            </label>
            <input
              type="text"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
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
              className="px-4 py-2 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-md font-semibold transition-colors flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Evaluate & add return</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
