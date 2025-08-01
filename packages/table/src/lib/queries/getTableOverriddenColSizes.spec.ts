import type { TTableElement } from 'platejs';

import { getTableOverriddenColSizes } from './getTableOverriddenColSizes';

const makeTableElement = (
  columnCount: number,
  colSizes?: number[]
): TTableElement =>
  ({
    children: [
      {
        children: Array.from({ length: columnCount }).fill({}),
        type: 'tr',
      },
    ],
    colSizes,
  }) as unknown as TTableElement;

describe('getTableOverriddenColSizes', () => {
  describe('when colSizes is not defined', () => {
    it('should return all zeros', () => {
      const tableElement = makeTableElement(3);
      const overrides = new Map<number, number>();
      expect(getTableOverriddenColSizes(tableElement, overrides)).toMatchObject(
        [0, 0, 0]
      );
    });

    it('should apply overrides', () => {
      const tableElement = makeTableElement(3);
      const overrides = new Map<number, number>([
        [0, 100],
        [2, 200],
      ]);
      expect(getTableOverriddenColSizes(tableElement, overrides)).toMatchObject(
        [100, 0, 200]
      );
    });
  });

  describe('when colSizes is defined', () => {
    it('should return colSizes', () => {
      const tableElement = makeTableElement(3, [100, 200, 300]);
      const overrides = new Map<number, number>();
      expect(getTableOverriddenColSizes(tableElement, overrides)).toMatchObject(
        [100, 200, 300]
      );
    });

    it('should apply overrides', () => {
      const tableElement = makeTableElement(3, [100, 200, 300]);
      const overrides = new Map<number, number>([
        [0, 1000],
        [2, 2000],
      ]);
      expect(getTableOverriddenColSizes(tableElement, overrides)).toMatchObject(
        [1000, 200, 2000]
      );
    });
  });
});
