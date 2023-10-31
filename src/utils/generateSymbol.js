export default function generateSymbol() {
  const symbols = ["X", "O"];
  const randomNum = Math.floor(Math.random() * 2);
  return symbols[randomNum];
}
