import conventionalChangelog from './conventional-changelog';
import recommendedBumpOpts from './conventional-recommended-bump';
import parserOpts from './parser-opts';
import writerOpts from './writer-opts';

async function createPreset() {
  return {
    conventionalChangelog,
    parser: parserOpts,
    parserOpts,
    recommendedBumpOpts,
    writer: writerOpts,
    writerOpts,
  };
}

createPreset.conventionalChangelog = conventionalChangelog;
createPreset.default = createPreset;
createPreset.parser = parserOpts;
createPreset.parserOpts = parserOpts;
createPreset.recommendedBumpOpts = recommendedBumpOpts;
createPreset.writer = writerOpts;
createPreset.writerOpts = writerOpts;

export = createPreset;
