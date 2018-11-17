from __future__ import division
import cv2
import numpy as np
import sys

def count_pixels(path):
	img = cv2.imread(path, cv2.IMREAD_COLOR)
	count = 0
	red = 0
	green = 0
	blue = 0
	for x in img:
		for y in x:
			red += y[0]
			green += y[1]
			blue += y[2]
			if y[0] > 100 and  y[0] > y[1] and y[1] > y[2]:
				count += 1
	print(path)
	print(red)
	print(green)
	print(blue)
	return count

empty = count_pixels("empty.jpg")
full = count_pixels("full.jpg")
current = count_pixels(sys.argv[1])
base = full - empty
current = current - empty
print("Percent of OJ:" + str(current/base))
