package org.phema.workbench.api.resources.ohdsi.cohortdefinition;

import org.codehaus.jackson.annotate.JsonProperty;

public class CohortDefinitionRequest {

  public CohortDefinitionRequest() {
  }

  @JsonProperty("code")
  private String code;

  @JsonProperty("name")
  private String name;

  @JsonProperty("omopServerUrl")
  private String omopServerUrl;

  @JsonProperty("source")
  private String source;

  @JsonProperty("targetDialect")
  private String targetDialect;

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

  public String getOmopServerUrl() {
    return omopServerUrl;
  }

  public void setOmopServerUrl(String omopServerUrl) {
    this.omopServerUrl = omopServerUrl;
  }

  public String getSource() {
    return source;
  }

  public void setSource(String source) {
    this.source = source;
  }

  public String getTargetDialect() {
    return targetDialect;
  }

  public void setTargetDialect(String targetDialect) {
    this.targetDialect = targetDialect;
  }
}
