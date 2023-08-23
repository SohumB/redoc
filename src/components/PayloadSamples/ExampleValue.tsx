import * as React from 'react';

import { isJsonLike, isJsonlinesLike, langFromMime } from '../../utils/openapi';
import { JsonViewer } from '../JsonViewer/JsonViewer';
import { SourceCodeWithCopy } from '../SourceCode/SourceCode';

export interface ExampleValueProps {
  value: any;
  mimeType: string;
}

export function ExampleValue({ value, mimeType }: ExampleValueProps) {
  if (isJsonlinesLike(mimeType)) {
    value = `${JSON.stringify(value, null, 0)}\n`.repeat(3);
    return <SourceCodeWithCopy lang={langFromMime(mimeType)} source={value} />;
  } else if (isJsonLike(mimeType)) {
    return <JsonViewer data={value} />;
  } else {
    if (typeof value === 'object') {
      // just in case example was cached as json but used as non-json
      value = JSON.stringify(value, null, 2);
    }
    return <SourceCodeWithCopy lang={langFromMime(mimeType)} source={value} />;
  }
}
