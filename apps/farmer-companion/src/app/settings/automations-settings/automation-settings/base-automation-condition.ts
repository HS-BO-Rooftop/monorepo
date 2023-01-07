import { v4 as uuidv4 } from 'uuid';
import { ActionJsonData, EvaluatorJsonData } from '../../../api/models';

export abstract class IdObject {
  id = uuidv4();
}

export abstract class BaseAutomationCondition extends IdObject{
  public abstract toJson(): EvaluatorJsonData;
}

export abstract class BaseAutomationAction extends IdObject {
  public abstract toJson(): ActionJsonData;
}
