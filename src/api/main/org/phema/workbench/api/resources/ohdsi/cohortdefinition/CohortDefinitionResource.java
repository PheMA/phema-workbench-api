package org.phema.workbench.api.resources.ohdsi.cohortdefinition;

import edu.phema.elm_to_omop.api.CohortService;
import edu.phema.elm_to_omop.api.ElmToOmopTranslator;
import edu.phema.elm_to_omop.helper.Config;
import edu.phema.elm_to_omop.io.FhirReader;
import org.hl7.fhir.r4.model.Bundle;
import org.ohdsi.webapi.cohortdefinition.InclusionRuleReport;
import org.ohdsi.webapi.service.CohortDefinitionService;
import org.ohdsi.webapi.service.CohortDefinitionService.CohortDefinitionDTO;
import org.ohdsi.webapi.service.CohortDefinitionService.GenerateSqlResult;
import org.phema.workbench.api.resources.phenotype.PhenotypeResource;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.logging.Logger;

@Path("omop/cohortdefinition")
public class CohortDefinitionResource {
  public Logger logger = Logger.getLogger(PhenotypeResource.class.getSimpleName());

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String getOmopCohortDefinition(CohortDefinitionRequest cohortDefinitionRequest) throws Exception {
    logger.info("Received cohort definition request");

    Config config = new Config();

    // FIXME: We're going to need a strategy for this
    String vsFilename = this.getClass().getResource("/valuesets/diabetes.csv").getPath();

    config.setVsFileName(vsFilename);
    config.setOmopBaseURL(cohortDefinitionRequest.getOmopServerUrl());
    config.setSource(cohortDefinitionRequest.getSource());

    try {
      ElmToOmopTranslator translator = new ElmToOmopTranslator(config);

      logger.info("Successfully translated CQL");

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
    logger.info("Received cohort report request");

    Config config = new Config();
    // Set the common parameters
    config.setOmopBaseURL(cohortDefinitionRequest.getOmopServerUrl());
    config.setSource(cohortDefinitionRequest.getSource());

    try {
      if (cohortDefinitionRequest.getBundle() != null) {
        config.setInputBundleName(cohortDefinitionRequest.getName());
        CohortService cs = new CohortService(config);

        logger.info("Deserializing bundle");
        Bundle bundle = FhirReader.readBundleFromString(cohortDefinitionRequest.getBundle());

        logger.info("Calling cohort report service bundle");
        return cs.getCohortDefinitionReport(bundle, cohortDefinitionRequest.getName());
      } else {
        CohortService cs = new CohortService(config);
        // FIXME: We're going to need a strategy for this
        config.setVsFileName("/valuesets/diabetes.csv");
        return cs.getCohortDefinitionReport(cohortDefinitionRequest.getCode(), cohortDefinitionRequest.getName());
      }
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
    logger.info("Received SQL request");

    Config config = new Config();

    // FIXME: We're going to need a strategy for this
    config.setVsFileName("/valuesets/diabetes.csv");
    config.setOmopBaseURL(cohortDefinitionRequest.getOmopServerUrl());
    config.setSource(cohortDefinitionRequest.getSource());

    try {
      if (cohortDefinitionRequest.getBundle() != null) {
        config.setInputBundleName(cohortDefinitionRequest.getName());

        CohortService cs = new CohortService(config);

        logger.info("Deserializing bundle");
        Bundle bundle = FhirReader.readBundleFromString(cohortDefinitionRequest.getBundle());

        logger.info("Calling cohort report service bundle");
        CohortDefinitionDTO cohort = cs.createCohortDefinition(bundle, cohortDefinitionRequest.getName());

        return cs.getCohortDefinitionSql(cohort.id, cohortDefinitionRequest.getTargetDialect());
      } else {
        CohortService cs = new CohortService(config);

        CohortDefinitionDTO cohort = cs.createCohortDefinition(cohortDefinitionRequest.getCode(), cohortDefinitionRequest.getName());

        logger.info("Successfully generated cohort definition");

        return cs.getCohortDefinitionSql(cohort.id, cohortDefinitionRequest.getTargetDialect());
      }
    } catch (Exception e) {
      e.printStackTrace();
      throw new InternalServerErrorException(e.getMessage());
    }
  }
}
