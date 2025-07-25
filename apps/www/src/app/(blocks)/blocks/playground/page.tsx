import { Suspense } from 'react';

import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import PlaygroundDemo from '@/registry/examples/playground-demo';

const title = 'Playground';
const description = `npx shadcn@latest add ${siteConfig.registryUrl}editor-ai`;

export const metadata: Metadata = {
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  title,
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
};

const block: any = {
  code: '',
  highlightedCode: '',
  name: 'playground',
  type: 'registry:block',
};

export default function PlaygroundPage() {
  return (
    <div
      className={cn('themes-wrapper bg-background', block.container?.className)}
    >
      {/* <BlockWrapper block={block}> */}
      <Suspense fallback={null}>
        <PlaygroundDemo className="h-dvh" />
      </Suspense>
      {/* {chunks?.map((chunk, index) => (
          <BlockChunk
            key={chunk.name}
            block={block}
            chunk={block.chunks?.[index]}
          >
            <chunk.component />
          </BlockChunk>
        ))} */}
      {/* </BlockWrapper> */}
    </div>
  );
}
