Associations in MongoDB refer to the relationships between different collections (or documents) in a MongoDB database. The associations can be of different types, such as one-to-one, one-to-many, and many-to-many.

In MongoDB, there are several ways to implement associations:

    Embedding: This is when you embed the documents from one collection within the documents of another collection. For example, if you have a collection of users and a collection of addresses, you could embed the addresses documents within the user documents.

    Linking: This is when you link the documents of one collection to the documents of another collection using a reference field. For example, if you have a collection of posts and a collection of comments, you could link the comments to the posts by storing the post ID in the comments collection.

    Hybrid: This is a combination of embedding and linking, where you can use both techniques to store the data.


    2 books for Joshua -> Dunghill & solar
    1 book for Folake -> Asaka