import { store } from "./store"

// Definición del tipo RootState, que representará el estado global de tu store
export type RootState = ReturnType<typeof store.getState>

// Define el tipo AppDispatch para el dispatch tipado
export type AppDispatch = typeof store.dispatch
