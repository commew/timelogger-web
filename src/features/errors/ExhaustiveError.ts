export class ExhaustiveError extends Error {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }

  static {
    this.prototype.name = 'ExhaustiveError';
  }
}
