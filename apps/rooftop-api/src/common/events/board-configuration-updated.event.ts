export class BoardConfigurationUpdatedEvent {
  static eventName = 'board-configuration.updated';

  constructor(public readonly boardId: string) {}
}
