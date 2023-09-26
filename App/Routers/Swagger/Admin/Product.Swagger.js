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
 *  /admin/product/create: 
 *      post: 
 *          tags: [Admin-Product]
 *          summary: ProductCategory in website
 *          description: ProductCategory is ProductCategory
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
 *  /admin/product/list:
 *      get: 
 *          tags: [Admin-Product]
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
 *                              $ref: '#/definitions/PublicDefinition'
 */