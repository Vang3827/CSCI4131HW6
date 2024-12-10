-- create table Person (
--     id int auto_increment,
--     name text not null,
--     age int,
--     budget int,
--     interests text not null,

--     primary key (id)
-- );

drop table autolist;
drop table bids;
drop table Vehicle;

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
    bidder text not null,
    amount int not null,
    comment text,
    bid_id int,
    foreign key (bid_id) REFERENCES Vehicle(id)
);

-------------------
tests
INSERT INTO Vehicle(url,description,category,date) VALUES("http://asdfasdfasdf.com", 'description goes here','Truck','09/10/2024');

SELECT * from Vehicle;

INSERT INTO bids VALUES("FirstBidder", 6351351,"I'm the first one",1);
INSERT INTO bids VALUES("SecondBidder", 7778484,"Second!!!!!!!!!!!",1);