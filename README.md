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

- [✨ Features](#✨-features)
- [🚀 Examples](#-examples)
  - [Basic](#basic)
  - [Fine-grained](#fine-grained)
  - [Suspense](#suspense)
- [📚 Documentation](#📚-documentation)
- [License](#license)

**Particule** is an atomic React state management library inspired by the best of [Recoil](https://recoiljs.org/), [Jotai](https://jotai.pmnd.rs/) and [Redux](https://redux.js.org/). You can choose **which component subscribe to which state** and so **avoid useless re-render and computations**.

## ✨ Features

- **TypeScript** ready
- **Suspense** support
- **Super-easy** API
- **Minimal** footprint <sub>(1kB gzipped)</sub>

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
    </Suspense
  )
}
```

## 📚 Documentation

## License

[MIT](./LICENSE)
