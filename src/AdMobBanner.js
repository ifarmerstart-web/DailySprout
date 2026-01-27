import { useEffect } from 'react';
import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob';

const AdMobBanner = () => {
  useEffect(() => {
    const initializeAdMob = async () => {
      // 1. 애드몹 초기화
      await AdMob.initialize();

      // 2. 배너 광고 노출
      await AdMob.showBanner({
        adId: 'ca-app-pub-3940256099942544/6300978111', // 안드로이드 테스트 배너 ID
        adSize: BannerAdSize.ADAPTIVE_BANNER, // 화면 너비에 맞게 자동 조절
        position: BannerAdPosition.BOTTOM_CENTER, // 화면 하단 중앙 배치
        margin: 0,
        isTesting: true // 테스트 모드 활성화
      });
    };

    initializeAdMob();

    // 앱 종료나 페이지 이동 시 광고 제거 (메모리 관리)
    return () => {
      AdMob.removeBanner();
    };
  }, []);

  return null; // 화면에 직접 렌더링할 요소는 없으므로 null 반환
};

export default AdMobBanner;
