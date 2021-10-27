/**
 * @리팩터링 변수 인라인하기
 * @function statement 공연료 청구서를 출력하는 함수
 * @param {*} invoice
 * @param {*} plays
 */
function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += ` ${playFor(pref).name}: ${usd(amountFor(perf))} (${pref.audience}석)\n`; // thisAmount 변수를 인라인
    totalAmount += amountFor(perf); // thisAmount 변수를 인라인
  }
  /**
   * @리팩터링 문장 슬라이드하기
   * @리팩터링 반복문 쪼개기
   */
  let volumeCredits = 0;  // 변수 선언(초기화)을 반복문 앞으로 이동
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(pref) // 값 누적 로직을 별도 for문으로 분리
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;

  /**
   * @리팩터링 함수 선언 바꾸기
   * @function amountFor 금액 구하기 위한 함수
   * @param {*} aPerformance
   * @returns 금액 반환
   */
  function amountFor(aPerformance) {  // 필요 없어진 매개변수 제거
    let result = 0; // 변수를 초기화하는 코드
    switch (playFor(aPerformance).type) { // play를 playFor()호출로 변경
        case "tragedy": // 비극
          result = 40000;
          if (aPerformance.audience > 30) {
            result += 1000 * (aPerformance.audience - 30);
          }
          break;
        case "comedy": // 희극
          result = 30000;
          if (aPerformance.audience > 20) {
            result += 10000 + 500 * (aPerformance.audience - 20);
          }
          result += 300 * aPerformance.audience;
          break;
        default:
          throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);  //  play를 playFor()호출로 변경
    }
    return result;  // 함수 안에서 값이 바뀌는 함수 반환
  }

  /**
   * play 같은 임시 변수를 질의 함수로 리팩터링
   * @function playFor
   * @param {*} aPerformance
   * @returns
   */
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  /**
   * pref 매개 변수를 리팩터링을 하기 위해
   * @function volumeCreditsFor
   * @param {*} aPerformance
   * @returns volumeCredits의 본제본을 초기화한 뒤 계산 결과를 반환
   */
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  /**
   * 함수 변수를 일반 함수로 변경
   * @리팩터링 함수 선언 바꾸기
   * @function usd
   * @param {*} aNumber
   * @returns
   */
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100);
  }
}
