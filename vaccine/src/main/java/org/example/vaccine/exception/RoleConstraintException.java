package org.example.vaccine.exception;

import java.sql.SQLIntegrityConstraintViolationException;

public class RoleConstraintException extends RuntimeException {
    public RoleConstraintException(String message) {
        super(message);
    }
}
