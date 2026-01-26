
import { RegionType, MasterCrop, UserGardenItem, GardenSchedule } from './types';
import { REGION_OFFSETS } from './constants';

export interface CalendarEvent {
  date: Date;
  action: string;
  cropId: string;
  cropName: string;
  type: 'FERTILIZER' | 'HARVEST' | 'CARE' | 'PLANT';
}

export const calculateSchedule = (
  crop: MasterCrop,
  userRegion: RegionType,
  plantDateStr: string
): GardenSchedule => {
  const plantDate = new Date(plantDateStr);
  
  // Calculate Harvest Date
  const harvestDate = new Date(plantDate);
  harvestDate.setDate(harvestDate.getDate() + crop.growthDays);

  const today = new Date();
  const diffTime = today.getTime() - plantDate.getTime();
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  
  const sortedSteps = [...crop.careSteps].sort((a, b) => a.daysAfter - b.daysAfter);
  const nextStep = sortedSteps.find(step => step.daysAfter > diffDays);

  let nextCare = null;
  if (nextStep) {
    const careDate = new Date(plantDate);
    careDate.setDate(careDate.getDate() + nextStep.daysAfter);
    nextCare = {
      date: careDate,
      action: nextStep.action
    };
  }

  // 비료 알림 및 게이지 계산
  let fertilizerAlert = undefined;
  let fertilizerProgress = undefined;

  if (!crop.isPerennial) {
    // 알림 체크
    if (crop.topDressing1 && Math.abs(diffDays - crop.topDressing1) <= 3) {
      fertilizerAlert = "1차 웃거름 시기";
    } else if (crop.topDressing2 && Math.abs(diffDays - crop.topDressing2) <= 3) {
      fertilizerAlert = "2차 웃거름 시기";
    }

    // 게이지 계산
    if (crop.topDressing1 && diffDays < crop.topDressing1) {
      fertilizerProgress = (diffDays / crop.topDressing1) * 100;
    } else if (crop.topDressing1 && crop.topDressing2 && diffDays < crop.topDressing2) {
      fertilizerProgress = ((diffDays - crop.topDressing1) / (crop.topDressing2 - crop.topDressing1)) * 100;
    } else if (crop.topDressing2 && diffDays >= crop.topDressing2) {
      fertilizerProgress = 100;
    } else if (crop.topDressing1 && !crop.topDressing2 && diffDays >= crop.topDressing1) {
      fertilizerProgress = 100;
    }
  } else {
    // 다년생은 봄철 및 수확기에 맞춰 별도 로직 (단순화)
    if (today.getMonth() === 2) fertilizerAlert = "잠깨우기 비료 시기";
  }

  // 수확 진행률 표기
  const harvestProgress = Math.min(100, (diffDays / crop.growthDays) * 100);

  return {
    harvestDate,
    nextCare,
    dDay: diffDays,
    isHarvestReady: diffDays >= crop.growthDays,
    fertilizerAlert,
    harvestProgress,
    fertilizerProgress
  };
};

export const getFutureEvents = (
  crop: MasterCrop,
  plantDateStr: string
): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const plantDate = new Date(plantDateStr);

  // 심은 날
  events.push({
    date: plantDate,
    action: '심은 날',
    cropId: crop.id,
    cropName: crop.name,
    type: 'PLANT'
  });

  // 수확 예정일
  const harvestDate = new Date(plantDate);
  harvestDate.setDate(harvestDate.getDate() + crop.growthDays);
  events.push({
    date: harvestDate,
    action: '수확 예정일',
    cropId: crop.id,
    cropName: crop.name,
    type: 'HARVEST'
  });

  // 비료 일정
  if (crop.topDressing1) {
    const d1 = new Date(plantDate);
    d1.setDate(d1.getDate() + crop.topDressing1);
    events.push({ date: d1, action: '1차 웃거름', cropId: crop.id, cropName: crop.name, type: 'FERTILIZER' });
  }
  if (crop.topDressing2) {
    const d2 = new Date(plantDate);
    d2.setDate(d2.getDate() + crop.topDressing2);
    events.push({ date: d2, action: '2차 웃거름', cropId: crop.id, cropName: crop.name, type: 'FERTILIZER' });
  }

  // 관리 단계
  crop.careSteps.forEach(step => {
    const d = new Date(plantDate);
    d.setDate(d.getDate() + step.daysAfter);
    events.push({
      date: d,
      action: step.action,
      cropId: crop.id,
      cropName: crop.name,
      type: 'CARE'
    });
  });

  return events;
};

export const isPlantedTooEarly = (
  crop: MasterCrop,
  region: RegionType,
  plantDateStr: string
): boolean => {
  const plantDate = new Date(plantDateStr);
  const regionOffset = REGION_OFFSETS[region];
  const recommendedDate = new Date(plantDate.getFullYear(), crop.basePlantMonth - 1, crop.basePlantDay);
  recommendedDate.setDate(recommendedDate.getDate() + regionOffset);
  return plantDate < recommendedDate;
};
