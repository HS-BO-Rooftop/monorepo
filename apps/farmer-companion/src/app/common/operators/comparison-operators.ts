export const operators = [
  {
    name: 'Equal',
    value: 'eq',
  },
  {
    name: 'Not equal',
    value: 'neq',
  },
  {
    name: 'Greater than',
    value: 'gt',
  },
  {
    name: 'Greater than or equal',
    value: 'gte',
  },
  {
    name: 'Less than',
    value: 'lt',
  },
  {
    name: 'Less than or equal',
    value: 'lte',
  },
] as const;

export const operatorsType = typeof operators;