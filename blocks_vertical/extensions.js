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
 * @fileoverview Procedure blocks for Scratch.
 */
'use strict';

goog.provide('Blockly.Blocks.extensions');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');

Blockly.Blocks['extensions_block'] = {
  /**
   * Block for calling a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    this._jsonSpec = '';
    this._id = '';
    this.jsonInit({"message0": "if on edge, bounce", "previousStatement": null, "nextStatement": null});
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('jsonSpec', this._jsonSpec);
    container.setAttribute('identifer', this._id);
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this._jsonSpec = xmlElement.getAttribute('jsonSpec');
    this._id = xmlElement.getAttribute('identifier');
    this._updateDisplay();
  },
  _updateDisplay: function() {
    this.jsonInit(this._jsonSpec);
  }
};
