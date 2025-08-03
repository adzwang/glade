interface ImportMeta {
  glob<Eager extends boolean = false, Module = unknown>(
    pattern: string,
    options?: { eager?: Eager }
  ): Record<string, Module>;
}
