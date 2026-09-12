import React, { useState } from 'react';
import type { ReturnItem, ActiveTab } from '../../types';
import { Search, Bell, ChevronRight, Zap, Play } from 'lucide-react';

interface TopBarProps {
  activeTab: ActiveTab;
  selectedReturnId: string | null;
  returns: ReturnItem[];
  onSelectReturn: (returnId: string) => void;
  onNavigateToDecisions: () => void;
  isPitchDemoOpen: boolean;
  setIsPitchDemoOpen: (open: boolean) => void;
  pitchStep: number;
  onNextPitchStep: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  selectedReturnId,
  returns,
  onSelectReturn,
  onNavigateToDecisions,
  isPitchDemoOpen,
  setIsPitchDemoOpen,
  pitchStep,
  onNextPitchStep
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredReturns = searchQuery.trim()
    ? returns.filter(
        r =>
          r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getBreadcrumb = () => {
    if (selectedReturnId) {
      return (
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[#667085]">Returns</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#E5E7EB]" />
          <span className="font-semibold text-[#111827]">{selectedReturnId}</span>
        </div>
      );
    }
    switch (activeTab) {
      case 'overview':
        return <span className="font-bold text-[#111827] text-sm">Overview</span>;
      case 'returns':
        return <span className="font-bold text-[#111827] text-sm">Returns Directory</span>;
      case 'decisions':
        return <span className="font-bold text-[#111827] text-sm">Decisions Queue</span>;
      case 'analytics':
        return <span className="font-bold text-[#111827] text-sm">Analytics</span>;
    }
  };

  return (
    <header className="h-14 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Left Title / Breadcrumb */}
      <div className="flex items-center space-x-3">
        {getBreadcrumb()}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3.5">
        {/* Pitch Demo Mode - Unobtrusive Top Control */}
        <div className="flex items-center space-x-1.5 bg-[#F7F8FA] border border-[#E5E7EB] px-2.5 py-1 rounded-full text-xs font-medium text-[#111827]">
          <button
            onClick={() => setIsPitchDemoOpen(!isPitchDemoOpen)}
            className="flex items-center space-x-1 text-[#0F766E] font-semibold hover:opacity-80"
          >
            <Zap className="w-3.5 h-3.5 fill-[#0F766E]" />
            <span>Demo Mode</span>
          </button>
          
          {isPitchDemoOpen && (
            <div className="flex items-center space-x-1 pl-1.5 border-l border-[#E5E7EB]">
              <span className="text-[11px] text-[#667085]">Step {pitchStep}/7</span>
              <button
                onClick={onNextPitchStep}
                className="p-0.5 rounded bg-[#0F766E] text-white hover:bg-[#0D645E] transition-colors"
                title="Next Pitch Step"
              >
                <Play className="w-2.5 h-2.5 fill-white" />
              </button>
            </div>
          )}
        </div>

        {/* Global Search Input */}
        <div className="relative w-56">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search return ID, SKU..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl pl-8 pr-3 py-1 text-xs text-[#111827] focus:outline-none focus:border-[#0F766E] focus:bg-white transition-colors"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && filteredReturns.length > 0 && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-3 py-2 text-[10px] font-semibold text-[#667085] uppercase tracking-wider border-b border-[#E5E7EB]">
                Matching Returns ({filteredReturns.length})
              </div>
              <div className="max-h-52 overflow-y-auto">
                {filteredReturns.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectReturn(item.id);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2.5 hover:bg-[#F7F8FA] border-b border-[#E5E7EB]/50 last:border-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#0F766E]">{item.id}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-medium">
                        {item.recommendedDisposition}
                      </span>
                    </div>
                    <span className="text-xs text-[#111827] block truncate mt-0.5">
                      {item.productName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <button
          onClick={onNavigateToDecisions}
          className="relative p-1.5 text-[#667085] hover:text-[#111827] transition-colors rounded-lg hover:bg-[#F7F8FA]"
          title="14 returns require human review"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B45309] ring-2 ring-white" />
        </button>

        {/* User avatar */}
        <div className="w-7 h-7 rounded-full bg-[#111827] text-white text-xs font-semibold flex items-center justify-center">
          OP
        </div>
      </div>
    </header>
  );
};
