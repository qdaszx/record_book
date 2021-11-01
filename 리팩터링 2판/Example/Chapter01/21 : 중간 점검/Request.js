/**
 * @중간점검 최상위의 statement() 함수는 단 일곱 줄뿐입니다. 결과적으로 각 계산 과정은 물론 전체 흐름을 이해하기 훨씬 쉬워졌습니다.
 * @리팩토링 단계 쪼개기
 * @목표1 statement()에 필요한 데이터를 처리
 * @목표2 앞서 처리한 결과를 텍스트나 HTML로 표현
 */

function statement(invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(pref).name}: ${usd(amountFor(perf))} (${pref.audience}석)\n`;
  }
  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
        case "tragedy":
          result = 40000;
          if (aPerformance.audience > 30) {
            result += 1000 * (aPerformance.audience - 30);
          }
          break;
        case "comedy":
          result = 30000;
          if (aPerformance.audience > 20) {
            result += 10000 + 500 * (aPerformance.audience - 20);
          }
          result += 300 * aPerformance.audience;
          break;
        default:
          throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(pref)
    }
    return volumeCredits;
  }

  function totalAmount() {
    let reuslt = 0;
    for (let pref of invoice.performances) {
      reuslt += amountFor(perf);
    }
    return reuslt;
  }
}
