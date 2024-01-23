/* eslint-disable no-nested-ternary */
export default function grade(score: number) {
  return score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : score >= 50 ? 'E' : 'F';
}
