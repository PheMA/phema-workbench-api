package org.phema.executer.api.resources.phenotype;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("phenotype")
public class PhenotypeResource {

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public PhenotypeList getPhenotypeList() {
    return new PhenotypeList();
  }
}
