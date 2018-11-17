import cv2
import numpy as np

img = cv2.imread('fridge.jpg', cv2.IMREAD_COLOR)
count = 0
for x in img:
	for y in x:
		if y[0] > 100 and  y[0] > y[1] and y[1] > y[2]:
			count += 1
print('Number of orange pixels:' + str(count))
