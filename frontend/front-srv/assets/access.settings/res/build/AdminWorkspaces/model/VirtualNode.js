/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pydioUtilLang = require('pydio/util/lang');

var _pydioUtilLang2 = _interopRequireDefault(_pydioUtilLang);

var _pydioLangObservable = require('pydio/lang/observable');

var _pydioLangObservable2 = _interopRequireDefault(_pydioLangObservable);

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var VirtualNode = (function (_Observable) {
    _inherits(VirtualNode, _Observable);

    _createClass(VirtualNode, null, [{
        key: 'loadNodes',
        value: function loadNodes(callback) {
            var api = new _pydioHttpRestApi.DocStoreServiceApi(_pydioHttpApi2['default'].getRestClient());
            var request = new _pydioHttpRestApi.RestListDocstoreRequest();
            request.StoreID = "virtualnodes";
            api.listDocs("virtualnodes", request).then(function (response) {
                var result = [];
                if (response.Docs) {
                    response.Docs.map(function (doc) {
                        result.push(new VirtualNode(JSON.parse(doc.Data)));
                    });
                }
                callback(result);
            });
        }
    }]);

    function VirtualNode(data) {
        _classCallCheck(this, VirtualNode);

        _get(Object.getPrototypeOf(VirtualNode.prototype), 'constructor', this).call(this);
        if (data) {
            this.data = data;
        } else {
            this.data = {
                Uuid: "",
                Path: "",
                Type: "COLLECTION",
                MetaStore: {
                    name: "",
                    resolution: "",
                    contentType: "text/javascript"
                }
            };
        }
    }

    _createClass(VirtualNode, [{
        key: 'getName',
        value: function getName() {
            return this.data.MetaStore.name;
        }
    }, {
        key: 'setName',
        value: function setName(name) {
            this.data.MetaStore.name = name;
            var slug = _pydioUtilLang2['default'].computeStringSlug(name);
            this.data.Uuid = slug;
            this.data.Path = slug;
            this.notify('update');
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.data.MetaStore.resolution;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.data.MetaStore.resolution = value;
            this.notify('update');
        }
    }, {
        key: 'save',
        value: function save(callback) {
            var api = new _pydioHttpRestApi.DocStoreServiceApi(_pydioHttpApi2['default'].getRestClient());
            var request = new _pydioHttpRestApi.DocstorePutDocumentRequest();
            request.StoreID = "virtualnodes";
            request.DocumentID = this.data.Uuid;
            var doc = new _pydioHttpRestApi.DocstoreDocument();
            doc.ID = this.data.Uuid;
            doc.Data = JSON.stringify(this.data);
            request.Document = doc;

            api.putDoc("virtualnodes", this.data.Uuid, request).then(function () {
                callback();
            });
        }
    }, {
        key: 'remove',
        value: function remove(callback) {

            var api = new _pydioHttpRestApi.DocStoreServiceApi(_pydioHttpApi2['default'].getRestClient());
            var request = new _pydioHttpRestApi.DocstoreDeleteDocumentsRequest();
            request.StoreID = "virtualnodes";
            request.DocumentID = this.data.Uuid;
            api.deleteDoc("virtualnodes", request).then(function () {
                callback();
            });
        }
    }]);

    return VirtualNode;
})(_pydioLangObservable2['default']);

exports['default'] = VirtualNode;
module.exports = exports['default'];