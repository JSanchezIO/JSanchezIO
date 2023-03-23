declare namespace Commitizen {
  namespace API {
    type Prompt<TAnswers extends string> =
      | {
          filter?: (value: string) => string;
          message: string | ((answers: Record<TAnswers, string>) => string);
          name: TAnswers;
          transformer?: (value: string, answers: Record<TAnswers, string>) => string;
          validate?: (value: string, answers: Record<TAnswers, string>) => boolean | string;
          when?: boolean | ((answers: Record<TAnswers, string>) => boolean);
        } & (
          | {
              default?: boolean;
              type: 'confirm';
            }
          | {
              default?: string;
              type: 'input';
            }
          | {
              default?: string;
              choices: Array<{ name: string; value: string }>;
              type: 'list';
            }
        );

    type Prompter<TAnswers extends string> = {
      prompt: (
        prompts: Array<Commitizen.API.Prompt<TAnswers>>
      ) => Promise<Record<TAnswers, string>>;
    };
  }
}
