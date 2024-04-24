-- Active: 1707101283311@@127.0.0.1@3306@omokshiroi
-- rooms
desc rooms;
select * from rooms;
INSERT INTO rooms 
(title, creator_user, guest, player_count, timer_second) 
VALUES ('Room1', 'User1', null, 1, 30);
INSERT INTO rooms 
(title, creator_user, guest, player_count, timer_second)
VALUES ('Room2', 'User2', null, 1, 60);
INSERT INTO rooms
(title, creator_user, guest, player_count, timer_second)
VALUES ('Room3', 'User3', null, 2, 90);
delete from rooms where room_id = 3;