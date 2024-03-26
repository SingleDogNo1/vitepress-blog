---
description: typescript 内置泛型汇总
sticky: 3
tags:
  - javascript
  - typescript
categories:
  - javascript
  - typescript
---
# typescript 内置泛型

日常使用泛型就那么几个，其他没用过的就不熟悉了，汇总一下查漏补缺

## 变为可选 - Partial

```ts
type Foo = { a: number; b: number; }

const foo: Partial<Foo> = { a: 2 } // b 是可选的，可以不定义
```

## 变为必选 - Required

```ts
type Foo = { a?: number; b?: number; }

const foo: Required<Foo> = { a: 2 } // 错误, b 是必选的，必须定义
```

## 变为只读 - Readonly

```ts
type Foo = { a: number; b: number; }

const foo: Readonly<Foo> = { a: 2, b: 2 } 
foo.a = 3 // 错误, a 只能读取，不能赋值
```

## 定义对象 - Record

```ts
type Foo = Record<string, string>

const foo: Readonly<Foo> = { a: 2 } // 错误，值只能是 string
```

## 集合中取值 - Pick

```ts
type Foo = { a: number; b: number; }

const foo: Pick<Foo, 'a'> = { b: 1 } // 错误，当前只包含 a 不存在 b
```

## 集合中删除值 - Omit

```ts
type Foo = { a: number; b: number; }

const foo: Omit<Foo, 'a'> = { a: 1 } // 错误，a 被排除掉，当前只存在 b
```

## 集合中取并集 - Exclude

```ts
type Exclude<T, U> = T extends U ? never : T;
```

它的作用是从 `T` 中排除掉所有包含的 `U` 属性。如下示例，`foo`结果只包含 `b` ，这是因为`Exclude`会从第一个类型参数中将其所有包含的第二个类型参数中的值给排除掉。我们可以看到在第一个类型参数中只包含第二个类型参数中的 `b`，因此，它就会被排除掉，只剩下 `b` 了

```ts
type Bar = 'a' | 'b' | 'c' | 'd'
type Foo = 'a' | 'c' | 'd' | 'f'

export const foo: Exclude<Bar, Foo> = 'b'
```

## 集合中取交集 - Extract

```ts
type Extract<T, U> = T extends U ? T : never;
```

它的作用正好和上面的`Exclude`相反。从 `T` 中提取出所有包含的 `U` 属性值。

```ts
type Event =
  | {
      type: 'mousedown'
      x: number
      y: number
    }
  | {
      type: 'mouseup'
      x: number
      y: number
    }
  | {
      type: 'blur'
    }

type ClickEvent = Extract<Event, { x: number }>

// ==> { type: 'mousedown'; x: number; y: number } | { type: 'mouseup'; x: number; y: number }
```

## 非空断言 - NonNullable

```ts
type TFoo = 1 | null | undefined;

const foo: Foo = 1

foo = null // 错误，已经不能是 null 了
```

## 获取函数参数类型 -- Parameters

它的作用是用来获取一个函数的参数类型，而且返回的是<HighlightText msg="只能包含一组类型的数组。" />

```ts
type Func = (user: string) => void
type Param = Parameters<Func>

let p: Param = ['1']
```

## 获取类的构造函数参数类型 - ConstructorParameters

它的作用是用来获取一个类的构造函数参数类型，并以数组的形式返回。参考示例

```ts
class Foo {
  constructor(x: string, y: number){
    console.log(x, y)
  }
}

const foo: ConstructorParameters<typeof Foo> = ['1', 2]
```

## 获取函数返回值类型 - ReturnType

它用来得到一个函数的返回值类型。参考示例

```ts
type Func = (value: number) => string

const foo: ReturnType<Func> = '1'
```

## 获取类的实例类型 - InstanceType

它的作用是获取一个类的实例类型，可以用获取到的实例类型来约束一个变量的赋值必须和类的成员类型完全一样才可以。参考示例

```ts
class Foo {
  public x = '1'
  public y = 2

  public say = (value: string) => {
    console.log(value)
  }
}
```
