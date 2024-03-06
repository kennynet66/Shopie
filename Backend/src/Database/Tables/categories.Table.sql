/* 
    The categories table should contain:-
    1. Category id Primary key
    2. Category Name
 */

 CREATE TABLE Categories(
    categoryId VARCHAR(255) NOT NULL PRIMARY KEY,
    categoryName VARCHAR(255)
 )

ALTER TABLE Categories
ADD categoryImage VARCHAR(255)
