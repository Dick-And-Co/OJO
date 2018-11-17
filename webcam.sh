#!/bin/bash
while true;
do ffmpeg -y -f video4linux2 -i /dev/video1 -vframes 1 fridge.jpeg
sleep 5m
done