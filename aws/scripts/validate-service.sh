#!/bin/bash
set -x

NUMBER_OF_ATTEMPTS=5
SLEEP_TIME=3

# Ensure Tomcat is running by making an HTTPS GET request to the default page.
# Don't try and verify the certificate; use the --insecure flag.
for i in `seq 1 $NUMBER_OF_ATTEMPTS`;
do
  HTTP_CODE=`curl -Is localhost:3000/health | awk '{print $2}' | head -n+1`
  if [ "$HTTP_CODE" == "200" ]; then
    echo "ReactJS app server is running..."
    exit 0
  fi
  echo "Attempt to curl endpoint returned HTTP Code $HTTP_CODE. Backing off and retrying."
  sleep $SLEEP_TIME
done
echo "Server did not come up after expected time. Failing."
exit 1