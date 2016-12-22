/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility functions for handling procedures.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Extensions');

goog.require('Blockly.Blocks');
goog.require('Blockly.Workspace');


Blockly.Extensions.NAME_TYPE = 'EXTENSION';

Blockly.Extensions.EXTENSIONS = [];

Blockly.Extensions.flyoutCategory = function() {
  var xmlList = [];
  for (var v = 0; v < Blockly.Extensions.EXTENSIONS.length; v++) {
    for (var i = 0; i < Blockly.Extensions.EXTENSIONS[v].length; i++) {
      var data = JSON.parse(Blockly.Extensions.EXTENSIONS[v][i]);
      var jsonSpec = JSON.stringify(data.jsonSpec);
      var xml = data.xml;
      var id = data.id;
      var div = goog.dom.createDom('div');
      div.innerHTML = xml;
      var block = div.children[0];
      var count = 0;
      for (var n = 0; n < xmlList.length; n++) {
        if (xmlList[n].lastChild == id) {
          count = count + 1;
        }
      }
      if (count > 0) {
        id = id + '_' + count;
      }
      var mutation = goog.dom.createDom('mutation');
      mutation.setAttribute('identifier', id);
      mutation.setAttribute('jsonSpec', jsonSpec);
      block.appendChild(mutation);
      block.setAttribute('type', 'extensions_block');
      xmlList.push(block);
    }
  }
  return xmlList;
};

Blockly.Extensions.lookupBlock = function(blockId) {
  for (var v = 0; v < Blockly.Extensions.EXTENSIONS.length; v++) {
    for (var i = 0; i < Blockly.Extensions.EXTENSIONS[v].length; i++) {
      var data = Blockly.Extensions.EXTENSIONS[v][i];
      var id = data.id;
      if (id == blockId) {
        return data;
      }
    }
  }
  return false;
};
