
/**
 * @swagger
 *  components: 
 *      schemas:
 *          Active:
 *              type: boolean
 *              enum:
 *                  -   true
 *                  -   false
 */
/**
 * @swagger
 *  components: 
 *      schemas:
 *          Returned:
 *              type: boolean
 *              enum:
 *                  -   true
 *                  -   false
 */

/**
 * @swagger 
 *  components:
 *      schemas:
 *          Create_Product: 
 *              type: object
 *              required: 
 *                  -   title
 *                  -   en_title
 *                  -   product_category_Id
 *                  -   Product_Type_Id
 *                  -   short_text
 *                  -   text
 *                  -   images   
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Product
 *                  en_title: 
 *                      type: string
 *                      description: the en_title of Product
 *                  Product_category_Id: 
 *                      type: string
 *                      description: the author of Product
 *                  short_text: 
 *                      type: string
 *                      description: the short_text of Product 
 *                  text: 
 *                      type: string
 *                      description: the text of Product
 *                  tags: 
 *                      type: array
 *                      description: the text of Product
 *                  Product_Type_Id: 
 *                      type: string
 *                      description: the text of Product
 *                  images: 
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
 *                  producer: 
 *                      type: string
 *                      description: the text of Product
 *                  status: 
 *                      type: string
 *                      description: the text of Product
 *                  stock: 
 *                      type: number
 *                      description: the text of Product
 *                  active: 
 *                      $ref: '#/components/schemas/Active'
 *                  main_price: 
 *                      type: number
 *                      description: the text of Product
 *                  discount: 
 *                      type: number
 *                      description: the text of Product
 *                  send_date: 
 *                      type: string
 *                      description: the text of Product
 *                  returned: 
 *                   $ref: '#/components/schemas/Returned'
 *          UpdateProduct: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Product
 *                  en_title: 
 *                      type: string
 *                      description: the en_title of Product
 *                  Product_category_Id: 
 *                      type: string
 *                      description: the author of Product
 *                  short_text: 
 *                      type: string
 *                      description: the short_text of Product 
 *                  text: 
 *                      type: string
 *                      description: the text of Product
 *                  tags: 
 *                      type: array
 *                      description: the text of Product
 *                  Product_Type_Id: 
 *                      type: string
 *                      description: the text of Product
 *                  images: 
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
 *                  producer: 
 *                      type: string
 *                      description: the text of Product
 *                  status: 
 *                      type: string
 *                      description: the text of Product
 *                  stock: 
 *                      type: number
 *                      description: the text of Product
 *                  active: 
 *                      $ref: '#/components/schemas/Active'
 *                  main_price: 
 *                      type: number
 *                      description: the text of Product
 *                  discount: 
 *                      type: number
 *                      description: the text of Product
 *                  send_date: 
 *                      type: string
 *                      description: the text of Product
 *                  returned: 
 *                   $ref: '#/components/schemas/Returned'
 */

/**
 * @swagger 
 *  /admin/product1/create: 
 *      post: 
 *          tags: [Admin-Product2]
 *          summary: Product in website
 *          description: Product is Product
 *          requestBody:
 *              required: true
 *              content:          
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Create_Product'
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
 *  /admin/product1/list:
 *      get: 
 *          tags: [Admin-Product2]
 *          summary: List Of Product  In admin panel
 *          description: List Of Product in admin panel
 *          parameters:
 *              -   in: query
 *                  name: search
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
 *  /admin/product1/list/{id}: 
 *      get: 
 *          tags: [Admin-Product2]
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
 *  /admin/product1/list_author/{authorId}:
 *      get: 
 *          tags: [Admin-Product2]
 *          summary: List Of ProductCategory  In admin panel
 *          description: List Of ProductCategory in admin panel
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
 *  /admin/product1/list_Productcategory/{catId}:
 *      get: 
 *          tags: [Admin-Product2]
 *          summary: List Of All Category  In admin panel
 *          description: List Of All Category in admin panel
 *          parameters:
 *              -   in: path
 *                  name: catId
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
 *  /admin/product1/remove/{id}: 
 *      delete: 
 *          tags: [Admin-Product2]
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
 *  /admin/product1/update/{id}: 
 *      patch: 
 *          tags: [Admin-Product2]
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
 *                          $ref: '#/components/schemas/UpdateProduct'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'       
 */