#!/bin/sh

dir="data/Radio ZICA"

find "$dir" -regex ".*([0-9]+).*" -ls -delete
find "$dir" -regex ".*Not Available Right Now.*" -ls -delete
find "$dir" -regex ".*spletni radio kratka.*" -ls -delete
find "$dir" -regex ".*radio zica zari in pali.*" -ls -delete
find "$dir" -regex ".*Radio zica - spletni radio short short.*"  -ls -delete
find "$dir" -regex ".*drblues.*" -ls -delete
find "$dir" -regex ".*service not available.*" -ls -delete
find "$dir" -size +15M -ls -delete
find "$dir" -type f -size -1024k -ls -delete
find "$dir" -iregex '.*Siddharta.*' -ls -delete
find "$dir" -iregex '.*Bryan Adams.*' -ls -delete
find "$dir" -regex ".*Matisyahu.*" -ls -delete
