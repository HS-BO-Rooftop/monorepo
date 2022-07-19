export abstract class Mail<Data> {
  constructor(
    public readonly templateName: string,
    public readonly subject: string,
    public readonly to: string,
    public readonly data: Data
  ) {}

  abstract toText(): string;
}
