from sklearn.externals import joblib

clf = joblib.load('mymodel.pkl')
print clf.predict([[95, 0]])

