#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
sed -i '' 's,ssh://git@,https://,g' "${SCRIPT_DIR}/../package-lock.json"