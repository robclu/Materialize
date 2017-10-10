import React from 'react';
import Paper from 'material-ui/Paper';
import Remarkable from 'remarkable';
import DOMPurify  from 'dompurify';

const md = new Remarkable({
  html       : true,          // Enable HTML tags in source
  xhtmlOut   : false,         // Use '/' to close single tags (<br />)
  breaks     : false,         // Convert '\n' in paragraphs into <br>
  langPrefix : 'language-',   // CSS language prefix for fenced blocks
  linkify    : true,          // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer: true,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed
  highlight: (/*str, lang*/) => { return ''; }
});

const getContent = (content) => {
  return { __html : DOMPurify.sanitize(md.render(content)) };
};

export const Page = (props) => {
  return (
    <Paper className="paper-wrapper">
      <article className="post">
        <header className="post-header">
          <strong><h2>{props.title}</h2></strong>
        </header>
        <div dangerouslySetInnerHTML={getContent(props.content)} />
      </article>
    </Paper>
  );
};
