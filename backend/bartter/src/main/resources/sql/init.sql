use bartter;

DROP TABLE IF EXISTS community_post_comment;
DROP TABLE IF EXISTS community_post_image;
DROP TABLE IF EXISTS community_post_like;
DROP TABLE IF EXISTS community_post;
DROP TABLE IF EXISTS crop_diary;
DROP TABLE IF EXISTS crop_report;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS refresh;
DROP TABLE IF EXISTS trade;
DROP TABLE IF EXISTS trade_post_image;
DROP TABLE IF EXISTS trade_post_like;
DROP TABLE IF EXISTS trade_wish_crop_category;
DROP TABLE IF EXISTS trade_post;
DROP TABLE IF EXISTS daily_tip;
DROP TABLE IF EXISTS crop;
DROP TABLE IF EXISTS crop_category;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS location;

-- Create tables
CREATE TABLE community_post (
                                community_post_id INTEGER NOT NULL AUTO_INCREMENT,
                                location_id INTEGER NOT NULL,
                                user_id INTEGER NOT NULL,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                                community_post_title VARCHAR(50) NOT NULL,
                                community_post_content VARCHAR(2000) NOT NULL,
                                PRIMARY KEY (community_post_id)
);

CREATE TABLE community_post_comment (
                                        community_post_comment_id INTEGER NOT NULL AUTO_INCREMENT,
                                        community_post_id INTEGER NOT NULL,
                                        user_id INTEGER NOT NULL,
                                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                                        community_post_comment_content VARCHAR(500) NOT NULL,
                                        PRIMARY KEY (community_post_comment_id)
) ENGINE=InnoDB;

CREATE TABLE community_post_image (
                                      community_post_id INTEGER NOT NULL,
                                      community_post_image_id INTEGER NOT NULL AUTO_INCREMENT,
                                      community_post_image_order INTEGER NOT NULL,
                                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                                      community_post_image_url VARCHAR(300) NOT NULL,
                                      PRIMARY KEY (community_post_image_id)
) ENGINE=InnoDB;

CREATE TABLE community_post_like (
                                     community_post_id INTEGER NOT NULL,
                                     community_post_like_id INTEGER NOT NULL AUTO_INCREMENT,
                                     user_id INTEGER NOT NULL,
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                                     PRIMARY KEY (community_post_like_id)
) ENGINE=InnoDB;

CREATE TABLE crop (
                      crop_category_id INTEGER NOT NULL,
                      crop_grow_date DATE NOT NULL,
                      crop_id INTEGER NOT NULL AUTO_INCREMENT,
                      user_id INTEGER NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                      crop_nickname VARCHAR(30) NOT NULL,
                      crop_description VARCHAR(100),
                      crop_image VARCHAR(300),
                      PRIMARY KEY (crop_id)
) ENGINE=InnoDB;

CREATE TABLE crop_category (
                               crop_category_id INTEGER NOT NULL AUTO_INCREMENT,
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                               updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                               crop_category_name VARCHAR(20) NOT NULL,
                               crop_category_image VARCHAR(300) NOT NULL,
                               PRIMARY KEY (crop_category_id)
) ENGINE=InnoDB;

CREATE TABLE crop_diary (
                            crop_diary_id INTEGER NOT NULL AUTO_INCREMENT,
                            crop_id INTEGER NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                            crop_diary_perform_date DATE NOT NULL,
                            crop_diary_title VARCHAR(50) NOT NULL,
                            crop_diary_image VARCHAR(300) NOT NULL,
                            crop_diary_content VARCHAR(2000) NOT NULL,
                            PRIMARY KEY (crop_diary_id)
) ENGINE=InnoDB;

CREATE TABLE crop_report (
                             crop_id INTEGER NOT NULL,
                             crop_report_id INTEGER NOT NULL AUTO_INCREMENT,
                             user_id INTEGER NOT NULL,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                             crop_report_title VARCHAR(50) NOT NULL,
                             crop_report_content VARCHAR(2000) NOT NULL,
                             PRIMARY KEY (crop_report_id)
) ENGINE=InnoDB;

CREATE TABLE daily_tip (
                           daily_tip_id INTEGER NOT NULL AUTO_INCREMENT,
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                           daily_tip_content VARCHAR(300) NOT NULL,
                           daily_tip_is_enabled BIT(1) NOT NULL,
                           daily_tip_weekday INTEGER NOT NULL,
                           user_id INTEGER NOT NULL,
                           PRIMARY KEY (daily_tip_id)
) ENGINE=InnoDB;

CREATE TABLE follow (
                        follow_id INTEGER NOT NULL AUTO_INCREMENT,
                        followee_id INTEGER NOT NULL,
                        follower_id INTEGER NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                        PRIMARY KEY (follow_id)
) ENGINE=InnoDB;

CREATE TABLE location (
                          location_id      INT AUTO_INCREMENT PRIMARY KEY,
                          location_code    VARCHAR(10)                                                     NOT NULL,
                          location_name    VARCHAR(50)                                                     NOT NULL,
                          location_polygon GEOMETRY                                                        NOT NULL SRID 4326,
                          location_point   POINT                                                           NOT NULL SRID 4326,
                          created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             ,
                          updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
                          SPATIAL INDEX (location_polygon),
                          SPATIAL INDEX (location_point)
) ENGINE=InnoDB;

CREATE TABLE refresh (
                         id BIGINT NOT NULL AUTO_INCREMENT,
                         expiration VARCHAR(255) NOT NULL,
                         refresh VARCHAR(255) NOT NULL,
                         username VARCHAR(255) NOT NULL,
                         PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE trade (
                       trade_id INTEGER NOT NULL AUTO_INCREMENT,
                       trade_post_id INTEGER NOT NULL,
                       user_id INTEGER NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                       trade_status ENUM('PROGRESS', 'RESERVED', 'COMPLETED') NOT NULL,
                       PRIMARY KEY (trade_id)
) ENGINE=InnoDB;

CREATE TABLE trade_post (
                            crop_category_id INTEGER NOT NULL,
                            crop_id INTEGER,
                            location_id INTEGER NOT NULL,
                            trade_is_share BIT,
                            trade_post_id INTEGER NOT NULL AUTO_INCREMENT,
                            user_id INTEGER NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                            trade_post_content VARCHAR(255),
                            trade_post_title VARCHAR(255),
                            trade_post_status ENUM('PROGRESS', 'RESERVED', 'COMPLETED'),
                            PRIMARY KEY (trade_post_id)
) ENGINE=InnoDB;

CREATE TABLE trade_post_image (
                                  trade_post_id INTEGER NOT NULL,
                                  trade_post_image_id INTEGER NOT NULL AUTO_INCREMENT,
                                  trade_post_image_order INTEGER NOT NULL,
                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                                  trade_post_image_url VARCHAR(300) NOT NULL,
                                  PRIMARY KEY (trade_post_image_id)
) ENGINE=InnoDB;

CREATE TABLE trade_post_like (
                                 trade_post_id INTEGER NOT NULL,
                                 trade_post_like_id INTEGER NOT NULL AUTO_INCREMENT,
                                 user_id INTEGER NOT NULL,
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                                 PRIMARY KEY (trade_post_like_id)
) ENGINE=InnoDB;

CREATE TABLE trade_wish_crop_category (
                                          crop_category_id INTEGER NOT NULL,
                                          trade_post_id INTEGER NOT NULL,
                                          trade_wish_crop_category_id INTEGER NOT NULL AUTO_INCREMENT,
                                          PRIMARY KEY (trade_wish_crop_category_id)
) ENGINE=InnoDB;

CREATE TABLE user (
                      delete_status BIT NOT NULL,
                      location_id INTEGER NOT NULL,
                      user_birth_date DATE,
                      user_id INTEGER NOT NULL AUTO_INCREMENT,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                      deleted_at DATETIME(6),
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                      user_phone VARCHAR(11),
                      user_email VARCHAR(50),
                      user_username VARCHAR(50) NOT NULL,
                      user_provider_id VARCHAR(100),
                      user_nickname VARCHAR(255) NOT NULL,
                      user_password VARCHAR(255),
                      user_profile_image VARCHAR(255) NOT NULL,
                      user_profile_message VARCHAR(255),
                      user_gender ENUM('F', 'M'),
                      user_provider ENUM('KAKAO', 'LOCAL') NOT NULL,
                      user_role ENUM('ADMIN', 'USER') NOT NULL,
                      PRIMARY KEY (user_id)
) ENGINE=InnoDB;

