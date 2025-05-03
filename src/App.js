import React, { useState } from 'react';

// 투자 데이터 정의 (티커 포함)
const investmentData = {
  personalPension: [
    { name: "TIGER 미국S&P500", ticker: "360750", allocation: 30, amount: 590000 },
    { name: "TIGER 반도체TOP10", ticker: "157490", allocation: 15, amount: 300000 },
    { name: "TIGER AI반도체", ticker: "396500", allocation: 15, amount: 300000 },
    { name: "ACE KRX금현물", ticker: "411060", allocation: 15, amount: 300000 },
    { name: "TIGER 구리실물", ticker: "448990", allocation: 10, amount: 200000 },
    { name: "KODEX 200", ticker: "069500", allocation: 10, amount: 200000 },
    { name: "KODEX 배당가치", ticker: "244620", allocation: 5, amount: 100000 }
  ],
  retirementPension: [
    { name: "TIGER 국고채30년스트립액티브", ticker: "385550", allocation: 30, amount: 1260000 },
    { name: "KODEX 선진국MSCI World", ticker: "251350", allocation: 15, amount: 630000 },
    { name: "ACE KRX금현물", ticker: "411060", allocation: 15, amount: 630000 },
    { name: "TIGER 미국S&P500", ticker: "360750", allocation: 10, amount: 420000 },
    { name: "KODEX 미국방산", ticker: "404470", allocation: 10, amount: 420000 },
    { name: "ACE 국고채10년", ticker: "455890", allocation: 10, amount: 420000 },
    { name: "TIGER 인도니프티50", ticker: "220140", allocation: 5, amount: 210000 },
    { name: "ACE 국고채3년", ticker: "114470", allocation: 5, amount: 210000 }
  ]
};

const InvestmentStrategyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pensionType, setPensionType] = useState('personal');

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 연금 유형 변경 핸들러
  const handlePensionTypeChange = (type) => {
    setPensionType(type);
    // 데이터 사용 예시 (콘솔 로그)
    console.log("Selected Pension Type:", type, "Data:",
      type === 'personal' ? investmentData.personalPension : investmentData.retirementPension);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-800 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-2">노후 자금 투자 전략 대시보드</h1>
        <p className="text-lg">2025년 5월 - 2026년 11월 (미국 중간선거까지)</p>
      </header>

      {/* 탭 네비게이션 */}
      <nav className="bg-white p-4 shadow-sm">
        <div className="flex flex-wrap space-x-1">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => handleTabChange('overview')}
            label="전략 개요"
          />
          <TabButton 
            active={activeTab === 'timeline'} 
            onClick={() => handleTabChange('timeline')}
            label="투자 타임라인"
          />
          <TabButton 
            active={activeTab === 'cash'} 
            onClick={() => handleTabChange('cash')}
            label="현금성 자산 관리"
          />
          <TabButton 
            active={activeTab === 'indicators'} 
            onClick={() => handleTabChange('indicators')}
            label="경제 지표 모니터링"
          />
          <TabButton 
            active={activeTab === 'rebalancing'} 
            onClick={() => handleTabChange('rebalancing')}
            label="리밸런싱 체계"
          />
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-6">
        {activeTab === 'overview' && <OverviewSection data={investmentData} />}
        {activeTab === 'timeline' && (
          <TimelineSection 
            pensionType={pensionType} 
            onPensionTypeChange={handlePensionTypeChange}
            data={investmentData} // Timeline에도 데이터 전달
          />
        )}
        {activeTab === 'cash' && <CashManagementSection />}
        {activeTab === 'indicators' && <IndicatorsSection />}
        {activeTab === 'rebalancing' && <RebalancingSection />}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <p>© 2025 투자 전략 대시보드 | 마지막 업데이트: 2025년 5월 2일</p>
      </footer>
    </div>
  );
};

// 탭 버튼 컴포넌트
const TabButton = ({ active, onClick, label }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// 전략 개요 섹션
const OverviewSection = ({ data }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-800">투자 전략 개요</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">개인 연금</h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>총 금액:</span>
            <span className="font-semibold">93,787,349원</span>
          </li>
          <li className="flex justify-between">
            <span>현금성 자산(60%):</span>
            <span className="font-semibold">56,270,000원</span>
          </li>
          <li className="flex justify-between">
            <span>투자 자산(40%):</span>
            <span className="font-semibold">37,517,349원</span>
          </li>
          <li className="flex justify-between">
            <span>월별 투자 금액:</span>
            <span className="font-semibold">1,970,000원</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-green-700">퇴직 연금</h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>총 금액:</span>
            <span className="font-semibold">266,482,252원</span>
          </li>
          <li className="flex justify-between">
            <span>현금성 자산(70%):</span>
            <span className="font-semibold">186,540,000원</span>
          </li>
          <li className="flex justify-between">
            <span>투자 자산(30%):</span>
            <span className="font-semibold">79,942,252원</span>
          </li>
          <li className="flex justify-between">
            <span>월별 투자 금액:</span>
            <span className="font-semibold">4,210,000원</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">핵심 투자 전략</h3>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li><strong>높은 현금 보유율:</strong> 개인 연금 60%, 퇴직 연금 70% 현금성 자산 유지</li>
          <li><strong>세밀한 분할 투자:</strong> 10,000원 단위 투자 금액, 19개월 분산 투자</li>
          <li><strong>경제 지표 연동:</strong> 주요 경제 지표 발표일에 맞춘 투자</li>
          <li><strong>AI 활용 의사결정:</strong> 주요 시점마다 AI 재상담을 통한 전략 조정</li>
          <li><strong>유동적 대응 체계:</strong> 시장 변동에 따른 명확한 의사결정 체계</li>
        </ul>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">개인 연금 자산 배분</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-blue-200 p-2 text-left">투자 종목</th>
                <th className="border border-blue-200 p-2 text-left">티커</th>
                <th className="border border-blue-200 p-2 text-right">비율</th>
              </tr>
            </thead>
            <tbody>
              {data.personalPension.map(item => (
                <tr key={item.ticker}>
                  <td className="border border-blue-200 p-2">{item.name}</td>
                  <td className="border border-blue-200 p-2">{item.ticker}</td>
                  <td className="border border-blue-200 p-2 text-right">{item.allocation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">퇴직 연금 자산 배분</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-green-200 p-2 text-left">투자 종목</th>
                <th className="border border-green-200 p-2 text-left">티커</th>
                <th className="border border-green-200 p-2 text-right">비율</th>
              </tr>
            </thead>
            <tbody>
              {data.retirementPension.map(item => (
                <tr key={item.ticker}>
                  <td className="border border-green-200 p-2">{item.name}</td>
                  <td className="border border-green-200 p-2">{item.ticker}</td>
                  <td className="border border-green-200 p-2 text-right">{item.allocation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// 투자 타임라인 섹션
const TimelineSection = ({ pensionType, onPensionTypeChange, data }) => { // data prop 추가
  // 개인 연금 타임라인 데이터
  const personalPensionTimeline = [
    { date: '2025.5.6', day: '화', time: '10:00', amount: '현금화 56,270,000', investment: 'KBSTAR 단기통안채', event: '5.5 휴장일 다음 거래일', aiConsult: '-' },
    { date: '2025.5.7', day: '수', time: '10:00', amount: '590,000', investment: 'TIGER 미국S&P500(30%)', event: '미 연준 금리 결정일', aiConsult: '금리 결정 후' },
    { date: '2025.5.9', day: '금', time: '10:00', amount: '300,000', investment: 'TIGER 반도체TOP10(15%)', event: '미국 4월 고용지표', aiConsult: '-' },
    { date: '2025.5.23', day: '금', time: '10:00', amount: '300,000', investment: 'ACE KRX금현물(15%)', event: '한은 금통위 결정일', aiConsult: '금리 결정 후' },
    { date: '2025.6.3', day: '화', time: '유보', amount: '-', investment: '-', event: '한국 대통령 선거일', aiConsult: '선거 결과 후' },
    { date: '2025.6.6', day: '금', time: '10:00', amount: '590,000', investment: 'TIGER 미국S&P500(30%)', event: '미국 5월 고용지표', aiConsult: '-' },
    { date: '2025.6.20', day: '금', time: '10:00', amount: '200,000', investment: 'TIGER 구리실물(10%)', event: '한국 5월 무역수지', aiConsult: '-' },
    { date: '2025.7.4', day: '금', time: '10:00', amount: '200,000', investment: 'KODEX 200(10%)', event: '미국 6월 고용지표', aiConsult: '-' },
    { date: '2025.7.11', day: '금', time: '10:00', amount: '590,000', investment: 'TIGER 미국S&P500(30%)', event: '한은 금통위 결정일', aiConsult: '금리 결정 후' },
    { date: '2025.7.25', day: '금', time: '10:00', amount: '300,000', investment: 'TIGER AI반도체(15%)', event: '한국 2분기 GDP', aiConsult: 'GDP 발표 후' },
    { date: '2025.9.19', day: '금', time: '10:00', amount: '300,000', investment: 'ACE KRX금현물(15%)', event: '분기 리밸런싱', aiConsult: '리밸런싱 상담' },
    { date: '2025.12.19', day: '금', time: '10:00', amount: '300,000', investment: 'ACE KRX금현물(15%)', event: '분기 리밸런싱', aiConsult: '리밸런싱 상담' },
    { date: '2026.9.18', day: '금', time: '10:00', amount: '다양한 종목', investment: '분기 리밸런싱', event: '중간선거 전 대비', aiConsult: '전략 재점검' },
    { date: '2026.11.3', day: '화', time: '10:00', amount: '유보', investment: '-', event: '미국 중간선거', aiConsult: '선거 결과 후' },
    { date: '2026.11.20', day: '금', time: '10:00', amount: '다양한 종목', investment: '전체 포트폴리오', event: '선거 후 시장 안정화', aiConsult: '종합 전략 재설정' },
  ];
  
  // 퇴직 연금 타임라인 데이터
  const retirementPensionTimeline = [
    { date: '2025.5.6', day: '화', time: '10:00', amount: '현금화 186,540,000', investment: '신한BEST MMF', event: '5.5 휴장일 다음 거래일', aiConsult: '-' },
    { date: '2025.5.7', day: '수', time: '10:00', amount: '1,260,000', investment: 'TIGER 국고채30년(30%)', event: '미 연준 금리 결정일', aiConsult: '금리 결정 후' },
    { date: '2025.5.9', day: '금', time: '10:00', amount: '630,000', investment: 'KODEX 선진국MSCI(15%)', event: '미국 4월 고용지표', aiConsult: '-' },
    { date: '2025.5.23', day: '금', time: '10:00', amount: '210,000', investment: 'ACE 국고채3년(5%)', event: '한은 금통위 결정일', aiConsult: '금리 결정 후' },
    { date: '2025.6.3', day: '화', time: '유보', amount: '-', investment: '-', event: '한국 대통령 선거일', aiConsult: '선거 결과 후' },
    { date: '2025.6.6', day: '금', time: '10:00', amount: '1,260,000', investment: 'TIGER 국고채30년(30%)', event: '미국 5월 고용지표', aiConsult: '-' },
    { date: '2025.6.20', day: '금', time: '10:00', amount: '210,000', investment: 'TIGER 인도니프티50(5%)', event: '한국 5월 무역수지', aiConsult: '-' },
    { date: '2025.7.4', day: '금', time: '10:00', amount: '420,000', investment: 'KODEX 미국방산(10%)', event: '미국 6월 고용지표', aiConsult: '-' },
    { date: '2025.7.11', day: '금', time: '10:00', amount: '1,260,000', investment: 'TIGER 국고채30년(30%)', event: '한은 금통위 결정일', aiConsult: '금리 결정 후' },
    { date: '2025.7.25', day: '금', time: '10:00', amount: '630,000', investment: 'ACE KRX금현물(15%)', event: '한국 2분기 GDP', aiConsult: 'GDP 발표 후' },
    { date: '2025.9.19', day: '금', time: '10:00', amount: '420,000', investment: 'TIGER 미국S&P500(10%)', event: '분기 리밸런싱', aiConsult: '리밸런싱 상담' },
    { date: '2025.12.19', day: '금', time: '10:00', amount: '420,000', investment: 'ACE 국고채10년(10%)', event: '분기 리밸런싱', aiConsult: '리밸런싱 상담' },
    { date: '2026.9.18', day: '금', time: '10:00', amount: '다양한 종목', investment: '분기 리밸런싱', event: '중간선거 전 대비', aiConsult: '전략 재점검' },
    { date: '2026.11.3', day: '화', time: '10:00', amount: '유보', investment: '-', event: '미국 중간선거', aiConsult: '선거 결과 후' },
    { date: '2026.11.20', day: '금', time: '10:00', amount: '다양한 종목', investment: '전체 포트폴리오', event: '선거 후 시장 안정화', aiConsult: '종합 전략 재설정' },
  ];

  // 표시할 타임라인 데이터 선택
  const timelineData = pensionType === 'personal' ? personalPensionTimeline : retirementPensionTimeline;
  // 해당 연금의 투자 종목 데이터 가져오기 (티커 정보 활용 가능)
  const currentPensionItems = pensionType === 'personal' ? data.personalPension : data.retirementPension;
  console.log("Timeline using data:", currentPensionItems); // 데이터 사용 예시

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">투자 타임라인</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              pensionType === 'personal' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onPensionTypeChange('personal')}
          >
            개인 연금
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              pensionType === 'retirement' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onPensionTypeChange('retirement')}
          >
            퇴직 연금
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className={pensionType === 'personal' ? 'bg-blue-100' : 'bg-green-100'}>
              <th className="border p-2">날짜</th>
              <th className="border p-2">요일</th>
              <th className="border p-2">시간(KST)</th>
              <th className="border p-2">투자 금액(원)</th>
              <th className="border p-2">투자 종목(비율)</th>
              <th className="border p-2">경제 지표/이벤트</th>
              <th className="border p-2">AI 재상담</th>
            </tr>
          </thead>
          <tbody>
            {timelineData.map((item, index) => (
              <tr 
                key={index} 
                className={
                  item.event.includes('선거') || 
                  item.event.includes('리밸런싱') || 
                  item.aiConsult.includes('리밸런싱') ? 
                  'bg-yellow-50' : ''
                }
              >
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.day}</td>
                <td className="border p-2">{item.time}</td>
                <td className="border p-2 text-right">{item.amount}</td>
                <td className="border p-2">{item.investment}</td>
                <td className="border p-2">
                  {item.event.includes('선거') || item.event.includes('리밸런싱') ? 
                  <span className="font-bold text-red-600">{item.event}</span> : 
                  item.event}
                </td>
                <td className="border p-2">
                  {item.aiConsult !== '-' ? 
                  <span className="font-semibold text-blue-600">{item.aiConsult}</span> : 
                  item.aiConsult}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">주요 주의사항</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>모든 투자는 10:00 KST에 한국투자증권 앱을 통해 실행</li>
          <li>주요 경제 지표 발표일에 연동하여 투자 진행</li>
          <li>노란색 배경의 행은 중요 의사결정 시점이나 이벤트를 표시</li>
          <li><span className="font-semibold text-blue-600">파란색</span> 텍스트는 AI 상담이 필요한 시점</li>
          <li>선거 및 리밸런싱 시점에는 반드시 AI 상담 후 의사결정 필요</li>
        </ul>
      </div>
    </div>
  );
};

// 현금성 자산 관리 섹션
const CashManagementSection = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-800">현금성 자산 관리</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-blue-700">개인 연금 현금성 자산</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-blue-200 p-2 text-left">자산</th>
                <th className="border border-blue-200 p-2 text-right">금액(원)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-blue-200 p-2">KBSTAR 단기통안채 ETF</td>
                <td className="border border-blue-200 p-2 text-right">40,000,000</td>
              </tr>
              <tr>
                <td className="border border-blue-200 p-2">신한BEST MMF</td>
                <td className="border border-blue-200 p-2 text-right">16,270,000</td>
              </tr>
              <tr className="bg-blue-100 font-semibold">
                <td className="border border-blue-200 p-2">합계 (총 금액의 60%)</td>
                <td className="border border-blue-200 p-2 text-right">56,270,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-green-700">퇴직 연금 현금성 자산</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-green-200 p-2 text-left">자산</th>
                <th className="border border-green-200 p-2 text-right">금액(원)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-green-200 p-2">신한BEST MMF</td>
                <td className="border border-green-200 p-2 text-right">110,000,000</td>
              </tr>
              <tr>
                <td className="border border-green-200 p-2">삼성 국고채 단기맵 ETF</td>
                <td className="border border-green-200 p-2 text-right">76,540,000</td>
              </tr>
              <tr className="bg-green-100 font-semibold">
                <td className="border border-green-200 p-2">합계 (총 금액의 70%)</td>
                <td className="border border-green-200 p-2 text-right">186,540,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">현금 자산 모니터링 및 조정 일정</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">시점</th>
              <th className="border p-2">모니터링 항목</th>
              <th className="border p-2">AI 재상담 조건</th>
              <th className="border p-2">조치 사항</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">매월 1일</td>
              <td className="border p-2">금리 동향 및 전망</td>
              <td className="border p-2">금리 급변 시</td>
              <td className="border p-2">단기/장기 상품 간 비중 조정</td>
            </tr>
            <tr>
              <td className="border p-2">매 분기 첫 영업일</td>
              <td className="border p-2">수익률 및 인플레이션</td>
              <td className="border p-2">인플레이션 2%p 이상 변동 시</td>
              <td className="border p-2">인플레이션 대응 자산 비중 조정</td>
            </tr>
            <tr>
              <td className="border p-2">금리 인상 발표 시</td>
              <td className="border p-2">금리 상승 폭</td>
              <td className="border p-2">0.5%p 이상 인상 시</td>
              <td className="border p-2">단기 국채 ETF 비중 확대</td>
            </tr>
            <tr>
              <td className="border p-2">금리 인하 발표 시</td>
              <td className="border p-2">금리 하락 폭</td>
              <td className="border p-2">0.5%p 이상 인하 시</td>
              <td className="border p-2">MMF 비중 확대</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div className="bg-yellow-50 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-3 text-yellow-700">현금 관리 핵심 원칙</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>안전성 우선:</strong> 현금성 자산은 원금 보존을 최우선으로 관리</li>
        <li><strong>유동성 확보:</strong> 긴급 상황 대비 최소 30%는 즉시 출금 가능한 상품으로 유지</li>
        <li><strong>금리 효율성:</strong> 단기 금리 상승기에는 단기 국채 ETF 비중 확대</li>
        <li><strong>정기 점검:</strong> 매월 첫 영업일에 모든 현금성 자산의 수익률 및 안전성 점검</li>
        <li><strong>인플레이션 대응:</strong> 인플레이션이 2%p 이상 상승 시 금 비중 확대 검토</li>
      </ul>
    </div>
  </div>
);

// 경제 지표 모니터링 섹션
const IndicatorsSection = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-800">경제 지표 모니터링</h2>
    
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">핵심 모니터링 지표</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">경제 지표</th>
              <th className="border p-2">발표 주기</th>
              <th className="border p-2">확인 방법</th>
              <th className="border p-2">투자 의사결정 영향</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 font-semibold">한국은행 기준금리</td>
              <td className="border p-2">약 6주 간격</td>
              <td className="border p-2">한국은행 웹사이트</td>
              <td className="border p-2">금리 인상 시 채권 비중 조정, 인하 시 주식 비중 확대 검토</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">미국 고용지표</td>
              <td className="border p-2">매월 첫째 금요일</td>
              <td className="border p-2">미국 노동부 웹사이트</td>
              <td className="border p-2">예상 이상 호조 시 미국 ETF 비중 확대 검토</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">한국 GDP</td>
              <td className="border p-2">분기별</td>
              <td className="border p-2">한국은행 웹사이트</td>
              <td className="border p-2">성장률 호조 시 한국 주식 비중 확대 검토</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">한국 무역수지</td>
              <td className="border p-2">매월</td>
              <td className="border p-2">관세청 웹사이트</td>
              <td className="border p-2">수출 호조 시 반도체/조선 비중 확대 검토</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">인플레이션(CPI)</td>
              <td className="border p-2">매월</td>
              <td className="border p-2">통계청 웹사이트</td>
              <td className="border p-2">인플레이션 상승 시 금/원자재 비중 확대 검토</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-blue-700">AI 재상담 템플릿 질문</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">금리 결정 후 상담:</h4>
            <div className="bg-white p-3 rounded border border-blue-200 text-sm">
              최근 [한국은행/미 연준]의 기준금리가 [인상/인하/유지]되었습니다. 
              현재 개인연금(현금 비중 60%)과 퇴직연금(현금 비중 70%)의 자산 배분에 
              어떤 조정이 필요할까요? 특히 [채권 ETF/주식 ETF] 비중에 대한 
              조언을 부탁드립니다.
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold">분기 GDP 발표 후 상담:</h4>
            <div className="bg-white p-3 rounded border border-blue-200 text-sm">
              한국의 [X분기] GDP가 [성장률 수치]로 발표되었습니다. 
              이는 [예상치 대비 평가]입니다. 이러한 경제 상황에서 
              개인연금과 퇴직연금의 [경기민감 섹터/방어 섹터] 비중을 
              어떻게 조정해야 할까요?
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold">리밸런싱 상담:</h4>
            <div className="bg-white p-3 rounded border border-blue-200 text-sm">
              현재 포트폴리오의 실제 자산 배분은 다음과 같습니다:
              [현재 자산 배분 상세 내역]

              목표 배분 대비 [X% 이상] 차이가 나는 자산군은 
              [구체적 자산군 목록]입니다. 현재 시장 상황을 고려할 때 
              어떻게 리밸런싱을 실행해야 할까요?
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-yellow-700">지표 대응 의사결정 체계</h3>
        <ul className="space-y-2">
          <li><strong>고용지표 강세:</strong> 미국 ETF 비중 +2%</li>
          <li><strong>무역수지 흑자 확대:</strong> 반도체/조선 ETF 비중 +2%</li>
          <li><strong>인플레이션 상승:</strong> 금/원자재 ETF 비중 +2%</li>
          <li><strong>금리 인상:</strong> 단기 국채 비중 +3%, 장기 국채 비중 -3%</li>
          <li><strong>금리 인하:</strong> 성장주 ETF 비중 +2%</li>
          <li><strong>GDP 성장률 하락:</strong> 방어 자산 비중 +3%</li>
          <li><strong>미 중간선거 결과:</strong> 전체 포트폴리오 재검토</li>
        </ul>
        
        <div className="mt-4 bg-white p-3 rounded border border-yellow-300">
          <h4 className="font-semibold mb-2">지표 확인 리마인더 설정</h4>
          <ul className="list-disc list-inside text-sm">
            <li>한국은행 금통위: 매월 마지막 주 목요일 오전 9시</li>
            <li>미 고용지표: 매월 첫째 금요일 오후 9:30</li>
            <li>한국 GDP: 분기 마지막 달 25일경</li>
            <li>인플레이션: 매월 5일경</li>
            <li>무역수지: 매월 1일</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">주요 경제 이벤트 캘린더 (2025-2026)</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">날짜</th>
              <th className="border p-2">이벤트</th>
              <th className="border p-2">중요도</th>
              <th className="border p-2">대응 전략</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">2025년 5월 7일</td>
              <td className="border p-2">미 연준 FOMC 금리 결정</td>
              <td className="border p-2 text-center">
                <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">매우 높음</span>
              </td>
              <td className="border p-2">결정 직후 AI 상담, 금리 상승 시 채권 만기 단축</td>
            </tr>
            <tr>
              <td className="border p-2">2025년 6월 3일</td>
              <td className="border p-2">한국 대통령 선거</td>
              <td className="border p-2 text-center">
                <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">매우 높음</span>
              </td>
              <td className="border p-2">선거 전 투자 유보, 결과 후 정책 방향 분석 및 AI 상담</td>
            </tr>
            <tr>
              <td className="border p-2">2025년 7월 25일</td>
              <td className="border p-2">한국 2분기 GDP 발표</td>
              <td className="border p-2 text-center">
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold">높음</span>
              </td>
              <td className="border p-2">경제 성장률에 따른 섹터 배분 조정, AI 상담</td>
            </tr>
            <tr>
              <td className="border p-2">2025년 9월 18일</td>
              <td className="border p-2">미 연준 FOMC 금리 결정</td>
              <td className="border p-2 text-center">
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold">높음</span>
              </td>
              <td className="border p-2">결정 직후 AI 상담, 금리 하락 시 장기 채권 비중 확대</td>
            </tr>
            <tr>
              <td className="border p-2">2026년 11월 3일</td>
              <td className="border p-2">미국 중간선거</td>
              <td className="border p-2 text-center">
                <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">매우 높음</span>
              </td>
              <td className="border p-2">9월부터 포트폴리오 방어적 조정, 선거 결과 후 전면 재검토</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// 리밸런싱 섹션
const RebalancingSection = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-800">리밸런싱 체계</h2>
    
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">리밸런싱 기준 및 일정</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">주기</th>
              <th className="border p-2">시점</th>
              <th className="border p-2">기준</th>
              <th className="border p-2">실행 방법</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">정기 리밸런싱</td>
              <td className="border p-2">분기별 (3,6,9,12월 셋째 금요일)</td>
              <td className="border p-2">목표 배분비 ±5% 이상 차이 시</td>
              <td className="border p-2">AI 상담 후 한국투자증권 앱에서 실행</td>
            </tr>
            <tr>
              <td className="border p-2">긴급 리밸런싱</td>
              <td className="border p-2">단일 자산군 ±7% 이상 차이 발생 시</td>
              <td className="border p-2">목표 배분비 ±7% 이상 차이</td>
              <td className="border p-2">즉시 AI 상담 후 조정</td>
            </tr>
            <tr>
              <td className="border p-2">전략 재검토</td>
              <td className="border p-2">반기별 (6월, 12월 셋째 금요일)</td>
              <td className="border p-2">전체 포트폴리오 성과 평가</td>
              <td className="border p-2">AI 상담 후 자산 배분 전략 재검토</td>
            </tr>
            <tr>
              <td className="border p-2">이벤트 기반</td>
              <td className="border p-2">주요 경제/정치 이벤트 후</td>
              <td className="border p-2">영향도 평가 후 결정</td>
              <td className="border p-2">AI 상담 후 필요시 조정</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-red-700">트리거 이벤트 및 조치 사항</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-100">
                <th className="border border-red-200 p-2">트리거 이벤트</th>
                <th className="border border-red-200 p-2">조건</th>
                <th className="border border-red-200 p-2">조치 사항</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-red-200 p-2">급격한 시장 하락</td>
                <td className="border border-red-200 p-2">KOSPI/S&P500 15% 이상 하락</td>
                <td className="border border-red-200 p-2">현금 투입 시기 조정, 방어 자산 비중 확대</td>
              </tr>
              <tr>
                <td className="border border-red-200 p-2">금리 급등</td>
                <td className="border border-red-200 p-2">기준금리 0.5%p 이상 인상</td>
                <td className="border border-red-200 p-2">장기 채권 비중 축소, 단기 채권 확대</td>
              </tr>
              <tr>
                <td className="border border-red-200 p-2">환율 급변</td>
                <td className="border border-red-200 p-2">원/달러 10% 이상 변동</td>
                <td className="border border-red-200 p-2">해외 자산 비중 조정</td>
              </tr>
              <tr>
                <td className="border border-red-200 p-2">지정학적 위기</td>
                <td className="border border-red-200 p-2">전쟁, 무역 갈등 심화</td>
                <td className="border border-red-200 p-2">금, 국채 비중 확대</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-blue-700">데이터 기반 의사결정 프로세스</h3>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            <strong>데이터 수집</strong>
            <p className="text-sm ml-5 mt-1">경제 지표, 시장 성과, 포트폴리오 성과 정리</p>
          </li>
          <li>
            <strong>AI 상담 준비</strong>
            <p className="text-sm ml-5 mt-1">관련 데이터와 구체적 질문 준비</p>
          </li>
          <li>
            <strong>AI 상담 실행</strong>
            <p className="text-sm ml-5 mt-1">정해진 템플릿으로 AI에게 조언 요청</p>
          </li>
          <li>
            <strong>의사결정</strong>
            <p className="text-sm ml-5 mt-1">AI 조언 검토 후 필요한 조치 결정</p>
          </li>
          <li>
            <strong>실행</strong>
            <p className="text-sm ml-5 mt-1">한국투자증권 앱을 통해 조치 실행</p>
          </li>
          <li>
            <strong>기록</strong>
            <p className="text-sm ml-5 mt-1">의사결정 내용과 이유, 실행 결과 기록</p>
          </li>
        </ol>
      </div>
    </div>
    
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">투자 심리 관리 전략</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded shadow">
          <h4 className="font-semibold text-blue-700 mb-2">투자 일지 작성</h4>
          <p className="text-sm">매월 투자 후 간단한 투자 일지를 작성하여 당시 시장 상황과 투자 결정 이유를 기록. 이는 나중에 투자 패턴을 분석하고 감정적 판단을 줄이는 데 도움.</p>
        </div>
        
        <div className="bg-white p-3 rounded shadow">
          <h4 className="font-semibold text-blue-700 mb-2">성과 확인 제한</h4>
          <p className="text-sm">매일 포트폴리오 성과를 확인하는 것은 불안감을 높일 수 있음. 월 1회 또는 분기별로만 성과를 확인하는 것이 심리적 안정에 도움.</p>
        </div>
        
        <div className="bg-white p-3 rounded shadow">
          <h4 className="font-semibold text-blue-700 mb-2">장기 목표 유지</h4>
          <p className="text-sm">단기 시장 변동에 과민반응하지 말고, 은퇴 후 안정적인 수입원 확보라는 장기 목표에 집중. 장기적 관점에서 일관된 전략 유지.</p>
        </div>
      </div>
    </div>
  </div>
);

export default InvestmentStrategyDashboard;