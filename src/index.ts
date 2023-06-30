"use strict";
import { server } from "./lib/server.js";

export const initialFileStructure = () => {
    console.log('Creating folder...');
    console.log('Creating file...');
}

export const init = () => {
    initialFileStructure();
    server.init();
}

export const app = {
    init,
    initialFileStructure,
};

export default app;

app.init();
