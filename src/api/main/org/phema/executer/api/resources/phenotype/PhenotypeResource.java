package org.phema.executer.api.resources.phenotype;

import org.apache.commons.io.FilenameUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.logging.Logger;
import java.util.UUID;

@Path("phenotype")
public class PhenotypeResource {
  public Logger logger = Logger.getLogger(PhenotypeResource.class.getSimpleName());

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public PhenotypeList getPhenotypeList() {
    return new PhenotypeList();
  }

  @POST
  @Consumes(MediaType.MULTIPART_FORM_DATA)
  public Response uploadZippedFile(
    @FormDataParam("phenotype") InputStream fileInputStream,
    @FormDataParam("phenotype") FormDataContentDisposition fileFormDataContentDisposition) {

    String fileName = null;
    try {
      fileName = fileFormDataContentDisposition.getFileName();

      // Append timestamp and UUID to filename
      Timestamp timestamp = new Timestamp(System.currentTimeMillis());
      Instant instant = timestamp.toInstant();
      String ext = FilenameUtils.getExtension(fileName);
      String name = FilenameUtils.getBaseName(fileName);
      UUID uuid = UUID.randomUUID();

      fileName = name + ".ID[" + uuid + "].TS[" + instant.getEpochSecond() + "]." + ext;

      byte[] buffer = new byte[fileInputStream.available()];
      fileInputStream.read(buffer);

      String phenotypePath = System.getProperty("phex.phenotype_directory");

      OutputStream outStream = new FileOutputStream(FilenameUtils.concat(phenotypePath, fileName));
      int read = 0;
      byte[] bytes = new byte[1024];
      while ((read = fileInputStream.read(bytes)) != -1) {
        outStream.write(bytes, 0, read);
      }
      outStream.flush();

      logger.info("Successfully uploaded phenotype: " + fileName);

      return Response.ok("Phenotype uploaded successfully at " + fileName).build();
    } catch (IOException ioe) {
      ioe.printStackTrace();

      logger.info("Failed o uploaded phenotype: " + fileName + ", " + ioe.getMessage());

      return Response.status(500, "Failed o uploaded phenotype: " + fileName + ", " + ioe.getMessage()).build();
    }
  }
}
