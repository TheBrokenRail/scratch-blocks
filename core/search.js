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

goog.provide('Blockly.Search');

goog.require('Blockly.Blocks');
goog.require('Blockly.Field');
goog.require('Blockly.Names');
goog.require('Blockly.Workspace');


/**
 * Category to separate procedure names from variables and generated functions.
 */
Blockly.Search.NAME_TYPE = 'SEARCH';

Blockly.Search.SEARCH = '';

/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Blockly.Workspace} workspace The workspace contianing procedures.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Search.flyoutCategory = function(workspace) {
  var xmlList = [];
  var button = goog.dom.createDom('button');
  button.setAttribute('text', 'Search');
  button.setAttribute('callbackKey', 'SEARCH');
  Blockly.registerButtonCallback('SEARCH', function(button) {
    Blockly.Variables.createVariable(button.getTargetWorkspace());
  });
  xmlList.push(button);
  var toolbox = workspace.options.languageTree.getElementsByTagName('block');
  function populateSearch(toolbox) {
    var x = 0;
    for (x in Blockly.Blocks) {
      Blockly.Blocks[x].init();
      if (Blockly.Blocks[x].lang.indexOf(Blockly.Search.SEARCH) != -1) {
        var i = 0;
        for (i = 0; i < toolbox.length; i++) {
          if (toolbox[i].getAttribute('type') === x) {
            xmlList.push(toolbox[i]);
          }
        }
      }
    }
  }
  populateSearch(toolbox);
  return xmlList;
};

Blockly.Search.getSearch = function() {
  Blockly.Search.promptSearch('Enter Search', '', function (text) {
    Blockly.Search.SEARCH = text;
  });
};

Blockly.Search.promptSearch = function(promptText, defaultText, callback) {
  Blockly.prompt(promptText, defaultText, function(newVar) {
    // Merge runs of whitespace.  Strip leading and trailing whitespace.
    // Beyond this, all names are legal.
    if (newVar) {
      newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
    }
    callback(newVar);
  });
};
