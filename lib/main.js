
exports.activate = () => {

  // Injection for YAML front matter.
  //
  // TODO: If people want fancy front matter support, like the ability to
  // control the front matter description language, then we might try to employ
  // the technique we used for the last Markdown parser and use
  // `tree-sitter-frontmatter` as the outermost grammar.
  atom.grammars.addInjectionPoint('source.gfm', {
    type: 'minus_metadata',
    language: () => 'yaml',
    content(node) {
      return node;
    }
  });

  // This is a two-phase parser. The outer parser handles block-level content;
  // the inner parser handles inline content.
  atom.grammars.addInjectionPoint('source.gfm', {
    type: 'inline',
    language: () => {
      return 'markdown-inline-internal';
    },
    content: (node) => node,
    includeChildren: true,
    languageScope: null
  });

  // Create one HTML injection layer for all block-level HTML nodes.
  atom.grammars.addInjectionPoint('source.gfm', {
    type: 'document',
    language: () => 'html',
    content(node) {
      let results =  node.descendantsOfType('html_block');
      return results;
    },
    includeChildren: true
  });

  // Injections for code blocks.
  atom.grammars.addInjectionPoint('source.gfm', {
    type: 'fenced_code_block',
    language(node) {
      let infoString = node.firstNamedChild?.nextNamedSibling;
      if (infoString?.type === 'info_string') {
        return infoString.text;
      }
      return undefined;
    },
    content (node) {
      let codeFenceContent = node.lastNamedChild?.previousNamedSibling;
      if (codeFenceContent?.type === 'code_fence_content') {
        return codeFenceContent;
      }
    },
    includeChildren: true
  });

  // Another HTML injection for each inline node that covers inline HTML.
  atom.grammars.addInjectionPoint('source.gfm.inline', {
    type: 'inline',
    language (node) {
      // Attempt to cut down on the number of injection layers by returning
      // `html` here only when there are HTML nodes in the inline tree.
      let html = node.descendantsOfType('html_tag');
      if (html.length > 0) {
        return 'html';
      }
      return undefined;
    },
    content (node) {
      return node.descendantsOfType('html_tag');
    },
    includeChildren: true
  });

};
