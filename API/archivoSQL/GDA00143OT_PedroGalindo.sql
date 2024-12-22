CREATE DATABASE GDA00143OT_PedroGalindo;
USE GDA00143OT_PedroGalindo;

-- Tabla roles
CREATE TABLE Roles (
    RoleID INT AUTO_INCREMENT PRIMARY KEY,
    RoleName VARCHAR(45) NOT NULL
);

-- Tabla estados
CREATE TABLE Status (
    StatusID INT AUTO_INCREMENT PRIMARY KEY,
    StatusName VARCHAR(45) NOT NULL
);

-- Tabla usuarios
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    RoleID INT NOT NULL,
    StatusID INT NOT NULL,
    Email VARCHAR(100) NOT NULL,
    FullName VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Phone VARCHAR(15),
    BirthDate DATE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    ClientID INT,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
    FOREIGN KEY (StatusID) REFERENCES Status(StatusID)
);

-- Tabla clientes
CREATE TABLE Clients (
    ClientID INT AUTO_INCREMENT PRIMARY KEY,
    LegalName VARCHAR(245) NOT NULL,
    TradeName VARCHAR(245) NOT NULL,
    DeliveryAddress VARCHAR(255) NOT NULL,
    Phone VARCHAR(15),
    Email VARCHAR(100) NOT NULL
);

-- Tabla categorías
CREATE TABLE ProductCategories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    StatusID INT NOT NULL,
    CategoryName VARCHAR(100) NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (StatusID) REFERENCES Status(StatusID)
);

-- Tabla productos
CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryID INT NOT NULL,
    UserID INT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    Brand VARCHAR(100),
    Code VARCHAR(45),
    Stock FLOAT NOT NULL,
    StatusID INT NOT NULL,
    Price FLOAT NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    Photo BLOB,
    FOREIGN KEY (CategoryID) REFERENCES ProductCategories(CategoryID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (StatusID) REFERENCES Status(StatusID)
);

-- Tabla órdenes
CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    StatusID INT NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FullName VARCHAR(100) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Phone VARCHAR(15),
    Email VARCHAR(100),
    DeliveryDate DATE,
    OrderTotal FLOAT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (StatusID) REFERENCES Status(StatusID)
);

-- Tabla detalles de órdenes
CREATE TABLE OrderDetails (
    DetailID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    Price FLOAT NOT NULL,
    SubTotal FLOAT NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

DELIMITER $$

-- Agregar roles
CREATE PROCEDURE AddRole (
    IN p_RoleName VARCHAR(45)
)
BEGIN
    INSERT INTO Roles (RoleName)
    VALUES (p_RoleName);
END$$

-- Editar roles
CREATE PROCEDURE UpdateRole (
    IN p_RoleID INT,
    IN p_RoleName VARCHAR(45)
)
BEGIN
    UPDATE Roles SET RoleName = p_RoleName WHERE RoleID = p_RoleID;
END$$

-- Agregar estados
CREATE PROCEDURE AddStatus (
    IN p_StatusName VARCHAR(45)
)
BEGIN
    INSERT INTO Status (StatusName)
    VALUES (p_StatusName);
END$$

-- Editar estados
CREATE PROCEDURE UpdateStatus (
    IN p_StatusID INT,
    IN p_StatusName VARCHAR(45)
)
BEGIN
    UPDATE Status SET StatusName = p_StatusName WHERE StatusID = p_StatusID;
END$$

-- Agregar usuarios
CREATE PROCEDURE AddUser (
    IN p_RoleID INT,
    IN p_StatusID INT,
    IN p_Email VARCHAR(45),
    IN p_FullName VARCHAR(45),
    IN p_Password VARCHAR(45),
    IN p_Phone VARCHAR(45),
    IN p_BirthDate DATE
)
BEGIN
    INSERT INTO Users (RoleID, StatusID, Email, FullName, Password, Phone, BirthDate)
    VALUES (p_RoleID, p_StatusID, p_Email, p_FullName, p_Password, p_Phone, p_BirthDate);
END$$

-- Editar usuarios
CREATE PROCEDURE UpdateUser (
    IN p_UserID INT,
    IN p_RoleID INT,
    IN p_StatusID INT,
    IN p_Email VARCHAR(45),
    IN p_FullName VARCHAR(45),
    IN p_Password VARCHAR(45),
    IN p_Phone VARCHAR(45),
    IN p_BirthDate DATE
)
BEGIN
    UPDATE Users SET RoleID = p_RoleID, StatusID = p_StatusID, Email = p_Email, FullName = p_FullName, Password = p_Password, Phone = p_Phone, BirthDate = p_BirthDate WHERE UserID = p_UserID;
END$$

-- Agregar clientes
CREATE PROCEDURE AddClient (
    IN p_LegalName VARCHAR(245),
    IN p_TradeName VARCHAR(345),
    IN p_DeliveryAddress VARCHAR(45),
    IN p_Phone VARCHAR(45),
    IN p_Email VARCHAR(45)
)
BEGIN
    INSERT INTO Clients (LegalName, TradeName, DeliveryAddress, Phone, Email)
    VALUES (p_LegalName, p_TradeName, p_DeliveryAddress, p_Phone, p_Email);
END$$

-- Editar clientes
CREATE PROCEDURE UpdateClient (
    IN p_ClientID INT,
    IN p_LegalName VARCHAR(245),
    IN p_TradeName VARCHAR(345),
    IN p_DeliveryAddress VARCHAR(45),
    IN p_Phone VARCHAR(45),
    IN p_Email VARCHAR(45)
)
BEGIN
    UPDATE Clients SET LegalName = p_LegalName, TradeName = p_TradeName, DeliveryAddress = p_DeliveryAddress, Phone = p_Phone, Email = p_Email WHERE ClientID = p_ClientID;
END$$

-- Agregar categorías
CREATE PROCEDURE AddCategory (
    IN p_UserID INT,
    IN p_StatusID INT,
    IN p_CategoryName VARCHAR(45)
)
BEGIN
    INSERT INTO ProductCategories (UserID, StatusID, CategoryName)
    VALUES (p_UserID, p_StatusID, p_CategoryName);
END$$

-- Editar categorías
CREATE PROCEDURE UpdateCategory (
    IN p_CategoryID INT,
    IN p_UserID INT,
    IN p_StatusID INT,
    IN p_CategoryName VARCHAR(45)
)
BEGIN
    UPDATE ProductCategories SET UserID = p_UserID, StatusID = p_StatusID, CategoryName = p_CategoryName WHERE CategoryID = p_CategoryID;
END$$

-- Agregar productos
CREATE PROCEDURE AddProduct (
    IN p_CategoryID INT,
    IN p_UserID INT,
    IN p_ProductName VARCHAR(45),
    IN p_Brand VARCHAR(45),
    IN p_Code VARCHAR(45),
    IN p_Stock FLOAT,
    IN p_StatusID INT,
    IN p_Price FLOAT
)
BEGIN
    INSERT INTO Products (CategoryID, UserID, ProductName, Brand, Code, Stock, StatusID, Price)
    VALUES (p_CategoryID, p_UserID, p_ProductName, p_Brand, p_Code, p_Stock, p_StatusID, p_Price);
END$$

-- Editar productos
CREATE PROCEDURE UpdateProduct (
    IN p_ProductID INT,
    IN p_CategoryID INT,
    IN p_UserID INT,
    IN p_ProductName VARCHAR(45),
    IN p_Brand VARCHAR(45),
    IN p_Code VARCHAR(45),
    IN p_Stock FLOAT,
    IN p_StatusID INT,
    IN p_Price FLOAT
)
BEGIN
    UPDATE Products SET CategoryID = p_CategoryID, UserID = p_UserID, ProductName = p_ProductName, Brand = p_Brand, Code = p_Code, Stock = p_Stock, StatusID = p_StatusID, Price = p_Price WHERE ProductID = p_ProductID;
END$$

-- Inactivar productos
CREATE PROCEDURE DeactivateProduct (
    IN p_ProductID INT,
    IN p_StatusID INT
)
BEGIN
    UPDATE Products SET StatusID = p_StatusID WHERE ProductID = p_ProductID;
END$$

DELIMITER ;
DELIMITER $$

-- Productos activos con stock
CREATE VIEW ActiveProductsInStock AS
SELECT * FROM Products WHERE StatusID = 1 AND Stock > 0;

-- Ventas totales en agosto de 2024
CREATE VIEW SalesInAugust2024 AS
SELECT SUM(OrderTotal) AS TotalSales FROM Orders
WHERE MONTH(CreatedAt) = 8 AND YEAR(CreatedAt) = 2024;

-- Top 10 clientes con mayor consumo
CREATE VIEW TopConsumingClients AS
SELECT c.TradeName, SUM(o.OrderTotal) AS TotalConsumption
FROM Clients c
JOIN Orders o ON c.ClientID = o.UserID
GROUP BY c.ClientID
ORDER BY TotalConsumption DESC
LIMIT 10;

-- Top 10 productos más vendidos
CREATE VIEW TopSellingProducts AS
SELECT p.ProductName, SUM(od.Quantity) AS TotalSold
FROM Products p
JOIN OrderDetails od ON p.ProductID = od.ProductID
GROUP BY p.ProductID
ORDER BY TotalSold DESC
LIMIT 10;

DELIMITER ;

-- Tabla rol
INSERT INTO Roles (RoleName) VALUES 
('Administrador'), 
('Cliente'), 
('Vendedor');

-- Tabla estados
INSERT INTO Status (StatusName) VALUES 
('Activo'), 
('Inactivo');

-- Tabla usuarios
INSERT INTO Users (RoleID, StatusID, Email, FullName, Password, Phone, BirthDate) VALUES 
(1, 1, 'admin@gmail.com', 'Administrador', 'admin123', '51456875', '1999-06-11'),
(2, 1, 'raul@gmail.com', 'Raul Dominguez', 'rauldom123', '45771083', '2001-11-09');

-- Tabla Clientes
INSERT INTO Clients (LegalName, TradeName, DeliveryAddress, Phone, Email) VALUES 
('Libreria Nidia 2 SA', 'Libreria Nidia 2 SA', '1ra Calle 15-43 Zona 6', '22881532', 'libnidia2@gmail.com');

-- Tabla CategoriaProductos
INSERT INTO ProductCategories (UserID, StatusID, CategoryName) VALUES 
(1, 1, 'Electrónica'),
(1, 1, 'Ropa');

-- Tabla Productos
INSERT INTO Products (CategoryID, UserID, ProductName, Brand, Code, Stock, StatusID, Price) VALUES 
(1, 1, 'Impresora 3D', 'Hellbot Magna SE', 'HMSE123', 15, 1, 15000.00),
(2, 1, 'Sudadero', 'MclarenF1', 'MF001', 50, 1, 500.00);

-- Tabla Orden
INSERT INTO Orders (UserID, StatusID, FullName, Address, Phone, Email, DeliveryDate, OrderTotal) VALUES 
(2, 1, 'David Dieguez', 'Lo de Dieguez, Fraijanes', '55358740', 'daviddieguez@gmail.com', '2024-12-31', 15500.00);

-- Tabla OrdenDetalles
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price, Subtotal) VALUES 
(1, 1, 2, 15000.00, 30000.00),
(1, 2, 1, 500.00, 500.00);

-- Procedimientos almacenados de ejemplo

-- Insertar en CategoriaProductos
DELIMITER $$
CREATE PROCEDURE InsertarCategoriaProductos (
    IN p_UserID INT,
    IN p_StatusID INT,
    IN p_CategoryName VARCHAR(45)
)
BEGIN
    INSERT INTO ProductCategories (UserID, StatusID, CategoryName)
    VALUES (p_UserID, p_StatusID, p_CategoryName);
END$$
DELIMITER ;

-- Actualizar Productos
DELIMITER $$
CREATE PROCEDURE ActualizarProducto (
    IN p_ProductID INT,
    IN p_ProductName VARCHAR(45),
    IN p_Brand VARCHAR(45),
    IN p_Code VARCHAR(45),
    IN p_Stock FLOAT,
    IN p_StatusID INT,
    IN p_Price FLOAT
)
BEGIN
    UPDATE Products
    SET ProductName = p_ProductName,
        Brand = p_Brand,
        Code = p_Code,
        Stock = p_Stock,
        StatusID = p_StatusID,
        Price = p_Price
    WHERE ProductID = p_ProductID;
END$$
DELIMITER ;

-- Insertar en Orden
DELIMITER $$
CREATE PROCEDURE InsertarOrden (
    IN p_UserID INT,
    IN p_StatusID INT,
    IN p_FullName VARCHAR(45),
    IN p_Address VARCHAR(545),
    IN p_Phone VARCHAR(45),
    IN p_Email VARCHAR(45),
    IN p_DeliveryDate DATE,
    IN p_OrderTotal FLOAT
)
BEGIN
    INSERT INTO Orders (UserID, StatusID, FullName, Address, Phone, Email, DeliveryDate, OrderTotal)
    VALUES (p_UserID, p_StatusID, p_FullName, p_Address, p_Phone, p_Email, p_DeliveryDate, p_OrderTotal);
END$$
DELIMITER ;

-- Vistas útiles de ejemplo

-- Productos con Stock Mayor a 10
CREATE VIEW ProductosStockMayor10 AS
SELECT ProductID, ProductName, Stock, Price
FROM Products
WHERE Stock > 10 AND StatusID = 1;

-- Ventas por Cliente
CREATE VIEW VentasPorCliente AS
SELECT c.TradeName, o.OrderTotal, o.CreatedAt
FROM Clients c
JOIN Orders o ON c.ClientID = o.UserID;

-- Productos Más Vendidos
CREATE VIEW ProductosMasVendidos AS
SELECT p.ProductName, SUM(od.Quantity) AS TotalVendido
FROM Products p
JOIN OrderDetails od ON p.ProductID = od.ProductID
GROUP BY p.ProductID
ORDER BY TotalVendido DESC;

DELIMITER ;