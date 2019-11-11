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
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

import javax.servlet.DispatcherType;
import java.net.URI;
import java.net.URL;
import java.util.EnumSet;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PheEx {
    public static void main(String[] args) {
        try {
            new PheEx().run();
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }

    public void run() throws Exception {
        System.setProperty("org.eclipse.jetty.LEVEL", "DEBUG");

        Server server = new Server(8083);
        HandlerList handlers = new HandlerList();

        ServletContextHandler servletContextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
        servletContextHandler.setContextPath("/");

        // Set up the API servlet
        ResourceConfig config = new ResourceConfig();
        config.register(JacksonFeature.class);
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
            Logger.getLogger(PheEx.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            server.destroy();
        }
    }
}