#!/bin/bash
# Usage: ./publish.sh <filename> <hostname> <key> <secret>

FILENAME=$1
IOT_HOST=$2
ACCESS_KEY=$3
SECRET_KEY=$4

curl \
--request POST \
--user $ACCESS_KEY:$SECRET_KEY \
--header "Content-Type: application/zip" \
--data-binary @$FILENAME \
--insecure \
"$IOT_HOST/api/plugins"
