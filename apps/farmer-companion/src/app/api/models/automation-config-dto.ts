/* tslint:disable */
/* eslint-disable */
import { ActionJsonData } from './action-json-data';
import { EvaluatorJsonData } from './evaluator-json-data';
export interface AutomationConfigDto {
  actions: Array<ActionJsonData>;
  active: boolean;
  conditions: Array<EvaluatorJsonData>;
  id: string;
  name: string;
  triggers: Array<EvaluatorJsonData>;
}
