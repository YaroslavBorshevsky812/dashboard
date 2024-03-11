package ru.wayne.dashboard.DashboardApp.dto;


public class AuthCredentialsRequest {

    private String name;
    private String password;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
