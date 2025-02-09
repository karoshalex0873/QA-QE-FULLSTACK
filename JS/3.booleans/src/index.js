import bcrypt from 'bcryptjs';
import chalk from 'chalk';
const user = {
  hashedPassword: bcrypt.hashSync("securePass", 10), // 
  correctMfaCode: "010101",
  balance: 1000,
  dailyLimit: 500
};
console.log(user.hashedPassword)

const verifyPassword = (inputPassword, storedHashedPassword) => {
  return bcrypt.compareSync(inputPassword, storedHashedPassword);
};

const verifyMFA = (inputMfaCode, correctMfaCode) => inputMfaCode === correctMfaCode?  true : false;

const checkBalance = (balance, withdrawalAmount) => balance >= withdrawalAmount? true : false;

const checkDailyLimit = (withdrawalAmount, dailyLimit) => withdrawalAmount <= dailyLimit? true : false;

const processWithdrawal = (user, inputPassword, inputMfaCode, withdrawalAmount) => {
  if (verifyPassword(inputPassword, user.hashedPassword) == false) {
    return `Transaction failed: Incorrect password`;
  }
  if (verifyMFA(inputMfaCode, user.correctMfaCode) == false) {
    return `Transaction failed: MFA failed`;
  }
  if (checkBalance(user.balance, withdrawalAmount) == false) {
    return `Transaction failed: Insufficient Balance`;
  }
  if (checkDailyLimit(withdrawalAmount, user.dailyLimit) == false) {
    return `Transaction failed: Amount exceeds daily limit`;
  }
  
  user.balance -= withdrawalAmount;
  return `Transaction successful! New Balance: ${user.balance}`;
}; 



console.log(chalk.bgGreen.white(processWithdrawal(user, 'securePass', '010101', 200))); // Transaction successful! New Balance: 800
 console.log(chalk.bgRed.white(processWithdrawal(user, 'mypass', '010101', 400))); // Transaction failed: Incorrect password
 console.log(chalk.bgMagenta.white(processWithdrawal(user, 'securePass', '12345', 600))); //Transaction failed: MFA failed
 console.log(chalk.bgYellow.black(processWithdrawal(user, 'securePass', '010101', 1200))); //Transaction failed: Insufficient Balance
 console.log(chalk.bgBlue.white(processWithdrawal(user, 'securePass', '010101', 600))); //Transaction failed: Amount exceeds daily limit