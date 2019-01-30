package org.phema.executer;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

import javax.servlet.DispatcherType;
import java.util.EnumSet;
import java.util.logging.Level;
import java.util.logging.Logger;

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

    // Add CORS filter
    FilterHolder cors = servletContextHandler.addFilter(CrossOriginFilter.class, "/*", EnumSet.of(DispatcherType.REQUEST));
    cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
    cors.setInitParameter(CrossOriginFilter.ACCESS_CONTROL_ALLOW_ORIGIN_HEADER, "*");
    cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,HEAD");
    cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "X-Requested-With,Content-Type,Accept,Origin");

    // Set up the UI servlet
    ServletHolder uiServlet = new ServletHolder("/", DefaultServlet.class);
    uiServlet.setInitParameter("resourceBase", "./src/ui/dist");
    uiServlet.setInitParameter("pathInfoOnly", "true");
    uiServlet.setInitParameter("dirAllowed", "true");
    servletContextHandler.addServlet(uiServlet, "/*");

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