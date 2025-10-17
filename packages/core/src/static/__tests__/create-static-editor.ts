import { type Value } from 'platejs';

import { BaseEditorKit } from 'www/src/registry/components/editor/editor-base-kit';
import { createSlateEditor, CreateSlateEditorOptions } from '../../lib';

export const createStaticEditor = (
  value: Value,
  options?: Partial<CreateSlateEditorOptions>
) => {
  return createSlateEditor({
    ...options,
    plugins: BaseEditorKit,
    value,
  });
};
