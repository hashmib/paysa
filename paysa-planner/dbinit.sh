#!/bin/bash
# User credentials
MYSQL_USER="root"
MYSQL_PASS="Nokrigang2020!"

# Connect to root's database instance
mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" paysadb<<EOFMYSQL
use paysadb;
EOFMYSQL