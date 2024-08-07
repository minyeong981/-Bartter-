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

alter table community_post
    add constraint FK5voin9s2s70bvc490h58p0e9j
        foreign key (location_id)
            references location (location_id);

alter table community_post
    add constraint FKm5pbosagfniobhwcv6ot7tdcj
        foreign key (user_id)
            references user (user_id);

alter table community_post_comment
    add constraint FK8ka11yxw46wy8eoq28khik30x
        foreign key (community_post_id)
            references community_post (community_post_id);

alter table community_post_comment
    add constraint FKg8wvn8vmt4q4bd503rip4cuhp
        foreign key (user_id)
            references user (user_id);

alter table community_post_image
    add constraint FKfy6bcnk9stp5x189b0id1qhfd
        foreign key (community_post_id)
            references community_post (community_post_id);

alter table community_post_like
    add constraint FKhbe2v7or8saetjmpxhunb9goj
        foreign key (community_post_id)
            references community_post (community_post_id);

alter table community_post_like
    add constraint FK1k3gkv5pyhk8o09624rw2jhxv
        foreign key (user_id)
            references user (user_id)

alter table crop
    add constraint FK7eeejpksig8npa05cacj232h1
        foreign key (crop_category_id)
            references crop_category (crop_category_id);

alter table crop
    add constraint FK76xv1sgky2q7kwe7g2elv05mp
        foreign key (user_id)
            references user (user_id);

alter table crop_diary
    add constraint FK8q9vt1evbntodygvpjjkfk13j
        foreign key (crop_id)
            references crop (crop_id);

alter table crop_report
    add constraint FKdjihepcn6c37okg8mj8j8nwgp
        foreign key (crop_id)
            references crop (crop_id);

alter table crop_report
    add constraint FK87n3i3cqrk01ihc74dvpesjsy
        foreign key (user_id)
            references user (user_id);

alter table daily_tip
    add constraint FKbmot5iwtts6p2dcmgs905ee45
        foreign key (user_id)
            references user (user_id);

alter table follow
    add constraint FKjhmtcmoxpgcojx2p3h7lcphsq
        foreign key (followee_id)
            references user (user_id);

alter table follow
    add constraint FKmow2qk674plvwyb4wqln37svv
        foreign key (follower_id)
            references user (user_id);

alter table trade
    add constraint FKqrtut344cnig4qihs1te250dq
        foreign key (trade_post_id)
            references trade_post (trade_post_id);

alter table trade
    add constraint FK1dqm16mo3cntjlxap3iusqvyt
        foreign key (user_id)
            references user (user_id);

alter table trade_post
    add constraint FK3fvfraumm3neqg2mb3xf6a52a
        foreign key (crop_category_id)
            references crop_category (crop_category_id);

alter table trade_post
    add constraint FKk3qn5sfu51as2nevdt9mus92o
        foreign key (crop_id)
            references crop (crop_id);

alter table trade_post
    add constraint FKfydlcx318xvm70cqnhn2s0295
        foreign key (location_id)
            references location (location_id);

alter table trade_post
    add constraint FKbbsoj791jofqymfm8h0gjfv25
        foreign key (user_id)
            references user (user_id);

alter table trade_post_image
    add constraint FKd2qajdbftrfqx5ujhjrprn1o7
        foreign key (trade_post_id)
            references trade_post (trade_post_id);

alter table trade_post_like
    add constraint FK8wli9erfck1h74tno70qvhgly
        foreign key (trade_post_id)
            references trade_post (trade_post_id);

alter table trade_post_like
    add constraint FKc54giobbn94jbk28og65f600f
        foreign key (user_id)
            references user (user_id);

alter table trade_wish_crop_category
    add constraint FKowo5w2q918jsb6663qcolq82k
        foreign key (crop_category_id)
            references crop_category (crop_category_id);

alter table trade_wish_crop_category
    add constraint FKt5981unccllugrsq7vy4r31gj
        foreign key (trade_post_id)
            references trade_post (trade_post_id);

alter table user
    add constraint FKneyhvoj17hax43m8dq3u7gbic
        foreign key (location_id)
            references location (location_id);