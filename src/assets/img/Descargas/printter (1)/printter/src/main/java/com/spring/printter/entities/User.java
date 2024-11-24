package com.spring.printter.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nid;
    @Column(name="sname")
    private String name;
    @Column(name="slastname")

    private String lastname;
    @Column(name="dbirthdate")

    private Date birthdate;
    @Column(name="ssex")

    private String sex;
    @Column(name="semail")

    private String email;
    @Column(name="spassword")

    private String password;
    @JsonIgnoreProperties({"handler", "hibernaeLazyInitializer"})
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name="user_nid"),
    inverseJoinColumns = @JoinColumn(name = "roles_nid"),
    uniqueConstraints = {@UniqueConstraint(columnNames = {"user_nid", "roles_nid"})})
    private List<Role> roles;

    public User() {
        this.roles = new ArrayList<>();
    }

    public Long getId() {
        return nid;
    }

    public void setId(Long nid) {
        this.nid = nid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
