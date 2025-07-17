export const ediDictionary = {
  UNB: { name: 'Interchange Header' },

  UNZ: {
    name: 'Interchange trailer',
    fields: {
      // UNZ010 = Number of messages in the interchange
      'UNZ010': 'Number of messages',
      // UNZ020 = Interchange control reference
      'UNZ020': 'Interchange control reference'
    }
  },
  
  UNH: { name: 'Message Header' },
  UNT: { name: 'Message Trailer' },

  BGM: {
    name: 'Beginning of Message',
    fields: {
      // Document/Message Name (C002/1001)
      '220': 'Order',
      '231': 'Purchase order response',
      '351': 'Despatch advice',
      '380': 'Commercial invoice',
      '381': 'Credit note',
      // Message Function (1225)
      '9':   'Original',
      '4':   'Change',
      '29':  'Accepted without amendment',
    }
  },

  DTM: {
    name: 'Date/Time/Period',
    fields: {
      '137': 'Document/message date/time',
      '2':   'Requested delivery date/time',
      '11':  'Despatch date and/or time',
      '132': 'Arrival date/time, estimated',
      '171': 'Order date/time',
      '67':  'Confirmed delivery date/time',
      '506': 'Backorder delivery date/time',
      '102': 'CCYYMMDD (format qualifier)'
    }
  },

  RFF: {
    name: 'Reference',
    fields: {
      'ON':  'Order number',
      'ADE': 'Account number',
      'BM':  'Bill of lading number',
      'IV':  'Invoice number',
      'DQ':  'Delivery note number',
      'VA':  'VAT registration number'
    }
  },

  NAD: {
    name: 'Name and address',
    fields: {
      BY: 'Buyer',
      SU: 'Supplier',
      DP: 'Delivery party',
      IV: 'Invoicee',
    },
    countries: {
      NL: 'Netherlands',
      DE: 'Germany',
      FR: 'France',
      BE: 'Belgium',
    }
  },

  CUX: {
    name: 'Currency Details',
    fields: {
      '2': 'Reference currency',
      '9': 'Order currency',
      '4': 'Invoicing currency'
    },
    currencies: {
      'EUR': 'Euro'
    }
  },

  LIN: { name: 'Line Item',
    fields: {
      '2': 'Cancelled',
      '5': 'Accepted without amendment',
      '6': 'Accepted with amendment',
      'EN': 'International Article Numbering Association (EAN)',
    },
   },

  PIA: {
    name: 'Additional product ID',
    // function qualifiers
    fields: {
      '1': 'Additional identification',
      '5': 'Buyers item number',
    },
    // PIA020 code‐list qualifiers (C212-03)
    codeLists: {
      SA: 'Supplier’s article number',
      IN: 'Buyer’s item number',
    }
  },

  QTY: {
    name: 'Quantity',
    fields: {
      '21':  'Ordered quantity',
      '12':  'Confirmed/despatched quantity',
      '47':  'Invoiced quantity',
      '182': 'Cancelled quantity',
      '83':  'Backorder quantity'
    }
  },

  PRI: {
    name: 'Price',
    fields: {
      'AAA': 'Calculation net',
      'AAB': 'Calculation gross'
    }
  },

  TAX: {
    name: 'Tax',
    fields: {
      // TAX010
      '7':   'Tax',
      // TAX020-010
      'VAT': 'Value added tax',
      // TAX060 (category)
      'S':   'Standard rate',
      'Z':   'Zero rated goods',
      'E':   'Exempt from tax'
    }
  },

  FTX: {
    name: 'Free Text',
    fields: {
      'AAI': 'General information',
      '1':   'Text for subsequent use'
    }
  },

  PAT: {
    name: 'Payment Terms',
    fields: {
      '1': 'Basic',
      '5': 'Date of invoice',
      'D': 'Day'
    }
  },

  PCD: {
    name: 'Percentage Details',
    fields: {
      '7':  'Percentage of invoice',
      '13': 'Invoice value'
    }
  },

  ALC: {
    name: 'Allowance/Charge',
    fields: {
      'A':  'Allowance',
      'C':  'Charge',
      'FC': 'Freight Charge',
      'TD': 'Trade Discount'
    }
  },

  IMD: {
    name: 'Item Description',
    fields: {
      'F':  'Free-form',
      '81': 'Title'
    }
  },

  MOA: {
    name: 'Monetary Amount',
    fields: {
      '203': 'Line item amount',
      '8':   'Charge/Allowance amount'
    }
  },

  TDT: {
    name: 'Details of Transport',
    fields: {
      '8067': 'Transport mode coded',
      '31':   'Truck'
    }
  },

  CPS: { name: 'Consignment Packing Sequence' },

  PAC: {
    name: 'Packaging',
    fields: {
      '52': 'Barcoded package'
    }
  },

  MEA: {
    name: 'Measurements',
    fields: {
      PD:  'Physical dimensions',
      KGM: 'Kilogram',
    }
  },

  HAN: { name: 'Handling Instructions' },

  PCI: {
    name: 'Package Identification',
    fields: {
      '33E': 'SSCC label'
    }
  },

  GIN: {
    name: 'Goods Identity Number',
    fields: {
      BJ: 'Batch number',
    }
  },

  UNS: {
    name: 'Section control',
    fields: {
      S: 'Start of detail section',
      D: 'Start of summary section'
    }
  },

  CNT: {
    name: 'Control total',
    fields: {
      '2': 'Number of line items in message'
    }  
  },
};
