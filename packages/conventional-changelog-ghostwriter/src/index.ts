import conventionalChangelog from './conventional-changelog';
import recommendedBumpOpts from './conventional-recommended-bump';
import parserOpts from './parser-opts';
import writerOpts from './writer-opts';

async function createPreset() {
  return {
    parserOpts,
    writerOpts,
    recommendedBumpOpts,
    conventionalChangelog,
  };
}

createPreset.conventionalChangelog = conventionalChangelog;
createPreset.default = createPreset;
createPreset.parserOpts = parserOpts;
createPreset.recommendedBumpOpts = recommendedBumpOpts;
createPreset.writerOpts = writerOpts;

export = createPreset;
