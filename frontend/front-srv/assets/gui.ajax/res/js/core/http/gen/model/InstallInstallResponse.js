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


import ApiClient from '../ApiClient';





/**
* The InstallInstallResponse model module.
* @module model/InstallInstallResponse
* @version 1.0
*/
export default class InstallInstallResponse {
    /**
    * Constructs a new <code>InstallInstallResponse</code>.
    * @alias module:model/InstallInstallResponse
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>InstallInstallResponse</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/InstallInstallResponse} obj Optional instance to populate.
    * @return {module:model/InstallInstallResponse} The populated <code>InstallInstallResponse</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InstallInstallResponse();

            
            
            

            if (data.hasOwnProperty('success')) {
                obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
            }
        }
        return obj;
    }

    /**
    * @member {Boolean} success
    */
    success = undefined;








}

