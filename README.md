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

<a href="">
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

<a href="">
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
  const [text, setText] = useAtom(textAtom)

  return (
    <>
      <Text />
      <Button />
    </>
  )
}
```

### Composition

<a href="">
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

<a href="">
  <img src="https://img.shields.io/badge/code-sandbox-black" />
</a>

```tsx
const nameAtom = useAtom(async () => await fetch('https://api.namefake.com/').json())

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

### Custom `atom` with hooks

<a href="">
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
