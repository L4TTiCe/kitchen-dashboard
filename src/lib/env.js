// /** /src/lib/env.js **/
// import dotenv from 'dotenv';

// try {
//     dotenv.config();
// } catch {}

// export const env = process.env;

export const variables = {
	SERVER_URL: import.meta.env.VITE_SERVER_URL
};
