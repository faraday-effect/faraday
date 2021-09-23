#!/usr/bin/env bash -x

for model in activity topic module resource offering course prefix department term
do
  boil --entity er-schema/$model.json > src/content/models/$model.model.ts
done
