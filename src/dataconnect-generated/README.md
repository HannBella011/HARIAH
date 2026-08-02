# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetMessage*](#getmessage)
  - [*ListMessages*](#listmessages)
  - [*GetTrack*](#gettrack)
  - [*ListTracks*](#listtracks)
  - [*GetReaction*](#getreaction)
  - [*ListReactions*](#listreactions)
  - [*GetFriendship*](#getfriendship)
  - [*ListFollowers*](#listfollowers)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*SendMessage*](#sendmessage)
  - [*UpdateMessage*](#updatemessage)
  - [*DeleteMessage*](#deletemessage)
  - [*AddTrack*](#addtrack)
  - [*UpdateTrack*](#updatetrack)
  - [*DeleteTrack*](#deletetrack)
  - [*AddReaction*](#addreaction)
  - [*UpdateReaction*](#updatereaction)
  - [*DeleteReaction*](#deletereaction)
  - [*FollowUser*](#followuser)
  - [*UpdateFriendship*](#updatefriendship)
  - [*DeleteFriendship*](#deletefriendship)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    username: string;
    email: string;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    username: string;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetMessage
You can execute the `GetMessage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMessage(options?: ExecuteQueryOptions): QueryPromise<GetMessageData, undefined>;

interface GetMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMessageData, undefined>;
}
export const getMessageRef: GetMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMessage(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMessageData, undefined>;

interface GetMessageRef {
  ...
  (dc: DataConnect): QueryRef<GetMessageData, undefined>;
}
export const getMessageRef: GetMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMessageRef:
```typescript
const name = getMessageRef.operationName;
console.log(name);
```

### Variables
The `GetMessage` query has no variables.
### Return Type
Recall that executing the `GetMessage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMessageData {
  message?: {
    caption?: string | null;
  };
}
```
### Using `GetMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMessage } from '@dataconnect/generated';


// Call the `getMessage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMessage();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMessage(dataConnect);

console.log(data.message);

// Or, you can use the `Promise` API.
getMessage().then((response) => {
  const data = response.data;
  console.log(data.message);
});
```

### Using `GetMessage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMessageRef } from '@dataconnect/generated';


// Call the `getMessageRef()` function to get a reference to the query.
const ref = getMessageRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMessageRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.message);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.message);
});
```

## ListMessages
You can execute the `ListMessages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMessages(options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, undefined>;

interface ListMessagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMessagesData, undefined>;
}
export const listMessagesRef: ListMessagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMessages(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, undefined>;

interface ListMessagesRef {
  ...
  (dc: DataConnect): QueryRef<ListMessagesData, undefined>;
}
export const listMessagesRef: ListMessagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMessagesRef:
```typescript
const name = listMessagesRef.operationName;
console.log(name);
```

### Variables
The `ListMessages` query has no variables.
### Return Type
Recall that executing the `ListMessages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMessagesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMessagesData {
  messages: ({
    caption?: string | null;
  })[];
}
```
### Using `ListMessages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMessages } from '@dataconnect/generated';


// Call the `listMessages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMessages();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMessages(dataConnect);

console.log(data.messages);

// Or, you can use the `Promise` API.
listMessages().then((response) => {
  const data = response.data;
  console.log(data.messages);
});
```

### Using `ListMessages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMessagesRef } from '@dataconnect/generated';


// Call the `listMessagesRef()` function to get a reference to the query.
const ref = listMessagesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMessagesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.messages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.messages);
});
```

## GetTrack
You can execute the `GetTrack` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTrack(options?: ExecuteQueryOptions): QueryPromise<GetTrackData, undefined>;

interface GetTrackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTrackData, undefined>;
}
export const getTrackRef: GetTrackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTrack(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTrackData, undefined>;

interface GetTrackRef {
  ...
  (dc: DataConnect): QueryRef<GetTrackData, undefined>;
}
export const getTrackRef: GetTrackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTrackRef:
```typescript
const name = getTrackRef.operationName;
console.log(name);
```

### Variables
The `GetTrack` query has no variables.
### Return Type
Recall that executing the `GetTrack` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTrackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTrackData {
  musicLibrary?: {
    title: string;
  };
}
```
### Using `GetTrack`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTrack } from '@dataconnect/generated';


// Call the `getTrack()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTrack();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTrack(dataConnect);

console.log(data.musicLibrary);

// Or, you can use the `Promise` API.
getTrack().then((response) => {
  const data = response.data;
  console.log(data.musicLibrary);
});
```

### Using `GetTrack`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTrackRef } from '@dataconnect/generated';


// Call the `getTrackRef()` function to get a reference to the query.
const ref = getTrackRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTrackRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.musicLibrary);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.musicLibrary);
});
```

## ListTracks
You can execute the `ListTracks` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTracks(options?: ExecuteQueryOptions): QueryPromise<ListTracksData, undefined>;

interface ListTracksRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTracksData, undefined>;
}
export const listTracksRef: ListTracksRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTracks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTracksData, undefined>;

interface ListTracksRef {
  ...
  (dc: DataConnect): QueryRef<ListTracksData, undefined>;
}
export const listTracksRef: ListTracksRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTracksRef:
```typescript
const name = listTracksRef.operationName;
console.log(name);
```

### Variables
The `ListTracks` query has no variables.
### Return Type
Recall that executing the `ListTracks` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTracksData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTracksData {
  musicLibraries: ({
    title: string;
  })[];
}
```
### Using `ListTracks`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTracks } from '@dataconnect/generated';


// Call the `listTracks()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTracks();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTracks(dataConnect);

console.log(data.musicLibraries);

// Or, you can use the `Promise` API.
listTracks().then((response) => {
  const data = response.data;
  console.log(data.musicLibraries);
});
```

### Using `ListTracks`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTracksRef } from '@dataconnect/generated';


// Call the `listTracksRef()` function to get a reference to the query.
const ref = listTracksRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTracksRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.musicLibraries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.musicLibraries);
});
```

## GetReaction
You can execute the `GetReaction` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getReaction(options?: ExecuteQueryOptions): QueryPromise<GetReactionData, undefined>;

interface GetReactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetReactionData, undefined>;
}
export const getReactionRef: GetReactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getReaction(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetReactionData, undefined>;

interface GetReactionRef {
  ...
  (dc: DataConnect): QueryRef<GetReactionData, undefined>;
}
export const getReactionRef: GetReactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getReactionRef:
```typescript
const name = getReactionRef.operationName;
console.log(name);
```

### Variables
The `GetReaction` query has no variables.
### Return Type
Recall that executing the `GetReaction` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetReactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetReactionData {
  reaction?: {
    emoji: string;
  };
}
```
### Using `GetReaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getReaction } from '@dataconnect/generated';


// Call the `getReaction()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getReaction();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getReaction(dataConnect);

console.log(data.reaction);

// Or, you can use the `Promise` API.
getReaction().then((response) => {
  const data = response.data;
  console.log(data.reaction);
});
```

### Using `GetReaction`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getReactionRef } from '@dataconnect/generated';


// Call the `getReactionRef()` function to get a reference to the query.
const ref = getReactionRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getReactionRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reaction);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reaction);
});
```

## ListReactions
You can execute the `ListReactions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listReactions(options?: ExecuteQueryOptions): QueryPromise<ListReactionsData, undefined>;

interface ListReactionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListReactionsData, undefined>;
}
export const listReactionsRef: ListReactionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listReactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListReactionsData, undefined>;

interface ListReactionsRef {
  ...
  (dc: DataConnect): QueryRef<ListReactionsData, undefined>;
}
export const listReactionsRef: ListReactionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listReactionsRef:
```typescript
const name = listReactionsRef.operationName;
console.log(name);
```

### Variables
The `ListReactions` query has no variables.
### Return Type
Recall that executing the `ListReactions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListReactionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListReactionsData {
  reactions: ({
    emoji: string;
  })[];
}
```
### Using `ListReactions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listReactions } from '@dataconnect/generated';


// Call the `listReactions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listReactions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listReactions(dataConnect);

console.log(data.reactions);

// Or, you can use the `Promise` API.
listReactions().then((response) => {
  const data = response.data;
  console.log(data.reactions);
});
```

### Using `ListReactions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listReactionsRef } from '@dataconnect/generated';


// Call the `listReactionsRef()` function to get a reference to the query.
const ref = listReactionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listReactionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reactions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reactions);
});
```

## GetFriendship
You can execute the `GetFriendship` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getFriendship(options?: ExecuteQueryOptions): QueryPromise<GetFriendshipData, undefined>;

interface GetFriendshipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetFriendshipData, undefined>;
}
export const getFriendshipRef: GetFriendshipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFriendship(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetFriendshipData, undefined>;

interface GetFriendshipRef {
  ...
  (dc: DataConnect): QueryRef<GetFriendshipData, undefined>;
}
export const getFriendshipRef: GetFriendshipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFriendshipRef:
```typescript
const name = getFriendshipRef.operationName;
console.log(name);
```

### Variables
The `GetFriendship` query has no variables.
### Return Type
Recall that executing the `GetFriendship` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFriendshipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFriendshipData {
  friendship?: {
    status: string;
  };
}
```
### Using `GetFriendship`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFriendship } from '@dataconnect/generated';


// Call the `getFriendship()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFriendship();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFriendship(dataConnect);

console.log(data.friendship);

// Or, you can use the `Promise` API.
getFriendship().then((response) => {
  const data = response.data;
  console.log(data.friendship);
});
```

### Using `GetFriendship`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFriendshipRef } from '@dataconnect/generated';


// Call the `getFriendshipRef()` function to get a reference to the query.
const ref = getFriendshipRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFriendshipRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.friendship);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.friendship);
});
```

## ListFollowers
You can execute the `ListFollowers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listFollowers(options?: ExecuteQueryOptions): QueryPromise<ListFollowersData, undefined>;

interface ListFollowersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFollowersData, undefined>;
}
export const listFollowersRef: ListFollowersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFollowers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFollowersData, undefined>;

interface ListFollowersRef {
  ...
  (dc: DataConnect): QueryRef<ListFollowersData, undefined>;
}
export const listFollowersRef: ListFollowersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFollowersRef:
```typescript
const name = listFollowersRef.operationName;
console.log(name);
```

### Variables
The `ListFollowers` query has no variables.
### Return Type
Recall that executing the `ListFollowers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFollowersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFollowersData {
  friendships: ({
    follower: {
      username: string;
    };
  })[];
}
```
### Using `ListFollowers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFollowers } from '@dataconnect/generated';


// Call the `listFollowers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFollowers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFollowers(dataConnect);

console.log(data.friendships);

// Or, you can use the `Promise` API.
listFollowers().then((response) => {
  const data = response.data;
  console.log(data.friendships);
});
```

### Using `ListFollowers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFollowersRef } from '@dataconnect/generated';


// Call the `listFollowersRef()` function to get a reference to the query.
const ref = listFollowersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFollowersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.friendships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.friendships);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has no variables.
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser } from '@dataconnect/generated';


// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser().then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef } from '@dataconnect/generated';


// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## SendMessage
You can execute the `SendMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
sendMessage(): MutationPromise<SendMessageData, undefined>;

interface SendMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SendMessageData, undefined>;
}
export const sendMessageRef: SendMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
sendMessage(dc: DataConnect): MutationPromise<SendMessageData, undefined>;

interface SendMessageRef {
  ...
  (dc: DataConnect): MutationRef<SendMessageData, undefined>;
}
export const sendMessageRef: SendMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the sendMessageRef:
```typescript
const name = sendMessageRef.operationName;
console.log(name);
```

### Variables
The `SendMessage` mutation has no variables.
### Return Type
Recall that executing the `SendMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SendMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SendMessageData {
  message_insert: Message_Key;
}
```
### Using `SendMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, sendMessage } from '@dataconnect/generated';


// Call the `sendMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await sendMessage();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await sendMessage(dataConnect);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
sendMessage().then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

### Using `SendMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, sendMessageRef } from '@dataconnect/generated';


// Call the `sendMessageRef()` function to get a reference to the mutation.
const ref = sendMessageRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = sendMessageRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

## UpdateMessage
You can execute the `UpdateMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMessage(): MutationPromise<UpdateMessageData, undefined>;

interface UpdateMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateMessageData, undefined>;
}
export const updateMessageRef: UpdateMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMessage(dc: DataConnect): MutationPromise<UpdateMessageData, undefined>;

interface UpdateMessageRef {
  ...
  (dc: DataConnect): MutationRef<UpdateMessageData, undefined>;
}
export const updateMessageRef: UpdateMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMessageRef:
```typescript
const name = updateMessageRef.operationName;
console.log(name);
```

### Variables
The `UpdateMessage` mutation has no variables.
### Return Type
Recall that executing the `UpdateMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMessageData {
  message_update?: Message_Key | null;
}
```
### Using `UpdateMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMessage } from '@dataconnect/generated';


// Call the `updateMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMessage();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMessage(dataConnect);

console.log(data.message_update);

// Or, you can use the `Promise` API.
updateMessage().then((response) => {
  const data = response.data;
  console.log(data.message_update);
});
```

### Using `UpdateMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMessageRef } from '@dataconnect/generated';


// Call the `updateMessageRef()` function to get a reference to the mutation.
const ref = updateMessageRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMessageRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_update);
});
```

## DeleteMessage
You can execute the `DeleteMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMessage(): MutationPromise<DeleteMessageData, undefined>;

interface DeleteMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMessageData, undefined>;
}
export const deleteMessageRef: DeleteMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMessage(dc: DataConnect): MutationPromise<DeleteMessageData, undefined>;

interface DeleteMessageRef {
  ...
  (dc: DataConnect): MutationRef<DeleteMessageData, undefined>;
}
export const deleteMessageRef: DeleteMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMessageRef:
```typescript
const name = deleteMessageRef.operationName;
console.log(name);
```

### Variables
The `DeleteMessage` mutation has no variables.
### Return Type
Recall that executing the `DeleteMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMessageData {
  message_delete?: Message_Key | null;
}
```
### Using `DeleteMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMessage } from '@dataconnect/generated';


// Call the `deleteMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMessage();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMessage(dataConnect);

console.log(data.message_delete);

// Or, you can use the `Promise` API.
deleteMessage().then((response) => {
  const data = response.data;
  console.log(data.message_delete);
});
```

### Using `DeleteMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMessageRef } from '@dataconnect/generated';


// Call the `deleteMessageRef()` function to get a reference to the mutation.
const ref = deleteMessageRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMessageRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_delete);
});
```

## AddTrack
You can execute the `AddTrack` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addTrack(): MutationPromise<AddTrackData, undefined>;

interface AddTrackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<AddTrackData, undefined>;
}
export const addTrackRef: AddTrackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addTrack(dc: DataConnect): MutationPromise<AddTrackData, undefined>;

interface AddTrackRef {
  ...
  (dc: DataConnect): MutationRef<AddTrackData, undefined>;
}
export const addTrackRef: AddTrackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addTrackRef:
```typescript
const name = addTrackRef.operationName;
console.log(name);
```

### Variables
The `AddTrack` mutation has no variables.
### Return Type
Recall that executing the `AddTrack` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddTrackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddTrackData {
  musicLibrary_insert: MusicLibrary_Key;
}
```
### Using `AddTrack`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addTrack } from '@dataconnect/generated';


// Call the `addTrack()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addTrack();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addTrack(dataConnect);

console.log(data.musicLibrary_insert);

// Or, you can use the `Promise` API.
addTrack().then((response) => {
  const data = response.data;
  console.log(data.musicLibrary_insert);
});
```

### Using `AddTrack`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addTrackRef } from '@dataconnect/generated';


// Call the `addTrackRef()` function to get a reference to the mutation.
const ref = addTrackRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addTrackRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.musicLibrary_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.musicLibrary_insert);
});
```

## UpdateTrack
You can execute the `UpdateTrack` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTrack(): MutationPromise<UpdateTrackData, undefined>;

interface UpdateTrackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateTrackData, undefined>;
}
export const updateTrackRef: UpdateTrackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTrack(dc: DataConnect): MutationPromise<UpdateTrackData, undefined>;

interface UpdateTrackRef {
  ...
  (dc: DataConnect): MutationRef<UpdateTrackData, undefined>;
}
export const updateTrackRef: UpdateTrackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTrackRef:
```typescript
const name = updateTrackRef.operationName;
console.log(name);
```

### Variables
The `UpdateTrack` mutation has no variables.
### Return Type
Recall that executing the `UpdateTrack` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTrackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTrackData {
  musicLibrary_update?: MusicLibrary_Key | null;
}
```
### Using `UpdateTrack`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTrack } from '@dataconnect/generated';


// Call the `updateTrack()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTrack();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTrack(dataConnect);

console.log(data.musicLibrary_update);

// Or, you can use the `Promise` API.
updateTrack().then((response) => {
  const data = response.data;
  console.log(data.musicLibrary_update);
});
```

### Using `UpdateTrack`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTrackRef } from '@dataconnect/generated';


// Call the `updateTrackRef()` function to get a reference to the mutation.
const ref = updateTrackRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTrackRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.musicLibrary_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.musicLibrary_update);
});
```

## DeleteTrack
You can execute the `DeleteTrack` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTrack(): MutationPromise<DeleteTrackData, undefined>;

interface DeleteTrackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteTrackData, undefined>;
}
export const deleteTrackRef: DeleteTrackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTrack(dc: DataConnect): MutationPromise<DeleteTrackData, undefined>;

interface DeleteTrackRef {
  ...
  (dc: DataConnect): MutationRef<DeleteTrackData, undefined>;
}
export const deleteTrackRef: DeleteTrackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTrackRef:
```typescript
const name = deleteTrackRef.operationName;
console.log(name);
```

### Variables
The `DeleteTrack` mutation has no variables.
### Return Type
Recall that executing the `DeleteTrack` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTrackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTrackData {
  musicLibrary_delete?: MusicLibrary_Key | null;
}
```
### Using `DeleteTrack`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTrack } from '@dataconnect/generated';


// Call the `deleteTrack()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTrack();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTrack(dataConnect);

console.log(data.musicLibrary_delete);

// Or, you can use the `Promise` API.
deleteTrack().then((response) => {
  const data = response.data;
  console.log(data.musicLibrary_delete);
});
```

### Using `DeleteTrack`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTrackRef } from '@dataconnect/generated';


// Call the `deleteTrackRef()` function to get a reference to the mutation.
const ref = deleteTrackRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTrackRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.musicLibrary_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.musicLibrary_delete);
});
```

## AddReaction
You can execute the `AddReaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addReaction(): MutationPromise<AddReactionData, undefined>;

interface AddReactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<AddReactionData, undefined>;
}
export const addReactionRef: AddReactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addReaction(dc: DataConnect): MutationPromise<AddReactionData, undefined>;

interface AddReactionRef {
  ...
  (dc: DataConnect): MutationRef<AddReactionData, undefined>;
}
export const addReactionRef: AddReactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addReactionRef:
```typescript
const name = addReactionRef.operationName;
console.log(name);
```

### Variables
The `AddReaction` mutation has no variables.
### Return Type
Recall that executing the `AddReaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddReactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddReactionData {
  reaction_insert: Reaction_Key;
}
```
### Using `AddReaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addReaction } from '@dataconnect/generated';


// Call the `addReaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addReaction();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addReaction(dataConnect);

console.log(data.reaction_insert);

// Or, you can use the `Promise` API.
addReaction().then((response) => {
  const data = response.data;
  console.log(data.reaction_insert);
});
```

### Using `AddReaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addReactionRef } from '@dataconnect/generated';


// Call the `addReactionRef()` function to get a reference to the mutation.
const ref = addReactionRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addReactionRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reaction_insert);
});
```

## UpdateReaction
You can execute the `UpdateReaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateReaction(): MutationPromise<UpdateReactionData, undefined>;

interface UpdateReactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateReactionData, undefined>;
}
export const updateReactionRef: UpdateReactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateReaction(dc: DataConnect): MutationPromise<UpdateReactionData, undefined>;

interface UpdateReactionRef {
  ...
  (dc: DataConnect): MutationRef<UpdateReactionData, undefined>;
}
export const updateReactionRef: UpdateReactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateReactionRef:
```typescript
const name = updateReactionRef.operationName;
console.log(name);
```

### Variables
The `UpdateReaction` mutation has no variables.
### Return Type
Recall that executing the `UpdateReaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateReactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateReactionData {
  reaction_update?: Reaction_Key | null;
}
```
### Using `UpdateReaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateReaction } from '@dataconnect/generated';


// Call the `updateReaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateReaction();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateReaction(dataConnect);

console.log(data.reaction_update);

// Or, you can use the `Promise` API.
updateReaction().then((response) => {
  const data = response.data;
  console.log(data.reaction_update);
});
```

### Using `UpdateReaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateReactionRef } from '@dataconnect/generated';


// Call the `updateReactionRef()` function to get a reference to the mutation.
const ref = updateReactionRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateReactionRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reaction_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reaction_update);
});
```

## DeleteReaction
You can execute the `DeleteReaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteReaction(): MutationPromise<DeleteReactionData, undefined>;

interface DeleteReactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteReactionData, undefined>;
}
export const deleteReactionRef: DeleteReactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteReaction(dc: DataConnect): MutationPromise<DeleteReactionData, undefined>;

interface DeleteReactionRef {
  ...
  (dc: DataConnect): MutationRef<DeleteReactionData, undefined>;
}
export const deleteReactionRef: DeleteReactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteReactionRef:
```typescript
const name = deleteReactionRef.operationName;
console.log(name);
```

### Variables
The `DeleteReaction` mutation has no variables.
### Return Type
Recall that executing the `DeleteReaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteReactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteReactionData {
  reaction_delete?: Reaction_Key | null;
}
```
### Using `DeleteReaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteReaction } from '@dataconnect/generated';


// Call the `deleteReaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteReaction();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteReaction(dataConnect);

console.log(data.reaction_delete);

// Or, you can use the `Promise` API.
deleteReaction().then((response) => {
  const data = response.data;
  console.log(data.reaction_delete);
});
```

### Using `DeleteReaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteReactionRef } from '@dataconnect/generated';


// Call the `deleteReactionRef()` function to get a reference to the mutation.
const ref = deleteReactionRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteReactionRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reaction_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reaction_delete);
});
```

## FollowUser
You can execute the `FollowUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
followUser(): MutationPromise<FollowUserData, undefined>;

interface FollowUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<FollowUserData, undefined>;
}
export const followUserRef: FollowUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
followUser(dc: DataConnect): MutationPromise<FollowUserData, undefined>;

interface FollowUserRef {
  ...
  (dc: DataConnect): MutationRef<FollowUserData, undefined>;
}
export const followUserRef: FollowUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the followUserRef:
```typescript
const name = followUserRef.operationName;
console.log(name);
```

### Variables
The `FollowUser` mutation has no variables.
### Return Type
Recall that executing the `FollowUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FollowUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface FollowUserData {
  friendship_insert: Friendship_Key;
}
```
### Using `FollowUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, followUser } from '@dataconnect/generated';


// Call the `followUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await followUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await followUser(dataConnect);

console.log(data.friendship_insert);

// Or, you can use the `Promise` API.
followUser().then((response) => {
  const data = response.data;
  console.log(data.friendship_insert);
});
```

### Using `FollowUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, followUserRef } from '@dataconnect/generated';


// Call the `followUserRef()` function to get a reference to the mutation.
const ref = followUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = followUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.friendship_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.friendship_insert);
});
```

## UpdateFriendship
You can execute the `UpdateFriendship` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateFriendship(): MutationPromise<UpdateFriendshipData, undefined>;

interface UpdateFriendshipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateFriendshipData, undefined>;
}
export const updateFriendshipRef: UpdateFriendshipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFriendship(dc: DataConnect): MutationPromise<UpdateFriendshipData, undefined>;

interface UpdateFriendshipRef {
  ...
  (dc: DataConnect): MutationRef<UpdateFriendshipData, undefined>;
}
export const updateFriendshipRef: UpdateFriendshipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFriendshipRef:
```typescript
const name = updateFriendshipRef.operationName;
console.log(name);
```

### Variables
The `UpdateFriendship` mutation has no variables.
### Return Type
Recall that executing the `UpdateFriendship` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFriendshipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFriendshipData {
  friendship_update?: Friendship_Key | null;
}
```
### Using `UpdateFriendship`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFriendship } from '@dataconnect/generated';


// Call the `updateFriendship()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFriendship();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFriendship(dataConnect);

console.log(data.friendship_update);

// Or, you can use the `Promise` API.
updateFriendship().then((response) => {
  const data = response.data;
  console.log(data.friendship_update);
});
```

### Using `UpdateFriendship`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFriendshipRef } from '@dataconnect/generated';


// Call the `updateFriendshipRef()` function to get a reference to the mutation.
const ref = updateFriendshipRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFriendshipRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.friendship_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.friendship_update);
});
```

## DeleteFriendship
You can execute the `DeleteFriendship` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteFriendship(): MutationPromise<DeleteFriendshipData, undefined>;

interface DeleteFriendshipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteFriendshipData, undefined>;
}
export const deleteFriendshipRef: DeleteFriendshipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFriendship(dc: DataConnect): MutationPromise<DeleteFriendshipData, undefined>;

interface DeleteFriendshipRef {
  ...
  (dc: DataConnect): MutationRef<DeleteFriendshipData, undefined>;
}
export const deleteFriendshipRef: DeleteFriendshipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFriendshipRef:
```typescript
const name = deleteFriendshipRef.operationName;
console.log(name);
```

### Variables
The `DeleteFriendship` mutation has no variables.
### Return Type
Recall that executing the `DeleteFriendship` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFriendshipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFriendshipData {
  friendship_delete?: Friendship_Key | null;
}
```
### Using `DeleteFriendship`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFriendship } from '@dataconnect/generated';


// Call the `deleteFriendship()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFriendship();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFriendship(dataConnect);

console.log(data.friendship_delete);

// Or, you can use the `Promise` API.
deleteFriendship().then((response) => {
  const data = response.data;
  console.log(data.friendship_delete);
});
```

### Using `DeleteFriendship`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFriendshipRef } from '@dataconnect/generated';


// Call the `deleteFriendshipRef()` function to get a reference to the mutation.
const ref = deleteFriendshipRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFriendshipRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.friendship_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.friendship_delete);
});
```

