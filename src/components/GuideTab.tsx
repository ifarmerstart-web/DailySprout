
import React, { useState } from 'react';

interface GuideContent {
  title: string;
  emoji: string;
  color: string;
  details: React.ReactNode;
}

interface PestInfo {
  name: string;
  season: string;
  desc: string;
  image: string;
  details: React.ReactNode;
}

const FARMER_GUIDES: GuideContent[] = [
  {
    title: "흙 만들기",
    emoji: "🪴",
    color: "bg-orange-50",
    details: (
      <div className="space-y-6">
        <section>
          <h5 className="text-sm font-black text-orange-700 mb-2 flex items-center gap-2">
            <span className="bg-orange-100 px-2 py-0.5 rounded text-[10px]">POINT 1</span>
            [토양 관리] 좋은 땅이 좋은 수확을 만든다
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            씨앗을 심기 전, 작물이 뿌리내릴 환경을 조성하는 것이 농사의 80%입니다.
          </p>
        </section>

        <section>
          <h5 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-2">
            퇴비와 가스 빼기
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            심기 최소 2주 전에 퇴비를 뿌리고 흙과 섞어주세요. 퇴비가 분해될 때 발생하는 가스는 어린뿌리를 태우고 해충(고자리파리 등)을 부릅니다.
          </p>
        </section>

        <section>
          <h5 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-2">
            배수와 통기성
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            물이 고이면 뿌리가 썩습니다. 흙을 한 뼘 정도 높게 쌓아 <strong>두둑</strong>을 만들면 물 빠짐이 좋아지고 뿌리가 숨쉬기 편해집니다.
          </p>
        </section>

        <section>
          <h5 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-2">
            산도(pH) 조절
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            대부분의 작물은 중성 토양을 좋아합니다. 산성비 등으로 산성화된 땅에는 석회(고토석회)를 뿌려 중화시켜 주는 것이 좋습니다.
          </p>
        </section>

        <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
          <p className="text-[11px] text-orange-800 font-bold leading-relaxed">
            💡 <strong>팁:</strong> 손으로 흙을 꽉 쥐었을 때 덩어리가 지면서도 톡 건드리면 부서지는 정도의 수분감이 가장 이상적인 상태입니다.
          </p>
        </div>
      </div>
    )
  },
   {
    title: "비료 주는 법",
    emoji: "🔋",
    color: "bg-blue-50",
    details: (
      <div className="space-y-6">
        <section>
          <h5 className="text-sm font-black text-blue-700 mb-3 flex items-center gap-2">
            농사의 3대 요소 (N-P-K)
          </h5>
          <div className="overflow-hidden rounded-2xl border border-blue-100">
            <table className="w-full text-[10px] text-left border-collapse">
              <thead>
                <tr className="bg-blue-100/50">
                  <th className="p-2 font-black text-blue-800 border-b border-blue-100">성분</th>
                  <th className="p-2 font-black text-blue-800 border-b border-blue-100">역할 (비유)</th>
                  <th className="p-2 font-black text-blue-800 border-b border-blue-100">결핍 시 증상</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="p-2 border-b border-blue-50 font-bold text-slate-700">N (질소)</td>
                  <td className="p-2 border-b border-blue-50 text-slate-500 leading-tight">잎과 줄기 성장<br/>(근육과 체격)</td>
                  <td className="p-2 border-b border-blue-50 text-red-500 font-medium leading-tight">잎이 누렇게 변함<br/>성장이 더딤</td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-blue-50 font-bold text-slate-700">P (인산)</td>
                  <td className="p-2 border-b border-blue-50 text-slate-500 leading-tight">뿌리, 꽃/열매<br/>(에너지와 생식)</td>
                  <td className="p-2 border-b border-blue-50 text-red-500 font-medium leading-tight">뿌리 발달 저하<br/>개화 지연</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-700">K (칼륨)</td>
                  <td className="p-2 text-slate-500 leading-tight">병해충 저항력<br/>(면역력과 뼈)</td>
                  <td className="p-2 text-red-500 font-medium leading-tight">잎 끝이 타들어가고<br/>열매가 작음</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h5 className="text-sm font-black text-slate-800 mb-1 flex items-center gap-2">
            🌱 성분별 주요 비료 가이드
          </h5>
          
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <h6 className="text-[11px] font-black text-green-700 mb-1">1. 질소(N) 특화: "잎과 줄기를 쑥쑥"</h6>
              <p className="text-[10px] text-slate-500 leading-relaxed mb-2">엽채류(상추, 시금치)나 성장 초기 단계 식물에게 필수적입니다.</p>
              <ul className="space-y-2">
                <li className="text-[10px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">요소 비료 (무기질):</strong> 대표적 질소 비료로 효과가 즉각적입니다. 단, 과하면 식물이 연약해질 수 있으니 정량을 지키세요.
                </li>
                <li className="text-[10px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">유박 비료 (유기질):</strong> 깻묵 등으로 만든 비료로 서서히 녹아나와 작물이 꾸준히 자라게 돕고 미생물을 활성화합니다.
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <h6 className="text-[11px] font-black text-orange-700 mb-1">2. 인산(P) 특화: "뿌리 튼튼, 꽃/열매 풍성"</h6>
              <p className="text-[10px] text-slate-500 leading-relaxed mb-2">뿌리 채소(고구마, 감자)나 과채류(토마토, 고추)의 결실기에 중요합니다.</p>
              <ul className="space-y-2">
                <li className="text-[10px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">용과린 (무기질):</strong> 토양 산성화를 막으며 뿌리 발달을 돕습니다. 특히 뿌리가 약할 때 효과가 탁월합니다.
                </li>
                <li className="text-[10px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">골분 (유기질):</strong> 동물 뼈 가루 비료로 꽃이 오래 피게 하고 열매의 당도를 높이는 데 유기농 재배에서 선호됩니다.
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <h6 className="text-[11px] font-black text-blue-700 mb-1">3. 칼륨(K) 특화: "병해충에 강한 단단한 작물"</h6>
              <p className="text-[10px] text-slate-500 leading-relaxed mb-2">가뭄과 추위에 견디는 힘을 길러주며 열매의 저장성을 높입니다.</p>
              <ul className="space-y-2">
                <li className="text-[10px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">염화가리 (무기질):</strong> 가성비가 좋으며 전분 형성을 도와 감자, 고구마 등 서류 작물의 크기를 키우는 데 쓰입니다.
                </li>
                <li className="text-[10px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">황산가리 (무기질):</strong> 가격은 높지만 맛, 향, 색깔 등 품질을 높입니다. 마늘, 양파, 과일 등 향미 작물에 추천합니다.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="p-4 bg-red-50 rounded-2xl border border-red-100">
          <h5 className="text-[11px] font-black text-red-700 mb-2 flex items-center gap-2 uppercase tracking-tighter">
            ⚠️ 비료 사용 시 주의사항 (비룡의 경고)
          </h5>
          <ul className="space-y-2 text-[10px] text-slate-600 font-medium">
            <li className="flex gap-1.5">
              <span className="text-red-400 mt-0.5">•</span>
              <span><strong>과유불급:</strong> 많이 준다고 잘 자라지 않습니다. 오히려 농작물이 말라 죽을 수 있습니다.</span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-red-400 mt-0.5">•</span>
              <span><strong>가스 피해 주의:</strong> 덜 부숙된(덜 익은) 퇴비를 넣으면 가스가 발생해 뿌리가 썩습니다.</span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-red-400 mt-0.5">•</span>
              <span><strong>수분 공급:</strong> 비료를 준 후에는 물을 충분히 주어 비료 성분이 잘 녹아들게 해야 합니다.</span>
            </li>
          </ul>
        </section>

        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
          <p className="text-[10px] text-blue-800 font-bold leading-relaxed">
            💡 <strong>기본 원칙:</strong> 밑거름은 심기 전 흙에 섞고, 웃거름은 뿌리에서 조금 떨어진 곳에 주어 비료 장애를 예방하세요.
          </p>
        </div>
      </div>
    )
  },
  {
    title: "물 주기 요령",
    emoji: "💧",
    color: "bg-cyan-50",
    details: (
      <div className="space-y-4">
        <p className="text-xs text-slate-600 leading-relaxed">물을 너무 자주 주는 것보다 '제때' 주는 것이 중요합니다.</p>
        <ul className="text-[11px] text-slate-500 space-y-2 font-medium">
          <li>• <strong>시간대:</strong> 가급적 해가 뜨기 전 아침 일찍 주는 것이 좋습니다.</li>
          <li>• <strong>방법:</strong> 잎보다는 뿌리 근처 흙에 천천히 스며들게 줍니다.</li>
          <li>• <strong>체크:</strong> 겉흙이 바짝 말랐을 때 한 번에 듬뿍 줍니다.</li>
        </ul>
      </div>
    )
  },
  {
    title: "지주대 설치",
    emoji: "🎋",
    color: "bg-amber-50",
    details: (
      <div className="space-y-4">
        <p className="text-xs text-slate-600 leading-relaxed">고추, 토마토처럼 위로 자라는 작물은 지지대가 필수입니다.</p>
        <ul className="text-[11px] text-slate-500 space-y-2 font-medium">
          <li>• <strong>시기:</strong> 작물이 쓰러지기 전, 15~20cm 정도 자랐을 때 설치합니다.</li>
          <li>• <strong>고정:</strong> 줄기가 굵어질 것을 고려해 '8자 모양'으로 여유 있게 묶어줍니다.</li>
          <li>• <strong>깊이:</strong> 바람에 흔들리지 않게 땅속 깊이 박아주세요.</li>
        </ul>
      </div>
    )
  }
];

const PESTS: PestInfo[] = [
  { 
    name: '진딧물', 
    season: '5~6월', 
    desc: '잎 뒷면에 붙어 즙액을 빨아먹어 식물을 고사시킵니다.', 
    image: 'https://images.unsplash.com/photo-1621250370601-576403f0b263?auto=format&fit=crop&q=80&w=300',
    details: (
      <div className="space-y-6">
        <section>
          <h5 className="text-sm font-black text-green-700 mb-2 flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">STEP 1</span>
            [친환경] 마요네즈 희석액
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            가장 구하기 쉬운 재료로 진딧물의 숨구멍을 막아 질식시키는 원리입니다.
          </p>
          <ul className="mt-2 space-y-1 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 물 500ml + 마요네즈 1~2스푼(약 5g) 혼합</li>
            <li>• <strong>살포:</strong> 잎의 앞뒷면에 골고루 분사</li>
            <li>• <strong>주의:</strong> 며칠 뒤 깨끗한 물로 씻어주면 식물 호흡에 도움</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-blue-700 mb-2 flex items-center gap-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-[10px]">STEP 2</span>
            [고효율] 니코틴 및 알코올 요법
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            진딧물의 신경계를 마비시키거나 외피를 손상시켜 강력한 살충 효과를 냅니다.
          </p>
          <ul className="mt-2 space-y-1 text-[11px] text-slate-500 font-medium">
            <li>• <strong>담배우린물:</strong> 담배꽁초 2~3개를 반나절 우린 물 살포</li>
            <li>• <strong>소주/알코올:</strong> 소주와 물을 1:2 비율로 혼합 살포</li>
            <li>• <strong>장점:</strong> 친환경 방식보다 효과가 빠르고 확실함</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-red-700 mb-2 flex items-center gap-2">
            <span className="bg-red-100 px-2 py-0.5 rounded text-[10px]">STEP 3</span>
            [전문적] 농약 및 식물 추출 천연 살충제
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            가정용 화분 수준을 넘어 번식이 심할 때 사용하는 확실한 방법입니다.
          </p>
          <ul className="mt-2 space-y-1 text-[11px] text-slate-500 font-medium">
            <li>• <strong>친환경 살충제:</strong> 제라늄 추출물이나 '님오일' 성분 구매</li>
            <li>• <strong>침투이행성 약제:</strong> '코니도' 등 식물이 약을 흡수하게 함</li>
            <li>• <strong>장점:</strong> 한 번의 살포로 장기간 예방 효과 기대</li>
          </ul>
        </section>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            💡 <strong>꿀팁:</strong> 싹이 막 올라온 식물에 진딧물이 생겼다면, 우선 테이프(찍찍이)로 눈에 보이는 진딧물을 가볍게 찍어내어 개체 수를 줄인 뒤 위의 방법을 적용하면 훨씬 효과적입니다.
          </p>
        </div>
      </div>
    )
  },
  { 
    name: '달팽이', 
    season: '장마철', 
    desc: '어린 잎을 갉아먹어 구멍을 냅니다. 야간에 주로 활동합니다.', 
    image: 'https://images.unsplash.com/photo-1533130101416-6202573229b1?auto=format&fit=crop&q=80&w=300',
    details: (
      <div className="space-y-6">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          식물 싹이 돋아날 때 가장 위협적인 존재 중 하나입니다. 연약한 새순을 갉아먹어 성장을 완전히 멈추게 할 수 있어 빠른 대처가 필요합니다.
        </p>

        <section>
          <h5 className="text-sm font-black text-green-700 mb-2 flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">STEP 1</span>
            [유인/제거] 맥주 트랩
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            달팽이는 맥주의 효모 향을 매우 좋아하는 습성이 있습니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 낮은 용기에 맥주 2~3cm + 설탕 한 스푼 혼합</li>
            <li>• <strong>설치:</strong> 달팽이가 자주 나타나는 화분 근처 배치</li>
            <li>• <strong>원리:</strong> 향에 이끌려 온 달팽이가 맥주에 빠져 사멸</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-blue-700 mb-2 flex items-center gap-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-[10px]">STEP 2</span>
            [물리적 차단] 구리 테이프 및 장벽
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            달팽이가 몸에 닿는 것을 싫어하는 특정 물질로 접근을 막습니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>구리 테이프:</strong> 구리와 점액이 닿을 때 발생하는 미세 전기 자극 이용</li>
            <li>• <strong>거친 물질:</strong> 부서진 달걀 껍데기나 커피 찌꺼기를 주변에 살포</li>
            <li>• <strong>효과:</strong> 피부를 자극하고 이동을 방해하여 경로 차단</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-red-700 mb-2 flex items-center gap-2">
            <span className="bg-red-100 px-2 py-0.5 rounded text-[10px]">STEP 3</span>
            [전문적] 천연 성분 살충제
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            개체 수가 너무 많을 때 사용하는 확실한 친환경 방법입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>인산철 약제:</strong> 시중의 달팽이 전용 알갱이 약제 사용</li>
            <li>• <strong>안전성:</strong> 토양과 인체에 무해한 친환경 성분이 많음</li>
            <li>• <strong>사용법:</strong> 줄기에서 조금 떨어진 흙 위에 듬성듬성 살포</li>
          </ul>
        </section>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            💡 <strong>꿀팁:</strong> 달팽이는 야행성이고 습한 곳을 좋아합니다. 가급적 물은 <strong>아침에 주어</strong> 밤사이에 겉흙이 마르게 유지하는 것이 가장 좋은 예방법입니다.
          </p>
        </div>
      </div>
    )
  },
  { 
    name: '총채벌레', 
    season: '7~8월', 
    desc: '꽃이나 어린 열매에 해를 입히며 바이러스를 옮기기도 합니다.', 
    image: 'https://images.unsplash.com/photo-1542331422-520e03c961e6?auto=format&fit=crop&q=80&w=300',
    details: (
      <div className="space-y-6">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          식물의 잎과 꽃을 흡즙하여 하얀 반점이나 은색 무늬를 남기고, 성장을 방해하는 총채벌레는 크기가 매우 작아 발견이 어렵고 번식력이 강력합니다.
        </p>

        <section>
          <h5 className="text-sm font-black text-green-700 mb-2 flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">STEP 1</span>
            [물리적/예방] 끈끈이 트랩 활용
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            총채벌레는 특정 색상에 강하게 끌리는 성질이 있습니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 식물 근처에 청색 또는 황색 끈끈이 트랩 설치</li>
            <li>• <strong>특징:</strong> 꽃노랑총채벌레는 청색에 더 민감하게 반응</li>
            <li>• <strong>효과:</strong> 성충 포획 및 알 낳기 방지, 개체 수 모니터링</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-blue-700 mb-2 flex items-center gap-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-[10px]">STEP 2</span>
            [친환경/방제] 천연 오일 및 비눗물
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            총채벌레의 외피를 손상시키거나 질식시키는 방법입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>님오일:</strong> 3~5일 간격으로 잎 앞뒷면에 꼼꼼히 살포</li>
            <li>• <strong>비눗물:</strong> 물 1L + 주방세제 2~3방울로 숨구멍 차단</li>
            <li>• <strong>주의:</strong> 꽃봉오리 속이나 흙 속까지 꼼꼼하게 살포</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-red-700 mb-2 flex items-center gap-2">
            <span className="bg-red-100 px-2 py-0.5 rounded text-[10px]">STEP 3</span>
            [전문적] 약제 교차 살포
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            약제 내성이 매우 빨리 생기므로 성분을 번갈아 쓰는 것이 핵심입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>침투이행성 약제:</strong> 식물에 독성이 퍼져 즙을 먹는 벌레 박멸</li>
            <li>• <strong>교차 살포:</strong> A약제와 B약제를 3~5일 간격으로 번갈아 사용</li>
            <li>• <strong>방제 기간:</strong> 생애 주기를 끊기 위해 최소 2주간 지속 방제</li>
          </ul>
        </section>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            💡 <strong>추가 팁:</strong> 총채벌레는 건조한 환경을 좋아합니다. 주변 습도를 적절히 유지하고 <strong>분무기로 잎에 물을 자주 뿌려주는 것</strong>만으로도 번식 속도를 늦출 수 있습니다.
          </p>
        </div>
      </div>
    )
  },
  { 
    name: '개미', 
    season: '4~10월', 
    desc: '진딧물과 공생하며 배설물을 먹고 진딧물을 보호해 줍니다.', 
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=300',
    details: (
      <div className="space-y-6">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          진딧물을 키우는 주범인 개미를 퇴치하는 것은 식물 건강을 지키는 데 매우 중요합니다. 개미는 진딧물의 단물을 먹는 대가로 천적으로부터 진딧물을 보호하기 때문입니다.
        </p>

        <section>
          <h5 className="text-sm font-black text-green-700 mb-2 flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">STEP 1</span>
            [천연/차단] 강력한 향으로 경로 차단
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            개미는 후각이 매우 발달하여 특정 향을 기피합니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>시나몬(계피) 가루:</strong> 화분 주변이나 틈새에 뿌려 우회 유도</li>
            <li>• <strong>커피 찌꺼기:</strong> 카페인 독성과 강력한 향으로 페로몬 교란</li>
            <li>• <strong>식초 희석액:</strong> 물과 식초 1:1 혼합. 개미가 남긴 이정표 제거</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-blue-700 mb-2 flex items-center gap-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-[10px]">STEP 2</span>
            [유인/박멸] 붕산 트랩 (또는 베이킹소다)
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            개미의 소화 시스템을 교란하여 여왕개미까지 박멸하는 방법입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 설탕 1 + 붕산(또는 베이킹소다) 1 혼합</li>
            <li>• <strong>설치:</strong> 개미가 다니는 길목에 조금씩 두기</li>
            <li>• <strong>주의:</strong> 아이나 반려동물이 먹지 않도록 주의 필수</li>
          </ul>
        </section>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            💡 <strong>핵심:</strong> 개미가 많다면 높은 확률로 <strong>진딧물</strong>이 이미 발생했을 가능성이 큽니다. 개미 퇴치와 함께 잎 뒷면의 진딧물 여부를 반드시 확인하세요!
          </p>
        </div>
      </div>
    )
  },
  {
    name: '배추흰나비 애벌레',
    season: '4~10월',
    desc: '잎을 갉아먹어 뼈대만 남깁니다. 특히 배추와 무를 좋아합니다.',
    image: 'https://images.unsplash.com/photo-1590005024862-6b67679a29fb?auto=format&fit=crop&q=80&w=300',
    details: (
      <div className="space-y-6">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          잎을 갉아먹어 뼈대만 남깁니다. 배추, 무, 양배추 등 십자화과 작물의 주적이며 번식력이 매우 강력합니다.
        </p>

        <section>
          <h5 className="text-sm font-black text-green-700 mb-2 flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">STEP 1</span>
            [친환경] 한랭사(미세 그물망) 설치
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            나비가 잎에 알을 낳지 못하도록 물리적으로 원천 차단하는 가장 확실하고 친환경적인 방법입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 작물 심은 직후, 고운 메시의 한랭사를 터널 모양으로 설치</li>
            <li>• <strong>효과:</strong> 나비의 산란 기회 원천 차단. 약품 없이 100%에 가까운 방제</li>
            <li>• <strong>추천:</strong> 소규모 텃밭에서 가장 권장하는 친환경 방식</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-blue-700 mb-2 flex items-center gap-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-[10px]">STEP 2</span>
            [고효율] BT균(미생물 살충제) 정기 살포
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            나비가 알을 낳았더라도 애벌레가 깨어나자마자 사멸하도록 만드는 생물학적 방제법입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> BT균 제제를 물에 희석하여 잎 앞뒷면에 골고루 살포</li>
            <li>• <strong>원리:</strong> 나비목 애벌레의 소화 기관을 마비시켜 사멸 유도</li>
            <li>• <strong>안전성:</strong> 인체나 꿀벌 등 다른 곤충에게는 무해한 탁월한 효과</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-red-700 mb-2 flex items-center gap-2">
            <span className="bg-red-100 px-2 py-0.5 rounded text-[10px]">STEP 3</span>
            [전문적] 토양 살충제 및 침투이행성 약제
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            작물을 심기 전이나 성장 초기에 미리 조치를 취해 벌레의 생존을 막는 방법입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 밭을 일굴 때 토양 살충제 혼합 또는 초기 전용 약제 살포</li>
            <li>• <strong>효과:</strong> 약제가 식물 내부로 흡수되어 잎을 먹는 즉시 살충 효과 발휘</li>
            <li>• <strong>장점:</strong> 대규모 재배 시 손이 덜 가면서도 가장 강력한 살충 효과</li>
          </ul>
        </section>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            💡 <strong>팁:</strong> 청벌레는 잎 뒷면에 아주 작은 노란색 알을 하나씩 낳습니다. 평소에 잎을 뒤집어보며 <strong>노란 알이 보일 때마다 손으로 눌러 제거(보살)</strong>하는 습관을 들이면 큰 피해를 막을 수 있습니다.
          </p>
        </div>
      </div>
    )
  },
  {
    name: '노린재',
    season: '6~10월',
    desc: '열매의 즙을 빨아먹어 기형과를 만들고 지독한 냄새를 남깁니다.',
    image: 'https://images.unsplash.com/photo-1551042743-394469796695?auto=format&fit=crop&q=80&w=300',
    details: (
      <div className="space-y-6">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          열매 작물의 주적으로, 즙을 빨아먹어 수확물의 품질을 크게 떨어뜨립니다. 위협을 느끼면 특유의 지독한 냄새를 풍기는 것이 특징입니다.
        </p>

        <section>
          <h5 className="text-sm font-black text-green-700 mb-2 flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">STEP 1</span>
            [친환경/물리적] 수작업 및 비눗물 트랩
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            노린재는 위협을 느끼면 바닥으로 떨어지는 습성이 있습니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 입구가 넓은 통에 비눗물을 담아 잎 아래에 대고 식물을 톡톡 건드림</li>
            <li>• <strong>원리:</strong> 비눗물의 계면활성제가 숨구멍을 막아 즉사시킴</li>
            <li>• <strong>팁:</strong> 활동성이 떨어지는 이른 아침에 작업하면 포획이 훨씬 수월함</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-blue-700 mb-2 flex items-center gap-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-[10px]">STEP 2</span>
            [유인 및 포획] 페로몬 트랩 설치
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            노린재의 번식 본능을 자극해 한곳으로 모아 퇴치하는 방법입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 시중의 노린재 전용 '집합 페로몬 트랩'을 설치</li>
            <li>• <strong>주의사항:</strong> 트랩을 텃밭 가장자리(5~10m 밖)에 두어 노린재를 밖으로 유인</li>
            <li>• <strong>장점:</strong> 넓은 범위의 노린재 밀도를 지속적으로 낮추는 데 효과적</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-red-700 mb-2 flex items-center gap-2">
            <span className="bg-red-100 px-2 py-0.5 rounded text-[10px]">STEP 3</span>
            [전문적/방제] 기피제 및 전용 약제 살포
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            노린재가 싫어하는 향을 뿌려 접근을 막거나 전용 약제로 퇴치합니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>천연 기피제:</strong> 목초액, 마늘 추출물 등을 주기적으로 뿌려 접근 억제</li>
            <li>• <strong>전용 약제:</strong> 내성이 강하므로 등록된 전용 약제(빅카드 등)를 사용</li>
            <li>• <strong>방법:</strong> 오후 늦게나 이른 아침, 텃밭 전체를 감싸듯 꼼꼼히 살포</li>
          </ul>
        </section>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            💡 <strong>추가 팁:</strong> 노린재는 주변 풀숲에서 겨울을 나고 날아오기 때문에, <strong>텃밭 주변의 잡초를 깔끔하게 제거</strong>해주는 것만으로도 발생 빈도를 크게 낮출 수 있습니다.
          </p>
        </div>
      </div>
    )
  },
  {
    name: '고자리 파리',
    season: '3~10월',
    desc: '파, 마늘 등의 뿌리를 갉아먹어 식물을 통째로 고사시킵니다.',
    image: 'https://images.unsplash.com/photo-1628537593258-290079979b0c?auto=format&fit=crop&q=80&w=300',
    details: (
      <div className="space-y-6">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          파, 마늘, 양파 등 인경채소의 뿌리를 갉아먹어 식물을 통째로 고사시키는 고자리파리는 땅속에서 피해를 주기 때문에 예방이 무엇보다 중요합니다.
        </p>

        <section>
          <h5 className="text-sm font-black text-green-700 mb-2 flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">STEP 1</span>
            [친환경/예방] 완숙 퇴비 사용 및 목초액 관주
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            고자리파리는 썩어가는 유기물(퇴비)의 냄새를 맡고 날아와 알을 낳습니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 반드시 완전히 발효된(완숙) 퇴비를 사용하세요.</li>
            <li>• <strong>관주:</strong> 목초액을 500~1,000배 희석하여 땅에 정기적으로 살포</li>
            <li>• <strong>효과:</strong> 특유의 탄내로 파리의 접근을 막고 토양 소독 효과</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-blue-700 mb-2 flex items-center gap-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-[10px]">STEP 2</span>
            [물리적/차단] 한랭사 및 비닐 멀칭
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            파리가 알을 낳을 장소에 접근하지 못하도록 물리적인 벽을 만드는 방법입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>비닐 멀칭:</strong> 비닐로 땅을 덮으면 파리가 흙에 알을 낳기 어려워짐</li>
            <li>• <strong>한랭사:</strong> 성충인 파리가 작물 근처에 앉지 못하도록 미세 그물망 설치</li>
            <li>• <strong>시기:</strong> 특히 활동을 시작하는 초봄(3~4월)과 가을에 매우 효과적</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-red-700 mb-2 flex items-center gap-2">
            <span className="bg-red-100 px-2 py-0.5 rounded text-[10px]">STEP 3</span>
            [전문적/방제] 토양 살충제 및 약제 관주
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            이미 땅속에 알이나 유충(구더기)이 있을 때 사용하는 확실한 방법입니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>토양 혼화:</strong> 심기 1~2주 전 입제 형태의 토양 살충제를 밭에 섞음</li>
            <li>• <strong>약제 관주:</strong> 피해 발생 시 전용 약제를 물에 타서 뿌리 근처 흙에 흠뻑 살포</li>
            <li>• <strong>주의:</strong> 분무기로 잎에만 뿌리는 것은 땅속 유충 방제에 효과가 없음</li>
          </ul>
        </section>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            💡 <strong>팁:</strong> 고자리파리는 습한 환경을 좋아하므로 <strong>배수가 잘 되도록</strong> 관리해 주세요. 피해를 입어 시든 식물은 즉시 뽑아서 밭 멀리 버려야 다른 식물로의 전염을 막을 수 있습니다.
          </p>
        </div>
      </div>
    )
  },
  { 
    name: '메뚜기', 
    season: '7~10월', 
    desc: '잎을 무섭게 갉아먹어 구멍을 냅니다. 이동성이 좋아 방제가 까다롭습니다.', 
    image: 'https://images.unsplash.com/photo-1596431969060-6477b752989c?auto=format&fit=crop&q=60&w=300',
    details: (
      <div className="space-y-6">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          여름철부터 가을까지 활동하는 메뚜기는 뛰어난 도약력으로 밭 여기저기를 옮겨 다니며 잎을 식해합니다.</p>
        <section>
          <h5 className="text-sm font-black text-green-700 mb-2 flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">STEP 1</span>
            [물리적/포획] 이른 아침 직접 포획
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            기온이 낮은 이른 아침에는 메뚜기의 움직임이 둔해집니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>방법:</strong> 긴 장화나 장갑을 끼고 직접 잡아내거나 잠자리채 이용</li>
            <li>• <strong>특징:</strong> 개체수가 적을 때 가장 확실하고 친환경적인 방법</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-blue-700 mb-2 flex items-center gap-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-[10px]">STEP 2</span>
            [기피/차단] 목초액 살포 및 한랭사
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            메뚜기가 싫어하는 환경을 조성하여 접근을 막습니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>목초액:</strong> 특유의 탄내로 메뚜기의 접근을 억제 (200~500배 희석)</li>
            <li>• <strong>한랭사:</strong> 어린 모종 시기에 한랭사를 씌우면 물리적 차단 가능</li>
          </ul>
        </section>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            💡 <strong>팁:</strong> 메뚜기는 벼과 식물과 잡초를 좋아합니다. <strong>밭 주변의 풀깎기</strong>를 철저히 하면 메뚜기가 번식하고 숨을 곳이 사라집니다.
          </p>
        </div>
      </div>
    )
  },
  { 
    name: '방아깨비', 
    season: '8~10월', 
    desc: '덩치가 커서 잎을 먹는 양이 많습니다. 벼과 식물의 잎을 선호합니다.', 
    image: 'https://images.unsplash.com/photo-1534346501570-36657879f906?auto=format&fit=crop&q=60&w=300',
    details: (
      <div className="space-y-6">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          뒷다리를 잡으면 방아를 찧는 듯한 동작을 하는 방아깨비는 메뚜기목 중 가장 큰 해충에 속하며, 식해량이 상당합니다.
        </p>

        <section>
          <h5 className="text-sm font-black text-green-700 mb-2 flex items-center gap-2">
            <span className="bg-green-100 px-2 py-0.5 rounded text-[10px]">STEP 1</span>
            [물리적/차단] 서식지 정비
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            방아깨비는 긴 풀숲에 숨어 있다가 작물로 이동합니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>환경조성:</strong> 텃밭 주변 잡초를 짧게 깎아 노출되게 함</li>
            <li>• <strong>포획:</strong> 덩치가 커서 눈에 잘 띄므로 보이는 즉시 제거</li>
          </ul>
        </section>

        <section>
          <h5 className="text-sm font-black text-red-700 mb-2 flex items-center gap-2">
            <span className="bg-red-100 px-2 py-0.5 rounded text-[10px]">STEP 2</span>
            [전문/방제] 약제 교차 살포
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed">
            피해가 심각하여 작물의 뼈대만 남을 경우 전용 약제를 사용합니다.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-slate-500 font-medium">
            <li>• <strong>약제선택:</strong> 메뚜기목 해충에 등록된 약제 사용</li>
            <li>• <strong>주의:</strong> 수확 전 살포 금지 기간을 반드시 확인하세요.</li>
          </ul>
        </section>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            💡 <strong>팁:</strong> 방아깨비는 한 번에 많은 알을 낳습니다. 가을철 수확 후 <strong>밭을 깊게 갈아주면</strong> 땅속의 알들이 지표면으로 노출되어 겨울 추위에 사멸하게 됩니다.
          </p>
        </div>
      </div>
    )
  }
];

type ActiveItemType = 
  | { type: 'guide'; item: GuideContent }
  | { type: 'pest'; item: PestInfo };

const GuideTab: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ActiveItemType | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <h2 className="text-lg font-black text-slate-800 tracking-tight mb-4 px-1">초보 농부 가이드</h2>
        <div className="grid grid-cols-2 gap-3">
          {FARMER_GUIDES.map((guide) => (
            <button
              key={guide.title}
              onClick={() => setActiveItem({ type: 'guide', item: guide })}
              className={`${guide.color} p-4 rounded-3xl border border-transparent hover:border-slate-200 transition-all text-left active:scale-95`}
            >
              <span className="text-2xl mb-2 block">{guide.emoji}</span>
              <span className="text-xs font-black text-slate-800">{guide.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <h2 className="text-lg font-black text-slate-800 tracking-tight mb-4 px-1">주요 병해충 도감</h2>
        <div className="space-y-3">
          {PESTS.map((pest) => (
            <button
              key={pest.name}
              onClick={() => setActiveItem({ type: 'pest', item: pest })}
              className="w-full flex items-center gap-4 p-3 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all active:scale-[0.98] group"
            >
              <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={pest.image} alt={pest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-sm font-black text-slate-800">{pest.name}</span>
                  <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">{pest.season}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium line-clamp-1">{pest.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setActiveItem(null)}>
          <div className="w-full max-w-md bg-white rounded-t-[40px] shadow-2xl p-6 animate-slide-up max-h-[85vh] overflow-y-auto no-scrollbar" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
            
            <div className="flex items-center gap-3 mb-6">
              {activeItem.type === 'guide' ? (
                <div className={`w-12 h-12 ${activeItem.item.color} rounded-2xl flex items-center justify-center text-2xl`}>
                  {activeItem.item.emoji}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl overflow-hidden">
                  <img src={activeItem.item.image} alt={activeItem.item.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {activeItem.type === 'guide' ? activeItem.item.title : activeItem.item.name}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {activeItem.type === 'guide' ? 'Farmer Guide' : 'Pest Management'}
                </p>
              </div>
            </div>

            <div className="pb-8">
              {activeItem.item.details}
            </div>

            <button 
              onClick={() => setActiveItem(null)}
              className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm active:scale-95 transition-all"
            >
              확인
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
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

export default GuideTab;
