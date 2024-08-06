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
) ENGINE=InnoDB;

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

CREATE TABLE follow (
                        follow_id INTEGER NOT NULL AUTO_INCREMENT,
                        followee_id INTEGER NOT NULL,
                        follower_id INTEGER NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                        PRIMARY KEY (follow_id)
) ENGINE=InnoDB;

CREATE TABLE location (
                          location_id INTEGER NOT NULL AUTO_INCREMENT,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                          location_code VARCHAR(10) NOT NULL,
                          location_name VARCHAR(50) NOT NULL,
                          location_point GEOMETRY NOT NULL,
                          location_polygon GEOMETRY NOT NULL,
                          PRIMARY KEY (location_id)
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
                       trade_status ENUM('COMPLETED', 'IN_PROGRESS', 'NEW') NOT NULL,
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
                            trade_post_status ENUM('COMPLETED', 'IN_PROGRESS', 'NEW'),
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
                      user_birth_date DATE NOT NULL,
                      user_id INTEGER NOT NULL AUTO_INCREMENT,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                      deleted_at DATETIME(6),
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                      user_phone VARCHAR(11) NOT NULL,
                      user_email VARCHAR(50),
                      user_username VARCHAR(50) NOT NULL,
                      user_provider_id VARCHAR(100),
                      user_nickname VARCHAR(255) NOT NULL,
                      user_password VARCHAR(255) NOT NULL,
                      user_profile_image VARCHAR(255) NOT NULL,
                      user_profile_message VARCHAR(255),
                      user_gender ENUM('F', 'M') NOT NULL,
                      user_provider ENUM('KAKAO', 'LOCAL') NOT NULL,
                      user_role ENUM('ADMIN', 'USER') NOT NULL,
                      PRIMARY KEY (user_id)
) ENGINE=InnoDB;

-- Add foreign keys
ALTER TABLE community_post ADD CONSTRAINT FK_community_post_location FOREIGN KEY (location_id) REFERENCES location(location_id);
ALTER TABLE community_post ADD CONSTRAINT FK_community_post_user FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE community_post_comment ADD CONSTRAINT FK_community_post_comment_post FOREIGN KEY (community_post_id) REFERENCES community_post(community_post_id);
ALTER TABLE community_post_comment ADD CONSTRAINT FK_community_post_comment_user FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE community_post_image ADD CONSTRAINT FK_community_post_image_post FOREIGN KEY (community_post_id) REFERENCES community_post(community_post_id);
ALTER TABLE community_post_like ADD CONSTRAINT FK_community_post_like_post FOREIGN KEY (community_post_id) REFERENCES community_post(community_post_id);
ALTER TABLE community_post_like ADD CONSTRAINT FK_community_post_like_user FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE crop ADD CONSTRAINT FK_crop_category FOREIGN KEY (crop_category_id) REFERENCES crop_category(crop_category_id);
ALTER TABLE crop ADD CONSTRAINT FK_crop_user FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE crop_diary ADD CONSTRAINT FK_crop_diary_crop FOREIGN KEY (crop_id) REFERENCES crop(crop_id);
ALTER TABLE crop_report ADD CONSTRAINT FK_crop_report_crop FOREIGN KEY (crop_id) REFERENCES crop(crop_id);
ALTER TABLE crop_report ADD CONSTRAINT FK_crop_report_user FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE follow ADD CONSTRAINT FK_follow_followee FOREIGN KEY (followee_id) REFERENCES user(user_id);
ALTER TABLE follow ADD CONSTRAINT FK_follow_follower FOREIGN KEY (follower_id) REFERENCES user(user_id);
ALTER TABLE trade ADD CONSTRAINT FK_trade_post FOREIGN KEY (trade_post_id) REFERENCES trade_post(trade_post_id);
ALTER TABLE trade ADD CONSTRAINT FK_trade_user FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE trade_post ADD CONSTRAINT FK_trade_post_category FOREIGN KEY (crop_category_id) REFERENCES crop_category(crop_category_id);
ALTER TABLE trade_post ADD CONSTRAINT FK_trade_post_crop FOREIGN KEY (crop_id) REFERENCES crop(crop_id);
ALTER TABLE trade_post ADD CONSTRAINT FK_trade_post_location FOREIGN KEY (location_id) REFERENCES location(location_id);
ALTER TABLE trade_post ADD CONSTRAINT FK_trade_post_user FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE trade_post_image ADD CONSTRAINT FK_trade_post_image_post FOREIGN KEY (trade_post_id) REFERENCES trade_post(trade_post_id);
ALTER TABLE trade_post_like ADD CONSTRAINT FK_trade_post_like_post FOREIGN KEY (trade_post_id) REFERENCES trade_post(trade_post_id);
ALTER TABLE trade_post_like ADD CONSTRAINT FK_trade_post_like_user FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE trade_wish_crop_category ADD CONSTRAINT FK_trade_wish_crop_category FOREIGN KEY (crop_category_id) REFERENCES crop_category(crop_category_id);
ALTER TABLE trade_wish_crop_category ADD CONSTRAINT FK_trade_wish_trade_post FOREIGN KEY (trade_post_id) REFERENCES trade_post(trade_post_id);
ALTER TABLE user ADD CONSTRAINT FK_user_location FOREIGN KEY (location_id) REFERENCES location(location_id);
