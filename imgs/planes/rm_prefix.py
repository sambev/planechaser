#!/usr/bin/python
""" 
I take the output of 'ls *.jpg' and then remove the desired prefix that was passed in
For example:
    Say you have a bunch of images with 'new_[image_name].jpg' and wanted the 'new_' off,
    Instead of renaming each manually use this script as follows:
    python rm_prefix.py *.jpg new_
    that will pass in all the *.jpg files in the current directory and the 'new_' will be
    the prefix to remove
"""
from subprocess import call
import sys

# The file prefix should always be the the last arg 
file_prefix = sys.argv[-1]
# The files should be inbetween the first and last arg
files = sys.argv
files.pop(-1)
files.pop(0)

for f in files:
    if file_prefix in f:
        call(['mv', f, f.strip(file_prefix)])
