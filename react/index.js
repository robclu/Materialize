import React                    from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { html_beautify }        from 'js-beautify';
import fse                      from 'fs-extra';

import Default from './pages/default';

function renderStatic(template, file) {
  const html = html_beautify(renderToStaticMarkup(template));
  fse.outputFileSync(file, html);
}

renderStatic(<Default />, './src/_layouts/default.html')