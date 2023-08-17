/**
 * @swagger 
 *  components:
 *      schemas:
 *          Register: 
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties: 
 *                  firstname: 
 *                      type: string
 *                      description: the user mobile for signUp/signIn
 *                  lastname: 
 *                      type: string
 *                      description: the user mobile for signUp/signIn
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for signUp/signIn
 *                  email: 
 *                      type: string
 *                      description: the user mobile for signUp/signIn
 *                  password: 
 *                      type: string
 *                      description: the user mobile for signUp/signIn
 * 
 *          Login:
 *              type: object
 *              required: 
 *                  -   mobile
 *                  -   password
 *              properties: 
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for Check Login
 *                  password: 
 *                      type: string
 *                      description: the Otp code
 *          refreshToken:
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
 *  /users/register: 
 *      post: 
 *          tags: [User-Authentication]
 *          summary: Login User In Otp Code with Mobile
 *          description: One Time Password (OTP) login
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Register'             
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Register'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'
 * 
 *                
 *                         
 *                 
 */
/**
 * @swagger
 *  /users/login:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check Login User In Otp Code with Mobile
 *          description: check Login  mobile and One Time Password (OTP)
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Login'
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 *              
 */