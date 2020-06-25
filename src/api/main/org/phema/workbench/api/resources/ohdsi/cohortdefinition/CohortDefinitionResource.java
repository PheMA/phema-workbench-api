package org.phema.workbench.api.resources.ohdsi.cohortdefinition;

import edu.phema.elm_to_omop.api.CohortService;
import edu.phema.elm_to_omop.api.ElmToOmopTranslator;
import edu.phema.elm_to_omop.helper.Config;
import org.ohdsi.webapi.cohortdefinition.InclusionRuleReport;
import org.ohdsi.webapi.service.CohortDefinitionService;
import org.ohdsi.webapi.service.CohortDefinitionService.CohortDefinitionDTO;
import org.ohdsi.webapi.service.CohortDefinitionService.GenerateSqlResult;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("omop/cohortdefinition")
public class CohortDefinitionResource {
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String getOmopCohortDefinition(CohortDefinitionRequest cohortDefinitionRequest) throws Exception {
    Config config = new Config();

    // FIXME: We're going to need a strategy for this
    String vsFilename = this.getClass().getResource("/valuesets/diabetes.csv").getPath();

    config.setVsFileName(vsFilename);
    config.setOmopBaseURL(cohortDefinitionRequest.getOmopServerUrl());
    config.setSource(cohortDefinitionRequest.getSource());

    try {
      ElmToOmopTranslator translator = new ElmToOmopTranslator(config);

      return translator.cqlToOmopJson(cohortDefinitionRequest.getCode(), cohortDefinitionRequest.getName());
    } catch (Exception e) {
      e.printStackTrace();
      throw new InternalServerErrorException(e.getMessage());
    }
  }

  @POST
  @Path("report")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public InclusionRuleReport getOmopCohortDefinitionReport(CohortDefinitionRequest cohortDefinitionRequest) throws Exception {
    Config config = new Config();

    // FIXME: We're going to need a strategy for this
    config.setVsFileName("/valuesets/diabetes.csv");
    config.setOmopBaseURL(cohortDefinitionRequest.getOmopServerUrl());
    config.setSource(cohortDefinitionRequest.getSource());

    try {
      CohortService cs = new CohortService(config);

      return cs.getCohortDefinitionReport(cohortDefinitionRequest.getCode(), cohortDefinitionRequest.getName());
    } catch (Exception e) {
      e.printStackTrace();
      throw new InternalServerErrorException(e.getMessage());
    }
  }

  @POST
  @Path("sql")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public GenerateSqlResult getOmopCohortDefinitionSql(CohortDefinitionRequest cohortDefinitionRequest) throws Exception {
    Config config = new Config();

    // FIXME: We're going to need a strategy for this
    config.setVsFileName("/valuesets/diabetes.csv");
    config.setOmopBaseURL(cohortDefinitionRequest.getOmopServerUrl());
    config.setSource(cohortDefinitionRequest.getSource());

    try {
      CohortService cs = new CohortService(config);

      CohortDefinitionDTO cohort = cs.createCohortDefinition(cohortDefinitionRequest.getCode(), cohortDefinitionRequest.getName());

      return cs.getCohortDefinitionSql(cohort.id, cohortDefinitionRequest.getTargetDialect());
    } catch (Exception e) {
      e.printStackTrace();
      throw new InternalServerErrorException(e.getMessage());
    }
  }
}
