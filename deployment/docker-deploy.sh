#!/bin/bash

# Log in to the Bintray Docker registry
echo "$BINTRAY_API_KEY" | docker login -u "$BINTRAY_USERNAME" --password-stdin phema-docker-docker.bintray.io

set -o xtrace

# Push the image
docker push phema-docker-docker.bintray.io/phema-phex:$TRAVIS_TAG

# Notify to slack
SLACK_MESSAGE="New PhEx <https://bintray.com/beta/#/phema/docker/phema-phex?tab=overview|Docker image> published ($TRAVIS_TAG)"
curl -X POST --data-urlencode 'payload={"username": "PhEMA Bot", "text": "'"$SLACK_MESSAGE"'", "icon_url": "https://bintray.com/assets/favicon.png"}' $SLACK_WEBHOOK_URL
