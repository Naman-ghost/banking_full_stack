use college_1;
show tables;
describe past_payments;
describe customers;
describe past_payments;
describe customerinfo;
describe fixed_deposits;
select * from fixed_deposits;
select * from customers;
select * from past_payments;
select * from customerinfo;






select * from customerinfo;
INSERT INTO fixed_deposits (user_id, amount, interest_rate, maturity_date) VALUES (?, ?, ?, ?);

show databases;



CREATE TABLE fixed_deposits (
    fd_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),  
    interest_rate DECIMAL(5,2) NOT NULL CHECK (interest_rate > 0),  
    start_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    maturity_date DATETIME NOT NULL,
    status ENUM('Active', 'Matured', 'Closed') NOT NULL DEFAULT 'Active',
    FOREIGN KEY (user_id) REFERENCES customers(id)
);



CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    bank_balance DECIMAL(10,2) DEFAULT 3000.00
);


CREATE TABLE customerinfo (
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male','Female','Other') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES customers(username)
);


CREATE TABLE past_payments (
    payment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sender_account_id INT,
    receiver_account_id INT,
    payment_amount DECIMAL(15,2),
    payment_date DATETIME,
    payment_status VARCHAR(50),
    payment_method VARCHAR(50),
    description TEXT,

    FOREIGN KEY (sender_account_id) REFERENCES customers(id),
    FOREIGN KEY (receiver_account_id) REFERENCES customers(id)
);

CREATE TABLE fixed_deposits (
    fd_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    maturity_date DATETIME NOT NULL,
    status ENUM('Active','Matured','Closed') NOT NULL DEFAULT 'Active',
    FOREIGN KEY (user_id) REFERENCES customers(id)
);




DELIMITER //

CREATE TRIGGER trg_delete_customerinfo
AFTER DELETE ON customers
FOR EACH ROW
BEGIN
    DELETE FROM customerinfo WHERE username = OLD.username;
END;
//

DELIMITER ;





DELIMITER //

CREATE TRIGGER trg_delete_customer_payments
AFTER DELETE ON customers
FOR EACH ROW
BEGIN
    DELETE FROM past_payments
    WHERE sender_account_id = OLD.id OR receiver_account_id = OLD.id;
END;
//

DELIMITER ;





DELIMITER //

CREATE TRIGGER trg_delete_customer_fd
AFTER DELETE ON customers
FOR EACH ROW
BEGIN
    DELETE FROM fixed_deposits WHERE user_id = OLD.id;
END;
//

DELIMITER ;





