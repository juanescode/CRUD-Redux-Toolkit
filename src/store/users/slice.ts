import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "John Doe",
		email: "John@gmail.com",
		github: "johndoe",
	},
	{
		id: "2",
		name: "Jane Doe",
		email: "Jane@gmail.com",
		github: "midudev",
	},
	{
		id: "3",
		name: "Joe Smith",
		email: "johi@gmail.com",
		github: "juanescode",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
	// if (persistedState) return JSON.parse(persistedState).users;

	// return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById } = usersSlice.actions;
