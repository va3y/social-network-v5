import { reactive, provide, inject } from "vue";
import "firebase/auth";





export const stateSymbol = Symbol("state");
export const createState = () => reactive({ "uid": null });

export const useState = () => inject(stateSymbol);
export const provideState = () => provide(stateSymbol, createState());
