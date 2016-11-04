"use strict";

var marked = require("marked");
var loaderUtils = require("loader-utils");
var assign = require("object-assign");

// small but needed hack
marked.Renderer.prototype.code = function renderCode(code, lang) {
    const escCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (!lang) {
        return `<pre class="prettyprint">${escCode}</pre>`;
    }
    return `<pre class="prettyprint lang-${lang}">${escCode}</pre>`;
};

// default option
var options = {
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
};

module.exports = function (markdown) {
    // merge params and default config
    var query = loaderUtils.parseQuery(this.query);
    var configKey = query.config || "markdownLoader";
    var options = assign({}, options, query, this.options[configKey]);

    this.cacheable();

    marked.setOptions(options);

    return marked(markdown);
};
