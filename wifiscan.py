import csv as csv
import numpy as np
from sklearn import tree

labels = [0, 0, 1, 1]

csv_file_object = csv.reader(open('wifiscan.csv', 'rb'))
#csv_file_object = csv.reader(open('mydata.csv', 'rb'))
header = csv_file_object.next()

data = []
for row in csv_file_object:
	data.append(row)
features = np.array(data)

#clf = tree.DecisionTreeClassifier()
#clf = clf.fit(features, labels)

#print labels
#print features

#print clf.predict([[150, 1]])
print features
