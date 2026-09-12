import React from 'react';
import type { ActiveTab, ReturnItem } from '../../types';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface AppShellProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedReturnId: string | null;
  returns: ReturnItem[];
  onSelectReturn: (returnId: string) => void;
  onOpenHowItWorks: () => void;
  isPitchDemoOpen: boolean;
  setIsPitchDemoOpen: (open: boolean) => void;
  pitchStep: number;
  onNextPitchStep: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  setActiveTab,
  selectedReturnId,
  returns,
  onSelectReturn,
  onOpenHowItWorks,
  isPitchDemoOpen,
  setIsPitchDemoOpen,
  pitchStep,
  onNextPitchStep,
  children
}) => {
  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden bg-[#F7F8FA] text-[#111827] font-sans antialiased">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHowItWorks={onOpenHowItWorks}
      />

      {/* Main View Container */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        <TopBar
          activeTab={activeTab}
          selectedReturnId={selectedReturnId}
          returns={returns}
          onSelectReturn={onSelectReturn}
          onNavigateToDecisions={() => setActiveTab('decisions')}
          isPitchDemoOpen={isPitchDemoOpen}
          setIsPitchDemoOpen={setIsPitchDemoOpen}
          pitchStep={pitchStep}
          onNextPitchStep={onNextPitchStep}
        />

        {/* Scrollable Main Workspace */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
