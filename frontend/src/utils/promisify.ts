export type ParamType<T> = T extends (arg: infer R) => any ? R : never
export type SuccessCallbackType<T> = T extends { success?: infer C } ? C : never
export type OptionType<T> = T extends {} ? Omit<T, 'success' | 'fail' | 'complete'> : never

/**
 * 将 API 转换为 Promise 风格
 * @example
 * const { data } = await promisify(uni.request)({
 *   url: '/',
 *   method: 'GET'
 * });
 */
export function promisify<
  Fn extends (option?: any) => any,
  Option extends OptionType<ParamType<Fn>>,
  Result extends ParamType<SuccessCallbackType<ParamType<Fn>>>,
>(fn: Fn): (option?: Option) => Promise<Result> {
  return option =>
    new Promise((resolve, reject) => {
      fn({
        ...option,
        success: (res: Result) => resolve(res),
        fail: (err: unknown) => reject(err),
      })
    })
}
