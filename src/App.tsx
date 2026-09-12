import { useState } from 'react';
import type { ActiveTab, ReturnItem, DispositionOption } from './types';
import { INITIAL_RETURNS } from './data/mockReturns';
import { AppShell } from './components/layout/AppShell';
import { HowItWorksModal } from './components/layout/HowItWorksModal';
import { OverrideModal } from './components/decision/OverrideModal';
import { EvaluateReturnModal } from './components/decision/EvaluateReturnModal';
import { Toast, type ToastMessage } from './components/common/Toast';

import { OverviewPage } from './pages/OverviewPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { ReturnDetailPage } from './pages/ReturnDetailPage';
import { DecisionsPage } from './pages/DecisionsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedReturnId, setSelectedReturnId] = useState<string | null>(null);
  const [returns, setReturns] = useState<ReturnItem[]>(INITIAL_RETURNS);
  
  // Modals & Overlay States
  const [overrideItem, setOverrideItem] = useState<ReturnItem | null>(null);
  const [isEvaluateModalOpen, setIsEvaluateModalOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  
  // Pitch Demo State
  const [isPitchDemoOpen, setIsPitchDemoOpen] = useState(true);
  const [pitchStep, setPitchStep] = useState(1);
  
  // Toast State
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (type: 'success' | 'warning' | 'info', title: string, description?: string) => {
    setToast({
      id: String(Date.now()),
      type,
      title,
      description
    });
  };

  // Reset Demo Data
  const handleResetDemoData = () => {
    setReturns(INITIAL_RETURNS);
    setSelectedReturnId(null);
    setActiveTab('overview');
    showToast('info', 'Demo State Reset', 'Restored illustrative demo dataset to initial state.');
  };

  const handleSelectReturn = (returnId: string) => {
    setSelectedReturnId(returnId);
  };

  const handleBackToReturns = () => {
    setSelectedReturnId(null);
  };

  // Accept Recommendation Action
  const handleAcceptRecommendation = (targetItem: ReturnItem) => {
    setReturns(prev =>
      prev.map(item => {
        if (item.id === targetItem.id) {
          const chosenDisp = item.humanOverride?.chosenDisposition || item.recommendedDisposition;
          return {
            ...item,
            status: 'Accepted',
            history: [
              ...item.history,
              {
                timestamp: 'Just now',
                action: `Operator Accepted Recommendation (${chosenDisp})`,
                actor: 'Ops Lead (You)'
              }
            ]
          };
        }
        return item;
      })
    );

    showToast(
      'success',
      'Recommendation Accepted',
      `Return #${targetItem.id} routed to ${targetItem.humanOverride?.chosenDisposition || targetItem.recommendedDisposition} queue.`
    );
  };

  // Override Recommendation Action
  const handleOpenOverrideModal = (item: ReturnItem) => {
    setOverrideItem(item);
  };

  const handleConfirmOverride = (
    targetItem: ReturnItem,
    chosenDisposition: DispositionOption,
    reason: string,
    notes?: string
  ) => {
    setReturns(prev =>
      prev.map(item => {
        if (item.id === targetItem.id) {
          const comp = item.comparisons.find(c => c.disposition === chosenDisposition);
          const newNet = comp ? comp.expectedNet : Math.round(item.resaleRecovery * 0.8);

          return {
            ...item,
            status: 'Overridden',
            expectedNetRecovery: newNet,
            humanOverride: {
              overriddenAt: 'Just now',
              overrideReason: reason,
              chosenDisposition,
              operatorNotes: notes
            },
            history: [
              ...item.history,
              {
                timestamp: 'Just now',
                action: `Operator Overrode System (${item.recommendedDisposition} → ${chosenDisposition})`,
                actor: 'Ops Lead (You)',
                details: `Reason: ${reason}`
              }
            ]
          };
        }
        return item;
      })
    );

    showToast(
      'warning',
      'Recommendation Overridden',
      `Return #${targetItem.id} changed to ${chosenDisposition}. Audit log updated.`
    );
  };

  const handleReturnEvaluated = (newItem: ReturnItem) => {
    setReturns(prev => [newItem, ...prev]);
    setSelectedReturnId(newItem.id);
    showToast(
      'success',
      'Return Evaluated & Added',
      `SecondRoute recommended ${newItem.recommendedDisposition} (${newItem.confidenceScore}% confidence).`
    );
  };

  // Execute Pitch Demo Step
  const handleNextPitchStep = () => {
    const nextStep = pitchStep >= 7 ? 1 : pitchStep + 1;
    setPitchStep(nextStep);
    switch (nextStep) {
      case 1:
        setSelectedReturnId(null);
        setActiveTab('overview');
        break;
      case 2:
        setActiveTab('returns');
        setSelectedReturnId('SR-1024');
        break;
      case 3:
        setActiveTab('returns');
        setSelectedReturnId('SR-1024');
        break;
      case 4:
        setActiveTab('returns');
        setSelectedReturnId('SR-1024');
        const sr1024 = returns.find(r => r.id === 'SR-1024');
        if (sr1024 && sr1024.status === 'Pending') {
          handleAcceptRecommendation(sr1024);
        }
        break;
      case 5:
        setSelectedReturnId(null);
        setActiveTab('decisions');
        break;
      case 6:
        setActiveTab('returns');
        setSelectedReturnId('SR-1021');
        break;
      case 7:
        setSelectedReturnId(null);
        setActiveTab('analytics');
        break;
    }
  };

  const selectedItem = selectedReturnId ? returns.find(r => r.id === selectedReturnId) || null : null;

  return (
    <>
      {/* Main App Layout Shell */}
      <AppShell
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedReturnId(null);
        }}
        selectedReturnId={selectedReturnId}
        returns={returns}
        onSelectReturn={handleSelectReturn}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        isPitchDemoOpen={isPitchDemoOpen}
        setIsPitchDemoOpen={setIsPitchDemoOpen}
        pitchStep={pitchStep}
        onNextPitchStep={handleNextPitchStep}
      >
        {/* Render Views conditionally */}
        {selectedReturnId ? (
          <ReturnDetailPage
            item={selectedItem}
            onBack={handleBackToReturns}
            onAccept={handleAcceptRecommendation}
            onOverride={handleOpenOverrideModal}
          />
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewPage
                returns={returns}
                onSelectReturn={handleSelectReturn}
                onNavigateToDecisions={() => setActiveTab('decisions')}
                onOpenEvaluateModal={() => setIsEvaluateModalOpen(true)}
              />
            )}

            {activeTab === 'returns' && (
              <ReturnsPage
                returns={returns}
                onSelectReturn={handleSelectReturn}
                onOpenEvaluateModal={() => setIsEvaluateModalOpen(true)}
                onResetDemoData={handleResetDemoData}
              />
            )}

            {activeTab === 'decisions' && (
              <DecisionsPage
                returns={returns}
                onSelectReturn={handleSelectReturn}
                onAccept={handleAcceptRecommendation}
                onOverride={handleOpenOverrideModal}
              />
            )}

            {activeTab === 'analytics' && <AnalyticsPage />}
          </>
        )}
      </AppShell>

      {/* Modals & Overlays */}
      <OverrideModal
        item={overrideItem}
        isOpen={Boolean(overrideItem)}
        onClose={() => setOverrideItem(null)}
        onConfirm={handleConfirmOverride}
      />

      <EvaluateReturnModal
        isOpen={isEvaluateModalOpen}
        onClose={() => setIsEvaluateModalOpen(false)}
        onReturnEvaluated={handleReturnEvaluated}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      {/* Operational Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

export default App;
