create database pruebaTecnica;
use pruebaTecnica;

-- Tablas --
create table ocupaciones(
idOcupacion int primary key auto_increment,
ocupacion varchar(20) not null,
estadoOcupacion boolean not null
);

create table ciudades(
idCiudad int primary key auto_increment,
nombreCiudad varchar(50) not null,
estadoCiudad boolean not null
);

create table usuario(
numeroDocumentoUsuario bigint(12) primary key,
nombresUsuario varchar(40) not null,
apellidosUsuario varchar(60) not null,
idCiudadFKUsuario int not null,
fechaNacimientoUsuario date not null,
emailUsuario varchar(60) not null,
edadUsuario int(3) not null,
telefonoUsuario bigint(12) not null,
estadoUsuario boolean not null,
viabilidad boolean not null, 
idOcupacionFKUsuario int not null
);

-- Relaciones --
alter table usuario add constraint ciudadUsuario
foreign key(idCiudadFKUsuario) references ciudades(idCiudad);

alter table usuario add constraint ocupacionUsuario
foreign key(idOcupacionFKUsuario) references ocupaciones(idOcupacion);

-- inserciones -- 
insert into ocupaciones (ocupacion, estadoOcupacion) values ('Empleado',1),('Independiente',1),('Pensionado',1);


INSERT INTO ciudades (nombreCiudad, estadoCiudad) VALUES
('Bogotá', 1),
('Medellín', 1),
('Cali', 1),
('Barranquilla', 1),
('Cartagena', 1),
('Cúcuta', 1),
('Bucaramanga', 1),
('Pereira', 1),
('Santa Marta', 1),
('Ibagué', 1),
('Manizales', 1),
('Neiva', 1),
('Pasto', 1),
('Villavicencio', 1),
('Montería', 1),
('Valledupar', 1),
('Armenia', 1),
('Sincelejo', 1),
('Popayán', 1),
('Tunja', 1);

