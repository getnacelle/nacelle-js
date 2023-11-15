export function isNonNullNode<
  T extends Record<string, unknown> | null | undefined
>(x: T): x is NonNullable<T> {
  return Boolean(x);
}
