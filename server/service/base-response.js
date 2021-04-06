/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 18 March 2021;
Modified By: Douglas Jenkins;
Description: creating a sign in page
;===========================================*/

class BaseResponse {

  constructor(httpCode, message, data, timestamp){

    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
    this.timestamp = timestamp;

  }

  // returns the data to the API
  toObject(){
     return {
       'httpCode': this.httpCode,
       'message': this.message,
       'data': this.data,
       'timestamp': new Date().toLocaleDateString('en-US')
     }
  }
}

module.exports = BaseResponse;
