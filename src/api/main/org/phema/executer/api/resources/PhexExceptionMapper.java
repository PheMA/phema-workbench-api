package org.phema.executer.api.resources;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class PhexExceptionMapper implements ExceptionMapper<Exception> {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public Response toResponse(Exception e) {
        Response.ResponseBuilder builder = Response.status(Response.Status.INTERNAL_SERVER_ERROR)
            .entity(this.buildJson(e))
            .type(MediaType.APPLICATION_JSON);
        return builder.build();
    }

    private String buildJson(Exception e) {
        HttpError error = new HttpError(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), e.getMessage());

        if (e instanceof NotFoundException) {
            error.setStatus(Response.Status.NOT_FOUND.getStatusCode());
        }

        try {
            return MAPPER.writeValueAsString(error);
        } catch (Exception ex) {
            return "{ \"status\": 500, \"statusMessage\": \"An internal error occurred\" }";
        }
    }

    private class HttpError {
        public Integer status;
        public String statusText;

        public HttpError(Integer status, String statusText) {
            this.status = status;
            this.statusText = statusText;
        }

        public Integer getStatus() {
            return status;
        }

        public void setStatus(Integer status) {
            this.status = status;
        }

        public String getStatusText() {
            return statusText;
        }

        public void setStatusText(String statusText) {
            this.statusText = statusText;
        }
    }
}
