
drop table bids;
drop table Vehicle;

create table Vehicle(
    id int not null auto_increment,
    title text not null,
    url text not null,
    description text not null,
    category text not null,
    sale_date text not null,
    end_time text not null,
    primary key (id)
);

create table bids(
    bidder text not null,
    amount int not null,
    comment text,
    bid_id int,
    foreign key (bid_id) REFERENCES Vehicle(id)
);

-----------------------------------
-- INSERTs

INSERT INTO Vehicle(title,url,description,category,sale_date,end_time) VALUES('Dodge Challenger','https://images.unsplash.com/photo-1632686341369-8a7991237930?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', "This blue Dodge Challenger offers an unbeatable combination of striking looks and heart-pounding performance. With its powerful engine and sleek design, it delivers an exhilarating driving experience thats sure to turn heads. Don't miss the chance to own this iconic muscle car and make a statement on the road today!",'coupe','2024-12-30','2025-10-10');
INSERT INTO Vehicle(title,url,description,category,sale_date,end_time) VALUES('Ford Mustang','https://images.unsplash.com/photo-1610378985708-ac6de045f9f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '"Experience the thrill of driving with this iconic Ford Mustang, a true American muscle car. Its bold design and powerful engine make every drive an adventure, while the comfortable interior ensures you enjoy the ride. Take the wheel of this classic Mustang and feel the power and precision with every mile!"','coupe','08-10-2024','2025-02-13');
INSERT INTO Vehicle(title,url,description,category,sale_date,end_time) VALUES('Subaru Outback','https://images.unsplash.com/photo-1609772168547-d216c44c3f85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', "The Subaru Outback is the perfect blend of adventure and comfort, offering all-wheel drive for superior handling in any condition. With its spacious interior, high ground clearance, and fuel efficiency, it's ideal for both city driving and outdoor excursions. Reliable and versatile, the Outback is built to take you wherever the road leads",'suv','11-20-2024','2025-01-25');
INSERT INTO Vehicle(title,url,description,category,sale_date,end_time) VALUES('Toyota Tundra','https://images.unsplash.com/photo-1621993202323-f438eec934ff?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', "The Toyota Tundra is built for both work and adventure, offering impressive towing capacity and rugged durability. With its spacious interior and advanced features, this truck provides comfort for long drives while handling tough tasks with ease. Whether you're hauling gear or cruising the highway, the Tundra is ready for anything",'coupe','07-15-2024','2025-12-30');

INSERT INTO bids VALUES("Carl k", 4500,"I would love this car.",1);
INSERT INTO bids VALUES("Sam Samson", 5500,"I just want to use money.",1);
INSERT INTO bids VALUES("Luke Lukenson", 2500,"dailey driver right here.",2);
INSERT INTO bids VALUES("Peter Porker", 6500,"",2);
INSERT INTO bids VALUES("Adam Apple", 6500,"Work truck.",3);
INSERT INTO bids VALUES("Ben Benji", 7500,"New truck for me.",3);
INSERT INTO bids VALUES("Cedar Cider", 9500,"The Cedar Mobile.",3);
INSERT INTO bids VALUES("Rando Bider", 3000,"Comments Comments Comments.",4);
INSERT INTO bids VALUES("SubBack", 8500,"I just wanted to say hi.",4);
INSERT INTO bids VALUES("AnotherOne", 1500,"And another one. And another one. And another one.",4);

--SELECTS
SELECT * from Vehicle;
SELECT * from bids;
SELECT * FROM bids WHERE bid_id = 2;

