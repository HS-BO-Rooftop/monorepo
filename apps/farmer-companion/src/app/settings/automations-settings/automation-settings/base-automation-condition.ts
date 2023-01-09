import { Directive, EventEmitter, OnDestroy } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ActionJsonData, EvaluatorJsonData } from '../../../api/models';

export abstract class IdObject {
  id = uuidv4();
}

@Directive()
class DeleteAutomationDirective extends IdObject implements OnDestroy{
  public onDelete = new EventEmitter<string>();

  public delete(): void {
    this.onDelete.emit(this.id);
  }

  ngOnDestroy(): void {
    this.onDelete.unsubscribe();
  }
}

export abstract class BaseAutomationCondition extends DeleteAutomationDirective{
  public abstract toJson(): EvaluatorJsonData;
}

export abstract class BaseAutomationAction extends DeleteAutomationDirective {
  public abstract toJson(): ActionJsonData;
}
