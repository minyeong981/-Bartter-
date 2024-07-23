-- 외래 키 제약조건이 없는 테이블 제거
DROP TABLE IF EXISTS community_post_comment;
DROP TABLE IF EXISTS community_post_image;
DROP TABLE IF EXISTS community_post_like;
DROP TABLE IF EXISTS trade_post_image;
DROP TABLE IF EXISTS trade_post_like;
DROP TABLE IF EXISTS trade_wish_crop_category;
DROP TABLE IF EXISTS crop_diary;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS trade;

-- 외래 키 제약조건이 있는 테이블 제거
DROP TABLE IF EXISTS community_post;
DROP TABLE IF EXISTS trade_post;
DROP TABLE IF EXISTS crop;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS location;

-- 외래 키 참조 테이블 제거
DROP TABLE IF EXISTS crop_category;
