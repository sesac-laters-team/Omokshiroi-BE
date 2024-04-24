desc friends;
select * from friends;
-- user1 <> user2 친구 상태
INSERT INTO friends (friends_id, user_id, friend_id, joined) VALUES (1, 1, 2, TRUE);
INSERT INTO friends (friends_id, user_id, friend_id, joined) VALUES (2, 2, 1, TRUE);
-- user3 > user4 친구 신청, user4가 수락 전
INSERT INTO friends (friends_id, user_id, friend_id, joined) VALUES (3, 3, 4, TRUE);
INSERT INTO friends (friends_id, user_id, friend_id, joined) VALUES (4, 4, 3, FALSE);
