function creatPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
    case "comedy": return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  };
};

class TragedyCalculator extends PerformanceCalculator {

};

class ComedyCalculator extends PerformanceCalculator {

}

class PerformanceCalculator { // 공연료 계산기 클래스
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.aPerformance.play.audience - 30, 0);
    if ("comedy" === playFor(this.aPerformance).type) result += Math.floor(this.aPerformance.audience / 5);
    return result;
  }

  get amount() {  // amountFor() 함수의 코드를 계산기 클래스로 복사
    let result = 0;
    switch (this.play.type) { // amountFor() 함수가 매개 변수로 받던 정보를 계산기 필드에서 바로 얻음
        case "tragedy":
          result = 40000;
          if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
          }
          break;
        case "comedy":
          result = 30000;
          if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
          }
          result += 300 * this.performance.audience;
          break;
        default:
          throw new Error(`알 수 없는 장르: ${this.performance.play.type}`);
    }
    return result;
  }
}

export default function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  function enrichPerformance(aPerformance) {
    const calculator = creatPerformanceCalculator(aPerformance, playFor(aPerformance)); // 생선자 대신 팩터리 함수 이용
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;  // amountFor() 대신 계산기의 함수 이용
    result.volumeCredits = calculator.volumeCredits;
    return result;
  };

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  };

  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount; // 원본 함수인 amountFor()도 계산기를 이용하도록 수정
  };

  function volumeCreditsFor(aPerformance) {

  };

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  };

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  };
}