/**
 * @리팩터링 변수 인라인하기
 * @function statement 공연료 청구서를 출력하는 함수
 * @param {*} invoice
 * @param {*} plays
 */
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(pref) // 추출한 함수를 이용해 값을 누적
    // 희극 관객 5명마다 추가 포인트를 제공한다.

    // 청구 내역을 출력한다.
    result += ` ${playFor(pref).name}: ${format(amountFor(perf) / 100)} (${pref.audience}석)\n`; // thisAmount 변수를 인라인
    totalAmount += amountFor(perf); // thisAmount 변수를 인라인
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
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
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
  }
}




