import React from 'react';
import type { ActiveTab } from '../../types';
import { LayoutDashboard, RotateCcw, GitBranch, ArrowUpRight, BarChart3, HelpCircle, Building2, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenHowItWorks: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenHowItWorks,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
    { id: 'decisions', label: 'Decisions', icon: GitBranch },
    { id: 'exchange', label: 'Exchange', icon: ArrowUpRight },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <aside className="w-[220px] bg-white border-r border-[#E5E7EB] flex flex-col justify-between shrink-0 h-screen select-none z-20">
      {/* Top Section */}
      <div>
        {/* SecondRoute Wordmark */}
        <div className="px-5 py-4 border-b border-[#E5E7EB]/70 flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#0F766E] flex items-center justify-center text-white">
            <GitBranch className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-[#111827] font-mono">
              SecondRoute
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
            Decision Layer
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0F766E]/10 text-[#0F766E] font-semibold'
                    : 'text-[#667085] hover:bg-[#F7F8FA] hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0F766E]' : 'text-[#667085]'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Workspace Section */}
        <div className="px-3 pt-3 mt-2 border-t border-[#E5E7EB]/70">
          <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
            Workspace
          </div>
          <div className="p-2.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center space-x-2.5 mt-1">
            <div className="w-6 h-6 rounded-md bg-white border border-[#E5E7EB] flex items-center justify-center text-[#667085]">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <span className="block text-xs font-semibold text-[#111827] truncate">
                ElectroHub Retail
              </span>
              <span className="block text-[10px] text-[#667085]">
                Electronics Demo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-[#E5E7EB] space-y-1">
        <button
          onClick={onOpenHowItWorks}
          className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#667085] hover:bg-[#F7F8FA] hover:text-[#111827] transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>How It Works</span>
        </button>

        <button
          className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#667085] hover:bg-[#F7F8FA] hover:text-[#111827] transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>

        <div className="pt-2 mt-1 border-t border-[#E5E7EB]/70 flex items-center space-x-2.5 px-3 py-2">
          <div className="w-6 h-6 rounded-full bg-[#111827] text-white text-[11px] font-semibold flex items-center justify-center">
            OP
          </div>
          <div className="truncate text-left">
            <span className="block text-xs font-semibold text-[#111827]">Ops Lead</span>
            <span className="block text-[10px] text-[#667085]">Delhi Hub</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
