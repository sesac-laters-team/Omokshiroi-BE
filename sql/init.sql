-- Active: 1707101283311@@127.0.0.1@3306@omokuzo
show databases;
create database omokshiroi character set utf8mb4 collate utf8mb4_unicode_ci;
use omokshiroi;
show tables;
select * from test_table_users;
insert into test_table_users (users_email,users_password) values ('test1@test.com','test');

-- rooms
desc rooms;
select * from rooms;
INSERT INTO rooms (title, creator_user, player_count) VALUES ('Room 1', 'User 1', 1);
INSERT INTO rooms (title, creator_user, player_count) VALUES ('Room 2', 'User 2', 2);
INSERT INTO rooms (title, creator_user, player_count) VALUES ('Room 3', 'User 3', 1);
delete from rooms where room_id = 1;

-- games
desc games;
select * from games;
INSERT INTO games (room_id, current_player, game_status, white_player, black_player, timer_second) VALUES (1, 'User A', 'wait', NULL, NULL, 60);
INSERT INTO games (room_id, current_player, game_status, white_player, black_player, timer_second) VALUES (2, 'User B', 'wait', NULL, NULL, 60);
INSERT INTO games (room_id, current_player, game_status, white_player, black_player, timer_second) VALUES (3, 'User C', 'wait', NULL, NULL, 60);


-- boards
desc boards;
select * from boards;
INSERT INTO boards (move_count, position, game_id) VALUES (1, '[[0,0],[0,1],[0,2],[0,3],[0,4]]', 1);
INSERT INTO boards (move_count, position, game_id) VALUES (2, '[[1,0],[1,1],[1,2],[1,3],[1,4]]', 2);
INSERT INTO boards (move_count, position, game_id) VALUES (3, '[[2,0],[2,1],[2,2],[2,3],[2,4]]', 3);



