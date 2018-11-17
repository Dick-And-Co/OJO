#!/bin/bash

while true;
do  echo "Getting Fridge Snapshot"
ffmpeg -y -f video4linux2 -i /dev/video1 -vframes 1 fridge.jpg
echo "Calculating OJ Percent"
python get_oj_percent.py fridge.jpg
sleep 20s
done
