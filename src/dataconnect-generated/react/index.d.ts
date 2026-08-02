import { CreateUserData, UpdateUserData, DeleteUserData, GetUserData, ListUsersData, SendMessageData, UpdateMessageData, DeleteMessageData, GetMessageData, ListMessagesData, AddTrackData, UpdateTrackData, DeleteTrackData, GetTrackData, ListTracksData, AddReactionData, UpdateReactionData, DeleteReactionData, GetReactionData, ListReactionsData, FollowUserData, UpdateFriendshipData, DeleteFriendshipData, GetFriendshipData, ListFollowersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetUser(options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;
export function useGetUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useSendMessage(options?: useDataConnectMutationOptions<SendMessageData, FirebaseError, void>): UseDataConnectMutationResult<SendMessageData, undefined>;
export function useSendMessage(dc: DataConnect, options?: useDataConnectMutationOptions<SendMessageData, FirebaseError, void>): UseDataConnectMutationResult<SendMessageData, undefined>;

export function useUpdateMessage(options?: useDataConnectMutationOptions<UpdateMessageData, FirebaseError, void>): UseDataConnectMutationResult<UpdateMessageData, undefined>;
export function useUpdateMessage(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMessageData, FirebaseError, void>): UseDataConnectMutationResult<UpdateMessageData, undefined>;

export function useDeleteMessage(options?: useDataConnectMutationOptions<DeleteMessageData, FirebaseError, void>): UseDataConnectMutationResult<DeleteMessageData, undefined>;
export function useDeleteMessage(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMessageData, FirebaseError, void>): UseDataConnectMutationResult<DeleteMessageData, undefined>;

export function useGetMessage(options?: useDataConnectQueryOptions<GetMessageData>): UseDataConnectQueryResult<GetMessageData, undefined>;
export function useGetMessage(dc: DataConnect, options?: useDataConnectQueryOptions<GetMessageData>): UseDataConnectQueryResult<GetMessageData, undefined>;

export function useListMessages(options?: useDataConnectQueryOptions<ListMessagesData>): UseDataConnectQueryResult<ListMessagesData, undefined>;
export function useListMessages(dc: DataConnect, options?: useDataConnectQueryOptions<ListMessagesData>): UseDataConnectQueryResult<ListMessagesData, undefined>;

export function useAddTrack(options?: useDataConnectMutationOptions<AddTrackData, FirebaseError, void>): UseDataConnectMutationResult<AddTrackData, undefined>;
export function useAddTrack(dc: DataConnect, options?: useDataConnectMutationOptions<AddTrackData, FirebaseError, void>): UseDataConnectMutationResult<AddTrackData, undefined>;

export function useUpdateTrack(options?: useDataConnectMutationOptions<UpdateTrackData, FirebaseError, void>): UseDataConnectMutationResult<UpdateTrackData, undefined>;
export function useUpdateTrack(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTrackData, FirebaseError, void>): UseDataConnectMutationResult<UpdateTrackData, undefined>;

export function useDeleteTrack(options?: useDataConnectMutationOptions<DeleteTrackData, FirebaseError, void>): UseDataConnectMutationResult<DeleteTrackData, undefined>;
export function useDeleteTrack(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTrackData, FirebaseError, void>): UseDataConnectMutationResult<DeleteTrackData, undefined>;

export function useGetTrack(options?: useDataConnectQueryOptions<GetTrackData>): UseDataConnectQueryResult<GetTrackData, undefined>;
export function useGetTrack(dc: DataConnect, options?: useDataConnectQueryOptions<GetTrackData>): UseDataConnectQueryResult<GetTrackData, undefined>;

export function useListTracks(options?: useDataConnectQueryOptions<ListTracksData>): UseDataConnectQueryResult<ListTracksData, undefined>;
export function useListTracks(dc: DataConnect, options?: useDataConnectQueryOptions<ListTracksData>): UseDataConnectQueryResult<ListTracksData, undefined>;

export function useAddReaction(options?: useDataConnectMutationOptions<AddReactionData, FirebaseError, void>): UseDataConnectMutationResult<AddReactionData, undefined>;
export function useAddReaction(dc: DataConnect, options?: useDataConnectMutationOptions<AddReactionData, FirebaseError, void>): UseDataConnectMutationResult<AddReactionData, undefined>;

export function useUpdateReaction(options?: useDataConnectMutationOptions<UpdateReactionData, FirebaseError, void>): UseDataConnectMutationResult<UpdateReactionData, undefined>;
export function useUpdateReaction(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateReactionData, FirebaseError, void>): UseDataConnectMutationResult<UpdateReactionData, undefined>;

export function useDeleteReaction(options?: useDataConnectMutationOptions<DeleteReactionData, FirebaseError, void>): UseDataConnectMutationResult<DeleteReactionData, undefined>;
export function useDeleteReaction(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteReactionData, FirebaseError, void>): UseDataConnectMutationResult<DeleteReactionData, undefined>;

export function useGetReaction(options?: useDataConnectQueryOptions<GetReactionData>): UseDataConnectQueryResult<GetReactionData, undefined>;
export function useGetReaction(dc: DataConnect, options?: useDataConnectQueryOptions<GetReactionData>): UseDataConnectQueryResult<GetReactionData, undefined>;

export function useListReactions(options?: useDataConnectQueryOptions<ListReactionsData>): UseDataConnectQueryResult<ListReactionsData, undefined>;
export function useListReactions(dc: DataConnect, options?: useDataConnectQueryOptions<ListReactionsData>): UseDataConnectQueryResult<ListReactionsData, undefined>;

export function useFollowUser(options?: useDataConnectMutationOptions<FollowUserData, FirebaseError, void>): UseDataConnectMutationResult<FollowUserData, undefined>;
export function useFollowUser(dc: DataConnect, options?: useDataConnectMutationOptions<FollowUserData, FirebaseError, void>): UseDataConnectMutationResult<FollowUserData, undefined>;

export function useUpdateFriendship(options?: useDataConnectMutationOptions<UpdateFriendshipData, FirebaseError, void>): UseDataConnectMutationResult<UpdateFriendshipData, undefined>;
export function useUpdateFriendship(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateFriendshipData, FirebaseError, void>): UseDataConnectMutationResult<UpdateFriendshipData, undefined>;

export function useDeleteFriendship(options?: useDataConnectMutationOptions<DeleteFriendshipData, FirebaseError, void>): UseDataConnectMutationResult<DeleteFriendshipData, undefined>;
export function useDeleteFriendship(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteFriendshipData, FirebaseError, void>): UseDataConnectMutationResult<DeleteFriendshipData, undefined>;

export function useGetFriendship(options?: useDataConnectQueryOptions<GetFriendshipData>): UseDataConnectQueryResult<GetFriendshipData, undefined>;
export function useGetFriendship(dc: DataConnect, options?: useDataConnectQueryOptions<GetFriendshipData>): UseDataConnectQueryResult<GetFriendshipData, undefined>;

export function useListFollowers(options?: useDataConnectQueryOptions<ListFollowersData>): UseDataConnectQueryResult<ListFollowersData, undefined>;
export function useListFollowers(dc: DataConnect, options?: useDataConnectQueryOptions<ListFollowersData>): UseDataConnectQueryResult<ListFollowersData, undefined>;
