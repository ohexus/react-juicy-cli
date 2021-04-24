import config from '../../config';

import { generateComponent, generateContext, generateHook, generateTest } from '../../commands';
import { askGlobalConfig, askComponentConfig, askContextConfig, askHookConfig, askTestConfig } from '../../questions';

import { Configs, GenerationEntities } from '../../enums';
import { GlobalConfig } from '../../interfaces';

export default async function askAndGenerate(): Promise<void> {
  await askGlobalConfig();

  const { entity } = config.get(Configs.Global) as GlobalConfig;

  switch (entity) {
    case GenerationEntities.Component:
      await askComponentConfig();
      await generateComponent();
      break;

    case GenerationEntities.Context:
      await askContextConfig();
      await generateContext();
      break;

    case GenerationEntities.Hook:
      await askHookConfig();
      await generateHook();
      break;

    case GenerationEntities.Test:
      await askTestConfig();
      await generateTest();
      break;

    default:
      break;
  }

  if (entity === GenerationEntities.Component || entity === GenerationEntities.Test) {
    await askTestConfig();
    await generateTest();
  }
}
