import * as chalk from 'chalk';
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import * as wordWrap from 'word-wrap';
import { getConfiguration } from './configuration';

const maxLineLength = 120;

const getLongestString = (array: string[]): string => {
  if (array.length === 0) {
    return '';
  }

  let longest = array[0];
  let longestLength = longest.length;

  for (let idx = 0; idx < array.length; idx += 1) {
    const element = array[idx];
    const elementLength = element.length;

    if (elementLength > longestLength) {
      longest = element;
      longestLength = elementLength;
    }
  }

  return longest;
};

const getSubjectMaxLength = (scope: string, type: string) => {
  return maxLineLength - (type.length + 2 + (scope ? scope.length + 2 : 0));
};

const sanitizeSubject = (subject: string): string => {
  let sanitizedSubject = subject.trim();

  const lowerCasedFirstCharacter = sanitizedSubject.charAt(0).toLowerCase();

  if (lowerCasedFirstCharacter !== sanitizedSubject.charAt(0)) {
    sanitizedSubject =
      lowerCasedFirstCharacter + sanitizedSubject.slice(1, sanitizedSubject.length);
  }

  while (sanitizedSubject.endsWith('.')) {
    sanitizedSubject = sanitizedSubject.slice(0, sanitizedSubject.length - 1);
  }

  return sanitizedSubject;
};

const skipWhenUsingMergeMessage = ({ useMergeMessage }: Record<'useMergeMessage', string>) =>
  !useMergeMessage;

export const run = () => {
  const config = getConfiguration();

  const typeLength = getLongestString(config.types.map(({ type }) => type)).length + 1;

  const typeChoices = config.types.map(({ description, type }) => {
    const prefix = `${type}:`.padEnd(typeLength);

    return { name: `${prefix} ${description}`, value: type };
  });

  const scopeLength = getLongestString(config.scopes?.map(({ type }) => type) ?? []).length + 1;

  const scopeChoices = config.scopes?.map(({ description, type }) => {
    const prefix = `${type}:`.padEnd(scopeLength);

    return { name: `${prefix} ${description}`, value: type };
  });

  const scopePrompt: Commitizen.API.Prompt<'scope' | 'useMergeMessage'> = scopeChoices
    ? {
        choices: scopeChoices,
        message: 'What is the scope of this commit? (press enter to skip)\n',
        name: 'scope',
        type: 'list',
        when: skipWhenUsingMergeMessage,
      }
    : {
        filter: (scope) => scope.trim().toLowerCase(),
        message: 'What is the scope of this commit? (press enter to skip)\n',
        name: 'scope',
        type: 'input',
        when: skipWhenUsingMergeMessage,
      };

  const mergeMsgPath = resolve(execSync('git rev-parse --git-dir').toString().trim(), 'MERGE_MSG');
  const isMerging = existsSync(mergeMsgPath);
  const defaultMergeMsg = isMerging ? readFileSync(mergeMsgPath).toString().trim() : '';
  const hasDefaultMergeMsg = defaultMergeMsg.length > 0;

  return {
    prompter: (
      cz: Commitizen.API.Prompter<
        'breaking' | 'issues' | 'scope' | 'subject' | 'type' | 'useMergeMessage'
      >,
      commit: (message: string) => void
    ) => {
      cz.prompt([
        {
          message:
            'An ongoing merge was detected. Would you like to use the default merge commit message?',
          name: 'useMergeMessage',
          type: 'confirm',
          when: hasDefaultMergeMsg,
        },
        {
          choices: typeChoices,
          message: 'What type of change are you committing?',
          name: 'type',
          when: skipWhenUsingMergeMessage,
          type: 'list',
        },
        scopePrompt,
        {
          filter: sanitizeSubject,
          message: (answers) => {
            return `Write a short, imperative tense description of the commit (max: ${getSubjectMaxLength(
              answers.scope,
              answers.type
            )} chars):\n`;
          },
          name: 'subject',
          transformer: (subject, answers) => {
            const color =
              subject.length <= getSubjectMaxLength(answers.scope, answers.type)
                ? chalk.green
                : chalk.red;

            return color(`(${subject.length}) ${subject}`);
          },
          type: 'input',
          validate: (subject, answers) => {
            const sanitizedSubject = sanitizeSubject(subject);

            if (sanitizedSubject.length === 0) {
              return 'A subject is required';
            }

            const subjectMaxLength = getSubjectMaxLength(answers.scope, answers.type);

            if (sanitizedSubject.length <= subjectMaxLength) {
              return true;
            }

            return `The subject length must be less than or equal to ${subjectMaxLength} characters. The current length is ${subject.length} characters.`;
          },
          when: skipWhenUsingMergeMessage,
        },
        {
          filter: (breaking) => breaking.trim(),
          message:
            'If any, describe the breaking change(s) contained within the commit:  (press enter to skip)\n',
          name: 'breaking',
          type: 'input',
          when: skipWhenUsingMergeMessage,
        },
        {
          filter: (issues) => issues.trim(),
          message: `If any, enter the issues, separated by a space, that are related to this commit: (press enter to skip)\n`,
          name: 'issues',
          type: 'input',
          when: skipWhenUsingMergeMessage,
        },
      ]).then((answers) => {
        const useMergeMessage = Boolean(answers.useMergeMessage);

        if (useMergeMessage) {
          commit(
            wordWrap(defaultMergeMsg, {
              indent: '',
              trim: true,
              width: maxLineLength,
            })
          );

          return;
        }

        let message = `${answers.type}`;

        if (answers.scope && answers.scope !== '*') {
          message += `(${answers.scope})`;
        }

        message += `: ${answers.subject}`;

        if (answers.breaking) {
          message += `\n\nBREAKING CHANGE: ${answers.breaking}`;
        }

        if (answers.issues) {
          const issues = answers.issues
            .split(' ')
            .map((issue) => (issue.charAt(0) === '#' ? issue : `#${issue}`))
            .join(' ');

          message += `\n\n${config.issueReferencesPrefix} ${issues}`;
        }

        commit(
          wordWrap(message, {
            indent: '',
            trim: true,
            width: maxLineLength,
          })
        );
      });
    },
  };
};
