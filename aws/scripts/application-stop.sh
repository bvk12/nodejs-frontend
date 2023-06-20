#!/bin/bash
set -xe

# Enable and start NodeJS application
sudo systemctl disable reactjsprod.service
sudo systemctl stop reactjsprod.service