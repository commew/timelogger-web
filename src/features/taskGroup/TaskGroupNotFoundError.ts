export class TaskGroupNotFoundError extends Error {
  static {
    this.prototype.name = 'TaskGroupNotFoundError';
  }
}
