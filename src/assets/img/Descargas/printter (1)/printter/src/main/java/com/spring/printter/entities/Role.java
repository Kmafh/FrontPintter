package com.spring.printter.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nid;
    @Column(name="sname")
    private String name;

    public Long getNid() {
        return nid;
    }

    public void setNid(Long nid) {
        this.nid = nid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
