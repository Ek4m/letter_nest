import * as bcrypt from 'bcrypt';
export class Encryption {
  static generateSalt = (round: number) => {
    return bcrypt.genSaltSync(round);
  };

  static hashPassword = (pswd: string) => {
    const salt = this.generateSalt(30);
    const hashed = bcrypt.hashSync(pswd, salt);
    return hashed;
  };

  static isMatched = (original: string, hashed: string) =>
    bcrypt.compare(original, hashed);
}
