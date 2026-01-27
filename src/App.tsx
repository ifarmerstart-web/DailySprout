
import React, { useState, useEffect } from 'react';
import { RegionType, UserGardenItem } from '@/types';
import { MASTER_CROPS } from '@/constants';
import RegionSelector from '@/components/RegionSelector';
import GardenTimeline from '@/components/GardenTimeline';
import CropRecommendation from '@/components/CropRecommendation';
import GuideTab from '@/components/GuideTab';
import AdMobBanner from '@/AdMobBanner';

const App: React.FC = () => {
  const [region, setRegion] = useState<RegionType | null>(() => {
    const saved = localStorage.getItem('user_region');
    return saved ? (saved as RegionType) : null;
  });
  
  const [garden, setGarden] = useState<UserGardenItem[]>(() => {
    const saved = localStorage.getItem('user_garden');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState<'season' | 'perennial' | 'calendar' | 'settings'>('season');
  const [recommendationFilter, setRecommendationFilter] = useState<'ALL' | 'ANNUAL' | 'PERENNIAL'>('ALL');
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  useEffect(() => {
    if (region) localStorage.setItem('user_region', region);
  }, [region]);

  useEffect(() => {
    localStorage.setItem('user_garden', JSON.stringify(garden));
  }, [garden]);

  const addCropToGarden = (cropId: string) => {
    const newItem: UserGardenItem = {
      
      id: Math.random().toString(36).substr(2, 9),
      cropId,
      plantDate: new Date().toISOString(),
      alarmEnabled: true,
      isHarvested: false,
    };
    setGarden([...garden, newItem]);
    const crop = MASTER_CROPS.find(c => c.id === cropId);
    setActiveTab(crop?.isPerennial ? 'perennial' : 'season');
  };

  const removeCropFromGarden = (id: string) => setGarden(garden.filter(item => item.id !== id));

  const toggleHarvest = (id: string) => {
    setGarden(garden.map(item => {
      if (item.id === id) {
        const becomingHarvested = !item.isHarvested;
        return { 
          ...item, 
          isHarvested: becomingHarvested,
          harvestedAt: becomingHarvested ? new Date().toISOString() : undefined
        };
      }
      return item;
    }));
  };

  const updatePlantDate = (id: string, newDate: string) => {
    setGarden(garden.map(item => 
      item.id === id ? { ...item, plantDate: new Date(newDate).toISOString() } : item
    ));
  };

  const updateCropImage = (id: string, imageData: string) => {
    setGarden(garden.map(item => 
      item.id === id ? { ...item, customImage: imageData } : item
    ));
  };

  const handleRegionChange = (newRegion: RegionType) => {
    setRegion(newRegion);
    setIsRegionModalOpen(false);
  };

  if (!region) return <RegionSelector onSelect={setRegion} />;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col pb-24 shadow-2xl relative">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md px-6 py-4 sticky top-0 z-20 flex justify-between items-center border-b border-slate-100">
        <div>
          <h1 className="text-xl font-black text-green-700 tracking-tighter">나만의 작은 텃밭</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {region === RegionType.NORTH ? 'Northern' : region === RegionType.SOUTH ? 'Southern' : 'Central'} District
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {activeTab === 'season' && (
          <GardenTimeline 
            garden={garden} 
            region={region} 
            filterType="ANNUAL"
            onRemove={removeCropFromGarden}
            onToggleHarvest={toggleHarvest}
            onUpdatePlantDate={updatePlantDate}
            onUpdateCropImage={updateCropImage}
            onAddClick={() => {
              setRecommendationFilter('ANNUAL');
              setActiveTab('calendar');
            }}
          />
        )}
        {activeTab === 'perennial' && (
          <GardenTimeline 
            garden={garden} 
            region={region} 
            filterType="PERENNIAL"
            onRemove={removeCropFromGarden}
            onToggleHarvest={toggleHarvest}
            onUpdatePlantDate={updatePlantDate}
            onUpdateCropImage={updateCropImage}
            onAddClick={() => {
              setRecommendationFilter('PERENNIAL');
              setActiveTab('calendar');
            }}
          />
        )}
        {activeTab === 'calendar' && (
          <CropRecommendation 
            region={region} 
            onAdd={addCropToGarden} 
            filter={recommendationFilter}
          />
        )}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-green-100">
              <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-700/60">내 지역</span>
                  <button 
                    onClick={() => setIsRegionModalOpen(true)}
                    className="text-[14px] font-black text-slate-900 hover:text-green-700 transition-colors bg-orange-50/80 px-3 py-1 rounded-full active:scale-95"
                  >
                    (변경)
                  </button>
                </div>
                <span className="text-lg font-black text-green-900 bg-white px-3 py-1 rounded-lg border border-green-100 shadow-sm">{region} 지방</span>
              </div>
            </div>
            <GuideTab />
          </div>
        )}
      </main>

      {/* Region Update Modal */}
      {isRegionModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setIsRegionModalOpen(false)}>
          <div className="w-full max-w-md bg-white rounded-t-[40px] shadow-2xl p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight text-center">지역 변경하기</h3>
            <p className="text-slate-500 text-center mb-8 text-xs font-bold leading-relaxed">
              변경한 지역에 맞춰 권장 재배 일정과<br/>수확 예정일이 자동으로 업데이트됩니다.
            </p>
            
            <div className="space-y-3 mb-6">
              <RegionOption 
                title="북부 지방" 
                desc="경기 북부, 강원 등 (서늘한 기후)" 
                active={region === RegionType.NORTH}
                onClick={() => handleRegionChange(RegionType.NORTH)} 
                color="bg-blue-50"
              />
              <RegionOption 
                title="중부 지방" 
                desc="서울, 경기 남부, 충청 (기준점)" 
                active={region === RegionType.CENTRAL}
                onClick={() => handleRegionChange(RegionType.CENTRAL)} 
                color="bg-yellow-50"
              />
              <RegionOption 
                title="남부 지방" 
                desc="전라, 경상, 제주 (따뜻한 기후)" 
                active={region === RegionType.SOUTH}
                onClick={() => handleRegionChange(RegionType.SOUTH)} 
                color="bg-orange-50"
              />
            </div>
            
            <button 
              onClick={() => setIsRegionModalOpen(false)}
              className="w-full py-3.5 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm active:scale-95 transition-all"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 py-4 flex justify-around items-center z-30 max-w-md mx-auto rounded-t-[40px] shadow-2xl">
        <NavButton active={activeTab === 'season'} icon="🌱" label="시즌" onClick={() => setActiveTab('season')} />
        <NavButton active={activeTab === 'perennial'} icon="♾️" label="다년생" onClick={() => setActiveTab('perennial')} />
        <NavButton active={activeTab === 'calendar'} icon="📅" label="작물" onClick={() => {
          setRecommendationFilter('ALL');
          setActiveTab('calendar');
        }} />
        <NavButton active={activeTab === 'settings'} icon="⚙️" label="정보" onClick={() => setActiveTab('settings')} />
      </nav>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

const RegionOption = ({ title, desc, active, onClick, color }: { title: string, desc: string, active: boolean, onClick: () => void, color: string }) => (
  <button 
    onClick={onClick}
    className={`w-full ${color} p-4 rounded-3xl border-2 transition-all flex justify-between items-center ${active ? 'border-green-500 ring-4 ring-green-50' : 'border-transparent opacity-60 hover:opacity-100'}`}
  >
    <div className="text-left">
      <span className="font-black text-slate-800 text-sm block">{title}</span>
      <span className="text-[12px] text-slate-500 font-bold">{desc}</span>
    </div>
    {active && <span className="bg-green-500 text-white p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>}
  </button>
);

const NavButton = ({ active, icon, label, onClick }: { active: boolean, icon: string, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'scale-110' : 'opacity-40 grayscale'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className={`text-[12px] font-black uppercase tracking-tighter ${active ? 'text-green-700' : 'text-slate-400'}`}>
      {label}
    </span>
  </button>
);

const RegionOption = ({ title, desc, active, onClick, color }: { title: string, desc: string, active: boolean, onClick: () => void, color: string }) => (
  <button onClick={onClick} className={`w-full ${color} p-4 rounded-3xl border-2 transition-all flex justify-between items-center ${active ? 'border-green-500 ring-4 ring-green-50' : 'border-transparent opacity-60 hover:opacity-100'}`}>
    <div className="text-left">
      <span className="font-black text-slate-800 text-sm block">{title}</span>
      <span className="text-[12px] text-slate-500 font-bold">{desc}</span>
    </div>
    {active && <span className="bg-green-500 text-white p-1 rounded-full">✓</span>}
  </button>
);

export default App;
