#!/bin/bash
ls <%= class_name %>.tar.gz; rm <%= class_name %>.tar.gz
cd plugin;tar zcvf ../<%= class_name %>.tar.gz *
