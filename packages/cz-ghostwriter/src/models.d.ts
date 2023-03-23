declare namespace Ghostwriter {
  namespace Models {
    type Configuration = {
      /** The array of prefixes used to detect references to issues. */
      issuePrefixes: string[];

      /** The prefix to use before listing issues that a commit refers to. Defaults to `"for"`. */
      issueReferencesPrefix: string;

      /** The array of scopes that are available for selection when commiting. */
      scopes: Scope[];

      /**
       * The array of type objects representing the explicitly supported commit message
       * types, and whether they should show up in generated CHANGELOGs.
       */
      types: Array<HiddenType | VisibleType>;
    };

    type CommitType = { description: string; type: string };

    type HiddenType = CommitType & { hidden: true; section: undefined };

    type Scope = { description: string; type: string };

    type VisibleType = CommitType & { hidden: undefined; section: string };
  }
}
