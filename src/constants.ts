
import { MasterCrop, RegionType, PlantingMethod } from './types';

export const REGION_OFFSETS: Record<RegionType, number> = {
  [RegionType.NORTH]: 10,
  [RegionType.CENTRAL]: 0,
  [RegionType.SOUTH]: -10,
};

export const MASTER_CROPS: MasterCrop[] = [
  // --- 기존 봄 작물 ---
  {
    id: 'potato',
    name: '감자',
    type: '3월 중순 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 15,
    growthDays: 100,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '3월 초·중순에 심어두면 딱 좋습니다. 싹이 트기까지 2~3주가 걸리므로 미리 심으세요.',
    tempInfo: {
      germination: '5 °C 이상',
      growth: '15~20 °C',
      characteristic: '25 °C 이상이면 알뿌리 형성이 정지되므로 주의하세요'
    },
    topDressing1: 30,
    topDressing2: 50,
    fertilizerTip: '싹이 10~15cm 자랐을 때 1차 웃거름을 주며 북주기를 병행하세요.',
    careSteps: [{ daysAfter: 30, action: '북주기', description: '흙을 덮어 감자 노출을 방지합니다.' }],
    commonPests: ['역병', '진딧물'],
    preventionTip: '씨감자 심을 때 소독된 칼 사용, 물 빠짐 좋은 흙 조성',
    emergencyAction: '역병 증상 시 즉시 살균제 살포 및 병든 포기 제거',
    nutrientDeficiency: '질소 부족 시 잎이 노랗게 변함'
  },
  {
    id: 'pea',
    name: '완두콩',
    type: '3월 초 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 5,
    growthDays: 75,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '3월 초 파종 추천. 추위에 강해 일찍 심을 수 있는 덩굴 작물입니다. 지주대 설치가 필수입니다.',
    tempInfo: {
      germination: '2~5 °C',
      growth: '15~20 °C',
      characteristic: '추위에 매우 강함, 25 °C 이상은 싫어함'
    },
    topDressing1: 30,
    fertilizerTip: '꽃이 피기 시작할 때 웃거름을 주면 꼬투리가 튼실해집니다.',
    careSteps: [{ daysAfter: 25, action: '지주대 설치', description: '덩굴이 타고 올라갈 지지대를 세워줍니다.' }],
    commonPests: ['진딧물', '굴파리'],
    preventionTip: '통풍이 잘 되도록 관리하고 과습을 피하세요.'
  },
  {
    id: 'spinach',
    name: '시금치',
    type: '3월 초 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 5,
    growthDays: 45,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '영하의 날씨도 잘 견디는 "추위 대장"입니다. 짧은 기간에 수확 가능합니다.',
    tempInfo: {
      germination: '4 °C 이상',
      growth: '15~20 °C',
      characteristic: '25 °C 이상부터 꽃대가 올라옴(추동)'
    },
    topDressing1: 20,
    fertilizerTip: '성장이 빠르므로 밑거름을 충분히 하고 필요시 액비를 연하게 줍니다.',
    careSteps: [{ daysAfter: 15, action: '솎아주기', description: '빽빽한 곳을 솎아내어 성장을 돕습니다.' }],
    commonPests: ['노균병'],
    preventionTip: '물 빠짐이 좋은 토양에서 재배하세요.'
  },
  {
    id: 'green_onion_seed',
    name: '대파 (씨앗)',
    type: '3월 초 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 5,
    growthDays: 120,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '발아 기간이 길어 일찍 심어두는 게 유리합니다. 인내심이 필요해요.',
    topDressing1: 40,
    topDressing2: 80,
    fertilizerTip: '성장기 내내 비료 요구량이 많습니다. 1~2달 간격으로 웃거름을 주세요.',
    careSteps: [{ daysAfter: 50, action: '북주기', description: '흰 부분을 길게 만들기 위해 흙을 덮어줍니다.' }],
    commonPests: ['고자리파리', '파밤나방'],
    preventionTip: '심기 전 토양 살충제 처리가 효과적입니다.'
  },
  {
    id: 'rapeseed',
    name: '유채',
    type: '3월 초 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 5,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '저온 발아력이 좋아 초봄 직파에 적합합니다. 잎채소로 활용하세요.',
    topDressing1: 30,
    fertilizerTip: '초기 성장이 중요하므로 밑거름에 신경 써주세요.',
    careSteps: [{ daysAfter: 20, action: '솎아 수확', description: '어린 잎을 솎아내어 식탁에 올립니다.' }],
    commonPests: ['벼룩잎벌레'],
    preventionTip: '한랭사를 씌우면 벌레 피해를 줄일 수 있습니다.'
  },
  {
    id: 'fava_bean',
    name: '잠두콩',
    type: '3월 초 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 10,
    growthDays: 90,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '하늘을 향해 자라는 콩입니다. 서늘한 기후를 좋아하며 진딧물 관리가 중요합니다.',
    tempInfo: {
      germination: '5~10 °C',
      growth: '15~20 °C',
      characteristic: '더위에 약해 여름 전에 수확해야 함'
    },
    topDressing1: 40,
    fertilizerTip: '꽃이 필 때 인산, 칼리 성분의 비료를 주면 결실이 좋아집니다.',
    careSteps: [{ daysAfter: 50, action: '순지르기', description: '진딧물이 꼬이는 줄기 끝부분을 잘라냅니다.' }],
    commonPests: ['진딧물'],
    preventionTip: '줄기 끝 순지르기로 진딧물 서식지를 제거하세요.'
  },
  {
    id: 'burdock',
    name: '우엉',
    type: '3월 말 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 25,
    growthDays: 140,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '뿌리가 깊게 들어가므로 밭을 깊게 갈아야 합니다. 향이 좋은 뿌리 채소입니다.',
    tempInfo: {
      germination: '10~15 °C',
      growth: '20~25 °C',
      characteristic: '발아에 빛이 필요한 광발아 종자'
    },
    topDressing1: 60,
    fertilizerTip: '퇴비를 충분히 주되, 미숙 퇴비는 뿌리 갈라짐의 원인이 됩니다.',
    careSteps: [{ daysAfter: 30, action: '솎아주기', description: '포기 간격을 15cm 정도로 맞춰줍니다.' }],
    commonPests: ['진딧물'],
    preventionTip: '초기 성장이 느리므로 잡초 제거를 철저히 하세요.'
  },
  {
    id: 'lettuce_seed',
    name: '상추 (씨앗)',
    type: '3월 중순 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 15,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '3월 중순 직파 가능 (비닐이나 부직포 필요). 겉흙이 마르지 않게 관리하세요.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '25 °C 이상의 고온에서는 발아가 불량함'
    },
    topDressing1: 30,
    fertilizerTip: '본잎이 3~4장 나왔을 때 웃거름을 주면 성장이 빨라집니다.',
    careSteps: [{ daysAfter: 20, action: '보온 덮개 관리', description: '온도가 오르면 낮에는 환기를 시켜줍니다.' }],
    commonPests: ['진딧물'],
    preventionTip: '보온재 내부 습도가 너무 높지 않게 주의하세요.'
  },
  {
    id: 'crown_daisy_seed',
    name: '쑥갓',
    type: '3월 중순 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 15,
    growthDays: 50,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '3월 중순 직파 가능 (비닐이나 부직포 필요). 특유의 향이 일품이며 추위에 강한 편입니다.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '서늘한 기후에서 잎이 연하게 자람'
    },
    topDressing1: 25,
    fertilizerTip: '밑거름을 충분히 하고 성장기에는 수분을 일정하게 유지하세요.',
    careSteps: [{ daysAfter: 15, action: '보온 확인', description: '서리 피해를 입지 않도록 덮개를 잘 고정합니다.' }],
    commonPests: ['총채벌레'],
    preventionTip: '주변 잡초를 제거하여 벌레 잠복처를 없앱니다.'
  },
  {
    id: 'malva_seed',
    name: '아욱',
    type: '3월 중순 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 15,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '3월 중순 직파 가능 (비닐이나 부직포 필요). 영양이 풍부하며 초봄 파종 시 보온이 필수입니다.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '서늘한 기후에서 잎이 연하게 자람'
    },
    topDressing1: 30,
    fertilizerTip: '비료 성분이 부족하면 잎이 노랗게 변하므로 웃거름을 챙겨주세요.',
    careSteps: [{ daysAfter: 20, action: '솎아주기', description: '간격을 넓혀 잎이 크게 자라도록 합니다.' }],
    commonPests: ['굴파리'],
    preventionTip: '잎에 굴 모양 무늬가 생기면 즉시 해당 잎을 제거하세요.'
  },
  {
    id: 'carrot_seed',
    name: '당근',
    type: '3월 중순 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 15,
    growthDays: 100,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '3월 중순 직파 가능 (비닐이나 부직포 필요). 발아가 느리니 보습 유지에 신경 쓰세요.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '뿌리 작물은 일교차가 적당할 때 잘 자람'
    },
    topDressing1: 40,
    topDressing2: 70,
    fertilizerTip: '뿌리 작물용 복합비료를 사용하면 모양이 예쁘게 자랍니다.',
    careSteps: [{ daysAfter: 30, action: '북주기', description: '당근 머리가 노출되지 않게 흙을 덮어줍니다.' }],
    commonPests: ['뿌리응애'],
    preventionTip: '배수가 잘 되는 모래질 흙에서 가장 잘 자랍니다.'
  },
  {
    id: 'spring_radish_seed',
    name: '봄무',
    type: '3월 중순 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 3,
    basePlantDay: 15,
    growthDays: 70,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '3월 중순 직파 가능 (비닐이나 부직포 필요). 빠르게 자라지만 저온기 꽃대 발생에 주의하세요.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '뿌리 작물은 일교차가 적당할 때 잘 자람'
    },
    topDressing1: 30,
    fertilizerTip: '붕소 성분이 부족하면 속이 검게 변하니 밑거름 시 붕사를 섞어주세요.',
    careSteps: [{ daysAfter: 25, action: '북주기', description: '뿌리 발달을 돕기 위해 흙을 모아줍니다.' }],
    commonPests: ['벼룩잎벌레', '고자리파리'],
    preventionTip: '한랭사와 비닐 멀칭을 병행하면 벌레 차단과 보온에 좋습니다.'
  },
 
  // --- 4월 작물 ---
  {
    id: 'bok_choy',
    name: '청경채',
    type: '4월 초 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 5,
    growthDays: 45,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '성장이 빠르고 벌레가 좋아하는 작물입니다. 한랭사를 씌우면 깨끗하게 키울 수 있습니다.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '서늘한 기후를 좋아하며 더위에 약함'
    },
    topDressing1: 20,
    fertilizerTip: '생육 기간이 짧으므로 밑거름 위주로 하고, 잎색이 연하면 액비를 줍니다.',
    careSteps: [{ daysAfter: 15, action: '솎아주기', description: '포기 사이 통풍이 잘 되도록 솎아냅니다.' }],
    commonPests: ['벼룩잎벌레', '청벌레'],
    preventionTip: '파종 직후 한랭사를 씌워 해충 접근을 막으세요.'
  },
  {
    id: 'lettuce_seedling',
    name: '상추 (모종)',
    type: '봄 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 10,
    growthDays: 45,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '겉잎부터 차례로 수확하는 대중적인 작물입니다.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '서늘한 기후 좋아함, 25도 이상 시 쓴맛 증가'
    },
    topDressing1: 20,
    fertilizerTip: '본잎 4~5장 때 요소 비료를 연하게 주면 성장이 빠릅니다.',
    careSteps: [{ daysAfter: 15, action: '첫 수확', description: '겉잎부터 따기 시작합니다.' }],
    commonPests: ['노균병', '달팽이'],
    preventionTip: '과습 주의, 통풍이 잘 되도록 밀식 방지',
    emergencyAction: '달팽이 발생 시 유인제 사용 또는 수동 제거',
  },
  {
    id: 'kidney_bean',
    name: '강낭콩',
    type: '4월 중순 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 15,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '키가 작은 왜성종은 지지대가 필요 없어 키우기 쉽습니다. 장마 전에 수확합니다.',
    tempInfo: {
      germination: '20~25 °C',
      growth: '10~25 °C',
      characteristic: '저온에 약하므로 서리가 끝난 후 파종'
    },
    topDressing1: 30,
    fertilizerTip: '콩과 식물은 질소를 스스로 고정하므로 질소 비료는 적게 줍니다.',
    careSteps: [{ daysAfter: 20, action: '북주기', description: '바람에 쓰러지지 않도록 뿌리 쪽에 흙을 모아줍니다.' }],
    commonPests: ['노린재'],
    preventionTip: '꼬투리가 생길 때 노린재 방제를 철저히 하세요.'
  },
  {
    id: 'taro',
    name: '토란',
    type: '4월 중순 (씨토란)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 15,
    growthDays: 160,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '물을 매우 좋아하는 작물입니다. 습한 곳에서도 잘 자라며 알토란 같은 수확의 기쁨을 줍니다.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '25~30 °C',
      characteristic: '고온 다습한 환경을 좋아함'
    },
    topDressing1: 60,
    topDressing2: 90,
    fertilizerTip: '생육 기간이 길어 밑거름과 웃거름 모두 충분히 주어야 합니다.',
    careSteps: [{ daysAfter: 60, action: '북주기', description: '알토란이 굵어지도록 흙을 덮어줍니다.' }],
    commonPests: ['박각시나방'],
    preventionTip: '큰 잎을 갉아먹는 애벌레를 주의 깊게 관찰하세요.'
  },
  {
    id: 'parsley',
    name: '파슬리',
    type: '4월 중순 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 20,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '비타민이 풍부한 허브입니다. 겉잎을 수확하면 안쪽에서 새 잎이 계속 나옵니다.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '서늘하고 습한 환경을 좋아함'
    },
    topDressing1: 30,
    fertilizerTip: '잎을 계속 수확하므로 2~3주 간격으로 액비를 주면 좋습니다.',
    careSteps: [{ daysAfter: 40, action: '수확 시작', description: '바깥쪽 잎부터 줄기째 따냅니다.' }],
    commonPests: ['호랑나비 애벌레'],
    preventionTip: '애벌레가 보이면 즉시 잡아주세요.'
  },
  {
    id: 'yam',
    name: '마',
    type: '4월 하순 (씨마)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 25,
    growthDays: 180,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '덩굴성 작물로 지주대나 유인망이 필요합니다. 물 빠짐이 좋은 깊은 흙에서 잘 자랍니다.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '20~25 °C',
      characteristic: '초기 성장이 느리나 여름철에 왕성함'
    },
    topDressing1: 60,
    fertilizerTip: '퇴비를 충분히 주고, 7월경 1차 웃거름을 줍니다.',
    careSteps: [{ daysAfter: 30, action: '유인망 설치', description: '덩굴이 타고 올라갈 망을 설치합니다.' }],
    commonPests: ['잎벌레'],
    preventionTip: '배수가 나쁘면 뿌리가 썩을 수 있습니다.'
  },
  {
    id: 'cabbage',
    name: '양배추',
    type: '4월 말 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 25,
    growthDays: 70,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '벌레가 매우 좋아하는 작물입니다. 결구(속이 차는 것)를 위해 꾸준한 물 주기가 필요합니다.',
    tempInfo: {
      germination: '15~30 °C',
      growth: '15~20 °C',
      characteristic: '서늘한 기후를 좋아하며 25도 이상은 힘들어함'
    },
    topDressing1: 20,
    topDressing2: 40,
    fertilizerTip: '결구가 시작될 때 물과 비료가 가장 많이 필요합니다.',
    careSteps: [{ daysAfter: 15, action: '한랭사 확인', description: '나비가 알을 낳지 못하게 틈새를 막습니다.' }],
    commonPests: ['배추흰나비 애벌레', '진딧물'],
    preventionTip: '한랭사 설치 필수, 수시로 잎 뒷면의 알 제거'
  },
  {
    id: 'tomato_seedling',
    name: '토마토',
    type: '4월 말 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 25,
    growthDays: 90,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '서리가 끝난 4월 말~5월 초에 심습니다. 곁순 제거가 필수입니다.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '20~25 °C',
      characteristic: '강한 햇빛과 건조한 기후를 좋아함'
    },
    topDressing1: 35,
    topDressing2: 55,
    fertilizerTip: '첫 화방 착과 시 웃거름을 시작하며 칼륨(가리) 성분으로 당도를 높이세요.',
    careSteps: [{ daysAfter: 20, action: '곁순 따기', description: '본줄기와 가지 사이의 새순을 제거합니다.' }],
    commonPests: ['배꼽썩음병', '잎곰팡이병'],
    preventionTip: '수시로 곁순 제거로 통풍 확보, 일정한 수분 공급 유지',
    emergencyAction: '배꼽썩음 증상 시 즉시 칼슘 비료 보충',
    nutrientDeficiency: '칼슘 부족 시 열매 밑부분이 검게 썩음'
  },
  {
    id: 'pepper_seedling',
    name: '고추',
    type: '4월 말 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 28,
    growthDays: 120,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '냉해에 약해 늦서리가 지난 후(4월 말 이후) 심어야 합니다. 지지대가 필수입니다.',
    tempInfo: {
      germination: '28~30 °C',
      growth: '25~30 °C',
      characteristic: '고온성 작물로 늦서리 피해 주의'
    },
    topDressing1: 30,
    topDressing2: 60,
    fertilizerTip: '첫 열매 착과 시 1차 웃거름을 주며, 이후 30일 간격으로 복합비료 처방',
    careSteps: [{ daysAfter: 15, action: '지지대 설치', description: '바람에 쓰러지지 않게 고정합니다.' }],
    commonPests: ['탄저병', '진딧물', '총채벌레'],
    preventionTip: '장마 전 탄저병 예방제 살포, 습도가 80% 이상 지속될 때 "탄저병 발생 위험이 높습니다',
    emergencyAction: '난황유(계란노른자+식용유) 살포 또는 친환경 살충제 사용',
    nutrientDeficiency: '칼슘 결핍 시 열매 끝이 썩으므로 칼슘제 엽면시비 권장'
  },
  {
    id: 'cucumber_seedling',
    name: '오이',
    type: '4월 말 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 25,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '성장이 매우 빠르며 물을 많이 필요로 합니다. 덩굴손이 나오면 유인망을 설치하세요.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '20~25 °C',
      characteristic: '수분 요구도가 높고 뿌리가 얕게 뻗음'
    },
    topDressing1: 25,
    topDressing2: 45,
    fertilizerTip: '오이가 달리기 시작하면 비료 요구량이 급증하므로 2주 간격으로 웃거름을 줍니다.',
    careSteps: [
      { daysAfter: 15, action: '유인망 설치', description: '덩굴이 타고 올라갈 그물을 설치합니다.' },
      { daysAfter: 35, action: '아랫잎 제거', description: '통풍을 위해 늙은 잎을 따줍니다.' }
    ],
    commonPests: ['노균병', '흰가루병'],
    preventionTip: '잎에 물이 튀지 않게 뿌리 쪽으로 물을 주고, 통풍을 좋게 합니다.'
  },
  {
    id: 'pumpkin_seedling',
    name: '호박 (애호박)',
    type: '4월 말 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 25,
    growthDays: 70,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '척박한 땅에서도 잘 자라며 넓은 공간이 필요합니다. 서리가 내리면 죽으므로 늦게 심습니다.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '20~25 °C',
      characteristic: '저온에 약하고 일조량이 중요함'
    },
    topDressing1: 30,
    fertilizerTip: '첫 열매가 달리면 웃거름을 줍니다. 질소질이 너무 많으면 잎만 무성해질 수 있습니다.',
    careSteps: [{ daysAfter: 30, action: '순지르기', description: '어미덩굴의 끝을 잘라 아들덩굴을 키웁니다.' }],
    commonPests: ['흰가루병'],
    preventionTip: '잎에 밀가루 뿌린 듯한 증상이 보이면 난황유나 식초 희석액을 살포하세요.'
  },
  {
    id: 'corn_seedling',
    name: '옥수수',
    type: '4월 말 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 25,
    growthDays: 90,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '키가 크고 비료를 많이 먹습니다. 수정이 잘 되도록 2줄 이상 모아서 심어주세요.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '25~30 °C',
      characteristic: '고온성 작물, 10 °C 이하 성장 멈춤'
    },
    topDressing1: 30,
    topDressing2: 50,
    fertilizerTip: '키가 무릎 정도 자랐을 때 1차, 개꼬리(수꽃)가 나올 때 2차 웃거름을 줍니다.',
    careSteps: [
      { daysAfter: 30, action: '곁가지 제거', description: '원줄기 성장을 위해 뿌리 쪽 곁눈을 따줍니다.' },
      { daysAfter: 40, action: '북주기', description: '쓰러짐 방지를 위해 뿌리 쪽에 흙을 두툼하게 덮어줍니다.' }
    ],
    commonPests: ['조명나방', '진딧물'],
    preventionTip: '수염이 나올 때 나방 애벌레가 침투하므로 미리 방제하세요.',
    nutrientDeficiency: '질소 부족 시 잎이 노랗게 변함'
  },
  {
    id: 'eggplant_seedling',
    name: '가지',
    type: '4월 말 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 30,
    growthDays: 70,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '추위에 매우 약해 5월 초 안전하게 심는 것이 좋습니다. 물과 비료를 매우 좋아합니다.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '22~30 °C',
      characteristic: '고온성 작물, 17 °C 이하에서는 성장 멈춤'
    },
    topDressing1: 25,
    topDressing2: 50,
    fertilizerTip: '비료를 많이 먹는 작물입니다. 열매 수확 후 꾸준히 웃거름을 챙겨주세요.',
    careSteps: [{ daysAfter: 20, action: '첫 꽃 제거', description: '나무를 키우기 위해 첫 꽃은 따줍니다.' }],
    commonPests: ['응애', '이십팔점박이무당벌레'],
    preventionTip: '잎 뒷면을 자주 확인하고, 감자밭 근처에 심지 마세요.'
  },
  {
    id: 'ginger',
    name: '생강',
    type: '4월 말 (씨생강)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 4,
    basePlantDay: 30,
    growthDays: 160,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '발아까지 한 달 이상 걸립니다. 반그늘에서도 잘 자라며 가을 서리 내리기 전 수확합니다.',
    tempInfo: {
      germination: '20~30 °C',
      growth: '25~30 °C',
      characteristic: '고온 다습을 좋아하나 직사광선엔 약함'
    },
    topDressing1: 70,
    fertilizerTip: '7~8월 뿌리가 굵어지는 시기에 웃거름을 주고 흙을 덮어줍니다.',
    careSteps: [{ daysAfter: 60, action: '북주기', description: '뿌리가 노출되지 않게 흙을 덮어줍니다.' }],
    commonPests: ['뿌리썩음병'],
    preventionTip: '연작(이어짓기)을 피하고 배수에 신경 쓰세요.'
  },
  // --- 5월 작물 ---
  {
    id: 'sweet_potato_seedling',
    name: '고구마',
    type: '5월 초 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 5,
    basePlantDay: 5,
    growthDays: 120,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '5월 초·중순에 심어 서리 내리기 전 수확합니다. 물 빠짐이 좋은 마사토가 적합합니다.',
    tempInfo: {
      germination: '30~33 °C (싹틔우기)',
      growth: '20~30 °C',
      characteristic: '밤 기온 15 °C 이상일 때 심어야 활착이 잘 됨'
    },
    topDressing1: 0, 
    fertilizerTip: '거름기가 많으면 잎만 무성해지므로 밑거름을 적게 하거나 아예 주지 않습니다.',
    careSteps: [{ daysAfter: 40, action: '덩굴 뒤집기', description: '잔뿌리가 내리지 않게 덩굴을 들어줍니다.' }],
    commonPests: ['굼벵이'],
    preventionTip: '심기 전 토양 살충제를 처리하여 굼벵이 피해를 막습니다.'
  },
  {
    id: 'bell_pepper',
    name: '피망(파프리카)',
    type: '5월 초 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 5,
    basePlantDay: 5,
    growthDays: 80,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '고추보다 고온을 좋아합니다. 초기 성장이 느리므로 인내심이 필요합니다.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '25~30 °C',
      characteristic: '고온성 작물, 추위에 매우 약함'
    },
    topDressing1: 30,
    topDressing2: 60,
    fertilizerTip: '열매가 달리면 비료 소모가 많아집니다. 꾸준히 웃거름을 주세요.',
    careSteps: [{ daysAfter: 20, action: '곁순/첫꽃 제거', description: 'Y자 분지 아래의 잎과 첫 꽃을 따줍니다.' }],
    commonPests: ['총채벌레', '담배나방'],
    preventionTip: '꽃 속에 숨은 총채벌레를 잘 관찰하세요.'
  },
  {
    id: 'peanut',
    name: '땅콩',
    type: '5월 초 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 5,
    basePlantDay: 5,
    growthDays: 140,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '꽃이 지고 자방병이 땅속으로 들어가 열매를 맺습니다. 흙이 부드러워야 합니다.',
    tempInfo: {
      germination: '20 °C',
      growth: '25~30 °C',
      characteristic: '고온성 작물, 서리 피해 주의'
    },
    topDressing1: 40,
    fertilizerTip: '석회(칼슘)가 부족하면 빈 껍질이 생기므로 밑거름 시 석회를 꼭 넣으세요.',
    careSteps: [
      { daysAfter: 40, action: '비닐 벗기기', description: '꽃이 핀 후 자방병이 흙에 박히도록 비닐을 찢어줍니다.' }
    ],
    commonPests: ['굼벵이'],
    preventionTip: '토양 살충제를 미리 살포해야 열매 피해를 막을 수 있습니다.'
  },
  {
    id: 'watermelon',
    name: '수박',
    type: '5월 초 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 5,
    basePlantDay: 5,
    growthDays: 90,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '넓은 공간과 많은 햇빛이 필요합니다. 순지르기와 인공수분이 중요합니다.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '25~30 °C',
      characteristic: '고온 건조한 기후를 좋아함'
    },
    topDressing1: 30,
    fertilizerTip: '열매가 주먹만 해졌을 때 웃거름을 주고, 수확 전에는 물을 끊어 당도를 높입니다.',
    careSteps: [
      { daysAfter: 25, action: '순지르기', description: '아들덩굴 2~3개를 키우고 나머지는 제거합니다.' },
      { daysAfter: 40, action: '열매 솎기', description: '한 줄기에 실한 열매 1개만 남깁니다.' }
    ],
    commonPests: ['진딧물', '탄저병'],
    preventionTip: '장마철 배수 관리와 덩굴 통풍에 신경 쓰세요.'
  },
  {
    id: 'korean_melon',
    name: '참외',
    type: '5월 초 (모종)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 5,
    basePlantDay: 5,
    growthDays: 90,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '손자덩굴에서 열매가 맺힙니다. 순지르기가 핵심인 작물입니다.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '25~30 °C',
      characteristic: '고온성 작물, 뿌리가 얕음'
    },
    topDressing1: 30,
    fertilizerTip: '착과 후 비료 요구량이 늘어납니다.',
    careSteps: [{ daysAfter: 25, action: '순지르기', description: '어미덩굴, 아들덩굴 순을 질러 손자덩굴을 유도합니다.' }],
    commonPests: ['흰가루병'],
    preventionTip: '잎에 밀가루 뿌린 듯한 증상이 보이면 난황유를 뿌려주세요.'
  },
  {
    id: 'okra',
    name: '오크라',
    type: '5월 초 (직파/모종)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 5,
    basePlantDay: 10,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '아열대 작물로 더위에 매우 강합니다. 꽃이 예쁘고 열매가 하늘을 향해 자랍니다.',
    tempInfo: {
      germination: '25~30 °C',
      growth: '25~30 °C',
      characteristic: '추위에 매우 약함'
    },
    topDressing1: 30,
    fertilizerTip: '꾸준히 수확하므로 2주 간격으로 웃거름을 줍니다.',
    careSteps: [{ daysAfter: 50, action: '수확', description: '열매가 10cm 정도일 때 수확해야 연합니다.' }],
    commonPests: ['진딧물'],
    preventionTip: '개미가 꼬이면 진딧물을 의심하세요.'
  },
  {
    id: 'perilla',
    name: '들깨(깻잎)',
    type: '5월 중순 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 5,
    basePlantDay: 15,
    growthDays: 40,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '아무 데서나 잘 자라는 생명력 강한 작물입니다. 잎을 수확하려면 순을 자주 질러주세요.',
    tempInfo: {
      germination: '20~25 °C',
      growth: '20~30 °C',
      characteristic: '단일식물로 가을이 되면 꽃이 핌'
    },
    topDressing1: 30,
    fertilizerTip: '잎 수확이 목적이면 질소질 비료를 꾸준히 줍니다.',
    careSteps: [{ daysAfter: 30, action: '순지르기', description: '곁가지를 유도하여 수확량을 늘립니다.' }],
    commonPests: ['들깨잎말이명나방'],
    preventionTip: '잎을 둥글게 말아놓은 곳에 애벌레가 있으니 잡아주세요.'
  },
  {
    id: 'soybean',
    name: '대두콩(메주콩)',
    type: '5월 말 (직파)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 5,
    basePlantDay: 25,
    growthDays: 130,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '새 피해를 막는 것이 중요합니다. 척박한 땅에서도 잘 자랍니다.',
    tempInfo: {
      germination: '20~25 °C',
      growth: '20~30 °C',
      characteristic: '고온을 좋아함'
    },
    topDressing1: 0,
    fertilizerTip: '질소 과다 시 웃자랄 수 있으므로 비료를 거의 주지 않습니다.',
    careSteps: [
      { daysAfter: 15, action: '조류 방지', description: '새가 떡잎을 먹지 못하게 망을 씌웁니다.' },
      { daysAfter: 30, action: '순지르기', description: '본잎 5~7매 때 생장점을 잘라 곁가지를 유도합니다.' }
    ],
    commonPests: ['노린재'],
    preventionTip: '꽃이 피고 꼬투리가 맺힐 때 노린재 방제가 필수입니다.'
  },
  // --- 다년생 및 월동 작물 ---
  {
    id: 'chive_perennial',
    name: '부추',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 15,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '한 번 심으면 계속 수확 가능한 효자 작물입니다.',
    harvestCycle: '잎이 20cm 될 때마다 수시로',
    fertilizerTip: '수확 직후마다 즉시 요소 등 속효성 비료를 주어 재생을 돕습니다.',
    winterCare: '1월에는 지상부 잔재물을 깨끗이 치워 병균 잠복처를 없애주세요.',
    careSteps: [{ daysAfter: 60, action: '첫 수확', description: '잎 끝을 잘라 수확합니다.' }],
    commonPests: ['굴파리', '뿌리응애'],
    preventionTip: '수확 후 영양 보충 철저, 연작 장해 방지를 위한 흙 살리기',
  },
  {
    id: 'asparagus',
    name: '아스파라거스',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 15,
    growthDays: 730, // 2년 후 수확
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '심고 2년 뒤부터 본격 수확이 가능한 인내심 작물입니다.',
    harvestCycle: '매년 4~6월 중순까지',
    fertilizerTip: '이른 봄(3월) 잠깨우기 비료와 수확 종료 후(6월) 감사 비료를 듬뿍 주세요.',
    winterCare: '겨울철 지상부 제거 및 가을철 퇴비 멀칭으로 영양을 보전합니다.',
    careSteps: [{ daysAfter: 365, action: '잠깨우기 비료', description: '겨울 전 퇴비를 듬뿍 줍니다.' }],
    nutrientDeficiency: '다년생은 영양 고갈 방지가 핵심입니다. 매년 충분한 퇴비 공급 필수.'
  },
  {
    id: 'strawberry',
    name: '딸기',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 15,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '멀칭으로 열매가 흙에 닿지 않게 보호합니다.',
    harvestCycle: '매년 5~6월',
    fertilizerTip: '꽃이 필 때(4월) 인산·칼리 위주 비료가 맛과 당도를 좋게 합니다.',
    winterCare: '추운 겨울을 지나야 꽃눈이 생깁니다. 적당한 짚 멀칭만 해주세요.',
    careSteps: [{ daysAfter: 30, action: '짚 깔기', description: '열매 오염을 방지합니다.' }],
    commonPests: ['흰가루병', '응애'],
    preventionTip: '습도 조절 중요, 묵은 잎 제거로 햇빛 확보'
  },
  {
    id: 'garlic',
    name: '마늘',
    type: '가을 (월동)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 10,
    basePlantDay: 20,
    growthDays: 240,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '10월에 심어 겨울을 나고 다음 해 6월에 수확하는 월동 작물입니다.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '겨울철 저온을 겪어야 쪽이 갈라짐'
    },
    topDressing1: 150, // 봄 해동 후 (3월 초)
    topDressing2: 180, // 4월 초
    fertilizerTip: '월동 후 3월과 4월에 웃거름을 주어 구를 키웁니다. 스펀지 마늘 방지를 위해 4월 말 이후엔 비료 금지.',
    careSteps: [
      { daysAfter: 30, action: '보온 덮개', description: '겨울 추위를 막기 위해 비닐이나 볏짚을 덮습니다.' },
      { daysAfter: 200, action: '마늘종 뽑기', description: '영양분 손실을 막기 위해 꽃대를 뽑아줍니다.' }
    ],
    commonPests: ['고자리파리', '뿌리응애'],
    preventionTip: '파종 전 종자 소독과 토양 살충제 처리가 필수입니다.'
  },
  {
    id: 'onion',
    name: '양파',
    type: '가을 (월동)',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 10,
    basePlantDay: 25,
    growthDays: 230,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '10월 말 모종을 심어 겨울을 납니다. 배수가 잘 되는 땅을 좋아합니다.',
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~20 °C',
      characteristic: '고온 장일 조건에서 구가 비대해짐'
    },
    topDressing1: 140, // 3월
    topDressing2: 170, // 4월
    fertilizerTip: '3월 중순부터 4월 중순까지 15일 간격으로 웃거름을 줍니다.',
    careSteps: [{ daysAfter: 120, action: '비닐 걷기/구멍 뚫기', description: '봄에 싹이 비닐 속에 갇히지 않게 꺼내줍니다.' }],
    commonPests: ['고자리파리', '노균병'],
    preventionTip: '습하면 노균병이 오기 쉬우므로 배수 관리에 힘쓰세요.'
  },
  {
    id: 'korean_wheat',
    name: '우리밀 (토종)',
    type: '가을 (월동)',
    method: PlantingMethod.SEED,
    isPerennial: false,
    basePlantMonth: 10,
    basePlantDay: 25,
    growthDays: 235, 
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '10월 하순 파종하여 겨울을 나는 토종 작물입니다. 밟아줄수록 뿌리가 튼튼해지는 강인함을 가졌습니다.',
    tempInfo: {
      germination: '4 °C 이상',
      growth: '15~20 °C',
      characteristic: '추위에 강하며 겨울을 나야 이삭이 팸'
    },
    topDressing1: 130, // 3월 초
    topDressing2: 160, // 4월 초
    fertilizerTip: '월동 직후인 3월 초(재생기)에 웃거름을 주어 성장을 돕습니다.',
    careSteps: [
      { daysAfter: 60, action: '밀밟기(답압)', description: '겨울철 서릿발로 뜬 흙을 밟아 뿌리 건조를 막아줍니다.' },
      { daysAfter: 150, action: '배수로 정비', description: '봄비에 뿌리가 썩지 않도록 물길을 내줍니다.' }
    ],
    commonPests: ['진딧물', '붉은곰팡이병'],
    preventionTip: '습해에 약하므로 배수가 가장 중요합니다.'
  },
    // --- 추가 다년생 작물 ---
  {
    id: 'butterbur',
    name: '머위',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 10,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '그늘지고 습한 곳에서 잘 자라는 다년생 나물입니다. 잎과 줄기를 모두 식용합니다.',
    harvestCycle: '봄부터 초여름까지 수시로',
    fertilizerTip: '봄철 싹이 올라올 때 유기질 비료를 충분히 주면 잎이 크고 연해집니다.',
    careSteps: [{ daysAfter: 30, action: '수분 관리', description: '건조하지 않게 물을 넉넉히 줍니다.' }],
    tempInfo: {
      germination: '15~20 °C',
      growth: '15~23 °C',
      characteristic: '반그늘을 선호하며 더위에 약함'
    }
  },
  {
    id: 'angelica',
    name: '당귀',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 15,
    growthDays: 70,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '특유의 향이 강한 약용 및 식용 작물입니다. 서늘한 기후를 좋아합니다.',
    harvestCycle: '연한 잎을 골라 수시로 수확',
    fertilizerTip: '밑거름을 충분히 하고 수확 후 액비를 연하게 주면 성장이 빠릅니다.',
    careSteps: [{ daysAfter: 45, action: '꽃대 제거', description: '잎 수확이 목적이라면 꽃대를 잘라 영양 손실을 막습니다.' }],
    tempInfo: {
      germination: '20 °C 내외',
      growth: '15~25 °C',
      characteristic: '고온 다습한 여름철 통풍에 주의하세요'
    }
  },
  {
    id: 'korean_mint',
    name: '방아 (배초향)',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 20,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '한국의 허브라 불리는 향신 채소입니다. 생명력이 매우 강하고 번식이 잘 됩니다.',
    harvestCycle: '수확 후 2~3주면 다시 무성해짐',
    fertilizerTip: '수확 후 질소질 비료를 조금씩 주면 계속해서 연한 잎을 얻을 수 있습니다.',
    careSteps: [{ daysAfter: 50, action: '순 지르기', description: '생장점을 잘라주면 옆가지가 많이 나와 수확량이 늘어납니다.' }],
    tempInfo: {
      germination: '20~25 °C',
      growth: '20~30 °C',
      characteristic: '햇빛을 좋아하며 추위에도 비교적 강함'
    }
  },
  {
    id: 'gondre',
    name: '곤드레 (고려엉겅퀴)',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 5,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '나물밥으로 유명한 작물입니다. 한 번 심으면 수년간 수확이 가능합니다.',
    harvestCycle: '봄철 연한 잎을 2~3회 수확',
    fertilizerTip: '매년 봄 싹이 트기 전 퇴비를 두둑하게 올려주면 세력이 좋아집니다.',
    careSteps: [{ daysAfter: 40, action: '멀칭 관리', description: '풀 관리를 위해 짚이나 풀로 덮어주면 좋습니다.' }],
    tempInfo: {
      germination: '18~22 °C',
      growth: '15~25 °C',
      characteristic: '배수가 잘 되는 사질양토를 선호함'
    }
  },
  {
    id: 'jerusalem_artichoke',
    name: '돼지감자',
    type: '다년생',
    method: PlantingMethod.SEED,
    isPerennial: true,
    basePlantMonth: 3,
    basePlantDay: 25,
    growthDays: 180,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '이눌린 성분이 풍부한 건강 작물입니다. 번식력이 매우 강해 경계 관리가 필요합니다.',
    harvestCycle: '서리 내린 후 가을부터 이듬해 봄까지',
    fertilizerTip: '척박한 땅에서도 잘 자라 비료를 많이 줄 필요는 없으나 밑거름은 도움이 됩니다.',
    careSteps: [{ daysAfter: 100, action: '키 조절', description: '너무 높게 자라면 장마철에 쓰러지므로 윗부분을 잘라줍니다.' }],
    tempInfo: {
      germination: '10~15 °C',
      growth: '15~25 °C',
      characteristic: '영하의 기온에서도 땅속에서 잘 견딤'
    }
  },
  // --- 신규 추가 허브 작물 ---
  {
    id: 'peppermint',
    name: '박하',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 5,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '번식력이 매우 강하고 상쾌한 향이 특징입니다. 반그늘에서도 잘 자라며 노지 월동이 가능합니다.',
    harvestCycle: '잎이 풍성해지면 수시로 줄기 끝 수확',
    fertilizerTip: '봄철 싹이 올라올 때 유기질 비료를 주면 잎의 향이 깊어집니다.',
    careSteps: [{ daysAfter: 30, action: '순지르기', description: '생장점을 잘라 곁가지를 유도합니다.' }],
    tempInfo: {
      germination: '20~25 °C',
      growth: '15~25 °C',
      characteristic: '질소 부족 시 잎 색이 연해지고 줄기가 가늘어집니다.'
    }
  },
  {
    id: 'applemint',
    name: '애플민트',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 10,
    growthDays: 60,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '사과 향이 나는 허브로 생명력이 강합니다. 지하경으로 빠르게 번식하며 노지 월동이 가능합니다.',
    harvestCycle: '수확할수록 더 풍성해집니다.',
    fertilizerTip: '수확 후 액비를 조금씩 주면 계속해서 연한 잎이 나옵니다.',
    careSteps: [{ daysAfter: 40, action: '포기나누기', description: '번식이 심하면 화분이나 구역을 나눠줍니다.' }],
    tempInfo: {
      germination: '20~25 °C',
      growth: '15~25 °C',
      characteristic: '마그네슘 부족 시 잎맥 사이가 노랗게 변할 수 있습니다.'
    }
  },
  {
    id: 'lavender',
    name: '라벤더',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 15,
    growthDays: 90,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '배수가 매우 중요하며 햇빛이 잘 드는 건조한 곳을 좋아합니다.',
    harvestCycle: '꽃대가 올라오면 꽃과 함께 수확',
    fertilizerTip: '척박한 땅에서도 잘 자라며, 과한 비료는 오히려 성장에 해롭습니다.',
    careSteps: [{ daysAfter: 60, action: '전지(가지치기)', description: '꽃이 진 후 모양을 잡아주며 잘라줍니다.' }],
    tempInfo: {
      germination: '18~22 °C',
      growth: '15~25 °C',
      characteristic: '칼륨 부족 시 잎 끝이 갈색으로 마를 수 있습니다.'
    }
  },
  {
    id: 'thyme',
    name: '타임(백리향)',
    type: '다년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: true,
    basePlantMonth: 4,
    basePlantDay: 20,
    growthDays: 70,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '과습과 고온을 주의해야 합니다. 낮게 기어 자라는 습성이 있습니다.',
    harvestCycle: '이른 아침에 향이 가장 강할 때 수확',
    fertilizerTip: '이른 봄 유기질 퇴비를 조금 주는 것으로 충분합니다.',
    careSteps: [{ daysAfter: 45, action: '통풍 전지', description: '안쪽의 밀집된 줄기를 솎아줍니다.' }],
    tempInfo: {
      germination: '20 °C 내외',
      growth: '15~20 °C',
      characteristic: '인산 부족 시 성장이 눈에 띄게 느려지고 잎 색이 어두워집니다.'
    }
  },
  {
    id: 'basil',
    name: '바질',
    type: '일년생',
    method: PlantingMethod.SEEDLING,
    isPerennial: false,
    basePlantMonth: 5,
    basePlantDay: 1,
    growthDays: 50,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400',
    description: '고온을 좋아하는 대표적인 여름 허브입니다. 추위에 매우 약합니다.',
    harvestCycle: '잎이 10장 이상 되면 수시로 잎 수확',
    fertilizerTip: '잎을 계속 수확하므로 2주 간격으로 연한 액비를 주면 좋습니다.',
    careSteps: [{ daysAfter: 20, action: '꽃대 제거', description: '꽃이 피기 시작하면 맛이 떨어지므로 즉시 잘라줍니다.' }],
    tempInfo: {
      germination: '20~25 °C',
      growth: '20~30 °C',
      characteristic: '질소가 부족하면 잎이 얇아지고 노랗게 변합니다.'
    }
  }
];
