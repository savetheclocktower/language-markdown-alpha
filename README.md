# `language-markdown-alpha` language package

A temporary language package with a possible replacement for the `language-gfm` Tree-sitter grammar.

The Markdown grammar bundled in this package uses the [`MDeiml/tree-sitter-markdown`](https://github.com/MDeiml/tree-sitter-markdown) parser — rather than the [`ikatyang/tree-sitter-markdown`](https://github.com/ikatyang/tree-sitter-markdown) parser that powers the builtin grammar.

If you’ve been affected by random crashes as described in [#878](https://github.com/pulsar-edit/pulsar/issues/878), please follow these steps:

1. **Disable `language-gfm`**. This grammar uses the same scope name as the builtin grammar, so they can’t be active at the same time.
2. Reload your window (run the **Window: Reload** command) or relaunch Pulsar.
3. Install this package.

When you open new Markdown documents, they should be recognized as Markdown. If need be, you can explicitly choose the new grammar from the grammar selector, where it will be listed as **Markdown (Alternative)**.

Please leave feedback in [#878](https://github.com/pulsar-edit/pulsar/issues/878) if this package works better for you.
