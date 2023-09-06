export class TaskCategoryNotFoundError extends Error {
  static {
    this.prototype.name = 'TaskCategoryNotFoundError';
  }
}
