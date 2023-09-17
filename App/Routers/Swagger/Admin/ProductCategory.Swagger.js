/**
 * @swagger
 *  definitions:
 *      ListOfProductCategory:
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
 *                                  title:
 *                                      type: string
 *                                      example: "title of ProductCategory"
 *                                  en_title:
 *                                      type: string
 *                                      example: "title of ProductCategory" 
 *                                  text:
 *                                      type: string
 *                                      example: "title of ProductCategory"
 *                                  short_text:
 *                                      type: string
 *                                      example: "title of ProductCategory"
 *                                  tags:
 *                                      type: array
 *                                      example: "title of ProductCategory"  
 *                                  parent_Category: 
 *                                      type: string
 *                                      description: the parent_Category of ProductCategory               
 *                                  icon:
 *                                      type: string
 *                                      example: "icon of ProductCategory"    
 *                                  showInArchive: 
 *                                      type: boolean
 *                                      description: the showInArchive of ProductCategory 
 *                                  priority: 
 *                                      type: string
 *                                      description: the parent_Category of ProductCategory              
 */
/**
 * @swagger 
 *  components:
 *      schemas:
 *          Create_ProductCategory: 
 *              type: object
 *              required: 
 *                  -   title
 *                  -   en_title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of ProductCategory 
 *                  en_title: 
 *                      type: string
 *                      description: the en_title of ProductCategory 
 *                  text: 
 *                      type: string
 *                      description: the title of ProductCategory 
 *                  short_text: 
 *                      type: string
 *                      description: the title of ProductCategory 
 *                  tags: 
 *                      type: array
 *                      description: the title of ProductCategory 
 *                  parent_Category: 
 *                      type: string
 *                      description: the parent_Category of ProductCategory
 *                  icon: 
 *                      type: file
 *                      description: the summery of text of ProductCategory
 *                  showInArchive: 
 *                      type: boolean
 *                      description: the showInArchive of ProductCategory 
 *                  priority: 
 *                      type: string
 *                      description: the parent_Category of ProductCategory
 *          UpdateCategory: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of ProductCategory 
 *                  en_title: 
 *                      type: string
 *                      description: the en_title of ProductCategory 
 *                  text: 
 *                      type: string
 *                      description: the title of ProductCategory 
 *                  short_text: 
 *                      type: string
 *                      description: the title of ProductCategory 
 *                  tags: 
 *                      type: array
 *                      description: the title of ProductCategory 
 *                  parent_Category: 
 *                      type: string
 *                      description: the parent_Category of ProductCategory
 *                  icon: 
 *                      type: file
 *                      description: the summery of text of ProductCategory
 *                  showInArchive: 
 *                      type: boolean
 *                      description: the showInArchive of ProductCategory 
 *                  priority: 
 *                      type: string
 *                      description: the parent_Category of ProductCategory
 */
/**
 * @swagger 
 *  /admin/product_category/create: 
 *      post: 
 *          tags: [Admin-ProductCategory]
 *          summary: ProductCategory in website
 *          description: ProductCategory is ProductCategory
 *          requestBody:
 *              required: true
 *              content:          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Create_ProductCategory'
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
 *  /admin/product_category/list:
 *      get: 
 *          tags: [Admin-ProductCategory]
 *          summary: List Of ProductCategory  In admin panel
 *          description: List Of ProductCategory in admin panel
 *          parameters: 
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title of blog
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfProductCategory'
 */
/**
 * @swagger 
 *  /admin/product_category/list/{id}: 
 *      get: 
 *          tags: [Admin-ProductCategory]
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
 *                                  $ref: '#/definitions/ListOfProductCategory'       
 */
/**
* @swagger
 *  /admin/product_category/list-all:
 *      get: 
 *          tags: [Admin-ProductCategory]
 *          summary: List Of All Category  In admin panel
 *          description: List Of All Category in admin panel
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfProductCategory'
 */
/**
 * @swagger 
 *  /admin/product_category/remove/{id}: 
 *      delete: 
 *          tags: [Admin-ProductCategory]
 *          summary: delete ProductCategory with Id
 *          description: delete ProductCategory in admin panel
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
 *  /admin/product_category/update/{id}: 
 *      patch: 
 *          tags: [Admin-ProductCategory]
 *          summary: update ProductCategory with Id
 *          description: update category in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:             
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategory'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'       
 */