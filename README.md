<p align="center">
    <h1 align="center">particule</h1>
</p>

<p align="center">
    <a href="https://github.com/QuiiBz/particule/actions">
        <img src="https://github.com/QuiiBz/particule/workflows/CI/badge.svg" />
    </a>
    <a href="https://github.com/QuiiBz/particule/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/Licence-MIT-blue" />
    </a>
</p>

<p align="center">
  <a href="#fine-grained">Fine-grained</a> <b>atomic</b> React state management library
  <br />
  <br />
  <code>yarn add particule</code>
</p>

---

- [✨ Features](#-features)
- [🚀 Examples](#-examples)
  - [Basic](#basic)
  - [Fine-grained](#fine-grained)
  - [Composition](#composition)
  - [Suspense](#suspense)
  - [Dispatch](#dispatch)
  - [Custom `atom` with hooks](#custom-atom-with-hooks)
- [📚 Documentation](#-documentation)
- [License](#license)

**Particule** is an atomic React state management library inspired by the best of [Recoil](https://recoiljs.org/), [Jotai](https://jotai.pmnd.rs/) and [Redux](https://redux.js.org/). You can choose **which component subscribe to which state** and so **avoid useless re-render and computations**.

## ✨ Features

- **Super-easy** API
- **TypeScript** ready
- **Suspense** support
- **Minimal** footprint <sub>(1kB gzipped)</sub>
- **Hooks** to add functionality

## 🚀 Examples

### Basic

<a href="https://codesandbox.io/s/basic-example-particule-l79zc?file=/src/App.tsx" target="_blank">
  <img src="https://img.shields.io/badge/code-sandbox-black" />
</a>

```tsx
const textAtom = atom('Hello world!')

function App() {
  const [text, setText] = useAtom(textAtom)

  return (
    <>
      <p>{text}</p>
      <button onClick={() => setText('Updated!')}>Update</button>
    </>
  )
}
```

### Fine-grained

<a href="https://codesandbox.io/s/fine-grained-example-particule-lxnse?file=/src/App.tsx:0-453" target="_blank">
  <img src="https://img.shields.io/badge/code-sandbox-black" />
</a>

```tsx
const textAtom = atom('Hello world!')

function Text() {
  const text = useGetAtom(textAtom)

  return <p>{text}</p>
}

// Won't re-render!
function Button() {
  const setText = useSetAtom(textAtom)

  return <button onClick={() => setText('Updated!')}>Update</button>
}

// Won't re-render!
function App() {
  return (
    <>
      <Text />
      <Button />
    </>
  )
}
```

### Composition

<a href="https://codesandbox.io/s/composition-example-particule-7ln35?file=/src/App.tsx" target="_blank">
  <img src="https://img.shields.io/badge/code-sandbox-black" />
</a>

```tsx
const eurosAtom = atom(10)
const dollarsAtom = atom(get => get(eurosAtom) * 1.15)

function App() {
  const [euros, setEuros] = useAtom(eurosAtom)
  const [dollars, setDollars] = useAtom(dollarsAtom)

  return (
    <>
      <input onChange={({ target }) => setEuros(target.value)} value={euros} />
      <input onChange={({ target }) => setDollars(target.value)} value={dollars} />
    </>
  )
}
```

### Suspense

<a href="https://codesandbox.io/s/suspense-example-particule-w5gj1?file=/src/App.tsx" target="_blank">
  <img src="https://img.shields.io/badge/code-sandbox-black" />
</a>

```tsx
const nameAtom = atom(async () => {
  const json = await (await fetch("https://randomuser.me/api/")).json();

  return json.results[0].name.first;
});

function Name() {
  const name = useGetAtom(nameAtom)

  return <p>My name is {name}</p>
}

function App() {
  return (
    <Suspense fallback='Loading...'>
      <Name />
    </Suspense>
  )
}
```

### Dispatch

<a href="https://codesandbox.io/s/dispatch-particule-0p60u?file=/src/App.tsx" target="_blank">
  <img src="https://img.shields.io/badge/code-sandbox-black" />
</a>

```tsx
const counterAtom = atom(0)
const dispatchCounter = dispatch(counterAtom, value => ({
  increment: (newValue: number) => value + newValue,
  decrement: (newValue: number) => value - newValue,
}))

function App() {
  const counter = useGetAtom(counterAtom)

  return (
    <>
      <p>{counter}</p>
      <button onClick={() => dispatchCounter('increment', 1)}>Increment</button>
      <button onClick={() => dispatchCounter('decrement', 1)}>Decrement</button>
    </>
  )
}
```

### Custom `atom` with hooks

<a href="https://codesandbox.io/s/custom-atom-with-hooks-example-particule-yifif?file=/src/App.tsx" target="_blank">
  <img src="https://img.shields.io/badge/code-sandbox-black" />
</a>

```tsx
const noZeroAtom = createAtom({
  beforeValueSet: (_, value) => {
    if (value === 0) {
      throw new Error('Cannot set value to 0')
    }

    return value
  }
})

const counterAtom = noZeroAtom(3)

function App() {
  const [count, setCount] = useAtom(counterAtom)

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count => count - 1)}>Reduce</button>
    </>
  )
}
```

## 📚 Documentation

See the website at [particule.vercel.app](https://particule.vercel.app/).
<sub>Hosted on [Vercel](https://vercel.com/).</sub>

## License

[MIT](./LICENSE)
