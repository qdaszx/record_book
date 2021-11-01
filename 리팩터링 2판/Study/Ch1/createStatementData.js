class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay;
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }

  get amount() {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
  }
}

const createPerformanceCalculator = (aPerformance, aPlay) => {
  switch (aPlay.type) {
    case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
    case "comedy": return new ComedyCalculator(aPerformance, aPlay);
    default:
      return new PerformanceCalculator(aPerformance, aPlay);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  };
}

class ComedyCalculator extends PerformanceCalculator {
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  };
}

const createStatementData = (invoice, plays) => {
  const totalVolumeCredits = (data) => {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
  const totalAmount = (data) => {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }


  const playFor = aPerformance => plays[aPerformance.playID];
  const enrichPerformance = (aPerformance) => {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = { ...aPerformance };
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  };
  return {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    totalAmount: totalAmount(statementData),
    totalVolumeCredits: totalVolumeCredits(statementData)
  };
}

export default createStatementData;