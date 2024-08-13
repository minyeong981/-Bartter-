create table community_post (
                                community_post_id integer not null auto_increment,
                                location_id integer not null,
                                user_id integer not null,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                                community_post_title varchar(50) not null,
                                community_post_content varchar(2000) not null,
                                primary key (community_post_id)
) engine=InnoDB;

create table community_post_comment (
                                        community_post_comment_id integer not null auto_increment,
                                        community_post_id integer not null,
                                        user_id integer not null,
                                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                                        community_post_comment_content varchar(500) not null,
                                        primary key (community_post_comment_id)
) engine=InnoDB;

create table community_post_image (
                                      community_post_id integer not null,
                                      community_post_image_id integer not null auto_increment,
                                      community_post_image_order integer not null,
                                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                                      community_post_image_url varchar(300) not null,
                                      primary key (community_post_image_id)
) engine=InnoDB;

create table community_post_like (
                                     community_post_id integer not null,
                                     community_post_like_id integer not null auto_increment,
                                     user_id integer not null,
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                                     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                                     primary key (community_post_like_id)
) engine=InnoDB;

create table crop (
                      crop_category_id integer not null,
                      crop_grow_date date not null,
                      crop_id integer not null auto_increment,
                      user_id integer not null,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                      crop_nickname varchar(30) not null,
                      crop_description varchar(100),
                      crop_image varchar(300),
                      primary key (crop_id)
) engine=InnoDB;

create table crop_category (
                               crop_category_id integer not null auto_increment,
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                               updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                               crop_category_name varchar(20) not null,
                               crop_category_image varchar(300) not null,
                               primary key (crop_category_id)
) engine=InnoDB;

create table crop_diary (
                            crop_diary_id integer not null auto_increment,
                            crop_diary_perform_date date not null,
                            crop_id integer not null,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                            crop_diary_title varchar(50) not null,
                            crop_diary_image varchar(300) not null,
                            crop_diary_content varchar(2000) not null,
                            primary key (crop_diary_id)
) engine=InnoDB;

create table crop_report (
                             crop_id integer not null,
                             crop_report_id integer not null auto_increment,
                             user_id integer not null,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                             crop_report_title varchar(50) not null,
                             crop_report_content varchar(2000) not null,
                             primary key (crop_report_id)
) engine=InnoDB;

create table daily_tip (
                           daily_tip_id integer not null auto_increment,
                           daily_tip_is_enabled bit not null,
                           daily_tip_weekday integer not null,
                           user_id integer not null,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                           daily_tip_content varchar(300) not null,
                           primary key (daily_tip_id)
) engine=InnoDB;

create table follow (
                        follow_id integer not null auto_increment,
                        followee_id integer not null,
                        follower_id integer not null,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                        primary key (follow_id)
) engine=InnoDB;

create table location (
                          location_id integer not null auto_increment,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                          location_code varchar(10) not null,
                          location_name varchar(50) not null,
                          location_point geometry not null,
                          location_polygon geometry not null,
                          primary key (location_id)
) engine=InnoDB;

create table trade (
                       trade_id integer not null auto_increment,
                       trade_post_id integer not null,
                       user_id integer not null,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                       trade_status enum ('COMPLETED','PROGRESS','RESERVED') not null,
                       primary key (trade_id)
) engine=InnoDB;

create table trade_post (
                            crop_category_id integer not null,
                            crop_id integer,
                            location_id integer not null,
                            trade_is_share bit,
                            trade_post_id integer not null auto_increment,
                            user_id integer not null,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                            trade_post_content varchar(255),
                            trade_post_title varchar(255),
                            trade_post_status enum ('COMPLETED','PROGRESS','RESERVED'),
                            primary key (trade_post_id)
) engine=InnoDB;

create table trade_post_image (
                                  trade_post_id integer not null,
                                  trade_post_image_id integer not null auto_increment,
                                  trade_post_image_order integer not null,
                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                                  trade_post_image_url varchar(300) not null,
                                  primary key (trade_post_image_id)
) engine=InnoDB;

create table trade_post_like (
                                 trade_post_id integer not null,
                                 trade_post_like_id integer not null auto_increment,
                                 user_id integer not null,
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                                 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                                 primary key (trade_post_like_id)
) engine=InnoDB;

create table trade_wish_crop_category (
                                          crop_category_id integer not null,
                                          trade_post_id integer not null,
                                          trade_wish_crop_category_id integer not null auto_increment,
                                          primary key (trade_wish_crop_category_id)
) engine=InnoDB;

create table user (
                      delete_status bit not null,
                      location_id integer not null,
                      user_birth_date date,
                      user_id integer not null auto_increment,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
                      deleted_at datetime(6),
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
                      user_phone varchar(11),
                      user_email varchar(50),
                      user_username varchar(50) not null,
                      user_provider_id varchar(100),
                      user_nickname varchar(255) not null,
                      user_password varchar(255),
                      user_profile_image varchar(255) not null,
                      user_profile_message varchar(255),
                      user_gender enum ('F','M'),
                      user_provider enum ('KAKAO','LOCAL') not null,
                      user_role enum ('ADMIN','USER') not null,
                      primary key (user_id)
) engine=InnoDB;

-- community_post 테이블의 외래 키 제약 조건
alter table community_post
    add constraint FK_community_post_location
        foreign key (location_id)
            references location (location_id);

alter table community_post
    add constraint FK_community_post_user
        foreign key (user_id)
            references user (user_id);

-- community_post_comment 테이블의 외래 키 제약 조건
alter table community_post_comment
    add constraint FK_community_post_comment_post
        foreign key (community_post_id)
            references community_post (community_post_id);

alter table community_post_comment
    add constraint FK_community_post_comment_user
        foreign key (user_id)
            references user (user_id);

-- community_post_image 테이블의 외래 키 제약 조건
alter table community_post_image
    add constraint FK_community_post_image_post
        foreign key (community_post_id)
            references community_post (community_post_id);

-- community_post_like 테이블의 외래 키 제약 조건
alter table community_post_like
    add constraint FK_community_post_like_post
        foreign key (community_post_id)
            references community_post (community_post_id);

alter table community_post_like
    add constraint FK_community_post_like_user
        foreign key (user_id)
            references user (user_id);

-- crop 테이블의 외래 키 제약 조건
alter table crop
    add constraint FK_crop_category
        foreign key (crop_category_id)
            references crop_category (crop_category_id);

alter table crop
    add constraint FK_crop_user
        foreign key (user_id)
            references user (user_id);

-- crop_diary 테이블의 외래 키 제약 조건
alter table crop_diary
    add constraint FK_crop_diary_crop
        foreign key (crop_id)
            references crop (crop_id);

-- crop_report 테이블의 외래 키 제약 조건
alter table crop_report
    add constraint FK_crop_report_crop
        foreign key (crop_id)
            references crop (crop_id);

alter table crop_report
    add constraint FK_crop_report_user
        foreign key (user_id)
            references user (user_id);

-- daily_tip 테이블의 외래 키 제약 조건
alter table daily_tip
    add constraint FK_daily_tip_user
        foreign key (user_id)
            references user (user_id);

-- follow 테이블의 외래 키 제약 조건
alter table follow
    add constraint FK_follow_followee
        foreign key (followee_id)
            references user (user_id);

alter table follow
    add constraint FK_follow_follower
        foreign key (follower_id)
            references user (user_id);

-- trade 테이블의 외래 키 제약 조건
alter table trade
    add constraint FK_trade_post
        foreign key (trade_post_id)
            references trade_post (trade_post_id);

alter table trade
    add constraint FK_trade_user
        foreign key (user_id)
            references user (user_id);

-- trade_post 테이블의 외래 키 제약 조건
alter table trade_post
    add constraint FK_trade_post_crop_category
        foreign key (crop_category_id)
            references crop_category (crop_category_id);

alter table trade_post
    add constraint FK_trade_post_crop
        foreign key (crop_id)
            references crop (crop_id);

alter table trade_post
    add constraint FK_trade_post_location
        foreign key (location_id)
            references location (location_id);

alter table trade_post
    add constraint FK_trade_post_user
        foreign key (user_id)
            references user (user_id);

-- trade_post_image 테이블의 외래 키 제약 조건
alter table trade_post_image
    add constraint FK_trade_post_image_post
        foreign key (trade_post_id)
            references trade_post (trade_post_id);

-- trade_post_like 테이블의 외래 키 제약 조건
alter table trade_post_like
    add constraint FK_trade_post_like_post
        foreign key (trade_post_id)
            references trade_post (trade_post_id);

alter table trade_post_like
    add constraint FK_trade_post_like_user
        foreign key (user_id)
            references user (user_id);

-- trade_wish_crop_category 테이블의 외래 키 제약 조건
alter table trade_wish_crop_category
    add constraint FK_trade_wish_crop_category_crop_category
        foreign key (crop_category_id)
            references crop_category (crop_category_id);

alter table trade_wish_crop_category
    add constraint FK_trade_wish_crop_category_post
        foreign key (trade_post_id)
            references trade_post (trade_post_id);

-- user 테이블의 외래 키 제약 조건
alter table user
    add constraint FK_user_location
        foreign key (location_id)
            references location (location_id);
