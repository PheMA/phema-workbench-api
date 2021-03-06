package org.phema.workbench.api.resources.elm;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import edu.phema.elm_to_omop.api.CohortService;
import edu.phema.elm_to_omop.api.CqlToElmTranslator;
import edu.phema.elm_to_omop.api.ElmToOmopTranslator;
import edu.phema.elm_to_omop.helper.Config;
import edu.phema.transform.ElmTransformer;
import edu.phema.util.ElmUtil;
import org.hl7.elm.r1.ExpressionDef;
import org.hl7.elm.r1.Library;
import org.ohdsi.webapi.cohortdefinition.InclusionRuleReport;
import org.phema.workbench.api.resources.ohdsi.cohortdefinition.CohortDefinitionRequest;
import org.phema.workbench.api.resources.phenotype.PhenotypeResource;

import java.util.logging.Logger;

@Path("elm")
public class ElmResource {
  public Logger logger = Logger.getLogger(PhenotypeResource.class.getSimpleName());

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String getElmJson(ElmRequest elmRequest) {
    logger.info("Received ELM JSON request");

    CqlToElmTranslator translator = new CqlToElmTranslator();
    return translator.cqlToElmJson(elmRequest.getCode());
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_XML)
  public String getElmXml(ElmRequest elmRequest) {
    logger.info("Received ELM XML request");

    CqlToElmTranslator translator = new CqlToElmTranslator();
    return translator.cqlToElmXml(elmRequest.getCode());
  }

  @POST
  @Path("graph")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces("text/vnd.graphviz")
  public String getStatementGraph(ElmRequest elmRequest) throws Exception {
    logger.info("Received graph request");

    ElmUtil elmUtil = new ElmUtil();

    CqlToElmTranslator translator = new CqlToElmTranslator();

    Library library = translator.cqlToElm(elmRequest.getCode());

    ElmTransformer transformer = new ElmTransformer();

    ExpressionDef statement = elmUtil.getStatementByName(library, elmRequest.getName());

    return transformer.getDOTGraph(library, statement);
  }
}
