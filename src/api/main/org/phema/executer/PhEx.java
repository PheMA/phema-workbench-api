package org.phema.executer;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.eclipse.jetty.util.resource.Resource;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.logging.LoggingFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

import javax.servlet.DispatcherType;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.util.EnumSet;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PhEx {
  public static Logger logger = Logger.getLogger(PhEx.class.getSimpleName());

  public static String PHEX_DEFAULT_PROPERTY_FILE_NAME = "phex.properties";
  public static String PHEX_DEFAULT_PROPERTY_FILE_PATH = "/opt/phema/phex/" + PHEX_DEFAULT_PROPERTY_FILE_NAME;

  public static void main(String[] args) {
    try {
      new PhEx().run();
    } catch (Throwable t) {
      t.printStackTrace();
    }
  }

  public void loadProperties() {
    // Store the current set of properties
    Properties p = new Properties(System.getProperties());

    FileInputStream propFile;

    // First check for explicit properties file path
    String explicitPath = p.getProperty("phex.phenotype_directory");
    if (explicitPath != null && !explicitPath.isEmpty()) {
      logger.info("Loading properties from: " + explicitPath);
      try {
        propFile = new FileInputStream(explicitPath);
        p.load(propFile);
        System.setProperties(p);
        logger.info("Loaded properties from: " + explicitPath);
        return;
      } catch (Exception e) {
        logger.warning("Error loading properties from " + explicitPath + ": " + e.getMessage());
      }
    }

    // Then check default location
    logger.info("Checking for properties file: " + PHEX_DEFAULT_PROPERTY_FILE_PATH);
    try {
      propFile = new FileInputStream(PHEX_DEFAULT_PROPERTY_FILE_PATH);
      p.load(propFile);
      System.setProperties(p);
      logger.info("Loaded properties file: " + PHEX_DEFAULT_PROPERTY_FILE_PATH);
      return;
    } catch (Exception e) {
      logger.warning("Error loading properties from " + explicitPath + ": " + e.getMessage());
    }

    // Finally check the resources directory
    logger.info("Checking for properties file in resources directory");
    try {
      InputStream propInputStream = PhEx.class
        .getClassLoader().getResourceAsStream(PHEX_DEFAULT_PROPERTY_FILE_NAME);
      p.load(propInputStream);
      System.setProperties(p);
      logger.info("Loaded properties file in resources directory");
      return;
    } catch (Exception e) {
      logger.severe("Error loading properties from " + explicitPath + ": " + e.getMessage());
    }

    logger.severe("Could not find a valid properties file");
    System.exit(1);
  }

  public void run() throws Exception {
    loadProperties();
    System.getProperties().list(System.out);

    Server server = new Server(8083);
    HandlerList handlers = new HandlerList();

    ServletContextHandler servletContextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
    servletContextHandler.setContextPath("/");

    // Set up the API servlet
    ResourceConfig config = new ResourceConfig();
    config.register(JacksonFeature.class);
    config.register(MultiPartFeature.class);
    config.register(LoggingFeature.class);
    config.packages("org.phema.executer.api.resources");

    ServletHolder apiServletHolder = new ServletHolder(new ServletContainer(config));
    servletContextHandler.addServlet(apiServletHolder, "/api/v1/*");

    // Set up UI servlet
    URL webRootLocation = this.getClass().getResource("/ui/index.html");
    if (webRootLocation == null) {
      throw new IllegalStateException("Unable to determine webroot URL location");
    }
    URI webRootUri = URI.create(webRootLocation.toURI().toASCIIString().replaceFirst("/index.html$", "/"));
    System.err.printf("Web Root URI: %s%n", webRootUri);

    servletContextHandler.setBaseResource(Resource.newResource(webRootUri));
    servletContextHandler.setWelcomeFiles(new String[]{"index.html"});

    ServletHolder staticHolder = new ServletHolder("default", DefaultServlet.class);
    servletContextHandler.addServlet(staticHolder, "/");

    // Add CORS filter
    FilterHolder cors = servletContextHandler.addFilter(CrossOriginFilter.class, "/*", EnumSet.of(DispatcherType.REQUEST));
    cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
    cors.setInitParameter(CrossOriginFilter.ACCESS_CONTROL_ALLOW_ORIGIN_HEADER, "*");
    cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,HEAD");
    cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "X-Requested-With,Content-Type,Accept,Origin");

    handlers.addHandler(servletContextHandler);
    handlers.addHandler(new DefaultHandler());

    server.setHandler(handlers);

    try {
      server.start();
      server.join();
    } catch (Exception ex) {
      logger.log(Level.SEVERE, null, ex);
    } finally {
      server.destroy();
    }
  }
}