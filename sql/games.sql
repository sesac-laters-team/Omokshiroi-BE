-- Active: 1707101283311@@127.0.0.1@3306@omokshiroi
-- games
desc games;
select * from games;
INSERT INTO games (room_id, current_player, game_status, white_player, black_player, timer_second) VALUES (1, 'User A', 'wait', NULL, NULL, 60);
INSERT INTO games (room_id, current_player, game_status, white_player, black_player, timer_second) VALUES (2, 'User B', 'wait', NULL, NULL, 60);
INSERT INTO games (room_id, current_player, game_status, white_player, black_player, timer_second) VALUES (3, 'User C', 'wait', NULL, NULL, 60);