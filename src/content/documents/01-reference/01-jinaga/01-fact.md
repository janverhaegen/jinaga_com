---
title: fact
---

Creates a new fact.
This method is asynchronous.
It will be resolved when the fact has been persisted.
It returns the fact that was just created.

```typescript
fact<T>(
    prototype: T
    ): Promise<T>;
```

## Parameters

* **prototype** - The fact to save and share

## Returns

* A promise that resolves to the fact that was just persisted

## Throws

* **Specify the type of the fact** if the `type` field is not provided

## Examples

Create a simple top-level fact.

```typescript
const tagReact = await j.fact({
    type: 'Blog.Tag',
    name: 'React'
});
```

Create a fact with a single predecessor.

```typescript
const post = await j.fact({
    type: 'Blog.Post',
    created: new Date(),    // Will be converted to an ISO string, such as '2018-12-23T22:46:02.487Z'.
    author: person          // Where person is the result of a previous j.fact.
});
```

Create a fact with multiple predecessors.

```typescript
await j.fact({
    type: 'Blog.Post.Tags',
    post: post,
    tags: [tagReact, tagCss, tagMicroFrontends]
});
```

You can specify the predecessors inline.
The predecessor facts will be persisted first.
However, persistence is not guaranteed to be atomic.

```typescript
await j.fact({
    type: 'Blog.Post.Tags',
    post: {
        type: 'Blog.Post',
        created: new Date(),
        author: person
    },
    tags: [{
        type: 'Blog.Topic',
        name: 'React'
    }, {
        type: 'Blog.Topic',
        name: 'CSS'
    }, {
        type: 'Blog.Topic',
        name: 'Micro-Frontends'
    }]
});