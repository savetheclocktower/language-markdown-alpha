; (temp)

(emphasis) @markup.italic.gfm
(strong_emphasis) @markup.bold.gfm
(strikethrough) @markup.strike.gfm


; INLINE/REPLACED
; ===============

((uri_autolink) @markup.underline.link
  (#set! adjust.startAfterFirstMatchOf "^<")
  (#set! adjust.endBeforeFirstMatchOf ">$"))

((uri_autolink) @punctuation.definition.begin.uri-autolink.gfm
  (#set! adjust.endAfterFirstMatchOf "^<"))

((uri_autolink) @punctuation.definition.end.uri-autolink.gfm
  (#set! adjust.startBeforeFirstMatchOf ">$"))

((link_text (image (image_description))) @_IGNORE_
  (#set! capture.final))

[(link_text) (image_description)] @string.unquoted.gfm @meta.link.text

; The text inside []s in anchors/image syntax.
(full_reference_link
  (link_label) @markup.underline.link.gfm
  (#set! adjust.startAfterFirstMatchOf "^\\[")
  (#set! adjust.endBeforeFirstMatchOf "]$"))

(image
  (link_destination) @markup.underline.link.gfm)

(inline_link
  (link_destination) @markup.underline.link.gfm)


; Code spans
; ----------

(code_span) @meta.embedded.line.inline-code.gfm @markup.raw.inline.gfm

(code_span
  . (code_span_delimiter) @punctuation.definition.begin.string.inline-code.gfm)

(code_span
  (code_span_delimiter) @punctuation.definition.end.string.inline-code.gfm
  .)


; MISC
; ====

(backslash_escape) @constant.character.escape.gfm

(numeric_character_reference) @constant.character.entity.gfm
