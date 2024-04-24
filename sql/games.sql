-- Active: 1707101283311@@127.0.0.1@3306@omokshiroi
-- games
desc games;
select * from games;
INSERT INTO games
(room_id, current_player, game_status, white_player, black_player)
VALUES (1, 'UserA', 'wait', NULL, NULL);
INSERT INTO games
(room_id, current_player, game_status, white_player, black_player)
VALUES (2, 'UserB', 'wait', NULL, NULL);
INSERT INTO games
(room_id, current_player, game_status, white_player, black_player)
VALUES (3, 'UserC', 'ingame', NULL, NULL);