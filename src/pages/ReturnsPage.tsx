import React, { useState } from 'react';
import type { ReturnItem } from '../types';
import { Search, Filter, Sparkles, RefreshCw } from 'lucide-react';

interface ReturnsPageProps {
  returns: ReturnItem[];
  onSelectReturn: (returnId: string) => void;
  onOpenEvaluateModal: () => void;
  onResetDemoData: () => void;
}

export const ReturnsPage: React.FC<ReturnsPageProps> = ({
  returns,
  onSelectReturn,
  onOpenEvaluateModal,
  onResetDemoData
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dispositionFilter, setDispositionFilter] = useState<string>('All');
  const [warehouseFilter, setWarehouseFilter] = useState<string>('All');

  const filteredReturns = returns.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesDisposition =
      dispositionFilter === 'All' ||
      item.recommendedDisposition === dispositionFilter ||
      item.humanOverride?.chosenDisposition === dispositionFilter;
    const matchesWarehouse = warehouseFilter === 'All' || item.warehouse.includes(warehouseFilter);

    return matchesSearch && matchesStatus && matchesDisposition && matchesWarehouse;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Returns Directory
          </h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Review and act on returned electronics across fulfillment centers.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <button
            onClick={onResetDemoData}
            className="px-3 py-2 bg-white border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#667085] rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5"
            title="Reset seeded demo dataset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={onOpenEvaluateModal}
            className="bg-[#0F766E] hover:bg-[#0D645E] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evaluate return</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search return ID, SKU, product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#0F766E] focus:bg-white text-[#111827]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center space-x-1 text-[#667085] mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold uppercase">Filters:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 text-xs text-[#111827] font-medium focus:outline-none focus:border-[#0F766E]"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Review required">Review required</option>
            <option value="Accepted">Accepted</option>
            <option value="Overridden">Overridden</option>
            <option value="Routed">Routed</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={dispositionFilter}
            onChange={(e) => setDispositionFilter(e.target.value)}
            className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 text-xs text-[#111827] font-medium focus:outline-none focus:border-[#0F766E]"
          >
            <option value="All">All Dispositions</option>
            <option value="Resell">Resell</option>
            <option value="Refurbish">Refurbish</option>
            <option value="Exchange">Exchange</option>
            <option value="Donate">Donate</option>
            <option value="Recycle">Recycle</option>
            <option value="Write-off">Write-off</option>
          </select>

          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 text-xs text-[#111827] font-medium focus:outline-none focus:border-[#0F766E]"
          >
            <option value="All">All Warehouses</option>
            <option value="Delhi">Delhi NCR</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#667085] uppercase tracking-wider text-[11px] bg-[#F7F8FA]">
                <th className="py-3 px-3.5 font-semibold">Return ID</th>
                <th className="py-3 px-3.5 font-semibold">Product SKU</th>
                <th className="py-3 px-3.5 font-semibold">Return Reason</th>
                <th className="py-3 px-3.5 font-semibold">Condition</th>
                <th className="py-3 px-3.5 font-semibold">Warehouse</th>
                <th className="py-3 px-3.5 font-semibold">Recommendation</th>
                <th className="py-3 px-3.5 font-semibold">Confidence</th>
                <th className="py-3 px-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]/60">
              {filteredReturns.length > 0 ? (
                filteredReturns.map((item) => {
                  const isOverridden = item.status === 'Overridden';
                  const activeDisp = isOverridden ? item.humanOverride?.chosenDisposition : item.recommendedDisposition;

                  return (
                    <tr
                      key={item.id}
                      onClick={() => onSelectReturn(item.id)}
                      className="hover:bg-[#F7F8FA] cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3.5 font-mono font-semibold text-[#0F766E]">
                        {item.id}
                      </td>
                      <td className="py-3 px-3.5">
                        <span className="font-semibold text-[#111827] block truncate max-w-[180px]">
                          {item.productName}
                        </span>
                        <span className="text-[11px] text-[#667085] font-mono">
                          ₹{item.originalValue.toLocaleString('en-IN')} MSRP
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-[#667085] truncate max-w-[160px]">
                        {item.returnReason}
                      </td>
                      <td className="py-3 px-3.5 text-[#111827]">
                        {item.condition} (Grade {item.grade})
                      </td>
                      <td className="py-3 px-3.5 text-[#667085] text-[11px] truncate max-w-[120px]">
                        {item.warehouse.replace(' Fulfillment Center', '').replace(' Logistics Hub', '')}
                      </td>
                      <td className="py-3 px-3.5 font-bold">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-[#0F766E]/10 text-[#0F766E] text-xs font-extrabold border border-[#0F766E]/20">
                          {activeDisp}
                        </span>
                      </td>
                      <td className="py-3 px-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.confidenceScore >= 90 ? 'bg-emerald-50 text-[#15803D]' : 'bg-amber-50 text-[#B45309]'
                        }`}>
                          {item.confidenceScore}%
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-[#667085] font-medium">
                        {item.status}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#667085]">
                    No returns match the selected filters.
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
