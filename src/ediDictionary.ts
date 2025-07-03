export const ediDictionary = {
  UNB: { name: 'Interchange Header' },
  UNH: { name: 'Message Header' },
  BGM: { name: 'Beginning of Message' },
  DTM: {
    name: 'Date/Time/Period',
    fields: {
      '137': 'Document/message date/time',
      '2': 'Delivery date/time, requested',
      '11': 'Despatch date and/or time, actual',
      '132': 'Arrival date/time, estimated',
      '171': 'Invoice date',
      '35': 'Delivery date/time, actual',
      '50': 'Goods receipt date/time',
    }
  },
  NAD: {
    name: 'Name and Address',
    fields: {
      'BY': 'Buyer',
      'SU': 'Supplier',
      'DP': 'Delivery party',
      'IV': 'Invoicee',
    }
  },
  RFF: {
    name: 'Reference',
    fields: {
      'ON': 'Order number',
      'DQ': 'Delivery note number',
      'VN': 'Supplier reference number',
      'IV': 'Invoice number'
    }
  },
  LIN: { name: 'Line Item' },
  QTY: {
    name: 'Quantity',
    fields: {
      '21': 'Ordered quantity',
      '12': 'Despatched quantity',
      '47': 'Invoiced quantity',
    }
  },
  PRI: {
    name: 'Price',
    fields: {
      'AAA': 'Net price',
      'AAB': 'Gross price',
    }
  },
  UNS: { name: 'Section control' },
  UNT: { name: 'Message trailer' },
  UNZ: { name: 'Interchange trailer' },
};
