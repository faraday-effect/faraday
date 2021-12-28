#!/usr/bin/env bash -x

#for model in activity topic module resource offering course prefix department term

for model in activity step step-title
do
  boil --entity er-schema/$model.json > src/content/models/$model.model.ts
  boil --resolver er-schema/$model.json > src/content/resolvers/$model.resolver.ts
  boil --service er-schema/$model.json > src/content/services/$model.service.ts
done
