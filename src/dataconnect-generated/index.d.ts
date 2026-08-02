import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddReactionData {
  reaction_insert: Reaction_Key;
}

export interface AddTrackData {
  musicLibrary_insert: MusicLibrary_Key;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface DeleteFriendshipData {
  friendship_delete?: Friendship_Key | null;
}

export interface DeleteMessageData {
  message_delete?: Message_Key | null;
}

export interface DeleteReactionData {
  reaction_delete?: Reaction_Key | null;
}

export interface DeleteTrackData {
  musicLibrary_delete?: MusicLibrary_Key | null;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface FollowUserData {
  friendship_insert: Friendship_Key;
}

export interface Friendship_Key {
  id: UUIDString;
  __typename?: 'Friendship_Key';
}

export interface GetFriendshipData {
  friendship?: {
    status: string;
  };
}

export interface GetMessageData {
  message?: {
    caption?: string | null;
  };
}

export interface GetReactionData {
  reaction?: {
    emoji: string;
  };
}

export interface GetTrackData {
  musicLibrary?: {
    title: string;
  };
}

export interface GetUserData {
  user?: {
    username: string;
    email: string;
  };
}

export interface ListFollowersData {
  friendships: ({
    follower: {
      username: string;
    };
  })[];
}

export interface ListMessagesData {
  messages: ({
    caption?: string | null;
  })[];
}

export interface ListReactionsData {
  reactions: ({
    emoji: string;
  })[];
}

export interface ListTracksData {
  musicLibraries: ({
    title: string;
  })[];
}

export interface ListUsersData {
  users: ({
    username: string;
  })[];
}

export interface Message_Key {
  id: UUIDString;
  __typename?: 'Message_Key';
}

export interface MusicLibrary_Key {
  id: UUIDString;
  __typename?: 'MusicLibrary_Key';
}

export interface Reaction_Key {
  id: UUIDString;
  __typename?: 'Reaction_Key';
}

export interface SendMessageData {
  message_insert: Message_Key;
}

export interface UpdateFriendshipData {
  friendship_update?: Friendship_Key | null;
}

export interface UpdateMessageData {
  message_update?: Message_Key | null;
}

export interface UpdateReactionData {
  reaction_update?: Reaction_Key | null;
}

export interface UpdateTrackData {
  musicLibrary_update?: MusicLibrary_Key | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(): MutationPromise<UpdateUserData, undefined>;
export function updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface SendMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SendMessageData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SendMessageData, undefined>;
  operationName: string;
}
export const sendMessageRef: SendMessageRef;

export function sendMessage(): MutationPromise<SendMessageData, undefined>;
export function sendMessage(dc: DataConnect): MutationPromise<SendMessageData, undefined>;

interface UpdateMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateMessageData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateMessageData, undefined>;
  operationName: string;
}
export const updateMessageRef: UpdateMessageRef;

export function updateMessage(): MutationPromise<UpdateMessageData, undefined>;
export function updateMessage(dc: DataConnect): MutationPromise<UpdateMessageData, undefined>;

interface DeleteMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMessageData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteMessageData, undefined>;
  operationName: string;
}
export const deleteMessageRef: DeleteMessageRef;

export function deleteMessage(): MutationPromise<DeleteMessageData, undefined>;
export function deleteMessage(dc: DataConnect): MutationPromise<DeleteMessageData, undefined>;

interface GetMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMessageData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMessageData, undefined>;
  operationName: string;
}
export const getMessageRef: GetMessageRef;

export function getMessage(options?: ExecuteQueryOptions): QueryPromise<GetMessageData, undefined>;
export function getMessage(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMessageData, undefined>;

interface ListMessagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMessagesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMessagesData, undefined>;
  operationName: string;
}
export const listMessagesRef: ListMessagesRef;

export function listMessages(options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, undefined>;
export function listMessages(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, undefined>;

interface AddTrackRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<AddTrackData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<AddTrackData, undefined>;
  operationName: string;
}
export const addTrackRef: AddTrackRef;

export function addTrack(): MutationPromise<AddTrackData, undefined>;
export function addTrack(dc: DataConnect): MutationPromise<AddTrackData, undefined>;

interface UpdateTrackRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateTrackData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateTrackData, undefined>;
  operationName: string;
}
export const updateTrackRef: UpdateTrackRef;

export function updateTrack(): MutationPromise<UpdateTrackData, undefined>;
export function updateTrack(dc: DataConnect): MutationPromise<UpdateTrackData, undefined>;

interface DeleteTrackRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteTrackData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteTrackData, undefined>;
  operationName: string;
}
export const deleteTrackRef: DeleteTrackRef;

export function deleteTrack(): MutationPromise<DeleteTrackData, undefined>;
export function deleteTrack(dc: DataConnect): MutationPromise<DeleteTrackData, undefined>;

interface GetTrackRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTrackData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTrackData, undefined>;
  operationName: string;
}
export const getTrackRef: GetTrackRef;

export function getTrack(options?: ExecuteQueryOptions): QueryPromise<GetTrackData, undefined>;
export function getTrack(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTrackData, undefined>;

interface ListTracksRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTracksData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTracksData, undefined>;
  operationName: string;
}
export const listTracksRef: ListTracksRef;

export function listTracks(options?: ExecuteQueryOptions): QueryPromise<ListTracksData, undefined>;
export function listTracks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTracksData, undefined>;

interface AddReactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<AddReactionData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<AddReactionData, undefined>;
  operationName: string;
}
export const addReactionRef: AddReactionRef;

export function addReaction(): MutationPromise<AddReactionData, undefined>;
export function addReaction(dc: DataConnect): MutationPromise<AddReactionData, undefined>;

interface UpdateReactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateReactionData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateReactionData, undefined>;
  operationName: string;
}
export const updateReactionRef: UpdateReactionRef;

export function updateReaction(): MutationPromise<UpdateReactionData, undefined>;
export function updateReaction(dc: DataConnect): MutationPromise<UpdateReactionData, undefined>;

interface DeleteReactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteReactionData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteReactionData, undefined>;
  operationName: string;
}
export const deleteReactionRef: DeleteReactionRef;

export function deleteReaction(): MutationPromise<DeleteReactionData, undefined>;
export function deleteReaction(dc: DataConnect): MutationPromise<DeleteReactionData, undefined>;

interface GetReactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetReactionData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetReactionData, undefined>;
  operationName: string;
}
export const getReactionRef: GetReactionRef;

export function getReaction(options?: ExecuteQueryOptions): QueryPromise<GetReactionData, undefined>;
export function getReaction(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetReactionData, undefined>;

interface ListReactionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListReactionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListReactionsData, undefined>;
  operationName: string;
}
export const listReactionsRef: ListReactionsRef;

export function listReactions(options?: ExecuteQueryOptions): QueryPromise<ListReactionsData, undefined>;
export function listReactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListReactionsData, undefined>;

interface FollowUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<FollowUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<FollowUserData, undefined>;
  operationName: string;
}
export const followUserRef: FollowUserRef;

export function followUser(): MutationPromise<FollowUserData, undefined>;
export function followUser(dc: DataConnect): MutationPromise<FollowUserData, undefined>;

interface UpdateFriendshipRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateFriendshipData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateFriendshipData, undefined>;
  operationName: string;
}
export const updateFriendshipRef: UpdateFriendshipRef;

export function updateFriendship(): MutationPromise<UpdateFriendshipData, undefined>;
export function updateFriendship(dc: DataConnect): MutationPromise<UpdateFriendshipData, undefined>;

interface DeleteFriendshipRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteFriendshipData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteFriendshipData, undefined>;
  operationName: string;
}
export const deleteFriendshipRef: DeleteFriendshipRef;

export function deleteFriendship(): MutationPromise<DeleteFriendshipData, undefined>;
export function deleteFriendship(dc: DataConnect): MutationPromise<DeleteFriendshipData, undefined>;

interface GetFriendshipRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetFriendshipData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetFriendshipData, undefined>;
  operationName: string;
}
export const getFriendshipRef: GetFriendshipRef;

export function getFriendship(options?: ExecuteQueryOptions): QueryPromise<GetFriendshipData, undefined>;
export function getFriendship(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetFriendshipData, undefined>;

interface ListFollowersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFollowersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListFollowersData, undefined>;
  operationName: string;
}
export const listFollowersRef: ListFollowersRef;

export function listFollowers(options?: ExecuteQueryOptions): QueryPromise<ListFollowersData, undefined>;
export function listFollowers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFollowersData, undefined>;

