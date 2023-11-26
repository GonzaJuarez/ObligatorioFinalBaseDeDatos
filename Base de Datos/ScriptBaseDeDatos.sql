-- crea una base de datos con el nombre Obligatorio_Base_de_Datos
create database Obligatorio_Base_de_Datos;

use Obligatorio_Base_de_Datos;

-- Logins (LogId, Password)
create table Logins (
    LogId varchar(50) not null,
    UserPassword varchar(50) not null,
    primary key (LogId)
);

-- Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Dirección, Teléfono, Email LogId)
create table Funcionarios (
    Ci int not null,
    Nombre varchar(50) not null,
    Apellido varchar(50) not null,
    Fch_Nacimiento date not null,
    Direccion varchar(50) not null,
    Telefono varchar(50) not null,
    Email varchar(50) not null,
    LogId varchar(50) not null,
    primary key (Ci),
    foreign key (LogId) references Logins(LogId)
);

-- Agenda (Nro, Ci, Fch_Agenda)
create table Agenda (
    Nro int not null,
    Ci int not null,
    Fch_Agenda date not null,
    primary key (Nro),
    foreign key (Ci) references Funcionarios(Ci)
);

-- Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante)
create table Carnet_Salud (
    Ci int not null,
    Fch_Emision date not null,
    Fch_Vencimiento date not null,
    Comprobante varchar(50) not null,
    primary key (Ci)
);

-- Periodos_Actualizacion (Año, Semestre, Fch_Inicio, Fch_Fin)
create table Periodos_Actualizacion (
    Año int not null,
    Semestre int not null,
    Fch_Inicio date not null,
    Fch_Fin date not null,
    primary key (Año, Semestre)
);

-- Rol (Ci, esAdmin)
create table Roles (
    RolId int primary key auto_increment,
    rol varchar(50) not null,

);

-- UsuarioRol (Ci, RolId)
create table UsuarioRol (
    Ci int not null,
    RolId int not null,
    primary key (Ci, RolId),
    foreign key (Ci) references Funcionarios(Ci),
    foreign key (RolId) references Roles(RolId)
);

-- inserta los datos de prueba 10 para cada tabla
insert into Logins (logid, password) values
('juanperez', '123'),
('perdrogonzalez', '123'),
('mariarodriguez', '123'),
('josegarcia', '123'),
('anafernandez', '123'),
('lucialopez', '123'),
('carlosmartinez', '123'),
('sofiasanchez', '123'),
('jorgegomez', '123'),
('miguelgimenez', '123');

insert into Funcionarios (ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logid) values
(1234567, 'Juan', 'Perez', '1990-01-01', 'Direccion 1', '099123456', 'juanperez@gmail.com', 'juanperez'),
(2345678, 'Pedro', 'Gonzalez', '1990-01-01', 'Direccion 2', '099123456', 'perdrogonzalez@gmail.com', 'perdrogonzalez'),
(3456789, 'Maria', 'Rodriguez', '1990-01-01', 'Direccion 3', '099123456', 'mariarodriguez@gmail.com', 'mariarodriguez'),
(4567890, 'Jose', 'Garcia', '1990-01-01', 'Direccion 4', '099123456', 'josegarcia@gmail.com', 'josegarcia'),
(5678901, 'Ana', 'Fernandez', '1990-01-01', 'Direccion 5', '099123456', 'anafernandez@gmail.com', 'anafernandez'),
(6789012, 'Lucia', 'Lopez', '1990-01-01', 'Direccion 6', '099123456', 'lucialopez@gmail.com', 'lucialopez'),
(7890123, 'Carlos', 'Martinez', '1990-01-01', 'Direccion 7', '099123456', 'carlosmartinez@gmail.com', 'carlosmartinez'),
(8901234, 'Sofia', 'Sanchez', '1990-01-01', 'Direccion 8', '099123456', 'sofiasanchez@gmail.com', 'sofiasanchez'),
(9012345, 'Jorge', 'Gomez', '1990-01-01', 'Direccion 9', '099123456', 'jorgegomez@gmail.com', 'jorgegomez'),
(1234568, 'Miguel', 'Gimenez', '1990-01-01', 'Direccion 10', '099123456', 'miguelgimenez@gmail.com', 'miguelgimenez');

insert into Agenda (nro, ci, fch_agenda) values
(1, 1234567, '2020-01-01'),
(2, 2345678, '2020-01-01'),
(3, 3456789, '2020-01-01'),
(4, 4567890, '2020-01-01'),
(5, 5678901, '2020-01-01'),
(6, 6789012, '2020-01-01'),
(7, 7890123, '2020-01-01'),
(8, 8901234, '2020-01-01'),
(9, 9012345, '2020-01-01'),
(10, 1234568, '2020-01-01');

insert into Carnet_Salud (ci, fch_emision, fch_vencimiento, comprobante) values
(1234567, '2020-01-01', '2020-01-01', 'Comprobante 1'),
(2345678, '2020-01-01', '2020-01-01', 'Comprobante 2'),
(3456789, '2020-01-01', '2020-01-01', 'Comprobante 3'),
(4567890, '2020-01-01', '2020-01-01', 'Comprobante 4'),
(5678901, '2020-01-01', '2020-01-01', 'Comprobante 5'),
(6789012, '2020-01-01', '2020-01-01', 'Comprobante 6'),
(7890123, '2020-01-01', '2020-01-01', 'Comprobante 7'),
(8901234, '2020-01-01', '2020-01-01', 'Comprobante 8'),
(9012345, '2020-01-01', '2020-01-01', 'Comprobante 9'),
(1234568, '2020-01-01', '2020-01-01', 'Comprobante 10');

insert into Periodos_Actualizacion (año, semestre, fch_inicio, fch_fin)
values (2020, 1, '2023-11-01', '2023-11-15');

insert into Roles (rol) values
('Administrador'),
('Funcionario');

insert into UsuarioRol (Ci, RolId) values
(1234567, 1),
(2345678, 2),
(3456789, 2),
(4567890, 2),
(5678901, 2),
(6789012, 2),
(7890123, 2),
(8901234, 2),
(9012345, 2),
(1234568, 2);