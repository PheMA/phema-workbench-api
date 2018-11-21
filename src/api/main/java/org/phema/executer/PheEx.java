package org.phema.executer;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

public class PheEx {
  public static void main(String[] args) {
    System.setProperty("org.eclipse.jetty.LEVEL", "INFO");

    Server server = new Server(8083);

    // Set up the API servlet
    ResourceConfig config = new ResourceConfig();
    config.register(JacksonFeature.class);
    config.packages("org.phema.executer.api.resources");

    ServletHolder servlet = new ServletHolder(new ServletContainer(config));

    ServletContextHandler servletContextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
    servletContextHandler.setContextPath("/");
    servletContextHandler.addServlet(servlet, "/api/v1/*");

    // Set up the UI servlet
    ServletHolder uiServlet = new ServletHolder("/", DefaultServlet.class);
    uiServlet.setInitParameter("resourceBase", "./src/ui/dist");
    uiServlet.setInitParameter("pathInfoOnly","true");
    uiServlet.setInitParameter("dirAllowed","true");
    servletContextHandler.addServlet(uiServlet,"/*");

    server.setHandler(servletContextHandler);

    try {
      server.start();
      server.join();
    } catch (Exception ex) {
      Logger.getLogger(PheEx.class.getName()).log(Level.SEVERE, null, ex);
    } finally {

      server.destroy();
    }
  }
}