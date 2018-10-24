(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PydioLibreOffice = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _require = require('pydio/http/rest-api'),
    TreeServiceApi = _require.TreeServiceApi,
    RestCreateNodesRequest = _require.RestCreateNodesRequest,
    TreeNode = _require.TreeNode,
    TreeNodeType = _require.TreeNodeType;

var dynamicBuilder = exports.dynamicBuilder = function dynamicBuilder(controller) {

    var pydio = window.pydio;
    var MessageHash = pydio.MessageHash;
    var exts = {
        doc: 'file-word',
        docx: 'file-word',
        odt: 'file-word',
        odg: 'file-chart',
        odp: 'file-powerpoint',
        ods: 'file-excel',
        pot: 'file-powerpoint',
        pptx: 'file-powerpoint',
        rtf: 'file-word',
        xls: 'file-excel',
        xlsx: 'file-excel'
    };

    var dir = pydio.getContextHolder().getContextNode().getPath();

    var builderMenuItems = [];

    Object.keys(exts).forEach(function (k) {

        if (!MessageHash['libreoffice.ext.' + k]) return;

        builderMenuItems.push({
            name: MessageHash['libreoffice.ext.' + k],
            alt: MessageHash['libreoffice.ext.' + k],
            icon_class: 'mdi mdi-' + exts[k],
            callback: async function (e) {
                var repoList = pydio.user.getRepositoriesList();
                var api = new TreeServiceApi(PydioApi.getRestClient());
                var request = new RestCreateNodesRequest();
                var node = new TreeNode();

                var slug = repoList.get(pydio.user.activeRepository).getSlug();

                var path = slug + dir + (dir ? "/" : "") + "Untitled Document." + k;
                path = await file_newpath(path);

                node.Path = path;
                node.Type = TreeNodeType.constructFromObject('LEAF');
                request.Nodes = [node];

                api.createNodes(request).then(function (leaf) {
                    // Success - We should probably select the nodes
                    // pydio.getContextHolder().setSelectedNodes([node])
                });
            }.bind(undefined)
        });
    });

    return builderMenuItems;
};

function file_newpath(fullpath) {
    return new Promise(async function (resolve) {
        var lastSlash = fullpath.lastIndexOf('/');
        var pos = fullpath.lastIndexOf('.');
        var path = fullpath;
        var ext = '';

        // NOTE: the position lastSlash + 1 corresponds to hidden files (ex: .DS_STORE)
        if (pos > -1 && lastSlash < pos && pos > lastSlash + 1) {
            path = fullpath.substring(0, pos);
            ext = fullpath.substring(pos);
        }

        var newPath = fullpath;
        var counter = 1;

        var exists = await file_exists(newPath);

        while (exists) {
            newPath = path + '-' + counter + ext;
            counter++;
            exists = await file_exists(newPath);
        }

        resolve(newPath);
    }.bind(this));
}

function file_exists(fullpath) {
    return new Promise(function (resolve) {
        var api = new TreeServiceApi(PydioApi.getRestClient());

        api.headNode(fullpath).then(function (node) {
            if (node.Node) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(function () {
            return resolve(false);
        });
    });
}

},{"pydio/http/rest-api":"pydio/http/rest-api"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; /*
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

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _api = require('pydio/http/api');

var _api2 = _interopRequireDefault(_api);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var configs = _pydio2.default.getInstance().getPluginConfigs("editor.libreoffice");

var _Pydio$requireLib = _pydio2.default.requireLib('hoc'),
    withMenu = _Pydio$requireLib.withMenu,
    withLoader = _Pydio$requireLib.withLoader,
    withErrors = _Pydio$requireLib.withErrors,
    EditorActions = _Pydio$requireLib.EditorActions;

// const Viewer = compose(
//     withMenu,
//     withLoader,
//     withErrors
// )(({url, style}) => <iframe src={url} style={{...style, width: "100%", height: "100%", border: 0, flex: 1}}></iframe>)

var Editor = (_dec = (0, _reactRedux.connect)(null, EditorActions), _dec(_class = function (_React$Component) {
    _inherits(Editor, _React$Component);

    function Editor(props) {
        _classCallCheck(this, Editor);

        var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Editor, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var editorModify = this.props.editorModify;

            if (nextProps.isActive) {
                editorModify({ fixedToolbar: true });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var editorModify = this.props.editorModify;

            if (this.props.isActive) {
                editorModify({ fixedToolbar: true });
            }

            var iframeUrl = configs.get('LIBREOFFICE_IFRAME_URL');
            var host = _pydio2.default.Parameters('FRONTEND_URL');
            var webSocketUrl = host.replace(/^http/gi, 'ws');

            // Check current action state for permission
            var readonly = _pydio2.default.getInstance().getController().getActionByName("move").deny;
            var permission = readonly ? "readonly" : "edit";
            var uri = "/wopi/files/" + this.props.node.getMetadata().get("uuid");
            var fileSrcUrl = encodeURIComponent('' + host + uri);

            _api2.default.getRestClient().getOrUpdateJwt().then(function (jwt) {
                _this2.setState({ url: iframeUrl + '?host=' + webSocketUrl + '&WOPISrc=' + fileSrcUrl + '&access_token=' + jwt + '&permission=' + permission });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var url = this.state.url;

            return _react2.default.createElement('iframe', { src: url, style: { backgroundColor: "white", width: "100%", height: "100%", border: 0, flex: 1 } });
        }
    }]);

    return Editor;
}(_react2.default.Component)) || _class);
exports.default = Editor;

},{"pydio":"pydio","pydio/http/api":"pydio/http/api","react":"react","react-redux":"react-redux","redux":"redux"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Actions = exports.Editor = undefined;

var _editor = require('./editor');

Object.defineProperty(exports, 'Editor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_editor).default;
  }
});

var _actions = require('./actions');

var Actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Actions = Actions;

},{"./actions":1,"./editor":2}]},{},[3])(3)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXMvYnVpbGQvUHlkaW9MaWJyZU9mZmljZS9hY3Rpb25zLmpzIiwicmVzL2J1aWxkL1B5ZGlvTGlicmVPZmZpY2UvZWRpdG9yLmpzIiwicmVzL2J1aWxkL1B5ZGlvTGlicmVPZmZpY2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG4vKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ3B5ZGlvL2h0dHAvcmVzdC1hcGknKSxcbiAgICBUcmVlU2VydmljZUFwaSA9IF9yZXF1aXJlLlRyZWVTZXJ2aWNlQXBpLFxuICAgIFJlc3RDcmVhdGVOb2Rlc1JlcXVlc3QgPSBfcmVxdWlyZS5SZXN0Q3JlYXRlTm9kZXNSZXF1ZXN0LFxuICAgIFRyZWVOb2RlID0gX3JlcXVpcmUuVHJlZU5vZGUsXG4gICAgVHJlZU5vZGVUeXBlID0gX3JlcXVpcmUuVHJlZU5vZGVUeXBlO1xuXG52YXIgZHluYW1pY0J1aWxkZXIgPSBleHBvcnRzLmR5bmFtaWNCdWlsZGVyID0gZnVuY3Rpb24gZHluYW1pY0J1aWxkZXIoY29udHJvbGxlcikge1xuXG4gICAgdmFyIHB5ZGlvID0gd2luZG93LnB5ZGlvO1xuICAgIHZhciBNZXNzYWdlSGFzaCA9IHB5ZGlvLk1lc3NhZ2VIYXNoO1xuICAgIHZhciBleHRzID0ge1xuICAgICAgICBkb2M6ICdmaWxlLXdvcmQnLFxuICAgICAgICBkb2N4OiAnZmlsZS13b3JkJyxcbiAgICAgICAgb2R0OiAnZmlsZS13b3JkJyxcbiAgICAgICAgb2RnOiAnZmlsZS1jaGFydCcsXG4gICAgICAgIG9kcDogJ2ZpbGUtcG93ZXJwb2ludCcsXG4gICAgICAgIG9kczogJ2ZpbGUtZXhjZWwnLFxuICAgICAgICBwb3Q6ICdmaWxlLXBvd2VycG9pbnQnLFxuICAgICAgICBwcHR4OiAnZmlsZS1wb3dlcnBvaW50JyxcbiAgICAgICAgcnRmOiAnZmlsZS13b3JkJyxcbiAgICAgICAgeGxzOiAnZmlsZS1leGNlbCcsXG4gICAgICAgIHhsc3g6ICdmaWxlLWV4Y2VsJ1xuICAgIH07XG5cbiAgICB2YXIgZGlyID0gcHlkaW8uZ2V0Q29udGV4dEhvbGRlcigpLmdldENvbnRleHROb2RlKCkuZ2V0UGF0aCgpO1xuXG4gICAgdmFyIGJ1aWxkZXJNZW51SXRlbXMgPSBbXTtcblxuICAgIE9iamVjdC5rZXlzKGV4dHMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcblxuICAgICAgICBpZiAoIU1lc3NhZ2VIYXNoWydsaWJyZW9mZmljZS5leHQuJyArIGtdKSByZXR1cm47XG5cbiAgICAgICAgYnVpbGRlck1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IE1lc3NhZ2VIYXNoWydsaWJyZW9mZmljZS5leHQuJyArIGtdLFxuICAgICAgICAgICAgYWx0OiBNZXNzYWdlSGFzaFsnbGlicmVvZmZpY2UuZXh0LicgKyBrXSxcbiAgICAgICAgICAgIGljb25fY2xhc3M6ICdtZGkgbWRpLScgKyBleHRzW2tdLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGFzeW5jIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlcG9MaXN0ID0gcHlkaW8udXNlci5nZXRSZXBvc2l0b3JpZXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgdmFyIGFwaSA9IG5ldyBUcmVlU2VydmljZUFwaShQeWRpb0FwaS5nZXRSZXN0Q2xpZW50KCkpO1xuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlc3RDcmVhdGVOb2Rlc1JlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBUcmVlTm9kZSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNsdWcgPSByZXBvTGlzdC5nZXQocHlkaW8udXNlci5hY3RpdmVSZXBvc2l0b3J5KS5nZXRTbHVnKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IHNsdWcgKyBkaXIgKyAoZGlyID8gXCIvXCIgOiBcIlwiKSArIFwiVW50aXRsZWQgRG9jdW1lbnQuXCIgKyBrO1xuICAgICAgICAgICAgICAgIHBhdGggPSBhd2FpdCBmaWxlX25ld3BhdGgocGF0aCk7XG5cbiAgICAgICAgICAgICAgICBub2RlLlBhdGggPSBwYXRoO1xuICAgICAgICAgICAgICAgIG5vZGUuVHlwZSA9IFRyZWVOb2RlVHlwZS5jb25zdHJ1Y3RGcm9tT2JqZWN0KCdMRUFGJyk7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5Ob2RlcyA9IFtub2RlXTtcblxuICAgICAgICAgICAgICAgIGFwaS5jcmVhdGVOb2RlcyhyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChsZWFmKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MgLSBXZSBzaG91bGQgcHJvYmFibHkgc2VsZWN0IHRoZSBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAvLyBweWRpby5nZXRDb250ZXh0SG9sZGVyKCkuc2V0U2VsZWN0ZWROb2Rlcyhbbm9kZV0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LmJpbmQodW5kZWZpbmVkKVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBidWlsZGVyTWVudUl0ZW1zO1xufTtcblxuZnVuY3Rpb24gZmlsZV9uZXdwYXRoKGZ1bGxwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHZhciBsYXN0U2xhc2ggPSBmdWxscGF0aC5sYXN0SW5kZXhPZignLycpO1xuICAgICAgICB2YXIgcG9zID0gZnVsbHBhdGgubGFzdEluZGV4T2YoJy4nKTtcbiAgICAgICAgdmFyIHBhdGggPSBmdWxscGF0aDtcbiAgICAgICAgdmFyIGV4dCA9ICcnO1xuXG4gICAgICAgIC8vIE5PVEU6IHRoZSBwb3NpdGlvbiBsYXN0U2xhc2ggKyAxIGNvcnJlc3BvbmRzIHRvIGhpZGRlbiBmaWxlcyAoZXg6IC5EU19TVE9SRSlcbiAgICAgICAgaWYgKHBvcyA+IC0xICYmIGxhc3RTbGFzaCA8IHBvcyAmJiBwb3MgPiBsYXN0U2xhc2ggKyAxKSB7XG4gICAgICAgICAgICBwYXRoID0gZnVsbHBhdGguc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgICAgICAgICBleHQgPSBmdWxscGF0aC5zdWJzdHJpbmcocG9zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdQYXRoID0gZnVsbHBhdGg7XG4gICAgICAgIHZhciBjb3VudGVyID0gMTtcblxuICAgICAgICB2YXIgZXhpc3RzID0gYXdhaXQgZmlsZV9leGlzdHMobmV3UGF0aCk7XG5cbiAgICAgICAgd2hpbGUgKGV4aXN0cykge1xuICAgICAgICAgICAgbmV3UGF0aCA9IHBhdGggKyAnLScgKyBjb3VudGVyICsgZXh0O1xuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgZXhpc3RzID0gYXdhaXQgZmlsZV9leGlzdHMobmV3UGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKG5ld1BhdGgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG59XG5cbmZ1bmN0aW9uIGZpbGVfZXhpc3RzKGZ1bGxwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHZhciBhcGkgPSBuZXcgVHJlZVNlcnZpY2VBcGkoUHlkaW9BcGkuZ2V0UmVzdENsaWVudCgpKTtcblxuICAgICAgICBhcGkuaGVhZE5vZGUoZnVsbHBhdGgpLnRoZW4oZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLk5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2RlYywgX2NsYXNzOyAvKlxuICAgICAgICAgICAgICAgICAgICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAgICAgICAgICAgICAgICAgICAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAgICAgICAgICAgICAgICAgICAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICAgICAgICAgICAgICAgICAgICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAgICAgICAgICAgICAgICAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAgICAgICAgICAgICAgICAgICAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gICAgICAgICAgICAgICAgICAgKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgICAgICAgICAgICAgICAgKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgICAgICAgICAgICAgICAgICAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICAgICAgICAgICAgICAgICAgICovXG5cbnZhciBfcHlkaW8gPSByZXF1aXJlKCdweWRpbycpO1xuXG52YXIgX3B5ZGlvMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3B5ZGlvKTtcblxudmFyIF9hcGkgPSByZXF1aXJlKCdweWRpby9odHRwL2FwaScpO1xuXG52YXIgX2FwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcGkpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVkdXggPSByZXF1aXJlKCdyZWR1eCcpO1xuXG52YXIgX3JlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBjb25maWdzID0gX3B5ZGlvMi5kZWZhdWx0LmdldEluc3RhbmNlKCkuZ2V0UGx1Z2luQ29uZmlncyhcImVkaXRvci5saWJyZW9mZmljZVwiKTtcblxudmFyIF9QeWRpbyRyZXF1aXJlTGliID0gX3B5ZGlvMi5kZWZhdWx0LnJlcXVpcmVMaWIoJ2hvYycpLFxuICAgIHdpdGhNZW51ID0gX1B5ZGlvJHJlcXVpcmVMaWIud2l0aE1lbnUsXG4gICAgd2l0aExvYWRlciA9IF9QeWRpbyRyZXF1aXJlTGliLndpdGhMb2FkZXIsXG4gICAgd2l0aEVycm9ycyA9IF9QeWRpbyRyZXF1aXJlTGliLndpdGhFcnJvcnMsXG4gICAgRWRpdG9yQWN0aW9ucyA9IF9QeWRpbyRyZXF1aXJlTGliLkVkaXRvckFjdGlvbnM7XG5cbi8vIGNvbnN0IFZpZXdlciA9IGNvbXBvc2UoXG4vLyAgICAgd2l0aE1lbnUsXG4vLyAgICAgd2l0aExvYWRlcixcbi8vICAgICB3aXRoRXJyb3JzXG4vLyApKCh7dXJsLCBzdHlsZX0pID0+IDxpZnJhbWUgc3JjPXt1cmx9IHN0eWxlPXt7Li4uc3R5bGUsIHdpZHRoOiBcIjEwMCVcIiwgaGVpZ2h0OiBcIjEwMCVcIiwgYm9yZGVyOiAwLCBmbGV4OiAxfX0+PC9pZnJhbWU+KVxuXG52YXIgRWRpdG9yID0gKF9kZWMgPSAoMCwgX3JlYWN0UmVkdXguY29ubmVjdCkobnVsbCwgRWRpdG9yQWN0aW9ucyksIF9kZWMoX2NsYXNzID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoRWRpdG9yLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEVkaXRvcihwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRWRpdG9yKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRWRpdG9yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRWRpdG9yKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRWRpdG9yLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgICAgICB2YXIgZWRpdG9yTW9kaWZ5ID0gdGhpcy5wcm9wcy5lZGl0b3JNb2RpZnk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3JNb2RpZnkoeyBmaXhlZFRvb2xiYXI6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBlZGl0b3JNb2RpZnkgPSB0aGlzLnByb3BzLmVkaXRvck1vZGlmeTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3JNb2RpZnkoeyBmaXhlZFRvb2xiYXI6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpZnJhbWVVcmwgPSBjb25maWdzLmdldCgnTElCUkVPRkZJQ0VfSUZSQU1FX1VSTCcpO1xuICAgICAgICAgICAgdmFyIGhvc3QgPSBfcHlkaW8yLmRlZmF1bHQuUGFyYW1ldGVycygnRlJPTlRFTkRfVVJMJyk7XG4gICAgICAgICAgICB2YXIgd2ViU29ja2V0VXJsID0gaG9zdC5yZXBsYWNlKC9eaHR0cC9naSwgJ3dzJyk7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGN1cnJlbnQgYWN0aW9uIHN0YXRlIGZvciBwZXJtaXNzaW9uXG4gICAgICAgICAgICB2YXIgcmVhZG9ubHkgPSBfcHlkaW8yLmRlZmF1bHQuZ2V0SW5zdGFuY2UoKS5nZXRDb250cm9sbGVyKCkuZ2V0QWN0aW9uQnlOYW1lKFwibW92ZVwiKS5kZW55O1xuICAgICAgICAgICAgdmFyIHBlcm1pc3Npb24gPSByZWFkb25seSA/IFwicmVhZG9ubHlcIiA6IFwiZWRpdFwiO1xuICAgICAgICAgICAgdmFyIHVyaSA9IFwiL3dvcGkvZmlsZXMvXCIgKyB0aGlzLnByb3BzLm5vZGUuZ2V0TWV0YWRhdGEoKS5nZXQoXCJ1dWlkXCIpO1xuICAgICAgICAgICAgdmFyIGZpbGVTcmNVcmwgPSBlbmNvZGVVUklDb21wb25lbnQoJycgKyBob3N0ICsgdXJpKTtcblxuICAgICAgICAgICAgX2FwaTIuZGVmYXVsdC5nZXRSZXN0Q2xpZW50KCkuZ2V0T3JVcGRhdGVKd3QoKS50aGVuKGZ1bmN0aW9uIChqd3QpIHtcbiAgICAgICAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoeyB1cmw6IGlmcmFtZVVybCArICc/aG9zdD0nICsgd2ViU29ja2V0VXJsICsgJyZXT1BJU3JjPScgKyBmaWxlU3JjVXJsICsgJyZhY2Nlc3NfdG9rZW49JyArIGp3dCArICcmcGVybWlzc2lvbj0nICsgcGVybWlzc2lvbiB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIHVybCA9IHRoaXMuc3RhdGUudXJsO1xuXG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScsIHsgc3JjOiB1cmwsIHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiLCB3aWR0aDogXCIxMDAlXCIsIGhlaWdodDogXCIxMDAlXCIsIGJvcmRlcjogMCwgZmxleDogMSB9IH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEVkaXRvcjtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCkpIHx8IF9jbGFzcyk7XG5leHBvcnRzLmRlZmF1bHQgPSBFZGl0b3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFjdGlvbnMgPSBleHBvcnRzLkVkaXRvciA9IHVuZGVmaW5lZDtcblxudmFyIF9lZGl0b3IgPSByZXF1aXJlKCcuL2VkaXRvcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0VkaXRvcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VkaXRvcikuZGVmYXVsdDtcbiAgfVxufSk7XG5cbnZhciBfYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucycpO1xuXG52YXIgQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9hY3Rpb25zKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5BY3Rpb25zID0gQWN0aW9ucztcbiJdfQ==
