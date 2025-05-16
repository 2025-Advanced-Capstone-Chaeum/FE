// components/IamportSDKLoader.tsx
'use client';

import { useEffect } from 'react';

const IamportSDKLoader = () => {
  useEffect(() => {
    // jQuery 로드
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js'; // 또는 다른 버전
    jqueryScript.type = 'text/javascript';
    jqueryScript.async = true;
    document.head.appendChild(jqueryScript);

    jqueryScript.onload = () => {
      // jQuery 로드 완료 후 아임포트 SDK 로드
      const iamportScript = document.createElement('script');
      iamportScript.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js'; // 최신 버전 확인 후 적용
      iamportScript.type = 'text/javascript';
      iamportScript.async = true;
      document.head.appendChild(iamportScript);

      return () => {
        document.head.removeChild(jqueryScript);
        document.head.removeChild(iamportScript);
      };
    };

    jqueryScript.onerror = () => {
      console.error('jQuery 로드 실패');
    };

    return () => {
      document.head.removeChild(jqueryScript);
    };
  }, []);

  return null;
};

export default IamportSDKLoader;