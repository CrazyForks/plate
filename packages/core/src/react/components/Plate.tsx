import React, { useId } from 'react';

import type { EditableProps } from '../../lib/types/EditableProps';
import type { PlateEditor } from '../editor/PlateEditor';

import { usePlateInstancesWarn } from '../../internal/hooks/usePlateInstancesWarn';
import { type PlateStoreState, PlateStoreProvider } from '../stores';

export interface PlateProps<E extends PlateEditor = PlateEditor>
  extends Partial<
    Pick<
      PlateStoreState<E>,
      | 'decorate'
      | 'onChange'
      | 'onSelectionChange'
      | 'onValueChange'
      | 'primary'
      | 'readOnly'
    >
  > {
  children: React.ReactNode;

  editor: E | null;

  renderElement?: EditableProps['renderElement'];

  renderLeaf?: EditableProps['renderLeaf'];

  suppressInstanceWarning?: boolean;
}

function PlateInner({
  children,
  containerRef,
  decorate,
  editor,
  primary,
  readOnly,
  renderElement,
  renderLeaf,
  scrollRef,
  onChange,
  onSelectionChange,
  onValueChange,
}: PlateProps & {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <PlateStoreProvider
      readOnly={readOnly ?? editor?.dom.readOnly}
      onChange={onChange}
      onSelectionChange={onSelectionChange}
      onValueChange={onValueChange}
      containerRef={containerRef}
      decorate={decorate}
      editor={editor!}
      primary={primary}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      scope={editor!.id}
      scrollRef={scrollRef}
    >
      {children}
    </PlateStoreProvider>
  );
}

export function Plate<E extends PlateEditor = PlateEditor>(
  props: PlateProps<E>
) {
  const id = useId();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  usePlateInstancesWarn(props.suppressInstanceWarning);

  if (!props.editor) return null;

  props.editor.meta.uid = 'e-' + id.replaceAll(':', '');

  return (
    <PlateInner
      key={props.editor.meta.key}
      containerRef={containerRef}
      scrollRef={scrollRef}
      {...(props as any)}
    />
  );
}
