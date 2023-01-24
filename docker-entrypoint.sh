#!/bin/ash
set -e

if [ "$1" = 'yarn' ]
then
	exec su-exec node "$@"
fi

exec "$@"
