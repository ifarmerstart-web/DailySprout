// 작물추가하기 전 목록 화면
import React, { useState, useMemo, useEffect } from 'react';
import { MasterCrop, RegionType, PlantingMethod } from '../types';
import { MASTER_CROPS, REGION_OFFSETS } from '../constants';

interface CropRecommendationProps {
  region: RegionType;
  onAdd: (cropId: string) => void;
  filter?: 'ALL' | 'ANNUAL' | 'PERENNIAL';
}

const CropRecommendation: React.FC<CropRecommendationProps> = ({ region, onAdd, filter = 'ALL' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const regionOffset = REGION_OFFSETS[region];

  // Base crops filtered by the entry point (Annual vs Perennial)
  const baseCrops = useMemo(() => {
    if (filter === 'ANNUAL') return MASTER_CROPS.filter(c => !c.isPerennial);
    if (filter === 'PERENNIAL') return MASTER_CROPS.filter(c => c.isPerennial);
    return MASTER_CROPS;
  }, [filter]);

  // Helper to get display category (Groups 3월 초, 3월 중순 with 초봄)
  const getDisplayCategory = (type: string) => {
    if (type.includes('3월') || type === '초봄 (직파)') return '초봄 (직파)';
    if (type === '봄 (모종)') return '4월 초 (직파)';
    if (type.includes('4월 중순')) return '4월 중순';
    if (type.includes('4월 말') || type.includes('4월 말')) return '4월 말';
    if (type.includes('5월 초')) return '5월 초';
    return type;
  };

  const categories = useMemo(() => {
    const rawCategories = baseCrops.map(c => getDisplayCategory(c.type));
    const uniqueCategories = ['전체', ...new Set(rawCategories)];
    return uniqueCategories;
  }, [baseCrops]);

  // Reset category if it's no longer valid for the current base crops
  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory('전체');
    }
  }, [categories, activeCategory]);

  const filteredCrops = useMemo(() => {
    if (activeCategory === '전체') return baseCrops;
    return baseCrops.filter(c => getDisplayCategory(c.type) === activeCategory);
  }, [activeCategory, baseCrops]);

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          {filter === 'PERENNIAL' ? '다년생 작물 추천' : filter === 'ANNUAL' ? '이번 시즌 추천 작물' : '텃밭 작물 가이드'}
        </h2>
        <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
          {region === RegionType.NORTH ? '❄️ 북부' : region === RegionType.SOUTH ? '☀️ 남부' : '☁️ 중부'} 지역 기준 
          <strong> {regionOffset >= 0 ? `${regionOffset}일 늦게` : `${Math.abs(regionOffset)}일 빠르게`}</strong> 심는 것을 권장합니다.
        </p>
      </div>

      {/* Category Tabs */}
      {categories.length > 2 && (
        <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1 px-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-green-600 text-white border-green-600 shadow-md scale-105' 
                  : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredCrops.map((crop) => {
          const baseDate = new Date(new Date().getFullYear(), crop.basePlantMonth - 1, crop.basePlantDay);
          const adjustedDate = new Date(baseDate);
          adjustedDate.setDate(adjustedDate.getDate() + regionOffset);
          
          return (
            <div key={crop.id} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-all active:scale-[0.98]">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 relative">
                <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                <div className="absolute top-1 left-1 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-lg border border-slate-100 shadow-sm">
                   <span className={`text-[10px] font-black uppercase tracking-tighter ${crop.method === PlantingMethod.SEED ? 'text-orange-600' : 'text-blue-600'}`}>
                    {crop.method === PlantingMethod.SEED ? '직파' : '모종'}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-1.5">
                      {crop.name}
                      {crop.isPerennial && <span className="text-[12px] text-green-600 bg-green-50 px-1 rounded">∞</span>}
                    </h3>
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{crop.type.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[12px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100">
                      📅 {adjustedDate.getMonth() + 1}월 {adjustedDate.getDate() > 20 ? '하순' : adjustedDate.getDate() > 10 ? '중순' : '상순'}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-500 line-clamp-2 mt-2 leading-relaxed font-medium">{crop.description}</p>
                </div>
                <div className="flex justify-end items-center mt-3">
                  <button 
                    onClick={() => onAdd(crop.id)}
                    className="bg-green-600 text-white text-[12px] px-4 py-1.5 rounded-full font-black hover:bg-green-700 shadow-sm transition-all active:translate-y-0.5"
                  >
                    심기 시작
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredCrops.length === 0 && (
        <div className="py-20 text-center text-slate-400">
          <span className="text-4xl mb-4 block">🏜️</span>
          <p className="text-[14px]">해당 카테고리의 작물이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;
