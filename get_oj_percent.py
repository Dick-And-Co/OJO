from __future__ import division
import cv2
import numpy as np
import sys

def find_orange_img(img):
	hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
	lower_orange = np.array([20,75,75])
	upper_orange = np.array([25,255,255])	
	return cv2.inRange(hsv, lower_orange, upper_orange)

def count_pixels(path):
	img = cv2.imread(path, cv2.IMREAD_COLOR)
	#cv2.imshow('before', img)
	img = find_orange_img(img)
	#cv2.imshow('after', img)
	count = 0
	for x in img:
		for y in x:
			count += y
			#red += y[0]
			#green += y[1]
			#blue += y[2]
			#if y[0] > 100 and  y[0] > y[1] and y[1] > y[2]:
			#	count += 1
	print(count)
	print(path)
	return count

empty = count_pixels("empty.jpg")
full = count_pixels("full.jpg")
current = count_pixels(sys.argv[1])
base = full - empty
current = current - empty
print("Percent of OJ:" + str(current/base))
#cv2.waitKey(0)
