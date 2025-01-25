#!/bin/bash

docker-compose down

BACKUP_CACHE_PATH="./BACKUP/cache"
BACKUP_FILES_PATH="./BACKUP/files"
LOCAL_CACHE_PATH="./.cache"
LOCAL_FILES_PATH="./.files"

mount() {
  if [ ! -d "$1" ] && [ -d "$2" ]; then
    LATEST_FILE_PATH=$2/$(ls -1 "$2" | sort | tail -n 1)
    echo "$LATEST_FILE_PATH Will Be Mount"
    unzip -q "$LATEST_FILE_PATH" -d $1
  fi
}

mount $LOCAL_CACHE_PATH $BACKUP_CACHE_PATH
mount $LOCAL_FILES_PATH $BACKUP_FILES_PATH

docker-compose up $1
