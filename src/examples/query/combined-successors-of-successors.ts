(async () => {
    const person = await populateData();

    // This one template function matches two levels deep.
    // This makes it match grandchildren.
    function tagsForPostsByAuthor(a) {
        return j.match({
            type: 'Blog.Post.Tags',
            post: {
                type: 'Blog.Post',
                author: a
            }
        });
    }
    
    const tags = await j.query(person, j.for(tagsForPostsByAuthor));

    console.log(JSON.stringify(tags, null, 2));
})();

async function populateData() {
    const person = await j.fact({
        type: 'Jinaga.User',
        publicKey: '---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---'
    });

    await j.fact({
        type: 'Blog.Post.Tags',
        post: {
            type: 'Blog.Post',
            author: person,
            title: 'What is Historical Modeling?'
        },
        tags: [ createTag('Historical Modeling') ]
    });

    await j.fact({
        type: 'Blog.Post.Tags',
        post: {
            type: 'Blog.Post',
            author: person,
            title: 'Idempotency'
        },
        tags: [ createTag('Historical Modeling'), createTag('Math') ]
    });

    await j.fact({
        type: 'Blog.Post.Tags',
        post: {
            type: 'Blog.Post',
            author: person,
            title: 'What Two Generals Can Teach Us About Web APIs'
        },
        tags: [ createTag('Historical Modeling'), createTag('REST') ]
    });

    return person;
}

function createTag(name) {
    return {
        type: 'Blog.Tag',
        name
    };
}