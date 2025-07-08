export const messageTypeMap: Record<string, string> = {
    '220': 'ORDERS',
    '231': 'ORDRSP',
    '351': 'INVOIC',
    'DESADV': 'DESADV'
  };
  
  export type EdiMessageType = 'ORDERS' | 'ORDRSP' | 'INVOIC' | 'DESADV';  