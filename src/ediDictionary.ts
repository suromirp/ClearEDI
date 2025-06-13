export const ediDictionary: Record<
  string,
  { label: string; fields?: Record<string, string> }
> = {
  UNA: { label: 'Service String (UNA)' },
  UNB: { label: 'Interchange header (UNB)' },
  UNH: {
    label: 'Berichtkop (UNH)',
    fields: {
      ORDERS: 'Bestelling',
      INVOIC: 'Factuur',
    },
  },
  BGM: {
    label: 'Berichtinformatie',
    fields: {
      '220': 'Bestelling',
      '9': 'Origineel bericht',
    },
  },
  DTM: {
    label: 'Datum/tijd (DTM)',
    fields: {
      '137': 'Berichtdatum',
      '2': 'Leverdatum',
    },
  },
  NAD: {
    label: 'Naam en adres (NAD)',
    fields: {
      BY: 'Koper (Buyer)',
      SU: 'Leverancier (Supplier)',
      DP: 'Afleveradres (Delivery Party)',
      IV: 'Factuuradres (Invoice Party)',
    },
  },
  RFF: {
    label: 'Referentie (RFF)',
    fields: {
      ON: 'Ordernummer',
      DQ: 'Pakbonnummer',
      VA: 'BTW-nummer',
    },
  },
  CUX: {
    label: 'Valuta (CUX)',
    fields: {
      '2': 'Valutacode',
      EUR: 'Euro',
    },
  },
  LIN: { label: 'Artikelregel (LIN)' },
  QTY: {
    label: 'Aantal (QTY)',
    fields: {
      '21': 'Besteld aantal',
    },
  },
  PRI: {
    label: 'Prijsinformatie (PRI)',
    fields: {
      AAA: 'Nettoprijs',
      AAB: 'Brutoprijs',
    },
  },
  TAX: {
    label: 'BTW-specificatie (TAX)',
    fields: {
      '7+VAT': 'BTW hoog tarief',
    },
  },
  UNS: {
    label: 'Overgang naar samenvatting (UNS)',
    fields: {
      S: 'Start samenvattend blok',
    },
  },
  CNT: {
    label: 'Tellingen (CNT)',
    fields: {
      '2': 'Aantal artikelregels',
    },
  },
  UNT: { label: 'Berichteinde (UNT)' },
  UNZ: { label: 'Interchange trailer (UNZ)' },
};
