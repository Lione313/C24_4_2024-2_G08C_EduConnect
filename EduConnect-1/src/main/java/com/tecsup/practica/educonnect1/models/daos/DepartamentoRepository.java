package com.tecsup.practica.educonnect1.models.daos;

import com.tecsup.practica.educonnect1.models.entities.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
}