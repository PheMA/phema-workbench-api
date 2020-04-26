package org.phema.executer.api.resources.elm;

import org.codehaus.jackson.annotate.JsonProperty;

public class ElmRequest {
    public ElmRequest() {
    }

    @JsonProperty("code")
    private String code;

    @JsonProperty("name")
    private String name;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
