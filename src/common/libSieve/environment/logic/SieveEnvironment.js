/*
 * The contents of this file are licensed. You may obtain a copy of
 * the license at https://github.com/thsmi/sieve/ or request it via
 * email from the author.
 *
 * Do not remove or change this comment.
 *
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 *
 */

/* global window */

(function () {

  "use strict";

  /* global SieveGrammar */

  if (!SieveGrammar)
    throw new Error("Could not register Environment");

  // Usage:   environment [COMPARATOR] [MATCH-TYPE] <name: string> <key-list: string-list>

  let _environment = {
    node: "test/environment",
    type: "test",

    requires: "environment",

    token: "environment",

    properties: [{
      id: "tags",
      optional: true,

      elements: [{
        id: "match-type",
        type: "match-type"
      }, {
        id: "comparator",
        type: "comparator"

      }]
    }, {
      id: "parameters",
      elements: [{
        id: "name",
        type: "string",
        value: '"Example"'
      }, {
        id: "keys",
        type: "stringlist",
        value: '"Example"'
      }]
    }]
  };

  SieveGrammar.addTest(_environment);

})(window);