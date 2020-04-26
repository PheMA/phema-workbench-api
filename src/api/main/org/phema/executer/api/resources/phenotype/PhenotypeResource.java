package org.phema.executer.api.resources.phenotype;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

@Path("phenotype")
public class PhenotypeResource {

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public PhenotypeList getPhenotypeList() {
    return new PhenotypeList();
  }

  @POST
  @Consumes(MediaType.MULTIPART_FORM_DATA)
  public Response uploadZippedFile(
    @FormDataParam("uploadFile") InputStream fileInputStream,
    @FormDataParam("uploadFile") FormDataContentDisposition fileFormDataContentDisposition) {
    // local variables
    String fileName = null;
    String uploadFilePath = null;

//    try {
//      fileName = fileFormDataContentDisposition.getFileName();
//
//      OutputStream outputStream = null;
//      String qualifiedUploadFilePath = UPLOAD_FILE_SERVER + fileName;
//
//      try {
//        outputStream = new FileOutputStream(new File(qualifiedUploadFilePath));
//        int read = 0;
//        byte[] bytes = new byte[1024];
//        while ((read = inputStream.read(bytes)) != -1) {
//          outputStream.write(bytes, 0, read);
//        }
//        outputStream.flush();
//      } catch (IOException ioe) {
//        ioe.printStackTrace();
//      } finally {
//        //release resource, if any
//        outputStream.close();
//      }
//
//
//    } catch (IOException ioe) {
//      ioe.printStackTrace();
//    } finally {
//      // release resources, if any
//    }
//    return Response.ok("File uploaded successfully at " + uploadFilePath).build();
    return null;
  }
}
