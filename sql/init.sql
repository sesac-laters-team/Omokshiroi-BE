-- Active: 1707101713117@@127.0.0.1@3306@sesac
show databases;
create database omokshiroi character set utf8mb4 collate utf8mb4_unicode_ci;
use omokshiroi;
show tables;
select * from test_table_users;
insert into test_table_users (users_email,users_password) values ('test1@test.com','test');