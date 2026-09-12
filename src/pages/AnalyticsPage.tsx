import React from 'react';
import { TrendingUp, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
          Analytics
        </h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Measure whether better disposition decisions create better net value recovery.
        </p>
      </div>

      {/* TOP HEADLINE METRIC */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
            Incremental net recovery per return
          </span>
          <div className="flex items-baseline space-x-3 mt-1">
            <span className="text-4xl font-extrabold text-[#0F766E] font-mono tracking-tight">
              ₹455
            </span>
            <span className="text-xs font-semibold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              +14.2% Net Lift
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Average financial lift per evaluated unit compared to static disposition rules.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-medium text-[#111827] bg-[#F7F8FA] p-3 rounded-xl border border-[#E5E7EB]">
          <TrendingUp className="w-5 h-5 text-[#0F766E] shrink-0" />
          <span>Annualized ROI Projection: <strong>₹5.68L Net Value Recovered</strong> across 1,248 units</span>
        </div>
      </div>

      {/* 4 ACTUAL VISUALIZATIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Net Recovery Per Return Over Time */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#111827]">
                1. Net recovery per return over time
              </h3>
              <p className="text-xs text-[#667085]">
                Monthly recovery comparison (Baseline vs SecondRoute)
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded">
              +₹455 / unit
            </span>
          </div>

          {/* Clean SVG Trend Visualization */}
          <div className="pt-2">
            <div className="h-44 w-full flex items-end justify-between space-x-3 px-2 pb-2 border-b border-[#E5E7EB]">
              {[
                { month: 'May', baseline: 31200, sr: 34800 },
                { month: 'Jun', baseline: 31800, sr: 35600 },
                { month: 'Jul', baseline: 32000, sr: 36100 },
                { month: 'Aug', baseline: 32100, sr: 36555 },
                { month: 'Sep', baseline: 32300, sr: 36980 }
              ].map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full flex items-end justify-center space-x-1.5 h-36">
                    {/* Baseline Bar */}
                    <div
                      className="w-3.5 bg-slate-300 rounded-t transition-all group-hover:bg-slate-400"
                      style={{ height: `${(d.baseline / 40000) * 100}%` }}
                      title={`Baseline: ₹${d.baseline}`}
                    />
                    {/* SecondRoute Bar */}
                    <div
                      className="w-3.5 bg-[#0F766E] rounded-t transition-all group-hover:bg-[#0D645E]"
                      style={{ height: `${(d.sr / 40000) * 100}%` }}
                      title={`SecondRoute: ₹${d.sr}`}
                    />
                  </div>
                  <span className="text-[11px] text-[#667085] mt-2 font-medium">{d.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs pt-3 text-[#667085]">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded bg-slate-300 mr-1.5" /> Traditional Rule (₹32.1k)
                </span>
                <span className="flex items-center font-medium text-[#111827]">
                  <span className="w-2.5 h-2.5 rounded bg-[#0F766E] mr-1.5" /> SecondRoute (₹36.5k)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: Disposition Mix Across All 6 Outcomes */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#111827]">
              2. Disposition mix
            </h3>
            <p className="text-xs text-[#667085]">
              Distribution across all 6 evaluated destination outcomes
            </p>
          </div>

          <div className="space-y-2.5 text-xs pt-1">
            {[
              { label: 'Resell', pct: 42, color: 'bg-[#0F766E]', val: '₹5.24L' },
              { label: 'Refurbish', pct: 28, color: 'bg-emerald-600', val: '₹2.10L' },
              { label: 'Exchange', pct: 12, color: 'bg-blue-600', val: '₹68,000' },
              { label: 'Donate', pct: 8, color: 'bg-indigo-600', val: '₹24,000' },
              { label: 'Recycle', pct: 6, color: 'bg-amber-600', val: '₹12,000' },
              { label: 'Write-off', pct: 4, color: 'bg-slate-400', val: '₹4,000' }
            ].map((item) => (
              <div key={item.label} className="flex items-center space-x-3">
                <span className="w-20 font-medium text-[#111827] truncate">{item.label}</span>
                <div className="flex-1 h-3 bg-[#F7F8FA] rounded-full overflow-hidden border border-[#E5E7EB]/60">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
                <span className="w-10 text-right font-mono font-bold text-[#111827]">{item.pct}%</span>
                <span className="w-16 text-right font-mono text-[#667085] text-[11px]">{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 3: Decision Time Before vs After SecondRoute */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#111827]">
                3. Decision time comparison
              </h3>
              <p className="text-xs text-[#667085]">
                Processing duration per return item (95% speed improvement)
              </p>
            </div>
            <Clock className="w-4 h-4 text-[#0F766E]" />
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#667085] font-medium">Before (Manual spreadsheet review)</span>
                <span className="font-mono font-bold text-[#111827]">14 min 00 sec</span>
              </div>
              <div className="w-full h-6 bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="h-full bg-slate-400 rounded-xl" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#15803D] font-bold">After SecondRoute</span>
                <span className="font-mono font-bold text-[#15803D]">0 min 42 sec</span>
              </div>
              <div className="w-full h-6 bg-emerald-50 border border-emerald-200 rounded-xl overflow-hidden">
                <div className="h-full bg-[#0F766E] rounded-xl flex items-center justify-end pr-2 text-[10px] font-bold text-white" style={{ width: '8%' }}>
                  42s
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#667085] pt-1">
              Automated evaluation eliminates manual spreadsheet lookups and accelerates inventory turnover.
            </p>
          </div>
        </div>

        {/* CHART 4: Recommendation Acceptance Rate */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#111827]">
                4. Recommendation acceptance rate
              </h3>
              <p className="text-xs text-[#667085]">
                Human operator trust & adherence tracking (87% current)
              </p>
            </div>
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center pt-2">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-2xl font-bold text-[#15803D] font-mono">87%</span>
              <span className="block text-[11px] text-[#15803D] font-medium mt-0.5">Accepted</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-2xl font-bold text-[#B45309] font-mono">9%</span>
              <span className="block text-[11px] text-[#B45309] font-medium mt-0.5">Overridden</span>
            </div>
            <div className="p-3 bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl">
              <span className="text-2xl font-bold text-[#667085] font-mono">4%</span>
              <span className="block text-[11px] text-[#667085] font-medium mt-0.5">Pending</span>
            </div>
          </div>

          <div className="text-[11px] text-[#667085] border-t border-[#E5E7EB]/60 pt-2 flex items-center justify-between">
            <span>Model Explainability Rating:</span>
            <span className="font-semibold text-[#111827]">High Operator Trust</span>
          </div>
        </div>
      </div>

      {/* STORY SUMMARY BANNER */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs flex items-center justify-between text-xs text-[#111827]">
        <div className="flex items-center space-x-2.5">
          <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0" />
          <span>
            <strong>The Value Story:</strong> Better decisions → faster processing (42s) → higher net recovery (+₹455/unit) → less waste (18.7% diverted).
          </span>
        </div>
      </div>
    </div>
  );
};
