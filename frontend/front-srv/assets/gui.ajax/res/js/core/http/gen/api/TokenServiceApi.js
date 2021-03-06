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


import ApiClient from "../ApiClient";
import RestResetPasswordRequest from '../model/RestResetPasswordRequest';
import RestResetPasswordResponse from '../model/RestResetPasswordResponse';
import RestResetPasswordTokenResponse from '../model/RestResetPasswordTokenResponse';
import RestRevokeRequest from '../model/RestRevokeRequest';
import RestRevokeResponse from '../model/RestRevokeResponse';

/**
* TokenService service.
* @module api/TokenServiceApi
* @version 1.0
*/
export default class TokenServiceApi {

    /**
    * Constructs a new TokenServiceApi. 
    * @alias module:api/TokenServiceApi
    * @class
    * @param {module:ApiClient} apiClient Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Finish up the reset password process by providing the unique token
     * @param {module:model/RestResetPasswordRequest} body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/RestResetPasswordResponse} and HTTP response
     */
    resetPasswordWithHttpInfo(body) {
      let postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling resetPassword");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = RestResetPasswordResponse;

      return this.apiClient.callApi(
        '/auth/reset-password', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Finish up the reset password process by providing the unique token
     * @param {module:model/RestResetPasswordRequest} body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/RestResetPasswordResponse}
     */
    resetPassword(body) {
      return this.resetPasswordWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Generate a unique token for the reset password process
     * @param {String} userLogin 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/RestResetPasswordTokenResponse} and HTTP response
     */
    resetPasswordTokenWithHttpInfo(userLogin) {
      let postBody = null;

      // verify the required parameter 'userLogin' is set
      if (userLogin === undefined || userLogin === null) {
        throw new Error("Missing the required parameter 'userLogin' when calling resetPasswordToken");
      }


      let pathParams = {
        'UserLogin': userLogin
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = RestResetPasswordTokenResponse;

      return this.apiClient.callApi(
        '/auth/reset-password-token/{UserLogin}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Generate a unique token for the reset password process
     * @param {String} userLogin 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/RestResetPasswordTokenResponse}
     */
    resetPasswordToken(userLogin) {
      return this.resetPasswordTokenWithHttpInfo(userLogin)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Revoke a JWT token
     * @param {module:model/RestRevokeRequest} body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/RestRevokeResponse} and HTTP response
     */
    revokeWithHttpInfo(body) {
      let postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling revoke");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = RestRevokeResponse;

      return this.apiClient.callApi(
        '/auth/token/revoke', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Revoke a JWT token
     * @param {module:model/RestRevokeRequest} body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/RestRevokeResponse}
     */
    revoke(body) {
      return this.revokeWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
