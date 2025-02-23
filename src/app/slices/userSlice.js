import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        categories: [],
        toDos: [],
        ejercicios: [],
        
        Fechas: [],
        MinutosFechas: [],

    },
    reducers: {
        onLogin: (state, action) => {
            const { payload } = action;
            state.userData = payload;
            localStorage.setItem("userId", JSON.stringify(payload.id)); // Guarda el ID del usuario
            localStorage.setItem("apiKey", JSON.stringify(payload.apiKey));
            localStorage.setItem("userData", JSON.stringify(payload));
        },
        onLogout: (state) => {
            state.userData = null;
            state.ejercicios = [];
            localStorage.removeItem("userId");
            localStorage.removeItem("apiKey");
            localStorage.removeItem("userData");
        },
        onLoadEjercicios: (state, action) => {
            const { payload } = action;
            state.ejercicios = payload;
        },
        onAddEjercicio: (state, action) => {
            const { payload } = action;
            state.ejercicios = [...state.ejercicios, payload];
        },
        onDeleteEjercicio: (state, action) => {
            const { payload } = action;
            const filteredEjercicios = state.ejercicios.filter((e) => e.id !== payload);
            state.ejercicios = filteredEjercicios;
            console.log("Ejercicios filtrados:", filteredEjercicios);
        },
         // Agregamos un reducer para actualizar toDos
         onLoadToDos: (state, action) => {
            const { payload } = action;
            state.toDos = payload;
        },
        // Agregamos un reducer para actualizar categories
        onLoadCategories: (state, action) => {
            const { payload } = action;
            state.categories = payload;
        },

        //Cargo las fechas 
        onLoadFechas: (state, action) => {
            const { payload } = action;
            state.Fechas = payload;
        },

        onLoadMinutosFechas: (state, action) => {
            const { payload } = action;
            state.MinutosFechas = payload;
        }


    },
});

export const { onLogin, onLogout, onLoadEjercicios, onAddEjercicio, onDeleteEjercicio,onLoadToDos,onLoadCategories,onLoadFechas,onLoadMinutosFechas }
    = userSlice.actions;

export default userSlice.reducer;