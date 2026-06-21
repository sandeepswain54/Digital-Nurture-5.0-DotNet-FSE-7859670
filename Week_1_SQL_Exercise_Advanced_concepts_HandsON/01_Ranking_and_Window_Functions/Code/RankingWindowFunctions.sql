USE DigitalNurtureSQL;

CREATE TABLE Products
(
    ProductId INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2)
);

INSERT INTO Products (ProductId, ProductName, Category, Price) VALUES
(1, 'Laptop', 'Electronics', 75000),
(2, 'Smartphone', 'Electronics', 60000),
(3, 'Tablet', 'Electronics', 60000),
(4, 'Headphones', 'Electronics', 3000),
(5, 'Monitor', 'Electronics', 15000),
(6, 'Office Chair', 'Furniture', 8000),
(7, 'Desk', 'Furniture', 12000),
(8, 'Bookshelf', 'Furniture', 5000),
(9, 'Sofa', 'Furniture', 25000),
(10, 'Dining Table', 'Furniture', 20000);

SELECT 
    ProductId,
    ProductName,
    Category,
    Price,
    ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC) AS RowNum,
    RANK()       OVER (PARTITION BY Category ORDER BY Price DESC) AS Rnk,
    DENSE_RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS DenseRnk
FROM Products
ORDER BY Category, Price DESC;

WITH RankedProducts AS
(
    SELECT 
        ProductId,
        ProductName,
        Category,
        Price,
        ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC) AS RowNum
    FROM Products
)
SELECT ProductId, ProductName, Category, Price
FROM RankedProducts
WHERE RowNum <= 3
ORDER BY Category, Price DESC;