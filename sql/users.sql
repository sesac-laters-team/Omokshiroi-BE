desc users;
select * from users;
INSERT INTO users (user_id, id, password, nickname, shop_point, custom, connecting, status)
 VALUES (1, "user1", "user1pw", "유저1", 1000, '{"profile":1, "stone":1}', true, "x");
INSERT INTO users (user_id, id, password, nickname, shop_point, custom, connecting, status)
 VALUES (2, "user2", "user2pw", "유저2", 2000, '{"profile":1, "stone":1}', false, "wait");
INSERT INTO users (user_id, id, password, nickname, shop_point, custom, connecting, status)
 VALUES (3, "user3", "user3pw", "유저3", 3000, '{"profile":1, "stone":1}', true, "game");
INSERT INTO users (user_id, id, password, nickname, shop_point, custom, connecting, status)
 VALUES (4, "user4", "user4pw", "유저4", 4000, '{"profile":1, "stone":1}', false, "observe");