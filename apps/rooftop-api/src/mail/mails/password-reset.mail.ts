import { Mail } from './mail';

type passwordResetData = {
  user: {
    firstName: string;
    lastName: string;
  };
  code: string;
};

export class PasswordResetMail extends Mail<passwordResetData> {
  override toText(): string {
    return `
Hallo ${this.data.user.firstName} ${this.data.user.lastName}.
Jemand hat gerade das zurücksetzen ihres Passworts angefragt.
Falls Sie dies nicht waren kontaktieren Sie umgehenst die Administratoren.

Falls Sie dies waren geben Sie bitte den Code
${this.data.code}
in ihrere App ein und folgen Sie den Anweisungen.

Ihr Farmer-Companion Team
`;
  }
}
