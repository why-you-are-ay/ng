package com.ssafy.ng.db.repository;

import com.ssafy.ng.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findByProNo(String proNo);
}
