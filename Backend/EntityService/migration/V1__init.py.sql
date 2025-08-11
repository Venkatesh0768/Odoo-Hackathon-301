CREATE TABLE availability
(
    id           VARCHAR(36) NOT NULL,
    created_at   datetime    NOT NULL,
    updated_at   datetime    NOT NULL,
    court_id     VARCHAR(36) NOT NULL,
    date         date        NULL,
    start_time   time        NULL,
    end_time     time        NULL,
    is_available BIT(1)      NULL,
    CONSTRAINT pk_availability PRIMARY KEY (id)
);

CREATE TABLE booking
(
    id             VARCHAR(36)  NOT NULL,
    created_at     datetime     NOT NULL,
    updated_at     datetime     NOT NULL,
    user_id        VARCHAR(36)  NOT NULL,
    court_id       VARCHAR(36)  NOT NULL,
    date           date         NULL,
    start_time     time         NULL,
    end_time       time         NULL,
    duration       INT          NULL,
    status         VARCHAR(255) NULL,
    payment_status VARCHAR(255) NULL,
    CONSTRAINT pk_booking PRIMARY KEY (id)
);

CREATE TABLE court
(
    id              VARCHAR(36)  NOT NULL,
    created_at      datetime     NOT NULL,
    updated_at      datetime     NOT NULL,
    facility_id     VARCHAR(36)  NOT NULL,
    name            VARCHAR(255) NULL,
    sport_type      VARCHAR(255) NULL,
    price_per_hour  DOUBLE       NULL,
    operating_hours JSON         NULL,
    CONSTRAINT pk_court PRIMARY KEY (id)
);

CREATE TABLE facility
(
    id                  VARCHAR(36)  NOT NULL,
    created_at          datetime     NOT NULL,
    updated_at          datetime     NOT NULL,
    owner_id            VARCHAR(36)  NOT NULL,
    name                VARCHAR(255) NULL,
    `description`       VARCHAR(255) NULL,
    address             VARCHAR(255) NULL,
    city                VARCHAR(255) NULL,
    state               VARCHAR(255) NULL,
    zip_code            VARCHAR(255) NULL,
    latitude            DOUBLE       NULL,
    longitude           DOUBLE       NULL,
    verification_status VARCHAR(255) NULL,
    CONSTRAINT pk_facility PRIMARY KEY (id)
);

CREATE TABLE `match`
(
    id              VARCHAR(36)  NOT NULL,
    created_at      datetime     NOT NULL,
    updated_at      datetime     NOT NULL,
    creator_id      VARCHAR(36)  NULL,
    court_id        VARCHAR(36)  NULL,
    date            date         NULL,
    start_time      time         NULL,
    end_time        time         NULL,
    max_players     INT          NULL,
    current_players INT          NULL,
    status          VARCHAR(255) NULL,
    CONSTRAINT pk_match PRIMARY KEY (id)
);

CREATE TABLE review
(
    id          VARCHAR(36)  NOT NULL,
    created_at  datetime     NOT NULL,
    updated_at  datetime     NOT NULL,
    user_id     VARCHAR(36)  NULL,
    facility_id VARCHAR(36)  NULL,
    rating      INT          NULL,
    comment     VARCHAR(255) NULL,
    CONSTRAINT pk_review PRIMARY KEY (id)
);

CREATE TABLE user
(
    id                  VARCHAR(36)  NOT NULL,
    created_at          datetime     NOT NULL,
    updated_at          datetime     NOT NULL,
    full_name           VARCHAR(255) NULL,
    email               VARCHAR(255) NULL,
    password            VARCHAR(255) NULL,
    `role`              SMALLINT     NULL,
    phone_number        VARCHAR(255) NULL,
    profile_picture_url VARCHAR(255) NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

ALTER TABLE availability
    ADD CONSTRAINT FK_AVAILABILITY_ON_COURT FOREIGN KEY (court_id) REFERENCES court (id);

ALTER TABLE booking
    ADD CONSTRAINT FK_BOOKING_ON_COURT FOREIGN KEY (court_id) REFERENCES court (id);

ALTER TABLE booking
    ADD CONSTRAINT FK_BOOKING_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE court
    ADD CONSTRAINT FK_COURT_ON_FACILITY FOREIGN KEY (facility_id) REFERENCES facility (id);

ALTER TABLE facility
    ADD CONSTRAINT FK_FACILITY_ON_OWNER FOREIGN KEY (owner_id) REFERENCES user (id);

ALTER TABLE `match`
    ADD CONSTRAINT FK_MATCH_ON_COURT FOREIGN KEY (court_id) REFERENCES court (id);

ALTER TABLE `match`
    ADD CONSTRAINT FK_MATCH_ON_CREATOR FOREIGN KEY (creator_id) REFERENCES user (id);

ALTER TABLE review
    ADD CONSTRAINT FK_REVIEW_ON_FACILITY FOREIGN KEY (facility_id) REFERENCES facility (id);

ALTER TABLE review
    ADD CONSTRAINT FK_REVIEW_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);