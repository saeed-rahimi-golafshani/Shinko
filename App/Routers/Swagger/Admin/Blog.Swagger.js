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
 *          Create_Blog: 
 *              type: object
 *              required: 
 *                  -   title
 *                  -   en_title
 *                  -   blog_category_Id
 *                  -   short_text
 *                  -   text
 *                  -   images   
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Blog
 *                  en_title: 
 *                      type: string
 *                      description: the en_title of Blog
 *                  blog_category_Id: 
 *                      type: string
 *                      description: the author of Blog
 *                  short_text: 
 *                      type: string
 *                      description: the short_text of Blog 
 *                  text: 
 *                      type: string
 *                      description: the text of Blog
 *                  tags: 
 *                      type: array
 *                      description: the text of Blog
 *                  reading_time: 
 *                      type: string
 *                      description: the text of Blog
 *                  images: 
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
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
 *  /admin/blog/create: 
 *      post: 
 *          tags: [Admin-Blog]
 *          summary: Blog in website
 *          description: Blog is Blog
 *          requestBody:
 *              required: true
 *              content:          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Create_Blog'
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
 *  /admin/blog/list:
 *      get: 
 *          tags: [Admin-Blog]
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
 *  /admin/blog/list/{id}: 
 *      get: 
 *          tags: [Admin-Blog]
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
 *  /admin/blog/list_author/{authorId}:
 *      get: 
 *          tags: [Admin-Blog]
 *          summary: List Of BlogCategory  In admin panel
 *          description: List Of BlogCategory in admin panel
 *          parameters:
 *              -   in: path
 *                  name: authorId
 *                  type: string
 *                  required: true
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
 *  /admin/blog/list-all:
 *      get: 
 *          tags: [Admin-Blog]
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
 *  /admin/blog/remove/{id}: 
 *      delete: 
 *          tags: [Admin-Blog]
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
 *  /admin/blog/update/{id}: 
 *      patch: 
 *          tags: [Admin-Blog]
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