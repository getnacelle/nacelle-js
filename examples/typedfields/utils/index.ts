export function isNonNullNode<
  T extends Record<string, unknown> | null | undefined
>(x: T): x is NonNullable<typeof x> {
  return Boolean(x);
}
