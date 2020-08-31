#!/bin/bash
# User credentials
MYSQL_USER="root"
MYSQL_PASS="Nokrigang2020!"

# Connect to root's database instance
mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" paysadb<<EOFMYSQL
use paysadb;

CREATE TABLE Transactions(
    id INT AUTO_INCREMENT,
    amount INT,
    description VARCHAR(100),
    expense BOOLEAN,
    userid INT,
    time DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id)
);
show tables;
EOFMYSQL