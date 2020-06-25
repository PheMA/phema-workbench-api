package org.phema.workbench.api.resources.version;

import org.codehaus.jackson.annotate.JsonProperty;

public class Version {
  @JsonProperty("version")
  private String version = "v0.0.1";

  public String getVersion() {
    return version;
  }
}
