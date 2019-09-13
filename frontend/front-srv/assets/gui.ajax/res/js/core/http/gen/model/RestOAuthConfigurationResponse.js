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
* The RestOAuthConfigurationResponse model module.
* @module model/RestOAuthConfigurationResponse
* @version 1.0
*/
export default class RestOAuthConfigurationResponse {
    /**
    * Constructs a new <code>RestOAuthConfigurationResponse</code>.
    * @alias module:model/RestOAuthConfigurationResponse
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>RestOAuthConfigurationResponse</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RestOAuthConfigurationResponse} obj Optional instance to populate.
    * @return {module:model/RestOAuthConfigurationResponse} The populated <code>RestOAuthConfigurationResponse</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RestOAuthConfigurationResponse();

            
            
            

            if (data.hasOwnProperty('issuer')) {
                obj['issuer'] = ApiClient.convertToType(data['issuer'], 'String');
            }
            if (data.hasOwnProperty('authorization_endpoint')) {
                obj['authorization_endpoint'] = ApiClient.convertToType(data['authorization_endpoint'], 'String');
            }
            if (data.hasOwnProperty('token_endpoint')) {
                obj['token_endpoint'] = ApiClient.convertToType(data['token_endpoint'], 'String');
            }
            if (data.hasOwnProperty('jwks_uri')) {
                obj['jwks_uri'] = ApiClient.convertToType(data['jwks_uri'], 'String');
            }
            if (data.hasOwnProperty('response_types_supported')) {
                obj['response_types_supported'] = ApiClient.convertToType(data['response_types_supported'], ['String']);
            }
            if (data.hasOwnProperty('subject_types_supported')) {
                obj['subject_types_supported'] = ApiClient.convertToType(data['subject_types_supported'], ['String']);
            }
            if (data.hasOwnProperty('id_token_signing_alg_values_supported')) {
                obj['id_token_signing_alg_values_supported'] = ApiClient.convertToType(data['id_token_signing_alg_values_supported'], ['String']);
            }
            if (data.hasOwnProperty('scopes_supported')) {
                obj['scopes_supported'] = ApiClient.convertToType(data['scopes_supported'], ['String']);
            }
            if (data.hasOwnProperty('token_endpoint_auth_methods_supported')) {
                obj['token_endpoint_auth_methods_supported'] = ApiClient.convertToType(data['token_endpoint_auth_methods_supported'], ['String']);
            }
            if (data.hasOwnProperty('claims_supported')) {
                obj['claims_supported'] = ApiClient.convertToType(data['claims_supported'], ['String']);
            }
        }
        return obj;
    }

    /**
    * @member {String} issuer
    */
    issuer = undefined;
    /**
    * @member {String} authorization_endpoint
    */
    authorization_endpoint = undefined;
    /**
    * @member {String} token_endpoint
    */
    token_endpoint = undefined;
    /**
    * @member {String} jwks_uri
    */
    jwks_uri = undefined;
    /**
    * @member {Array.<String>} response_types_supported
    */
    response_types_supported = undefined;
    /**
    * @member {Array.<String>} subject_types_supported
    */
    subject_types_supported = undefined;
    /**
    * @member {Array.<String>} id_token_signing_alg_values_supported
    */
    id_token_signing_alg_values_supported = undefined;
    /**
    * @member {Array.<String>} scopes_supported
    */
    scopes_supported = undefined;
    /**
    * @member {Array.<String>} token_endpoint_auth_methods_supported
    */
    token_endpoint_auth_methods_supported = undefined;
    /**
    * @member {Array.<String>} claims_supported
    */
    claims_supported = undefined;








}

