
import React from 'react';
import { RegionType } from '../types';

interface RegionSelectorProps {
  onSelect: (region: RegionType) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ onSelect }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-green-50 flex flex-col items-center justify-center p-8">
      <div className="w-24 h-24 bg-green-600 rounded-[32px] flex items-center justify-center mb-10 shadow-[0_20px_40px_rgba(5,150,105,0.2)] rotate-3 border-4 border-white">
        <span className="text-5xl">🪴</span>
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">나만의 작은 텃밭</h1>
      <p className="text-slate-500 text-center mb-12 text-sm font-bold leading-relaxed opacity-70">
        농촌진흥청 데이터를 기반으로<br/>지역별 최적의 재배 일정을 추천합니다.
      </p>
      
      <div className="w-full space-y-4">
        <RegionButton 
          title="북부 지방" 
          desc="경기 북부, 강원 등 (서늘한 기후)" 
          onClick={() => onSelect(RegionType.NORTH)} 
          badge="약 10일 지연"
          color="bg-white"
          textColor="text-blue-600"
        />
        <RegionButton 
          title="중부 지방" 
          desc="서울, 경기 남부, 충청 (기준점)" 
          onClick={() => onSelect(RegionType.CENTRAL)} 
          badge="표준 일정"
          color="bg-green-600"
          isPrimary
        />
        <RegionButton 
          title="남부 지방" 
          desc="전라, 경상, 제주 (따뜻한 기후)" 
          onClick={() => onSelect(RegionType.SOUTH)} 
          badge="약 10일 조기"
          color="bg-white"
          textColor="text-orange-600"
        />
      </div>
      
      <p className="mt-16 text-[10px] text-green-800/30 text-center font-black uppercase tracking-widest">
        Smart Garden Manager v1.0
      </p>
    </div>
  );
};

const RegionButton: React.FC<{ 
  title: string; 
  desc: string; 
  onClick: () => void; 
  badge: string; 
  color: string;
  textColor?: string;
  isPrimary?: boolean;
}> = ({ title, desc, onClick, badge, color, textColor = 'text-green-700', isPrimary }) => (
  <button 
    onClick={onClick}
    className={`w-full ${color} p-6 rounded-[32px] shadow-sm border border-green-100 hover:scale-[1.02] active:scale-95 transition-all text-left group flex items-center justify-between ${isPrimary ? 'shadow-green-200 shadow-xl' : ''}`}
  >
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className={`font-black text-lg ${isPrimary ? 'text-white' : 'text-slate-800'}`}>{title}</span>
        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${isPrimary ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600'}`}>
          {badge}
        </span>
      </div>
      <span className={`text-xs font-bold ${isPrimary ? 'text-white/70' : 'text-slate-400'}`}>{desc}</span>
    </div>
    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:translate-x-1 ${isPrimary ? 'bg-white/20 text-white' : 'bg-green-50 text-green-400'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
    </div>
  </button>
);

export default RegionSelector;
