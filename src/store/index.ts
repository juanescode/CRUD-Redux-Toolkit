import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReduces from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	next(action);
	if (type === "users/deleteUserById") {
		fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`Usuario ${payload} eliminado`);
				}
			})
			.catch(() => {
				console.log("error");
			});
	}
};

export const store = configureStore({
	reducer: {
		users: usersReduces,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			persistanceLocalStorageMiddleware,
			syncWithDatabase,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
