import React from 'react';

import { createPrimitiveComponent } from '@udecode/plate-common';

import {
  floatingLinkActions,
  floatingLinkSelectors,
  useFloatingLinkSelectors,
} from './floatingLinkStore';

export const useFloatingLinkUrlInputState = () => {
  const updated = useFloatingLinkSelectors().updated();
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current && updated) {
      setTimeout(() => {
        ref.current?.focus();
        ref.current!.value = floatingLinkSelectors.url();
      }, 0);
    }
  }, [updated]);

  return {
    ref,
  };
};

export const useFloatingLinkUrlInput = (
  state: ReturnType<typeof useFloatingLinkUrlInputState>
) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      floatingLinkActions.url(e.target.value);
    }, []);

  return {
    props: {
      defaultValue: floatingLinkSelectors.url(),
      onChange,
    },
    ref: state.ref,
  };
};

export const FloatingLinkUrlInput = createPrimitiveComponent('input')({
  propsHook: useFloatingLinkUrlInput,
  stateHook: useFloatingLinkUrlInputState,
});
