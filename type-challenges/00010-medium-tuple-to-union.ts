/*
  10 - Tuple to Union
  -------
  by Anthony Fu (@antfu) #medium #infer #tuple #union

  ### Question

  Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.

  For example

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > View on GitHub: https://tsch.js.org/10
*/

/* _____________ Your Code Here _____________ */

export type TupleToUnion<T> = T extends Array<infer ITEMS> ? ITEMS : never
// export type TupleToUnion<T extends any[]> = T[number]
/**
 * T extends Array<infer ITEMS>：这是一个条件类型，用于检查 T 是否是一个数组（元组）。如果是，则使用 infer 关键字提取数组中的元素类型，并将其命名为 ITEMS。
ITEMS：如果 T 是一个数组，则 ITEMS 是数组中元素的类型。
: never：如果 T 不是一个数组，则返回 never 类型。
因此，TupleToUnion<T> 的作用是将元组 T 中的所有元素类型提取出来，并将它们组合成一个联合类型。
由于 T 是一个元组类型，ITEMS 会被推断为元组中每个元素的类型。TypeScript 会将这些类型组合成一个联合类型，因为 ITEMS 代表了元组中所有可能的元素类型。
 */

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10/answer
  > View solutions: https://tsch.js.org/10/solutions
  > More Challenges: https://tsch.js.org
*/
