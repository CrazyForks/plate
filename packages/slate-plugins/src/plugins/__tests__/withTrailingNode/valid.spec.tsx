/** @jsx jsx */

import { jsx } from '@udecode/slate-plugins-test-utils';
import { Editor } from 'slate';
import { ELEMENT_PARAGRAPH } from '../../../elements/paragraph/defaults';
import { withTrailingNode } from '../../useTrailingNodePlugin';

const input = (
  <editor>
    <hh1>
      <hp>test</hp>
    </hh1>
    <hh1>
      <hp>test2</hp>
    </hh1>
  </editor>
) as any;

const output = (
  <editor>
    <hh1>
      <hp>test</hp>
    </hh1>
    <hh1>
      <hp>test2</hp>
    </hh1>
  </editor>
) as any;

it('should be', () => {
  const editor = withTrailingNode({
    type: ELEMENT_PARAGRAPH,
    level: 1,
  })(input as Editor);

  editor.normalizeNode([input, []]);

  expect(input.children).toEqual(output.children);
});