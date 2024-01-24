import conventionalChangelog from './conventional-changelog';
import recommendedBumpOpts from './conventional-recommended-bump';
import parserOpts from './parser-opts';
import writerOpts from './writer-opts';

export default async function createPreset() {
  return {
    parserOpts,
    writerOpts,
    recommendedBumpOpts,
    conventionalChangelog,
  };
}

export { conventionalChangelog, recommendedBumpOpts, parserOpts, writerOpts };
