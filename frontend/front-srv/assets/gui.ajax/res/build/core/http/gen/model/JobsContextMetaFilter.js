/**
 * Pydio Cells Rest API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ApiClient = require('../ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _JobsContextMetaFilterType = require('./JobsContextMetaFilterType');

var _JobsContextMetaFilterType2 = _interopRequireDefault(_JobsContextMetaFilterType);

var _ServiceQuery = require('./ServiceQuery');

var _ServiceQuery2 = _interopRequireDefault(_ServiceQuery);

/**
* The JobsContextMetaFilter model module.
* @module model/JobsContextMetaFilter
* @version 1.0
*/

var JobsContextMetaFilter = (function () {
    /**
    * Constructs a new <code>JobsContextMetaFilter</code>.
    * @alias module:model/JobsContextMetaFilter
    * @class
    */

    function JobsContextMetaFilter() {
        _classCallCheck(this, JobsContextMetaFilter);

        this.Type = undefined;
        this.Query = undefined;
    }

    /**
    * Constructs a <code>JobsContextMetaFilter</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/JobsContextMetaFilter} obj Optional instance to populate.
    * @return {module:model/JobsContextMetaFilter} The populated <code>JobsContextMetaFilter</code> instance.
    */

    JobsContextMetaFilter.constructFromObject = function constructFromObject(data, obj) {
        if (data) {
            obj = obj || new JobsContextMetaFilter();

            if (data.hasOwnProperty('Type')) {
                obj['Type'] = _JobsContextMetaFilterType2['default'].constructFromObject(data['Type']);
            }
            if (data.hasOwnProperty('Query')) {
                obj['Query'] = _ServiceQuery2['default'].constructFromObject(data['Query']);
            }
        }
        return obj;
    };

    /**
    * @member {module:model/JobsContextMetaFilterType} Type
    */
    return JobsContextMetaFilter;
})();

exports['default'] = JobsContextMetaFilter;
module.exports = exports['default'];

/**
* @member {module:model/ServiceQuery} Query
*/