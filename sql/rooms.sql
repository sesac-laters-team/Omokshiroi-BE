-- Active: 1707101283311@@127.0.0.1@3306@omokshiroi
-- rooms
desc rooms;
select * from rooms;
INSERT INTO rooms (title, creator_user, player_count) VALUES ('Room 1', 'User 1', 1);
INSERT INTO rooms (title, creator_user, player_count) VALUES ('Room 2', 'User 2', 2);
INSERT INTO rooms (title, creator_user, player_count) VALUES ('Room 3', 'User 3', 1);
delete from rooms where room_id = 1;