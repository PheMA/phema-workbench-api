package org.phema.workbench.api.resources.ws;

import java.io.IOException;
import java.util.Locale;
import java.util.concurrent.CountDownLatch;
import javax.websocket.ClientEndpoint;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ClientEndpoint
@ServerEndpoint(value = "/events/")
public class PhemaWebSocket {
  private CountDownLatch closureLatch = new CountDownLatch(1);

  @OnOpen
  public void onWebSocketConnect(Session sess) {
    System.out.println("Socket Connected: " + sess);
  }

  @OnMessage
  public void onWebSocketText(Session sess, String message) throws IOException {
    System.out.println("Received TEXT message: " + message);

    if (message.toLowerCase(Locale.US).contains("bye")) {
      sess.close(new CloseReason(CloseReason.CloseCodes.NORMAL_CLOSURE, "Thanks"));
    }

    sess.getBasicRemote().sendText("Receive: " + message);
  }

  @OnClose
  public void onWebSocketClose(CloseReason reason) {
    System.out.println("Socket Closed: " + reason);
    closureLatch.countDown();
  }

  @OnError
  public void onWebSocketError(Throwable cause) {
    cause.printStackTrace(System.err);
  }

  public void awaitClosure() throws InterruptedException {
    System.out.println("Awaiting closure from remote");
    closureLatch.await();
  }
}