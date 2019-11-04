package org.phema.executer.api.resources.elm;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import edu.phema.elm_to_omop.api.CqlToElmTranslator;

@Path("elm")
public class ElmResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getElmJson() {
        return "{ \"test\": 123 }";
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getElmJson(ElmRequest elmRequest) {
        CqlToElmTranslator translator = new CqlToElmTranslator();
        return translator.cqlToElmJson(elmRequest.getCode());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_XML)
    public String getElmXml(ElmRequest elmRequest) {
        CqlToElmTranslator translator = new CqlToElmTranslator();
        return translator.cqlToElmXml(elmRequest.getCode());
    }
}
