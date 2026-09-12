import type { ReturnItem, DispositionOption, ReturnCondition, ConditionGrade, DispositionComparison, DecisionFactor } from '../types';

export interface EvaluateInput {
  productName: string;
  category: string;
  originalValue: number;
  condition: ReturnCondition;
  grade: ConditionGrade;
  functionality: string;
  accessories: string;
  warehouse: string;
  returnReason: string;
  daysSincePurchase: number;
}

export function evaluateReturn(input: EvaluateInput): ReturnItem {
  const {
    productName,
    category,
    originalValue,
    condition,
    grade,
    warehouse,
    returnReason,
    daysSincePurchase
  } = input;

  const id = `SR-${Math.floor(1000 + Math.random() * 9000)}`;
  const sku = `${category.substring(0, 3).toUpperCase()}-${productName.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

  let recommendedDisposition: DispositionOption = 'Resell';
  let confidenceScore = 90;
  let refurbishCost = 0;
  let resaleRecovery = 0;
  let processingCost = Math.round(originalValue * 0.025);
  if (processingCost < 500) processingCost = 500;
  if (processingCost > 2000) processingCost = 2000;

  let rationale: [string, string, string] = [
    'Condition inspection matches high-demand secondary market criteria.',
    'Expected recovery exceeds alternative processing channels.',
    'Warehouse location has direct buyer channel dispatch available.'
  ];

  if (condition === 'Unopened') {
    recommendedDisposition = 'Resell';
    confidenceScore = 98;
    refurbishCost = 0;
    resaleRecovery = Math.round(originalValue * 0.90);
    rationale = [
      'Factory unopened unit allows direct re-stocking into primary sales channel.',
      'Zero refurbishment required; processing covers intake inspection.',
      'Achieves maximum value retention for the retailer.'
    ];
  } else if (condition === 'Open Box') {
    if (grade === 'A' || grade === 'B') {
      recommendedDisposition = 'Resell';
      confidenceScore = 94;
      refurbishCost = Math.round(originalValue * 0.05);
      resaleRecovery = Math.round(originalValue * 0.82);
      rationale = [
        'Open-box condition with full functionality and complete accessories.',
        'Direct resale channel delivers highest net recovery after processing.',
        'High demand for certified open-box electronics in regional hub.'
      ];
    } else {
      recommendedDisposition = 'Refurbish';
      confidenceScore = 88;
      refurbishCost = Math.round(originalValue * 0.10);
      resaleRecovery = Math.round(originalValue * 0.75);
      rationale = [
        'Minor cosmetic prep needed to restore unit to Grade-A resale status.',
        'Estimated refurbish spend yields positive net margin expansion.',
        'Certified pre-owned demand absorbs unit quickly.'
      ];
    }
  } else if (condition === 'Used - Minor Scratches') {
    recommendedDisposition = 'Refurbish';
    confidenceScore = 82;
    refurbishCost = Math.round(originalValue * 0.12);
    resaleRecovery = Math.round(originalValue * 0.70);
    rationale = [
      'Cosmetic refurbishing (re-skin/housing fix) unlocks 25%+ price bump.',
      'Net recovery of refurbishment channel beats as-is liquidation.',
      'Strong local market demand for certified refurbished stock.'
    ];
  } else if (condition === 'Hygiene Return - Opened') {
    recommendedDisposition = 'Donate';
    confidenceScore = 84;
    refurbishCost = Math.round(originalValue * 0.15);
    resaleRecovery = Math.round(originalValue * 0.35);
    rationale = [
      'Opened personal audio product requires intensive hygiene sanitization.',
      'CSR tax credit and brand protection surpass marginal resale recovery.',
      'Direct routing to accredited educational donation partner.'
    ];
  } else if (condition === 'Damaged Screen') {
    recommendedDisposition = 'Refurbish';
    confidenceScore = 91;
    refurbishCost = Math.round(originalValue * 0.18);
    resaleRecovery = Math.round(originalValue * 0.65);
    rationale = [
      'Core motherboard and electronics tested fully functional.',
      'OEM screen replacement expands net recovery by ₹8,000+ versus scrap.',
      'Regional repair partner hub guarantees 48h turnaround.'
    ];
  } else if (condition === 'Water Damage') {
    recommendedDisposition = 'Recycle';
    confidenceScore = 95;
    refurbishCost = Math.round(originalValue * 0.60);
    resaleRecovery = Math.round(originalValue * 0.15);
    rationale = [
      'Severe board-level liquid corrosion renders unit uneconomic to repair.',
      'E-waste metal scrap extraction recovers residual component value.',
      'Ensures compliance with Extended Producer Responsibility (EPR).'
    ];
  } else if (condition === 'Board Level Failure') {
    recommendedDisposition = 'Write-off';
    confidenceScore = 96;
    refurbishCost = Math.round(originalValue * 0.75);
    resaleRecovery = 0;
    rationale = [
      'SOC processor mainboard destruction confirmed by diagnostic.',
      'Repair cost exceeds total secondary market value of device.',
      'Approved for tax write-off and OEM salvage subrogation.'
    ];
  }

  // Calculate comparisons across all 6 disposition choices
  const comparisons: DispositionComparison[] = [
    {
      disposition: 'Resell',
      expectedRecovery: resaleRecovery,
      processingCost: processingCost,
      expectedNet: Math.max(0, resaleRecovery - processingCost),
      isRecommended: recommendedDisposition === 'Resell',
      notes: recommendedDisposition === 'Resell' ? 'Highest net recovery channel' : 'Lower net recovery than recommended'
    },
    {
      disposition: 'Refurbish',
      expectedRecovery: Math.round(resaleRecovery * 1.1),
      processingCost: processingCost + refurbishCost,
      expectedNet: Math.max(0, Math.round(resaleRecovery * 1.1) - (processingCost + refurbishCost)),
      isRecommended: recommendedDisposition === 'Refurbish',
      notes: recommendedDisposition === 'Refurbish' ? 'Refurbish spend unlocks maximum net margin' : 'Processing cost reduces net margin'
    },
    {
      disposition: 'Exchange',
      expectedRecovery: Math.round(originalValue * 0.50),
      processingCost: Math.round(processingCost * 1.2),
      expectedNet: Math.max(0, Math.round(originalValue * 0.50) - Math.round(processingCost * 1.2)),
      isRecommended: (recommendedDisposition as DispositionOption) === 'Exchange',
      notes: (recommendedDisposition as DispositionOption) === 'Exchange' ? 'Direct partner exchange channel' : 'Partner trade-in discount applies'
    },
    {
      disposition: 'Donate',
      expectedRecovery: recommendedDisposition === 'Donate' ? Math.round(originalValue * 0.25) : 0,
      processingCost: 600,
      expectedNet: recommendedDisposition === 'Donate' ? Math.round(originalValue * 0.25) - 600 : -600,
      isRecommended: recommendedDisposition === 'Donate',
      notes: recommendedDisposition === 'Donate' ? 'Includes CSR tax credit benefit' : 'CSR tax credit below economic threshold'
    },
    {
      disposition: 'Recycle',
      expectedRecovery: Math.round(originalValue * 0.08),
      processingCost: 400,
      expectedNet: Math.max(0, Math.round(originalValue * 0.08) - 400),
      isRecommended: recommendedDisposition === 'Recycle',
      notes: recommendedDisposition === 'Recycle' ? 'Component scrap value' : 'Value destruction for functional unit'
    },
    {
      disposition: 'Write-off',
      expectedRecovery: 0,
      processingCost: 0,
      expectedNet: 0,
      isRecommended: recommendedDisposition === 'Write-off',
      notes: recommendedDisposition === 'Write-off' ? 'Total loss write-off' : 'Total value loss'
    }
  ];

  const recommendedNet = comparisons.find(c => c.isRecommended)?.expectedNet || 0;

  const factors: DecisionFactor[] = [
    { name: 'Condition', impact: 'HIGH IMPACT', description: `Assessed as ${condition} (Grade ${grade}).` },
    { name: 'Product / SKU', impact: 'HIGH IMPACT', description: `Category ${category} with MSRP ₹${originalValue.toLocaleString('en-IN')}.` },
    { name: 'Location and demand', impact: 'MEDIUM IMPACT', description: `Warehouse hub: ${warehouse}.` },
    { name: 'Season / timing', impact: 'LOW IMPACT', description: `Returned ${daysSincePurchase} days after purchase.` },
    { name: 'Recovery cost', impact: 'HIGH IMPACT', description: `Estimated processing & prep cost: ₹${(processingCost + refurbishCost).toLocaleString('en-IN')}.` }
  ];

  return {
    id,
    sku,
    productName,
    category,
    originalValue,
    returnReason,
    condition,
    grade,
    functionality: input.functionality,
    accessories: input.accessories,
    warehouse,
    daysSincePurchase,
    refurbishCost,
    resaleRecovery,
    liquidationRecovery: Math.round(originalValue * 0.40),
    processingCost,
    recommendedDisposition,
    confidenceScore,
    expectedNetRecovery: recommendedNet,
    rationale,
    comparisons,
    factors,
    status: confidenceScore < 80 ? 'Review required' : 'Pending',
    decisionTimestamp: 'Just now',
    history: [
      { timestamp: 'Just now', action: 'Return Context Captured', actor: 'Ops Manual Intake' },
      { timestamp: 'Just now', action: `SecondRoute Recommended ${recommendedDisposition} (${confidenceScore}%)`, actor: 'Decision Engine' }
    ]
  };
}
