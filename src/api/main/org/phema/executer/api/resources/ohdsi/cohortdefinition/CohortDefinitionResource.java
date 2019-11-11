package org.phema.executer.api.resources.ohdsi.cohortdefinition;

import edu.phema.elm_to_omop.helper.Config;
import edu.phema.elm_to_omop.api.ElmToOmopTranslator;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("omop/cohortdefinition")
public class CohortDefinitionResource {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getOmopCohortDefinition(CohortDefinitionRequest cohortDefinitionRequest) throws Exception {
        Config config = new Config();

        // FIXME: We're going to need a strategy for this
        config.setVsFileName("/valuesets/diabetes.csv");
        config.setOmopBaseURL(cohortDefinitionRequest.getOmopServerUrl());
        config.setSource(cohortDefinitionRequest.getSource());

        String response = null;
        try {
            ElmToOmopTranslator translator = new ElmToOmopTranslator(config);

            response =
                translator.cqlToOmopJson(cohortDefinitionRequest.getCode(), cohortDefinitionRequest.getName());
        } catch (Exception e) {
            e.printStackTrace();
            throw new InternalServerErrorException(e.getMessage());
        }

        return response;
    }
}
