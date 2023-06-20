#!/bin/bash
set -xe

SERVICE_NAME="reactjsprod.service"

#Enable ReactJS service if not
APP_ENABLED=$(sudo systemctl is-enabled $SERVICE_NAME)
if [ "$APP_ENABLED" == "enabled" ]; then
  echo "$SERVICE_NAME service was already enabled"
else
  sudo systemctl enable $SERVICE_NAME
  echo "Successfully enabled $SERVICE_NAME service"
fi

# Start or Restart ReactJS application
APP_status=$(sudo systemctl is-active $SERVICE_NAME)
if [ "$APP_status" == "active" ]; then
  sudo systemctl restart $SERVICE_NAME
else
  sudo systemctl start $SERVICE_NAME
fi