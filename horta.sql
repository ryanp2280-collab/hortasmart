CREATE DATABASE IF NOT EXISTS hortasmart;
USE hortasmart;

CREATE TABLE IF NOT EXISTS canteiros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    planta VARCHAR(100) NOT NULL,
    limite INT NOT NULL DEFAULT 40
);

CREATE TABLE IF NOT EXISTS historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    canteiro_nome VARCHAR(100) NOT NULL,
    status_msg VARCHAR(255) NOT NULL,	
    umidade INT NOT NULL,
    nivel_agua INT NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO canteiros (nome, planta, limite) VALUES 
('Canteiro 1', 'Alface Crespa', 40),
('Canteiro 2', 'Tomate Cereja', 50);