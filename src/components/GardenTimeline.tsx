
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
      'bg-green-500', 'bg-blue-500', 'bg-orange-500', 
      'bg-purple-500', 'bg-red-500', 'bg-amber-500', 
      'bg-cyan-500', 'bg-lime-500'
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
      <div className="bg-white rounded-[32px] border border-slate-100 p-5 shadow-sm animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6 px-1">
          <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h3 className="text-sm font-black text-slate-800 tracking-tight">{year}년 {month + 1}월</h3>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-y-4 text-center">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
            <span key={d} className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{d}</span>
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
      <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-300 border border-slate-100 border-dashed rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-[7px] font-black uppercase tracking-tighter opacity-60">No Photo</span>
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
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
            {filterType === 'PERENNIAL' ? '다년생 밭' : '시즌 텃밭'}
          </h2>
          <div className="flex gap-2 mt-1">
            <button 
              onClick={() => setViewMode('list')}
              className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100'}`}
            >
              List
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all ${viewMode === 'calendar' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100'}`}
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
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border border-slate-100 shadow-sm">
              <span className="text-5xl mb-4">🪴</span>
              <p className="text-sm font-bold text-slate-400">등록된 작물이 없습니다.</p>
              <button onClick={onAddClick} className="mt-4 text-xs font-black text-green-600 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100">
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
                    className={`relative bg-white p-4 rounded-[32px] shadow-sm border border-slate-50 flex flex-col gap-3 active:scale-[0.98] transition-all cursor-pointer group ${item.isHarvested ? 'opacity-40 grayscale' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 relative ring-2 ring-slate-50 group-hover:ring-green-100 transition-all">
                        {renderItemImage(item, crop)}
                        {schedule.fertilizerAlert && !item.isHarvested && (
                          <div className="absolute -top-1 -right-1 bg-blue-500 text-white w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] animate-pulse shadow-sm">🔋</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0 flex-1 pr-2">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={(e) => handleDeleteTrigger(e, item.id)}
                                className="p-1 text-slate-300 hover:text-red-500 transition-all flex-shrink-0"
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
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider truncate">
                              {crop.isPerennial 
                                ? calculateYears(item.plantDate) 
                                : `${schedule.harvestDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })} 수확 예정`}
                            </p>
                          </div>
                          {!crop.isPerennial ? (
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg flex-shrink-0 ${schedule.isHarvestReady ? 'bg-green-100 text-green-700' : 'bg-slate-50 text-slate-400'}`}>
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
                          <span className="text-slate-400 uppercase tracking-widest">성장 및 관리 현황</span>
                          <span className="text-green-600 font-bold">{Math.round(schedule.harvestProgress)}%</span>
                        </div>
                        
                        <div className="relative h-3 w-full bg-slate-100 rounded-full flex items-center">
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ease-out ${schedule.fertilizerAlert ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}
                            style={{ width: `${schedule.harvestProgress}%` }}
                          />
                          
                          {/* 비료 타이밍 (원형 점 마커) */}
                          {!crop.isPerennial && (
                            <div className="absolute inset-0 pointer-events-none flex items-center">
                              {crop.topDressing1 && (
                                <div 
                                  className={`absolute w-2 h-2 rounded-full border border-white shadow-sm z-10 transition-colors ${schedule.dDay >= crop.topDressing1 ? 'bg-blue-600' : 'bg-slate-300'}`}
                                  style={{ left: `${(crop.topDressing1 / crop.growthDays) * 100}%`, transform: 'translateX(-50%)' }}
                                />
                              )}
                              {crop.topDressing2 && (
                                <div 
                                  className={`absolute w-2 h-2 rounded-full border border-white shadow-sm z-10 transition-colors ${schedule.dDay >= crop.topDressing2 ? 'bg-blue-600' : 'bg-slate-300'}`}
                                  style={{ left: `${(crop.topDressing2 / crop.growthDays) * 100}%`, transform: 'translateX(-50%)' }}
                                />
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center pt-0.5">
                          {schedule.fertilizerAlert ? (
                            <span className="text-[9px] font-black text-blue-600 animate-pulse">✨ {schedule.fertilizerAlert}!</span>
                          ) : (
                            <span className="text-[9px] font-bold text-slate-300">
                              {schedule.isHarvestReady ? '수확 가능' : `${remainingDays}일 뒤 수확`}
                            </span>
                          )}
                          {!crop.isPerennial && (crop.topDressing1 || crop.topDressing2) && (
                            <div className="flex items-center gap-1.5 opacity-80">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm"></div>
                              <span className="text-[9px] text-blue-600 font-black tracking-tighter uppercase">비료 타이밍</span>
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedItem(null)}>
          <div className="w-full max-w-md bg-white rounded-t-[40px] shadow-2xl px-6 pt-2 pb-10 animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6 sticky top-0 bg-white py-1"></div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter">
                  {currentCrop.name}
                </h3>
                <button 
                  onClick={(e) => handleDeleteTrigger(e, selectedItem.id)}
                  className="p-1.5 text-slate-300 hover:text-red-600 transition-all active:scale-125 cursor-pointer z-20 flex items-center justify-center bg-slate-50 rounded-full shadow-sm"
                  title="삭제"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <span className="text-[9px] font-black bg-slate-100 text-slate-400 px-2.5 py-0.5 rounded-full uppercase tracking-widest mt-1">
                {currentCrop.isPerennial ? 'PERENNIAL' : 'SEASONAL'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="relative group cursor-pointer" onClick={handleImageClick}>
                <div className="w-full h-48 rounded-3xl overflow-hidden border-2 border-slate-50 shadow-inner flex items-center justify-center bg-slate-50">
                  {selectedItem.customImage ? (
                    <img src={selectedItem.customImage} alt={currentCrop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <div className="bg-white p-5 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">나만의 작물 사진 등록</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 1. 권장 수확일 */}
              {currentSchedule && !currentCrop.isPerennial && (
                <div className="p-5 bg-green-50/40 rounded-3xl border border-green-100/30 text-center relative overflow-hidden">
                  <h4 className="text-[10px] font-black text-green-700 uppercase mb-2 tracking-widest flex items-center justify-center gap-1">
                    <span className="text-sm">🧺</span> 권장 수확일
                  </h4>
                  <p className="text-lg font-black text-green-900 leading-tight">
                    {currentSchedule.harvestDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-[10px] text-green-600 font-bold mt-1 opacity-70">
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
              <div className="p-5 bg-blue-50/40 rounded-3xl border border-blue-100/30">
                <h4 className="text-[10px] font-black text-blue-700 uppercase mb-2 tracking-widest flex items-center justify-center gap-1">
                  <span className="text-sm">🔋</span> 비료 & 영양 가이드
                </h4>
                <p className="text-xs text-blue-900 font-bold leading-relaxed text-center px-2">
                  {currentCrop.fertilizerTip}
                </p>
                {!currentCrop.isPerennial && (currentCrop.topDressing1 || currentCrop.topDressing2) && (
                  <div className="mt-4 flex flex-col gap-2 items-center">
                    <div className="flex items-center gap-4">
                      {currentCrop.topDressing1 && (
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">1차 (웃거름)</span>
                          <div className={`w-8 h-5 rounded-2xl flex items-center justify-center font-black text-[10px] shadow-sm transition-all ${currentSchedule?.dDay! >= currentCrop.topDressing1 ? 'bg-blue-600 text-white scale-110' : 'bg-slate-100 text-slate-400'}`}>
                            {currentCrop.topDressing1}일
                          </div>
                        </div>
                      )}
                      {currentCrop.topDressing2 && (
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">2차 (웃거름)</span>
                          <div className={`w-8 h-5 rounded-2xl flex items-center justify-center font-black text-[10px] shadow-sm transition-all ${currentSchedule?.dDay! >= currentCrop.topDressing2 ? 'bg-blue-600 text-white scale-110' : 'bg-slate-100 text-slate-400'}`}>
                            {currentCrop.topDressing2}일
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. 재배 적정 온도 */}
              {currentCrop.tempInfo && (
                <div className="p-5 bg-orange-50/40 rounded-3xl border border-orange-100/30">
                  <h4 className="text-[10px] font-black text-orange-700 uppercase mb-3 tracking-widest flex items-center justify-center gap-1">
                    <span className="text-sm">🌡️</span> 재배 적정 온도
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 font-bold">발아온도</span>
                      <span className="text-slate-900 font-black">{currentCrop.tempInfo.germination}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 font-bold">생육온도</span>
                      <span className="text-slate-900 font-black">{currentCrop.tempInfo.growth}</span>
                    </div>
                    <div className="pt-2 border-t border-orange-100/50">
                      <span className="text-[10px] font-bold text-orange-800 leading-tight block">
                        💡 {currentCrop.tempInfo.characteristic}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5 px-1 pt-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">심은 날짜 수정</label>
                <input 
                  type="date"
                  defaultValue={new Date(selectedItem.plantDate).toISOString().split('T')[0]}
                  onChange={(e) => onUpdatePlantDate(selectedItem.id, e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 focus:border-green-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm font-black transition-all outline-none"
                />
              </div>

              <div className="flex gap-2 pt-6 sticky bottom-0 bg-white py-2">
                <button 
                  onClick={() => { onToggleHarvest(selectedItem.id); setSelectedItem(null); }}
                  className={`flex-1 py-3.5 rounded-xl font-black text-sm transition-all active:scale-95 ${selectedItem.isHarvested ? 'bg-slate-100 text-slate-400' : 'bg-green-600 text-white shadow-lg shadow-green-100/50'}`}
                >
                  {selectedItem.isHarvested ? '완료취소' : '수확 완료'}
                </button>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 py-3.5 bg-slate-100 text-slate-500 rounded-xl font-black text-sm hover:bg-slate-200 transition-colors active:scale-95"
                >
                  창 닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6" onClick={() => setDeleteConfirmId(null)}>
          <div className="w-full max-w-[280px] bg-white rounded-[32px] shadow-2xl p-6 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h4 className="text-center font-black text-slate-900 text-lg tracking-tight mb-2">작물 삭제</h4>
            <p className="text-center text-slate-500 text-xs font-bold leading-relaxed mb-6">
              정말 이 작물을 삭제하시겠습니까?<br/>재배 기록이 모두 사라집니다.
            </p>
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleConfirmDelete}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-black text-sm shadow-lg shadow-red-200 active:scale-95 transition-all"
              >
                삭제하기
              </button>
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="w-full py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-sm active:scale-95 transition-all"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default GardenTimeline;
