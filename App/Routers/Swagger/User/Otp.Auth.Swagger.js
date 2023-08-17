/**
 * @swagger 
 *  components:
 *      schemas:
 *          Otp_Register: 
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties:
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for signUp/signIn
 *          Otp_Login:
 *              type: object
 *              required: 
 *                  -   mobile
 *                  -   code
 *              properties: 
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for Login
 *                  code: 
 *                      type: string
 *                      description: the password code
 *          Otp_refreshToken:
 *              type: object
 *              required: 
 *                  -   refreshToken
 *              properties: 
 *                  refreshToken:
 *                      type: string
 *                      description: the refreshToken
 */

/**
 * @swagger 
 *  /users/otp_register: 
 *      post: 
 *          tags: [User-OTP_Authentication]
 *          summary: Login User In feacher mobile and password
 *          description: Login User In feacher mobile and password
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Otp_Register'             
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'               
 */
/**
 * @swagger
 *  /users/otp_login:
 *      post:
 *          tags: [User-OTP_Authentication]
 *          summary: check Login User In password Code with Mobile
 *          description: check Login  mobile and Password
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Otp_Login'
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 *              
 */
/**
 * @swagger
 *  /users/otp-refreshtoken:
 *      post:
 *          tags: [User-OTP_Authentication]
 *          summary: check Login  mobile and Password
 *          description: check Login  mobile and Password
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Otp_refreshToken'      
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 *              
 */