package org.phema.executer.api.resources.phenotype;

import org.codehaus.jackson.annotate.JsonProperty;

import java.util.Date;

public class Phenotype {
  public Phenotype(int id, String name, Date modified, int size) {
    this.id = id;
    this.name = name;
    this.modified = modified;
    this.size = size;
  }

  @JsonProperty("id")
  private int id;

  @JsonProperty("name")
  private String name;

  @JsonProperty("modified")
  private Date modified;

  @JsonProperty("size")
  private int size;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Date getModified() {
    return modified;
  }

  public void setModified(Date modified) {
    this.modified = modified;
  }

  public int getSize() {
    return size;
  }

  public void setSize(int size) {
    this.size = size;
  }
}
