import { Editor } from 'slate';

import type { TEditor, Value } from './TEditor';

import { isElement } from '../element';

/** Check if a value is a block `Element` object. */
export const isBlock = <V extends Value>(
  editor: TEditor<V>,
  value: any
): boolean => isElement(value) && Editor.isBlock(editor as any, value);
