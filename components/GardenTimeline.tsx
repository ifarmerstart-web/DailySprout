
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
    const colors = [
      'bg-green-500', 'bg-emerald-500', 'bg-lime-500', 
      'bg-teal-500', 'bg-green-600', 'bg-emerald-600', 
      'bg-lime-600', 'bg-teal-600'
    ];
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

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
      <div className="bg-white/80 backdrop-blur rounded-[32px] border border-green-100 p-5 shadow-sm animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6 px-1">
          <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-2 hover:bg-green-50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h3 className="text-sm font-black text-green-800 tracking-tight">{year}년 {month + 1}월</h3>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-2 hover:bg-green-50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-y-4 text-center">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
            <span key={d} className="text-[10px] font-black text-green-200 uppercase tracking-widest">{d}</span>
          ))}
          {days.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const events = getDayEvents(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
            
            return (
              <div key={day} className="relative py-1 flex flex-col items-center">
                <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full transition-colors ${isToday ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-slate-600'}`}>
                  {day}
                </span>
                <div className="flex flex-wrap justify-center gap-0.5 mt-1 px-1 h-2 overflow-hidden">
                  {events.map((e, idx) => (
                    <div 
                      key={`${e.cropId}-${idx}`} 
                      className={`w-1 h-1 rounded-full ${getCropColor(e.cropId)}`}
                      title={`${e.cropName}: ${e.action}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const calculateYears = (plantDate: string) => {
    const diff = new Date().getTime() - new Date(plantDate).getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)) + 1;
    return `${years}년차`;
  };

  const currentCrop = selectedItem ? MASTER_CROPS.find(c => c.id === selectedItem.cropId) : null;
  const currentSchedule = (selectedItem && currentCrop) ? calculateSchedule(currentCrop, region, selectedItem.plantDate) : null;
  const isEarlyWarning = (selectedItem && currentCrop) ? isPlantedTooEarly(currentCrop, region, selectedItem.plantDate) : false;

  const handleDeleteTrigger = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      onRemove(deleteConfirmId);
      if (selectedItem?.id === deleteConfirmId) {
        setSelectedItem(null);
      }
      setDeleteConfirmId(null);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdateCropImage(selectedItem.id, base64String);
        setSelectedItem({ ...selectedItem, customImage: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderItemImage = (item: UserGardenItem, crop: MasterCrop) => {
    if (item.customImage) {
      return <img src={item.customImage} alt={crop.name} className="w-full h-full object-cover" />;
    }
    return (
      <div className="w-full h-full bg-green-50/50 flex flex-col items-center justify-center text-green-200 border border-green-100 border-dashed rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-[7px] font-black uppercase tracking-tighter opacity-40">나의 텃밭 사진</span>
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
        onChange={handleFileChange} 
      />
      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-2xl font-black text-green-900 tracking-tighter">
            {filterType === 'PERENNIAL' ? '다년생 밭' : '시즌 텃밭'}
          </h2>
          <div className="flex gap-2 mt-1">
            <button 
              onClick={() => setViewMode('list')}
              className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all ${viewMode === 'list' ? 'bg-green-700 text-white border-green-700' : 'bg-white text-green-300 border-green-100'}`}
            >
              List
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all ${viewMode === 'calendar' ? 'bg-green-700 text-white border-green-700' : 'bg-white text-green-300 border-green-100'}`}
            >
              Calendar
            </button>
          </div>
        </div>
        <button onClick={onAddClick} className="w-10 h-10 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all border-2 border-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {viewMode === 'calendar' ? renderCalendar() : (
        <>
          {filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white/60 backdrop-blur rounded-[40px] border border-green-100 shadow-sm">
              <span className="text-5xl mb-4">🪴</span>
              <p className="text-sm font-bold text-green-700/40">등록된 작물이 없습니다.</p>
              <button onClick={onAddClick} className="mt-4 text-xs font-black text-green-600 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-colors">
                {filterType === 'PERENNIAL' ? '다년생 작물 보러가기' : '이번 주 추천 작물 심기'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredList.map((item) => {
                const crop = MASTER_CROPS.find(c => c.id === item.cropId);
                if (!crop) return null;
                const schedule = calculateSchedule(crop, region, item.plantDate);
                const isTooEarly = isPlantedTooEarly(crop, region, item.plantDate);
                const remainingDays = Math.max(0, crop.growthDays - schedule.dDay);

                return (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className={`relative bg-white/80 backdrop-blur p-4 rounded-[32px] shadow-sm border border-green-50 flex flex-col gap-3 active:scale-[0.98] transition-all cursor-pointer group ${item.isHarvested ? 'opacity-40 grayscale' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 relative ring-2 ring-green-50 group-hover:ring-green-100 transition-all">
                        {renderItemImage(item, crop)}
                        {schedule.fertilizerAlert && !item.isHarvested && (
                          <div className="absolute -top-1 -right-1 bg-emerald-500 text-white w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] animate-pulse shadow-sm">🌿</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0 flex-1 pr-2">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={(e) => handleDeleteTrigger(e, item.id)}
                                className="p-1 text-green-100 hover:text-red-400 transition-all flex-shrink-0"
                                title="삭제"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <h3 className="font-black text-slate-800 text-base flex items-center gap-1.5 truncate">
                                {crop.name}
                                {isTooEarly && !item.isHarvested && <span className="text-amber-500 text-xs">⚠️</span>}
                              </h3>
                            </div>
                            <p className="text-[10px] font-bold text-green-400 mt-0.5 uppercase tracking-wider truncate">
                              {crop.isPerennial 
                                ? calculateYears(item.plantDate) 
                                : `${schedule.harvestDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })} 수확 예정`}
                            </p>
                          </div>
                          {!crop.isPerennial ? (
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg flex-shrink-0 ${schedule.isHarvestReady ? 'bg-green-100 text-green-700' : 'bg-green-50/50 text-green-300'}`}>
                              {schedule.isHarvestReady ? '🧺 수확 적기' : `D-${remainingDays}`}
                            </span>
                          ) : (
                            <span className="text-[10px] font-black text-green-700 bg-green-50 px-2 py-1 rounded-lg flex-shrink-0">성장중</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {!item.isHarvested && (
                      <div className="space-y-2 px-1">
                        <div className="flex justify-between items-center text-[9px] font-black mb-1">
                          <span className="text-green-300 uppercase tracking-widest">성장 및 관리 현황</span>
                          <span className="text-green-600 font-bold">{Math.round(schedule.harvestProgress)}%</span>
                        </div>
                        
                        <div className="relative h-2.5 w-full bg-green-50 rounded-full flex items-center overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ease-out ${schedule.fertilizerAlert ? 'bg-emerald-400 animate-pulse' : 'bg-green-500'}`}
                            style={{ width: `${schedule.harvestProgress}%` }}
                          />
                          
                          {!crop.isPerennial && (
                            <div className="absolute inset-0 pointer-events-none flex items-center">
                              {crop.topDressing1 && (
                                <div 
                                  className={`absolute w-1.5 h-1.5 rounded-full border border-white/50 shadow-sm z-10 transition-colors ${schedule.dDay >= crop.topDressing1 ? 'bg-emerald-600' : 'bg-green-200'}`}
                                  style={{ left: `${(crop.topDressing1 / crop.growthDays) * 100}%`, transform: 'translateX(-50%)' }}
                                />
                              )}
                              {crop.topDressing2 && (
                                <div 
                                  className={`absolute w-1.5 h-1.5 rounded-full border border-white/50 shadow-sm z-10 transition-colors ${schedule.dDay >= crop.topDressing2 ? 'bg-emerald-600' : 'bg-green-200'}`}
                                  style={{ left: `${(crop.topDressing2 / crop.growthDays) * 100}%`, transform: 'translateX(-50%)' }}
                                />
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center pt-0.5">
                          {schedule.fertilizerAlert ? (
                            <span className="text-[9px] font-black text-emerald-600 animate-pulse">✨ {schedule.fertilizerAlert}!</span>
                          ) : (
                            <span className="text-[9px] font-bold text-green-200">
                              {schedule.isHarvestReady ? '수확 가능' : `${remainingDays}일 뒤 수확`}
                            </span>
                          )}
                          {!crop.isPerennial && (crop.topDressing1 || crop.topDressing2) && (
                            <div className="flex items-center gap-1.5 opacity-60">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm"></div>
                              <span className="text-[9px] text-emerald-600 font-black tracking-tighter uppercase">비료 타이밍</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* 상세 보기 모달 */}
      {selectedItem && currentCrop && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-green-950/40 backdrop-blur-sm p-4" onClick={() => setSelectedItem(null)}>
          <div className="w-full max-w-md bg-white rounded-t-[40px] shadow-2xl px-6 pt-2 pb-10 animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-green-50 rounded-full mx-auto mb-6 sticky top-0 bg-white py-1"></div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter">
                  {currentCrop.name}
                </h3>
                <button 
                  onClick={(e) => handleDeleteTrigger(e, selectedItem.id)}
                  className="p-1.5 text-green-100 hover:text-red-500 transition-all active:scale-125 cursor-pointer z-20 flex items-center justify-center bg-green-50/50 rounded-full shadow-sm"
                  title="삭제"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <span className="text-[9px] font-black bg-green-50 text-green-400 px-2.5 py-0.5 rounded-full uppercase tracking-widest mt-1">
                {currentCrop.isPerennial ? 'PERENNIAL' : 'SEASONAL'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="relative group cursor-pointer" onClick={handleImageClick}>
                <div className="w-full h-48 rounded-3xl overflow-hidden border-2 border-green-50 shadow-inner flex items-center justify-center bg-green-50/20">
                  {selectedItem.customImage ? (
                    <img src={selectedItem.customImage} alt={currentCrop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-green-200">
                      <div className="bg-white p-5 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-green-300">나만의 작물 사진 등록</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 1. 권장 수확일 */}
              {currentSchedule && !currentCrop.isPerennial && (
                <div className="p-5 bg-green-50/50 rounded-3xl border border-green-100 text-center relative overflow-hidden">
                  <h4 className="text-[10px] font-black text-green-700 uppercase mb-2 tracking-widest flex items-center justify-center gap-1">
                    <span className="text-sm">🧺</span> 권장 수확일
                  </h4>
                  <p className="text-lg font-black text-green-900 leading-tight">
                    {currentSchedule.harvestDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-[10px] text-green-600/40 font-bold mt-1">
                    심은 지 {currentSchedule.dDay}일 경과 ({currentCrop.growthDays}일 재배 권장)
                  </p>
                  
                  {isEarlyWarning && (
                    <div className="mt-2 p-1.5 bg-amber-50 border border-amber-200 rounded-2xl animate-in fade-in zoom-in-95 duration-500">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-sm">⚠️</span>
                        <span className="text-[10px] font-black text-amber-700 tracking-tight">권장 시기보다 일찍 심었습니다</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. 비료 & 영양 가이드 */}
              <div className="p-5 bg-emerald-50/30 rounded-3xl border border-emerald-100/50">
                <h4 className="text-[10px] font-black text-emerald-700 uppercase mb-2 tracking-widest flex items-center justify-center gap-1">
                  <span className="text-sm">🔋</span> 비료 & 영양 가이드
                </h4>
                <p className="text-xs text-emerald-900 font-bold leading-relaxed text-center px-2">
                  {currentCrop.fertilizerTip}
                </p>
                {!currentCrop.isPerennial && (currentCrop.topDressing1 || currentCrop.topDressing2) && (
                  <div className="mt-4 flex flex-col gap-2 items-center">
                    <div className="flex items-center gap-4">
                      {currentCrop.topDressing1 && (
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-emerald-300 uppercase tracking-tighter mb-1">1차 (웃거름)</span>
                          <div className={`w-7 h-5 rounded-2xl flex items-center justify-center font-black text-[8px] shadow-sm transition-all ${currentSchedule?.dDay! >= currentCrop.topDressing1 ? 'bg-emerald-600 text-white scale-110' : 'bg-green-50 text-emerald-200'}`}>
                            {currentCrop.topDressing1}일
                          </div>
                        </div>
                      )}
                      {currentCrop.topDressing2 && (
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-emerald-300 uppercase tracking-tighter mb-1">2차 (웃거름)</span>
                          <div className={`w-7 h-5 rounded-2xl flex items-center justify-center font-black text-[8px] shadow-sm transition-all ${currentSchedule?.dDay! >= currentCrop