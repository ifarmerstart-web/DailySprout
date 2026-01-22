
import React from 'react';
import { RegionType } from '../types';

interface RegionSelectorProps {
  onSelect: (region: RegionType) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ onSelect }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-green-50 flex flex-col items-center justify-center p-8">
      <div className="w-24 h-24 bg-green-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl rotate-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 opacity-50"></div>
        <span className="text-5xl z-10">🇰🇷</span>
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">재배 지역 선택</h1>
      <p className="text-slate-500 text-center mb-10 text-sm font-medium">
        농촌진흥청 데이터를 기반으로<br/>지역별 최적의 농사 타이밍을 계산합니다.
      </p>
      
      <div className="w-full space-y-4">
        <RegionButton 
          title="북부 지방" 
          desc="경기 북부, 강원 등 (서늘한 기후)" 
          onClick={() => onSelect(RegionType.NORTH)} 
          badge="약 8일 지연"
          color="bg-blue-50"
          border="border-blue-100"
        />
        <RegionButton 
          title="중부 지방" 
          desc="서울, 경기 남부, 충청 (기준점)" 
          onClick={() => onSelect(RegionType.CENTRAL)} 
          badge="RDA 기준"
          color="bg-yellow-50"
          border="border-yellow-100"
        />
        <RegionButton 
          title="남부 지방" 
          desc="전라, 경상, 제주 (따뜻한 기후)" 
          onClick={() => onSelect(RegionType.SOUTH)} 
          badge="약 10일 조기"
          color="bg-orange-50"
          border="border-orange-100"
        />
      </div>
      
      <div className="mt-12 p-4 bg-white/50 rounded-xl border border-slate-100">
        <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed">
          * 4월 상순~5월 상순 실외 재배 가이드를 따릅니다.<br/>
          * 기상 이변에 따라 실제 환경은 다를 수 있습니다.
        </p>
      </div>
    </div>
  );
};

const RegionButton: React.FC<{ 
  title: string; 
  desc: string; 
  onClick: () => void; 
  badge: string; 
  color: string;
  border: string;
}> = ({ title, desc, onClick, badge, color, border }) => (
  <button 
    onClick={onClick}
    className={`w-full ${color} p-5 rounded-3xl shadow-sm border ${border} hover:scale-[1.02] active:scale-95 transition-all text-left group`}
  >
    <div className="flex justify-between items-center mb-1">
      <span className="font-bold text-lg text-slate-800 group-hover:text-slate-900">{title}</span>
      <span className="bg-white/80 text-slate-500 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">{badge}</span>
    </div>
    <span className="text-xs text-slate-500 font-medium">{desc}</span>
  </button>
);

export default RegionSelector;
