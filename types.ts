
export enum RegionType {
  NORTH = '북부',
  CENTRAL = '중부',
  SOUTH = '남부'
}

export enum PlantingMethod {
  SEED = 'SEED',           // 씨앗 (직파)
  SEEDLING = 'SEEDLING'    // 모종 (아주심기)
}

export interface CareStep {
  daysAfter: number;
  action: string;
  description: string;
}

export interface MasterCrop {
  id: string;
  name: string;
  type: string;
  isPerennial: boolean;
  method: PlantingMethod;
  basePlantMonth: number;
  basePlantDay: number;
  growthDays: number;
  careSteps: CareStep[];
  image: string;
  description: string;
  // 비료 및 관리 로직 확장
  topDressing1?: number; // 1차 웃거름 (심은 후 일수)
  topDressing2?: number; // 2차 웃거름 (심은 후 일수)
  fertilizerTip?: string;
  winterCare?: string;   // 다년생 겨울 관리
  harvestCycle?: string; // 다년생 수확 주기 (예: "수확 후 즉시")
  // 병해충 및 영양 관리 데이터
  commonPests?: string[];
  preventionTip?: string;
  emergencyAction?: string;
  nutrientDeficiency?: string;
  // 온도 정보 추가
  tempInfo?: {
    germination: string;
    growth: string;
    characteristic: string;
  };
}

export interface UserGardenItem {
  id: string;
  cropId: string;
  plantDate: string; // ISO string
  alarmEnabled: boolean;
  isHarvested?: boolean;
  harvestedAt?: string;
  customImage?: string; // 사용자가 직접 등록/수정한 이미지 (Base64)
}

export interface GardenSchedule {
  harvestDate: Date;
  nextCare: {
    date: Date;
    action: string;
  } | null;
  dDay: number;
  isHarvestReady: boolean;
  fertilizerAlert?: string; // 현재 필요한 비료 알림
  harvestProgress: number; // 0-100 수확 진행률
  fertilizerProgress?: number; // 0-100 다음 비료까지의 진행률
}
