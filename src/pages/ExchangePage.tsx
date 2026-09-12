import React, { useState } from 'react';
import type { ExchangeItem } from '../types';
import { INITIAL_EXCHANGE_ITEMS } from '../data/mockExchange';
import {
  Search,
  Filter,
  Sparkles,
  Clock,
  X,
  Gavel,
  CheckCircle2
} from 'lucide-react';

interface ExchangePageProps {
  onShowToast: (type: 'success' | 'warning' | 'info', title: string, description?: string) => void;
}

export const ExchangePage: React.FC<ExchangePageProps> = ({ onShowToast }) => {
  const [items, setItems] = useState<ExchangeItem[]>(INITIAL_EXCHANGE_ITEMS);
  const [selectedItem, setSelectedItem] = useState<ExchangeItem | null>(null);
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filtered Items
  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.returnId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Calculate totals for Top Metrics
  const activeBidsTotal = items.reduce((acc, curr) => acc + curr.bidsCount, 0);
  const totalRecoveryGen = items.reduce((acc, curr) => acc + curr.currentBid, 0);

  // Open Bidding Modal
  const handleOpenBidding = (item: ExchangeItem) => {
    setSelectedItem(item);
    setBidAmount(item.currentBid + 500);
    setIsBiddingModalOpen(true);
  };

  // Submit Bid Action
  const handleConfirmBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const newBid = Math.max(bidAmount, selectedItem.currentBid + 500);

    setItems(prev =>
      prev.map(item => {
        if (item.id === selectedItem.id) {
          const updated = {
            ...item,
            currentBid: newBid,
            bidsCount: item.bidsCount + 1
          };
          setSelectedItem(updated);
          return updated;
        }
        return item;
      })
    );

    setIsBiddingModalOpen(false);
    onShowToast(
      'success',
      'Bid Placed Successfully',
      `Bid of ₹${newBid.toLocaleString('en-IN')} placed for ${selectedItem.productName}. Market signal updated.`
    );
  };

  return (
    <div className="space-y-6 select-none">
      {/* BRAND POSITIONING HERO BANNER */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-[11px] font-bold tracking-wide border border-[#0F766E]/20 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>PHASE 2 · RECOVERY + MARKET INTELLIGENCE</span>
            </div>
            
            <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
              SecondRoute Exchange
            </h1>
            
            <p className="text-sm font-semibold text-[#0F766E] mt-0.5">
              Turn low-recovery inventory into market value.
            </p>
            
            <p className="text-xs text-[#667085] mt-1 max-w-2xl leading-relaxed">
              "Give eligible returned products a final recovery path while generating real market signals that improve future disposition decisions."
            </p>
          </div>

          <div className="bg-[#F7F8FA] border border-[#E5E7EB] p-3.5 rounded-xl text-xs space-y-1 shrink-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
              Marketplace Positioning
            </span>
            <p className="font-medium text-[#111827]">
              Where low-recovery inventory finds its market value.
            </p>
          </div>
        </div>
      </div>

      {/* PAGE HEADER & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#111827]">
            Exchange Directory
          </h2>
          <p className="text-xs text-[#667085]">
            Where low-recovery inventory finds its market value.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto text-xs">
          {/* Search Inventory */}
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#111827] focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-[#667085]" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 text-xs text-[#111827] font-medium focus:outline-none focus:border-[#0F766E]"
            >
              <option value="All">All Categories</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Laptops">Laptops</option>
              <option value="Audio">Audio</option>
              <option value="Tablets">Tablets</option>
            </select>
          </div>

          {/* Active Items Badge */}
          <span className="px-3 py-1.5 rounded-xl bg-[#0F766E]/10 text-[#0F766E] font-bold border border-[#0F766E]/20">
            {items.length} Active Items
          </span>
        </div>
      </div>

      {/* TOP METRICS STRIP */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E7EB]">
          {/* Active Inventory */}
          <div className="py-2 lg:py-0 lg:px-4 first:pl-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
              Active inventory
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-[#111827] font-mono tracking-tight">84</span>
              <span className="text-xs font-semibold text-[#15803D] bg-emerald-50 px-1.5 py-0.5 rounded">
                Live
              </span>
            </div>
            <span className="text-[11px] text-[#667085] block mt-0.5">Eligible B2B units</span>
          </div>

          {/* Active Bids */}
          <div className="py-2 lg:py-0 lg:px-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
              Active bids
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-[#111827] font-mono tracking-tight">{activeBidsTotal}</span>
              <span className="text-xs font-semibold text-[#0F766E] bg-teal-50 px-1.5 py-0.5 rounded">
                B2B Buyers
              </span>
            </div>
            <span className="text-[11px] text-[#667085] block mt-0.5">Recorded clearing bids</span>
          </div>

          {/* Recovery Generated */}
          <div className="py-2 lg:py-0 lg:px-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
              Recovery generated
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-[#111827] font-mono tracking-tight">
                ₹{(totalRecoveryGen / 100000).toFixed(2)}L
              </span>
              <span className="text-xs font-semibold text-[#15803D] bg-emerald-50 px-1.5 py-0.5 rounded">
                +16.5% vs Est
              </span>
            </div>
            <span className="text-[11px] text-[#667085] block mt-0.5">Net market clearing value</span>
          </div>

          {/* Market Signals */}
          <div className="py-2 lg:py-0 lg:px-4 last:pr-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                Market signals
              </span>
              <span className="text-[10px] text-[#667085] italic font-mono">Demo dataset</span>
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-[#111827] font-mono tracking-tight">63</span>
              <span className="text-xs font-semibold text-[#15803D] bg-emerald-50 px-1.5 py-0.5 rounded">
                Telemetry
              </span>
            </div>
            <span className="text-[11px] text-[#667085] block mt-0.5">Price points fed back to engine</span>
          </div>
        </div>
      </div>

      {/* MAIN MARKETPLACE AREA */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#111827]">
            Recovery inventory
          </h3>
          <p className="text-xs text-[#667085]">
            Eligible returns with limited recovery through traditional dispositions.
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#667085] uppercase tracking-wider text-[11px] bg-[#F7F8FA]">
                <th className="py-3 px-3.5 font-semibold">Product</th>
                <th className="py-3 px-3.5 font-semibold">Condition</th>
                <th className="py-3 px-3.5 font-semibold text-right">Original Value</th>
                <th className="py-3 px-3.5 font-semibold text-right">Current Bid</th>
                <th className="py-3 px-3.5 font-semibold text-right">Bids</th>
                <th className="py-3 px-3.5 font-semibold text-right">SR Estimate</th>
                <th className="py-3 px-3.5 font-semibold text-right">Market Signal</th>
                <th className="py-3 px-3.5 font-semibold">Time Remaining</th>
                <th className="py-3 px-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]/60">
              {filteredItems.map((item) => {
                const signal = item.currentBid - item.secondRouteEstimate;
                const isPositive = signal >= 0;

                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-[#F7F8FA] cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-3.5">
                      <span className="font-bold text-[#111827] block truncate max-w-[180px] group-hover:text-[#0F766E]">
                        {item.productName}
                      </span>
                      <span className="text-[11px] font-mono text-[#667085]">
                        {item.id} · {item.returnId}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-[#111827]">
                      {item.condition} (Grade {item.grade})
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono text-[#667085]">
                      ₹{item.originalValue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono font-bold text-[#111827] text-sm">
                      ₹{item.currentBid.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono text-[#667085]">
                      {item.bidsCount} bids
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono text-[#667085]">
                      ₹{item.secondRouteEstimate.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono font-bold">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] ${
                        isPositive ? 'bg-emerald-50 text-[#15803D]' : 'bg-rose-50 text-[#B91C1C]'
                      }`}>
                        {isPositive ? '+' : ''}₹{signal.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 font-mono text-[#667085]">
                      <span className="inline-flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-[#667085]" />
                        {item.timeRemaining}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBidding(item);
                        }}
                        className="px-3 py-1.5 bg-[#0F766E] hover:bg-[#0D645E] text-white font-semibold rounded-xl text-[11px] transition-colors"
                      >
                        Inspect & Bid
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MARKET INTELLIGENCE SECTION */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#111827]">
              Market Intelligence
            </h3>
            <p className="text-xs text-[#667085]">
              Actual transaction prices help SecondRoute understand what returned products are worth in the Indian market.
            </p>
          </div>

          <span className="text-[11px] text-[#667085] italic font-mono">
            Illustrative market signals
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
              Observed market range
            </span>
            <span className="text-lg font-extrabold text-[#111827] font-mono mt-1 block">
              ₹16,500 – ₹19,200
            </span>
            <span className="text-[11px] text-[#667085] mt-0.5 block">Based on recent clearing bids</span>
          </div>

          <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
              Median clearing price
            </span>
            <span className="text-lg font-extrabold text-[#0F766E] font-mono mt-1 block">
              ₹18,400
            </span>
            <span className="text-[11px] text-[#667085] mt-0.5 block">Actual B2B buyer clearing price</span>
          </div>

          <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
              SecondRoute estimate
            </span>
            <span className="text-lg font-extrabold text-[#667085] font-mono mt-1 block">
              ₹15,800
            </span>
            <span className="text-[11px] text-[#15803D] font-bold mt-0.5 block">
              +16.5% market signal premium
            </span>
          </div>
        </div>
      </div>

      {/* THE DATA LOOP SECTION */}
      <div className="bg-[#111827] text-white rounded-2xl p-6 shadow-xs space-y-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
          Strategic Moat: Closed-Loop Intelligence
        </div>
        
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          MARKETPLACE → INTELLIGENCE → BETTER DECISIONS
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2 text-center text-xs">
          {[
            'Returned product',
            'Exchange transaction',
            'Actual market price',
            'Market intelligence',
            'Better recovery estimates',
            'Better disposition decisions'
          ].map((step, idx) => (
            <div key={idx} className="bg-slate-800/80 border border-slate-700/80 p-2.5 rounded-xl flex flex-col items-center justify-center">
              <span className="text-[10px] font-mono text-emerald-400 font-bold mb-1">0{idx + 1}</span>
              <span className="font-semibold text-slate-200 text-[11px]">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ITEM DETAIL DRAWER / SIDE PANEL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full border-l border-[#E5E7EB] p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                  Exchange Inventory Detail
                </span>
                <h3 className="text-lg font-extrabold text-[#111827] mt-0.5">
                  {selectedItem.productName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-[#667085] hover:text-[#111827] rounded-lg hover:bg-[#F7F8FA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Context Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F7F8FA] p-3.5 rounded-xl border border-[#E5E7EB]">
              <div>
                <span className="text-[#667085] block text-[11px]">Return ID</span>
                <span className="font-bold text-[#0F766E] font-mono">{selectedItem.returnId}</span>
              </div>
              <div>
                <span className="text-[#667085] block text-[11px]">Condition</span>
                <span className="font-semibold text-[#111827]">{selectedItem.condition} (Grade {selectedItem.grade})</span>
              </div>
              <div>
                <span className="text-[#667085] block text-[11px]">Original Value</span>
                <span className="font-semibold text-[#111827] font-mono">₹{selectedItem.originalValue.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[#667085] block text-[11px]">Intake Warehouse</span>
                <span className="font-semibold text-[#111827] truncate block">{selectedItem.warehouse}</span>
              </div>
            </div>

            {/* Why Exchange? Eligibility Banner */}
            <div className="bg-teal-50/70 border border-[#0F766E]/20 p-3.5 rounded-xl text-xs space-y-1">
              <span className="font-bold text-[#0F766E] block text-[11px] uppercase tracking-wide">
                Why Exchange Eligibility?
              </span>
              <p className="text-[#111827] leading-relaxed">
                "{selectedItem.whyExchange}"
              </p>
            </div>

            {/* VISUAL COMPARISON CARD */}
            <div className="bg-white border border-[#E5E7EB] p-4 rounded-2xl space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] block">
                Market Signal Comparison
              </span>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl">
                  <span className="text-[#667085] block text-[10px]">SECONDROUTE EST</span>
                  <span className="font-mono font-bold text-[#111827] text-sm mt-0.5 block">
                    ₹{selectedItem.secondRouteEstimate.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[#15803D] block text-[10px]">CURRENT BID</span>
                  <span className="font-mono font-extrabold text-[#15803D] text-sm mt-0.5 block">
                    ₹{selectedItem.currentBid.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-2.5 bg-[#0F766E]/10 border border-[#0F766E]/20 rounded-xl">
                  <span className="text-[#0F766E] block text-[10px]">MARKET PREMIUM</span>
                  <span className="font-mono font-extrabold text-[#0F766E] text-sm mt-0.5 block">
                    +₹{(selectedItem.currentBid - selectedItem.secondRouteEstimate).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-[#667085] pt-1">
                <span>Active Bidders: <strong>{selectedItem.bidsCount} B2B Buyers</strong></span>
                <span>Time Remaining: <strong className="font-mono text-[#111827]">{selectedItem.timeRemaining}</strong></span>
              </div>
            </div>

            {/* Place Bid Action */}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => handleOpenBidding(selectedItem)}
                className="w-full py-3 bg-[#0F766E] hover:bg-[#0D645E] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-2 shadow-2xs"
              >
                <Gavel className="w-4 h-4" />
                <span>Place bid (Min: ₹{(selectedItem.currentBid + 500).toLocaleString('en-IN')})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPACT BIDDING MODAL */}
      {isBiddingModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F7F8FA]">
              <div className="flex items-center space-x-2">
                <Gavel className="w-5 h-5 text-[#0F766E]" />
                <h3 className="text-sm font-bold text-[#111827]">
                  Place B2B Clearing Bid
                </h3>
              </div>
              <button
                onClick={() => setIsBiddingModalOpen(false)}
                className="text-[#667085] hover:text-[#111827]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmBid} className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#111827] block">{selectedItem.productName}</span>
                  <span className="text-[11px] text-[#667085]">Return #{selectedItem.returnId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#667085] block">Current Highest Bid</span>
                  <span className="font-mono font-bold text-[#15803D]">₹{selectedItem.currentBid.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">
                  Enter Your Bid Amount (₹):
                </label>
                <input
                  type="number"
                  step={100}
                  min={selectedItem.currentBid + 500}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm font-mono font-bold text-[#111827] focus:outline-none focus:border-[#0F766E]"
                />
                <span className="text-[11px] text-[#667085] block mt-1">
                  Minimum next bid increment: ₹{(selectedItem.currentBid + 500).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsBiddingModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#111827] font-semibold rounded-xl hover:bg-[#F7F8FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F766E] hover:bg-[#0D645E] text-white font-bold rounded-xl transition-colors flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm bid</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
