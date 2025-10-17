import React from 'react';

import clsx from 'clsx';

import type { RenderTextProps, SlateEditor, SlatePlugin } from '..';

import { SlateText } from './components';
import { getNodeDataAttributes } from './utils/getNodeDataAttributes';
import { getRenderNodeStaticProps } from './utils/getRenderNodeStaticProps';

export type SlateRenderText = (
  props: RenderTextProps
) => React.ReactElement<any> | undefined;

export const pluginRenderTextStatic = (
  editor: SlateEditor,
  plugin: SlatePlugin
): SlateRenderText =>
  function render(nodeProps) {
    const { children, text } = nodeProps;

    if (text[plugin.node.type ?? plugin.key]) {
      const Component = editor.meta.components?.[plugin.key] as any;
      const Text = Component ?? SlateText;

      // const dataAttributes = getPluginDataAttributes(editor, plugin, text);

      const ctxProps = getRenderNodeStaticProps({
        attributes: { ...(text.attributes as any) },
        editor,
        node: text,
        plugin,
        props: nodeProps as any,
      }) as any;

      const defaultProps = Component ? {} : { as: plugin.render?.as };

      return (
        <Text {...defaultProps} {...ctxProps}>
          {children}
        </Text>
      );
    }

    return children;
  };

/** @see {@link RenderText} */
export const pipeRenderTextStatic = (
  editor: SlateEditor,
  { renderText: renderTextProp }: { renderText?: SlateRenderText } = {}
): SlateRenderText => {
  const renderTexts: SlateRenderText[] = [];
  const textPropsPlugins: SlatePlugin[] = [];

  editor.meta.pluginCache.node.isText.forEach((key) => {
    const plugin = editor.getPlugin({ key });

    if (plugin) {
      renderTexts.push(pluginRenderTextStatic(editor, plugin as any));
    }
  });

  editor.meta.pluginCache.node.textProps.forEach((key) => {
    const plugin = editor.getPlugin({ key });
    if (plugin) {
      textPropsPlugins.push(plugin as any);
    }
  });

  return function render({ attributes, ...props }) {
    renderTexts.forEach((render) => {
      const newChildren = render(props as any);

      if (newChildren !== undefined) {
        props.children = newChildren;
      }
    });

    textPropsPlugins.forEach((plugin) => {
      if (props.text[plugin.node.type ?? plugin.key]) {
        const pluginTextProps =
          typeof plugin.node.textProps === 'function'
            ? plugin.node.textProps(props as any)
            : (plugin.node.textProps ?? {});

        if (pluginTextProps.className) {
          pluginTextProps.className = clsx(
            (props as any).className,
            pluginTextProps.className
          );
        }

        attributes = {
          ...attributes,
          ...pluginTextProps,
        };
      }
    });

    if (renderTextProp) {
      return renderTextProp({ attributes, ...props });
    }

    const ctxProps = getRenderNodeStaticProps({
      editor,
      props: { attributes, ...props } as any,
    }) as any;

    const text = ctxProps.text;
    const dataAttributes = getNodeDataAttributes(editor, text, {
      isText: true,
    });

    return (
      <SlateText
        {...ctxProps}
        attributes={{
          ...ctxProps.attributes,
          ...dataAttributes,
        }}
      />
    );
  };
};
