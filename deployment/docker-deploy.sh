#!/bin/bash

# Log in
echo "$DOCKERHUB_API_KEY" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

set -o xtrace

# Push the image
docker push phema/phema-workbench-api:$TRAVIS_TAG

# Notify to slack
SLACK_MESSAGE="New PhEMA Workbench API <https://hub.docker.com/r/phema/phema-workbench-api|Docker image> published ($TRAVIS_TAG)"
curl -X POST --data-urlencode 'payload={"username": "PhEMA Bot", "text": "'"$SLACK_MESSAGE"'", "as_user": false, "icon_url": "https://avatars.slack-edge.com/2018-10-04/449576897954_f7df753dae3a99ab563a_88.png"}' $SLACK_WEBHOOK_URL
