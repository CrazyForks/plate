import type { Descendant } from '@platejs/slate';

import { jsx } from 'slate-hyperscript';

import type { SlateEditor } from '../../../editor';

import { isSlateVoid } from '../../../static';
import { deserializeHtmlNodeChildren } from './deserializeHtmlNodeChildren';
import { pipeDeserializeHtmlElement } from './pipeDeserializeHtmlElement';

/** Deserialize HTML to Element. */
export const htmlElementToElement = (
  editor: SlateEditor,
  element: HTMLElement,
  isSlate = false
) => {
  const deserialized = pipeDeserializeHtmlElement(editor, element);

  if (deserialized) {
    const { node, withoutChildren } = deserialized;

    let descendants =
      node.children ??
      (deserializeHtmlNodeChildren(editor, element, isSlate) as Descendant[]);

    if (descendants.length === 0 || withoutChildren || isSlateVoid(element)) {
      descendants = [{ text: '' }];
    }

    return jsx('element', node, descendants) as Descendant;
  }
};
