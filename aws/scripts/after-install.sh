#!/bin/bash
set -xe

# Move to ReactJS code base
cd /root/vpt-elearning-front-end/
git pull origin vpt-prod

# Reinstall packages for ReactJS app
npm install 2>/dev/null