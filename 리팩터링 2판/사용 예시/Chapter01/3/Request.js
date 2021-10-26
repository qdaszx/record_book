/**
 * @function statement 공연료 청구서를 출력하는 함수
 * @param {*} invoice
 * @param {*} plays
 */
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play); // 추출한 함수를 이용

    // 포인트를 적립한다.
    volumeCredits += Math.max(pref.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === play.type) valumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount / 100)} (${pref.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

/**
 * 리팩터링 - 변수의 이름은 명확하게(함수의 변환 값에는 result를 반환한다.)
 * @function amountFor 금액 구하기 위한 함수
 * @param {*} perf
 * @param {*} play
 * @returns 금액 반환
 */
function amountFor(perf, play) {  // 값이 바뀌지 않는 변수는 매개변수로 전달
  let result = 0; // 변수를 초기화하는 코드
  switch (play.type) {
      case "tragedy": // 비극
        result = 40000;
        if (perf.audience > 30) {
          result += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (perf.audience > 20) {
          result += 10000 + 500 * (perf.audience - 20);
        }
        result += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
  }
  return result;  // 함수 안에서 값이 바뀌는 함수 반환
}
