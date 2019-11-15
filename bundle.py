import os

path='./app'
dest_path = './dest'
dest_file = 'bundle.js'
files = []

print('python is bundling js......')

for root,directory,file in os.walk(path):
  for f in file:
    if '.js' in f:
      files.append(os.path.join(root, f))

with open(dest_file,'w+') as bundle:
  for file in files:
    with open(file,'r') as infile:
      bundle.write(infile.read())
print('all js inside app bundled successfully....')