#!/bin/bash
# User credentials
MYSQL_USER="root"
MYSQL_PASS="Nokrigang2020!"

# Delete database
if [[ $1 == '-d' ]];
then
mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" paysadb<<EOFMYSQL
DROP DATABASE paysadb;
EOFMYSQL
echo "paysa db deleted"

# Initiate database
elif [[ $1 == '-st' ]];
then
mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" <<EOFMYSQL
use paysadb;
show tables;
EOFMYSQL

# Initiate database
elif [[ $1 == '-i' ]];
then
mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" <<EOFMYSQL
CREATE DATABASE paysadb;
use paysadb;

CREATE TABLE Users(
    id INT AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE Transactions(
    id INT AUTO_INCREMENT, 
    amount INT,
    description VARCHAR(100),
    userid INT,
    type VARCHAR(10),
    date DATETIME,
    PRIMARY KEY (id)
);

CREATE TABLE Recurrences(
    recurrence_id INT AUTO_INCREMENT,
    userid INT,
    type VARCHAR(10),
    amount INT NOT NULL,
    description VARCHAR(100),
    start_date DATETIME,
    end_date DATETIME,
    last_date DATETIME,
    frequency VARCHAR(10),
    PRIMARY KEY (recurrence_id)
);


show tables;
EOFMYSQL

# Usage
else
echo "Usage: -d for delete | -i for initiate"
fi