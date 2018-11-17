#!/bin/bash

ffmpeg -y -f video4linux2 -i /dev/video1 -vframes 1 $1
