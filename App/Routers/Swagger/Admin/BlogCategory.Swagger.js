/**
 * @swagger
 *  definitions:
 *      ListOfCategoryNavbar:
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
 *                                      example: "title of CategoryNavbar"
 *                                  en_title:
 *                                      type: string
 *                                      example: "title of CategoryNavbar"   
 *                                  parent_Category: 
 *                                      type: string
 *                                      description: the parent_Category of BlogCategory               
 *                                  icon:
 *                                      type: string
 *                                      example: "icon of CategoryNavbar"    
 *                                  showInArchive: 
 *                                      type: boolean
 *                                      description: the showInArchive of BlogCategory 
 *                                  priority: 
 *                                      type: string
 *                                      description: the parent_Category of BlogCategory              
 */
/**
 * @swagger 
 *  components:
 *      schemas:
 *          Create_BlogCategory: 
 *              type: object
 *              required: 
 *                  -   title
 *                  -   en_title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of BlogCategory 
 *                  en_title: 
 *                      type: string
 *                      description: the en_title of BlogCategory 
 *                  parent_Category: 
 *                      type: string
 *                      description: the parent_Category of BlogCategory
 *                  icon: 
 *                      type: file
 *                      description: the summery of text of BlogCategory
 *                  showInArchive: 
 *                      type: boolean
 *                      description: the showInArchive of BlogCategory 
 *                  priority: 
 *                      type: string
 *                      description: the parent_Category of BlogCategory
 *          UpdateCategory: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of BlogCategory 
 *                  en_title: 
 *                      type: string
 *                      description: the en_title of BlogCategory 
 *                  parent_Category: 
 *                      type: string
 *                      description: the parent_Category of BlogCategory
 *                  icon: 
 *                      type: file
 *                      description: the summery of text of BlogCategory
 *                  showInArchive: 
 *                      type: boolean
 *                      description: the showInArchive of BlogCategory 
 *                  priority: 
 *                      type: string
 *                      description: the parent_Category of BlogCategory
 */
/**
 * @swagger 
 *  /admin/blog_category/create: 
 *      post: 
 *          tags: [Admin-BlogCategory]
 *          summary: BlogCategory in website
 *          description: BlogCategory is BlogCategory
 *          requestBody:
 *              required: true
 *              content:          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Create_BlogCategory'
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
 *  /admin/blog_category/list:
 *      get: 
 *          tags: [Admin-BlogCategory]
 *          summary: List Of BlogCategory  In admin panel
 *          description: List Of BlogCategory in admin panel
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger 
 *  /admin/blog_category/list/{id}: 
 *      get: 
 *          tags: [Admin-BlogCategory]
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
 *                                  $ref: '#/definitions/PublicDefinition'       
 */
/**
* @swagger
 *  /admin/blog_category/list-all:
 *      get: 
 *          tags: [Admin-BlogCategory]
 *          summary: List Of All Category  In admin panel
 *          description: List Of All Category in admin panel
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger 
 *  /admin/blog_category/remove/{id}: 
 *      delete: 
 *          tags: [Admin-BlogCategory]
 *          summary: delete BlogCategory with Id
 *          description: delete BlogCategory in admin panel
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
 *  /admin/blog_category/update/{id}: 
 *      patch: 
 *          tags: [Admin-BlogCategory]
 *          summary: update BlogCategory with Id
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