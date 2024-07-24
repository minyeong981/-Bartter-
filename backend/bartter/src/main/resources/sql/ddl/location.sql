DROP TABLE IF EXISTS  location;
CREATE TABLE location
(
    location_id      INT AUTO_INCREMENT PRIMARY KEY,
    location_code    VARCHAR(10)                                                     NOT NULL,
    location_name    VARCHAR(50)                                                     NOT NULL,
    location_polygon GEOMETRY                                                        NOT NULL,
    location_point   POINT                                                           NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             ,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    SPATIAL INDEX (location_polygon),
    SPATIAL INDEX (location_point)
);