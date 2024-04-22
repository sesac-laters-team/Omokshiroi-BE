-- Active: 1707101283311@@127.0.0.1@3306@omokuzo
show databases;
create database omokshiroi character set utf8mb4 collate utf8mb4_unicode_ci;
use omokshiroi;
show tables;
select * from test_table_users;
insert into test_table_users (users_email,users_password) values ('test1@test.com','test');