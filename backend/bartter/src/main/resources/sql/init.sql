-- Drop foreign keys
ALTER TABLE community_post DROP FOREIGN KEY FK5voin9s2s70bvc490h58p0e9j;
ALTER TABLE community_post DROP FOREIGN KEY FKm5pbosagfniobhwcv6ot7tdcj;
ALTER TABLE community_post_comment DROP FOREIGN KEY FK8ka11yxw46wy8eoq28khik30x;
ALTER TABLE community_post_comment DROP FOREIGN KEY FKg8wvn8vmt4q4bd503rip4cuhp;
ALTER TABLE community_post_image DROP FOREIGN KEY FKfy6bcnk9stp5x189b0id1qhfd;
ALTER TABLE community_post_like DROP FOREIGN KEY FKhbe2v7or8saetjmpxhunb9goj;
ALTER TABLE community_post_like DROP FOREIGN KEY FK1k3gkv5pyhk8o09624rw2jhxv;
ALTER TABLE crop DROP FOREIGN KEY FK7eeejpksig8npa05cacj232h1;
ALTER TABLE crop DROP FOREIGN KEY FK76xv1sgky2q7kwe7g2elv05mp;
ALTER TABLE crop_diary DROP FOREIGN KEY FK8q9vt1evbntodygvpjjkfk13j;
ALTER TABLE crop_report DROP FOREIGN KEY FKdjihepcn6c37okg8mj8j8nwgp;
ALTER TABLE crop_report DROP FOREIGN KEY FK87n3i3cqrk01ihc74dvpesjsy;
ALTER TABLE follow DROP FOREIGN KEY FKjhmtcmoxpgcojx2p3h7lcphsq;
ALTER TABLE follow DROP FOREIGN KEY FKmow2qk674plvwyb4wqln37svv;
ALTER TABLE trade DROP FOREIGN KEY FKqrtut344cnig4qihs1te250dq;
ALTER TABLE trade DROP FOREIGN KEY FK1dqm16mo3cntjlxap3iusqvyt;
ALTER TABLE trade_post DROP FOREIGN KEY FK3fvfraumm3neqg2mb3xf6a52a;
ALTER TABLE trade_post DROP FOREIGN KEY FKk3qn5sfu51as2nevdt9mus92o;
ALTER TABLE trade_post DROP FOREIGN KEY FKfydlcx318xvm70cqnhn2s0295;
ALTER TABLE trade_post DROP FOREIGN KEY FKbbsoj791jofqymfm8h0gjfv25;
ALTER TABLE trade_post_image DROP FOREIGN KEY FKd2qajdbftrfqx5ujhjrprn1o7;
ALTER TABLE trade_post_like DROP FOREIGN KEY FK8wli9erfck1h74tno70qvhgly;
ALTER TABLE trade_post_like DROP FOREIGN KEY FKc54giobbn94jbk28og65f600f;
ALTER TABLE trade_wish_crop_category DROP FOREIGN KEY FKowo5w2q918jsb6663qcolq82k;
ALTER TABLE trade_wish_crop_category DROP FOREIGN KEY FKt5981unccllugrsq7vy4r31gj;
ALTER TABLE user DROP FOREIGN KEY FKneyhvoj17hax43m8dq3u7gbic;

-- Drop tables
DROP TABLE IF EXISTS community_post;
DROP TABLE IF EXISTS crop_report;
DROP TABLE IF EXISTS crop_diary;
DROP TABLE IF EXISTS trade_post_image;
DROP TABLE IF EXISTS trade_post_like;
DROP TABLE IF EXISTS trade_wish_crop_category;
DROP TABLE IF EXISTS trade;
DROP TABLE IF EXISTS trade_post;
DROP TABLE IF EXISTS crop;
DROP TABLE IF EXISTS crop_category;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS user;

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
ALTER TABLE community_post ADD CONSTRAINT FK5voin9s2s70bvc490h58p0e9j FOREIGN KEY (location_id) REFERENCES location(location_id);
ALTER TABLE community_post ADD CONSTRAINT FKm5pbosagfniobhwcv6ot7tdcj FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE community_post_comment ADD CONSTRAINT FK8ka11yxw46wy8eoq28khik30x FOREIGN KEY (community_post_id) REFERENCES community_post(community_post_id);
ALTER TABLE community_post_comment ADD CONSTRAINT FKg8wvn8vmt4q4bd503rip4cuhp FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE community_post_image ADD CONSTRAINT FKfy6bcnk9stp5x189b0id1qhfd FOREIGN KEY (community_post_id) REFERENCES community_post(community_post_id);
ALTER TABLE community_post_like ADD CONSTRAINT FKhbe2v7or8saetjmpxhunb9goj FOREIGN KEY (community_post_id) REFERENCES community_post(community_post_id);
ALTER TABLE community_post_like ADD CONSTRAINT FK1k3gkv5pyhk8o09624rw2jhxv FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE crop ADD CONSTRAINT FK7eeejpksig8npa05cacj232h1 FOREIGN KEY (crop_category_id) REFERENCES crop_category(crop_category_id);
ALTER TABLE crop ADD CONSTRAINT FK76xv1sgky2q7kwe7g2elv05mp FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE crop_diary ADD CONSTRAINT FK8q9vt1evbntodygvpjjkfk13j FOREIGN KEY (crop_id) REFERENCES crop(crop_id);
ALTER TABLE crop_report ADD CONSTRAINT FKdjihepcn6c37okg8mj8j8nwgp FOREIGN KEY (crop_id) REFERENCES crop(crop_id);
ALTER TABLE crop_report ADD CONSTRAINT FK87n3i3cqrk01ihc74dvpesjsy FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE follow ADD CONSTRAINT FKjhmtcmoxpgcojx2p3h7lcphsq FOREIGN KEY (followee_id) REFERENCES user(user_id);
ALTER TABLE follow ADD CONSTRAINT FKmow2qk674plvwyb4wqln37svv FOREIGN KEY (follower_id) REFERENCES user(user_id);
ALTER TABLE trade ADD CONSTRAINT FKqrtut344cnig4qihs1te250dq FOREIGN KEY (trade_post_id) REFERENCES trade_post(trade_post_id);
ALTER TABLE trade ADD CONSTRAINT FK1dqm16mo3cntjlxap3iusqvyt FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE trade_post ADD CONSTRAINT FK3fvfraumm3neqg2mb3xf6a52a FOREIGN KEY (crop_category_id) REFERENCES crop_category(crop_category_id);
ALTER TABLE trade_post ADD CONSTRAINT FKk3qn5sfu51as2nevdt9mus92o FOREIGN KEY (crop_id) REFERENCES crop(crop_id);
ALTER TABLE trade_post ADD CONSTRAINT FKfydlcx318xvm70cqnhn2s0295 FOREIGN KEY (location_id) REFERENCES location(location_id);
ALTER TABLE trade_post ADD CONSTRAINT FKbbsoj791jofqymfm8h0gjfv25 FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE trade_post_image ADD CONSTRAINT FKd2qajdbftrfqx5ujhjrprn1o7 FOREIGN KEY (trade_post_id) REFERENCES trade_post(trade_post_id);
ALTER TABLE trade_post_like ADD CONSTRAINT FK8wli9erfck1h74tno70qvhgly FOREIGN KEY (trade_post_id) REFERENCES trade_post(trade_post_id);
ALTER TABLE trade_post_like ADD CONSTRAINT FKc54giobbn94jbk28og65f600f FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE trade_wish_crop_category ADD CONSTRAINT FKowo5w2q918jsb6663qcolq82k FOREIGN KEY (crop_category_id) REFERENCES crop_category(crop_category_id);
ALTER TABLE trade_wish_crop_category ADD CONSTRAINT FKt5981unccllugrsq7vy4r31gj FOREIGN KEY (trade_post_id) REFERENCES trade_post(trade_post_id);
ALTER TABLE user ADD CONSTRAINT FKneyhvoj17hax43m8dq3u7gbic FOREIGN KEY (location_id) REFERENCES location(location_id);
