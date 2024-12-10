-- create table Person (
--     id int auto_increment,
--     name text not null,
--     age int,
--     budget int,
--     interests text not null,

--     primary key (id)
-- );

drop table autolist;
drop table bids_id;
drop table vehicle;

create table autolist(
    id int not null auto_increment,
    name text not null,
    primary key (id)
);

create table bids_id(
    id int not null auto_increment,
    bid int not null,
    primary key (id)
    foreign key (bid) references vehicle(id)
);

create table vehicle(
    id int not null auto_increment,
    vehicle_id int not null,
    category text not null,
    description text not null,
    url text not null,
    date text not null,
    foreign key (vehicle_id) references autolist(id)
);

INSERT INTO autolist (name) VALUES
('Dodge Challenger'),
('Ford Mustang'),
('Toyota Tundra'),
('Subaru Outback');


-------------------------------------------------------------------------
create table Vehicle(
    id int not null auto_increment,
    url text not null,
    description text not null,
    category text not null,
    date text not null,
    primary key (id)
);

create table bids(
    bids_id int not null auto_increment,
    amount int not null,
    comment text,
    bidder_id
    foreign key (biddder_id) REFERENCES Vehicle(id)
);