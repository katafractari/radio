#!/bin/sh

dir="data/Radio ZICA"

find "$dir" -regex ".*([0-9]+).*" -delete
find "$dir" -regex ".*Not Available Right Now.*" -delete
find "$dir" -regex ".*spletni radio kratka.*" -delete
find "$dir" -regex ".*radio zica zari in pali.*" -delete
find "$dir" -regex ".*Radio zica - spletni radio short short.*"  -delete
find "$dir" -regex ".*drblues.*" -delete
find "$dir" -regex ".*service not available.*" -delete
find "$dir" -size +15M -delete
find "$dir" -type f -size -1024k -delete
find "$dir" -iregex '.*Siddharta.*' -delete
