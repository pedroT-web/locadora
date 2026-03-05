-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/03/2026 às 23:58
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_locadora`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamentos`
--

CREATE TABLE `agendamentos` (
  `id` int(11) NOT NULL,
  `nome_cliente` varchar(100) NOT NULL,
  `email_cliente` varchar(100) NOT NULL,
  `veiculo_id` int(11) DEFAULT NULL,
  `data_inicio_reserva` date DEFAULT NULL,
  `data_fim_reserva` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `agendamentos`
--

INSERT INTO `agendamentos` (`id`, `nome_cliente`, `email_cliente`, `veiculo_id`, `data_inicio_reserva`, `data_fim_reserva`) VALUES
(13, 'Kauã', 'kaua@gmail.com', 1, '2026-03-04', '2026-03-06'),
(14, 'Pedro', 'pedro@gmail.com', 2, '2026-03-04', '2026-03-06'),
(15, 'Victor ', 'victor@gmail.com', 5, '2026-03-04', '2026-03-07'),
(16, 'Guto', 'guto@gmail.com', 1, '2026-03-04', '2026-03-14'),
(18, 'Murilo', 'murilo@gmail.com', 2, '2026-03-04', '2026-03-07'),
(19, 'teste', 'teste@teste', 5, '2026-03-04', '2026-03-05');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `nivel` enum('administrador','operario') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `nivel`) VALUES
(2, 'Guto', 'gutoxavier@gmail.com', '123', 'operario'),
(8, 'Pedroca', 'pedroca@gmail.com', '$2b$10$PYRqEkeUZCKA2W.rIwY8b.XdgxRLklhu./gC8.NBb.9qTbCNvbGV2', 'administrador'),
(9, 'pedro', 'pedro@gmail.com', '$2b$10$mJDoIa2IGwUrP5sbvIqrD.wfbOkLqrwHMJDTHWZSr/OGU6lRFmUPK', 'administrador');

-- --------------------------------------------------------

--
-- Estrutura para tabela `veiculos`
--

CREATE TABLE `veiculos` (
  `id` int(11) NOT NULL,
  `modelo` varchar(40) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `placa` varchar(7) DEFAULT NULL,
  `categoria` enum('Basico','Familia','Luxo') NOT NULL DEFAULT 'Basico',
  `valor_diaria` double(10,2) DEFAULT NULL,
  `status` enum('Disponível','Alugado','Manutenção') NOT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `veiculos`
--

INSERT INTO `veiculos` (`id`, `modelo`, `marca`, `placa`, `categoria`, `valor_diaria`, `status`, `foto`) VALUES
(1, 'm3', 'BMW', 'DJK9873', 'Luxo', 1099.99, 'Disponível', 'https://www.chavesnamao.com.br/imn/0340X0250/N/60/veiculos/371068/8385214/bmw-m3-em-londrina-pr-8660bd0c.jpg'),
(2, 'Civic G10', 'HONDA', 'HJO0192', 'Luxo', 241.00, 'Manutenção', 'https://www.comprecar.com.br/storage/news/featured/8_0R8774Q83u_e9.jpg'),
(5, 'Dodge Ram', 'Ram', 'KOS9278', 'Familia', 1000.00, 'Alugado', 'https://rentster.ee/files/202504/10b7452d-8d25-4ad7-8078-a3aa760e017e.jpg');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `veiculo_id` (`veiculo_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `veiculos`
--
ALTER TABLE `veiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
