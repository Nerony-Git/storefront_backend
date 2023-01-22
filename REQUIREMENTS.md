# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

### Products

- Index "/products" [GET]
- Show "/products/:id" [GET] (args: product id)
- Create "/products" [POST] [token required]
- Update "/products/:id" [PUT] (args: product id) [token required]
- Delete "/products/:id" [DELETE] (args: product id) [token required]

### Users

- Index "/users" [GET] [token required]
- Show "/users/:id" [GET] (args: id) [token required]
- Authorize "/users/authorize" [GET] [token required]
- Signin "/users/signin" [POST]
- Create "/users" [POST] (args: User)
- Delete "/users/:id" [DELETE] (args: id) [token required]

### Order

- Index "/orders" [GET] [token required]
- Show "/orders/:id" [GET] (args: id) [token required]
- Create "/orders" [POST] (args: Order) [token required]
- Delete "/orders/:id" [DELETE] (args: id) [token required]

### Order_Product

- AddProduct "/orders/products/add" [POST] (args: Order) [token required]
- Delete "/orders/products:id" [DELETE] (args: id) [token required]

## Data Shapes

### Product_Details

      Column      |         Type          | Collation | Nullable |                   Default                   | Storage  | Compression | Stats target |          Description
------------------+-----------------------+-----------+----------+---------------------------------------------+----------+-------------+--------------+-------------------------------
 sn               | integer               |           | not null | nextval('product_details_sn_seq'::regclass) | plain    |             |              | index
 product_id       | character varying(20) |           |          |                                             | extended |             |              | ID for product
 product_name     | character varying(50) |           | not null |                                             | extended |             |              | the name of the product
 product_price    | integer               |           | not null |                                             | plain    |             |              | the price of the product
 product_category | character varying(50) |           |          |                                             | extended |             |              | Category the product falls in

Indexes:
    "product_details_pkey" PRIMARY KEY, btree (sn)

Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product_details(sn)

### User_Details

   Column   |          Type          | Collation | Nullable |                 Default                  | Storage  | Compression | Stats target |            Description
------------+------------------------+-----------+----------+------------------------------------------+----------+-------------+--------------+-----------------------------------
 sn         | integer                |           | not null | nextval('user_details_sn_seq'::regclass) | plain    |             |              | index
 user_id    | character varying(20)  |           |          |                                          | extended |             |              | the ID of the user
 first_name | character varying(50)  |           |          |                                          | extended |             |              | the user's first name
 last_name  | character varying(50)  |           |          |                                          | extended |             |              | the user's last name
 username   | character varying(50)  |           |          |                                          | extended |             |              | the prefered username of the user
 password   | character varying(100) |           |          |                                          | extended |             |              | the password of the user

Indexes:
    "user_details_pkey" PRIMARY KEY, btree (sn)

Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_details(sn)

### Orders

 Column  |         Type          | Collation | Nullable |              Default               | Storage  | Compression | Stats target | Description
---------+-----------------------+-----------+----------+------------------------------------+----------+-------------+--------------+-------------
 sn      | integer               |           | not null | nextval('orders_sn_seq'::regclass) | plain    |             |              |
 user_id | bigint                |           |          |                                    | plain    |             |              |
 status  | character varying(20) |           |          |                                    | extended |             |              |

Indexes:
    "orders_pkey" PRIMARY KEY, btree (sn)

Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_details(sn)

Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(sn)

### Order_Products

   Column   |  Type   | Collation | Nullable |                  Default                   | Storage | Compression | Stats target | Description
------------+---------+-----------+----------+--------------------------------------------+---------+-------------+--------------+-------------
 sn         | integer |           | not null | nextval('order_products_sn_seq'::regclass) | plain   |             |              |
 quantity   | integer |           |          |                                            | plain   |             |              |
 order_id   | bigint  |           |          |                                            | plain   |             |              |
 product_id | bigint  |           |          |                                            | plain   |             |              |

Indexes:
    "order_products_pkey" PRIMARY KEY, btree (sn)

Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(sn)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product_details(sn)
