#!/bin/bash

DIR_NAME=$1
mkdir src/2021/$DIR_NAME src/2021/$DIR_NAME/__tests__
touch src/2021/$DIR_NAME/__tests__/$DIR_NAME.test.ts
touch src/2021/$DIR_NAME/data.ts
touch src/2021/$DIR_NAME/$DIR_NAME.ts
touch src/2021/$DIR_NAME/$DIR_NAME-problem.txt

