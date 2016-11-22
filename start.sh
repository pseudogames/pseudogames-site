#!/bin/bash

trap 'P=`(jobs -p ; pstree -p $$ 2>/dev/null | grep -o "([0-9]*)" | grep -o "[0-9]*")|sort -nu`; echo pruning $P; kill $P 2>/dev/null' 0

export PATH=./node_modules/.bin:$PATH

for cmd in "$@"
do
	echo $cmd
	$cmd &
done

wait -n

