export type DispositionOption = 
  | 'Resell'
  | 'Refurbish'
  | 'Exchange'
  | 'Donate'
  | 'Recycle'
  | 'Write-off';

export type ConditionGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export type ReturnCondition = 
  | 'Unopened'
  | 'Open Box'
  | 'Used - Like New'
  | 'Used - Minor Scratches'
  | 'Damaged Screen'
  | 'Hygiene Return - Opened'
  | 'Water Damage'
  | 'Board Level Failure';

export type ReturnStatus = 
  | 'Pending'
  | 'Review required'
  | 'Accepted'
  | 'Overridden'
  | 'Routed'
  | 'Completed';

export interface DispositionComparison {
  disposition: DispositionOption;
  expectedRecovery: number;
  processingCost: number;
  expectedNet: number;
  isRecommended: boolean;
  notes?: string;
}

export interface DecisionFactor {
  name: string;
  impact: 'HIGH IMPACT' | 'MEDIUM IMPACT' | 'LOW IMPACT';
  description: string;
}

export interface AuditEvent {
  timestamp: string;
  action: string;
  actor: string;
  details?: string;
}

export interface ReturnItem {
  id: string; // e.g. "SR-1024"
  sku: string; // e.g. "APL-IP14-128"
  productName: string;
  category: string;
  originalValue: number; // in INR ₹
  returnReason: string;
  condition: ReturnCondition;
  grade: ConditionGrade;
  functionality: string;
  accessories: string;
  warehouse: string;
  daysSincePurchase: number;
  
  // Costs & Estimates
  refurbishCost: number;
  resaleRecovery: number;
  liquidationRecovery: number;
  processingCost: number;
  
  // SecondRoute Evaluation
  recommendedDisposition: DispositionOption;
  confidenceScore: number; // 0 - 100
  expectedNetRecovery: number;
  rationale: [string, string, string]; // 3 concise bullet reasons
  comparisons: DispositionComparison[];
  factors: DecisionFactor[];
  
  // State
  status: ReturnStatus;
  decisionTimestamp: string;
  
  // Human Override Data (if overridden)
  humanOverride?: {
    overriddenAt: string;
    overrideReason: string;
    chosenDisposition: DispositionOption;
    operatorNotes?: string;
  };
  
  // Outcome Data (if completed/routed)
  actualOutcome?: {
    actualDisposition: DispositionOption;
    actualRecovery: number;
    variance: number; // actualRecovery - expectedNetRecovery
    recordedAt: string;
  };

  history: AuditEvent[];
}

export interface ExchangeItem {
  id: string; // e.g. "EX-201"
  returnId: string; // e.g. "SR-1027"
  productName: string;
  category: string;
  originalValue: number;
  condition: ReturnCondition;
  grade: ConditionGrade;
  returnReason: string;
  warehouse: string;
  daysSincePurchase: number;
  currentBid: number;
  bidsCount: number;
  secondRouteEstimate: number;
  timeRemaining: string;
  status: 'Active' | 'Ending Soon' | 'Completed';
  whyExchange: string;
}

export type ActiveTab = 'overview' | 'returns' | 'decisions' | 'exchange' | 'analytics';
