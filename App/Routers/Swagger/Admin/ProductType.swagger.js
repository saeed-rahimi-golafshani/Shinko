/**
 * @swagger
 *  definitions:
 *      ListOfProductType:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      courses:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  type_name:
 *                                      type: string
 *                                      example: "title of ProductType"           
 */
/**
 * @swagger 
 *  components:
 *      schemas:
 *          Create_ProductType: 
 *              type: object
 *              required: 
 *                  -   type_name 
 *              properties: 
 *                  type_name: 
 *                      type: string
 *                      description: the type_name of ProductType
 *          UpdateProductType: 
 *              type: object
 *              properties: 
 *                  type_name: 
 *                      type: string
 *                      description: the type_name of ProductType
 */
/**
 * @swagger 
 *  /admin/product_type/create: 
 *      post: 
 *          tags: [Admin-ProductType]
 *          summary: ProductType in website
 *          description: ProductType is ProductType
 *          requestBody:
 *              required: true
 *              content:          
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Create_ProductType'
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
 *  /admin/product_type/list:
 *      get: 
 *          tags: [Admin-ProductType]
 *          summary: List Of ProductType  In admin panel
 *          description: List Of ProductType in admin panel
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfProductType'
 */
/**
 * @swagger 
 *  /admin/product_type/list/{id}: 
 *      get: 
 *          tags: [Admin-ProductType]
 *          summary: update category with Id
 *          description: update category in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfProductType'       
 */
/**
/**
 * @swagger 
 *  /admin/product_type/remove/{id}: 
 *      delete: 
 *          tags: [Admin-ProductType]
 *          summary: delete ProductType with Id
 *          description: delete ProductType in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
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
 *  /admin/product_type/update/{id}: 
 *      patch: 
 *          tags: [Admin-ProductType]
 *          summary: update ProductType with Id
 *          description: update ProductType in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:             
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateProductType'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/x-www-form-urlencoded:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'       
 */