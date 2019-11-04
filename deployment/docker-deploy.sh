#!/bin/bash

# Log in to the Bintray Docker registry
docker login -u $BINTRAY_USERNAME -p $BINTRAY_API_KEY phema-docker-docker.bintray.io

set -o xtrace

# Push the image
docker push phema-docker-docker.bintray.io/phema-phex:$TRAVIS_TAG

# Notify to slack
#SLACK_MESSAGE="New eSaude Platform <https://bintray.com/esaude/platform-docker|Docker images> and <https://bintray.com/esaude/apps/esaude-app-platform|offline installer> published ($TRAVIS_TAG)"
#curl -X POST --data-urlencode 'payload={"username": "eSaude Bintray", "text": "'"$SLACK_MESSAGE"'", "icon_url": "https://bintray.com/assets/favicon.png"}' $SLACK_WEBHOOK_URL
