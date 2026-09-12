import type { ReturnItem } from '../types';

export const INITIAL_RETURNS: ReturnItem[] = [
  {
    id: 'SR-1024',
    sku: 'APL-IP14-128-BLU',
    productName: 'Apple iPhone 14 128GB (Blue)',
    category: 'Smartphones',
    originalValue: 52999,
    returnReason: 'Customer changed mind',
    condition: 'Open Box',
    grade: 'B',
    functionality: 'Fully functional',
    accessories: 'Complete with lightning cable & box',
    warehouse: 'Delhi NCR Fulfillment Center',
    daysSincePurchase: 8,
    refurbishCost: 3800,
    resaleRecovery: 43500,
    liquidationRecovery: 25000,
    processingCost: 1200,
    recommendedDisposition: 'Resell',
    confidenceScore: 94,
    expectedNetRecovery: 42300,
    status: 'Pending',
    decisionTimestamp: 'Today, 10:42 AM',
    rationale: [
      'Open-box condition with 100% component functionality and complete original packaging.',
      'Expected resale recovery (₹43,500 - ₹1,200) exceeds alternative channel net recoveries by ₹3,100+.',
      'Strong regional demand in North India for pristine Grade-B iPhone 14 stock with immediate dispatch.'
    ],
    comparisons: [
      { disposition: 'Resell', expectedRecovery: 43500, processingCost: 1200, expectedNet: 42300, isRecommended: true, notes: 'Highest net recovery channel' },
      { disposition: 'Refurbish', expectedRecovery: 45000, processingCost: 5800, expectedNet: 39200, isRecommended: false, notes: 'Unnecessary refurb cost reduces net yield' },
      { disposition: 'Exchange', expectedRecovery: 38000, processingCost: 2500, expectedNet: 35500, isRecommended: false, notes: 'Buffer cost reduces profitability' },
      { disposition: 'Donate', expectedRecovery: 0, processingCost: 700, expectedNet: -700, isRecommended: false, notes: 'CSR tax offset below economic threshold' },
      { disposition: 'Recycle', expectedRecovery: 2000, processingCost: 500, expectedNet: 1500, isRecommended: false, notes: 'Value destruction for functional device' },
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: false, notes: 'Total loss' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Pristine open-box condition minimizes required prep work.' },
      { name: 'Product / SKU', impact: 'HIGH IMPACT', description: 'High resale demand & low depreciation rate for active iPhone models.' },
      { name: 'Location and demand', impact: 'MEDIUM IMPACT', description: 'Delhi NCR hub has high local certified pre-owned buyer pool.' },
      { name: 'Season / timing', impact: 'LOW IMPACT', description: 'Returned 8 days post-purchase, well within high-resale window.' },
      { name: 'Recovery cost', impact: 'HIGH IMPACT', description: 'Low processing overhead (₹1,200) protects high margin.' }
    ],
    history: [
      { timestamp: 'Today, 10:30 AM', action: 'Return Received', actor: 'Delhi WH Receiving' },
      { timestamp: 'Today, 10:38 AM', action: 'Condition Inspection Recorded', actor: 'Inspector #402' },
      { timestamp: 'Today, 10:42 AM', action: 'SecondRoute Evaluated Options', actor: 'Decision Engine v2.4' }
    ]
  },
  {
    id: 'SR-1021',
    sku: 'SNY-WH1000XM5-BLK',
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Audio',
    originalValue: 29990,
    returnReason: 'Defective audio left earbud',
    condition: 'Used - Minor Scratches',
    grade: 'C',
    functionality: 'Intermittent audio drop on left driver',
    accessories: 'Carrying case included, missing 3.5mm cable',
    warehouse: 'Mumbai Logistics Hub',
    daysSincePurchase: 18,
    refurbishCost: 4500,
    resaleRecovery: 21400,
    liquidationRecovery: 12000,
    processingCost: 900,
    recommendedDisposition: 'Resell',
    confidenceScore: 68,
    expectedNetRecovery: 20500,
    status: 'Review required',
    decisionTimestamp: 'Today, 09:15 AM',
    rationale: [
      'Algorithm flagged driver repair uncertainty: reported intermittent fault may require component replacement.',
      'Resale model assumes quick audio re-calibration, but refurb cost variance could reduce net yield.',
      'Human inspector review required to confirm driver status before committing to Resell vs Refurbish.'
    ],
    comparisons: [
      { disposition: 'Resell', expectedRecovery: 21400, processingCost: 900, expectedNet: 20500, isRecommended: true, notes: 'Assumes minor recalibration' },
      { disposition: 'Refurbish', expectedRecovery: 23500, processingCost: 5400, expectedNet: 18100, isRecommended: false, notes: 'Driver swap guarantees Grade A resale' },
      { disposition: 'Exchange', expectedRecovery: 17000, processingCost: 1500, expectedNet: 15500, isRecommended: false, notes: 'B2B audio vendor trade-in' },
      { disposition: 'Donate', expectedRecovery: 0, processingCost: 600, expectedNet: -600, isRecommended: false, notes: 'Not suitable for donation with audio defect' },
      { disposition: 'Recycle', expectedRecovery: 1200, processingCost: 400, expectedNet: 800, isRecommended: false, notes: 'Component scrap value' },
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: false, notes: 'Full loss' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Grade C with active intermittent hardware defect.' },
      { name: 'Product / SKU', impact: 'MEDIUM IMPACT', description: 'Flagship audio model maintains 65%+ value retention.' },
      { name: 'Location and demand', impact: 'MEDIUM IMPACT', description: 'Mumbai tech hub has accredited audio service facility.' },
      { name: 'Season / timing', impact: 'LOW IMPACT', description: 'Returned within 30 days.' },
      { name: 'Recovery cost', impact: 'HIGH IMPACT', description: 'Potential ₹4,500 refurb cost creates decision ambiguity.' }
    ],
    history: [
      { timestamp: 'Today, 08:50 AM', action: 'Return Received', actor: 'Mumbai WH Receiving' },
      { timestamp: 'Today, 09:05 AM', action: 'Condition Inspection Recorded', actor: 'Inspector #108' },
      { timestamp: 'Today, 09:15 AM', action: 'SecondRoute Flagged Low Confidence (68%)', actor: 'Decision Engine v2.4' }
    ]
  },
  {
    id: 'SR-1023',
    sku: 'APL-APP2-WHT',
    productName: 'Apple AirPods Pro (2nd Gen)',
    category: 'Audio',
    originalValue: 24900,
    returnReason: 'Ergonomic ear tip fit issue',
    condition: 'Open Box',
    grade: 'B',
    functionality: '100% Functional',
    accessories: 'Complete with MagSafe Case & all tip sizes',
    warehouse: 'Bengaluru Fulfillment Center',
    daysSincePurchase: 5,
    refurbishCost: 1200,
    resaleRecovery: 18900,
    liquidationRecovery: 11000,
    processingCost: 800,
    recommendedDisposition: 'Refurbish',
    confidenceScore: 89,
    expectedNetRecovery: 16900,
    status: 'Accepted',
    decisionTimestamp: 'Yesterday, 04:30 PM',
    rationale: [
      'Hygiene protocol requires ear-tip replacement & UV sanitization cycle (cost: ₹1,200).',
      'Post-sanitization certification elevates return to Grade-A Certified Pre-Owned status.',
      'Net recovery of ₹16,900 yields 68% value retention versus ₹10,200 as-is liquidation.'
    ],
    comparisons: [
      { disposition: 'Refurbish', expectedRecovery: 18900, processingCost: 2000, expectedNet: 16900, isRecommended: true, notes: 'Includes sanitization & new tips' },
      { disposition: 'Resell', expectedRecovery: 14000, processingCost: 800, expectedNet: 13200, isRecommended: false, notes: 'Unsanitized open box markdown' },
      { disposition: 'Exchange', expectedRecovery: 12500, processingCost: 1000, expectedNet: 11500, isRecommended: false, notes: 'Vendor return markdown' },
      { disposition: 'Donate', expectedRecovery: 0, processingCost: 500, expectedNet: -500, isRecommended: false, notes: 'Not applicable' },
      { disposition: 'Recycle', expectedRecovery: 800, processingCost: 300, expectedNet: 500, isRecommended: false, notes: 'E-waste scrap' },
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: false, notes: 'Full loss' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Requires mandatory hygiene protocol before resale.' },
      { name: 'Product / SKU', impact: 'HIGH IMPACT', description: 'AirPods Pro maintain rapid inventory turnover in India.' },
      { name: 'Location and demand', impact: 'HIGH IMPACT', description: 'Bengaluru hub has in-house UV sanitization line.' },
      { name: 'Season / timing', impact: 'LOW IMPACT', description: '5 days old device.' },
      { name: 'Recovery cost', impact: 'MEDIUM IMPACT', description: 'Sanitization overhead of ₹1,200 yields ₹3,700 net lift.' }
    ],
    history: [
      { timestamp: 'Yesterday, 03:10 PM', action: 'Return Received', actor: 'Bengaluru WH' },
      { timestamp: 'Yesterday, 04:30 PM', action: 'SecondRoute Recommended Refurbish', actor: 'Decision Engine' },
      { timestamp: 'Yesterday, 05:12 PM', action: 'Operator Accepted Recommendation', actor: 'Ops Lead (R. Sharma)' }
    ]
  },
  {
    id: 'SR-1022',
    sku: 'SAM-S23-256-BLK',
    productName: 'Samsung Galaxy S23 256GB',
    category: 'Smartphones',
    originalValue: 64999,
    returnReason: 'Cracked outer glass screen on drop',
    condition: 'Damaged Screen',
    grade: 'C',
    functionality: 'Motherboard and cameras 100% functional, touch digitizer intact',
    accessories: 'Handset & box only',
    warehouse: 'Delhi NCR Fulfillment Center',
    daysSincePurchase: 22,
    refurbishCost: 8500,
    resaleRecovery: 38000,
    liquidationRecovery: 18200,
    processingCost: 1300,
    recommendedDisposition: 'Refurbish',
    confidenceScore: 91,
    expectedNetRecovery: 28200,
    status: 'Accepted',
    decisionTimestamp: 'Yesterday, 02:15 PM',
    rationale: [
      'High internal component value: motherboard, camera array, and battery tested healthy.',
      'Authorized OEM glass panel replacement (₹8,500) restores unit to ₹38,000 Grade-A resale price.',
      'Net recovery of ₹28,200 beats as-is liquidation (₹18,200) by ₹10,000 net margin.'
    ],
    comparisons: [
      { disposition: 'Refurbish', expectedRecovery: 38000, processingCost: 9800, expectedNet: 28200, isRecommended: true, notes: 'Glass replacement yields ₹10k extra net' },
      { disposition: 'Resell', expectedRecovery: 19500, processingCost: 1300, expectedNet: 18200, isRecommended: false, notes: 'As-is cracked screen sale' },
      { disposition: 'Exchange', expectedRecovery: 16000, processingCost: 1200, expectedNet: 14800, isRecommended: false, notes: 'Part exchange channel' },
      { disposition: 'Donate', expectedRecovery: 0, processingCost: 800, expectedNet: -800, isRecommended: false, notes: 'Damaged electronics not donated' },
      { disposition: 'Recycle', expectedRecovery: 3500, processingCost: 600, expectedNet: 2900, isRecommended: false, notes: 'E-waste component recovery' },
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: false, notes: 'Full write off' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Cosmetic glass crack with fully functional core electronics.' },
      { name: 'Product / SKU', impact: 'HIGH IMPACT', description: 'Galaxy S23 refurbished demand is strong across tier-1 cities.' },
      { name: 'Location and demand', impact: 'MEDIUM IMPACT', description: 'OEM repair partner operating within Delhi NCR hub.' },
      { name: 'Season / timing', impact: 'LOW IMPACT', description: '22 days since initial sale.' },
      { name: 'Recovery cost', impact: 'HIGH IMPACT', description: '₹8,500 panel replacement cost justified by ₹19,500 gross price bump.' }
    ],
    history: [
      { timestamp: 'Yesterday, 01:00 PM', action: 'Return Received', actor: 'Delhi WH Receiving' },
      { timestamp: 'Yesterday, 02:15 PM', action: 'SecondRoute Recommended Refurbish', actor: 'Decision Engine' },
      { timestamp: 'Yesterday, 03:00 PM', action: 'Operator Accepted Recommendation', actor: 'Ops Lead (R. Sharma)' }
    ]
  },
  {
    id: 'SR-1025',
    sku: 'DLL-XPS13-I7',
    productName: 'Dell XPS 13 Laptop (Intel i7, 16GB RAM)',
    category: 'Laptops',
    originalValue: 115000,
    returnReason: 'Wrong specification ordered',
    condition: 'Unopened',
    grade: 'A',
    functionality: 'Factory Sealed',
    accessories: 'Factory Sealed in original box',
    warehouse: 'Hyderabad Logistics Hub',
    daysSincePurchase: 3,
    refurbishCost: 0,
    resaleRecovery: 102000,
    liquidationRecovery: 75000,
    processingCost: 1500,
    recommendedDisposition: 'Resell',
    confidenceScore: 98,
    expectedNetRecovery: 100500,
    status: 'Routed',
    decisionTimestamp: 'Yesterday, 11:00 AM',
    rationale: [
      'Factory-sealed box with active OEM warranty allows direct return to primary retail inventory.',
      'Zero refurbishment required; processing fee covers intake inspection & re-labeling.',
      'Achieves 87.4% net recovery of original sale value.'
    ],
    comparisons: [
      { disposition: 'Resell', expectedRecovery: 102000, processingCost: 1500, expectedNet: 100500, isRecommended: true, notes: 'Restock to primary inventory' },
      { disposition: 'Refurbish', expectedRecovery: 102000, processingCost: 4500, expectedNet: 97500, isRecommended: false, notes: 'Unnecessary testing cost' },
      { disposition: 'Exchange', expectedRecovery: 90000, processingCost: 2000, expectedNet: 88000, isRecommended: false, notes: 'Distributor return fee apply' },
      { disposition: 'Donate', expectedRecovery: 0, processingCost: 1000, expectedNet: -1000, isRecommended: false, notes: 'Unnecessary loss' },
      { disposition: 'Recycle', expectedRecovery: 5000, processingCost: 1000, expectedNet: 4000, isRecommended: false, notes: 'N/A' },
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: false, notes: 'N/A' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Factory sealed unopened unit.' },
      { name: 'Product / SKU', impact: 'HIGH IMPACT', description: 'High value premium laptop with high demand velocity.' },
      { name: 'Location and demand', impact: 'HIGH IMPACT', description: 'Hyderabad hub direct dispatch to enterprise buyers.' },
      { name: 'Season / timing', impact: 'LOW IMPACT', description: 'Returned 3 days after delivery.' },
      { name: 'Recovery cost', impact: 'HIGH IMPACT', description: 'Minimal processing fee (₹1,500).' }
    ],
    history: [
      { timestamp: 'Yesterday, 10:15 AM', action: 'Return Received', actor: 'Hyderabad WH' },
      { timestamp: 'Yesterday, 11:00 AM', action: 'SecondRoute Recommended Resell (98%)', actor: 'Decision Engine' },
      { timestamp: 'Yesterday, 11:30 AM', action: 'Item Routed to Primary Retail Warehouse', actor: 'System Auto-Route' }
    ]
  },
  {
    id: 'SR-1026',
    sku: 'NTD-SWT-OLED',
    productName: 'Nintendo Switch OLED Model',
    category: 'Gaming',
    originalValue: 31999,
    returnReason: 'Unwanted gift',
    condition: 'Open Box',
    grade: 'B',
    functionality: '100% Functional',
    accessories: 'Complete with Dock, Joy-Cons & HDMI',
    warehouse: 'Chennai Logistics Hub',
    daysSincePurchase: 12,
    refurbishCost: 800,
    resaleRecovery: 26500,
    liquidationRecovery: 18000,
    processingCost: 1000,
    recommendedDisposition: 'Exchange',
    confidenceScore: 92,
    expectedNetRecovery: 24700,
    status: 'Completed',
    decisionTimestamp: '3 days ago',
    actualOutcome: {
      actualDisposition: 'Exchange',
      actualRecovery: 24900,
      variance: 200,
      recordedAt: '2 days ago'
    },
    rationale: [
      'Strategic exchange partnership with game retail network guarantees high buyback rate.',
      'Avoids consumer e-commerce return processing and platform commission fees.',
      'Recorded actual recovery exceeded estimated projection by +₹200.'
    ],
    comparisons: [
      { disposition: 'Exchange', expectedRecovery: 25700, processingCost: 1000, expectedNet: 24700, isRecommended: true, notes: 'Direct retailer swap channel' },
      { disposition: 'Resell', expectedRecovery: 26500, processingCost: 2200, expectedNet: 24300, isRecommended: false, notes: 'Platform fees reduce net yield' },
      { disposition: 'Refurbish', expectedRecovery: 26500, processingCost: 3000, expectedNet: 23500, isRecommended: false, notes: 'Over-processing' },
      { disposition: 'Donate', expectedRecovery: 0, processingCost: 600, expectedNet: -600, isRecommended: false, notes: 'N/A' },
      { disposition: 'Recycle', expectedRecovery: 1500, processingCost: 400, expectedNet: 1100, isRecommended: false, notes: 'N/A' },
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: false, notes: 'N/A' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Clean open box console.' },
      { name: 'Product / SKU', impact: 'HIGH IMPACT', description: 'Strong secondary market for gaming consoles.' },
      { name: 'Location and demand', impact: 'HIGH IMPACT', description: 'Partner retailer warehouse adjacent to Chennai hub.' },
      { name: 'Season / timing', impact: 'MEDIUM IMPACT', description: 'Peak gaming season inventory clearance.' },
      { name: 'Recovery cost', impact: 'MEDIUM IMPACT', description: 'B2B exchange cuts individual packaging overhead.' }
    ],
    history: [
      { timestamp: '3 days ago', action: 'SecondRoute Recommended Exchange', actor: 'Decision Engine' },
      { timestamp: '3 days ago', action: 'Operator Accepted & Shipped to Partner', actor: 'Chennai Ops' },
      { timestamp: '2 days ago', action: 'Outcome Captured: ₹24,900 Recovers', actor: 'Finance Feed' }
    ]
  },
  {
    id: 'SR-1027',
    sku: 'JBL-CHG5-BLK',
    productName: 'JBL Charge 5 Portable Bluetooth Speaker',
    category: 'Audio',
    originalValue: 14999,
    returnReason: 'Water damage / Non-functional',
    condition: 'Water Damage',
    grade: 'D',
    functionality: 'Corroded PCB, battery short circuit',
    accessories: 'Speaker only, damaged box',
    warehouse: 'Kolkata Fulfillment Center',
    daysSincePurchase: 25,
    refurbishCost: 9000,
    resaleRecovery: 2500,
    liquidationRecovery: 1000,
    processingCost: 400,
    recommendedDisposition: 'Recycle',
    confidenceScore: 95,
    expectedNetRecovery: 800,
    status: 'Pending',
    decisionTimestamp: 'Today, 11:10 AM',
    rationale: [
      'Severe saltwater liquid damage renders PCB board non-repairable (repair cost ₹9,000 > resale value ₹4,000).',
      'Certified e-waste partner extracts copper coil and lithium cell battery safely.',
      'Prevents hazardous landfill contamination while recovering ₹800 net metal scrap value.'
    ],
    comparisons: [
      { disposition: 'Recycle', expectedRecovery: 1200, processingCost: 400, expectedNet: 800, isRecommended: true, notes: 'E-waste metal extraction' },
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: false, notes: 'Landfill disposal (violates EPR)' },
      { disposition: 'Donate', expectedRecovery: 0, processingCost: 500, expectedNet: -500, isRecommended: false, notes: 'Non-functional unit cannot be donated' },
      { disposition: 'Refurbish', expectedRecovery: 4000, processingCost: 9400, expectedNet: -5400, isRecommended: false, notes: 'Uneconomic board replacement' },
      { disposition: 'Resell', expectedRecovery: 1000, processingCost: 600, expectedNet: 400, isRecommended: false, notes: 'As-is scrap sale' },
      { disposition: 'Exchange', expectedRecovery: 0, processingCost: 400, expectedNet: -400, isRecommended: false, notes: 'Vendor rejects water damage' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Corroded electronics, non-repairable.' },
      { name: 'Product / SKU', impact: 'MEDIUM IMPACT', description: 'High lithium battery content requires EPR certified recycling.' },
      { name: 'Location and demand', impact: 'MEDIUM IMPACT', description: 'Kolkata hub partnered with Attero E-Waste.' },
      { name: 'Season / timing', impact: 'LOW IMPACT', description: 'N/A' },
      { name: 'Recovery cost', impact: 'HIGH IMPACT', description: 'Avoids negative margin refurbishment.' }
    ],
    history: [
      { timestamp: 'Today, 10:00 AM', action: 'Return Received', actor: 'Kolkata WH' },
      { timestamp: 'Today, 11:10 AM', action: 'SecondRoute Recommended Recycle (95%)', actor: 'Decision Engine' }
    ]
  },
  {
    id: 'SR-1028',
    sku: 'SAM-BUDS2P-GRAPH',
    productName: 'Samsung Galaxy Buds2 Pro',
    category: 'Audio',
    originalValue: 12999,
    returnReason: 'Uncomfortable ear fit',
    condition: 'Hygiene Return - Opened',
    grade: 'C',
    functionality: '100% Functional',
    accessories: 'Case & buds complete',
    warehouse: 'Delhi NCR Fulfillment Center',
    daysSincePurchase: 14,
    refurbishCost: 1500,
    resaleRecovery: 4800,
    liquidationRecovery: 2500,
    processingCost: 500,
    recommendedDisposition: 'Donate',
    confidenceScore: 84,
    expectedNetRecovery: 2800,
    status: 'Pending',
    decisionTimestamp: 'Today, 08:30 AM',
    rationale: [
      'Secondary market price for opened in-ear buds is low due to consumer hygiene aversion.',
      'Donation to vocational educational trust yields CSR compliance credit + tax offset (valued at ₹2,800 net benefit).',
      'Avoids brand dilution of heavily discounted C-grade open-ear inventory.'
    ],
    comparisons: [
      { disposition: 'Donate', expectedRecovery: 3300, processingCost: 500, expectedNet: 2800, isRecommended: true, notes: 'Includes CSR tax credit benefit' },
      { disposition: 'Refurbish', expectedRecovery: 4800, processingCost: 2200, expectedNet: 2600, isRecommended: false, notes: 'High hygiene prep cost dilutes net yield' },
      { disposition: 'Resell', expectedRecovery: 3000, processingCost: 800, expectedNet: 2200, isRecommended: false, notes: 'Heavy open-box discount' },
      { disposition: 'Exchange', expectedRecovery: 2000, processingCost: 500, expectedNet: 1500, isRecommended: false, notes: 'N/A' },
      { disposition: 'Recycle', expectedRecovery: 500, processingCost: 300, expectedNet: 200, isRecommended: false, notes: 'N/A' },
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: false, notes: 'N/A' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Hygiene category requires certified sanitization.' },
      { name: 'Product / SKU', impact: 'MEDIUM IMPACT', description: 'Audio accessories lose high resale value when opened.' },
      { name: 'Location and demand', impact: 'MEDIUM IMPACT', description: 'Delhi NGO partner network ready for tech donations.' },
      { name: 'Season / timing', impact: 'LOW IMPACT', description: '14 days old.' },
      { name: 'Recovery cost', impact: 'HIGH IMPACT', description: 'CSR tax credit exceeds marginal B2C resale profit.' }
    ],
    history: [
      { timestamp: 'Today, 07:45 AM', action: 'Return Received', actor: 'Delhi WH' },
      { timestamp: 'Today, 08:30 AM', action: 'SecondRoute Recommended Donate (84%)', actor: 'Decision Engine' }
    ]
  },
  {
    id: 'SR-1029',
    sku: 'APL-MBA-M2-SLV',
    productName: 'Apple MacBook Air M2 256GB',
    category: 'Laptops',
    originalValue: 99900,
    returnReason: 'Severe electrical surge damage during thunderstorm',
    condition: 'Board Level Failure',
    grade: 'F',
    functionality: 'Total mainboard destruction, screen glass cracked, chassis warped',
    accessories: 'MagSafe Cable & Power Adapter intact',
    warehouse: 'Mumbai Logistics Hub',
    daysSincePurchase: 29,
    refurbishCost: 75000,
    resaleRecovery: 12000,
    liquidationRecovery: 5000,
    processingCost: 1200,
    recommendedDisposition: 'Write-off',
    confidenceScore: 96,
    expectedNetRecovery: 0,
    status: 'Accepted',
    decisionTimestamp: '2 days ago',
    rationale: [
      'Comprehensive component diagnostic confirmed unrecoverable SOC processor & SSD destruction.',
      'Refurbishment cost (₹75,000) exceeds secondary market valuation (₹45,000).',
      'Write-off approved for insurance subrogation claim with OEM salvage handling.'
    ],
    comparisons: [
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: true, notes: 'Full insurance tax deduction claim' },
      { disposition: 'Recycle', expectedRecovery: 2500, processingCost: 3000, expectedNet: -500, isRecommended: false, notes: 'Handling cost exceeds metal value' },
      { disposition: 'Donate', expectedRecovery: 0, processingCost: 1000, expectedNet: -1000, isRecommended: false, notes: 'Non-functional laptop' },
      { disposition: 'Refurbish', expectedRecovery: 45000, processingCost: 76200, expectedNet: -31200, isRecommended: false, notes: 'Severe economic loss' },
      { disposition: 'Resell', expectedRecovery: 5000, processingCost: 1200, expectedNet: 3800, isRecommended: false, notes: 'As-is junk auction' },
      { disposition: 'Exchange', expectedRecovery: 0, processingCost: 800, expectedNet: -800, isRecommended: false, notes: 'Rejected by vendor' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Total electrical mainboard destruction.' },
      { name: 'Product / SKU', impact: 'HIGH IMPACT', description: 'M2 SOC chips non-replaceable individually.' },
      { name: 'Location and demand', impact: 'LOW IMPACT', description: 'N/A' },
      { name: 'Season / timing', impact: 'LOW IMPACT', description: '29 days old.' },
      { name: 'Recovery cost', impact: 'HIGH IMPACT', description: 'Repair cost creates ₹31,200 negative balance.' }
    ],
    history: [
      { timestamp: '2 days ago', action: 'Return Diagnostic Completed', actor: 'Tech Inspector #204' },
      { timestamp: '2 days ago', action: 'SecondRoute Recommended Write-off (96%)', actor: 'Decision Engine' },
      { timestamp: '2 days ago', action: 'Finance Approved Insurance Claim', actor: 'Ops Manager' }
    ]
  },
  {
    id: 'SR-1030',
    sku: 'GGL-PX8-128-HZL',
    productName: 'Google Pixel 8 128GB (Hazel)',
    category: 'Smartphones',
    originalValue: 75999,
    returnReason: 'Customer upgraded to Pixel 8 Pro',
    condition: 'Used - Minor Scratches',
    grade: 'C',
    functionality: 'Fully functional, minor bezel scratch',
    accessories: 'Box & USB-C adapter included',
    warehouse: 'Bengaluru Fulfillment Center',
    daysSincePurchase: 10,
    refurbishCost: 3500,
    resaleRecovery: 52000,
    liquidationRecovery: 32000,
    processingCost: 1100,
    recommendedDisposition: 'Refurbish',
    confidenceScore: 78,
    expectedNetRecovery: 47400,
    status: 'Review required',
    decisionTimestamp: 'Today, 11:45 AM',
    rationale: [
      'Bezel polish & housing re-skin (₹3,500) elevates device from C-Grade to A-Grade Certified Refurbished.',
      'A-Grade resale price (₹52,000) yields ₹47,400 net recovery versus ₹42,000 as-is C-grade resale.',
      'Confidence is 78% due to fluctuating Pixel 8 secondary market trade-in prices in South India.'
    ],
    comparisons: [
      { disposition: 'Refurbish', expectedRecovery: 52000, processingCost: 4600, expectedNet: 47400, isRecommended: true, notes: 'Housing re-skin yields +₹5.4k net' },
      { disposition: 'Resell', expectedRecovery: 43100, processingCost: 1100, expectedNet: 42000, isRecommended: false, notes: 'As-is C-grade sale' },
      { disposition: 'Exchange', expectedRecovery: 38000, processingCost: 1500, expectedNet: 36500, isRecommended: false, notes: 'Vendor swap' },
      { disposition: 'Donate', expectedRecovery: 0, processingCost: 800, expectedNet: -800, isRecommended: false, notes: 'N/A' },
      { disposition: 'Recycle', expectedRecovery: 3000, processingCost: 500, expectedNet: 2500, isRecommended: false, notes: 'N/A' },
      { disposition: 'Write-off', expectedRecovery: 0, processingCost: 0, expectedNet: 0, isRecommended: false, notes: 'N/A' }
    ],
    factors: [
      { name: 'Condition', impact: 'HIGH IMPACT', description: 'Minor cosmetic dent, electronics pristine.' },
      { name: 'Product / SKU', impact: 'HIGH IMPACT', description: 'Active Google flagship with strong software support lifespan.' },
      { name: 'Location and demand', impact: 'MEDIUM IMPACT', description: 'Bengaluru hub has quick turnaround re-skin lab.' },
      { name: 'Season / timing', impact: 'LOW IMPACT', description: '10 days since purchase.' },
      { name: 'Recovery cost', impact: 'HIGH IMPACT', description: '₹3,500 refurb spend unlocks ₹10,000 resale bump.' }
    ],
    history: [
      { timestamp: 'Today, 11:20 AM', action: 'Return Received', actor: 'Bengaluru WH' },
      { timestamp: 'Today, 11:45 AM', action: 'SecondRoute Flagged Review Required (78%)', actor: 'Decision Engine' }
    ]
  }
];
