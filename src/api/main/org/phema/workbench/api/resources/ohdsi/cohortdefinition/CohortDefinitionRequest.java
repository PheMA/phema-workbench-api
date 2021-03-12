package org.phema.workbench.api.resources.ohdsi.cohortdefinition;

import org.codehaus.jackson.annotate.JsonProperty;

public class CohortDefinitionRequest {

  public CohortDefinitionRequest() {
  }

  /**
   * CQL code to execute
   */
  @JsonProperty("code")
  private String code;

  /**
   * The name of the phenotype
   */
  @JsonProperty("name")
  private String name;

  /**
   * The base URL of the OMOP server (WebAPI)
   * ex., http://omop.test/WebAPI/
   */
  @JsonProperty("omopServerUrl")
  private String omopServerUrl;

  /**
   * The OMOP data source that queries should be run against
   */
  @JsonProperty("source")
  private String source;

  /**
   * The target database dialect (e.g., pgsql) that should be used when generating a
   * SQL representation of a phenotype
   */
  @JsonProperty("targetDialect")
  private String targetDialect;

  /**
   * A String representation of a JSON FHIR Bundle.
   */
  @JsonProperty("bundle")
  private String bundle;

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

  public String getBundle() {
    return bundle;
  }

  public void setBundle(String bundle) {
    this.bundle = bundle;
  }
}
