/// <reference types="jest" />
/**
 * @jest-environment node
 */
import { ediDictionary } from '../src/ediDictionary';

describe('ediDictionary', () => {
  describe('BGM segment', () => {
    const bgmFields = ediDictionary.BGM.fields;

    it('should return correct name and description for code 351', () => {
      expect(bgmFields['351']).toBe('Despatch advice');
    });

    it('should return correct description for message function code 9', () => {
      expect(bgmFields['9']).toBe('Original');
    });

    it('should return undefined for invalid BGM code', () => {
      expect(bgmFields['999'] as unknown as string | undefined).toBeUndefined();
    });
  });

  describe('DTM segment', () => {
    const dtmFields = ediDictionary.DTM.fields as unknown as Record<
      string,
      string
    >;

    it('should map 11 to Despatch date and or time', () => {
      expect(dtmFields['11']).toBe('Despatch date and or time');
    });

    it('should map 132 to Arrival date/time, estimated', () => {
      expect(dtmFields['132']).toBe('Arrival date/time, estimated');
    });

    it('should map 137 to Document/message date/time', () => {
      expect(dtmFields['137']).toBe('Document/message date/time');
    });

    it('should map 361 to Best before date', () => {
      expect(dtmFields['361']).toBe('Best before date');
    });

    it('should return undefined for unknown qualifier', () => {
      expect(dtmFields['999'] as unknown as string | undefined).toBeUndefined();
    });
  });

  describe('RFF segment', () => {
    const rffFields = ediDictionary.RFF.fields as unknown as Record<
      string,
      string
    >;

    it('should map BM to Bill of lading number', () => {
      expect(rffFields['BM']).toBe('Bill of lading number');
    });

    it('should map ON to Order number (purchase)', () => {
      expect(rffFields['ON']).toBe('Order number (purchase)');
    });

    it('should return undefined for unknown qualifier', () => {
      expect(rffFields['XX'] as unknown as string | undefined).toBeUndefined();
    });
  });

  describe('NAD segment', () => {
    const nadFields = ediDictionary.NAD.fields as unknown as Record<
      string,
      string
    >;

    it('should map BY to Buyer', () => {
      expect(nadFields['BY']).toBe('Buyer');
    });

    it('should map DP to Delivery party', () => {
      expect(nadFields['DP']).toBe('Delivery party');
    });

    it('should map SU to Supplier', () => {
      expect(nadFields['SU']).toBe('Supplier');
    });

    it('should map CA to Carrier', () => {
      expect(nadFields['CA']).toBe('Carrier');
    });

    it('should return undefined for invalid NAD qualifier', () => {
      expect(nadFields['XX'] as unknown as string | undefined).toBeUndefined();
    });
  });

  describe('QTY segment', () => {
    const qtyFields = ediDictionary.QTY.fields as unknown as Record<
      string,
      string
    >;

    it('should map 12 to Confirmed quantity', () => {
      expect(qtyFields['12']).toBe('Confirmed quantity');
    });

    it('should return undefined for unknown QTY qualifier', () => {
      expect(qtyFields['99'] as unknown as string | undefined).toBeUndefined();
    });
  });

  describe('GIN segment', () => {
    const ginFields = ediDictionary.GIN.fields as unknown as Record<
      string,
      string
    >;

    it('should map BJ to Serial shipping container code', () => {
      expect(ginFields['BJ']).toBe('Serial shipping container code');
    });

    it('should map BN to Serial number', () => {
      expect(ginFields['BN']).toBe('Serial number');
    });

    it('should map BX to Batch number', () => {
      expect(ginFields['BX']).toBe('Batch number');
    });
  });

  describe('PCI segment', () => {
    const pciFields = ediDictionary.PCI.fields as unknown as Record<
      string,
      string
    >;

    it('should map 33E to Palette is identified with an SSCC', () => {
      expect(pciFields['33E']).toBe('Palette is identified with an SSCC');
    });
  });

  describe('UNS segment', () => {
    const unsFields = ediDictionary.UNS.fields as unknown as Record<
      string,
      string
    >;

    it('should map S to Detail/summary section separation', () => {
      expect(unsFields['S']).toBe('Detail/summary section separation');
    });
  });

  describe('CNT segment', () => {
    const cntFields = ediDictionary.CNT.fields as unknown as Record<
      string,
      string
    >;

    it('should map 2 to Number of line items in message', () => {
      expect(cntFields['2']).toBe('Number of line items in message');
    });
  });
});
