/**
 * @jest-environment node
 */
import { ediDictionary } from '../src/ediDictionary';

describe('ediDictionary lookups', () => {

  describe('BGM segment', () => {
    it('should return correct name and description for code 220', () => {
      const bgmFields = ediDictionary.BGM.fields;
      expect(bgmFields['220']).toBe('Order');
    });

    it('should return correct description for message function code 29', () => {
      const bgmFields = ediDictionary.BGM.fields;
      expect(bgmFields['29']).toBe('Accepted without amendment');
    });

    it('should undefined for invalid BGM code', () => {
      const bgmFields = ediDictionary.BGM.fields;
      expect(bgmFields['999']).toBeUndefined();
    });
  });

  describe('DTM segment', () => {
    it('should map 137 to document/message date/time', () => {
      const dtmFields = ediDictionary.DTM.fields;
      expect(dtmFields['137']).toBe('Document/message date/time');
    });

    it('should map 506 to backorder delivery date/time', () => {
      const dtmFields = ediDictionary.DTM.fields;
      expect(dtmFields['506']).toBe('Backorder delivery date/time');
    });

    it('should be undefined for a non-existent DTM qualifier', () => {
      const dtmFields = ediDictionary.DTM.fields;
      expect(dtmFields['999']).toBeUndefined();
    });
  });

  describe('RFF segment', () => {
    it('should map ON to Order number', () => {
      const rffFields = ediDictionary.RFF.fields;
      expect(rffFields['ON']).toBe('Order number');
    });

    it('should map BM to Bill of lading number', () => {
      const rffFields = ediDictionary.RFF.fields;
      expect(rffFields['BM']).toBe('Bill of lading number');
    });
  });

  describe('NAD segment', () => {
    it('should map SU to Supplier', () => {
      const nadFields = ediDictionary.NAD.fields;
      expect(nadFields['SU']).toBe('Supplier');
    });

    it('should be undefined for invalid NAD qualifier', () => {
      const nadFields = ediDictionary.NAD.fields;
      expect(nadFields['XX']).toBeUndefined();
    });
  });

  describe('CUX segment', () => {
    it('should map 2 to Reference currency', () => {
      const cuxFields = ediDictionary.CUX.fields;
      expect(cuxFields['2']).toBe('Reference currency');
    });

    it('should map EUR to Euro in currencies', () => {
      expect(ediDictionary.CUX.currencies['EUR']).toBe('Euro');
    });
  });

});
