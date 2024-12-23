declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT?: integer;
            SECRET_KEY: string;
            
            PG_HOST: string;
            PG_USER: string;
            PG_PASSWORD: string;
            PG_DATABASE: string;
            PG_PORT: integer;

        }
    }
}
export { }