
import React, { useState, useMemo, useRef } from 'react';
import { UserGardenItem, RegionType, MasterCrop } from '../types';
import { MASTER_CROPS } from '../constants';
import { calculateSchedule, isPlantedTooEarly, getFutureEvents, CalendarEvent } from '../utils';

interface GardenTimelineProps {
  garden: UserGardenItem[];
  region: RegionType;
  filterType: 'ANNUAL' | 'PERENNIAL';
  onRemove: (id: string) => void;
  onAddClick: () => void;
  onToggleHarvest: (id: string) => void;
  onUpdatePlantDate: (id: string, newDate: string) => void;
  onUpdateCropImage: (id: string, imageData: string) => void;
}

const GardenTimeline: React.FC<GardenTimelineProps> = ({ 
  garden, 
  region, 
  filterType,
  onRemove, 
  onAddClick, 
  onToggleHarvest, 
  onUpdatePlantDate,
  onUpdateCropImage
}) => {
  const [selectedItem, setSelectedItem] = useState<UserGardenItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredList = useMemo(() => {
    return garden.filter(item => {
      const crop = MASTER_CROPS.find(c => c.id === item.cropId);
      if (!crop) return false;
      return filterType === 'PERENNIAL' ? crop.isPerennial : !crop.isPerennial;
    }).sort((a, b) => new Date(b.plantDate).getTime() - new Date(a.plantDate).getTime());
  }, [garden, filterType]);

  const allEvents = useMemo(() => {
    let events: CalendarEvent[] = [];
    filteredList.forEach(item => {
      if (item.isHarvested) return;
      const crop = MASTER_CROPS.find(c => c.id === item.cropId);
      if (crop) {
        events = [...events, ...getFutureEvents(crop, item.plantDate)];
      }
    });
    return events;
  }, [filteredList]);

  const getCropColor = (cropId: string) => {
    const colors = ['bg-green-500', 'bg-emerald-500', 'bg-lime-500', 'bg-teal-500'];
    const index = MASTER_CROPS.findIndex(c => c.id === cropId);
    return colors[index % colors.length];
  };

  const getDayEvents = (day: number) => {
    return allEvents.filter(e => 
      e.date.getDate() === day && 
      e.date.getMonth() === currentMonth.getMonth() && 
      e.date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      onRemove(deleteConfirmId);
      if (selectedItem?.id === deleteConfirmId) setSelectedItem(null);
      setDeleteConfirmId(null);
    }
  };

  const renderItemImage = (item: UserGardenItem, crop: MasterCrop) => {
    if (item.customImage) {
      return <img src={item.customImage} alt={crop.name} className="w-full h-full object-cover" />;
    }
    return (
      <div className="w-full h-full bg-green-100/30 flex flex-col items-center justify-center text-green-300 border border-green-200 border-dashed rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-0.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && selectedItem) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64 = reader.result as string;
              onUpdateCropImage(selectedItem.id, base64);
              setSelectedItem({ ...selectedItem, customImage: base64 });
            };
            reader.readAsDataURL(file);
          }
        }} 
      />

      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-2xl font-black text-green-800 tracking-tighter">
            {filterType === 'PERENNIAL' ? '다년생 밭' : '시즌 텃밭'}
          </h2>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setViewMode('list')} className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${viewMode === 'list' ? 'bg-green-600 text-white border-green-600 shadow-md' : 'bg-white text-green-300 border-green-100'}`}>List</button>
            <button onClick={() => setViewMode('calendar')} className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${viewMode === 'calendar' ? 'bg-green-600 text-white border-green-600 shadow-md' : 'bg-white text-green-300 border-green-100'}`}>Calendar</button>
          </div>
        </div>
        <button onClick={onAddClick} className="w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-green-200/50 active:scale-90 transition-all border-2 border-white/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
        </button>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredList.length === 0 ? (
            <div className="py-20 bg-white/50 rounded-[40px] border border-green-100 border-dashed text-center flex flex-col items-center">
              <span className="text-4xl mb-4">🌱</span>
              <p className="text-sm font-bold text-green-800/40">밭이 비어있습니다.</p>
            </div>
          ) : (
            filteredList.map((item) => {
              const crop = MASTER_CROPS.find(c => c.id === item.cropId);
              if (!crop) return null;
              const schedule = calculateSchedule(crop, region, item.plantDate);
              const remainingDays = Math.max(0, crop.growthDays - schedule.dDay);

              return (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className={`bg-white/80 backdrop-blur-md p-5 rounded-[32px] border border-green-100 shadow-sm flex flex-col gap-4 active:scale-[0.98] transition-all cursor-pointer ${item.isHarvested ? 'opacity-50 grayscale' : ''}`}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-green-50 relative ring-4 ring-green-100/50">
                      {renderItemImage(item, crop)}
                      {schedule.fertilizerAlert && !item.isHarvested && (
                        <div className="absolute -top-1 -right-1 bg-orange-500 text-white w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] animate-bounce">!</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-black text-slate-800">{crop.name}</h3>
                          <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-0.5">
                            {crop.isPerennial ? '다년생 재배 중' : `${schedule.harvestDate.toLocaleDateString()} 수확 예정`}
                          </p>
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${schedule.isHarvestReady ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600'}`}>
                          {schedule.isHarvestReady ? '🧺 수확' : `D-${remainingDays}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {!item.isHarvested && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-[9px] font-black text-green-400 uppercase tracking-tighter">성장 진행률</span>
                        <span className="text-[10px] font-black text-green-700">{Math.round(schedule.harvestProgress)}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-green-100/30 rounded-full overflow-hidden flex items-center">
                        <div 
                          className={`h-full transition-all duration-1000 ${schedule.fertilizerAlert ? 'bg-orange-400' : 'bg-green-500'}`} 
                          style={{ width: `${schedule.harvestProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-[40px] border border-green-100 shadow-sm">
          {/* Calendar Placeholder for brevity in this XML */}
          <div className="text-center py-10">
            <h3 className="text-sm font-black text-green-800 mb-2">{currentMonth.getFullYear()}년 {currentMonth.getMonth()+1}월</h3>
            <div className="grid grid-cols-7 gap-1">
              {['일','월','화','수','목','금','토'].map(d => <span key={d} className="text-[10px] text-green-300 font-bold">{d}</span>)}
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} className="aspect-square flex items-center justify-center text-xs font-bold text-slate-400">
                  {i+1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 상세 모달 */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-green-900/60 backdrop-blur-sm p-4" onClick={() => setSelectedItem(null)}>
          <div className="w-full max-w-md bg-white rounded-t-[48px] shadow-2xl p-8 pt-2 animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-green-100 rounded-full mx-auto my-6"></div>
            
            {(() => {
              const crop = MASTER_CROPS.find(c => c.id === selectedItem.cropId)!;
              const schedule = calculateSchedule(crop, region, selectedItem.plantDate);
              return (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black text-slate-800">{crop.name}</h3>
                      <p className="text-xs font-bold text-green-500">{crop.type}</p>
                    </div>
                    <button onClick={() => setDeleteConfirmId(selectedItem.id)} className="w-10 h-10 bg-red-50 text-red-400 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </button>
                  </div>

                  <div className="aspect-video w-full rounded-[40px] overflow-hidden bg-green-50 relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    {selectedItem.customImage ? (
                      <img src={selectedItem.customImage} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-green-200">
                        <span className="text-4xl mb-2">📸</span>
                        <p className="text-[10px] font-black uppercase tracking-widest">텃밭 사진 등록하기</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-black">수정하기</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-5 rounded-[32px] text-center border border-green-100">
                      <span className="text-[10px] font-black text-green-600 block mb-1">재배 기간</span>
                      <span className="text-lg font-black text-green-900">{schedule.dDay}일째</span>
                    </div>
                    <div className="bg-emerald-50 p-5 rounded-[32px] text-center border border-emerald-100">
                      <span className="text-[10px] font-black text-emerald-600 block mb-1">권장 기간</span>
                      <span className="text-lg font-black text-emerald-900">{crop.growthDays}일</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm space-y-4">
                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">📋</span> 
                      관리 가이드
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {crop.description}
                    </p>
                    <div className="pt-2">
                      <h5 className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-3">주요 일정</h5>
                      <div className="space-y-3">
                        {crop.careSteps.map((step, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${schedule.dDay >= step.daysAfter ? 'bg-green-500' : 'bg-green-100'}`} />
                            <div className="flex-1 text-[11px] font-bold text-slate-700">{step.action} ({step.daysAfter}일차)</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onToggleHarvest(selectedItem.id)}
                    className={`w-full py-5 rounded-[32px] font-black text-sm transition-all active:scale-95 shadow-lg ${selectedItem.isHarvested ? 'bg-slate-100 text-slate-400' : 'bg-green-600 text-white shadow-green-200/50'}`}
                  >
                    {selectedItem.isHarvested ? '이미 수확됨' : '🧺 지금 수확 완료하기'}
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-green-950/80 backdrop-blur-md p-10">
          <div className="bg-white rounded-[40px] p-8 text-center shadow-2xl max-w-xs w-full animate-in zoom-in-95">
            <span className="text-4xl mb-4 block">🗑️</span>
            <h3 className="text-xl font-black text-slate-800 mb-2">작물을 삭제할까요?</h3>
            <p className="text-xs text-slate-400 font-bold leading-relaxed mb-8">기존 재배 기록과 설정 데이터가<br/>모두 사라집니다.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs active:scale-95">취소</button>
              <button onClick={handleConfirmDelete} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-xs active:scale-95 shadow-lg shadow-red-200">삭제</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default GardenTimeline;
